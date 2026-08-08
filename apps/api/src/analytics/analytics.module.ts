import { Module } from '@nestjs/common';
import { ANALYTICS_REPOSITORY } from './domain/analytics.repository.js';
import { PrismaAnalyticsRepository } from './infrastructure/prisma-analytics.repository.js';
import { AnalyticsController } from './presentation/analytics.controller.js';
import { GetTopGroupAUseCase } from './application/use-cases/get-top-group-a.use-case.js';
import { GetScoreDistributionUseCase } from './application/use-cases/get-score-distribution.use-case.js';
import { SubjectsService } from './application/services/subjects.service.js';

@Module({
  controllers: [AnalyticsController],
  providers: [
    SubjectsService,
    GetTopGroupAUseCase,
    GetScoreDistributionUseCase,
    {
      provide: ANALYTICS_REPOSITORY,
      useClass: PrismaAnalyticsRepository,
    },
  ],
})
export class AnalyticsModule {}
