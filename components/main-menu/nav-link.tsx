'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavLink = ({ href, children }: Props) => {
  const path = usePathname();
  const isActive = href === '/' ? path === '/' : path.startsWith(href);
  return (
    <Link
      className={`flex items-center px-8 py-2 text-center uppercase hover:font-bold ${isActive ? 'font-bold' : undefined}`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
