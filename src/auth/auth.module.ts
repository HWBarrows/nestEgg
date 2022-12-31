import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { OwnerService } from '../owner/owner.service';
import { Owner, OwnerSchema } from '../owner/owner';
import { LocalStrategy } from './local.strategy';

@Module({
  providers: [AuthService, OwnerService, LocalStrategy],
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  exports: [MongooseModule],
})
export class AuthModule {}
