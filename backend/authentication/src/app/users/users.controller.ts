import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async store(@Body() body: CreateUserDto) {
    return await this.usersService.store(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getLoggedUser(@Req() req: Request) {
    const token = req.headers.authorization.split(' ')[1];
    return this.usersService.findLoggedUser(token);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.destroy(id);
  }
}
