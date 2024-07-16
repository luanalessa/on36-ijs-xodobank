import { IAccount } from './../interfaces/IAccount';
import { AccountStatus } from '../enum/AccountStatus';
import { Manager } from './Manager';
import { Customer } from './Customer';
import { Transaction } from './Transaction';
import { Currency } from './Currency';

export abstract class Account implements IAccount {
    protected customer: Customer;

    protected accountNumber: string;
    protected agency: string;

    protected _balance: number;
    protected incomes: Transaction[];
    protected outcomes: Transaction[];

    public status: AccountStatus;

    private creationDate: Date;

    constructor(customer: Customer, accountNumber: string, agency: string) {
        this.customer = customer;
        this.accountNumber = accountNumber;
        this.agency = agency;
        this.status = AccountStatus.open;
        this._balance = 0;
        this.incomes = [];
        this.outcomes = [];
        this.creationDate = new Date();
    }

    get balance(): number {
        return this._balance;
    }

    protected abstract validateTransaction(transaction: Transaction): boolean;

    public deposit(transaction: Transaction): void {
        if (this.status === AccountStatus.open && transaction.amount <= 10) {
            console.warn(
                'The first deposit need to be more than R$ 10  to activate the account',
            );
            return;
        } else if (this.status === AccountStatus.open) {
            console.log('The account was actived!');
            this.status = AccountStatus.active;
        }

        this._balance += transaction.amount;
        transaction.record(new Date(), this.balance);
        this.incomes.push(transaction);
        console.log(
            `The deposit of ${transaction.amount} was successfully done. Your current balance is ${this.balance}`,
        );
    }

    public withdraw(transaction: Transaction): void {
        if (this.validateTransaction(transaction)) {
            console.log(
                `The withdraw of ${transaction.amount} is starting. Your current balance is ${this.balance}`,
            );
            this._balance -= transaction.amount;
            transaction.record(new Date(), this.balance);
            this.outcomes.push(transaction);
            console.log(
                `The withdraw of ${transaction.amount} was successfully done. Your current balance is ${this.balance}`,
            );
        }
    }

    public transfer(transaction: Transaction): void {
        if (this.validateTransaction(transaction)) {
            this._balance -= transaction.amount;
            transaction.record(new Date(), this.balance);
            this.outcomes.push(transaction);
            console.log(
                `Sender: The transfer of ${transaction.amount} was successfully done. Your current balance is ${this.balance}`,
            );
            if (transaction.receiver) {
                transaction.receiver.deposit(transaction);
            }
        }
    }
}
