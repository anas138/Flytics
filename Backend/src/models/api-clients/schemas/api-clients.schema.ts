import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ApiClientDocument = ApiClient & Document;

@Schema()
export class ApiClient {
  @Prop({ type: mongoose.Types.ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  apiKey: string;

  @Prop()
  apiSecret: string;
}

export const ApiClientSchema = SchemaFactory.createForClass(ApiClient);
