import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';

export type PostDocument = Post & mongoose.Document;

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop()
  url: string;

  @Prop()
  type: string;

  @Prop()
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: any;

  @Prop()
  created: Date;

  @Prop()
  view: number;
}
export const PostSchema = SchemaFactory.createForClass(Post);
