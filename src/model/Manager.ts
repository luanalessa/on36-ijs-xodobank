import { Bank } from './Bank';
import { CheckingAccount } from './CheckingAccount';
import { Customer } from './Customer';
import { SavingAccount } from './SavingAccount';
import { User } from './User';

export class Manager extends User {
    private bank: Bank;
    private customers: Customer[];

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
        this.bank = Bank.getInstance();
        this.customers = [];
    }

    createCustomer(
        name: string,
        document: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
    ): Customer {
        const customer = new Customer(
            name,
            document,
            address,
            phone,
            dateOfBirth,
            email,
            password,
        );

        
        const alreadyExists = this.customers.length == 0 ? false : this.customers.some(
            (c: Customer) => c.idNumber == customer.idNumber,
        );

        if (alreadyExists) {
            throw console.error('Can not create the customer');
        }
        
        this.customers.push(customer);
        return customer;
    }

    createSavingAccount(customer: Customer): SavingAccount {
        const num = this.bank.accountNumberGenerator();
        const account = new SavingAccount(customer, num, this.bank.agency);
        this.bank.totalAccounts++;
        return account;
    }

    createCheckingAccount(customer: Customer): CheckingAccount {
        const num = this.bank.accountNumberGenerator();
        const account = new CheckingAccount(customer, num, this.bank.agency);
        this.bank.totalAccounts++;
        return account;
    }
}
