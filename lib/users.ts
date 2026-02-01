import { prisma } from "./db";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function getUsers() {
  return prisma.user.findMany();
}
