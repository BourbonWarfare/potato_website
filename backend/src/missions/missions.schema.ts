import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';
// import paginate from 'mongoose-paginate-v2';
// import paginate = require('mongoose-paginate-v2');/

export type MissionDocument = Mission & mongoose.Document;

@Schema()
export class Mission {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  long: boolean;

  @Prop()
  passCount: number;

  @Prop()
  type: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  author: User;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }])
  comments: any;

  @Prop()
  passed: boolean;

  @Prop()
  played: boolean;

  @Prop()
  map: string;

  @Prop()
  version: number;

  @Prop()
  lastPlayed: Date;

  @Prop()
  broken: boolean;

  @Prop()
  datePassed: Date;

  @Prop()
  created: Date;

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  //   unique: true,
  // })
  // testers: User[];

  // use this in place of played and passed possibly, potentially easier to filter
  // @Prop()
  // status: string;
}

const MissionSchema = SchemaFactory.createForClass(Mission);

MissionSchema.index({ title: 'text', text: 'text' });

export { MissionSchema };

// mission = {
//   long: boolean (true or false) x
//   title: string x
//   type: co-op | pvp | afterHours | offnight | other x
//   author: UserType x
//   comments: CommentType x
//   dateCreated: Date x
//   passCount: Number x
//   passed: boolean (true or false) x
//   played: boolean (true or false) x
//   map: string x
//   version: number x
//   lastPlayed: Date x
//   broken: boolean x
//   datePassed: Date x
// }
