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
  text: string;

  @Prop()
  url: string;

  @Prop()
  type: string;

  @Prop()
  category: string;

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
  created: Date;

  // @Prop()
  // view: number;
}

const MissionSchema = SchemaFactory.createForClass(Mission);

MissionSchema.index({ title: 'text', text: 'text' });

export { MissionSchema };

// mission = {
//   long: boolean (true or false)
//   type: co-op | pvp | afterHours | other?
//   author: UserType
//   comments: CommentType
//   created: Date
//   passCount: Number
//   passed: boolean (true or false)
//   played: boolean (true or false)
// }
