import { Transaction } from '../../domain/models/transaction.model';
import * as fs from 'fs';
import * as path from 'path';

export class TransactionRepository {  
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'transaction.json');

    // Método para garantir que o arquivo existe, caso contrário, criá-lo
    protected static ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(path.dirname(this.filePath), { recursive: true }); // Cria o diretório, se necessário
            fs.writeFileSync(this.filePath, '[]', 'utf8'); // Cria o arquivo com um array vazio
        }
    }

    static read(): Transaction[] {
        this.ensureFileExists();
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    static write(transaction: Transaction[]): void {
        this.ensureFileExists();
        fs.writeFileSync(this.filePath, JSON.stringify(transaction, null, 2), 'utf8');
    }
}
