import { Module } from '@nestjs/common';
import { BankingServices } from './services/banking.services';
import { BankingController } from './banking.controller';
import { ManagerServices } from '../manager/services/manager.services';
import { CustomerServices } from '../customer/services/customer.services';

@Module({
    imports: [],
    controllers: [BankingController],
    providers: [BankingServices, ManagerServices, CustomerServices],
})
export class BankingModule {}
