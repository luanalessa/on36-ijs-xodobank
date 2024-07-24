import { User } from 'src/modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class Customer extends User {
    managerId: string;

    constructor(customer: CreateUserDto, managerId: string) {
        super(
            customer.name,
            customer.idNumber,
            customer.address,
            customer.phone,
            customer.dateOfBirth,
            customer.email,
            customer.password,
        );

        this.managerId = managerId;
    }
}
