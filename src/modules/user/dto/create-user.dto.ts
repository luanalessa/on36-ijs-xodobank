import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    idNumber: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    dateOfBirth: Date;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
