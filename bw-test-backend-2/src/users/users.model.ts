import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
  },
  { collation: { locale: 'en', strength: 1 } },
);
export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
}
