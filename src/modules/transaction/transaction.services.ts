import { Transaction } from './entities/transaction.entity';
import { TransactionStatus } from './enum/transaction-status.enum';
import { TransactionType } from './enum/transaction-type.enum';

export class TransactionServices extends Transaction {
    constructor(
        amount: number,
        type: TransactionType,
        balance: number,
        senderId: string,
        receiverId: string,
    ) {
        super(amount, type, balance, senderId, receiverId);
    }

    record() {
        this.dueDate = new Date();
        this.status = TransactionStatus.confirmed;
    }

    report() {
        this.status = TransactionStatus.failed;
    }
}
