import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { User } from 'src/modules/user/entities/user.entity';

export class Manager extends User {
    customersId: string[];

    constructor(user: CreateUserDto) {
        super(user.name, user.idNumber, user.address, user.phone, user.dateOfBirth, user.email, user.password);
        this.customersId = new Array<string>();
    }
}
