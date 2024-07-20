import { Customer } from './Customer';
import { Account } from './Account';
import { Transaction } from './Transaction';
import { TransactionType } from '../enum/TransactionType';
import { AccountStatus } from '../enum/AccountStatus';

export class SavingAccount extends Account {
    private interestRate: number;

    constructor(customer: Customer, accountNumber: string, agency: string) {
        super(customer, accountNumber, agency);
        this.interestRate = 0.01;
    }

    public calculateInterest(): void {
        const interestRate = this._balance * this.interestRate;
        const transaction = new Transaction(
            interestRate,
            TransactionType.interest,
        );
        this._balance += interestRate;
        transaction.record(new Date(), this.balance);
    }

    protected validateTransaction(transaction: Transaction): boolean {
        if (
            this.balance - transaction.amount <= 0 &&
            this.status === AccountStatus.active
        ) {
            console.warn('Insufficient funds');
            return false;
        }
        return true;
    }
}
