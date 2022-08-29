import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStartUp(): string {
    return 'Server is started';
  }
}
