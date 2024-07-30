import * as fs from 'fs';
import * as path from 'path';
import { Customer } from 'src/modules/customer/entities/customer.entity';

export class CustomerRepository {
    protected static filePath = path.join(__dirname, '..', 'repository', 'data', 'customers.json');

    static readCustomers(): Customer[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Customer[];
    }

    static writeCustomers(customer: Customer[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(customer, null, 2), 'utf8');
    }
}
