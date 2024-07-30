import { Module } from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { ManagerController } from './manager.controller';

@Module({
    imports: [],
    controllers: [ManagerController],
    providers: [ManagerServices],
})
export class ManagerModule {}
