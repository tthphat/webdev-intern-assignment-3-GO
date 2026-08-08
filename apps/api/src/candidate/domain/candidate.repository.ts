import { Candidate } from '@score-analytics/shared';

export const CANDIDDATE_REPO = Symbol('CANDIDDATE_REPO');

export interface CandidateRepository {
  findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<Candidate | null>;
}
