import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT } from '../../../libs/prisma/prisma.service.js';
import { Prisma, PrismaClient } from '../../generated/prisma/client.js';
import type { AnalyticsRepository } from '../domain/analytics.repository.js';
import type {
  ScoreDistribution,
  TopGroupACandidate,
} from '@score-analytics/shared';
import type { ScoreDistributionRow } from '../domain/analytics.type.js';
import { toTopGroupACandidate } from './prisma-top-group-a.mapper.js';
import { SubjectsService } from '../application/services/subjects.service.js';

@Injectable()
export class PrismaAnalyticsRepository implements AnalyticsRepository {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prisma: PrismaClient,
    private readonly subjectsService: SubjectsService,
  ) {}

  async findTopGroupA(limit: number): Promise<TopGroupACandidate[]> {
    const candidates = await this.prisma.$queryRaw<
      {
        registrationNumber: string;
        math: string;
        physics: string;
        chemistry: string;
        totalScore: string;
      }[]
    >`
      SELECT
        "registrationNumber",
        math,
        physics,
        chemistry,
        (math + physics + chemistry) AS "totalScore"
      FROM candidates
      WHERE
        math IS NOT NULL
        AND physics IS NOT NULL
        AND chemistry IS NOT NULL
      ORDER BY
        (math + physics + chemistry) DESC,
        "registrationNumber" ASC
      LIMIT ${limit}
    `;

    return candidates.map(toTopGroupACandidate);
  }

  async getScoreDistribution(): Promise<ScoreDistribution[]> {
    const selectColumns = this.subjectsService.buildScoreDistributionSelect();

    const [row] = await this.prisma.$queryRaw<ScoreDistributionRow[]>(
      Prisma.sql`
        SELECT
          ${Prisma.raw(selectColumns)}
        FROM candidates
      `,
    );

    return this.subjectsService.toDistributionRows(row);
  }
}
