import { Module } from '@nestjs/common';


import { BankingModule } from './modules/banking/banking.module';
import { ManagerModule } from './modules/manager/manager.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
    imports: [BankingModule, ManagerModule, CustomerModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
