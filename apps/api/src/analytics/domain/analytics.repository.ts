import type {
  ScoreDistribution,
  TopGroupACandidate,
} from '@score-analytics/shared';

export const ANALYTICS_REPOSITORY = Symbol('ANALYTICS_REPOSITORY');

export interface AnalyticsRepository {
  findTopGroupA(limit: number): Promise<TopGroupACandidate[]>;
  getScoreDistribution(): Promise<ScoreDistribution[]>;
}
