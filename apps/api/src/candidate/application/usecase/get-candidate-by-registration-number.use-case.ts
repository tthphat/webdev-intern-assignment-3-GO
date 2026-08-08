import { Inject, Injectable } from '@nestjs/common';
import {
  CANDIDDATE_REPO,
  type CandidateRepository,
} from '../../domain/candidate.repository.js';
import { AppException } from '../../../common/exceptions/app.exception.js';
import { ERROR_CODES } from '@score-analytics/shared';

@Injectable()
export class GetCandidateByRegistrationNumberUseCase {
  constructor(
    @Inject(CANDIDDATE_REPO)
    private readonly candidateRepo: CandidateRepository,
  ) {}

  async excute(registrationNumber: string) {
    const candidate =
      await this.candidateRepo.findByRegistrationNumber(registrationNumber);

    if (!candidate) {
      throw new AppException(
        ERROR_CODES.CANDIDATE_NOT_FOUND,
        `Candidate '${registrationNumber}' not found`,
      );
    }

    return candidate;
  }
}
