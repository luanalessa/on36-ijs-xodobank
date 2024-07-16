import { Transaction } from './Transaction';
import { Customer } from './Customer';
import { Account } from './Account';
import { TransactionType } from '../enum/TransactionType';
import { AccountStatus } from '../enum/AccountStatus';

export class CheckingAccount extends Account {
    private limit: number;
    private maintenanceFee: number = 0.03;

    constructor(customer: Customer, accountNumber: string, agency: string) {
        super(customer, accountNumber, agency);
        this.limit = 1000;
    }

    protected validateTransaction(transaction: Transaction): boolean {
        if (
            this.balance - transaction.amount <= -this.limit &&
            this.status === AccountStatus.active
        ) {
            console.warn('Insufficient funds');
            return false;
        }

        return true;
    }

    public applyMaintenanceFee() {
        if (this.balance < 0) {
            const maintenanceFee = Math.abs(
                (this.balance * this.maintenanceFee) / 100,
            );
            const transaction = new Transaction(
                maintenanceFee,
                TransactionType.maintenanceFee,
                this.balance,
            );
            this.withdraw(transaction);
            this.outcomes.push(transaction);
        }
    }
}
