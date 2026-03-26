'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavLinkMobile = ({ href, children }: Props) => {
  const path = usePathname();
  const isActive = href === '/' ? path === '/' : path.startsWith(href);
  return (
    <Link
      className={`items-center py-2 uppercase hover:font-bold ${isActive ? 'font-bold' : undefined}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLinkMobile;
