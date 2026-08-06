import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import csv from 'csv-parser';
import { Prisma } from '../src/generated/prisma/client.js';
import {
  mapCandidate,
  CsvCandidateRow,
} from './mapper/candidate.seed.mapper.js';
import { prisma } from '../libs/prisma/prisma.client.js';

const BATCH_SIZE = 1000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  const batch: Prisma.CandidateCreateManyInput[] = [];

  const filePath = path.resolve(
    __dirname,
    '../../../assignment/dataset/diem_thi_thpt_2024.csv',
  );

  const stream = fs.createReadStream(filePath).pipe(
    csv({
      separator: ',',
    }),
  );

  for await (const row of stream) {
    batch.push(mapCandidate(row as CsvCandidateRow));

    if (batch.length >= BATCH_SIZE) {
      await prisma.candidate.createMany({
        data: batch,
      });

      console.log(`Inserted ${batch.length} records`);

      batch.length = 0;
    }
  }

  if (batch.length > 0) {
    await prisma.candidate.createMany({
      data: batch,
    });

    console.log(`Inserted ${batch.length} records`);
  }

  console.log('Seed completed');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
