import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '../enum/account-type.enum';

export class AccountDto {
    @ApiProperty()
    customerId: string;

    @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
    accountType: AccountType;
}
