import { Manager } from './Manager';
import { Customer } from './Customer';
import { Account } from './Account';
import { Currency } from './Currency';

export class CheckingAccount extends Account {
    constructor(
        manager: Manager,
        customer: Customer,
        currency: Currency,
        accountNumber: string,
        agency: string,
        amount: number,
    ) {
        super(manager, customer, currency, accountNumber, agency, amount);
    }
}
