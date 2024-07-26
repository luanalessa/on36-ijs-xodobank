import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { CheckingAccount } from '../entities/checking-account';
import { AccountRepository } from 'src/repository/account.repository';

@Injectable()
export class CheckingAccountServices extends AccountServices {
    protected account: CheckingAccount;

    constructor(account: CheckingAccount) {
        super(account);
    }

    getCheckAccount(accountNumber: string): CheckingAccount {
        const accounts = AccountRepository.readAccounts();
        const account = accounts.filter(
            (account: CheckingAccount) =>
                account.accountNumber == accountNumber,
        );

        return account;
    }
}
