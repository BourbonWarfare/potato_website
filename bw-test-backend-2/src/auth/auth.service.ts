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
    const user = await this.usersService.getSingleUser(userId);
    let check: any = null;
    await bcrypt
      .compare(pass, user.results.password)
      .then((validPass) => {
        check = validPass;
      })
      .catch((err) => console.log('error: ', err));
    if (check !== null && check) {
      const { password, ...results } = user.results;
      return results;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
