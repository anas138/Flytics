import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiClient } from 'src/models/api-clients/schemas/api-clients.schema';
import { Event } from 'src/models/events/schemas/events.schema';
import { Operator } from 'src/models/operstors/schemas/operators.schema';

export type AlertDocument = Alert & Document;

@Schema()
export class Alert {
  @Prop()
  message: string;

  @Prop()
  event: Event;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Operator' })
  operator: string | Operator;

  @Prop()
  alertType: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ApiClient' })
  owner: string | ApiClient;

  @Prop()
  alertDate: string;

  @Prop({ default: false })
  isViewed: boolean;
}

export const AlertSchema = SchemaFactory.createForClass(Alert);
