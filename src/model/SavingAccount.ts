import { Manager } from './Manager';
import { Customer } from './Customer';
import { Account } from './Account';
import { Currency } from './Currency';
import { Transaction } from './Transaction';
import { TransactionType } from '../enum/TransactionType';

export class SavingAccount extends Account {
    private interestRate: number;

    constructor(
        manager: Manager,
        customer: Customer,
        currency: Currency,
        accountNumber: string,
        agency: string,
        amount: number,
        interestRate: number = 0.01,
    ) {
        super(manager, customer, currency, accountNumber, agency, amount);
        this.interestRate = interestRate;
    }

    calculateInterest(): void {
        const interestRate = this._balance * this.interestRate;
        this._balance += interestRate;
        const transaction = new Transaction(
            interestRate,
            TransactionType.interest,
        );
        transaction.record(new Date());
    }
}
