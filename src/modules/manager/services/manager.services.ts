import { Injectable } from '@nestjs/common';
import { BankingServices } from 'src/modules/banking/services/banking.services';
import { Customer } from '../../customer/entities/customer.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { Account } from 'src/modules/account/interfaces/account.interface';
import { AccountType } from 'src/modules/account/enum/account-type.enum';
import { ManagerRepository } from 'src/repository/manager.repository';
import { CustomerRepository } from 'src/repository/customer.repository';
import { AccountDto } from 'src/modules/account/dto/account.dto';
import { AccountRepository } from 'src/repository/account.repository';
import { AccountStatus } from 'src/modules/account/enum/account-status.enum';
import { Manager } from '../entities/manager.entity';
import { SavingAccountServices } from 'src/modules/account/services/saving-account.services';
import { CheckingAccountServices } from 'src/modules/account/services/checking-account.services';
import { SwitchCustomerDto } from 'src/modules/banking/dto/switch-customer.dto';

@Injectable()
export class ManagerServices {
    private bankServices: BankingServices;
    private savingAccountServices: SavingAccountServices;
    private checkingAccountServices: CheckingAccountServices;

    private accounts: Account[];
    private customers: Customer[];
    private managers: Manager[];

    constructor() {
        this.bankServices = new BankingServices();
        this.savingAccountServices = new SavingAccountServices();
        this.checkingAccountServices = new CheckingAccountServices();

        this.accounts = AccountRepository.readAccounts();
        this.managers = ManagerRepository.readManagers();
        this.customers = CustomerRepository.readCustomers();
    }

    createCustomer(user: CreateUserDto, managerId: string): Customer {
        const customer = new Customer(user, managerId);

        const managerIndex = this.managers.findIndex((manager) => manager.idNumber === managerId);

        this.managers[managerIndex]['customersId'].push(user.idNumber);
        this.customers.push(customer);

        ManagerRepository.writeManager(this.managers);
        CustomerRepository.writeCustomers(this.customers);

        return customer;
    }

    createAccount({ customerId, accountType }: AccountDto): Account {
        const num = this.bankServices.accountNumberGenerator();
        const agency = this.bankServices.agency;

        const account =
            accountType == AccountType.Savings
                ? this.savingAccountServices.createAccount(customerId, accountType, num, agency)
                : this.checkingAccountServices.createAccount(customerId, accountType, num, agency);

        const customerIndex = this.customers.findIndex((customer) => customer.idNumber === customerId);

        this.accounts.push(account);
        this.customers[customerIndex]['accountsId'].push(account.accountNumber);

        CustomerRepository.writeCustomers(this.customers);
        AccountRepository.writeAccounts(this.accounts);

        return account;
    }

    deleteAccount(accountNumber: string): void {
        const accountIndex = this.accounts.findIndex((index: Account) => index.accountNumber == accountNumber);
        const customerIndex = this.customers.findIndex((customer) => customer.idNumber === this.accounts[accountIndex]['customerId']);
        const accountListUpdated = this.customers[customerIndex]['accountsId'].filter((accountId: string) => accountId != accountNumber);

        this.accounts[accountIndex]['status'] = AccountStatus.deleted;
        this.customers[customerIndex]['accountsId'] = accountListUpdated;

        AccountRepository.writeAccounts(this.accounts);
        CustomerRepository.writeCustomers(this.customers);
    }

    createManager(user: CreateUserDto): Manager {
        const manager = new Manager(user);
        this.managers.push(manager);
        ManagerRepository.writeManager(this.managers);
        return manager;
    }

    deleteManager(managerId: string): void {
        const index = this.managers.findIndex((manager: Manager) => manager.idNumber == managerId);

        this.managers[index]['isActive'] = false;
        ManagerRepository.writeManager(this.managers);
    }

    switchCustomer(switchCustomer: SwitchCustomerDto): void {
        const customerIndex = this.customers.findIndex((customer: Customer) => customer.idNumber == switchCustomer.customerId);

        const currentManagerIndex = this.managers.findIndex((manager: Manager) => manager.idNumber == switchCustomer.currentManagerId);
        const newManagerIndex = this.managers.findIndex((manager: Manager) => manager.idNumber == switchCustomer.newManagerId);

        const customersUpdated = this.managers[currentManagerIndex]['customersId'].filter((id) => id != switchCustomer.customerId);
        this.managers[currentManagerIndex]['customersId'] = customersUpdated;
        this.managers[newManagerIndex]['customersId'].push(switchCustomer.customerId);

        this.customers[customerIndex]['managerId'] = switchCustomer.newManagerId;

        CustomerRepository.writeCustomers(this.customers);
        ManagerRepository.writeManager(this.managers);
    }
}
