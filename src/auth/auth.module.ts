import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { OwnerService } from '../owner/owner.service';
import { Owner, OwnerSchema } from '../owner/owner';

@Module({
  providers: [AuthService, OwnerService],
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  exports: [MongooseModule],
})
export class AuthModule {}
