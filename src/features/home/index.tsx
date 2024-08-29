'use client';

// Packages
import Link from 'next/link';
import Image from 'next/image';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

// Components
import { Button } from '@/components/ui/button';

import { Search } from './components/seach';

export function Home() {
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-6 max-w-sm h-full mx-auto px-4'>
        <Image src='/img/cloud.png' alt='Cloud icon by Yassine Design' width={200} height={200} />
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-2xl font-bold'>Zapcito</h1>
          <p className='text-xl'>A starter kit for building Nostr clients with Lightning payments.</p>
        </div>
      </div>

      {/* <div className='w-full max-w-xl mx-auto my-4 px-4'>
        <Search />
      </div> */}

      <div className='flex justify-center max-w-sm h-full mx-auto px-4'>
        <Button variant='ghost' asChild>
          <Link href='https://github.com/unllamas/zapcito' target='_blank' rel='noreferrer'>
            <GitHubLogoIcon />
            <p className='ml-2'>GitHub</p>
          </Link>
        </Button>
      </div>
    </>
  );
}
