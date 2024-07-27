import { AccountType } from '../enum/account-type.enum';
import { Account } from './account.entity';

export class SavingAccount extends Account {
    interestRate: number = 0.01;

    constructor(customerId: string, accountType: AccountType, accountNumber: string, agency: string) {
        super(customerId, accountType, accountNumber, agency);
    }
}
