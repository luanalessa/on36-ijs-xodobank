import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { ManagerController } from './manager.controller';
import { ValidateManager } from './middlewares/manager.middleware';

@Module({
    imports: [],
    controllers: [ManagerController],
    providers: [ManagerServices],
})
export class ManagerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateManager).forRoutes(ManagerController);
    }
}
