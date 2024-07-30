import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { CheckingAccount } from '../entities/checking-account';
import { AccountRepository } from 'src/repository/account.repository';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class CheckingAccountServices extends AccountServices {
    createAccount(customerId: string, accountType: AccountType, accountNumber: string, agency: string): Account {
        return new CheckingAccount(customerId, accountType, accountNumber, agency);
    }

    getAccount(accountNumber: string): { index: number; account: Account } {
        const index = this.accounts.findIndex((account) => account.accountNumber === accountNumber && account.type === AccountType.Checking);

        if (index !== -1) {
            const account = this.accounts[index];
            return { index, account };
        }

        throw new Error(`Account with number ${accountNumber} not found.`);
    }
}
