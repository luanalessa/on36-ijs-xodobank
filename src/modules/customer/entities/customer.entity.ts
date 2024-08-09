import { User } from '../../user/entities/user.entity';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class Customer extends User {
    managerId: string;
    accountsId: string[];

    constructor(customer: CreateUserDto, managerId: string) {
        super(customer.name, customer.idNumber, customer.address, customer.phone, customer.dateOfBirth, customer.email, customer.password);

        this.managerId = managerId;
        this.accountsId = new Array<string>();
    }
}
