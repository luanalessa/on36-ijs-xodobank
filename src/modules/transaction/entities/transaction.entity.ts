import { TransactionStatus } from '../enum/transaction-status.enum';
import { TransactionType } from '../enum/transaction-type.enum';

export class Transaction {
    amount: number;
    accountBalance: number;

    receiverId: string;
    senderId: string;

    type: TransactionType;
    status: TransactionStatus;

    dueDate: Date;
    creationDate: Date = new Date();

    constructor(
        amount: number,
        type: TransactionType,
        accountBalance: number,
        receiverId: string,
        senderId: string,
    ) {
        this.amount = amount;
        this.accountBalance = accountBalance - this.amount;
        this.type = type;
        this.status = TransactionStatus.pending;
        this.receiverId = receiverId;
        this.senderId = senderId;
    }
}
