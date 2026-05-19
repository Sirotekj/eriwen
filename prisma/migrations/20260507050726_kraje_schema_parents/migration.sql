-- AlterTable
ALTER TABLE "Kraje" ADD COLUMN     "parentKkraj" TEXT,
ADD COLUMN     "parentKralovstvi" TEXT,
ADD COLUMN     "parentSvet" TEXT;

-- AlterTable
ALTER TABLE "Mapy" ADD COLUMN     "parentKkraj" TEXT,
ADD COLUMN     "parentKralovstvi" TEXT,
ADD COLUMN     "parentSvet" TEXT;
