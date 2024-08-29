'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';

import { database } from '@/lib/database';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LightningAddress } from '@/components/profile/lightning-address';
import { Name } from '@/components/profile/name';
import { Avatar } from '@/components/profile/avatar';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export const Explore = () => {
  const [firstFetch, setFirstFetch] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<NDKUserProfile[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await database.profiles.toArray();
      setProfiles(users);
      setFirstFetch(true);
      return;
    };

    !firstFetch && getUsers();
  }, [firstFetch, profiles]);

  return (
    <>
      <main className='flex flex-col h-full'>
        <div className='w-full max-w-xl mx-auto px-4'>
          <div className='flex items-center gap-1 mb-4'>
            <h1 className='font-bold text-md'>Profiles</h1>
            <span className='text-sm text-text'>({profiles.length})</span>
          </div>
          <div className='flex flex-col'>
            {profiles?.length ? (
              profiles.map((profile, key) => {
                return (
                  <div key={key} className='flex gap-2 items-center p-2 rounded-lg hover:bg-card'>
                    <div className='flex flex-1 gap-2 items-center'>
                      <Avatar src={profile.image || ''} />
                      <div className='flex flex-col'>
                        <Name value={profile?.displayName || profile?.name} />
                        <LightningAddress value={profile?.lud16 || profile?.nip05} />
                      </div>
                    </div>
                    <Button size='icon' variant='ghost' asChild>
                      <Link href={`/p/${profile?.npub || profile.id}`}>
                        <ArrowTopRightIcon />
                      </Link>
                    </Button>
                  </div>
                );
              })
            ) : (
              <>
                <Skeleton className='w-full h-[64px] bg-card' />
                <Skeleton className='w-full h-[64px] bg-card' />
                <Skeleton className='w-full h-[64px] bg-card' />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};
