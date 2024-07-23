import { UserDto } from "src/modules/user/dto/user.dto";
import { User } from "src/modules/user/entities/user.entity";

export class Customer extends User {
    managerId: string;
    
    constructor(
        user : UserDto,
        managerId: string
    ) {
        super(user.name, user.idNumber, user.address, user.phone, user.dateOfBirth, user.email, user.password);
        this.managerId = managerId
    }
}