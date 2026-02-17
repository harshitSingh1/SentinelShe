-- CreateEnum
CREATE TYPE "TipCategory" AS ENUM ('AWARENESS', 'INTUITION', 'CONFIDENCE', 'PREVENTION', 'DE_ESCALATION', 'PHYSICAL', 'DIGITAL', 'TRAVEL', 'HOME', 'WORK');

-- CreateTable
CREATE TABLE "QuickTip" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "TipCategory" NOT NULL,
    "icon" TEXT NOT NULL,
    "readTime" INTEGER NOT NULL,
    "forSituation" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuickTip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "situation" TEXT NOT NULL,
    "imageUrl" TEXT,
    "quickActions" TEXT[],
    "tipIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProtectiveMove" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gifUrl" TEXT,
    "steps" TEXT[],
    "difficulty" TEXT NOT NULL DEFAULT 'beginner',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProtectiveMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SafetyChecklist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "items" TEXT[],
    "category" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SafetyChecklist_pkey" PRIMARY KEY ("id")
);
