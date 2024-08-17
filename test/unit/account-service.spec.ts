import { Account } from './../../src/domain/interfaces/account.interface';
import { SavingAccount } from './../../src/domain/models/saving-account.model';
import { Test, TestingModule } from '@nestjs/testing';
import { SavingAccountServices } from '../../src/domain/services/saving-account.services';
import { AccountRepository } from '../../src/infrastructure/repository/account.repository';
import { AccountType } from '../../src/domain/enum/account-type.enum';
import { CreateAccountDto } from '../../src/application/dto/create-account.dto';
import { CreateOperationDto } from '../../src/application/dto/create-operation.dto';
import { OperationValidator } from '../../src/domain/utils/operation-validator';
import { Transaction } from '../../src/domain/models/transaction.model';
import { TransactionType } from '../../src/domain/enum/transaction-type.enum';
import { TransactionRepository } from '../../src/infrastructure/repository/transaction.repository';
import { AccountOperationDetails } from '../../src/domain/models/valueObjects/account-operation-details';

jest.mock('../../src/infrastructure/repository/account.repository');
jest.mock('../../src/infrastructure/repository/transaction.repository');
jest.mock('../../src/domain/utils/operation-validator');


describe.only('AccountService', () => {
    let service: SavingAccountServices;
    let mockRepository: jest.Mocked<typeof AccountRepository>;
    let mockTransactionRepository: jest.Mocked<typeof TransactionRepository>;


    beforeEach(async () => {
        mockRepository = AccountRepository as jest.Mocked<typeof AccountRepository>;
        mockTransactionRepository = TransactionRepository as jest.Mocked<typeof TransactionRepository>;


        let accounts: SavingAccount[] = [
            new SavingAccount('12345678900', AccountType.Savings, '00012345', '001'),
            new SavingAccount('98765432100', AccountType.Savings, '00067890', '001')
        ];

        let transactions: Transaction[] = new Array<Transaction>();

        accounts[0].balance = 1000;
        accounts[1].balance = 500;

        mockRepository.read.mockReturnValue(accounts);
        mockRepository.write.mockImplementation((account: SavingAccount[]) => {
            accounts = [...account];
        });

        mockTransactionRepository.read.mockReturnValue(transactions);
        mockTransactionRepository.write.mockImplementation((transaction: Transaction[]) => {
            transactions = [...transaction];
        });
        
        const module: TestingModule = await Test.createTestingModule({
            providers: [SavingAccountServices],
        }).compile();

        service = module.get<SavingAccountServices>(SavingAccountServices);
    });

    it('should create an account', () => {
        const createAccountDto: CreateAccountDto = {
            holderDocument: '12345678900',
            accountType: AccountType.Savings,
        };

       let expected = service.create(createAccountDto);
       let account = mockRepository.read()
        expect(account[2]).toEqual(expected);
    });

     it('should deposit amount into SavingAccount', () => {
        const transactionDto: CreateOperationDto = {
            amount: 200,
            description: 'Salary Deposit',
            receiver: 'Carlos Silva',
            receiverAccount: '00012345',
            debtor: '',
            debtorAccount: ''
        };

        (OperationValidator.prototype.validate as jest.Mock).mockReturnValue(true);

        service.deposit(transactionDto);
        const accounts = mockRepository.read();
        const updatedAccount = accounts.find(acc => acc.accountNumber === '00012345');
        
        expect(updatedAccount?.balance).toBe(1200);
    });

    it('should withdraw amount into SavingAccount', () => {
        const transactionDto: CreateOperationDto = {
            amount: 300,
            description: 'ATM Withdrawal',
            receiver: '',
            receiverAccount: '',
            debtor: 'Carlos Silva',
            debtorAccount: '00012345',
        };

        (OperationValidator.prototype.validate as jest.Mock).mockReturnValue(true);

        service.withdraw(transactionDto);
        const accounts = mockRepository.read();
        const updatedAccount = accounts.find(acc => acc.accountNumber === '00012345');
        
        expect(updatedAccount?.balance).toBe(700); 
    });

    it('should transfer amount between SavingAccounts', () => {
        const transactionDto: CreateOperationDto = {
            amount: 100,
            description: 'Transfer to friend',
            debtor: 'Carlos Silva',
            debtorAccount: '00012345',
            receiver: 'Mariana Souza',
            receiverAccount: '00067890'
        };

        (OperationValidator.prototype.validate as jest.Mock).mockReturnValue(true);

        service.transfer(transactionDto);
        const accounts = mockRepository.read();

        const debtorAccount = accounts.find(acc => acc.accountNumber === '00012345');
        const receiverAccount = accounts.find(acc => acc.accountNumber === '00067890');
        
        expect(debtorAccount?.balance).toBe(900); 
        expect(receiverAccount?.balance).toBe(600); 
        expect(debtorAccount?.outcomes.length).toBe(1);
        expect(receiverAccount?.incomes.length).toBe(1);
    });

    it('should return statement of SavingAccount', () => {
        const transactions = [
            new Transaction(200, TransactionType.deposit, 'Salary Deposit', 
                new AccountOperationDetails(
                    "12345678900", 
                    "00067890",
                    "98765432100",
                    '00012345' 
             )),
             new Transaction(300, TransactionType.withdraw, 'Salary Deposit', 
                new AccountOperationDetails(
                    "12345678900", 
                    "00067890",
                    "98765432100",
                    '00012345' 
             ))];
        
        (TransactionRepository.read as jest.Mock).mockReturnValue(transactions);

        const statement = service.statement('00012345');

        expect(statement.length).toBe(2);
        expect(statement[0].amount).toBe(200);
        expect(statement[1].amount).toBe(300);
    });
    
});
