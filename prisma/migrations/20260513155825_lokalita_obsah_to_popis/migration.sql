/*
  Warnings:

  - You are about to drop the column `obsah` on the `Lokalita` table. All the data in the column will be lost.
  - You are about to drop the column `obsah` on the `Mapa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lokalita" DROP COLUMN "obsah",
ADD COLUMN     "popis" TEXT;

-- AlterTable
ALTER TABLE "Mapa" DROP COLUMN "obsah",
ADD COLUMN     "popis" TEXT;
