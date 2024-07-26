import { ApiProperty } from '@nestjs/swagger';

export class SwitchCustomerDto {
    @ApiProperty({ example: '123' })
    currentManagerId: string;

    @ApiProperty({ example: '456' })
    newManagerId: string;

    @ApiProperty({ example: '789' })
    customerId: string;
}
