/*
  Warnings:

  - You are about to drop the `Kraje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mapy` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "LokalitaUroven" AS ENUM ('SVET', 'KRALOVSTVI', 'KRAJ', 'MISTO');

-- DropForeignKey
ALTER TABLE "Kraje" DROP CONSTRAINT "Kraje_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Mapy" DROP CONSTRAINT "Mapy_authorId_fkey";

-- DropTable
DROP TABLE "Kraje";

-- DropTable
DROP TABLE "Mapy";

-- DropEnum
DROP TYPE "KrajeUroven";

-- CreateTable
CREATE TABLE "Lokalita" (
    "id" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "obsah" TEXT NOT NULL,
    "image" TEXT,
    "parentId" TEXT,
    "uroven" "LokalitaUroven" NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lokalita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapa" (
    "id" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "obsah" TEXT NOT NULL,
    "image" TEXT,
    "parentId" TEXT,
    "uroven" "LokalitaUroven" NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mapa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lokalita" ADD CONSTRAINT "Lokalita_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Lokalita"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lokalita" ADD CONSTRAINT "Lokalita_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapa" ADD CONSTRAINT "Mapa_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Mapa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapa" ADD CONSTRAINT "Mapa_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
