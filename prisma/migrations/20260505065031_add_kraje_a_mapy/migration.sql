-- CreateEnum
CREATE TYPE "KategorieKrajeUroven" AS ENUM ('SVET', 'KRALOVSTVI', 'KRAJ', 'MISTO');

-- CreateTable
CREATE TABLE "Kraje" (
    "id" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "obsah" TEXT NOT NULL,
    "image" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kraje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapy" (
    "id" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "obsah" TEXT NOT NULL,
    "image" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mapy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KategorieKraje" (
    "id" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "parentId" TEXT,
    "uroven" "KategorieKrajeUroven" NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KategorieKraje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KrajeKategorie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_KrajeKategorie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MapyKategorie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MapyKategorie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_KrajeKategorie_B_index" ON "_KrajeKategorie"("B");

-- CreateIndex
CREATE INDEX "_MapyKategorie_B_index" ON "_MapyKategorie"("B");

-- AddForeignKey
ALTER TABLE "Kraje" ADD CONSTRAINT "Kraje_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapy" ADD CONSTRAINT "Mapy_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KategorieKraje" ADD CONSTRAINT "KategorieKraje_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "KategorieKraje"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KategorieKraje" ADD CONSTRAINT "KategorieKraje_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KrajeKategorie" ADD CONSTRAINT "_KrajeKategorie_A_fkey" FOREIGN KEY ("A") REFERENCES "KategorieKraje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KrajeKategorie" ADD CONSTRAINT "_KrajeKategorie_B_fkey" FOREIGN KEY ("B") REFERENCES "Kraje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MapyKategorie" ADD CONSTRAINT "_MapyKategorie_A_fkey" FOREIGN KEY ("A") REFERENCES "KategorieKraje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MapyKategorie" ADD CONSTRAINT "_MapyKategorie_B_fkey" FOREIGN KEY ("B") REFERENCES "Mapy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
