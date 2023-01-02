import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerService } from './owner.service';
import { AuthService } from '../auth/auth.service';
import { Owner, OwnerSchema } from './owner';
import { OwnerController } from './owner.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, AuthService, JwtService],
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  exports: [MongooseModule],
})
export class OwnerModule {}
