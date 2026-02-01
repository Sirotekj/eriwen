/*
  Warnings:

  - You are about to drop the column `text` on the `Postava` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Tazeni` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Postava" DROP COLUMN "text",
ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "Tazeni" DROP COLUMN "text",
ADD COLUMN     "content" TEXT;
