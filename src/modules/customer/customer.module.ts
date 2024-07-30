import { Module } from '@nestjs/common';
import { CustomerServices } from './services/customer.services';

@Module({
    imports: [],
    controllers: [],
    providers: [CustomerServices],
})
export class CustomerModule {}
