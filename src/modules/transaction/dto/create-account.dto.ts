// src/dto/create-transaction.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAccountDto {
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
