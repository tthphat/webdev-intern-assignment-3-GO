import { Controller, Get } from '@nestjs/common';
import { GetTopGroupAUseCase } from '../application/use-cases/get-top-group-a.use-case.js';
import { GetScoreDistributionUseCase } from '../application/use-cases/get-score-distribution.use-case.js';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly getTopGroupAUseCase: GetTopGroupAUseCase,
    private readonly getScoreDistributionUseCase: GetScoreDistributionUseCase,
  ) {}

  @Get('top-group-a')
  async getTopGroupA() {
    const data = await this.getTopGroupAUseCase.execute();

    return {
      message: 'Top 10 Group A candidates retrieved successfully',
      data,
    };
  }

  @Get('score-distribution')
  async getScoreDistribution() {
    return {
      message: 'Score distribution retrieved successfully',
      data: await this.getScoreDistributionUseCase.execute(),
    };
  }
}
