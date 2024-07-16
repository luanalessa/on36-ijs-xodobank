import { Customer } from './Customer';
import { SavingAccount } from './SavingAccount';
import { CheckingAccount } from './CheckingAccount';

export class Bank {
    public name: string;
    public agency: string;
    private totalAccounts: number;

    constructor(name: string) {
        this.name = name;
        this.agency = '001';
        this.totalAccounts = 0;
    }

    createSavingAccount(customer: Customer): SavingAccount {
        const num = this.accountNumberGenerator();
        const account = new SavingAccount(customer, num, this.agency);
        this.totalAccounts++;
        return account;
    }

    createCheckingAccount(customer: Customer): CheckingAccount {
        const num = this.accountNumberGenerator();
        const account = new CheckingAccount(customer, num, this.agency);
        this.totalAccounts++;
        return account;
    }

    private accountNumberGenerator(): string {
        const accountNumber = `${this.totalAccounts
            .toString()
            .padStart(4, '0')}`;
        return accountNumber;
    }
    // think how the bank can have control over the money
    // and how the currency will works
}
