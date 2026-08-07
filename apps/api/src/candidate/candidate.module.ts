import { Module } from '@nestjs/common';
import { PrismaCandidateRepository } from './infrastructure/prisma-candidate.repository.js';
import { CANDIDDATE_REPO } from './domain/candidate.repository.js';
import { GetCandidateByRegistrationNumberUseCase } from './application/usecase/get-candidate-by-registration-number.use-case.js';
import { CandidateController } from './presentation/candidate.controller.js';

@Module({
  controllers: [CandidateController],
  providers: [
    {
      provide: CANDIDDATE_REPO,
      useClass: PrismaCandidateRepository,
    },
    GetCandidateByRegistrationNumberUseCase,
  ],
  exports: [CANDIDDATE_REPO, GetCandidateByRegistrationNumberUseCase],
})
export class CandidateModule {}
