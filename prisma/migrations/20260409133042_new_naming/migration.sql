/*
  Warnings:

  - You are about to drop the column `hraci` on the `Tazeni` table. All the data in the column will be lost.
  - Added the required column `postavy` to the `Tazeni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tazeni" DROP COLUMN "hraci",
ADD COLUMN     "postavy" TEXT NOT NULL;
