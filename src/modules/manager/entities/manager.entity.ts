import { Customer } from "src/modules/customer/entities/customer.entity";
import { UserDto } from "src/modules/user/dto/user.dto";
import { User } from "src/modules/user/entities/user.entity";

export class Manager extends User {
    customers: Customer[];

    constructor(
        user : UserDto
    ) {
        super(user.name, user.idNumber, user.address, user.phone, user.dateOfBirth, user.email, user.password);
        this.customers = [];
    }
}