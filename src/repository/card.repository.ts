import { CardStatus } from '../modules/card/enum/card-status';
import * as fs from 'fs';
import * as path from 'path';
import { CreditCard } from 'src/modules/card/entities/credit-card.entity';

export class CardRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'card.json');

    static read() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data);
    }

    static write(cards: CreditCard[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(cards, null, 2), 'utf8');
    }
}
