import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Customer } from '../customer/entities/customer.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Manager')
@Controller('managers')
export class ManagerController {
    constructor(private readonly managerService: ManagerServices) {}

    @Get(':managerId/customer')
    getCustomerById(@Param('managerId') managerId: string) {
        return this.managerService.getCustomersByManager(managerId);
    }

    @Post(':managerId/customer')
    createCustomer(
        @Param('managerId') managerId: string,
        @Body() customer: CreateUserDto,
    ) {
        return this.managerService.createCustomer(customer, managerId);
    }
}

