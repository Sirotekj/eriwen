/*
  Warnings:

  - Added the required column `obdobi` to the `Tazeni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pj` to the `Tazeni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postavy` to the `Tazeni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tazeni" ADD COLUMN     "obdobi" TEXT NOT NULL,
ADD COLUMN     "pj" TEXT NOT NULL,
ADD COLUMN     "postavy" TEXT NOT NULL;
