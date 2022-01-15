import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
import { Post, PostDocument } from '../posts/posts.schema';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
import { UserService } from 'src/user-old/service/user.service';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private readonly postsService: PostsService,
    private readonly usersService: UserService, // This line is causing the issue
  ) {}

  async addComment(postId: string, author: string, body: string) {
    const updatedPost = await this.postsService.findPost(postId);
    // const originalPoster = await this.usersService.findUser(author);
    const newComment = {
      author,
      body,
    };
    updatedPost.comments.push(newComment);
    updatedPost.save();
    // originalPoster.comments.push(newComment);
    // originalPoster.save();
    console.log('updatedPost', updatedPost);
  }
  async updateComment(postId: string, commentId: string, body: string) {
    const result = await this.postModel.findById(postId);
    let resultIndex;
    result.comments.find((comment, index) => {
      comment.id === commentId, (resultIndex = index);
    });
    if (body) {
      result.comments[resultIndex].body = body;
    }
    console.log('updated comment result: ', result);
    result.save();
  }
  async deleteComment(postId: string, commentId: string) {
    await this.postModel.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } },
    );
  }
  // async getComments() {
  //   debugger;
  //   const comments = await this.commentModel.find().exec();
  //   return comments.map((comment) => ({
  //     id: comment.id,
  //     author: comment.author,
  //     body: comment.body,
  //     created: comment.created,
  //   }));
  // }
  // private async findComment(id: string): Promise<Comment> {
  //   let comment;
  //   try {
  //     comment = await this.commentModel.findById(id).exec();
  //   } catch (error) {
  //     throw new NotFoundException('Could not find comment by id.');
  //   }
  //   if (!comment) {
  //     throw new NotFoundException('Could not find comment by id.');
  //   }
  //   return comment;
  // }
}
