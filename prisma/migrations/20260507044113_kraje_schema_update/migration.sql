/*
  Warnings:

  - You are about to drop the `KategorieKraje` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_KrajeKategorie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MapyKategorie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kategorie` to the `Kraje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategorie` to the `Mapy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KrajeUroven" AS ENUM ('SVET', 'KRALOVSTVI', 'KRAJ', 'MISTO');

-- DropForeignKey
ALTER TABLE "KategorieKraje" DROP CONSTRAINT "KategorieKraje_authorId_fkey";

-- DropForeignKey
ALTER TABLE "KategorieKraje" DROP CONSTRAINT "KategorieKraje_parentId_fkey";

-- DropForeignKey
ALTER TABLE "_KrajeKategorie" DROP CONSTRAINT "_KrajeKategorie_A_fkey";

-- DropForeignKey
ALTER TABLE "_KrajeKategorie" DROP CONSTRAINT "_KrajeKategorie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MapyKategorie" DROP CONSTRAINT "_MapyKategorie_A_fkey";

-- DropForeignKey
ALTER TABLE "_MapyKategorie" DROP CONSTRAINT "_MapyKategorie_B_fkey";

-- AlterTable
ALTER TABLE "Kraje" ADD COLUMN     "kategorie" "KrajeUroven" NOT NULL;

-- AlterTable
ALTER TABLE "Mapy" ADD COLUMN     "kategorie" "KrajeUroven" NOT NULL;

-- DropTable
DROP TABLE "KategorieKraje";

-- DropTable
DROP TABLE "_KrajeKategorie";

-- DropTable
DROP TABLE "_MapyKategorie";

-- DropEnum
DROP TYPE "KategorieKrajeUroven";
