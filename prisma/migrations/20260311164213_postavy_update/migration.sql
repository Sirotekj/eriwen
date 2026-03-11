/*
  Warnings:

  - Made the column `name` on table `Postava` required. This step will fail if there are existing NULL values in that column.
  - Made the column `race` on table `Postava` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profession` on table `Postava` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Postava" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "race" SET NOT NULL,
ALTER COLUMN "profession" SET NOT NULL;
