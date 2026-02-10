/*
  Warnings:

  - Added the required column `authorId` to the `Postava` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Postava` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Tazeni` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tazeni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Postava" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tazeni" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Postava_authorId_idx" ON "Postava"("authorId");

-- CreateIndex
CREATE INDEX "Postava_order_idx" ON "Postava"("order");

-- CreateIndex
CREATE INDEX "Tazeni_authorId_idx" ON "Tazeni"("authorId");

-- CreateIndex
CREATE INDEX "Tazeni_order_idx" ON "Tazeni"("order");

-- AddForeignKey
ALTER TABLE "Tazeni" ADD CONSTRAINT "Tazeni_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postava" ADD CONSTRAINT "Postava_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
