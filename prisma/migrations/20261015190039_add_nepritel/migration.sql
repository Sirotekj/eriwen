-- CreateTable
CREATE TABLE "Nepritel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "health" INTEGER,
    "mana" INTEGER,
    "favor" INTEGER,
    "adrenaline" INTEGER,
    "level" INTEGER,
    "divinePower" INTEGER,
    "challengeRating" TEXT,
    "strength" INTEGER,
    "dexterity" INTEGER,
    "constitution" INTEGER,
    "intelligence" INTEGER,
    "charisma" INTEGER,
    "movement" INTEGER,
    "size" TEXT,
    "attackValue" INTEGER,
    "damageValue" INTEGER,
    "baseDefense" INTEGER,
    "defenseValue" INTEGER,
    "specialAbilities" TEXT,
    "resistances" TEXT,
    "immunities" TEXT,
    "weaknesses" TEXT,
    "skills" TEXT,
    "habitat" TEXT,
    "type" TEXT,
    "experiencePoints" INTEGER,
    "notes" TEXT,
    "description" TEXT,
    "image" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "season" TEXT,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nepritel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Nepritel" ADD CONSTRAINT "Nepritel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
