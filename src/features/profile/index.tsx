'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { ArrowTopRightIcon, EnvelopeClosedIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { useLocalStorage } from 'usehooks-ts';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';
import { useProfileHook } from '@/hooks/use-profile';
import { useSuscriptionHook } from '@/hooks/use-suscription';

import { database } from '@/lib/database';
import { convertToHex, shuffleArray } from '@/lib/utils';

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OnboardingModal } from '@/components/profile/onboarding-modal';

// import { Zap } from '../zap';
import { MOCK_BASE_PROFILES } from '@/config/constants';

interface ProfileProps {
  value: string;
}

export const Profile = (props: ProfileProps) => {
  // TO-DO
  // Value can be: npub, pubkey hex or lightning address
  const { value } = props;

  const { profile } = useProfileHook(value);
  const { user } = useAuth();
  const [onboarding, _] = useLocalStorage('onboarding', false, { initializeWithValue: false });

  const pubkeyToHex = useMemo(() => convertToHex(value) || '', [value]);

  const { events } = useSuscriptionHook(pubkeyToHex);

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
  }, [pubkeyToHex]);

  const shuffledProfiles = useMemo(() => shuffleArray(profiles, 5), [profiles]);

  return (
    <div className='flex w-full justify-center items-start'>
      <div className='w-full max-w-lg pt-4'>
        <div className='h-[200px]'>
          <Banner value={profile?.banner} />
        </div>

        <div className='relative mt-[-50px] mb-2 px-4'>
          <div className='w-full'>
            <div className='flex justify-between items-end gap-4 w-full'>
              <Avatar src={profile?.image} alt={profile?.displayName || profile?.name} variant='profile' />
              <div className='flex gap-1 items-center'>
                <TooltipProvider>
                  {pubkeyToHex === user?.id ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant='outline' disabled>
                          Edit profile
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Soon</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button size='icon' variant='outline' disabled>
                            <EnvelopeClosedIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Soon</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button variant='outline' disabled>
                            Follow
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Soon</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button size='icon' disabled>
                            <LightningBoltIcon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Soon</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 w-full px-4'>
          <aside className='flex flex-col gap-2 w-full'>
            <Name value={profile?.displayName || profile?.name} />
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
              <TabsTrigger className='flex-1' value='zapcitos' disabled>
                Zapcitos
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

      <div className='sticky top-20 hidden md:block w-full max-w-sm px-8'>
        <h2 className='font-bold font-lg'>You might like</h2>

        <div className='flex flex-col gap-1 w-full mt-2'>
          {shuffledProfiles?.length > 0 ? (
            shuffledProfiles.map((profile: any, key: any) => {
              return (
                <div key={key} className='flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-card'>
                  <div className='flex gap-2 items-center w-full'>
                    <Avatar src={profile.image || ''} />
                    <div className='flex flex-col'>
                      {profile?.displayName || profile?.name}
                      <LightningAddress value={profile?.lud16 || profile?.nip05} />
                    </div>
                  </div>
                  <div>
                    <Button className='flex-0' size='icon' variant='outline' asChild>
                      <Link href={`/p/${profile?.npub || profile.id}`}>
                        <ArrowTopRightIcon />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              {/* // Fake mock */}
              {MOCK_BASE_PROFILES.map((profile) => {
                return (
                  <div key={profile.pubkey} className='flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-card'>
                    <div className='flex gap-2 items-center w-full'>
                      <Avatar src={profile.image} />
                      <div className='flex flex-col'>
                        {profile.name}
                        <LightningAddress value={profile.lud16} />
                      </div>
                    </div>
                    <div>
                      <Button className='flex-0' size='icon' variant='outline' asChild>
                        <Link href={`/p/${profile.pubkey}`}>
                          <ArrowTopRightIcon />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {onboarding && <OnboardingModal />}
    </div>
  );
};
