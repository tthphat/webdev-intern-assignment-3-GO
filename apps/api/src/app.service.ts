import { Injectable } from '@nestjs/common';
import { hello } from '@score-analytics/shared';
import { SearchCandidateSchema } from '@score-analytics/shared';

console.log(
  SearchCandidateSchema.safeParse({ registrationNumber: '12345678' }),
);

@Injectable()
export class AppService {
  getHello(): string {
    return hello;
  }
}
