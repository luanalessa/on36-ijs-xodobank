import { Module } from '@nestjs/common';
import { CustomerServices } from './services/customer.services';
import { CustomerController } from './customer.controller';
import { ManagerServices } from '../manager/services/manager.services';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerServices, ManagerServices],
})
export class CustomerModule {}
