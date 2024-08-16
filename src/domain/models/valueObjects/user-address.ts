export class Address {
    street: string;
    number: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;

    constructor(street: string, number: string, city: string, state: string, postalCode: string, country: string) {
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
    }
}