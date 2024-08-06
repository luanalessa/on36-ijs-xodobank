import { Body, Controller, Delete, Get, Post, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { AccountType } from './enum/account-type.enum';
import { CreateDepositOrWithdrawDto } from '../transaction/dto/create-deposit-or-withdraw.dto';
import { CreateTransferDto } from '../transaction/dto/create-transfer.dto';
import { AccountDto } from './dto/account.dto';
import { CheckingAccountServices } from './services/checking-account.services';
import { SavingAccountServices } from './services/saving-account.services';
import { CustomerServices } from './../customer/services/customer.services';

@ApiTags('Account Operations')
@Controller('account')
export class AccountController {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly savingAccountService: SavingAccountServices,
        private readonly customerServices: CustomerServices
    ) {}


    @Post('customer')
    async create(@Query() createAccountDto: AccountDto) {
        try {
            const accountId = (createAccountDto.accountType === AccountType.Checking)  
                ? await this.checkingAccountService.create(createAccountDto)
                : await this.savingAccountService.create(createAccountDto);

            await this.customerServices.addAccount(createAccountDto.customerId, accountId);
            return { statusCode: HttpStatus.CREATED, message: 'Account created successfully', data: { accountId } };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    async get(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        try {
            const account = (accountType === AccountType.Checking)  
                ? await this.checkingAccountService.getAccount(accountNumber)
                : await this.savingAccountService.getAccount(accountNumber);
            return { statusCode: HttpStatus.OK, data: account };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @Delete('')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    async delete(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        try {
            await (accountType === AccountType.Checking
                ? this.checkingAccountService.delete(accountNumber)
                : this.savingAccountService.delete(accountNumber));
            return { statusCode: HttpStatus.OK, message: 'Account deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('deposit')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                accountNumber: { type: 'string', description: 'Número da conta' },
                amount: { type: 'number', description: 'Valor do depósito' },
                customerId: { type: 'string', description: 'ID do cliente' },
            },
            required: ['accountNumber', 'amount', 'customerId'],
        },
    })
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    async deposit(@Body() transaction: CreateDepositOrWithdrawDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
        try {
            await (accountReceiverType === AccountType.Checking
                ? this.checkingAccountService.deposit(transaction)
                : this.savingAccountService.deposit(transaction));
            return { statusCode: HttpStatus.OK, message: 'Deposit successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('withdraw')
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    async withdraw(@Body() transaction: CreateDepositOrWithdrawDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
        try {
            await (accountReceiverType === AccountType.Checking
                ? this.checkingAccountService.withdraw(transaction)
                : this.savingAccountService.withdraw(transaction));
            return { statusCode: HttpStatus.OK, message: 'Withdrawal successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('transfer')
    async transfer(@Body() transaction: CreateTransferDto) {
        try {
            await (transaction.senderAccountType === AccountType.Checking
                ? this.checkingAccountService.transfer(transaction)
                : this.savingAccountService.transfer(transaction));
            return { statusCode: HttpStatus.OK, message: 'Transfer successful' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('statement')
    @ApiQuery({ name: 'accountNumber', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    async statement(@Query('accountNumber') accountNumber: string, @Query('accountType') accountType: AccountType) {
        try {
            const statement = (accountType === AccountType.Checking
                ? await this.checkingAccountService.statement(accountNumber)
                : await this.savingAccountService.statement(accountNumber));
            return { statusCode: HttpStatus.OK, data: statement };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
