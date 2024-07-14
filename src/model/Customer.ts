import { User } from './User';
import { Account } from './Account';

export class Customer extends User {
    private monthIncome: number;
    private monthOutcome: number;
    private accountList: Account[];

    constructor(
        name: string,
        nationalId: string,
        address: string,
        phone: string,
        dateOfBirth: Date,
        email: string,
        password: string,
        monthIncome: number,
        monthOutcome: number,
    ) {
        super(name, nationalId, address, phone, dateOfBirth, email, password);
        this.monthIncome = monthIncome;
        this.monthOutcome = monthOutcome;
        this.accountList = [];
    }
}
