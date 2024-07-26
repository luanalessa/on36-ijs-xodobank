import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountDto } from '../account/dto/account.dto';
import { SwitchCustomerDto } from '../banking/dto/switch-customer.dto';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
    constructor(private readonly service: ManagerServices) {}

    @Get(':managerId/customers')
    getCustomers(@Param('managerId') managerId: string) {
        return this.service.getCustomersByManager(managerId);
    }

    @Post('')
    createManager(@Body() manager: CreateUserDto) {
        return this.service.createManager(manager);
    }

    @Post(':managerId/customer')
    createCustomer(
        @Param('managerId') managerId: string,
        @Body() customer: CreateUserDto,
    ) {
        return this.service.createCustomer(customer, managerId);
    }

    @Post('customer/account')
    @ApiQuery({ name: 'managerId', type: String })
    createAccount(@Query() createAccountDto: AccountDto) {
        return this.service.createAccount(createAccountDto);
    }

    @Patch('customer')
    switchCustomer(@Query() switchCustomer: SwitchCustomerDto) {
        return this.service.switchCustomer(switchCustomer);
    }

    @Delete(':managerId')
    deleteManager(@Param('managerId') managerId: string) {
        return this.service.deleteManager(managerId);
    }

    @Delete('customer/account')
    deleteAccount(@Query() accountDto: AccountDto) {
        return this.service.deleteAccount(accountDto);
    }
}
