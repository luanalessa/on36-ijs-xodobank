import { Bank } from "./model/Bank";
import { Manager } from "./model/Manager";
import { Customer } from "./model/Customer";
import { SavingAccount } from "./model/SavingAccount";
import { CheckingAccount } from "./model/CheckingAccount";
import { Transaction } from "./model/Transaction";
import { TransactionType } from "./enum/TransactionType";

const bank = new Bank(
    'Xodó Bank',
    'Rua das Margaridas, 123',
    'contato@xodobank.com',
    '(00) 1234-5678',
);
bank.releaseCurrency('Xodó', 1.0, 0.03);

const currency = bank.getCurrency();

const manager = new Manager(
    'Lessa',
    '123456789',
    'Rua da Matriz, 321',
    '(00) 9876-5432',
    new Date(),
    'lessa@xodobank.com',
    'senha123',
);
const customer = new Customer(
    'Otávio',
    '987654321',
    'Rua 13, 0',
    '(00) 5555-5555',
    new Date(),
    'otavio@gmail.com',
    'senha456',
    5000,
    3000,
);
if (currency) {
    const savingAccount = new SavingAccount(
        manager,
        customer,
        currency,
        '123456789',
        '001',
        1000,
    );

    const t = new Transaction(
        500,
        TransactionType.transfer,
    );

    savingAccount.deposit(t);
    savingAccount.calculateInterest();
    console.log(`Saldo após juros: ${savingAccount.balance}`);

    const checkingAccount = new CheckingAccount(
        manager,
        customer,
        currency,
        '987654321',
        '002',
        2000,
    );
    const transaction = new Transaction(
        500,
        TransactionType.transfer,
        savingAccount,
        checkingAccount,
    );
    transaction.record(new Date());

    console.log(
        `Transação realizada: ${transaction.amount} ${currency.name} transferidos de ${transaction?.sender} para ${transaction.receiver}`,
    );
}
