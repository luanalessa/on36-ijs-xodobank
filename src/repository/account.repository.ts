import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Account } from 'src/modules/account/entities/account.entity';

export class AccountRepository {
    protected static  filePath = path.join(
        __dirname,
        '..',
        'repository',
        'data',
        'accounts.json',
    );

    static readAccounts() {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) ;
    }

    static writeAccounts(account: Account[]): void {
        fs.writeFileSync(
            this.filePath,
            JSON.stringify(account, null, 2),
            'utf8',
        );
    }
}
