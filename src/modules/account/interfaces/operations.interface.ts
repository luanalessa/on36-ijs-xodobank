import { CreateDepositOrWithdrawDto } from 'src/modules/transaction/dto/create-deposit-or-withdraw.dto';
import { CreateOperationDto } from 'src/modules/transaction/dto/create-operation.dto';
import { CreateTransferDto } from 'src/modules/transaction/dto/create-transfer.dto';

export interface Operations {
    deposit(transaction: CreateOperationDto): void;
    withdraw(transaction: CreateOperationDto): void;
    transfer(transaction: CreateOperationDto): void;
}
