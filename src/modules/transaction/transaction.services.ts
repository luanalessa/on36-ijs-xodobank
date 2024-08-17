import { TransactiontRepository } from 'src/repository/transaction.repository';
import { Transaction } from './entities/transaction.entity';
import { TransactionStatus } from './enum/transaction-status.enum';

export class TransactionServices {
    private transactions: Transaction[];
    private transaction: Transaction;

    constructor(transaction: Transaction) {
        this.transaction = transaction;
        this.transactions = TransactiontRepository.read();
    }

    record() {
        this.transaction.dueDate = new Date();
        this.transaction.status = TransactionStatus.confirmed;

        this.transactions.push(this.transaction);
        TransactiontRepository.write(this.transactions);
    }

    report() {
        this.transaction.status = TransactionStatus.failed;

        this.transactions.push(this.transaction);
        TransactiontRepository.write(this.transactions);
    }
}
