import { Customer } from './Customer';
import { User } from './User';
import { Bank } from './Bank';
import { SavingAccount } from './SavingAccount';
import { CheckingAccount } from './CheckingAccount';

export class Manager extends User implements Bank {
    private customerList: Customer[];

    constructor(
        name: string,
        nationalId: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
    ) {
        super(name, nationalId, address, phone, dateOfBirth, email, password);
        this.customerList = [];
    }

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
    ): Customer {
        throw new Error('Method not implemented.');
    }
    createSavingAccount(
        customer: Customer,
        accountNumber: string,
        agency: string,
    ): SavingAccount {
        throw new Error('Method not implemented.');
    }
    createCheckingAccount(
        customer: Customer,
        accountNumber: string,
        agency: string,
    ): CheckingAccount {
        throw new Error('Method not implemented.');
    }
}
