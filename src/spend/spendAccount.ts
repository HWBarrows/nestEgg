import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Owner } from '../owner/owner';

export type SpendAccountDocument = HydratedDocument<SpendAccount>;

@Schema()
export class SpendAccount {
  @Prop({ required: true })
  type: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'Owner' })
  owner: Owner;

  @Prop({ required: true })
  balance: number;

  @Prop([String])
  accountActivity: string[];
}

export const SpendAccountSchema = SchemaFactory.createForClass(SpendAccount);
