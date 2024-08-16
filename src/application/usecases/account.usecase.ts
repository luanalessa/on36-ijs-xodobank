import { Injectable } from '@nestjs/common';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { SavingAccountServices } from '../../domain/services/saving-account.services';
import { CustomerServices } from '../../domain/services/customer.services';
import { CreateAccountDto } from '../dto/create-account.dto';
import { CreateOperationDto } from '../dto/create-operation.dto';
import { AccountType } from '../../domain/enum/account-type.enum';

@Injectable()
export class AccountUseCases{
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly savingAccountService: SavingAccountServices,
        private readonly customerServices: CustomerServices,
    ) {}

    async createAccount(createAccountDto: CreateAccountDto) {
        const account =
            createAccountDto.accountType === AccountType.Checking
                ? await this.checkingAccountService.create(createAccountDto)
                : await this.savingAccountService.create(createAccountDto);

        await this.customerServices.addAccount(createAccountDto.customerId, account.accountNumber);
        return account;
    }

    async getAccount(accountNumber: string, accountType: AccountType) {
        return accountType === AccountType.Checking
            ? await this.checkingAccountService.getAccount(accountNumber)
            : await this.savingAccountService.getAccount(accountNumber);
    }

    async deleteAccount(accountNumber: string, accountType: AccountType) {
        return accountType === AccountType.Checking
            ? await this.checkingAccountService.delete(accountNumber)
            : await this.savingAccountService.delete(accountNumber);
    }

    async deposit(transaction: CreateOperationDto, accountReceiverType: AccountType) {
        return accountReceiverType === AccountType.Checking
            ? await this.checkingAccountService.deposit(transaction)
            : await this.savingAccountService.deposit(transaction);
    }

    async withdraw(transaction: CreateOperationDto, accountReceiverType: AccountType) {
        return accountReceiverType === AccountType.Checking
            ? await this.checkingAccountService.withdraw(transaction)
            : await this.savingAccountService.withdraw(transaction);
    }

    async transfer(transaction: CreateOperationDto, sourceAccountType: AccountType) {
        return sourceAccountType === AccountType.Checking
            ? await this.checkingAccountService.transfer(transaction)
            : await this.savingAccountService.transfer(transaction);
    }

    async statement(accountNumber: string, accountType: AccountType) {
        return accountType === AccountType.Checking
            ? await this.checkingAccountService.statement(accountNumber)
            : await this.savingAccountService.statement(accountNumber);
    }
}
