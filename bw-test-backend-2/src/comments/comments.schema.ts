import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & mongoose.Document;
//  extends mongoose.Document
@Schema()
export class Comment {
  @Prop()
  id: string;

  @Prop({ required: true })
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'author', required: true })
  author: string;

  @Prop({ required: true })
  body: string;

  @Prop({ default: Date.now })
  created: Date;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
