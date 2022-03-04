import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userId: number, password: string): Promise<any> {
    debugger;
    const user = await this.authService.validateUser(userId, password);
    console.log('user from strategy: ', user);
    debugger;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
