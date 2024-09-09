'use client';

// Packages
import Link from 'next/link';
import Image from 'next/image';

// Components
import { Button } from '@/components/ui/button';

import { Search } from '@/components/search';
import { Separator } from '@/components/ui/separator';

export function Home() {
  return (
    <div className='flex flex-col gap-8 px-4'>
      <div className='flex flex-col justify-center items-center gap-6 max-w-sm h-full mx-auto'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <Image src='/img/logo.png' width={115} height={30} alt='Zapcito logo' priority />
          <p className='text-lg'>A starter kit for building Nostr clients with Lightning payments.</p>
        </div>
      </div>

      <div className='w-full max-w-xl mx-auto'>
        <Search />
      </div>

      <div className='flex gap-4 items-center'>
        <Separator className='flex-1' />
        <p className='text-sm text-muted-foreground'>OR</p>
        <Separator className='flex-1' />
      </div>

      <div className='flex flex-col justify-center w-full mx-auto'>
        <Button variant='link' asChild>
          <Link href='/login'>Get started</Link>
        </Button>
      </div>
    </div>
  );
}
