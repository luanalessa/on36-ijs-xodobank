import { Test, TestingModule } from '@nestjs/testing';
import { ManagerServices } from '../../modules/manager/services/manager.services';
import { Manager } from '../../modules/manager/entities/manager.entity';
import { ManagerRepository } from '../../repository/manager.repository';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { CustomerRepository } from '../../repository/customer.repository';
import { Customer } from '../../modules/customer/entities/customer.entity';

jest.mock('../../repository/manager.repository');
jest.mock('../../repository/customer.repository');

describe('ManagerServicesIntegration', () => {
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

        const customer = new Customer(
            {
                name: 'Jane Doe',
                idNumber: '011111',
                address: '456 Elm St',
                phone: '555-5556',
                dateOfBirth: new Date('1992-02-02'),
                email: 'jane.doe@example.com',
                password: 'password123',
            },
            '12345',
        );
        mockCustomerRepository = CustomerRepository as jest.Mocked<typeof CustomerRepository>;

        mockCustomerRepository.read.mockReturnValue([customer]);

        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagerServices],
        }).compile();

        service = module.get<ManagerServices>(ManagerServices);
    });

    it('should add a customer to the manager and call repository write', () => {
        const customerId = '000000';
        const manager = service.getManager('12345').manager;

        service.addCustomer(customerId, manager.idNumber);

        expect(manager.customersId).toContain(customerId);
        expect(mockRepository.write).toHaveBeenCalled();
    });

    it('should switch customer management between managers', () => {
        const customerId = '011111';
        const currentManager = service.getManager('54321').manager;

        const newManager = service.getManager('12345').manager;

        service.switchCustomerManagment(customerId, newManager.idNumber, currentManager.idNumber);

        expect(currentManager.customersId).not.toContain(customerId);
        expect(newManager.customersId).toContain(customerId);
        expect(mockRepository.write).toHaveBeenCalled();
    });
});
