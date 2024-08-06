import { randomUUID } from 'crypto';
import { TransactionStatus } from '../enum/transaction-status.enum';
import { TransactionType } from '../enum/transaction-type.enum';

export class Transaction {
    id: string;
    amount: number;

    receiverId: string;
    receiverAccountNumber: string;
    senderId: string;
    senderAccountNumber: string;

    type: TransactionType;
    status: TransactionStatus;

    dueDate: Date;
    creationDate: Date;

    constructor(
        amount: number,
        type: TransactionType,
        receiverId: string,
        receiverAccountNumber: string,
        senderId?: string,
        senderAccountNumber?: string,
    ) {
        this.id = randomUUID().toString();
        this.amount = amount;
        this.type = type;
        this.status = TransactionStatus.pending;
        this.receiverId = receiverId;
        this.receiverAccountNumber = receiverAccountNumber;
        this.senderId = senderId;
        this.senderAccountNumber = senderAccountNumber;
        this.creationDate = new Date();
    }
}
