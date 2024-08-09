import { Module } from '@nestjs/common';

import { BankingModule } from './modules/banking/banking.module';
import { ManagerModule } from './modules/manager/manager.module';
import { CustomerModule } from './modules/customer/customer.module';
import { AccountModule } from './modules/account/account.module';
import { CardModule } from './modules/card/card.module';

@Module({
    imports: [BankingModule, ManagerModule, CustomerModule, AccountModule, CardModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
