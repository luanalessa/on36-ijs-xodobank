import { CreateDepositOrWithdrawDto } from '../../transaction/dto/create-deposit-or-withdraw.dto';
import { AccountRepository } from './../../../repository/account.repository';
import { TransactionType } from 'src/modules/transaction/enum/transaction-type.enum';
import { CreateTransferDto } from 'src/modules/transaction/dto/create-transfer.dto';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { OperationValidator } from '../../../utils/operation-validator';
import { Operations } from '../interfaces/operations.interface';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { TransactionServices } from 'src/modules/transaction/transaction.services';
import { NotificationService } from 'src/modules/notification/notification.services';
import { Logger } from 'src/modules/notification/observers/logger.observer';
import { EventType } from 'src/modules/notification/enum/event-type.enum';
import { Observer } from 'src/modules/notification/interfaces/observer.interface';

export abstract class AccountServices implements Operations {
    protected accounts: Account[] = AccountRepository.readAccounts();

    private observer: NotificationService  =  new NotificationService();
    private validator: OperationValidator = new OperationValidator();

    constructor() {
        const logger = new Logger();
        this.observer.addObserver(logger)
    }

    abstract createAccount(customerId: string, accountType: AccountType, accountNumber: string, agency: string): Account;

    abstract getAccount(accountNumber: string): { index: number; account: Account };

    public deposit(transaction: CreateDepositOrWithdrawDto): void {
        const { account, index } = this.getAccount(transaction.accountNumber);

        const newTransaction = new Transaction(transaction.amount, TransactionType.deposit, transaction.customerId, transaction.accountNumber);

        if (account && this.validator.validate(newTransaction, account, this.observer)) {
            const service = new TransactionServices(newTransaction);
            service.record();

            account.balance += newTransaction.amount;
            account.incomes.push(newTransaction);

            this.accounts[index] = account;
            AccountRepository.writeAccounts(this.accounts);

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
            account.outcomes.push(newTransaction);

            this.accounts[index] = account;
            AccountRepository.writeAccounts(this.accounts);
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
            senderAccount.outcomes.push(newTransaction);

            receiverAccount.balance += newTransaction.amount;
            receiverAccount.incomes.push(newTransaction);

            this.accounts[senderIndex] = senderAccount;
            this.accounts[receiverIndex] = receiverAccount;

            AccountRepository.writeAccounts(this.accounts);

            this.observer.notify(EventType.INFOR, `Your transfer of ${transaction.amount} has been completed!`);
        }
    }

    public statement(accountNumber: string) {
        const { account } = this.getAccount(accountNumber);
        if (account) {
            return [...account.incomes, ...account.outcomes];
        }
        return [];
    }
}
