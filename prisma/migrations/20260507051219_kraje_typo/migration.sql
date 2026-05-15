/*
  Warnings:

  - You are about to drop the column `parentKkraj` on the `Kraje` table. All the data in the column will be lost.
  - You are about to drop the column `parentKkraj` on the `Mapy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kraje" DROP COLUMN "parentKkraj",
ADD COLUMN     "parentkraj" TEXT;

-- AlterTable
ALTER TABLE "Mapy" DROP COLUMN "parentKkraj",
ADD COLUMN     "parentkraj" TEXT;
