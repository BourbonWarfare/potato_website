import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PollOption = {
  option: string;
  votes: number;
};

export type PollDocument = Poll & mongoose.Document;

@Schema()
export class Poll {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  options: [PollOption];

  @Prop()
  created: Date;
}

const PollSchema = SchemaFactory.createForClass(Poll);

PollSchema.index({ title: 'text', text: 'text' });

export { PollSchema };
