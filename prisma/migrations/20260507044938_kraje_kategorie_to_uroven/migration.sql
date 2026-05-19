/*
  Warnings:

  - You are about to drop the column `kategorie` on the `Kraje` table. All the data in the column will be lost.
  - You are about to drop the column `kategorie` on the `Mapy` table. All the data in the column will be lost.
  - Added the required column `uroven` to the `Kraje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uroven` to the `Mapy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kraje" DROP COLUMN "kategorie",
ADD COLUMN     "uroven" "KrajeUroven" NOT NULL;

-- AlterTable
ALTER TABLE "Mapy" DROP COLUMN "kategorie",
ADD COLUMN     "uroven" "KrajeUroven" NOT NULL;
