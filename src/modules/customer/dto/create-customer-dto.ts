import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty({ example: 'John Doe' })
    name: string;

    @ApiProperty({ example: '12345678901' })
    idNumber: string;

    @ApiProperty({ example: '123 Main St' })
    address: string;

    @ApiProperty({ example: '123-456-7890' })
    phone: string;

    @ApiProperty({ example: '1990-01-01' })
    dateOfBirth: Date;

    @ApiProperty({ example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ example: 'strongpassword' })
    password: string;
}
