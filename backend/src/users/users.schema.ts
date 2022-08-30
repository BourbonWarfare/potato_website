import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  admin: boolean;

  @Prop({ unique: true })
  email: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: any;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: any;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }])
  missions: any;

  @Prop({ unique: true })
  squadXML: string;
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 });

export { UserSchema };
