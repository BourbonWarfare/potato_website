import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { CommentsController } from '../comments/comments.controller';
import { Comment, CommentSchema } from '../comments/comments.schema';
import { CommentsService } from '../comments/comments.service';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { Mission, MissionSchema } from './missions.schema';
import { PostsController } from 'src/posts/posts.controller';
import { PostsService } from 'src/posts/posts.service';
import { Post, PostSchema } from 'src/posts/posts.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Mission.name, schema: MissionSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [MissionsController, PostsController, CommentsController],
  providers: [MissionsService, PostsService, CommentsService],
  exports: [MissionsService, PostsService, CommentsService],
})
export class MissionsModule {}
