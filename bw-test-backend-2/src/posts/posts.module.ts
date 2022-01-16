import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { CommentsController } from '../comments/comments.controller';
import { Comment, CommentSchema } from '../comments/comments.schema';
import { CommentsService } from '../comments/comments.service';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './posts.schema';
import { PostsService } from './posts.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
  exports: [PostsService, CommentsService],
})
export class PostsModule {}
