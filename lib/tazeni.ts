import { prisma } from "./db";

export async function getTazeni() {
  return prisma.tazeni.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
