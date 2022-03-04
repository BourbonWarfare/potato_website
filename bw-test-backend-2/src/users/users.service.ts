import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
// const bcrypt = require('bcrypt-nodejs');
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async insertUser(
    username: string,
    password: string,
    comments: any,
    posts: any,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      admin: false,
      comments,
      posts,
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
    }));
  }
  async getSingleUser(userId: number) {
    const user = await this.findUser(userId);
    return {
      id: user._id,
      username: user.username,
      password: user.password,
      admin: user.admin,
      posts: user.posts,
    };
  }
  async updateUser(userId: number, password: string) {
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
  async findUser(userId: number): Promise<UserDocument> {
    let user;
    try {
      // user = await this.userModel.findById(username).exec();
      user = await this.userModel.findById(userId).populate('posts').exec();
      console.log('found user: ', user);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
