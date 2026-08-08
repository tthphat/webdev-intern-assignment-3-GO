import { apiFetch } from '../../../lib/api';
import type { Candidate } from '@score-analytics/shared';

export async function getCandidate(
  registrationNumber: string,
): Promise<Candidate> {
  const response = await apiFetch<{
    success: boolean;
    message: string;
    data: Candidate;
  }>(
    `/candidates/${registrationNumber}`,
  );

  return response.data;
}
