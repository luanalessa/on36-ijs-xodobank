import { Account } from "src/modules/account/entities/account.entity";
import { TransactionStatus } from "../enum/transaction-status.enum";
import { TransactionType } from "../enum/transaction-type.enum";


export class Transaction {
    sender?: Account;
    receiver?: Account;
    amount: number;
    type: TransactionType;
    status: TransactionStatus;
    balance?: number;
    dueDate?: Date;
    creationDate: Date = new Date();

    constructor(
        amount: number,
        type: TransactionType,
        balance?: number,
        sender?: Account,
        receiver?: Account,
    ) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.balance = balance;
        this.type = type;
        this.status = TransactionStatus.pending;
    }
}