import { Manager } from './Manager';
import { Customer } from './Customer';
import { SavingAccount } from './SavingAccount';
import { CheckingAccount } from './CheckingAccount';

export interface Bank {
    createCustomer(
        name: string,
        nationalId: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
        monthIncome: number,
        monthOutcome: number,
    ): Customer;
    createSavingAccount(
        customer: Customer,
        accountNumber: string,
        agency: string,
    ): SavingAccount;
    createCheckingAccount(
        customer: Customer,
        accountNumber: string,
        agency: string,
    ): CheckingAccount;
    // think how the bank can have control over the money
    // and how the currency will works
}
