import {
  IsString,
  IsArray,
  IsNumber,
  IsBoolean,
  IsMongoId,
} from 'class-validator';

export class CreateAccountDTO {
  @IsMongoId({ message: 'Please provide a valid id' })
  owner: string;

  @IsArray({ message: 'Please provide a list of activities' })
  activities: [];

  @IsNumber()
  balance: number;

  @IsString({ message: 'Please provide a valid country code' })
  currency: string;

  @IsBoolean()
  isActive: boolean;
}
