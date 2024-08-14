import { Module } from '@nestjs/common';
import { CardController } from '../controllers/card.controller';
import { CreditCardService } from '../../domain/services/credit-card.services';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';

@Module({
    imports: [],
    controllers: [CardController],
    providers: [CreditCardService, CheckingAccountServices],
})
export class CardModule {}
