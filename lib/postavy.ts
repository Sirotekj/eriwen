import { prisma } from "./db";

export async function getPostavy() {
  return prisma.postava.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
