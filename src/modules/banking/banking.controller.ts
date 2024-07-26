import { BankingServices } from './services/banking.services';
import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SwitchCustomerDto } from './dto/switch-customer.dto';

@ApiTags('Banking')
@Controller('banking')
export class BankingController {
    constructor(private readonly services: BankingServices) {}

    @Get('managers')
    @ApiQuery({ name: 'managerId', type: String, required: false })
    getManagers(@Query('managerId') managerId: string) {
        return this.services.getManagers(managerId);
    }

    @Get('customers')
    @ApiQuery({ name: 'customerId',type: String, required: false })
    getCustomers(@Query('customerId') customerId: string) {
        return this.services.getCustomers(customerId);
    }

    @Get('accounts')
    getAccounts() {
        return this.services.getAccounts();
    }
}
