import { Global, Module } from '@nestjs/common';
import { PRISMA_CLIENT, PrismaService } from './prisma.service.js';
import { prisma } from './prisma.client.js';

@Global()
@Module({
  providers: [
    {
      provide: PRISMA_CLIENT,
      useValue: prisma,
    },
    PrismaService,
  ],
  exports: [PRISMA_CLIENT, PrismaService],
})
export class PrismaModule {}
