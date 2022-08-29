import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userId: string, password: string): Promise<any> {
    console.log('inside validate local');
    // console.log('userID: ', userId);
    // console.log('password: ', password);
    const user = await this.authService.validateUser(userId, password);
    // console.log('user from strategy: ', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
