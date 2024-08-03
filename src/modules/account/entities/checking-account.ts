import { AccountType } from '../enum/account-type.enum';
import { CommonAccount } from './common-account';

export class CheckingAccount extends CommonAccount {
    overdraftLimit: number = 1000;
    maintenanceFee: number = 0.03;

    constructor(customerId: string, accountType: AccountType, accountNumber: string, agency: string) {
        super(customerId, accountType, accountNumber, agency);
    }
}
