import { Inject, Injectable } from '@nestjs/common';
import {
  ANALYTICS_REPOSITORY,
  type AnalyticsRepository,
} from '../../domain/analytics.repository.js';

@Injectable()
export class GetScoreDistributionUseCase {
  constructor(
    @Inject(ANALYTICS_REPOSITORY)
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  async execute() {
    return this.analyticsRepository.getScoreDistribution();
  }
}
