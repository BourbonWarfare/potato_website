import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Poll, PollDocument, PollOption } from './polls.schema';

@Injectable()
export class PollsService {
  private polls: Poll[] = [];

  constructor(
    @InjectModel(Poll.name)
    private readonly pollModel: Model<PollDocument>,
  ) {}

  async insertPoll(title: string, options: [PollOption]) {
    const newPoll = new this.pollModel({
      title,
      options,
      created: new Date(),
    });
    const result = await newPoll.save();
    return result._id as string;
  }
  async findAll(
    // documentsToSkip?: number,
    // limit?: number,
    limit = 10,
    startId?: string,
    searchQuery?: string,
    page?: string,
  ) {
    const filters: FilterQuery<PollDocument> = startId
      ? {
          _id: {
            $gt: startId,
          },
        }
      : {};

    if (searchQuery) {
      filters.$text = {
        $search: searchQuery,
      };
    }

    page !== undefined ? page : 1;

    const findQuery = this.pollModel
      .find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(page ? parseInt(page) * limit - limit : 1);
    if (limit) {
      findQuery.limit(limit);
    }
    const results = await findQuery;
    const count = await this.pollModel.count();
    const pageHandle = page ? page : '1';
    const next = results.length
      ? `localhost:8080/polls/?page=${parseInt(pageHandle) + 1}`
      : null;
    const prev =
      parseInt(page) > 1
        ? `localhost:8080/polls/?page=${parseInt(pageHandle) - 1}`
        : null;
    return { count, page, next, prev, limit, results };
  }

  async getSinglePoll(pollId: string) {
    const results = await this.findPoll(pollId);
    return { results };
  }

  async deletePoll(pollId: string) {
    const result = await this.pollModel.deleteOne({ _id: pollId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find poll.');
    }
  }

  async updatePoll(
    pollId: string,
    title?: string,
    newOption?: string,
    option?: string,
    votes?: number,
    remove?: boolean,
  ) {
    let filter, data;
    // Update title
    if (title) {
      filter = { _id: pollId };
      data = { $set: { title } };
    }
    // Add new option
    if (newOption) {
      filter = { _id: pollId };
      data = {
        $push: { options: { option: newOption, votes: 0 } },
      };
    }
    // Update option with new value
    // i.e { "option":"old_title", "votes": 10} -> { "option":"new_title", "votes": 10}
    if (option && newOption) {
      filter = { _id: pollId, 'options.option': option };
      data = { $set: { 'options.$.option': newOption } };
    }
    // Increment votes
    if (votes) {
      filter = { _id: pollId, 'options.option': option };
      data = { $inc: { 'options.$.votes': votes } };
    }
    // Remove an option
    if (remove && option) {
      filter = { _id: pollId };
      data = { $pull: { options: { option } } };
    }
    // Send request to pollModel to execute the filter and data
    try {
      await this.pollModel.updateOne(filter, data).exec();
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Votes must be of type "int"',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findPoll(id: string): Promise<PollDocument> {
    let poll;
    try {
      // poll = await this.pollModel.findById(id).exec();
      poll = await this.pollModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find poll.');
    }
    if (!poll) {
      throw new NotFoundException('Could not find poll.');
    }
    return poll;
  }
}
