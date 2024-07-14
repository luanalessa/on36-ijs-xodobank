
import { Account } from './Account';
import { TransactionStatus } from '../enum/TransactionStatus';
import { TransactionType } from '../enum/TransactionType';

export class Transaction {
    protected _sender?: Account;
    protected _receiver?: Account;
    protected _amount: number;
    protected type: TransactionType;
    protected status: TransactionStatus;
    protected dueDate?: Date;
    private creationDate: Date = new Date();

    constructor(
        amount: number,
        type: TransactionType,
        sender?: Account,
        reciever?: Account,
    ) {
        this._sender = sender;
        this._receiver = reciever;
        this._amount = amount;
        this.type = type;
        this.status = TransactionStatus.pending;
    }

    get amount(): number {
        return this._amount;
    }

    get sender(): Account | void {
        return this._sender;
    }

    get receiver(): Account | void {
        return this._receiver;
    }

    record(date: Date) {
        this.dueDate = date;
        this.status = TransactionStatus.confirmed;
    }

    report() {
        this.status = TransactionStatus.failed;
    }
}
