import { IAccount } from './../interfaces/IAccount';
import { AccountStatus } from "../enum/AccountStatus";
import { Manager } from './Manager';
import { Customer } from './Customer';
import { Transaction } from './Transaction';
import { Currency } from './Currency';

export abstract class Account implements IAccount {
    protected manager: Manager;
    protected customer: Customer;

    protected accountNumber: string;
    protected agency: string;

    protected _balance: number = 0;
    protected currency: Currency;
    protected incomes: Transaction[] = [];
    protected outcomes: Transaction[] = [];

    public status: AccountStatus;

    private creationDate: Date = new Date();

    constructor(
        manager: Manager,
        customer: Customer,
        currency: Currency,
        accountNumber: string,
        agency: string,
        amount: number,
    ) {
        this.manager = manager;
        this.customer = customer;
        this.currency = currency;
        this.accountNumber = accountNumber;
        this.agency = agency;
        this.status = AccountStatus.open;
    }

    get balance(): number {
        return this._balance;
    }

    deposit(transaction: Transaction): void {
        if (this.status === AccountStatus.open && transaction.amount >= 10) {
            this._balance += transaction.amount;
            transaction.record(new Date());
            this.incomes.push(transaction);
            this.status = AccountStatus.active;
        } else {
            console.warn(
                'The first deposit need to be more than R$ 10  to activate the account',
            );
        }
    }

    withdraw(transaction: Transaction): void {
        if (transaction.amount <= this._balance) {
            this._balance -= transaction.amount;
            transaction.record(new Date());
            this.outcomes.push(transaction);
        } else {
            console.warn('Insufficient funds');
        }
    }

    transfer(transaction: Transaction): void {
        if (transaction.amount <= this._balance) {
            this._balance -= transaction.amount;
            transaction.record(new Date());
            this.outcomes.push(transaction);
            if (transaction.receiver) {
                transaction.receiver.deposit(transaction);
            }
        } else {
            console.warn('Insufficient funds');
        }
    }
}
