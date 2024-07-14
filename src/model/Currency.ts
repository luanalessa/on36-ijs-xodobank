export class Currency {
    private _name: string;
    private _amount: number;
    private _exchangeRate: number;
    private _expirationDate?: Date;
    private _isActive: boolean;
    protected _creationDate: Date;

    constructor(
        name: string,
        amount: number,
        exchangeRate: number,
        expirationDate?: Date,
    ) {
        this._name = name;
        this._amount = amount;
        this._exchangeRate = exchangeRate;
        this._expirationDate = expirationDate;
        this._isActive = true;
        this._creationDate = new Date();
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(amount: number) {
        this._amount = amount;
    }

    get exchangeRate(): number {
        return this._exchangeRate;
    }

    set exchangeRate(exchangeRate: number) {
        this._exchangeRate = exchangeRate;
    }

    set expirationDate(expirationDate: Date) {
        this._expirationDate = expirationDate;
    }

    get isActive(): boolean {
        if (this._expirationDate && this._expirationDate > new Date()) {
            this._isActive = false;
        }
        return this._isActive;
    }
}
