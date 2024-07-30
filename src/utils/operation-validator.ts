import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import { AccountStatus } from '../modules/account/enum/account-status.enum';
import { Account } from '../modules/account/interfaces/account.interface';
import { CheckingAccount } from '../modules/account/entities/checking-account';
import { SavingAccount } from '../modules/account/entities/saving-account';

export class OperationValidator {
    validate(transaction: Transaction, account: Account): boolean {
        if (account.status === AccountStatus.open && transaction.amount < 10) {
            console.warn('The first deposit needs to be more than R$ 10 to activate the account');
            return false;
        } else if (account.status === AccountStatus.open) {
            account.status = AccountStatus.active;
        }

        return this.checkFunds(transaction.amount, account);
    }

    private checkFunds(amount: number, account: Account): boolean {
        if (account instanceof CheckingAccount) {
            if (account.balance - amount <= -account.overdraftLimit && account.status === AccountStatus.active) {
                console.warn('Insufficient funds');
                return false;
            }
        } else if (account instanceof SavingAccount) {
            if (account.balance - amount < 0 && account.status === AccountStatus.active) {
                console.warn('Insufficient funds');
                return false;
            }
        }
        return true;
    }
}
