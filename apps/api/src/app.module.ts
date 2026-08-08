import { Module } from '@nestjs/common';

import { CandidateModule } from './candidate/candidate.module.js';
import { PrismaModule } from '../libs/prisma/prisma.module.js';
import { AnalyticsModule } from './analytics/analytics.module.js';
@Module({
  imports: [PrismaModule, CandidateModule, AnalyticsModule],
})
export class AppModule {}
