import { Inject, Injectable } from '@nestjs/common';
import { PRISMA_CLIENT } from '../../../libs/prisma/prisma.service.js';
import { PrismaClient } from '../../generated/prisma/client.js';
import type { AnalyticsRepository } from '../domain/analytics.repository.js';
import type {
  ScoreDistribution,
  TopGroupACandidate,
  ScoreDistributionRow,
} from '../domain/analytics.type.js';
import { toTopGroupACandidate } from './prisma-top-group-a.mapper.js';

@Injectable()
export class PrismaAnalyticsRepository implements AnalyticsRepository {
  constructor(
    @Inject(PRISMA_CLIENT)
    private readonly prisma: PrismaClient,
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

  //   async getScoreDistribution(): Promise<ScoreDistribution[]> {
  //     const rows = await this.prisma.$queryRaw<
  //       {
  //         subject: string;
  //         above8: bigint;
  //         from6To8: bigint;
  //         from4To6: bigint;
  //         below4: bigint;
  //       }[]
  //     >`
  //     SELECT
  //       'math' AS subject,
  //       COUNT(*) FILTER (WHERE math >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE math >= 6 AND math < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE math >= 4 AND math < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE math < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'literature' AS subject,
  //       COUNT(*) FILTER (WHERE literature >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE literature >= 6 AND literature < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE literature >= 4 AND literature < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE literature < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'physics' AS subject,
  //       COUNT(*) FILTER (WHERE physics >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE physics >= 6 AND physics < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE physics >= 4 AND physics < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE physics < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'chemistry' AS subject,
  //       COUNT(*) FILTER (WHERE chemistry >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE chemistry >= 6 AND chemistry < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE chemistry >= 4 AND chemistry < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE chemistry < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'biology' AS subject,
  //       COUNT(*) FILTER (WHERE biology >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE biology >= 6 AND biology < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE biology >= 4 AND biology < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE biology < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'history' AS subject,
  //       COUNT(*) FILTER (WHERE history >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE history >= 6 AND history < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE history >= 4 AND history < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE history < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'geography' AS subject,
  //       COUNT(*) FILTER (WHERE geography >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE geography >= 6 AND geography < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE geography >= 4 AND geography < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE geography < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'civicEducation' AS subject,
  //       COUNT(*) FILTER (WHERE "civicEducation" >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE "civicEducation" >= 6
  //           AND "civicEducation" < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE "civicEducation" >= 4
  //           AND "civicEducation" < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE "civicEducation" < 4
  //       ) AS "below4"
  //     FROM candidates

  //     UNION ALL

  //     SELECT
  //       'foreignLanguage' AS subject,
  //       COUNT(*) FILTER (WHERE "foreignLanguage" >= 8) AS "above8",
  //       COUNT(*) FILTER (
  //         WHERE "foreignLanguage" >= 6
  //           AND "foreignLanguage" < 8
  //       ) AS "from6To8",
  //       COUNT(*) FILTER (
  //         WHERE "foreignLanguage" >= 4
  //           AND "foreignLanguage" < 6
  //       ) AS "from4To6",
  //       COUNT(*) FILTER (
  //         WHERE "foreignLanguage" < 4
  //       ) AS "below4"
  //     FROM candidates
  //   `;

  //     return rows.map((row) => ({
  //       subject: row.subject,
  //       above8: Number(row.above8),
  //       from6To8: Number(row.from6To8),
  //       from4To6: Number(row.from4To6),
  //       below4: Number(row.below4),
  //     }));
  //   }

  async getScoreDistribution(): Promise<ScoreDistribution[]> {
    const [row] = await this.prisma.$queryRaw<ScoreDistributionRow[]>`
    SELECT
        COUNT(*) FILTER (WHERE math >= 8)
        AS "mathAbove8",

        COUNT(*) FILTER (
        WHERE math >= 6 AND math < 8
        ) AS "mathFrom6To8",

        COUNT(*) FILTER (
        WHERE math >= 4 AND math < 6
        ) AS "mathFrom4To6",

        COUNT(*) FILTER (WHERE math < 4)
        AS "mathBelow4",

        COUNT(math) AS "mathTotal",

        COUNT(*) FILTER (WHERE literature >= 8)
        AS "literatureAbove8",

        COUNT(*) FILTER (
        WHERE literature >= 6 AND literature < 8
        ) AS "literatureFrom6To8",

        COUNT(*) FILTER (
        WHERE literature >= 4 AND literature < 6
        ) AS "literatureFrom4To6",

        COUNT(*) FILTER (WHERE literature < 4)
        AS "literatureBelow4",

        COUNT(literature) AS "literatureTotal",

        COUNT(*) FILTER (WHERE physics >= 8)
        AS "physicsAbove8",

        COUNT(*) FILTER (
        WHERE physics >= 6 AND physics < 8
        ) AS "physicsFrom6To8",

        COUNT(*) FILTER (
        WHERE physics >= 4 AND physics < 6
        ) AS "physicsFrom4To6",

        COUNT(*) FILTER (WHERE physics < 4)
        AS "physicsBelow4",

        COUNT(physics) AS "physicsTotal",

        COUNT(*) FILTER (WHERE chemistry >= 8)
        AS "chemistryAbove8",

        COUNT(*) FILTER (
        WHERE chemistry >= 6 AND chemistry < 8
        ) AS "chemistryFrom6To8",

        COUNT(*) FILTER (
        WHERE chemistry >= 4 AND chemistry < 6
        ) AS "chemistryFrom4To6",

        COUNT(*) FILTER (WHERE chemistry < 4)
        AS "chemistryBelow4",

        COUNT(chemistry) AS "chemistryTotal",

        COUNT(*) FILTER (WHERE biology >= 8)
        AS "biologyAbove8",

        COUNT(*) FILTER (
        WHERE biology >= 6 AND biology < 8
        ) AS "biologyFrom6To8",

        COUNT(*) FILTER (
        WHERE biology >= 4 AND biology < 6
        ) AS "biologyFrom4To6",

        COUNT(*) FILTER (WHERE biology < 4)
        AS "biologyBelow4",

        COUNT(biology) AS "biologyTotal",

        COUNT(*) FILTER (WHERE history >= 8)
        AS "historyAbove8",

        COUNT(*) FILTER (
        WHERE history >= 6 AND history < 8
        ) AS "historyFrom6To8",

        COUNT(*) FILTER (
        WHERE history >= 4 AND history < 6
        ) AS "historyFrom4To6",

        COUNT(*) FILTER (WHERE history < 4)
        AS "historyBelow4",

        COUNT(history) AS "historyTotal",

        COUNT(*) FILTER (WHERE geography >= 8)
        AS "geographyAbove8",

        COUNT(*) FILTER (
        WHERE geography >= 6 AND geography < 8
        ) AS "geographyFrom6To8",

        COUNT(*) FILTER (
        WHERE geography >= 4 AND geography < 6
        ) AS "geographyFrom4To6",

        COUNT(*) FILTER (WHERE geography < 4)
        AS "geographyBelow4",

        COUNT(geography) AS "geographyTotal",

        COUNT(*) FILTER (WHERE "civicEducation" >= 8)
        AS "civicEducationAbove8",

        COUNT(*) FILTER (
        WHERE "civicEducation" >= 6
            AND "civicEducation" < 8
        ) AS "civicEducationFrom6To8",

        COUNT(*) FILTER (
        WHERE "civicEducation" >= 4
            AND "civicEducation" < 6
        ) AS "civicEducationFrom4To6",

        COUNT(*) FILTER (WHERE "civicEducation" < 4)
        AS "civicEducationBelow4",

        COUNT("civicEducation") AS "civicEducationTotal",

        COUNT(*) FILTER (WHERE "foreignLanguage" >= 8)
        AS "foreignLanguageAbove8",

        COUNT(*) FILTER (
        WHERE "foreignLanguage" >= 6
            AND "foreignLanguage" < 8
        ) AS "foreignLanguageFrom6To8",

        COUNT(*) FILTER (
        WHERE "foreignLanguage" >= 4
            AND "foreignLanguage" < 6
        ) AS "foreignLanguageFrom4To6",

        COUNT(*) FILTER (WHERE "foreignLanguage" < 4)
        AS "foreignLanguageBelow4",

        COUNT("foreignLanguage") AS "foreignLanguageTotal"

    FROM candidates
  `;

    return [
      {
        subject: 'math',
        above8: Number(row.mathAbove8),
        from6To8: Number(row.mathFrom6To8),
        from4To6: Number(row.mathFrom4To6),
        below4: Number(row.mathBelow4),
        total: Number(row.mathTotal),
      },
      {
        subject: 'literature',
        above8: Number(row.literatureAbove8),
        from6To8: Number(row.literatureFrom6To8),
        from4To6: Number(row.literatureFrom4To6),
        below4: Number(row.literatureBelow4),
        total: Number(row.literatureTotal),
      },
      {
        subject: 'physics',
        above8: Number(row.physicsAbove8),
        from6To8: Number(row.physicsFrom6To8),
        from4To6: Number(row.physicsFrom4To6),
        below4: Number(row.physicsBelow4),
        total: Number(row.physicsTotal),
      },
      {
        subject: 'chemistry',
        above8: Number(row.chemistryAbove8),
        from6To8: Number(row.chemistryFrom6To8),
        from4To6: Number(row.chemistryFrom4To6),
        below4: Number(row.chemistryBelow4),
        total: Number(row.chemistryTotal),
      },
      {
        subject: 'biology',
        above8: Number(row.biologyAbove8),
        from6To8: Number(row.biologyFrom6To8),
        from4To6: Number(row.biologyFrom4To6),
        below4: Number(row.biologyBelow4),
        total: Number(row.biologyTotal),
      },
      {
        subject: 'history',
        above8: Number(row.historyAbove8),
        from6To8: Number(row.historyFrom6To8),
        from4To6: Number(row.historyFrom4To6),
        below4: Number(row.historyBelow4),
        total: Number(row.historyTotal),
      },
      {
        subject: 'geography',
        above8: Number(row.geographyAbove8),
        from6To8: Number(row.geographyFrom6To8),
        from4To6: Number(row.geographyFrom4To6),
        below4: Number(row.geographyBelow4),
        total: Number(row.geographyTotal),
      },
      {
        subject: 'civicEducation',
        above8: Number(row.civicEducationAbove8),
        from6To8: Number(row.civicEducationFrom6To8),
        from4To6: Number(row.civicEducationFrom4To6),
        below4: Number(row.civicEducationBelow4),
        total: Number(row.civicEducationTotal),
      },
      {
        subject: 'foreignLanguage',
        above8: Number(row.foreignLanguageAbove8),
        from6To8: Number(row.foreignLanguageFrom6To8),
        from4To6: Number(row.foreignLanguageFrom4To6),
        below4: Number(row.foreignLanguageBelow4),
        total: Number(row.foreignLanguageTotal),
      },
    ];
  }
}
