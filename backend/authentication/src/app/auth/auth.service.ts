import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from '../users/users.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UsersEntity) {
    const payload = { sub: user.id };

    Object.keys(user).forEach((keyUser) => {
      const forbiddenKey = ['login', 'password'];

      if (!forbiddenKey.includes(keyUser)) {
        payload[keyUser] = user[keyUser];
      }
    });

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(username: string, password: string) {
    let user: UsersEntity;

    try {
      user = await this.usersService.findOneOrFail({
        where: { login: username },
      });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
}
