import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Owner } from '../owner/owner';
import { Activity } from '../activity/activity';

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

  @Prop([{ type: mongoose.SchemaTypes.ObjectId, ref: 'Activity' }])
  activity: Activity[];

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ unique: true })
  cardNumber: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
