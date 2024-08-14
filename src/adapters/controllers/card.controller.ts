import { Body, Controller, Delete, Get, Post, Query, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBody } from '@nestjs/swagger';
import { CheckingAccountServices } from '../../domain/services/checking-account.services';
import { CreateCreditCardDto } from '../../application/dto/create-card.dto';
import { CreditCardService } from '../../domain/services/credit-card.services';
import { CreatePurchaseDto } from '../../application/dto/create-purchase.dto';

@ApiTags('Credit Card')
@Controller('credit-card')
export class CardController {
    constructor(
        private readonly checkingAccountService: CheckingAccountServices,
        private readonly cardService: CreditCardService = new CreditCardService(),
    ) {}

    @Post('')
    @ApiQuery({ name: 'accountNumber' })
    async create(@Query() createCreditCard: CreateCreditCardDto, @Query('accountNumber') accountNumber: string) {
        try {
            const card = this.cardService.create(createCreditCard);
            await this.checkingAccountService.addCard(accountNumber, card.id);
            return { statusCode: HttpStatus.CREATED, message: 'Credit Card created successfully', data: { card } };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('purchase')
    @ApiBody({ type: CreatePurchaseDto })
    async createPurchase(@Body() createPurchaseDto: CreatePurchaseDto) {
        try {
            // Verifica a compra
            await this.cardService.purchase(createPurchaseDto);
            return { statusCode: HttpStatus.OK, message: 'Purchase processed successfully' };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('invoice/:cardId')
    @ApiQuery({ name: 'month', type: Number, description: 'Month of the invoice (1-12)' })
    @ApiQuery({ name: 'year', type: Number, description: 'Year of the invoice' })
    async getInvoice(@Param('cardId') cardId: string, @Query('month') month: number, @Query('year') year: number) {
        try {
            // Validar os parâmetros
            if (month < 1 || month > 12 || year < 1900) {
                throw new HttpException('Invalid month or year', HttpStatus.BAD_REQUEST);
            }

            // Obter a fatura do cartão
            const invoice = await this.cardService.getInvoice(cardId, month, year);
            return { statusCode: HttpStatus.OK, message: 'Invoice retrieved successfully', data: { invoice } };
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
