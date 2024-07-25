import { ApiProperty } from '@nestjs/swagger';
import { AccountType } from '../enum/account-type.enum';

export class CreateAccountDto {
    @ApiProperty()
    customerId: string;

    @ApiProperty()
    managerId: string;

    @ApiProperty({ enum: AccountType, enumName: 'AccountType' })
    accountType: AccountType;
}
