// src/dto/create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsNumber()
    @ApiProperty()
    amount: number;

    @IsString()
    @ApiProperty()
    customerId: string;

    @IsString()
    @ApiProperty()
    accountNumber: string;
}
