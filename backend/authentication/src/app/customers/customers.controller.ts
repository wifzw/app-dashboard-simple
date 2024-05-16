import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateStatusCustomerDto } from './dto/update-status-customer.dto';
import { Request } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async get(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];

    return this.customersService.get(token);
  }

  @Post('')
  async store(@Body() body: CreateCustomerDto, @Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];

    return await this.customersService.store(body, token);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return await this.customersService.update(id, body);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusCustomerDto: UpdateStatusCustomerDto,
  ) {
    return this.customersService.updateStatus(id, {
      status: updateStatusCustomerDto.status,
    });
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.customersService.delete(id);
  }

  @Delete(':id/softDelete')
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.customersService.destroy(id);
  }
}
