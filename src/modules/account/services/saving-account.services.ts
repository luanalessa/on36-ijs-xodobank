import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { SavingAccount } from '../entities/saving-account';
import { AccountRepository } from 'src/repository/account.repository';

@Injectable()
export class SavingAccountServices extends AccountServices {
    protected account: SavingAccount;

    constructor(account: SavingAccount) {
        super(account);
    }

    getSavingAccount(accountNumber: string): SavingAccount {
        const accounts = AccountRepository.readAccounts();
        const account = accounts.filter(
            (account: SavingAccount) => account.accountNumber == accountNumber,
        );

        return account;
    }
}
