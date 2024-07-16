import { User } from './User';
import { Account } from './Account';

export class Customer extends User {
    protected _accountList: Account[];

    constructor(
        name: string,
        idNumber: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
    ) {
        super(name, idNumber, address, phone, dateOfBirth, email, password);
        this._accountList = [];
    }

    get accountList(): Account[] {
        return this._accountList;
    }

    set accountList(account: Account) {
        this._accountList.push(account);
    }
}
