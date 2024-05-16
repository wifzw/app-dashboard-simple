import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { CustomersEntity } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateStatusCustomerDto } from './dto/update-status-customer.dto';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomersEntity)
    private readonly customersRepository: Repository<CustomersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async get(token) {
    try {
      const payload = this.jwtService.decode(token);

      if (!payload) {
        throw new UnauthorizedException({
          ERROR_ID: MessagesHelper.TOKEN_INVALID,
        });
      }

      return await this.customersRepository.find({
        where: { created_by_user_id: payload.id },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFail(options: FindOneOptions<CustomersEntity>) {
    try {
      return await this.customersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateCustomerDto, token: string) {
    const payload = this.jwtService.decode(token);

    if (!payload) {
      throw new UnauthorizedException({
        ERROR_ID: MessagesHelper.TOKEN_INVALID,
      });
    }

    const customer = this.customersRepository.create({
      ...data,
      created_by_user_id: payload.id,
    });

    const customerSave = await this.customersRepository.save(customer);

    if (customerSave) {
      delete customerSave.created_by_user_id;
    }

    return customerSave;
  }

  async update(id: string, data: UpdateCustomerDto) {
    const customer = await this.findOneOrFail({ where: { id } });
    this.customersRepository.merge(customer, data);
    return await this.customersRepository.save(customer);
  }

  async updateStatus(id: string, data: UpdateStatusCustomerDto) {
    const customer = await this.findOneOrFail({ where: { id } });
    customer.status = data.status;
    return await this.customersRepository.save(customer);
  }

  async destroy(id: string) {
    await this.customersRepository.findOneOrFail({ where: { id } });
    this.customersRepository.softDelete({ id });
  }

  async delete(id: string) {
    await this.customersRepository.findOneOrFail({ where: { id } });
    this.customersRepository.delete({ id });
  }
}
