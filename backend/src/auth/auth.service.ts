import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userId: string, pass: string): Promise<any> {
    console.log('inside validate user');
    const user = await this.usersService.getSingleUser(userId);
    let check: any = null;
    await bcrypt
      .compare(pass, user.results.password)
      .then((validPass) => {
        check = validPass;
      })
      .catch((err) => console.log('error: ', err));
    console.log('check: ', check);
    if (check !== null && check) {
      // const { password, ...results } = user.results;
      // console.log('bcrypt user.results: ', user.results);
      // console.log('bcrypt results', results);
      // console.log('bcrypt password: ', password);
      return user.results;
    }
    return user;
  }
  // this is from /auth/login, returns jwt token for decryption client side
  async login(user: any) {
    const payload = {
      username: user.username,
      missions: user.missions,
      posts: user.posts,
      comments: user.comments,
      email: user.email,
      admin: user.admin,
      id: user._id,
    };
    // const payload = user;
    // const payload = this.jwtService.sign(payload);
    // how to decrypt JWT tokens
    // const parseJWT = (token) => {
    //   try {
    //     return JSON.parse(atob(token.split('.')[1]));
    //   } catch (e) {
    //     return e;
    //   }
    // };
    // console.log('parseJWT: ', parseJWT(payload));
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
