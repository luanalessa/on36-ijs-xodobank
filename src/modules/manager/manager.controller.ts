import { Body, Controller, Delete, Param, Patch, Post, Query } from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountDto } from '../account/dto/account.dto';
import { SwitchCustomerDto } from '../banking/dto/switch-customer.dto';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
    constructor(private readonly service: ManagerServices) {}

    @Post('')
    createManager(@Body() manager: CreateUserDto) {
        return this.service.createManager(manager);
    }

    @Post('customer')
    @ApiQuery({ name: 'managerId', type: String })
    createCustomer(@Param('managerId') managerId: string, @Body() customer: CreateUserDto) {
        return this.service.createCustomer(customer, managerId);
    }

    @Post('customer/account')
    @ApiQuery({ name: 'managerId', type: String })
    createAccount(@Query() createAccountDto: AccountDto) {
        return this.service.createAccount(createAccountDto);
    }

    @Patch('customer/switch-management')
    switchCustomer(@Query() switchCustomer: SwitchCustomerDto) {
        return this.service.switchCustomer(switchCustomer);
    }

    @Delete('')
    @ApiQuery({ name: 'managerId', type: String })
    deleteManager(@Query('managerId') managerId: string) {
        return this.service.deleteManager(managerId);
    }

    @Delete('customer/account')
    deleteAccount(@Query() accountNumber: string) {
        return this.service.deleteAccount(accountNumber);
    }
}
