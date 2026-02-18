'use client';

import { useEffect, useRef, useState } from 'react';
import './snow.css';

type Flake = {
  el: HTMLElement;
  x: number;
  y: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
};

export default function Snow() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const flakesRef = useRef<Flake[]>([]);
  const rafRef = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(true);

  function animate() {
    let last = performance.now();

    const frame = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;

      for (const f of flakesRef.current) {
        f.y += f.speed * delta;
        const x = f.x + Math.sin(f.y * f.frequency + f.phase) * f.amplitude;
        f.el.style.transform = `translate3d(${x}px, ${f.y}px, 0)`;
        if (f.y > window.innerHeight + 50) {
          f.y = -50;
        }
      }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
  }

  function startSnow(container: HTMLDivElement) {
    container.innerHTML = '';
    flakesRef.current = createFlakes(container, 250);
    animate();
  }

  function stopSnow() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    flakesRef.current = [];
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEnabled((prev) => !prev);
    }, 25_000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!enabled) {
      const timeout = setTimeout(() => {
        stopSnow();
      }, 4000);
      return () => clearTimeout(timeout);
    }

    startSnow(container);

    return () => stopSnow();
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      className={`snow fixed inset-0 z-50 pointer-events-none
        transition-opacity duration-4000
        ${enabled ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

function createFlakes(container: HTMLElement, count: number): Flake[] {
  const flakes: Flake[] = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('i');

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 10 + 4;

    el.style.left = '0px';
    el.style.top = '0px';

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;

    container.appendChild(el);

    flakes.push({
      el,
      x,
      y,
      speed: 60 + Math.random() * 40, // pomalý pád
      amplitude: 10 + Math.random() * 20, // šířka sinusoidy
      frequency: 0.02 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
    });
  }

  return flakes;
}
