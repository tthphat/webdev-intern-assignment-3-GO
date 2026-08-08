import { Inject, Injectable } from '@nestjs/common';
import {
  ANALYTICS_REPOSITORY,
  type AnalyticsRepository,
} from '../../domain/analytics.repository.js';

@Injectable()
export class GetTopGroupAUseCase {
  private static readonly LIMIT = 10;

  constructor(
    @Inject(ANALYTICS_REPOSITORY)
    private readonly analyticsRepository: AnalyticsRepository,
  ) {}

  async execute() {
    return this.analyticsRepository.findTopGroupA(GetTopGroupAUseCase.LIMIT);
  }
}
