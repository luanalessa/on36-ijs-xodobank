import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '../../domain/enum/account-type.enum';

export class CreateAccountDto {
    @ApiProperty()
    customerId: string;

    @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
    accountType: AccountType;
}
