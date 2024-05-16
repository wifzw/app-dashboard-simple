import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @MinLength(3)
  last_name: string;
}
