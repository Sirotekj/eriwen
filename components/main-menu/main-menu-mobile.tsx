'use client';

import { useState } from 'react';

import NavLinkMobile from './nav-link-mobile';
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

        <ul className="flex flex-col p-4 text-lg">
          <li>
            <NavLinkMobile href="/" onClick={closeMenu}>
              Úvod
            </NavLinkMobile>
          </li>
          <li>
            <NavLinkMobile href="/svet" onClick={closeMenu}>
              Svět
            </NavLinkMobile>
            <ul className="ml-4 text-base list-disc">
              <li className="ml-1">
                <NavLinkMobile href="/svet/kraje-a-mista" onClick={closeMenu}>
                  Kraje a místa
                </NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/mapy" onClick={closeMenu}>
                  Mapy
                </NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/nabozenstvi" onClick={closeMenu}>
                  Náboženství
                </NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/spojenci" onClick={closeMenu}>
                  Spojenci
                </NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/nepratele" onClick={closeMenu}>
                  Nepřátelé
                </NavLinkMobile>
              </li>
            </ul>
          </li>
          <li>
            <NavLinkMobile href="/postavy" onClick={closeMenu}>
              Postavy
            </NavLinkMobile>
          </li>
          <li>
            <NavLinkMobile href="/tazeni" onClick={closeMenu}>
              Tažení
            </NavLinkMobile>
          </li>
          <li>
            <NavLinkMobile href="/bestiar" onClick={closeMenu}>
              Pravidla
            </NavLinkMobile>
            <ul className="ml-4 text-base list-disc">
              <li className="ml-1">
                <NavLinkMobile href="/pravidla/bestiar" onClick={closeMenu}>
                  Bestiář
                </NavLinkMobile>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};
export default MainMenuMobile;
