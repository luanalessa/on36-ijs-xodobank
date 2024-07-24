import { BankingServices } from './services/banking.services';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banking')
@Controller('banking')
export class BankingController {
    constructor(private readonly services: BankingServices) {}

    @Get('managers')
    getManagers() {
        return this.services.getManagers();
    }

    @Get('customers')
    getCustomers() {
        return this.services.getCustomers();
    }

    @Get('manager/:managerId')
    getManagerById(@Param('managerId') managerId: string) {
        return this.services.getManagerById(managerId);
    }

    @Post("manager")
    createManager(
        @Body() manager: CreateUserDto,
    ) {
        return this.services.createManager(manager);
    }

}

