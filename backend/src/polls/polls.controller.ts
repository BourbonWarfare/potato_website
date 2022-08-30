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
import { PollOption } from './polls.schema';
import { PollsService } from './polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  // @Roles(Role.Admin) This is how you add role dependency, prob need addPostAdmin and addPostUser
  async addPoll(
    @Body('title') pollTitle: string,
    @Body('options') pollOptions: [PollOption],
  ) {
    const generatedId = await this.pollsService.insertPoll(
      pollTitle,
      pollOptions,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllPolls(
    // removed skip in favour of page
    @Query() { limit, startId }: PaginationaParams,
    @Query('page') page: string,
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.pollsService.findAll(limit, startId, searchQuery, page);
  }

  @Get(':id')
  async getPoll(@Param('id') postId: string) {
    return this.pollsService.getSinglePoll(postId);
  }

  @Patch(':id')
  async updatePoll(
    @Param('id') pollId: string,
    @Body('title') pollTitle?: string,
    @Body('newOption') newOption?: string,
    @Body('option') option?: string,
    @Body('votes') votes?: number,
    @Body('remove') remove?: boolean,
  ) {
    await this.pollsService.updatePoll(
      pollId,
      pollTitle,
      newOption,
      option,
      votes,
      remove,
    );
    return null;
  }

  @Delete(':id')
  async removePost(@Param('id') postId: string) {
    await this.pollsService.deletePoll(postId);
    return null;
  }
}
