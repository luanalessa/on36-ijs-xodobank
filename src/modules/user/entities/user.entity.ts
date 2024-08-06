import { randomUUID } from "crypto";

export abstract class User {
    id: string;
    name: string;
    idNumber: string;
    address: string;
    phone: string;
    dateOfBirth: Date;
    email: string;
    password: string;

    isActive: boolean;

    constructor(name: string, nationalId: string, address: string, phone: string, dateOfBirth: Date, email: string, password: string) {
        this.id = randomUUID().toString();
        this.idNumber = nationalId;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
        this.isActive = true;
    }
}
