import { Document } from "./document.entity";

export abstract class User {
     name: string;
     idNumber: Document;
     address: string;
     phone: string;
     dateOfBirth: Date;
     email: string;
     password: string;

    constructor(
        name: string,
        idNumber: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
    ) {
        this.idNumber = new Document(idNumber);
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }
}