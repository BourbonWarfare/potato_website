import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

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

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: any;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: any;
}
export const UserSchema = SchemaFactory.createForClass(User);
