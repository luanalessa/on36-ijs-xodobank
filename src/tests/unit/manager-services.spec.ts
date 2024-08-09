import { Test, TestingModule } from '@nestjs/testing';
import { ManagerServices } from '../../modules/manager/services/manager.services';
import { Manager } from '../../modules/manager/entities/manager.entity';
import { ManagerRepository } from '../../repository/manager.repository';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { CustomerRepository } from '../../repository/customer.repository';
import { Customer } from '../../modules/customer/entities/customer.entity';

jest.mock('../../repository/manager.repository');
jest.mock('../../repository/customer.repository');

describe('ManagerServices', () => {
    let service: ManagerServices;
    let mockRepository: jest.Mocked<typeof ManagerRepository>;
    let mockCustomerRepository: jest.Mocked<typeof CustomerRepository>;

    beforeEach(async () => {
        mockRepository = ManagerRepository as jest.Mocked<typeof ManagerRepository>;

        let managers: Manager[] = [
            new Manager({
                name: 'John Doe',
                idNumber: '12345',
                address: '123 Main St',
                phone: '555-5555',
                dateOfBirth: new Date('1990-01-01'),
                email: 'john.doe@example.com',
                password: 'password',
            }),
            new Manager({
                name: 'Jane Doe',
                idNumber: '54321',
                address: '456 Elm St',
                phone: '555-5556',
                dateOfBirth: new Date('1992-02-02'),
                email: 'jane.doe@example.com',
                password: 'password123',
            }),
        ];

        mockRepository.read.mockReturnValue(managers);
        mockRepository.write.mockImplementation((updatedManagers: Manager[]) => {
            managers = [...updatedManagers];
        });

        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerServices],
        }).compile();

        service = module.get<ManagerServices>(ManagerServices);
    });

    it('should create a manager', () => {
        const createUserDto: CreateUserDto = {
            name: 'John Doe',
            idNumber: '465465',
            address: '123 Main St',
            phone: '555-5555',
            dateOfBirth: new Date('1990-01-01'),
            email: 'john.doe@example.com',
            password: 'password',
        };

        const manager = new Manager(createUserDto);
        mockRepository.write.mockImplementation();

        const createdManager = service.create(createUserDto);
        createdManager.id = manager.id;

        expect(createdManager).toEqual(manager);
    });

    it('should get a manager', () => {
        const result = service.getManager('12345');

        expect(result.index).toBe(0);
    });

    it('should throw an error if manager is not found', () => {
        expect(() => service.getManager('1234')).toThrowError('Manager with id number 1234 not found');
    });

    it('should delete a manager', () => {
        const id = '465465';
        service.delete(id);

        expect(() => service.getManager(id)).toThrowError(`Manager with id number ${id} not found`);
    });
});
