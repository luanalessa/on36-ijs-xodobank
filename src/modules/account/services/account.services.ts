import { Account } from '../entities/account.entity';

export abstract class AccountServices {
    protected account: Account;

    constructor(account: Account) {
        this.account = account;
    }

    get balance(): number {
        return this.account.balance;
    }

    set balance(amount: number) {
        this.balance += amount;
    }
}
