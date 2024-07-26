import { Transaction } from './entities/transaction.entity';
import { TransactionStatus } from './enum/transaction-status.enum';
import { TransactionType } from './enum/transaction-type.enum';

export class TransactionServices extends Transaction {
    constructor(
        amount: number,
        type: TransactionType,
        receiverId: string,
        receiverAccountNumber: string,
        senderId: string,
        senderAccountNumber: string
    
    ) {
        super(amount, type, receiverId, receiverAccountNumber, senderId, senderAccountNumber);
    }

    record() {
        this.dueDate = new Date();
        this.status = TransactionStatus.confirmed;
    }

    report() {
        this.status = TransactionStatus.failed;
    }
}
