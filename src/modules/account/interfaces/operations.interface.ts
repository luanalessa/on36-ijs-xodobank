import { CreateDepositOrWithdrawDto } from 'src/modules/transaction/dto/create-deposit-or-withdraw.dto';
import { CreateTransferDto } from 'src/modules/transaction/dto/create-transfer.dto';

export interface Operations {
    deposit(transaction: CreateDepositOrWithdrawDto): void;
    withdraw(transaction: CreateDepositOrWithdrawDto): void;
    transfer(transaction: CreateTransferDto): void;
}
