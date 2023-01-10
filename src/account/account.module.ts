import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account';
import { Owner, OwnerSchema } from '../owner/owner';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';

@Module({
  //controllers: [OwnerController],
  providers: [AccountService],
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
      { name: Owner.name, schema: OwnerSchema },
    ]),
  ],
  exports: [MongooseModule],
  controllers: [AccountController],
})
export class AccountModule {}
