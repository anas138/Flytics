import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema()
export class Department {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ApiClient' })
  clientId: string;

  @Prop()
  departmentName: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
