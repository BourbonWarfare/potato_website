import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  author: { type: String, ref: 'User', required: true },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now },
});
export interface Comment extends mongoose.Document {
  id: string;
  author: string;
  body: string;
  created: Date;
}
export const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String },
  url: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, ref: 'User', required: true },
  comments: [CommentSchema],
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});
export interface Post extends mongoose.Document {
  id: string;
  title: string;
  text: string;
  url: string;
  type: string;
  category: string;
  author: string;
  comments: any;
  created: Date;
  views: number;
}
