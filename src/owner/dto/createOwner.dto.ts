import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateOwnerDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  currency: string;

  @IsString()
  password: string;

  @IsString()
  @MinLength(5)
  phoneNumber: string;
}
