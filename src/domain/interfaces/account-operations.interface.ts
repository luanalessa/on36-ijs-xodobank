import { CreateDepositOrWithdrawDto } from 'src/application/dto/create-deposit-or-withdraw.dto';
import { CreateOperationDto } from 'src/application/dto/create-operation.dto';
import { CreateTransferDto } from 'src/application/dto/create-transfer.dto';

export interface AccountOperations {
    deposit(transaction: CreateOperationDto): void;
    withdraw(transaction: CreateOperationDto): void;
    transfer(transaction: CreateOperationDto): void;
}
