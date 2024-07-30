import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountType } from '../enum/account-type.enum';
import { CreateDepositOrWithdrawDto } from 'src/modules/transaction/dto/create-deposit-or-withdraw.dto';
import { CreateTransferDto } from 'src/modules/transaction/dto/create-transfer.dto';
import { Account } from './account.interface';

export interface Operations {
    deposit(transaction: CreateDepositOrWithdrawDto): void;
    withdraw(transaction: CreateDepositOrWithdrawDto): void;
    transfer(transaction: CreateTransferDto): void;
}
