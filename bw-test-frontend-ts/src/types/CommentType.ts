import { UserType } from './UserType';

export type CommentType = {
  id: string,
  author: UserType,
  body: string,
  created: Date,
  post: any,
  comments: CommentType[],
};
