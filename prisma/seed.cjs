/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  /*const user = await prisma.user.create({
    data: {
      email: "sirotek.j@gmail.com",
      name: "Kuba",
    },
  });*/
  /*await prisma.postava.create({
    data: {
      name: "Bered",
      race: "trpaslík",
      profession: "válečník",
      content: "Bered z Ornu.",
    },
  });*/
}

main()
  .then(() => {
    console.log('Seed hotový ✅');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
