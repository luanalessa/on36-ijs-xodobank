import { Module } from '@nestjs/common';
import { CustomerServices } from '../../domain/services/customer.services';
import { CustomerController } from '../controllers/customer.controller';
import { ManagerServices } from '../../domain/services/manager.services';

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerServices, ManagerServices],
})
export class CustomerModule {}
