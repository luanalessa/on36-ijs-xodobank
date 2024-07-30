import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { SavingAccount } from '../entities/saving-account';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';

@Injectable()
export class SavingAccountServices extends AccountServices {
    createAccount(customerId: string, accountType: AccountType, accountNumber: string, agency: string): Account {
        return new SavingAccount(customerId, accountType, accountNumber, agency);
    }

    getAccount(accountNumber: string): { index: number; account: Account } {
        const index = this.accounts.findIndex((account) => account.accountNumber === accountNumber && account.type === AccountType.Savings);

        console.log(index);
        if (index !== -1) {
            const account = this.accounts.find((account) => account.accountNumber === accountNumber);
            return { index, account };
        }

        throw new Error(`Account with number ${accountNumber} not found.`);
    }
}
