import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ApiClient } from 'src/models/api-clients/schemas/api-clients.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ApiClient' })
  owner: ApiClient | string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
