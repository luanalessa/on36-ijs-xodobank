import { Transaction } from '../models/transaction.model';
import { AccountStatus } from '../enum/account-status.enum';
import { Account } from '../interfaces/account.interface';
import { NotificationService } from '../services/notification/notification.services';
import { EventType } from '../services/notification/enum/event-type.enum';
import { AccountType } from '../enum/account-type.enum';
import { TransactionType } from '../enum/transaction-type.enum';

export class OperationValidator {
    validate(transaction: Transaction, account: Account, observer: NotificationService): boolean {
        if (account.status === AccountStatus.open && transaction.amount < 10) {
            observer.notify(EventType.ALERT, 'The first deposit needs to be more than R$ 10 to activate the account');
            return false;
        } else if (account.status === AccountStatus.open) {
            account.status = AccountStatus.active;
            observer.notify(EventType.INFOR, `Account ${account.accountNumber} has been activated!`);
        }

        if(transaction.type != TransactionType.deposit) 
                return this.checkFunds(transaction.type, transaction.amount, account, observer);
        return true;
    }

    private checkFunds(type: string, amount: number, account: Account, observer: NotificationService): boolean {
        if (account.type == AccountType.Checking) {
            if (account.balance - amount <= -account['overdraftLimit'] && account.status === AccountStatus.active) {
                observer.notify(EventType.ERROR, 'This transaction is not allowed, because you have insufficient funds.');
                return false;
            }
            if (type == TransactionType.transfer || type == TransactionType.withdraw || type == TransactionType.payment) {
                if (account.balance - amount < 0) {
                    observer.notify(EventType.ALERT, 'You are using a check special limt.');
                    return true;
                }
            }
        } else {
            if (account.balance - amount < 0 && account.status === AccountStatus.active) {
                observer.notify(EventType.ERROR, 'Insufaficient funds');
                return false;
            }
        }
        return true;
    }
}
