import { randomUUID } from 'crypto';
import { Operational } from 'src/modules/transaction/entities/operational.entity';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { TransactionType } from 'src/modules/transaction/enum/transaction-type.enum';
import { InvoiceStatus } from '../enum/invoice-status';
import { TransactiontRepository } from 'src/repository/transaction.repository';
import { TransactionStatus } from 'src/modules/transaction/enum/transaction-status.enum';

export class Invoice {
    id: string;
    status: InvoiceStatus;
    issueDate: Date;
    settlementDate: Date;
    totalDue: number;
    totalPaid: number;
    installments: Transaction[];

    constructor(settlementDate: Date) {
        this.id = randomUUID().toString();
        this.status = InvoiceStatus.PENDING;
        this.settlementDate = settlementDate;
        this.totalDue = 0;
        this.totalPaid = 0;
    }
}
