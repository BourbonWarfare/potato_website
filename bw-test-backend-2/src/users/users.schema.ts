import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CommentSchema } from 'src/comments/comments.schema';
import { PostSchema } from 'src/posts/posts.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  admin: boolean;

  @Prop([CommentSchema])
  comments: any;

  @Prop([PostSchema])
  posts: any;
}
export const UserSchema = SchemaFactory.createForClass(User);
