import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateStatusCustomerDto {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
