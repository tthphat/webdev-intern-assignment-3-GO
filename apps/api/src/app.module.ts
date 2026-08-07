import { Module } from '@nestjs/common';

import { CandidateModule } from './candidate/candidate.module.js';
import { PrismaModule } from '../libs/prisma/prisma.module.js';
@Module({
  imports: [PrismaModule, CandidateModule],
})
export class AppModule {}
