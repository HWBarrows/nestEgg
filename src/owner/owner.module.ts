import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerService } from './owner.service';
import { AuthService } from '../auth/auth.service';
import { Owner, OwnerSchema } from './owner';
import { OwnerController } from './owner.controller';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService, AuthService],
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  exports: [MongooseModule],
})
export class OwnerModule {}
