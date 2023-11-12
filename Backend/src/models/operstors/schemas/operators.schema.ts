import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Department } from 'src/models/departments/schemas/departments.schema';

export type OperatorDocument = Operator & Document;

@Schema()
export class Operator {
  @Prop()
  machineId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ApiClient' })
  clientId: string;

  @Prop()
  operatorName: string;

  @Prop()
  timeSlotStart: string;

  @Prop()
  timeSlotEnd: string;

  @Prop()
  timeZone: string;

  @Prop()
  imageId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Department | string;
}

export const OperatorSchema = SchemaFactory.createForClass(Operator);
