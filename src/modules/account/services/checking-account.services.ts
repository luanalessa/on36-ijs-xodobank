import { Injectable } from '@nestjs/common';
import { AccountServices } from './account.services';
import { CheckingAccount } from '../entities/checking-account';
import { AccountType } from '../enum/account-type.enum';
import { Account } from '../interfaces/account.interface';
import { AccountDto } from '../dto/account.dto';
import { AccountRepository } from 'src/repository/account.repository';

@Injectable()
export class CheckingAccountServices extends AccountServices {
    create({ customerId, accountType }: AccountDto): string {
        const num = this.bankServices.accountNumberGenerator();
        const agency = this.bankServices.agency;

        const account = new CheckingAccount(customerId, accountType, num, agency);
        this.accounts.push(account);

        AccountRepository.write(this.accounts);

        return num; 
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
