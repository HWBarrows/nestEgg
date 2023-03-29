import { IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class ActivityDTO {
  @IsMongoId()
  @IsOptional()
  _id: string;

  @IsMongoId()
  account: string;

  @IsString()
  activityType: string;

  @IsString()
  method: string;

  @IsString()
  currency: string;

  @IsString()
  @IsOptional()
  from: string;

  @IsString()
  @IsOptional()
  to: string;

  @IsNumber()
  amount: number;
}
