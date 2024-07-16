import { Document } from '../utils/Document';

export abstract class User {
    private name: string;
    private _idNumber: Document;
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
        this._idNumber = new Document(nationalId);
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }

    get idNumber(): Document {
        return this._idNumber;
    }
}
