'use client';
import { Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { permissions } from '@/lib/permissions';

import { IconFeather } from '@/components/utils/svgs/icons';
import HoverWrapper from '@/components/utils/hover-wrapper';

export function EditIconInner() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!session) return null;
  console.log(session?.user?.role);

  const role = session?.user?.role;
  const canCreate = permissions.canCreate({ role });

  if (!canCreate) return null;

  const isEditMode = searchParams.get('edit') === '1';
  const href = isEditMode ? pathname : `${pathname}?edit=1`;

  return (
    <HoverWrapper tooltip="Upravit stránky">
      <Link href={href} className="block ml-2 w-10 h-10 cursor-pointer">
        <IconFeather className="w-full h-full p-2" />
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
