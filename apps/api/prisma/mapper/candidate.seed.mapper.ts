import { Prisma } from '../../src/generated/prisma/client.js';

export interface CsvCandidateRow {
  sbd: string;

  toan?: string;
  ngu_van?: string;
  ngoai_ngu?: string;

  vat_li?: string;
  hoa_hoc?: string;
  sinh_hoc?: string;

  lich_su?: string;
  dia_li?: string;
  gdcd?: string;

  ma_ngoai_ngu?: string;
}

function toDecimal(value?: string): Prisma.Decimal | null {
  if (!value?.trim()) {
    return null;
  }

  return new Prisma.Decimal(value.replace(',', '.'));
}

export function mapCandidate(
  row: CsvCandidateRow,
): Prisma.CandidateCreateManyInput {
  return {
    registrationNumber: row.sbd,

    math: toDecimal(row.toan),
    literature: toDecimal(row.ngu_van),
    foreignLanguage: toDecimal(row.ngoai_ngu),

    physics: toDecimal(row.vat_li),
    chemistry: toDecimal(row.hoa_hoc),
    biology: toDecimal(row.sinh_hoc),

    history: toDecimal(row.lich_su),
    geography: toDecimal(row.dia_li),
    civicEducation: toDecimal(row.gdcd),

    foreignLanguageCode: row.ma_ngoai_ngu || null,
  };
}
