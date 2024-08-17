import { Body, Controller, Delete, HttpException, HttpStatus, Patch, Post, Query } from '@nestjs/common';
import { ManagerServices } from './services/manager.services';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
    constructor(private readonly service: ManagerServices = new ManagerServices()) {}

    @Post(':id')
    async create(@Body() manager: CreateUserDto) {
        try {
            const result = await this.service.create(manager);
            return { statusCode: HttpStatus.CREATED, message: 'Manager created successfully', data: result };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @ApiQuery({ name: 'managerId', type: String })
    async delete(@Query('managerId') managerId: string) {
        try {
            await this.service.delete(managerId);
            return { statusCode: HttpStatus.OK, message: 'Manager deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
