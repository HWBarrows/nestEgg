import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  activityType: string;

  @Prop({ required: true })
  method: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
