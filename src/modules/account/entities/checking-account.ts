import { AccountType } from '../enum/account-type.enum';
import { Account } from './account.entity';

export class CheckingAccount extends Account {
    overdraftLimit: number = 1000;
    maintenanceFee: number = 0.03;

    constructor(customerId: string, accountType: AccountType, accountNumber: string, agency: string) {
        super(customerId, accountType, accountNumber, agency);
    }
}
