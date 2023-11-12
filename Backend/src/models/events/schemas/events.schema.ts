import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ApiClient } from 'src/models/api-clients/schemas/api-clients.schema';
import { Operator } from 'src/models/operstors/schemas/operators.schema';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  pcId: string;

  @Prop({ type: Date })
  eventDate: Date;

  @Prop()
  eventTime: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Operator' })
  personId: Operator | string;

  @Prop()
  presence: Number;

  @Prop()
  distraction: Number;

  @Prop()
  emotion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ApiClient' })
  owner: ApiClient | string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
