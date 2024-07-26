import { Injectable } from '@nestjs/common';
import { BankingServices } from 'src/modules/banking/services/banking.services';
import { Customer } from '../../customer/entities/customer.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { Account } from 'src/modules/account/entities/account.entity';
import { AccountType } from 'src/modules/account/enum/account-type.enum';
import { CheckingAccount } from 'src/modules/account/entities/checking-account';
import { SavingAccount } from 'src/modules/account/entities/saving-account';
import { ManagerRepository } from 'src/repository/manager.repository';
import { CustomerRepository } from 'src/repository/customer.repository';
import { AccountDto } from 'src/modules/account/dto/account.dto';
import { AccountRepository } from 'src/repository/account.repository';
import { AccountStatus } from 'src/modules/account/enum/account-status.enum';
import { Manager } from '../entities/manager.entity';

@Injectable()
export class ManagerServices {
    private bankServices: BankingServices = new BankingServices();

    getCustomersByManager(managerId: string) {
        try {
            const data = CustomerRepository.readCustomers();
            const customer = data.filter(
                (customer) => customer.managerId === managerId,
            );

            return customer;
        } catch (err) {
            return [];
        }
    }

    createCustomer(customer: CreateUserDto, managerId: string): Customer {
        const customers = CustomerRepository.readCustomers();
        const newCustomer = new Customer(customer, managerId);

        customers.push(newCustomer);

        const managers = ManagerRepository.readManagers();
        const managerIndex = managers.findIndex(
            (m) => m.idNumber === managerId,
        );

        managers[managerIndex]['customersId'].push(customer.idNumber);
        ManagerRepository.writeManager(managers);
        CustomerRepository.writeCustomers(customers);

        return newCustomer;
    }

    createAccount(account: AccountDto): Account {
        const num = this.bankServices.accountNumberGenerator();
        const agency = this.bankServices.agency;

        const newAccount =
            account.accountType == AccountType.Savings
                ? new SavingAccount(
                      account.customerId,
                      account.accountType,
                      num,
                      agency,
                  )
                : new CheckingAccount(
                      account.customerId,
                      account.accountType,
                      num,
                      agency,
                  );

        const customers = CustomerRepository.readCustomers();
        const customerIndex = customers.findIndex(
            (c) => c.idNumber === account.customerId,
        );

        const accounts = AccountRepository.readAccounts();
        accounts.push(newAccount);
        AccountRepository.writeAccounts(accounts);

        customers[customerIndex]['accountsId'].push(newAccount.accountNumber);
        CustomerRepository.writeCustomers(customers);

        return newAccount;
    }

    deleteAccount(account: AccountDto): void {
        const accounts = AccountRepository.readAccounts();
        const accountIndex = accounts.findIndex(
            (index: Account) =>
                index.customerId == account.customerId &&
                index.type == account.accountType,
        );

        accounts[accountIndex]['status'] = AccountStatus.deleted;

        const customers = CustomerRepository.readCustomers();
        const customerIndex = customers.findIndex(
            (index: Customer) => index.idNumber == account.customerId,
        );
        const accountNumber = accounts[accountIndex]['accountNumber'];

        const updatedCustomerAccountList = customers[customerIndex][
            'accountsId'
        ].filter((accountId: string) => accountId != accountNumber);
        customers[customerIndex]['accountsId'] = updatedCustomerAccountList;

        AccountRepository.writeAccounts(accounts);
        CustomerRepository.writeCustomers(customers);
    }

    createManager(manager: CreateUserDto): Manager[] {
        const managers = ManagerRepository.readManagers();
        const newManager = new Manager(manager);

        managers.push(newManager);
        ManagerRepository.writeManager(managers);

        return managers;
    }

    deleteManager(managerId: string): void {
        const managers = ManagerRepository.readManagers();
        const index = managers.findIndex(
            (manager: Manager) => manager.idNumber == managerId,
        );

        managers[index]['isActive'] = false;
        ManagerRepository.writeManager(managers);
    }

    switchCustomer(switchCustomer): void {
        const customers = CustomerRepository.readCustomers();
        const customerIndex = customers.findIndex(
            (customer: Customer) =>
                customer.idNumber == switchCustomer.customerId,
        );

        const managers = ManagerRepository.readManagers();
        const currentManagerIndex = managers.findIndex(
            (manager: Manager) =>
                manager.idNumber == switchCustomer.currentManagerId,
        );
        const newManagerIndex = managers.findIndex(
            (manager: Manager) =>
                manager.idNumber == switchCustomer.newManagerId,
        );

        const customersUpdated = managers[currentManagerIndex][
            'customersId'
        ].filter((id) => id != switchCustomer.customerId);
        managers[currentManagerIndex]['customersId'] = customersUpdated;
        managers[newManagerIndex]['customersId'].push(
            switchCustomer.customerId,
        );

        customers[customerIndex]['managerId'] = switchCustomer.newManagerId;

        CustomerRepository.writeCustomers(customers);
        ManagerRepository.writeManager(managers);
    }
}
