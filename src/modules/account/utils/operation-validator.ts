import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountStatus } from '../../account/enum/account-status.enum';
import { Account } from '../../account/interfaces/account.interface';
import { NotificationService } from 'src/modules/notification/notification.services';
import { EventType } from 'src/modules/notification/enum/event-type.enum';
import { AccountType } from 'src/modules/account/enum/account-type.enum';

export class OperationValidator {
    validate(transaction: Transaction, account: Account, observer: NotificationService): boolean {
        if (account.status === AccountStatus.open && transaction.amount < 10) {
            observer.notify(EventType.ALERT, 'The first deposit needs to be more than R$ 10 to activate the account');
            return false;
        } else if (account.status === AccountStatus.open) {
            account.status = AccountStatus.active;
            observer.notify(EventType.INFOR, `Account ${account.accountNumber} has been activated!`);
        }

        return this.checkFunds(transaction.amount, account, observer);
    }

    private checkFunds(amount: number, account: Account, observer: NotificationService): boolean {
        if (account.type == AccountType.Checking) {
            if (account.balance - amount <= -account['overdraftLimit'] && account.status === AccountStatus.active) {
                observer.notify(EventType.ERROR, 'This transaction is not allowed, because you have insufficient funds.');
                return false;
            }
            if (account.balance - amount < 0) {
                observer.notify(EventType.ALERT, 'You are using a check special limt.');
                return true;
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
