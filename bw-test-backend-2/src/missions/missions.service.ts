import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Mission, MissionDocument } from './missions.schema';

@Injectable()
export class MissionsService {
  private missions: Mission[] = [];

  constructor(
    @InjectModel(Mission.name)
    private readonly missionModel: Model<MissionDocument>,
    private readonly usersService: UsersService,
  ) {}

  async insertMission(
    title: string,
    long: boolean,
    type: string,
    map: string,
    version: number,
    author: string,
  ) {
    const newMission = new this.missionModel({
      title,
      long,
      type,
      map,
      version,
      author,
    });
    const result = await newMission.save();
    // newPost.populate('User');
    const originalPoster = await this.usersService.findUser(author);
    console.log('original poster: ', originalPoster);
    originalPoster.missions.push(result._id);
    originalPoster.save();
    console.log('New post result: ', result);
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
    const filters: FilterQuery<MissionDocument> = startId
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

    const findQuery = this.missionModel
      .find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(page ? parseInt(page) * limit - limit : 1)
      .populate('author')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      });
    if (limit) {
      findQuery.limit(limit);
    }
    const results = await findQuery;
    const count = await this.missionModel.count();
    const pageHandle = page ? page : '1';
    const next = results.length
      ? `localhost:8080/missions/?page=${parseInt(pageHandle) + 1}`
      : null;
    const prev =
      parseInt(page) > 1
        ? `localhost:8080/missions/?page=${parseInt(pageHandle) - 1}`
        : null;
    return { count, page, next, prev, limit, results };
  }
  async getSingleMission(missionsCategory: string, missionId: string) {
    const results = await this.findMission(missionId);
    // const result = await findQuery;
    // result ? result : 'No Post Found'
    return { results };
  }
  async getCategoryMissions(
    // documentsToSkip?: number,
    // limit?: number,
    missionsCategory,
    limit = 10,
    startId?: string,
    searchQuery?: string,
    page?: string,
  ) {
    const filters: FilterQuery<MissionDocument> = missionsCategory
      ? {
          category: {
            $in: missionsCategory,
          },
        }
      : {};

    if (searchQuery) {
      filters.$text = {
        $search: searchQuery,
      };
    }

    const findQuery = this.missionModel
      .find(filters)
      .sort({ id: 1 })
      .limit(limit)
      .skip(page ? parseInt(page) * limit - limit : 0)
      .populate('author')
      .populate('comments')
      .populate({
        path: 'comments',
        populate: {
          path: 'comments',
          model: 'Comment',
        },
      });
    // if (limit) {
    //   findQuery.limit(limit);
    // }
    const results = await findQuery;
    const count = await this.missionModel.count();
    const pageHandle = page ? page : '1';
    const next = results.length
      ? `localhost:8080/missions/${missionsCategory}/?page=${
          parseInt(pageHandle) + 1
        }`
      : null;
    const prev =
      parseInt(page) > 1
        ? `localhost:8080/missions/${missionsCategory}/?page=${
            parseInt(pageHandle) - 1
          }`
        : null;
    return { count, page, next, prev, limit, results };
  }
  async updateMission(
    missionId: string,
    title: string,
    passCount: number,
    passed: boolean,
    played: boolean,
    version: number,
    lastPlayed: Date,
    broken: boolean,
    datePassed: Date,
  ) {
    const updatedMission = await this.findMission(missionId);
    if (title) {
      updatedMission.title = title;
    }
    if (passCount) {
      updatedMission.passCount = passCount;
    }
    if (passed) {
      updatedMission.passed = passed;
    }
    if (played) {
      updatedMission.played = played;
    }
    if (version) {
      updatedMission.version = version;
    }
    if (lastPlayed) {
      updatedMission.lastPlayed = lastPlayed;
    }
    if (broken) {
      updatedMission.broken = broken;
    }
    if (datePassed) {
      updatedMission.datePassed = datePassed;
    }
    updatedMission.save();
  }
  async deleteMission(missionId: string) {
    const result = await this.missionModel.deleteOne({ _id: missionId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find mission.');
    }
  }
  async findMission(id: string): Promise<MissionDocument> {
    let mission;
    try {
      // post = await this.missionModel.findById(id).exec();
      mission = await this.missionModel
        .findById(id)
        .populate('author')
        .populate('comments')
        .populate({
          path: 'comments',
          populate: {
            path: 'comments',
            model: 'Comment',
          },
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            model: 'User',
          },
        });
    } catch (error) {
      throw new NotFoundException('Could not find mission.');
    }
    if (!mission) {
      throw new NotFoundException('Could not find mission.');
    }
    return mission;
  }
}

// async getPosts() {
//   const posts = await this.missionModel.find().exec();
//   return posts.map((post) => ({
//     id: post._id,
//     title: post.title,
//     text: post.text,
//     url: post.url,
//     type: post.type,
//     category: post.category,
//     author: post.author,
//     comments: post.comments,
//   }));
// }
// async getSinglePost(postsCategory: string, postId: number) {
//   const post = await this.findMission(postId);
//   return {
//     id: post._id,
//     title: post.title,
//     text: post.text,
//     url: post.url,
//     type: post.type,
//     category: post.category,
//     author: post.author,
//     comments: post.comments,
//   };
// }
