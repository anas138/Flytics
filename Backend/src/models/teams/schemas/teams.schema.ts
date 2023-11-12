import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ApiClient } from 'src/models/api-clients/schemas/api-clients.schema';
import { Operator } from 'src/models/operstors/schemas/operators.schema';
import { Project } from 'src/models/projects/schemas/projects.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Operator' })
  teamLead: Operator | string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: Project[] | string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ApiClient' })
  owner: ApiClient | string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
