import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivityDocument = HydratedDocument<Activity>;

enum ActivityType {
  Transfer,
  Added,
  Card,
  Withdrawl,
  Debit,
}

@Schema({ timestamps: true })
export class Activity {
  @Prop({ required: true })
  activityType: ActivityType;

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
