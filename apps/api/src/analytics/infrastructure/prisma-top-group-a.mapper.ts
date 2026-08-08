import type { TopGroupACandidate } from '../domain/analytics.type.js';

type PrismaTopGroupARow = {
  registrationNumber: string;
  math: string;
  physics: string;
  chemistry: string;
  totalScore: string;
};

export function toTopGroupACandidate(
  row: PrismaTopGroupARow,
): TopGroupACandidate {
  return {
    registrationNumber: row.registrationNumber,
    math: Number(row.math),
    physics: Number(row.physics),
    chemistry: Number(row.chemistry),
    totalScore: Number(row.totalScore),
  };
}
