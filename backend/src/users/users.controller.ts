import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body('username') userName: string,
    @Body('password') userPass: string,
    @Body('comments') userComments: any,
    @Body('posts') userPosts: any,
    @Body('email') userEmail: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userName,
      userPass,
      userComments,
      userPosts,
      userEmail,
    );
    return { id: generatedId };
  }
  @Post('/signup')
  async addUserAuth(
    @Body('username') userName: string,
    @Body('password') userPass: string,
    @Body('comments') userComments: any,
    @Body('posts') userPosts: any,
    @Body('email') userEmail: string,
  ) {
    const hashedPassword = await bcrypt.hash(userPass, 10);
    const result = await this.usersService.insertUser(
      userName,
      hashedPassword,
      userComments,
      userPosts,
      userEmail,
    );
    return {
      msg: 'User successfully registered',
      userId: result._id,
      userName: result.username,
    };
  }
  // this is from /users/login, returns user object and logged in message
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    console.log('inside login');
    console.log('req: ', req);
    return { User: req.user, msg: 'authenticated' };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get('/users/:id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): boolean {
    return req.user.username;
  }
  // getHello(): boolean {
  //   return true;
  // }

  @Get('/logout')
  logout(@Request() req, @Response() res): any {
    req.logout();
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.send('Logged Out');
    });
    return { msg: 'The user session has ended' };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
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
