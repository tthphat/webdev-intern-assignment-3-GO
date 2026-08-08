import { Candidate as PrismaCandidate } from '../../generated/prisma/client.js';
import { Candidate } from '../domain/candidate.type.js';

export function toCandidate(prismaCandidate: PrismaCandidate): Candidate {
  return {
    registrationNumber: prismaCandidate.registrationNumber,
    math: prismaCandidate.math?.toNumber() ?? null,
    literature: prismaCandidate.literature?.toNumber() ?? null,
    physics: prismaCandidate.physics?.toNumber() ?? null,
    foreignLanguage: prismaCandidate.foreignLanguage?.toNumber() ?? null,
    chemistry: prismaCandidate.chemistry?.toNumber() ?? null,
    biology: prismaCandidate.biology?.toNumber() ?? null,
    history: prismaCandidate.history?.toNumber() ?? null,
    geography: prismaCandidate.geography?.toNumber() ?? null,
    civicEducation: prismaCandidate.civicEducation?.toNumber() ?? null,
    foreignLanguageCode: prismaCandidate.foreignLanguageCode ?? null,
  };
}
