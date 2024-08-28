'use client';

// Packages
import { useMemo } from 'react';
import { useProfile, useSubscribe } from 'nostr-hooks';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';

// Components
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Zap } from '../zap';
import { Notes } from '../notes';

// Internal components
import { Website } from './components/website';
import { Description } from './components/description';
import { LightningAddress } from './components/lightning-address';
import { Name } from './components/name';
import { Banner } from './components/banner';

interface ProfileProps {
  value: string;
}

export const Profile = (props: ProfileProps) => {
  // TO-DO
  // Value can be: npub, pubkey hex or lightning address
  const { value } = props;

  const { profile } = useProfile({ pubkey: value });
  const { user } = useAuth();

  const filters = useMemo(() => [{ authors: [value], kinds: [1], limit: 12 }], [value]);
  const { events: publications } = useSubscribe({ filters });

  return (
    <div className='w-full max-w-xl mx-auto pt-4'>
      <div className='h-[200px]'>
        <Banner value={profile?.banner} />
      </div>

      <div className='relative mt-[-50px] mb-2 px-4'>
        <div className='w-full'>
          <div className='flex justify-between items-end gap-4 w-full'>
            <Avatar className='overflow-hidden w-[100px] h-[100px] bg-card border-4 border-background rounded-full'>
              <AvatarImage src={profile?.image || ''} loading='lazy' />
              <AvatarFallback>
                <Skeleton className='bg-card' />
              </AvatarFallback>
            </Avatar>

            <div>
              {value === user?.id ? (
                <Button variant='secondary' disabled>
                  Edit profile
                </Button>
              ) : (
                <Zap pubkey={value} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 w-full px-4'>
        <aside className='w-full'>
          <Name value={profile?.displayName} />
          <LightningAddress value={profile?.lud16} />
          <Description value={profile?.about} />
          <Website value={profile?.website} />
        </aside>
      </div>

      <div className='mt-4 px-4'>
        <Tabs defaultValue='feed' className='w-full'>
          <TabsList className='w-full bg-card'>
            <TabsTrigger className='flex-1' value='feed'>
              Feed
            </TabsTrigger>
            <TabsTrigger className='flex-1' value='about' disabled>
              About
            </TabsTrigger>
          </TabsList>
          <TabsContent className='flex flex-col gap-4' value='feed'>
            <div className='flex flex-col gap-2'>
              {publications &&
                publications.length > 0 &&
                publications?.map((post, key) => <Notes key={key} post={post} profile={profile} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
