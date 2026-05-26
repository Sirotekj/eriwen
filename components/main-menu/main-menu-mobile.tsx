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
        onClick={closeMenu}
        className={`fixed top-0 right-0 h-full w-64 bg-background z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end">
          <button className="p-4 cursor-pointer" onClick={closeMenu}>
            ✕
          </button>
        </div>

        <ul className="flex flex-col gap-2 p-4 text-lg">
          <li>
            <NavLinkMobile href="/">Úvod</NavLinkMobile>
          </li>
          <li>
            <NavLinkMobile href="/svet">Svět</NavLinkMobile>
            <ul className="flex flex-col gap-2 ml-4 text-base list-disc">
              <li className="ml-1">
                <NavLinkMobile href="/svet/kraje-a-mista">
                  Kraje a místa
                </NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/mapy">Mapy</NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/letopisy">Letopisy</NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/nabozenstvi">
                  Náboženství
                </NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/spojenci">Spojenci</NavLinkMobile>
              </li>
              <li className="ml-1">
                <NavLinkMobile href="/svet/nepratele">Nepřátelé</NavLinkMobile>
              </li>
            </ul>
          </li>
          <li>
            <NavLinkMobile href="/postavy">Postavy</NavLinkMobile>
          </li>
          <li>
            <NavLinkMobile href="/tazeni">Tažení</NavLinkMobile>
          </li>
          <li>
            <NavLinkMobile href="/bestiar">Pravidla</NavLinkMobile>
            <ul className="ml-4 text-base list-disc">
              <li className="ml-1">
                <NavLinkMobile href="/pravidla/bestiar">Bestiář</NavLinkMobile>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};
export default MainMenuMobile;
