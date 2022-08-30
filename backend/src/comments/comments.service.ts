import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comments.schema';
import { Post, PostDocument } from '../posts/posts.schema';
import { PostsService } from '../posts/posts.service';
import { UsersService } from '../users/users.service';
// import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private readonly postsService: PostsService,
    // @InjectModel(User.name)
    // private readonly userModel: Model<UserDocument>,
    private readonly usersService: UsersService,
  ) {}

  async addComment(post: string, author: string, body: string) {
    const newComment = new this.commentModel({
      post,
      author,
      body,
    });
    const result = await newComment.save();
    console.log('newComment: ', newComment);
    const foundPost = await this.postsService.findPost(post);
    const originalPoster = await this.usersService.findUser(author);
    // const foundComment = await this.findComment(comment);
    // console.log('originalPoster: ', originalPoster);
    // const newComment = {
    //   author,
    //   body,
    // };
    foundPost.comments.push(result._id);
    foundPost.save();
    originalPoster.comments.push(result._id);
    originalPoster.save();
    // foundComment.comments.push(result._id);
    // foundComment.save();
  }
  async addThreadedComment(
    post: string,
    commentId: number,
    author: string,
    body: string,
  ) {
    const newThreadedComment = new this.commentModel({
      post,
      commentId,
      author,
      body,
    });
    const result = await newThreadedComment.save();
    console.log('newThreadedComment: ', newThreadedComment);
    const foundPost = await this.postsService.findPost(post);
    const originalPoster = await this.usersService.findUser(author);
    const foundComment = await this.findComment(commentId);
    foundPost.comments.push(result._id);
    foundPost.save();
    originalPoster.comments.push(result._id);
    originalPoster.save();
    foundComment.comments.push(result._id);
    foundComment.save();
  }
  async updateComment(postId: string, commentId: string, body: string) {
    const result = await this.postModel.findById(postId);
    const resultIndex = result.comments.findIndex((comment) => {
      comment.id === commentId;
    });
    // let resultIndex;
    // result.comments.find((comment, index) => {
    //   comment.id === commentId, (resultIndex = index);
    // });
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
  private async findComment(id: number): Promise<CommentDocument> {
    let comment;
    try {
      comment = await this.commentModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`Error: ${error}`);
    }
    if (!comment) {
      throw new NotFoundException('No Comment: Could not find comment by id.');
    }
    return comment;
  }
}
