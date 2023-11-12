import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Operator } from 'src/models/operstors/schemas/operators.schema';

export type OperatorStatDocument = OperatorsStat & Document;

@Schema()
export class OperatorsStat {
  @Prop()
  timeSlotStart: string;

  @Prop()
  timeSlotEnd: string;

  @Prop()
  statsDate: string;

  @Prop()
  loginTime: string;

  @Prop()
  presenceTime: number;

  @Prop()
  distractionTime: number;

  @Prop()
  lastPresenceEvent: string;

  @Prop()
  lastDistractionEvent: string;

  @Prop({ type: String, enum: ['a', 'p', 'd'] })
  lastEvent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Operator' })
  personId: Operator | string;
}

export const OperatorsStatSchema = SchemaFactory.createForClass(OperatorsStat);
