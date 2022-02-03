import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
// import { Comment, CommentDocument } from '../comments/comments.schema';
import { Post, PostDocument } from './posts.schema';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private readonly usersService: UsersService,
  ) {}

  async insertPost(
    title: string,
    text: string,
    url: string,
    type: string,
    category: string,
    author: number,
  ) {
    const newPost = new this.postModel({
      title,
      text,
      url,
      type,
      category,
      author,
    });
    const result = await newPost.save();
    // const originalPoster = await this.usersService.findUser(author);
    // console.log('original poster: ', originalPoster);
    // originalPoster[0].posts.push(newPost);
    // originalPoster[0].save();
    console.log('New post result: ', result);
    return result._id as string;
  }
  async getPosts() {
    const posts = await this.postModel.find().exec();
    return posts.map((post) => ({
      id: post._id,
      title: post.title,
      text: post.text,
      url: post.url,
      type: post.type,
      category: post.category,
      author: post.author,
      comments: post.comments,
    }));
  }
  async getSinglePost(postId: string) {
    const post = await this.findPost(postId);
    return {
      id: post._id,
      title: post.title,
      text: post.text,
      url: post.url,
      type: post.type,
      category: post.category,
      author: post.author,
      comments: post.comments,
    };
  }
  async updatePost(
    postId: string,
    title: string,
    text: string,
    url: string,
    type: string,
    category: string,
  ) {
    const updatedPost = await this.findPost(postId);
    if (title) {
      updatedPost.title = title;
    }
    if (text) {
      updatedPost.text = text;
    }
    if (url) {
      updatedPost.url = url;
    }
    if (type) {
      updatedPost.type = type;
    }
    if (category) {
      updatedPost.category = category;
    }
    updatedPost.save();
  }
  async deletePost(postId: string) {
    const result = await this.postModel.deleteOne({ _id: postId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find postasdf.');
    }
  }
  async findPost(id: string): Promise<PostDocument> {
    let post;
    try {
      post = await this.postModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find post.');
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}
