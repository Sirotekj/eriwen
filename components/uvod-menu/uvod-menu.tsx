'use client';

import './styles.css';
import { useEffect, useRef } from 'react';

import NavLink from './nav-link';
import Kompas from './uvod-kompas';

const UvodMenu = () => {
  const arrowRef = useRef<SVGSVGElement>(null);
  const currentAngle = useRef(0);

  const items = [
    { href: '/svet', label: 'Svět' },
    { href: '/svet/kraje-a-mista', label: 'Kraje a místa' },
    { href: '/svet/mapy', label: 'Mapy' },
    { href: '/svet/nabozenstvi', label: 'Náboženství' },
    { href: '/svet/spojenci', label: 'Spojenci' },
    { href: '/svet/nepratele', label: 'Nepřátelé' },
    { href: '/postavy', label: 'Postavy' },
    { href: '/tazeni', label: 'Tažení' },
    { href: '/pravidla', label: 'Pravidla' },
    { href: '/pravidla/bestiar', label: 'Bestiář' },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!arrowRef.current) return;

      const rect = arrowRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const targetAngle =
        Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

      let diff = targetAngle - currentAngle.current;

      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      currentAngle.current += diff * 0.1;

      arrowRef.current.style.transform = `translate(-50%, -50%) rotate(${currentAngle.current}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <div className="relative mt-20 h-[60vh] min-h-126 w-full overflow-hidden">
      <Kompas />
      <nav className="absolute left-1/2 top-1/2 h-[48vw] w-[56vw] max-h-[48vh] max-w-[56vh] -translate-x-1/2 -translate-y-1/2">
        <svg
          ref={arrowRef}
          viewBox="0 0 440 22"
          className="absolute hidden md:block left-1/2 top-1/2 w-82 text-light transition-transform duration-50"
          fill="currentColor"
        >
          <path d="M440,11l-44,10.284l0,-20.568l44,10.284Z" />
        </svg>

        <ul className="absolute -left-1/2 menu-circle h-full w-full text-light font-greatVibes">
          {items.map((item, index) => {
            const angle = (360 / items.length) * index - 90;
            const angleMobile = (100 / items.length) * index - 45;
            const style = {
              '--angle': `${angle}deg`,
              '--angle-mobile': `${angleMobile}deg`,
            } as React.CSSProperties;
            return (
              <li
                key={item.href}
                className="menu-circle-item w-38"
                style={style}
              >
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            );
          })}
          {/*<li className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
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
          </li>*/}
        </ul>
      </nav>
    </div>
  );
};
export default UvodMenu;
