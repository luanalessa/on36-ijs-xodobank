import { Account } from 'src/modules/account/entities/account.entity';
import { TransactionStatus } from '../enum/transaction-status.enum';
import { TransactionType } from '../enum/transaction-type.enum';

export class Transaction {
    constructor(
        senderId: string,
        receiverId: string,
        type: TransactionType,
        status: TransactionStatus,
        balance: number,
        dueDate: Date,
        creationDate: Date = new Date(),
    ) {}
}
