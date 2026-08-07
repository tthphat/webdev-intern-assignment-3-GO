import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  CANDIDDATE_REPO,
  type CandidateRepository,
} from '../../domain/candidate.repository.js';

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
      throw new NotFoundException('Candidate not found');
    }

    return candidate;
  }
}
