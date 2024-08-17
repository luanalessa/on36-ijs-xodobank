import { randomUUID } from 'crypto';
import { TransactionStatus } from '../enum/transaction-status.enum';
import { TransactionType } from '../enum/transaction-type.enum';
import { Operational } from './operational.entity';

export class Transaction {
    id: string;
    amount: number;
    description: string;
    type: TransactionType;
    source: Operational;
    status: TransactionStatus;

    dueDate: Date;
    capturedDate: Date;

    constructor(amount: number, type: TransactionType, description: string, source: Operational) {
        this.id = randomUUID().toString();
        this.amount = amount;
        this.type = type;
        this.status = TransactionStatus.pending;
        this.description = description;
        this.source = source;
        this.capturedDate = new Date();
    }
}
