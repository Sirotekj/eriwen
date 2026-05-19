'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Rain from './rain';
//import Snow from './snow';
export default function Background() {
  const [isNight, setIsNight] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight((prev) => !prev);
    }, 120_000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed w-screen h-screen top-0 left-0 z-[-1]">
      <Image
        width="1536"
        height="1024"
        src="/images/mountains_c.webp"
        alt="background"
        priority
        className="absolute object-cover max-w-none w-full h-full object-center"
      />
      <Image
        width="1536"
        height="1024"
        src="/images/mountains-night_c.webp"
        alt="background"
        priority
        className={`absolute object-cover max-w-none w-full h-full object-center transition-opacity duration-2000 ${isNight ? 'opacity-100' : 'opacity-0'}`}
      />
      <Rain />
      {/*<Snow />*/}
    </div>
  );
}
