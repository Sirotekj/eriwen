-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tazeni" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "text" TEXT,

    CONSTRAINT "Tazeni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postava" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "race" TEXT,
    "profession" TEXT,
    "campaign" TEXT,
    "text" TEXT,

    CONSTRAINT "Postava_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
