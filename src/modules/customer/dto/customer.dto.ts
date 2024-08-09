import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
    @ApiProperty({ description: 'ID do cliente' })
    customerId: string;

    @ApiProperty({ description: 'Novo ID do gerente' })
    newManagerId: string;
}
