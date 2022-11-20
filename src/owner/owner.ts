import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OwnerDocument = HydratedDocument<Owner>;

@Schema()
export class Owner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phoneNumber: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
