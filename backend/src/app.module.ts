import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MissionsModule } from './missions/missions.module';
import { PostsModule } from './posts/posts.module';

import 'dotenv/config';
import { PollsModule } from './polls/polls.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PostsModule,
    MissionsModule,
    PollsModule,
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
