import { Test, TestingModule } from '@nestjs/testing';
import { ManagerServices } from '../../src/domain/services/manager.services';
import { Manager } from '../../src/domain/models/manager.model';
import { ManagerRepository } from '../../src/infrastructure/repository/manager.repository';
import { CreateUserDto } from '../../src/application/dto/create-user.dto';
import { CustomerRepository } from '../../src/infrastructure/repository/customer.repository';
import { Customer } from '../../src/domain/models/customer.model';
import { Address } from '../../src/domain/models/valueObjects/user-address';  // Importando a nova classe Address

jest.mock('../../src/infrastructure/repository/manager.repository');
jest.mock('../../src/infrastructure/repository/customer.repository');

describe('ManagerServices', () => {
    let service: ManagerServices;
    let mockRepository: jest.Mocked<typeof ManagerRepository>;
    let mockCustomerRepository: jest.Mocked<typeof CustomerRepository>;

    beforeEach(async () => {
        mockRepository = ManagerRepository as jest.Mocked<typeof ManagerRepository>;

        let managers: Manager[] = [
            new Manager({
                name: 'João Silva',
                idNumber: '12345',
                address: new Address('Rua Principal', '123', 'Cidade Exemplo', 'Estado Exemplo', '12345-678', 'Brasil'),
                phone: '555-5555',
                dateOfBirth: new Date('1990-01-01'),
                email: 'joao.silva@exemplo.com',
                password: 'senha123',
            }),
            new Manager({
                name: 'Ana Silva',
                idNumber: '54321',
                address: new Address('Avenida Elm', '456', 'Cidade Exemplo', 'Estado Exemplo', '65432-109', 'Brasil'),
                phone: '555-5556',
                dateOfBirth: new Date('1992-02-02'),
                email: 'ana.silva@exemplo.com',
                password: 'senha1234',
            }),
        ];

        mockRepository.read.mockReturnValue(managers);
        mockRepository.write.mockImplementation((updatedManagers: Manager[]) => {
            managers = [...updatedManagers];
        });

        const customer = new Customer(
            {
                name: 'Ana Silva',
                idNumber: '011111',
                address: new Address('Avenida Elm', '456', 'Cidade Exemplo', 'Estado Exemplo', '65432-109', 'Brasil'),
                phone: '555-5556',
                dateOfBirth: new Date('1992-02-02'),
                email: 'ana.silva@exemplo.com',
                password: 'senha1234',
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

    it('should create a manager', () => {
        const createUserDto: CreateUserDto = {
            name: 'João Silva',
            idNumber: '465465',
            address: new Address('Rua Principal', '123', 'Cidade Exemplo', 'Estado Exemplo', '12345-678', 'Brasil'),
            phone: '555-5555',
            dateOfBirth: new Date('1990-01-01'),
            email: 'joao.silva@exemplo.com',
            password: 'senha123',
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

        service.switchCustomerManagement(customerId, newManager.idNumber, currentManager.idNumber);

        expect(currentManager.customersId).not.toContain(customerId);
        expect(newManager.customersId).toContain(customerId);
        expect(mockRepository.write).toHaveBeenCalled();
    });
});
