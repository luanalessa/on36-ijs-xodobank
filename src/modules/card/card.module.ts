import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CreditCardService } from './services/credit-card.services';
import { CheckingAccountServices } from '../account/services/checking-account.services';

@Module({
    imports: [],
    controllers: [CardController],
    providers: [CreditCardService, CheckingAccountServices],
})
export class CardModule {}
