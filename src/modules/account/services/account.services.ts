import { Account } from 'src/modules/account/entities/account.entity';
import { AccountRepository } from './../../../repository/account.repository';
import { AccountStatus } from '../enum/account-status.enum';
import { TransactionServices } from 'src/modules/transaction/transaction.services';
import { TransactionType } from 'src/modules/transaction/enum/transaction-type.enum';
import { CreateTransferDto } from 'src/modules/transaction/dto/create-transfer.dto';
import { CreateAccountDto } from 'src/modules/transaction/dto/create-account.dto';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';

export abstract class AccountServices {

    protected abstract validateTransaction(transaction, account): boolean;
        protected account

    public deposit(transaction: CreateAccountDto): void {                                                                                                                                                                                                                  

        const accounts = AccountRepository.readAccounts()
        const accountIndex = accounts.findIndex(account => account.accountNumber === transaction.accountNumber);
        const account = accounts[accountIndex];

        if (account.status === AccountStatus.open && transaction.amount < 10) {
            console.warn(
                'The first deposit need to be more than R$ 10  to activate the account',
            );
            return;
        } else if (account.status === AccountStatus.open) {
            account.status = AccountStatus.active;
        }


        const newTransaction = new TransactionServices(transaction.amount, TransactionType.deposit, transaction.customerId, transaction.accountNumber, null, null);
        newTransaction.record();

        account.balance += newTransaction.amount;
        account.incomes.push(newTransaction);

        AccountRepository.writeAccounts(accounts);
    }


    public withdraw(transaction: CreateAccountDto): void {
        const accounts = AccountRepository.readAccounts()
        const accountIndex = accounts.findIndex(account => account.accountNumber === transaction.accountNumber);
        const account = accounts[accountIndex];

        if (this.validateTransaction(transaction, account)) {
            const newTransaction = new TransactionServices( transaction.amount, TransactionType.withdraw, transaction.customerId, transaction.accountNumber, null, null);
            newTransaction.record();

            account.balance -= newTransaction.amount;
            account.outcomes.push(newTransaction);
            AccountRepository.writeAccounts(accounts);
        }
    }

    public transfer(transaction: CreateTransferDto): void {
        const accounts = AccountRepository.readAccounts()

        const senderIndex = accounts.findIndex(account => account.accountNumber === transaction.senderAccountNumber);
        const senderAccount = accounts[senderIndex];

        const receiverIndex = accounts.findIndex(account => account.accountNumber === transaction.receiverAccountNumber);
        const receiverAccount = accounts[receiverIndex];

        if (this.validateTransaction(transaction, senderAccount)) {
            const senderTransaction = new TransactionServices( transaction.amount, TransactionType.transfer, transaction.receiverId, transaction.receiverAccountNumber, transaction.senderId, transaction.senderAccountNumber);
            senderTransaction.record();

            senderAccount.balance -= senderTransaction.amount;
            senderAccount.outcomes.push(senderTransaction);


            const receiverTransaction = new TransactionServices( transaction.amount, TransactionType.transfer, transaction.receiverId, transaction.receiverAccountNumber, transaction.senderId, transaction.senderAccountNumber);
            receiverTransaction.record();

            receiverAccount.balance += senderTransaction.amount;
            receiverAccount.incomes.push(receiverTransaction);

            AccountRepository.writeAccounts(accounts);
        }
    }

    public statement(accountNumber: string){
        const accounts = AccountRepository.readAccounts();
        const accountIndex = accounts.findIndex(account => account.accountNumber === accountNumber);
        
        const statement = accounts[accountIndex]["incomes"];
        
        accounts[accountIndex]["outcomes"].forEach( (transaction : Transaction ) => {
            statement.push(transaction)
        });

        return statement;
    }
}
