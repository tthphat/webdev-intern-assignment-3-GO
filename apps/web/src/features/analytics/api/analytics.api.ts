import { apiFetch } from '../../../lib/api';
import type {
  ApiSuccessResponse,
  ScoreDistribution,
  TopGroupACandidate,
} from '@score-analytics/shared';

export async function getTopGroupA(): Promise<TopGroupACandidate[]> {
  const response = await apiFetch<ApiSuccessResponse<TopGroupACandidate[]>>(
    '/analytics/top-group-a',
  );

  return response.data;
}

export async function getScoreDistribution(): Promise<ScoreDistribution[]> {
  const response = await apiFetch<ApiSuccessResponse<ScoreDistribution[]>>(
    '/analytics/score-distribution',
  );

  return response.data;
}