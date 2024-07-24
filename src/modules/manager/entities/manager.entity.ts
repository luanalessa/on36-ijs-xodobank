import { Customer } from 'src/modules/customer/entities/customer.entity';
import { CreateCustomerDto } from 'src/modules/customer/dto/create-customer-dto';
import { User } from 'src/modules/user/entities/user.entity';

export class Manager extends User {
    customersId: string[];

    constructor(user: CreateCustomerDto) {
        super(
            user.name,
            user.idNumber,
            user.address,
            user.phone,
            user.dateOfBirth,
            user.email,
            user.password,
        );
        this.customersId = new Array<string>();
    }
}
