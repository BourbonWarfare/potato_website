import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('username') userName: string,
    @Body('password') userPass: string,
    @Body('comments') userComments: any,
    @Body('posts') userPosts: any,
  ) {
    const generatedId = await this.usersService.insertUser(
      userName,
      userPass,
      userComments,
      userPosts,
    );
    return { id: generatedId };
  }
  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }
  @Get(':id')
  getUser(@Param('id') userId: number) {
    return this.usersService.getSingleUser(userId);
  }
  @Patch(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body('password') userPass: string,
  ) {
    await this.usersService.updateUser(userId, userPass);
    return null;
  }
  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
