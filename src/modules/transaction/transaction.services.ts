import { Transaction } from './entities/transaction.entity';
import { TransactionStatus } from './enum/transaction-status.enum';

export class TransactionServices {
    private transaction: Transaction;

    constructor(transaction: Transaction) {
        this.transaction = transaction;
    }

    record() {
        this.transaction.dueDate = new Date();
        this.transaction.status = TransactionStatus.confirmed;
    }

    report() {
        this.transaction.status = TransactionStatus.failed;
    }
}
