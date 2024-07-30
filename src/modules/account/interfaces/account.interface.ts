import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountStatus } from '../enum/account-status.enum';
import { AccountType } from '../enum/account-type.enum';

export interface Account {
    customerId: string;
    type: AccountType;
    accountNumber: string;
    agency: string;

    balance: number;
    incomes: Transaction[];
    outcomes: Transaction[];

    status: AccountStatus;

    creationDate: Date;
}
