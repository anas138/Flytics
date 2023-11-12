import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Team } from 'src/models/teams/schemas/teams.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    type: String,
    enum: ['sAdmin', 'admin', 'manager'],
  })
  role: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }] })
  teams: Team[] | string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
