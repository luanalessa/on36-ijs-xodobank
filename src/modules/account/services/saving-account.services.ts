import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { SavingAccount } from '../entities/saving-account';
import { AccountRepository } from 'src/repository/account.repository';
import { AccountType } from '../enum/account-type.enum';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountStatus } from '../enum/account-status.enum';

@Injectable()
export class SavingAccountServices extends AccountServices {
    constructor() {
        super();
    }

    validateTransaction(transaction: Transaction, account: SavingAccount): boolean {
        if (account.balance - transaction.amount <= 0 && account.status === AccountStatus.active) {
            console.warn('Insufficient funds');
            return false;
        }
        return true;
    }

    getSavingAccount(accountNumber: string): SavingAccount {
        const accounts = AccountRepository.readAccounts();
        const account = accounts.filter((account: SavingAccount) => account.accountNumber == accountNumber && account.type == AccountType.Savings);

        return account;
    }
}
