import { Module } from '@nestjs/common';
import { BankingServices } from '../../domain/services/banking.services';
import { BankingController } from '../controllers/banking.controller';

@Module({
    imports: [],
    controllers: [BankingController],
    providers: [BankingServices],
})
export class BankingModule {}
