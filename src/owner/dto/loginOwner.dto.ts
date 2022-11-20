import { IsString, IsEmail } from 'class-validator';

export class LoginOwnerDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
