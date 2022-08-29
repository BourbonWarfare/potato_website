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
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { PaginationaParams } from 'src/filters/paginationParams';
import { MissionsService } from './missions.service';
import * as mongoose from 'mongoose';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Post()
  // @Roles(Role.Admin) This is how you add role dependency, prob need addPostAdmin and addPostUser
  async addMission(
    @Body('title') missionTitle: string,
    @Body('long') missionLong: boolean,
    @Body('type') missionType: string,
    @Body('map') missionMap: string,
    @Body('version') missionVersion: number,
    @Body('author') missionAuthor: string,
  ) {
    debugger;
    const generatedId = await this.missionsService.insertMission(
      missionTitle,
      missionLong,
      missionType,
      missionMap,
      missionVersion,
      missionAuthor,
    );
    return { id: generatedId };
  }
  // @Get()
  // async getAllPosts() {
  //   const posts = await this.missionsService.getPosts();
  //   console.log(posts);
  //   return posts;
  // }
  @Get()
  async getAllMissions(
    // removed skip in favour of page
    @Query() { limit, startId }: PaginationaParams,
    @Query('page') page: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.missionsService.findAll(limit, startId, searchQuery, page);
  }
  // @Get()
  // async getAllPostsPaginate(
  //   @Paginate() query: PaginateQuery,
  // ): Promise<Paginated<PostEntity>> {
  //   return this.missionsService.findAllPaginate(query);
  // }

  // @Get(':id')
  // getPost(@Param('id') postId: number) {
  //   return this.missionsService.getSinglePost(postId);
  // }
  @Get(':category')
  getCategoryMissions(
    @Param('category') missionsCategory: string,
    @Query() { limit, startId }: PaginationaParams,
    @Query('page') page: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.missionsService.getCategoryMissions(
      missionsCategory,
      limit,
      startId,
      searchQuery,
      page,
    );
  }
  @Get(':category/:id')
  async getPost(
    @Param('category') missionsCategory: string,
    @Param('id') missionId: string,
  ) {
    return this.missionsService.getSingleMission(missionsCategory, missionId);
  }
  @Patch(':id')
  async updateMission(
    @Param('id') missionId: string,
    @Body('title') missionTitle: string,
    @Body('text') missionPassCount: number,
    @Body('url') missionPassed: boolean,
    @Body('type') missionPlayed: boolean,
    @Body('category') missionVersion: number,
    @Body('category') missionLastPlayed: Date,
    @Body('category') missionBroken: boolean,
    @Body('category') missionDatePassed: Date,
  ) {
    await this.missionsService.updateMission(
      missionId,
      missionTitle,
      missionPassCount,
      missionPassed,
      missionPlayed,
      missionVersion,
      missionLastPlayed,
      missionBroken,
      missionDatePassed,
    );
    return null;
  }
  @Delete(':id')
  async removeMission(@Param('id') missionId: string) {
    await this.missionsService.deleteMission(missionId);
    return null;
  }
}
