import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { CustomerServices } from 'src/modules/customer/services/customer.services';
import { ManagerServices } from 'src/modules/manager/services/manager.services';
import { Manager } from 'src/modules/manager/entities/manager.entity';

@Injectable()
export class BankingServices  {
    private customerService: CustomerServices
    private managerService: ManagerServices

    constructor(customerService: CustomerServices, managerService: ManagerServices) {
        this.customerService = customerService;
        this.managerService = managerService;
    }

    getCustomers() {
        const customers = this.customerService.readCustomers();
        return customers;
    }

    getManagers() {
        const data = this.managerService.readManagers();
        return data;
    }

    getManagerById(managerId: string) {
        const data = this.managerService.readManagers();;
        const manager = data.filter(
            (manager) => manager.idNumber === managerId,
        );

        return manager;
    }

    createManager(manager: CreateUserDto): Manager[] {
        const managers = this.managerService.readManagers();
        const newManager = new Manager(manager);

        managers.push(newManager);
        this.managerService.writeManager(managers);

        return managers;
    }
}
