import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Model, Mongoose } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from './users.schema';
// const bcrypt = require('bcrypt-nodejs');
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async insertUser(
    username: string,
    password: string,
    comments: any,
    posts: any,
    email: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      admin: false,
      comments,
      posts,
      email,
    });
    const result = await newUser.save();
    console.log('New user result: ', result);
    return result.id as string;
  }
  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user._id,
      username: user.username,
      password: user.password,
      email: user.email,
      posts: user.posts.length,
      comments: user.posts.length,
    }));
  }
  async getSingleUser(userId: string) {
    console.log('this.findUser: ', await this.findUser(userId));
    const results = await this.findUser(userId);
    return { results };
  }
  // async getSingleUser(
  //   userId: string,
  //   limit = 10,
  //   startId?: string,
  //   searchQuery?: string,
  //   page?: string,
  // ) {
  //   // const results = await this.findUser(userId);
  //   // const findQuery = this.userModel
  //   //   .findById(userId)
  //   //   .sort({ id: 1 })
  //   //   .limit(limit)
  //   //   .skip(page ? parseInt(page) * limit - limit : 0)
  //   //   .populate('posts')
  //   //   .populate('comments')
  //   //   .exec();
  //   const findQuery = mongoose.Types.ObjectId.isValid(userId)
  //     ? this.userModel
  //         .findById(userId)
  //         .sort({ _id: 1 })
  //         .limit(limit)
  //         .skip(page ? parseInt(page) * limit - limit : 0)
  //         .populate('comments')
  //         .populate('posts')
  //     : this.userModel
  //         .find({ username: { $in: userId } })
  //         .sort({ _id: 1 })
  //         .limit(10)
  //         .skip(0)
  //         .populate('posts')
  //         .populate('comments');
  //   // if (limit) {
  //   //   findQuery.limit(limit);
  //   // }
  //   const results = await findQuery;
  //   const count = await this.userModel.count();
  //   const pageHandle = page ? page : '1';
  //   const next = results.length;
  //   return { count, page, next, prev, limit, results };
  // }
  async updateUser(userId: string, password: string) {
    const updatedUser = await this.findUser(userId);
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
  }
  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find user');
    }
  }
  async findUser(
    userId: string,
    limit = 10,
    page?: string,
  ): Promise<UserDocument> {
    let user;

    try {
      if (mongoose.Types.ObjectId.isValid(userId)) {
        user = await this.userModel
          .findById(userId)
          .sort({ _id: 1 })
          .limit(10)
          .skip(0)
          .populate({
            path: 'posts',
            options: {
              limit: 10,
              sort: { _id: 1 },
              skip: 0,
            },
          })
          .populate('comments')
          .exec();
      } else {
        user = await this.userModel
          .find({ username: { $in: userId } })
          .sort({ _id: 1 })
          .populate({
            path: 'posts',
            options: {
              perDocumentLimit: limit,
              sort: { _id: 1 },
              skip: page ? parseInt(page) * limit - limit : 0,
            },
          })
          .populate('comments');
      }
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}

// =====================================================
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from './users.schema';
// // const bcrypt = require('bcrypt-nodejs');
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class UsersService {
//   private users: User[] = [];

//   constructor(
//     @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
//   ) {}

//   async insertUser(
//     username: string,
//     password: string,
//     comments: any,
//     posts: any,
//   ) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new this.userModel({
//       username,
//       password: hashedPassword,
//       admin: false,
//       comments,
//       posts,
//     });
//     const result = await newUser.save();
//     console.log('New user result: ', result);
//     return result.id as string;
//   }
//   async getUsers() {
//     const users = await this.userModel.find().exec();
//     return users.map((user) => ({
//       id: user._id,
//       username: user.username,
//       password: user.password,
//     }));
//   }
//   async getSingleUsername(username: string) {
//     const result = await this.findUsername(username);
//     return { result };
//   }
//   async getSingleUserid(userId: string,) {
//     const result = await this.findUser(userId);
//     return { result };
//   }
//   async updateUser(userId: string,, password: string) {
//     const updatedUser = await this.findUser(userId);
//     if (password) {
//       updatedUser.password = password;
//     }
//     updatedUser.save();
//   }
//   async deleteUser(userId: string,) {
//     const result = await this.userModel.deleteOne({ _id: userId }).exec();
//     if (result.deletedCount === 0) {
//       throw new NotFoundException('Could not find user');
//     }
//   }
//   async findUser(userId: string,): Promise<UserDocument> {
//     let user;
//     try {
//       user = await this.userModel
//         .findById(userId)
//         .populate('posts')
//         .populate('comments')
//         .exec();
//       console.log('found user: ', user);
//     } catch (error) {
//       throw new NotFoundException('Could not find user.');
//     }
//     if (!user) {
//       throw new NotFoundException('Could not find user.');
//     }

//     return user;
//   }
//   async findUsername(username: string): Promise<UserDocument> {
//     let user;
//     try {
//       user = await this.userModel
//         .find({ username: { $in: username } })
//         .populate('posts')
//         .populate('comments')
//         .exec();
//       console.log('found user: ', user);
//     } catch (error) {
//       throw new NotFoundException('Could not find user.');
//     }
//     if (!user) {
//       throw new NotFoundException('Could not find user.');
//     }
//     return user;
//   }
// }
