import { Body, Controller, Delete, Patch, Post, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';    
import { CustomerServices } from './services/customer.services';
import { ManagerServices } from 'src/modules/manager/services/manager.services';
import { CustomerDto } from './dto/customer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
    constructor(
        private readonly customerService: CustomerServices,
        private readonly managerService: ManagerServices) {}

    @Post(':managerId')
    async create(@Param('managerId') managerId: string, @Body() customer: CreateUserDto) {
        try {
            const result = await this.customerService.create(customer, managerId);
            await this.managerService.addCustomer(customer.idNumber, managerId);
            return { statusCode: HttpStatus.CREATED, message: 'Customer created successfully', data: result };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':managerId/switch-management')
    async switchCustomer(
        @Param('managerId') managerId: string,
        @Body() body: CustomerDto 
    ) {
        try {
            const { customerId, newManagerId } = body;
            await this.customerService.switchCustomerManagment(customerId, newManagerId);
            await this.managerService.switchCustomerManagment(customerId, newManagerId, managerId);
            return { statusCode: HttpStatus.OK, message: 'Customer management switched successfully' };
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
