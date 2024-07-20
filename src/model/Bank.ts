import { Customer } from './Customer';
import { SavingAccount } from './SavingAccount';
import { CheckingAccount } from './CheckingAccount';

export class Bank {
    private static instance: Bank;
    public name: string;
    public agency: string;
    public totalAccounts: number;

    constructor(name: string) {
        this.name = name;
        this.agency = '001';
        this.totalAccounts = 0;
    }

    public static getInstance(): Bank {
        if (!Bank.instance) {
            Bank.instance = new Bank(this.name);
        }
        return Bank.instance;
    }

    public accountNumberGenerator(): string {
        const accountNumber = `${this.totalAccounts
            .toString()
            .padStart(4, '0')}`;
        return accountNumber;
    }
    // think how the bank can have control over the money
    // and how the currency will works
}
