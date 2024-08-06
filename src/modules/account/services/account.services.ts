import { CreateDepositOrWithdrawDto } from '../../transaction/dto/create-deposit-or-withdraw.dto';
import { AccountRepository } from './../../../repository/account.repository';
import { TransactionType } from 'src/modules/transaction/enum/transaction-type.enum';
import { CreateTransferDto } from 'src/modules/transaction/dto/create-transfer.dto';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { OperationValidator } from '../utils/operation-validator';
import { Operations } from '../interfaces/operations.interface';
import { Account } from '../interfaces/account.interface';
import { TransactionServices } from 'src/modules/transaction/transaction.services';
import { NotificationService } from 'src/modules/notification/notification.services';
import { Logger } from 'src/modules/notification/observers/logger.observer';
import { EventType } from 'src/modules/notification/enum/event-type.enum';
import { AccountDto } from '../dto/account.dto';
import { BankingServices } from 'src/modules/banking/services/banking.services';
import { AccountStatus } from '../enum/account-status.enum';
import { TransactiontRepository } from 'src/repository/transaction.repository';

export abstract class AccountServices implements Operations {
    protected accounts: Account[];
    protected bankServices: BankingServices;

    private observer: NotificationService = new NotificationService();
    private validator: OperationValidator = new OperationValidator();



    constructor() {
        this.bankServices = new BankingServices();
        this.accounts = AccountRepository.read();
        const logger = new Logger();
        this.observer.addObserver(logger);
    }
    
    abstract create({ customerId, accountType }: AccountDto): string;

    abstract getAccount(accountNumber: string): { index: number; account: Account };

    private update(accountNumber: string, updates: Partial<Account>): void {
        const index = this.accounts.findIndex((account: Account) => account.accountNumber == accountNumber);

        this.accounts[index] = { ...this.accounts[index], ...updates };
        AccountRepository.write(this.accounts);
        
    }
    
    delete(accountNumber: string): void {
        this.update(accountNumber, {status: AccountStatus.deleted } )
    }

    public deposit(transaction: CreateDepositOrWithdrawDto): void {
        const { account, index } = this.getAccount(transaction.accountNumber);

        const newTransaction = new Transaction(transaction.amount, TransactionType.deposit, transaction.customerId, transaction.accountNumber);

        if (account && this.validator.validate(newTransaction, account, this.observer)) {
            const service = new TransactionServices(newTransaction);
            service.record();

            account.balance += newTransaction.amount;
            account.incomes.push(newTransaction.id);

            this.accounts[index] = account;
            AccountRepository.write(this.accounts);

            this.observer.notify(EventType.INFOR, `You received a new deposit of R$ ${newTransaction.amount}.`);
        }
    }

    public withdraw(transaction: CreateDepositOrWithdrawDto): void {
        const { account, index } = this.getAccount(transaction.accountNumber);
        const newTransaction = new Transaction(transaction.amount, TransactionType.withdraw, transaction.customerId, transaction.accountNumber);

        if (account && this.validator.validate(newTransaction, account, this.observer)) {
            const service = new TransactionServices(newTransaction);
            service.record();

            account.balance -= newTransaction.amount;
            account.outcomes.push(newTransaction.id);

            this.accounts[index] = account;
            AccountRepository.write(this.accounts);
            this.observer.notify(EventType.INFOR, `Your withdraw of R$ ${newTransaction.amount} has been successfully completed.`);
        }
    }

    public transfer(transaction: CreateTransferDto): void {
        const { account: senderAccount, index: senderIndex } = this.getAccount(transaction.senderAccountNumber);
        const { account: receiverAccount, index: receiverIndex } = this.getAccount(transaction.receiverAccountNumber);

        const newTransaction = new Transaction(
            transaction.amount,
            TransactionType.transfer,
            transaction.receiverId,
            transaction.receiverAccountNumber,
            transaction.senderId,
            transaction.senderAccountNumber,
        );

        if (senderAccount && receiverAccount && this.validator.validate(newTransaction as Transaction, senderAccount, this.observer)) {
            const service = new TransactionServices(newTransaction);

            service.record();

            senderAccount.balance -= newTransaction.amount;
            senderAccount.outcomes.push(newTransaction.id);

            receiverAccount.balance += newTransaction.amount;
            receiverAccount.incomes.push(newTransaction.id);

            this.accounts[senderIndex] = senderAccount;
            this.accounts[receiverIndex] = receiverAccount;

            AccountRepository.write(this.accounts);

            this.observer.notify(EventType.INFOR, `Your transfer of ${transaction.amount} has been completed!`);
        }
    }

    public statement(accountNumber: string) {
        const { account } = this.getAccount(accountNumber);
        if (account) {
            const transactions = TransactiontRepository.read()
            const transaction = transactions.filter((transaction : Transaction) => transaction.receiverAccountNumber === accountNumber);

            return transaction;
        }
        return [];
    }
}
