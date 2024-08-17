import * as fs from 'fs';
import * as path from 'path';
import { Manager } from 'src/modules/manager/entities/manager.entity';

export class ManagerRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'managers.json');

    static read(): Manager[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data).filter((manager: Manager) => manager.isActive == true);
    }

    static write(manager: Manager[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(manager, null, 2), 'utf8');
    }
}
