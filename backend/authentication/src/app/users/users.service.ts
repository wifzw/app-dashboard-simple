import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MessagesHelper } from 'src/helpers/messages.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private jwtService: JwtService,
  ) {}

  async findLoggedUser(token: string): Promise<any> {
    const payload = this.jwtService.decode(token);
    if (!payload) {
      throw new UnauthorizedException({
        ERROR_ID: MessagesHelper.TOKEN_INVALID,
      });
    }

    const user = await this.usersRepository.findOneOrFail({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException({
        ERROR_ID: MessagesHelper.USERNAME_NOT_FOUND,
      });
    }

    Object.keys(user).forEach((keyUser) => {
      const forbiddenKey = ['login', 'password'];

      if (forbiddenKey.includes(keyUser)) {
        delete user[keyUser];
      }
    });

    return user;
  }

  async findOneOrFail(options: FindOneOptions<UsersEntity>) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    const existingUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login: data.login })
      .orWhere('user.email = :email', { email: data.email })
      .getOne();

    if (existingUser) {
      throw new BadRequestException({
        ERROR_ID:
          existingUser.login === data.login
            ? MessagesHelper.REGISTER_LOGIN_ALREADY_USE
            : MessagesHelper.REGISTER_EMAIL_ALREADY_USE,
      });
    }

    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.softDelete({ id });
  }
}
