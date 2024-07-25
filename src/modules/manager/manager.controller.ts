import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Customer } from '../customer/entities/customer.entity';
import {
    ApiOperation,
    ApiProperty,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AccountType } from '../account/enum/account-type.enum';
import { CreateAccountDto } from '../account/dto/create-account.dto';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerServices) {}

    @Get('customer')
    @ApiQuery({ name: 'managerId', type: String })
    getCustomers(@Query('managerId') managerId: string) {
        return this.managerService.getCustomersByManager(managerId);
    }

    @Post('customer')
    @ApiQuery({ name: 'managerId', type: String })
    createCustomer(
        @Query('managerId') managerId: string,
        @Body() customer: CreateUserDto,
    ) {
        return this.managerService.createCustomer(customer, managerId);
    }

    @Post('customer/account')
    @ApiQuery({ name: 'customerId', type: String })
    @ApiQuery({ name: 'managerId', type: String })
    @ApiQuery({ name: 'accountType', enum: AccountType })
    createAccount(@Query() createAccountDto: CreateAccountDto) {
        return this.managerService.createAccount(createAccountDto);
    }
}
