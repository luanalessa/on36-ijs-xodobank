import { Manager } from './Manager';
import { Customer } from './Customer';
import { Account } from './Account';
import { Currency } from './Currency';
import { Transaction } from './Transaction';
import { TransactionType } from '../enum/TransactionType';
import { AccountStatus } from '../enum/AccountStatus';

export class SavingAccount extends Account {
    private interestRate: number;

    constructor(customer: Customer, accountNumber: string, agency: string) {
        super(customer, accountNumber, agency);
        this.interestRate = 0.034;
    }

    public calculateInterest(): void {
        const interestRate = this._balance * this.interestRate;
        this._balance += interestRate;
        const transaction = new Transaction(
            interestRate,
            TransactionType.interest,
        );
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
