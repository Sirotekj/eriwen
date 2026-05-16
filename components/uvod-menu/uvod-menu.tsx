'use client';

import { useEffect, useRef } from 'react';

import NavLink from './nav-link';
import Kompas from './uvod-kompas';

const UvodMenu = () => {
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!arrowRef.current) return;

      const rect = arrowRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

      arrowRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div className="relative mt-20 h-[56vh] w-full overflow-hidden">
      <nav className="absolute left-1/2 top-1/2 h-[48vw] w-[56vw] max-h-[48vh] max-w-[56vh] -translate-x-1/2 -translate-y-1/2">
        <svg
          ref={arrowRef}
          viewBox="0 0 100 20"
          className="absolute left-1/2 top-1/2 w-32 text-brown transition-transform duration-75"
          fill="currentColor"
        >
          <path d="M0 8h70V0l30 10-30 10v-8H0z" />
        </svg>
        <Kompas />

        <ul className="absolute h-full w-full text-light font-greatVibes">
          <li className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <NavLink href="/svet">Svět</NavLink>
          </li>

          <li className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
            <NavLink href="/postavy">Postavy</NavLink>
          </li>

          <li className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
            <NavLink href="/tazeni">Tažení</NavLink>
          </li>

          <li className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <NavLink href="/pravidla">Pravidla</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default UvodMenu;
