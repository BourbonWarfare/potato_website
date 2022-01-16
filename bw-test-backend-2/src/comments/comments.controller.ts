import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PostsService } from '../posts/posts.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post(':id')
  async insertComment(
    @Param('id') postId: string,
    @Body('author') commentAuthor: string,
    @Body('body') commentBody: string,
  ) {
    const generatedId = await this.commentsService.addComment(
      postId,
      commentAuthor,
      commentBody,
    );
    return { id: generatedId };
  }
  @Patch(':id')
  async updateComment(
    @Param('id') postId: string,
    @Body('id') commentId: string,
    @Body('body') commentBody: string,
  ) {
    await this.commentsService.updateComment(postId, commentId, commentBody);
    return null;
  }
  @Delete(':id')
  async removeComment(
    @Param('id') postId: string,
    @Body('id') commentId: string,
  ) {
    await this.commentsService.deleteComment(postId, commentId);
    return null;
  }
  // @Get()
  // async getCommentsByPost() {
  //   debugger;
  //   const comments = await this.commentsService.getComments();
  //   return comments;
  // }
}
