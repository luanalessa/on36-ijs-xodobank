import { Module } from '@nestjs/common';
import { BankingServices } from './services/banking.services';
import { BankingController } from './banking.controller';

@Module({
    imports: [],
    controllers: [BankingController],
    providers: [BankingServices],
})
export class BankingModule {}
