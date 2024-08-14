import { Module } from '@nestjs/common';
import { AccountController } from '../controllers/account.controller';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { SavingAccountServices } from '../../domain/services/saving-account.services';
import { SavingAccount } from '../../domain/models/saving-account.model';
import { CheckingAccount } from '../../domain/models/checking-account.model';
import { CustomerServices } from '../../domain/services/customer.services';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [CheckingAccountServices, SavingAccountServices, CheckingAccount, SavingAccount, CustomerServices],
})
export class AccountModule {}
