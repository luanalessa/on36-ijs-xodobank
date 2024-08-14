import { Body, Controller, Delete, Patch, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerServices } from '../../domain/services/customer.services';
import { ManagerServices } from '../../domain/services/manager.services';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    private readonly managerService: ManagerServices;

    constructor(private readonly customerService: CustomerServices = new CustomerServices()) {
        this.managerService = new ManagerServices();
    }

    @Post(':managerId')
    async create(@Param('managerId') managerId: string, @Body() customer: CreateUserDto) {
        try {
            const result = await this.customerService.create(customer, managerId);
            await this.managerService.addCustomer(result.idNumber, managerId);
            return { statusCode: HttpStatus.CREATED, message: 'Customer created successfully', data: result };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':customerId')
    async delete(@Param('customerId') customerId: string) {
        try {
            await this.customerService.delete(customerId);
            return { statusCode: HttpStatus.OK, message: 'Customer deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
