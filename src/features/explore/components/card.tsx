import Link from 'next/link';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card as AtomicCard } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LightningAddress } from '@/components/profile/lightning-address';
import { Name } from '@/components/profile/name';

export const CardUser = (data: any) => {
  // if (!data) return null;

  return (
    <Link href={`/p/${data.npub || data.id}`} className='w-full' prefetch={true} tabIndex={-1}>
      <AtomicCard className='flex flex-col justify-center items-center w-full p-8'>
        <Avatar className='w-[60px] h-[60px] bg-background border-2 border-card'>
          <AvatarImage src={String(data?.image)} loading='lazy' fetchPriority='high' />
          <AvatarFallback>
            <Skeleton className='bg-card' />
          </AvatarFallback>
        </Avatar>

        <Name value={data?.displayName} />
        <LightningAddress value={data?.lud16} />

        <div className='mt-2'>
          <Button size='sm' variant='secondary'>
            Ver perfil
          </Button>
        </div>
      </AtomicCard>
    </Link>
  );
};
