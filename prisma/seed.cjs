/* eslint-disable */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "test@test.cz",
      name: "Test User",
    },
  });

  await prisma.postava.create({
    data: {
      name: "Bered",
      race: "trpaslík",
      profession: "válečník",
      content: "Bered z Ornu.",
    },
  });
}

main()
  .then(() => {
    console.log("Seed hotový ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
