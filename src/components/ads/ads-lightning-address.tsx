'use client';

import { useEffect, useState } from 'react';

const names = ['name', 'satoshi', 'jona'];

function LightningAddressAnimation() {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex items-center justify-center'>
      <div className='relative overflow-hidden flex gap-1 h-8 text-xl font-extrabold'>
        <div
          className='transition-transform duration-400 ease-in-out text-end'
          style={{
            transform: `translateY(-${currentNameIndex * 100}%)`,
          }}
        >
          {names.map((name, index) => (
            <div key={index} className='h-8 font-normal'>
              {name}
            </div>
          ))}
        </div>
        <span>@zapcito.app</span>
      </div>
    </div>
  );
}

export const AdsLightningAddress = () => {
  return (
    <div className='flex flex-col gap-1 mt-4'>
      <p className='text-sm text-muted-foreground'>ADS</p>
      <div className='flex flex-col items-center gap-4 px-8 py-12 rounded-3xl bg-gradient-to-t from-[#F156AE] to-[#F9B4DB]'>
        <p className='text-center text-md'>Be one of the first to get a personalized identity.</p>
        <LightningAddressAnimation />
      </div>
    </div>
  );
};
