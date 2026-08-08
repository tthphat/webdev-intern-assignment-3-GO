import type {
  ScoreDistribution,
  TopGroupACandidate,
} from './analytics.type.js';

export const ANALYTICS_REPOSITORY = Symbol('ANALYTICS_REPOSITORY');

export interface AnalyticsRepository {
  findTopGroupA(limit: number): Promise<TopGroupACandidate[]>;
  getScoreDistribution(): Promise<ScoreDistribution[]>;
}
