import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PaginationaParams } from 'src/filters/paginationParams';
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
  // @Get()
  // async getAllPosts() {
  //   const posts = await this.postsService.getPosts();
  //   console.log(posts);
  //   return posts;
  // }
  @Get()
  async getAllPosts(
    // removed skip in favour of page
    @Query() { limit, startId }: PaginationaParams,
    @Query('page') page: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.findAll(limit, startId, searchQuery, page);
  }
  // @Get()
  // async getAllPostsPaginate(
  //   @Paginate() query: PaginateQuery,
  // ): Promise<Paginated<PostEntity>> {
  //   return this.postsService.findAllPaginate(query);
  // }

  // @Get(':id')
  // getPost(@Param('id') postId: number) {
  //   return this.postsService.getSinglePost(postId);
  // }
  @Get(':category')
  getCategoryPosts(
    @Param('category') postsCategory: string,
    @Query() { limit, startId }: PaginationaParams,
    @Query('page') page: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.postsService.getCategoryPosts(
      postsCategory,
      limit,
      startId,
      searchQuery,
      page,
    );
  }
  @Get(':category/:id')
  async getPost(
    @Param('category') postsCategory: string,
    @Param('id') postId: string,
  ) {
    return this.postsService.getSinglePost(postsCategory, postId);
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
