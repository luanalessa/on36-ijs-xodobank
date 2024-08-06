import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { Customer } from "../entities/customer.entity";
import { CustomerRepository } from "src/repository/customer.repository";

@Injectable()
export class CustomerServices {
    private customers: Customer[];

    constructor() {
        this.customers = CustomerRepository.read();
    }

    private handleError(operation: string, error: any) {
        throw new HttpException(`${operation} failed: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private update(customerId: string, updates: Partial<Customer>): void {
        try {
            const customerIndex = this.customers.findIndex((customer: Customer) => customer.id == customerId);
            if (customerIndex === -1) {
                throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
            }
            this.customers[customerIndex] = { ...this.customers[customerIndex], ...updates };
            CustomerRepository.write(this.customers);
        } catch (error) {
            this.handleError('Error:', error);
        }
    }

    create(user: CreateUserDto, managerId: string): void {
        try {
            const customer = new Customer(user, managerId);
            this.customers.push(customer);
            CustomerRepository.write(this.customers);
        } catch (error) {
            this.handleError('Create customer', error);
        }
    }

    delete(customerId: string): void {
        try {
            this.update(customerId, { isActive: false });
            CustomerRepository.write(this.customers);
        } catch (error) {
            this.handleError('Delete customer', error);
        }
    }

    addAccount(customerId: string, accountNumber: string): void {
        try {
            const customerIndex = this.customers.findIndex((customer: Customer) => customer.id == customerId);
            if (customerIndex === -1) {
                throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
            }
            const customer = this.customers[customerIndex];
            const updatedAccountsId = [...customer.accountsId, accountNumber];
            this.update(customerId, { accountsId: updatedAccountsId });
        } catch (error) {
            this.handleError('Add account', error);
        }
    }

    deleteAccount(customerId: string, accountNumber: string): void {
        try {
            const customerIndex = this.customers.findIndex((customer: Customer) => customer.id == customerId);
            if (customerIndex === -1) {
                throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
            }
            const updatedAccountsId = this.customers[customerIndex]['accountsId'].filter((accountId: string) => accountId != accountNumber);
            this.update(customerId, { accountsId: updatedAccountsId });
        } catch (error) {
            this.handleError('Delete account', error);
        }
    }

    switchCustomerManagment(customerId: string, newManagerId: string): void {
        try {
            this.update(customerId, { managerId: newManagerId });
        } catch (error) {
            this.handleError('Switch customer management', error);
        }
    }
}
