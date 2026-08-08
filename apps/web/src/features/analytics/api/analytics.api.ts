import { apiFetch } from '../../../lib/api';
import type { ApiSuccessResponse, TopGroupACandidate } from '@score-analytics/shared';

export async function getTopGroupA(): Promise<TopGroupACandidate[]> {
  const response = await apiFetch<ApiSuccessResponse<TopGroupACandidate[]>>(
    '/analytics/top-group-a',
  );

  return response.data;
}