import { Account } from './account.entity';

export class CheckingAccount extends Account {
    limit: number;
    maintenanceFee: number = 0.03;

    constructor(customerId: string, accountNumber: string, agency: string) {
        super(customerId, accountNumber, agency);
        this.limit = 1000;
    }
}
