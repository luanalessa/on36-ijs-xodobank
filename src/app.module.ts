import { Module } from '@nestjs/common';

import { BankingModule } from './modules/banking/banking.module';
import { ManagerModule } from './modules/manager/manager.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AccountModule } from './modules/account/account.module';

@Module({
    imports: [BankingModule, ManagerModule, CustomerModule, AccountModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
