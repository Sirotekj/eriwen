'use client';

import { useState } from 'react';
import Link from 'next/link';

import { IconMenuMobile } from '@/components/utils/svgs/icons';

const MainMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        title="Menu"
        className="flex mt-1 ml-1 mr-2 w-8 h-8 cursor-pointer md:hidden"
        onClick={toggleMenu}
      >
        <IconMenuMobile className="w-full h-full" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMenu} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-background z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button className="p-4 cursor-pointer" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-4 text-lg">
          <li>
            <Link href="/" onClick={closeMenu}>
              Úvod
            </Link>
          </li>
          <li>
            <Link href="/svet" onClick={closeMenu}>
              Svět
            </Link>
            <ul className="ml-4 text-base list-disc">
              <li className="ml-1">
                <Link href="/svet/kraje-a-mista">Kraje a místa</Link>
              </li>
              <li className="ml-1">
                <Link href="/svet/nabozenstvi">Náboženství</Link>
              </li>
              <li className="ml-1">
                <Link href="/svet/spojenci">Spojenci</Link>
              </li>
              <li className="ml-1">
                <Link href="/svet/nepratele">Nepřátelé</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/postavy" onClick={closeMenu}>
              Postavy
            </Link>
          </li>
          <li>
            <Link href="/tazeni" onClick={closeMenu}>
              Tažení
            </Link>
          </li>
          <li>
            <Link href="/bestiar" onClick={closeMenu}>
              Bestiář
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
export default MainMenuMobile;
