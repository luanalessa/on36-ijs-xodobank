import { Injectable } from '@nestjs/common';
import { Customer } from '../../customer/entities/customer.entity';
import { Manager } from './../entities/manager.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { CustomerServices } from 'src/modules/customer/services/customer.services';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ManagerServices {
    private customerService: CustomerServices;
    protected readonly managerFilePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'data',
        'manager.json',
    );

    constructor(customerService: CustomerServices) {
        this.customerService = customerService;
    }

    readManagers(): Manager[] {
        const data = fs.readFileSync(this.managerFilePath, 'utf8');
        return JSON.parse(data) as Manager[];
    }

    writeManager(manager: Manager[]): void {
        fs.writeFileSync(
            this.managerFilePath,
            JSON.stringify(manager, null, 2),
            'utf8',
        );
    }

    getCustomersByManager(managerId: string) {
        try {
            const data = this.customerService.readCustomers();
            const customer = data.filter(
                (customer) => customer.managerId === managerId,
            );

            return customer;
        } catch (err) {
            return [];
        }
    }

    createCustomer(customer: CreateUserDto, managerId: string): Manager {
        const customers = this.customerService.readCustomers();
        const newCustomer = new Customer(customer, managerId);

        customers.push(newCustomer);

        const managers = this.readManagers();
        const managerIndex = managers.findIndex(
            (m) => m.idNumber === managerId,
        );

        managers[managerIndex]['customersId'].push(customer.idNumber);
        this.writeManager(managers);

        return managers[managerIndex];
    }
}
