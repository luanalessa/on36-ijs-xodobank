import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { CheckingAccountServices } from './services/checking-account.services';
import { SavingAccountServices } from './services/saving-account.services';
import { SavingAccount } from './entities/saving-account';
import { CheckingAccount } from './entities/checking-account';

@Module({
    imports: [],
    controllers: [AccountController],
    providers: [CheckingAccountServices, SavingAccountServices, CheckingAccount, SavingAccount],
})
export class AccountModule {}
