-- AlterTable
ALTER TABLE "Clanek" ADD COLUMN     "imageMultiply" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Lokalita" ADD COLUMN     "imageMultiply" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Mapa" ADD COLUMN     "imageMultiply" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Postava" ADD COLUMN     "imageMultiply" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tazeni" ADD COLUMN     "imageMultiply" BOOLEAN NOT NULL DEFAULT false;
