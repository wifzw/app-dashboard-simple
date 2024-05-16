import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
  IsBoolean,
  IsString,
  IsUUID,
} from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class CreateCustomerDto {
  @IsNotEmpty({ message: MessagesHelper.CUSTOMER_FULL_NAME_REQUIRED })
  @MinLength(4, { message: MessagesHelper.CUSTOMER_FULL_NAME_MIN_LENGTH })
  full_name: string;

  @IsNotEmpty({ message: MessagesHelper.CUSTOMER_BIRTH_DATE_REQUIRED })
  @MinLength(10, { message: MessagesHelper.CUSTOMER_BIRTH_DATE_INVALID })
  birth_date: string;

  @IsNotEmpty({ message: MessagesHelper.CUSTOMER_EMAIL_REQUIRED })
  @IsEmail(undefined, { message: MessagesHelper.CUSTOMER_EMAIL_INVALID })
  email: string;

  @IsNotEmpty({ message: MessagesHelper.CUSTOMER_PHONE_REQUIRED })
  @IsPhoneNumber('BR', { message: MessagesHelper.CUSTOMER_PHONE_INVALID })
  phone: string;

  @IsBoolean()
  status = true;
}
