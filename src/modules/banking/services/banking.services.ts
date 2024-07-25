import { CustomerRepository } from './../../../repository/customer.repository';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { Manager } from 'src/modules/manager/entities/manager.entity';
import { AccountRepository } from 'src/repository/account.repository';
import { ManagerRepository } from 'src/repository/manager.repository';

export class BankingServices {

    agency: string = '01';

    getAccounts() {
        const accounts = AccountRepository.readAccounts();
        return accounts;
    }

    getCustomers() {
        const customers = CustomerRepository.readCustomers();
        return customers;
    }

    getManagers(managerId?: string) {
        if (managerId) return this.getManagerById(managerId);

        const data = ManagerRepository.readManagers();
        return data;
    }

   getManagerById(managerId: string) {
        console.log(managerId);
        const data = ManagerRepository.readManagers();
        const manager = data.filter(
            (manager) => manager.idNumber === managerId,
        );

        return manager;
    }

    createManager(manager: CreateUserDto): Manager[] {
        const managers = ManagerRepository.readManagers();
        const newManager = new Manager(manager);

        managers.push(newManager);
        ManagerRepository.writeManager(managers);

        return managers;
    }

    accountNumberGenerator() {
        const accounts = this.getAccounts();
        const accountNumber = `${accounts.length.toString().padStart(4, '0')}`;
        return accountNumber;
    }

}
