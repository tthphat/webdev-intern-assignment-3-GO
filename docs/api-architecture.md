# API Architecture Documentation

## 1. Project Overview

**Project Name:** `@score-analytics/api`  
**Framework:** NestJS 11.x  
**Language:** TypeScript (ESM)  
**Database:** PostgreSQL with Prisma ORM

---

## 2. Architecture Pattern

The API follows **Clean Architecture** with a layered structure:

```
src/
├── candidate/              # Feature module
│   ├── domain/            # Business entities & interfaces
│   ├── application/       # Use cases (business logic)
│   ├── infrastructure/    # External implementations (DB)
│   └── presentation/      # Controllers (HTTP handlers)
├── app.module.ts          # Root module
└── main.ts                # Application entry point
```

---

## 3. Technology Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | NestJS 11.x |
| ORM | Prisma 7.x |
| Database | PostgreSQL |
| Driver | pg (node-postgres) |
| Adapter | @prisma/adapter-pg |
| Validation | Class-validator (built-in NestJS) |
| Testing | Jest + Supertest |

---

## 4. Module Structure

### 4.1 Root Module (`app.module.ts`)

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- **Controllers**: `AppController` - handles HTTP requests
- **Providers**: `AppService` - application-level services

### 4.2 Entry Point (`main.ts`)

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

- Creates NestJS application
- Listens on port from `process.env.PORT` or default `3000`

---

## 5. Feature Module: Candidate

### 5.1 Domain Layer (`candidate/domain/`)

#### Entity Type (`candidate.type.ts`)

```typescript
export interface Candidate {
  registrationNumber: string;
  math: Decimal | null;
  literature: Decimal | null;
  physics: Decimal | null;
  foreignLanguage: Decimal | null;
  chemistry: Decimal | null;
  biology: Decimal | null;
  history: Decimal | null;
  geography: Decimal | null;
  civicEducation: Decimal | null;
  foreignLanguageCode: string | null;
}
```

#### Repository Interface (`candidate.repository.ts`)

```typescript
export interface ICandidateRepository {
  findByRegistrationNumber(
    registrationNumber: string,
  ): Promise<Candidate | null>;
}
```

### 5.2 Infrastructure Layer (`candidate/infrastructure/`)

#### Prisma Implementation (`prisma-candidate.repository.ts`)

- Implements `ICandidateRepository`
- Uses Prisma Client to interact with PostgreSQL
- Handles database queries for Candidate entity

### 5.3 Application Layer (`candidate/application/`)

#### Use Cases (`usecase/`)

- **GetCandidateByRegistrationNumberUseCase**: Retrieves a candidate by their unique registration number

### 5.4 Presentation Layer (`candidate/presentation/`)

#### Controller (`candidate.controller.ts`)

- Handles HTTP endpoints for candidate operations
- Receives requests and returns responses to clients

### 5.5 Module Definition (`candidate.module.ts`)

```typescript
@Module({
  controllers: [],
  providers: [],
})
export class CandidateModule {}
```

---

## 6. Database Schema (Prisma)

### Model: Candidate

| Field | Type | Constraints |
|-------|------|-------------|
| `registrationNumber` | String | @id (Primary Key) |
| `math` | Decimal(4,2) | Optional |
| `literature` | Decimal(4,2) | Optional |
| `physics` | Decimal(4,2) | Optional |
| `foreignLanguage` | Decimal(4,2) | Optional |
| `chemistry` | Decimal(4,2) | Optional |
| `biology` | Decimal(4,2) | Optional |
| `history` | Decimal(4,2) | Optional |
| `geography` | Decimal(4,2) | Optional |
| `civicEducation` | Decimal(4,2) | Optional |
| `foreignLanguageCode` | String | Optional |
| `createdAt` | DateTime | @default(now()) |
| `updatedAt` | DateTime | @updatedAt |

**Table name:** `candidates`

---

## 7. Shared Library

### Prisma Module (`libs/prisma/`)

#### PrismaService (`prisma.service.ts`)

```typescript
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
```

- Manages database connection lifecycle
- Implements `OnModuleInit` and `OnModuleDestroy` hooks
- Injects PrismaClient via DI

#### PrismaClient (`prisma.client.ts`)

- Provides configured PrismaClient instance
- Uses PostgreSQL adapter

---

## 8. Project Structure Summary

```
apps/api/
├── src/
│   ├── main.ts                           # Entry point
│   ├── app.module.ts                     # Root module
│   ├── app.controller.ts                # Root controller
│   ├── app.service.ts                   # Root service
│   ├── candidate/                        # Candidate feature
│   │   ├── candidate.module.ts           # Module definition
│   │   ├── domain/
│   │   │   ├── candidate.type.ts         # Entity type
│   │   │   └── candidate.repository.ts  # Repository interface
│   │   ├── application/
│   │   │   └── usecase/                  # Use cases
│   │   ├── infrastructure/
│   │   │   └── prisma-candidate.repository.ts  # DB implementation
│   │   └── presentation/
│   │       └── candidate.controller.ts  # HTTP handlers
│   └── generated/prisma/                 # Prisma generated code
├── libs/prisma/                          # Shared Prisma module
├── prisma/
│   ├── schema.prisma                     # Database schema
│   └── migrations/                       # Database migrations
├── package.json
└── nest-cli.json
```

---

## 9. Dependency Flow

```
Presentation (Controller)
        ↓
Application (Use Case)
        ↓
Domain (Interface/Type)
        ↓
Infrastructure (Repository Implementation)
        ↓
Database (Prisma → PostgreSQL)
```

---

## 10. Key Principles

1. **Dependency Inversion**: Domain defines interfaces, Infrastructure implements them
2. **Single Responsibility**: Each layer has one purpose
3. **Separation of Concerns**: Clear boundaries between layers
4. **Dependency Injection**: NestJS DI container manages all dependencies

---

## 11. Available Scripts

```bash
npm run build           # Build the application
npm run start           # Start production server
npm run start:dev       # Start in development with watch mode
npm run start:debug     # Start with debugging enabled
npm run start:prod      # Start from compiled dist
npm run lint            # Lint and fix code
npm run test            # Run unit tests
npm run test:cov        # Run tests with coverage
npm run test:e2e        # Run end-to-end tests
```

---

## 12. Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | Required |

---

## 13. Notes

- The Candidate module structure follows Clean Architecture but is currently empty (controllers, providers arrays are empty)
- Prisma generated client is stored in `src/generated/prisma/`
- The project uses ESM (ES Modules) with `"type": "module"` in package.json
- CSV parsing capability is available via `csv-parser` dependency