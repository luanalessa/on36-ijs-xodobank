import { Manager } from './model/Manager';
import { Customer } from './model/Customer';
import { SavingAccount } from './model/SavingAccount';
import { Bank } from './model/Bank';
import { Transaction } from './model/Transaction';
import { TransactionType } from './enum/TransactionType';

// Criando a instancia do banco pra gerir a criação das contas
// e futuramente cadastrar gerentes
const bank = new Bank('Xodó Bank');

// Criando o gerente.
// Ele é o único que pode cadastrar clientes e contas.
const manager = new Manager(
    'Lessa',
    '130.798.390-13',
    'Rua da Matriz, 321',
    '(00) 9876-5432',
    new Date(),
    'lessa@xodobank.com',
    'senha123',
);

// Criando clientes
const customerOne = manager.createCustomer(
    'Customer One',
    '090.464.090-66',
    'Customer One Address',
    '987-654-3210',
    new Date('1990-01-01'),
    'customer1@example.com',
    'password1',
);

const customerTwo = manager.createCustomer(
    'Customer Two',
    '484.576.970-05',
    'Customer Two Address',
    '123-456-7890',
    new Date('1992-01-01'),
    'customer2@example.com',
    'password2',
);

// Criando as contas dos respectivos clientes (abertura)
const checkingAccount = bank.createCheckingAccount(customerOne);
const savingAccount = bank.createSavingAccount(customerTwo);

// Realizando depósito para ativação das contas abertas
const checkingAccountDepositTest = new Transaction(
    8,
    TransactionType.deposit,
    checkingAccount.balance,
);

const checkingAccountDeposit = new Transaction(
    150,
    TransactionType.deposit,
    checkingAccount.balance,
);

const savingAccountdeposit = new Transaction(
    100,
    TransactionType.deposit,
    savingAccount.balance,
);
checkingAccount.deposit(checkingAccountDepositTest); // output: "The first deposit need to be more than R$ 10  to activate the account"
checkingAccount.deposit(checkingAccountDeposit); // balance: "150"
savingAccount.deposit(savingAccountdeposit); // balance: " 100"

// Transacionando dinheiro das contas
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

const withdrawTransaction2 = new Transaction(
    1000,
    TransactionType.withdraw,
    checkingAccount.balance,
);

checkingAccount.withdraw(withdrawTransaction); // balance: " 140"
checkingAccount.transfer(transferTransaction); // balance: " 110"
checkingAccount.withdraw(withdrawTransaction2); // balance: "-890"

// Aplicando taxa de juros na conta corrente
// se o limite de check espcial estiver sendo usado
checkingAccount.applyMaintenanceFee(); // balance: "-890.267", juros: "0.267"

// Aplicando rendimento na poupança
savingAccount.calculateInterest(); // balance: "131.3", , rendimento: "1.3"

// Balanço final de ambas as contas
console.log('Checking Account Balance:', checkingAccount.balance);
console.log('Saving Account Balance:', savingAccount.balance);
