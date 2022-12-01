import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus(): string {
    return 'Sami Backend is running. Go to /api to see the API documentation.';
  }
}
