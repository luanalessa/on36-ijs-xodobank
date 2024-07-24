import { Module } from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { ManagerController } from './manager.controller';
import { CustomerServices } from '../customer/services/customer.services';

@Module({
    imports: [],
    controllers: [ManagerController],
    providers: [ManagerServices, CustomerServices],
})
export class ManagerModule {}
