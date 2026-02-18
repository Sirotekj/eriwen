'use client';

import { useEffect, useRef, useState } from 'react';
import './rain.css';

export default function Rain() {
  const rainRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnabled((prev) => !prev);
    }, 45_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = rainRef.current;
    if (!container) return;

    if (!enabled) {
      const timeout = setTimeout(() => {
        container.innerHTML = '';
      }, 4000);

      return () => clearTimeout(timeout);
    }

    container.innerHTML = '';
    createRain(container);
  }, [enabled]);

  return (
    <div
      ref={rainRef}
      className={`rain fixed inset-0 pointer-events-none overflow-hidden z-50 transition-opacity duration-4000 ${enabled ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

function createRain(container: HTMLDivElement) {
  const amount = 400;

  for (let i = 0; i < amount; i++) {
    const drop = document.createElement('i');

    const size = Math.random() * 1;
    const posX = Math.floor(Math.random() * window.innerWidth);
    const delay = Math.random() * -20;
    const duration = Math.random() * 1;

    drop.style.width = `${0.1 + size}px`;
    drop.style.left = `${posX}px`;
    drop.style.animationDelay = `${delay}s`;
    drop.style.animationDuration = `${1 + duration}s`;

    container.appendChild(drop);
  }
}
