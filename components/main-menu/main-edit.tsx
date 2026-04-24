'use client';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { permissions } from '@/lib/permissions';

import { IconEdit } from '@/components/utils/svgs/icons';
import HoverWrapper from '@/components/utils/hover-wrapper';

export function EditIconInner() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  const role = session?.user?.role;
  const canCreate = permissions.canCreate({ role });

  if (!canCreate) return null;

  const isEditMode = pathname.endsWith('/edit');

  const href = isEditMode
    ? pathname.replace('/edit', '') // zpět na detail
    : `${pathname}/edit`; // do editu

  return (
    <HoverWrapper tooltip="Upravit stránky">
      <Link href={href} className="block ml-2 w-10 h-10 cursor-pointer">
        <IconEdit className="w-full h-full p-2" />
      </Link>
    </HoverWrapper>
  );
}
export default function EditIcon() {
  return (
    <Suspense fallback={null}>
      <EditIconInner />
    </Suspense>
  );
}
