import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';

export abstract class Account {
    customerId: string;
    type: AccountType;
    accountNumber: string;
    agency: string;

    balance: number;
    incomes: Transaction[];
    outcomes: Transaction[];

    status: AccountStatus;

    creationDate: Date;

    constructor(customerId: string, accountType: AccountType, accountNumber: string, agency: string) {
        this.customerId = customerId;
        this.type = accountType;
        this.accountNumber = accountNumber;
        this.agency = agency;
        this.status = AccountStatus.open;
        this.balance = 0;
        this.incomes = [];
        this.outcomes = [];
        this.creationDate = new Date();
    }
}
