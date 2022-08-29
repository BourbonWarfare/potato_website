import { CommentType } from './CommentType';
import { UserType } from './UserType';

export type PostType = {
  category: string,
  text: string,
  title: string,
  type: string,
  url: string,
  id: string,
  author: UserType,
  comments: CommentType[],
};
