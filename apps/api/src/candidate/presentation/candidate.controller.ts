import { Controller, Get, Param } from '@nestjs/common';
import { GetCandidateByRegistrationNumberUseCase } from '../application/usecase/get-candidate-by-registration-number.use-case.js';
import { ZodValidationPipe } from '../../common/pipe/zod-validate.pipe.js';
import {
  type RegistrationNumberParams,
  registrationNumberSchema,
} from '@score-analytics/shared';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly getCandidateByRN: GetCandidateByRegistrationNumberUseCase,
  ) {}

  @Get(':registrationNumber')
  async getCandidate(
    @Param(new ZodValidationPipe(registrationNumberSchema))
    params: RegistrationNumberParams,
  ) {
    const candidate = await this.getCandidateByRN.excute(
      params.registrationNumber,
    );

    return {
      message: 'Candidate retrieved successfully',
      data: candidate,
    };
  }
}
