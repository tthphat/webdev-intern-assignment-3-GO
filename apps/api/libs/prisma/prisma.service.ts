import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../../src/generated/prisma/client.js';

export const PRISMA_CLIENT = Symbol('PRISMA_CLIENT');

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(PRISMA_CLIENT) private readonly client: PrismaClient) {}

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
