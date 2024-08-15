import { Test, TestingModule } from '@nestjs/testing';
import { CustomerServices } from '../../src/domain/services/customer.services';
import { CreateUserDto } from '../../src/application/dto/create-user.dto';
import { CustomerRepository } from '../../src/infrastructure/repository/customer.repository';
import { Customer } from '../../src/domain/models/customer.model';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('../../src/infrastructure/repository/customer.repository');

describe.only('CustomerServices', () => {
    let service: CustomerServices;
    let mockRepository: jest.Mocked<typeof CustomerRepository>;

    beforeEach(async () => {
        mockRepository = CustomerRepository as jest.Mocked<typeof CustomerRepository>;

        let customers: Customer[] = [
            new Customer(
                {
                    name: 'John Doe',
                    idNumber: '12345',
                    address: '123 Main St',
                    phone: '555-5555',
                    dateOfBirth: new Date('1990-01-01'),
                    email: 'john.doe@example.com',
                    password: 'password',
                },
                '1111',
            ),
        ];

        mockRepository.read.mockReturnValue(customers);
        mockRepository.write.mockImplementation((updatedCustomer: Customer[]) => {
            customers = [...updatedCustomer];
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomerServices],
        }).compile();

        service = module.get<CustomerServices>(CustomerServices);
    });

    it('should create a customer', () => {
        const createUserDto: CreateUserDto = {
            name: 'John Doe',
            idNumber: '465465',
            address: '123 Main St',
            phone: '555-5555',
            dateOfBirth: new Date('1990-01-01'),
            email: 'john.doe@example.com',
            password: 'password',
        };

        const managerId = '99999';

        const customer = new Customer(createUserDto, managerId);
        mockRepository.write.mockImplementation();

        const createdCustomer = service.create(createUserDto, managerId);
        createdCustomer.id = customer.id;

        expect(createdCustomer).toEqual(customer);
    });

    it('should get a customer', () => {
        const result = service.getCustomer('12345');

        expect(result.index).toBe(0);
    });

    it('should delete a customer', () => {
        const id = '12345';
        service.delete(id);
        expect(() => service.getCustomer("12345")).toThrow(HttpException);
    });

    it('should throw an error if customer is not found', () => {

        expect(() => service.getCustomer("123")).toThrowError(`Customer with id number 123 not found`);

    });

   
});
