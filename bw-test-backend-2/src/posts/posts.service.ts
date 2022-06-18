import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { paginate } from 'nestjs-paginate';
import { cursorTo } from 'readline';
import { find } from 'rxjs';
import { UsersService } from 'src/users/users.service';
import * as mongoose from 'mongoose';
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
    author: string,
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
    // newPost.populate('User');
    const originalPoster = await this.usersService.findUser(author);
    console.log('original poster: ', originalPoster);
    originalPoster.posts.push(result._id);
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
    debugger;
    const filters: FilterQuery<PostDocument> = startId
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

    const findQuery = this.postModel
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
    const count = await this.postModel.count();
    const pageHandle = page ? page : '1';
    const next = results.length
      ? `localhost:8080/posts/?page=${parseInt(pageHandle) + 1}`
      : null;
    const prev =
      parseInt(page) > 1
        ? `localhost:8080/posts/?page=${parseInt(pageHandle) - 1}`
        : null;
    return { count, page, next, prev, limit, results };
  }
  async getSinglePost(postsCategory: string, postId: string) {
    const results = await this.findPost(postId);
    // const result = await findQuery;
    // result ? result : 'No Post Found'
    return { results };
  }
  async getCategoryPosts(
    // documentsToSkip?: number,
    // limit?: number,
    postsCategory,
    limit = 10,
    startId?: string,
    searchQuery?: string,
    page?: string,
  ) {
    const filters: FilterQuery<PostDocument> = postsCategory
      ? {
          category: {
            $in: postsCategory,
          },
        }
      : {};

    if (searchQuery) {
      filters.$text = {
        $search: searchQuery,
      };
    }

    const findQuery = this.postModel
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
    const count = await this.postModel.count();
    const pageHandle = page ? page : '1';
    const next = results.length
      ? `localhost:8080/posts/${postsCategory}/?page=${
          parseInt(pageHandle) + 1
        }`
      : null;
    const prev =
      parseInt(page) > 1
        ? `localhost:8080/posts/${postsCategory}/?page=${
            parseInt(pageHandle) - 1
          }`
        : null;
    return { count, page, next, prev, limit, results };
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
      // post = await this.postModel.findById(id).exec();
      post = await this.postModel
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
      throw new NotFoundException('Could not find post.');
    }
    if (!post) {
      throw new NotFoundException('Could not find post.');
    }
    return post;
  }
}

// async getPosts() {
//   const posts = await this.postModel.find().exec();
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
//   const post = await this.findPost(postId);
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
