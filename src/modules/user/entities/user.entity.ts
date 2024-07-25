import { Document } from './document.entity';

export abstract class User {
    name: string;
    idNumber: string;
    address: string;
    phone: string;
    dateOfBirth: Date;
    email: string;
    password: string;

    constructor(
        name: string,
        nationalId: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
    ) {
        this.idNumber = nationalId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }
}
