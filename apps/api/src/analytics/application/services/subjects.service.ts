import { Injectable } from '@nestjs/common';
import {
  SUBJECT_LABELS,
  SubjectCode,
  type ScoreDistribution,
} from '@score-analytics/shared';
import type { ScoreDistributionRow } from '../../domain/analytics.type.js';

@Injectable()
export class SubjectsService {
  getSubjectCodes(): SubjectCode[] {
    return Object.values(SubjectCode);
  }

  getLabel(code: SubjectCode): string {
    return SUBJECT_LABELS[code];
  }

  buildScoreDistributionSelect(): string {
    return this.getSubjectCodes()
      .map((code) => this.buildSubjectBlock(code))
      .join(',\n');
  }

  private buildSubjectBlock(code: SubjectCode): string {
    const column = this.quote(code);

    return `
      COUNT(*) FILTER (WHERE ${column} >= 8) AS ${this.quote(`${code}Above8`)},
      COUNT(*) FILTER (WHERE ${column} >= 6 AND ${column} < 8) AS ${this.quote(
        `${code}From6To8`,
      )},
      COUNT(*) FILTER (WHERE ${column} >= 4 AND ${column} < 6) AS ${this.quote(
        `${code}From4To6`,
      )},
      COUNT(*) FILTER (WHERE ${column} < 4) AS ${this.quote(`${code}Below4`)},
      COUNT(${column}) AS ${this.quote(`${code}Total`)}`;
  }

  private quote(identifier: string): string {
    return `"${identifier.replaceAll('"', '""')}"`;
  }

  toDistributionRows(row: ScoreDistributionRow): ScoreDistribution[] {
    return this.getSubjectCodes().map((code) => ({
      subject: code,
      above8: Number(row[`${code}Above8`]),
      from6To8: Number(row[`${code}From6To8`]),
      from4To6: Number(row[`${code}From4To6`]),
      below4: Number(row[`${code}Below4`]),
      total: Number(row[`${code}Total`]),
    }));
  }
}
