import { getServerSession } from 'next-auth';
import { Role } from '@prisma/client';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadImage } from '@/lib/upload-image';

export const enemySelect = {
  id: true,
  name: true,
  health: true,
  mana: true,
  favor: true,
  adrenaline: true,
  level: true,
  divinePower: true,
  challengeRating: true,
  strength: true,
  dexterity: true,
  constitution: true,
  intelligence: true,
  charisma: true,
  movement: true,
  size: true,
  attackValue: true,
  damageValue: true,
  baseDefense: true,
  defenseValue: true,
  specialAbilities: true,
  resistances: true,
  immunities: true,
  weaknesses: true,
  skills: true,
  habitat: true,
  type: true,
  experiencePoints: true,
  notes: true,
  description: true,
  image: true,
  imageMultiply: true,
  isPublic: true,
  authorId: true,
} as const;

export type AuthUser = {
  id: string;
  role: Role;
};

export async function getAuthUser(
  request: Request,
): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);
  if (session?.user != null) {
    return {
      id: session.user.id,
      role: session.user.role ?? Role.READER,
    };
  }

  const header = request.headers.get('authorization');
  const sessionToken = header?.startsWith('Bearer ')
    ? header.slice(7)
    : null;
  if (sessionToken === null || sessionToken.length === 0) {
    return null;
  }

  const dbSession = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });
  if (dbSession === null || dbSession.expires < new Date()) {
    return null;
  }

  return { id: dbSession.user.id, role: dbSession.user.role };
}

function toOptionalString(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text.length > 0 ? text : null;
}

function toOptionalNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function toBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (value === 'true' || value === 'on' || value === 1 || value === '1') {
    return true;
  }
  if (value === 'false' || value === 0 || value === '0') return false;
  return fallback;
}

export type EnemyPayload = {
  name: string;
  health: number | null;
  mana: number | null;
  favor: number | null;
  adrenaline: number | null;
  level: number | null;
  divinePower: number | null;
  challengeRating: string | null;
  strength: number | null;
  dexterity: number | null;
  constitution: number | null;
  intelligence: number | null;
  charisma: number | null;
  movement: number | null;
  size: string | null;
  attackValue: number | null;
  damageValue: number | null;
  baseDefense: number | null;
  defenseValue: number | null;
  specialAbilities: string | null;
  resistances: string | null;
  immunities: string | null;
  weaknesses: string | null;
  skills: string | null;
  habitat: string | null;
  type: string | null;
  experiencePoints: number | null;
  notes: string | null;
  description: string | null;
  image: string | null;
  imageMultiply: boolean;
  isPublic: boolean;
};

export function parseEnemyPayload(
  body: unknown,
): { data?: EnemyPayload; error?: string } {
  if (body === null || typeof body !== 'object') {
    return { error: 'Neplatné tělo požadavku.' };
  }

  const input = body as Record<string, unknown>;
  const name = toOptionalString(input.name);

  if (!name) {
    return { error: 'Chybí povinné pole: name.' };
  }

  return {
    data: {
      name,
      health: toOptionalNumber(input.health),
      mana: toOptionalNumber(input.mana),
      favor: toOptionalNumber(input.favor),
      adrenaline: toOptionalNumber(input.adrenaline),
      level: toOptionalNumber(input.level),
      divinePower: toOptionalNumber(input.divinePower),
      challengeRating: toOptionalString(input.challengeRating),
      strength: toOptionalNumber(input.strength),
      dexterity: toOptionalNumber(input.dexterity),
      constitution: toOptionalNumber(input.constitution),
      intelligence: toOptionalNumber(input.intelligence),
      charisma: toOptionalNumber(input.charisma),
      movement: toOptionalNumber(input.movement),
      size: toOptionalString(input.size),
      attackValue: toOptionalNumber(input.attackValue),
      damageValue: toOptionalNumber(input.damageValue),
      baseDefense: toOptionalNumber(input.baseDefense),
      defenseValue: toOptionalNumber(input.defenseValue),
      specialAbilities: toOptionalString(input.specialAbilities),
      resistances: toOptionalString(input.resistances),
      immunities: toOptionalString(input.immunities),
      weaknesses: toOptionalString(input.weaknesses),
      skills: toOptionalString(input.skills),
      habitat: toOptionalString(input.habitat),
      type: toOptionalString(input.type),
      experiencePoints: toOptionalNumber(input.experiencePoints),
      notes: toOptionalString(input.notes),
      description: toOptionalString(input.description),
      image: toOptionalString(input.image),
      imageMultiply: toBoolean(input.imageMultiply, false),
      isPublic: toBoolean(input.isPublic, false),
    },
  };
}

function formDataToObject(formData: FormData): Record<string, unknown> {
  const input: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) continue;
    input[key] = value;
  }
  return input;
}

export async function parseEnemyRequest(request: Request): Promise<{
  data?: EnemyPayload;
  error?: string;
}> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return { error: 'Neplatné FormData tělo požadavku.' };
    }

    const parsed = parseEnemyPayload(formDataToObject(formData));
    if (parsed.error || !parsed.data) {
      return parsed;
    }

    const imageFile = formData.get('image');
    const existingImage = toOptionalString(formData.get('existingImage'));
    let imageUrl = existingImage;

    if (imageFile instanceof File && imageFile.size > 0) {
      imageUrl = await uploadImage({
        image: imageFile,
        fileName: 'nepritel',
        order: Date.now().toString(),
        url: '/pravidla/bestiar',
      });
    }

    return {
      data: {
        ...parsed.data,
        image: imageUrl,
      },
    };
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return { error: 'Neplatné JSON tělo požadavku.' };
  }

  return parseEnemyPayload(body);
}
