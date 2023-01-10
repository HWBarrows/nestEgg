import { IsString, IsArray, IsNumber, IsBoolean } from 'class-validator';

export class CreateAccountDTO {
  @IsArray()
  activities: [string];

  @IsNumber()
  balance: number;

  @IsString()
  currency: string;

  @IsBoolean()
  isActive: boolean;
}
