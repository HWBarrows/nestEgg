import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityDocument = HydratedDocument<Activity>;

enum ActivityType {
  Added,
  Subtracted,
}

enum Method {
  Card,
  Transfer,
  Deposit,
  Withdrawal,
}

@Schema({ timestamps: true })
export class Activity {
  @Prop({ required: true })
  activityType: ActivityType;

  @Prop({ required: true })
  method: Method;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
