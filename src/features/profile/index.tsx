'use client';

import { useMemo } from 'react';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';
import { useProfileHook } from '@/hooks/use-profile';
import { useSuscriptionHook } from '@/hooks/use-suscription';

import { convertToHex } from '@/lib/utils';

// Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/profile/avatar';
import { Website } from '@/components/profile/website';
import { Description } from '@/components/profile/description';
import { LightningAddress } from '@/components/profile/lightning-address';
import { Name } from '@/components/profile/name';
import { Banner } from '@/components/profile/banner';
import { Notes } from '@/components/notes';

import { Zap } from '../zap';

interface ProfileProps {
  value: string;
}

export const Profile = (props: ProfileProps) => {
  // TO-DO
  // Value can be: npub, pubkey hex or lightning address
  const { value } = props;

  const { profile } = useProfileHook(value);
  const { user } = useAuth();

  const pubkeyToHex = useMemo(() => convertToHex(value) || '', [value]);

  const { events } = useSuscriptionHook(pubkeyToHex);

  return (
    <div className='w-full max-w-xl mx-auto pt-4'>
      <div className='h-[200px]'>
        <Banner value={profile?.banner} />
      </div>

      <div className='relative mt-[-50px] mb-2 px-4'>
        <div className='w-full'>
          <div className='flex justify-between items-end gap-4 w-full'>
            <Avatar src={profile?.image || ''} alt={profile?.displayName} variant='profile' />
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
        <aside className='flex flex-col gap-2 w-full'>
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
            <TabsTrigger className='flex-1' value='events' disabled>
              Events
            </TabsTrigger>
          </TabsList>
          <TabsContent className='flex flex-col gap-4' value='feed'>
            <div className='flex flex-col gap-2'>
              {events &&
                events.length > 0 &&
                events?.map((post, key) => <Notes key={key} post={post} profile={profile} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
