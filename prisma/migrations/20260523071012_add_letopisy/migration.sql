-- CreateTable
CREATE TABLE "Letopisy" (
    "id" TEXT NOT NULL,
    "nadpis" TEXT NOT NULL,
    "popis" TEXT,
    "datePrecision" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER,
    "day" INTEGER,
    "season" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Letopisy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Letopisy" ADD CONSTRAINT "Letopisy_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
