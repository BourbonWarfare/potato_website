import { CommentType } from './CommentType';
import { PostType } from './PostType';

export type UserType = {
  id: string,
  username: string,
  password: string,
  admin: string,
  email: string,
  comments: CommentType[],
  posts: PostType[],
};
