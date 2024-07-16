import { Manager } from './model/Manager';
import { Customer } from './model/Customer';
import { SavingAccount } from './model/SavingAccount';
import { CheckingAccount } from './model/CheckingAccount';
import { Transaction } from './model/Transaction';
import { TransactionType } from './enum/TransactionType';

const manager = new Manager(
    'Lessa',
    '123456789',
    'Rua da Matriz, 321',
    '(00) 9876-5432',
    new Date(),
    'lessa@xodobank.com',
    'senha123',
);

const customer1 = new Customer(
    'Customer One',
    '987654321',
    'Customer One Address',
    '987-654-3210',
    new Date('1990-01-01'),
    'customer1@example.com',
    'password1',
    5000,
    3000,
);

const customer2 = new Customer(
    'Customer Two',
    '123456789',
    'Customer Two Address',
    '123-456-7890',
    new Date('1992-01-01'),
    'customer2@example.com',
    'password2',
    6000,
    2000,
);

const checkingAccount = new CheckingAccount(customer1, '0001', 'Agency1');

const savingAccount = new SavingAccount(customer2, '0003', 'Agency1');

const depositTransaction = new Transaction(
    150,
    TransactionType.deposit,
    checkingAccount.balance,
);

const depositTransaction1 = new Transaction(
    100,
    TransactionType.deposit,
    savingAccount.balance,
);

const withdrawTransaction = new Transaction(
    10,
    TransactionType.withdraw,
    checkingAccount.balance,
);
const transferTransaction = new Transaction(
    30,
    TransactionType.transfer,
    checkingAccount.balance,
    checkingAccount,
    savingAccount,
);

checkingAccount.deposit(depositTransaction);
savingAccount.deposit(depositTransaction1);
checkingAccount.withdraw(withdrawTransaction);
checkingAccount.transfer(transferTransaction);

checkingAccount.applyMaintenanceFee();

savingAccount.calculateInterest();

console.log('Checking Account Balance:', checkingAccount.balance);
console.log('Saving Account Balance:', savingAccount.balance);
