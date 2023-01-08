import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account';
import { AccountService } from './account.service';

@Module({
  //controllers: [OwnerController],
  providers: [AccountService],
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  exports: [MongooseModule],
})
export class AccountModule {}