import { Manager } from '../entities/manager.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ManagerRepository } from 'src/repository/manager.repository';

@Injectable()
export class ManagerServices {
    private managers: Manager[];

    constructor() {
        this.managers = ManagerRepository.read();
    }

    create(user: CreateUserDto): Manager {
        const manager = new Manager(user);
        this.managers.push(manager);
        ManagerRepository.write(this.managers);
        return manager;
    }

    delete(managerId: string): void {
        this.update(managerId, { isActive: false })
    }

    private update(id: string, updates: Partial<Manager>): void {
        const index = this.managers.findIndex((manager: Manager) => manager.id == id);
        this.managers[index] = { ...this.managers[index], ...updates };

        ManagerRepository.write(this.managers);
    }

    switchCustomerManagment(customerId: string, newManagerId: string, currentManagerId: string): void {
        const currentManagerIndex = this.managers.findIndex((manager: Manager) => manager.id == currentManagerId);
        const newManagerIndex = this.managers.findIndex((manager: Manager) => manager.id == newManagerId);

        const currentManagerUpdated = this.managers[currentManagerIndex]['customersId'].filter((id) => id != customerId);
        this.update(currentManagerId, {customersId: currentManagerUpdated })

        this.managers[newManagerIndex]['customersId'].push( customerId);
        this.update(newManagerId, {customersId: this.managers[newManagerIndex]['customersId'] })
    }

    addCustomer(customerId: string, managerId: string): void {
            const managerIndex = this.managers.findIndex( (manager : Manager) => manager.id === managerId);

            this.managers[managerIndex]["customersId"].push(customerId)
            this.update(managerId, {customersId: this.managers[managerIndex]["customersId"] })
    }
}
