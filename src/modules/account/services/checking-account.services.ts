import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { CheckingAccount } from '../entities/checking-account';
import { AccountRepository } from 'src/repository/account.repository';
import { AccountType } from '../enum/account-type.enum';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountStatus } from '../enum/account-status.enum';

@Injectable()
export class CheckingAccountServices extends AccountServices {
    constructor() {
        super();
    }

    validateTransaction(transaction: Transaction, account: CheckingAccount): boolean {
        if (account.balance - transaction.amount <= -account.overdraftLimit && account.status === AccountStatus.active) {
            console.warn('Insufficient funds');
            return false;
        }

        return true;
    }

    getCheckAccount(accountNumber: string): CheckingAccount {
        const accounts = AccountRepository.readAccounts();
        const account = accounts.filter((account: CheckingAccount) => account.accountNumber == accountNumber && account.type == AccountType.Checking);

        return account;
    }
}
