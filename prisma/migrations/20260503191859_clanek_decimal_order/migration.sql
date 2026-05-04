/*
  Warnings:

  - You are about to alter the column `order` on the `Clanek` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,5)`.

*/
-- AlterTable
ALTER TABLE "Clanek" ALTER COLUMN "order" DROP DEFAULT,
ALTER COLUMN "order" SET DATA TYPE DECIMAL(10,5);
