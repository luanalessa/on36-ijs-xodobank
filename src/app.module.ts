import { Module } from '@nestjs/common';

import { BankingModule } from './adapters/modules/banking.module';
import { ManagerModule } from './adapters/modules/manager.module';
import { CustomerModule } from './adapters/modules/customer.module';
import { AccountModule } from './adapters/modules/account.module';
import { CardModule } from './adapters/modules/card.module';

@Module({
    imports: [BankingModule, ManagerModule, CustomerModule, AccountModule, CardModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
