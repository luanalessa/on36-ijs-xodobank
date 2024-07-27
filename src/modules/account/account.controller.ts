import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CheckingAccountServices } from './services/checking-account.services';
import { SavingAccountServices } from './services/saving-account.services';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountType } from './enum/account-type.enum';
import { CreateTransactionDto } from '../transaction/dto/create-transaction.dto';
import { CreateTransferDto } from '../transaction/dto/create-transfer.dto';

@ApiTags('Account Operations')
@Controller('account')
export class AccountController {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly savingAccountService: SavingAccountServices,
    ) {}

    @Get('')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    getAccount(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        if (accountType === AccountType.Checking) return this.checkingAccountService.getCheckAccount(accountNumber);
        else return this.savingAccountService.getSavingAccount(accountNumber);
    }

    @Post('deposit')
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    deposit(@Body() transaction: CreateTransactionDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
        if (accountReceiverType === AccountType.Checking) {
            return this.checkingAccountService.deposit(transaction);
        } else {
            return this.savingAccountService.deposit(transaction);
        }
    }

    @Post('withdraw')
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    withdraw(@Body() transaction: CreateTransactionDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
        if (accountReceiverType === AccountType.Checking) {
            return this.checkingAccountService.withdraw(transaction);
        } else {
            return this.savingAccountService.withdraw(transaction);
        }
    }

    @Post('transfer')
    transfer(@Body() transaction: CreateTransferDto) {
        if (transaction.senderAccountType === AccountType.Checking) {
            return this.checkingAccountService.transfer(transaction);
        } else {
            return this.savingAccountService.transfer(transaction);
        }
    }

    @Get('statement')
    @ApiQuery({ name: 'accountType', enum: AccountType })
    statement(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        if (accountType === AccountType.Checking) {
            return this.checkingAccountService.statement(accountNumber);
        } else {
            return this.savingAccountService.statement(accountNumber);
        }
    }
}
