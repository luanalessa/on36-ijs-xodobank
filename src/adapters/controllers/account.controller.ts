import { Body, Controller, Delete, Get, Post, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { AccountType } from '../../domain/enum/account-type.enum';
import { CreateAccountDto } from '../../application/dto/create-account.dto';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { SavingAccountServices } from '../../domain/services/saving-account.services';
import { CustomerServices } from '../../domain/services/customer.services';
import { CreateOperationDto } from '../../application/dto/create-operation.dto';

@ApiTags('Account Operations')
@Controller('account')
export class AccountController {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly savingAccountService: SavingAccountServices,
        private readonly customerServices: CustomerServices,
    ) {}

    @Post('customer')
    async create(@Query() createAccountDto: CreateAccountDto) {
        try {
            const accountId =
                createAccountDto.accountType === AccountType.Checking
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
            const account =
                accountType === AccountType.Checking
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
    @ApiQuery({ name: 'accountReceiverType', enum: AccountType })
    async deposit(@Body() transaction: CreateOperationDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
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
    async withdraw(@Body() transaction: CreateOperationDto, @Query('accountReceiverType') accountReceiverType: AccountType) {
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
    @ApiQuery({ name: 'sourceAccountType', enum: AccountType })
    async transfer(@Body() transaction: CreateOperationDto, @Query('sourceAccountType') sourceAccountType: AccountType) {
        try {
            await (sourceAccountType === AccountType.Checking
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
            const statement =
                accountType === AccountType.Checking
                    ? await this.checkingAccountService.statement(accountNumber)
                    : await this.savingAccountService.statement(accountNumber);
            return { statusCode: HttpStatus.OK, data: statement };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
