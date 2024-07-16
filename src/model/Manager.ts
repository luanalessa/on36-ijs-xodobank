import { Customer } from './Customer';
import { User } from './User';

export class Manager extends User {
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
        if (customer.idNumber) {
            return customer;
        }
        throw console.error('Can not create the customer');
    }
}
