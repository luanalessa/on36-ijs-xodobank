import { Transaction } from "../model/Transaction";

export interface IAccount {
    deposit(transaction: Transaction): void;
    withdraw(transaction: Transaction): void;
    transfer(transaction: Transaction): void;
    // study how payment works
}
