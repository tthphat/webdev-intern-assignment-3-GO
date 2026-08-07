import { Controller, Get, Param } from '@nestjs/common';
import { GetCandidateByRegistrationNumberUseCase } from '../application/usecase/get-candidate-by-registration-number.use-case.js';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly getCandidateByRN: GetCandidateByRegistrationNumberUseCase,
  ) {}

  @Get(':registrationNumber')
  async getCandidate(@Param('registrationNumber') registrationNumber: string) {
    return this.getCandidateByRN.excute(registrationNumber);
  }
}
