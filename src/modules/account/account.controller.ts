import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CheckingAccountServices } from './services/checking-account.services';
import { SavingAccountServices } from './services/saving-account.services';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountType } from './enum/account-type.enum';

@ApiTags('Account Operations')
@Controller('account')
export class AccountController {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly savingAccountService: SavingAccountServices,
    ) {}

    @Get('status')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    getAccount(
        @Query('accountNumber') accountNumber: string,
        @Query('accountType') accountType: AccountType,
    ) {
        if (accountType === AccountType.Checking)
            return this.checkingAccountService.getCheckAccount(accountNumber);
        else return this.savingAccountService.getSavingAccount(accountNumber);
    }
}
