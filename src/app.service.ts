import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  defaultAction(): string {
    return 'Nothing is served here';
  }
}
