import { Lokalita } from '@prisma/client';

export type LokalitaTree = Lokalita & {
  children: LokalitaTree[];
};

export function buildTree(data: Lokalita[]): LokalitaTree[] {
  const map = new Map<string, LokalitaTree>();

  // vytvoříme mapu
  data.forEach((item) => {
    map.set(item.id, {
      ...item,
      children: [],
    });
  });

  const tree: LokalitaTree[] = [];

  // napojení parent → children
  data.forEach((item) => {
    const node = map.get(item.id)!;

    if (item.parentId) {
      const parent = map.get(item.parentId);
      parent?.children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}

export function getHierarchy(lokality: Lokalita[], current?: Lokalita | null) {
  if (!current) {
    return {
      svetId: undefined,
      kralovstviId: undefined,
      krajId: undefined,
    };
  }

  let svetId: string | undefined;
  let kralovstviId: string | undefined;
  let krajId: string | undefined;

  const map = new Map(lokality.map((l) => [l.id, l]));

  let node: Lokalita | undefined = current;

  while (node?.parentId) {
    const parent = map.get(node.parentId);

    if (!parent) break;

    if (parent.uroven === 'SVET') {
      svetId = parent.id;
    }

    if (parent.uroven === 'KRALOVSTVI') {
      kralovstviId = parent.id;
    }

    if (parent.uroven === 'KRAJ') {
      krajId = parent.id;
    }

    node = parent;
  }

  return {
    svetId,
    kralovstviId,
    krajId,
  };
}
