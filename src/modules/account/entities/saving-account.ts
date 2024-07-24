import { Account } from './account.entity';

export class SavingAccount extends Account {
    private interestRate: number;

    constructor(customerId: string, accountNumber: string, agency: string) {
        super(customerId, accountNumber, agency);
        this.interestRate = 0.01;
    }
}
