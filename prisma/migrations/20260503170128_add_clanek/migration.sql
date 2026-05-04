-- CreateEnum
CREATE TYPE "ClanekKategorie" AS ENUM ('SPOJENCI', 'NEPRATELE', 'NABOZENSTVI');

-- CreateTable
CREATE TABLE "Clanek" (
    "id" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "obsah" TEXT NOT NULL,
    "image" TEXT,
    "kategorie" "ClanekKategorie" NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Clanek_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Clanek" ADD CONSTRAINT "Clanek_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
