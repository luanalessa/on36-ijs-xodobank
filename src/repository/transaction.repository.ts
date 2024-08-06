import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import * as fs from 'fs';
import * as path from 'path';

export class TransactiontRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'transaction.json');

    static read(): Transaction[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    static write(transanction: Transaction[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(transanction, null, 2), 'utf8');
    }
}
