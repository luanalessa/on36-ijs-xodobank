import { BankingServices } from './services/banking.services';
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

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
    getCustomers() {
        return this.services.getCustomers();
    }

    @Post('manager')
    createManager(@Body() manager: CreateUserDto) {
        return this.services.createManager(manager);
    }
}
