import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './activity';
import { Account, AccountDocument } from '../account/account';
import { Owner, OwnerDocument } from '../owner/owner';
import { ActivityDTO } from './dto/activity.dto';
@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
  ) {}

  async createActivity(
    newActivity: ActivityDTO,
    id: string,
  ): Promise<Activity | UnauthorizedException> {
    try {
      const activity = new this.activityModel(newActivity);
      const account = await this.accountModel.findById(id);
      if (activity.activityType == 'Added') {
        const newBalance = Number(activity.amount) + account.balance;
        account.balance = newBalance;
      }

      if (
        activity.activityType == 'Subtracted' &&
        account.balance > activity.amount
      ) {
        const newBalance = account.balance - Number(activity.amount);
        account.balance = newBalance;
      }

      if (
        activity.activityType == 'Subtracted' &&
        account.balance < activity.amount
      ) {
        throw new UnauthorizedException('Insufficient funds');
      }
      account.activity.push(activity);
      account.save();
      activity.save();
      return activity;
    } catch (err) {
      throw err;
    }
  }
}
