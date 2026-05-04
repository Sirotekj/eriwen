/*
  Warnings:

  - You are about to drop the column `campaign` on the `Postava` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Postava` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Postava` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `Postava` table. All the data in the column will be lost.
  - You are about to drop the column `race` on the `Postava` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Tazeni` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tazeni` table. All the data in the column will be lost.
  - You are about to drop the column `pj` on the `Tazeni` table. All the data in the column will be lost.
  - You are about to drop the column `postavy` on the `Tazeni` table. All the data in the column will be lost.
  - Added the required column `hrac` to the `Postava` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jmeno` to the `Postava` table without a default value. This is not possible if the table is not empty.
  - Added the required column `povolani` to the `Postava` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rasa` to the `Postava` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hraci` to the `Tazeni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jmeno` to the `Tazeni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pribeh` to the `Tazeni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vypravec` to the `Tazeni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Postava" DROP COLUMN "campaign",
DROP COLUMN "content",
DROP COLUMN "name",
DROP COLUMN "profession",
DROP COLUMN "race",
ADD COLUMN     "hrac" TEXT NOT NULL,
ADD COLUMN     "jmeno" TEXT NOT NULL,
ADD COLUMN     "popis" TEXT,
ADD COLUMN     "povolani" TEXT NOT NULL,
ADD COLUMN     "rasa" TEXT NOT NULL,
ADD COLUMN     "tazeni" TEXT;

-- AlterTable
ALTER TABLE "Tazeni" DROP COLUMN "content",
DROP COLUMN "name",
DROP COLUMN "pj",
DROP COLUMN "postavy",
ADD COLUMN     "hraci" TEXT NOT NULL,
ADD COLUMN     "jmeno" TEXT NOT NULL,
ADD COLUMN     "pribeh" TEXT NOT NULL,
ADD COLUMN     "vypravec" TEXT NOT NULL;
