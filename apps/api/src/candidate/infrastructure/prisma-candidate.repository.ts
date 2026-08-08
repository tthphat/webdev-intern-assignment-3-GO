import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT } from '../../../libs/prisma/prisma.service.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import type { CandidateRepository } from '../domain/candidate.repository.js';
import { Candidate } from '@score-analytics/shared';
import { toCandidate } from './candidate.mapper.js';

@Injectable()
export class PrismaCandidateRepository implements CandidateRepository {
  constructor(@Inject(PRISMA_CLIENT) private readonly prisma: PrismaClient) {}

  async findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<Candidate | null> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { registrationNumber },
    });

    if (!candidate) return null;

    return toCandidate(candidate);
  }
}
