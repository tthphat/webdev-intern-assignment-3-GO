-- CreateTable
CREATE TABLE "candidates" (
    "registrationNumber" TEXT NOT NULL,
    "math" DECIMAL(4,2),
    "literature" DECIMAL(4,2),
    "foreignLanguage" DECIMAL(4,2),
    "physics" DECIMAL(4,2),
    "chemistry" DECIMAL(4,2),
    "biology" DECIMAL(4,2),
    "history" DECIMAL(4,2),
    "geography" DECIMAL(4,2),
    "civicEducation" DECIMAL(4,2),
    "foreignLanguageCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidates_pkey" PRIMARY KEY ("registrationNumber")
);
