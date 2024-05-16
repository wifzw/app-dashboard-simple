import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty({ message: MessagesHelper.REGISTER_FIRST_NAME_REQUIRED })
  @MinLength(3, { message: MessagesHelper.REGISTER_FIRST_NAME_MIN_LENGTH })
  first_name: string;

  @IsNotEmpty({ message: MessagesHelper.REGISTER_LAST_NAME_REQUIRED })
  @MinLength(3, { message: MessagesHelper.REGISTER_LAST_NAME_MIN_LENGTH })
  last_name: string;

  @IsNotEmpty({ message: MessagesHelper.REGISTER_EMAIL_REQUIRED })
  @IsEmail(undefined, { message: MessagesHelper.REGISTER_EMAIL_INVALID })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.REGISTER_LOGIN_REQUIRED })
  @MinLength(4, { message: MessagesHelper.REGISTER_LOGIN_MIN_LENGTH })
  login: string;

  @IsNotEmpty({ message: MessagesHelper.REGISTER_PASSWORD_REQUIRED })
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_INVALID,
  })
  password: string;
}
