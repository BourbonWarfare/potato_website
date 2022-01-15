import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  // @Roles(Role.Admin) This is how you add role dependency, prob need addPostAdmin and addPostUser
  async addPost(
    @Body('title') postTitle: string,
    @Body('text') postText: string,
    @Body('url') postUrl: string,
    @Body('type') postType: string,
    @Body('category') postCategory: string,
    @Body('author') postAuthor: string,
  ) {
    const generatedId = await this.postsService.insertPost(
      postTitle,
      postText,
      postUrl,
      postType,
      postCategory,
      postAuthor,
    );
    return { id: generatedId };
  }
  @Get()
  async getAllPosts() {
    const posts = await this.postsService.getPosts();
    return posts;
  }
  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsService.getSinglePost(postId);
  }
  @Patch(':id')
  async updatePost(
    @Param('id') postId: string,
    @Body('title') postTitle: string,
    @Body('text') postText: string,
    @Body('url') postUrl: string,
    @Body('type') postType: string,
    @Body('category') postCategory: string,
  ) {
    await this.postsService.updatePost(
      postId,
      postTitle,
      postText,
      postUrl,
      postType,
      postCategory,
    );
    return null;
  }
  @Delete(':id')
  async removePost(@Param('id') postId: string) {
    await this.postsService.deletePost(postId);
    return null;
  }
}
