import { Customer } from 'src/modules/customer/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class CustomerServices {
    protected readonly customersFilePath = path.join(
        __dirname,
        '..',
        '..',
        '..',
        'data',
        'customer.json',
    );

    public readCustomers(): Customer[] {
        const data = fs.readFileSync(this.customersFilePath, 'utf8');
        return JSON.parse(data) as Customer[];
    }

    public writeCustomers(customers: Customer[]): void {
        fs.writeFileSync(
            this.customersFilePath,
            JSON.stringify(customers, null, 2),
            'utf8',
        );
    }
}
