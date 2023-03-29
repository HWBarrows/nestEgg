import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './activity';
import { Account, AccountSchema } from '../account/account';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  providers: [ActivityService],
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  exports: [MongooseModule],
  controllers: [ActivityController],
})
export class ActivityModule {}
