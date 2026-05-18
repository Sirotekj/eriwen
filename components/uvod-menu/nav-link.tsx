'use client';

import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavLink = ({ href, children }: Props) => {
  return (
    <div className="relative w-full p-1 bg-background">
      <Link
        className="block text-2xl px-4 pt-2 pb-1 color-yellow text-center border hover:font-bold"
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
