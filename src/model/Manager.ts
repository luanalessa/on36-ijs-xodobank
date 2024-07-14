import { Customer } from './Customer';
import { User } from './User';

export class Manager extends User {
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

}
