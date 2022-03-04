import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & mongoose.Document;
//  extends mongoose.Document
@Schema()
export class Comment {
  @Prop()
  id: string;

  // @Prop({ required: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: number;

  @Prop({ required: true })
  body: string;

  @Prop({ default: Date.now })
  created: Date;
  // this is the post it is attached to
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: any;
  // @Prop()
  // this is any comments that are attached to it'
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  // @Prop([CommentSchema])
  comments: any;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
