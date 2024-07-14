import { Currency } from './Currency';

export class Bank {
    public name: string;
    public address: string;
    public email: string;
    protected phone: string;
    public currencies: Currency[];

    // think how the bank can have control over the money

    constructor(name: string, address: string, email: string, phone: string) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.currencies = [];
    }

    public releaseCurrency(
        name: string,
        value: number,
        exchangeRate: number,
        expirationDate?: Date,
    ): void {
        const currency = new Currency(
            name,
            value,
            exchangeRate,
            expirationDate,
        );
        this.currencies.push(currency);
    }

    public getCurrency(): Currency | void {
        const currency = this.currencies.find((c) => c.isActive === true);
        if (currency) {
            return currency;
        } else {
            console.warn('There is no currency available');
        }
    }

    public updateCurrencyAmmount(value: number, currency: Currency): Currency {
        const amount = currency.amount + value;
        currency.amount = amount;
        return currency;
    }

    public exchangeCurrency(currency: Currency): number {
        const amount = currency.amount * currency.exchangeRate;
        return amount;
    }
}
