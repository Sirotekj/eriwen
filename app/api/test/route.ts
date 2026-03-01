export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.postava.findMany();
  return Response.json(data);
}
