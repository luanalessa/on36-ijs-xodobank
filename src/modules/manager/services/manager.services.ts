import { Injectable } from '@nestjs/common';
import { BankingServices } from './../../banking/services/banking.services';
import { Customer } from '../../customer/entities/customer.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { Account } from 'src/modules/account/entities/account.entity';
import { AccountType } from 'src/modules/account/enum/account-type.enum';
import { CheckingAccount } from 'src/modules/account/entities/checking-account';
import { SavingAccount } from 'src/modules/account/entities/saving-account';
import { ManagerRepository } from 'src/repository/manager.repository';
import { CustomerRepository } from 'src/repository/customer.repository';
import { CreateAccountDto } from 'src/modules/account/dto/create-account.dto';
import { AccountRepository } from 'src/repository/account.repository';

@Injectable()
export class ManagerServices {
    private bankServices : BankingServices = new BankingServices();

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

    createAccount(createAccountDto: CreateAccountDto): Account {
        const num = this.bankServices.accountNumberGenerator();
        const agency = this.bankServices.agency;

        const account =
            createAccountDto.accountType == AccountType.Savings
                ? new SavingAccount(createAccountDto.customerId, createAccountDto.accountType, num, agency)
                : new CheckingAccount(createAccountDto.customerId,  createAccountDto.accountType, num, agency);

        const customers = CustomerRepository.readCustomers();
        const customerIndex = customers.findIndex(
            (c) => c.idNumber === createAccountDto.customerId,
        );

        const accounts = AccountRepository.readAccounts();
        accounts.push(account);
        AccountRepository.writeAccounts(accounts);

        customers[customerIndex]['accounstId'].push(account.accountNumber);
        CustomerRepository.writeCustomers(customers);

        return account;
    }
}
