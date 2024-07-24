import { Document } from './document.entity';

export abstract class User {
    private name: string;
    private _idNumber: string;
    private address: string;
    private phone: string;
    private dateOfBirth: Date;
    private email: string;
    private password: string;

    constructor(
        name: string,
        nationalId: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
    ) {
        this._idNumber = nationalId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }

    get idNumber(): string {
        return this._idNumber;
    }
}
