'use client';

// Packages
import Link from 'next/link';
import Image from 'next/image';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

// Libs and hooks
import { useProfile } from '@/hooks/use-profile';

// Components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Zap } from '../zap';

import { DEFAULT_PUBKEY } from '@/config/constants';

export function Home() {
  const { profile } = useProfile({ pubkey: DEFAULT_PUBKEY });

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-6 max-w-sm h-full mx-auto px-4'>
        <Image src='/img/layer.png' alt='Layer icon by Yassine Design' width={200} height={200} />
        <h1 className='text-2xl font-bold'>Next-Nostr-Starter-Kit</h1>

        <div className='flex flex-col gap-2 w-full'>
          {profile ? (
            <div className='flex items-center gap-2 p-4 bg-card rounded-lg'>
              <Avatar>
                <AvatarImage src={profile?.avatar} />
                <AvatarFallback>{profile?.name?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0'>
                <h3 className='font-bold text-md'>Send SATs to {profile?.name}</h3>
                <p className='font-sm text-muted-foreground'>{profile?.address}</p>
              </div>
            </div>
          ) : (
            <Skeleton className='w-full h-[80px] bg-card' />
          )}
          <div className='flex gap-2'>
            <Button className='flex-1' asChild variant='secondary'>
              <Link href='https://github.com/unllamas/next-nostr-starter-kit' target='_blank' rel='noreferrer'>
                <GitHubLogoIcon />
                <p className='ml-2'>GitHub</p>
              </Link>
            </Button>

            <Zap pubkey={DEFAULT_PUBKEY} />
          </div>
        </div>
      </div>
    </>
  );
}
