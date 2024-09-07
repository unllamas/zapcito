'use client';

import { useMemo } from 'react';
import Link from 'next/link';
// import { NDKUserProfile, NostrEvent } from '@nostr-dev-kit/ndk';
// import { getTagValue } from '@lawallet/react';
import { ArrowTopRightIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { useLocalStorage } from 'usehooks-ts';
// import Confetti from 'react-confetti-boom';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';
import { useProfileHook } from '@/hooks/use-profile';
import { useSuscriptionHook } from '@/hooks/use-suscription';

// import { database } from '@/lib/database';
import { convertToHex } from '@/lib/utils';

// Components
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/profile/avatar';
import { Website } from '@/components/profile/website';
import { Description } from '@/components/profile/description';
import { LightningAddress } from '@/components/profile/lightning-address';
import { Name } from '@/components/profile/name';
import { Banner } from '@/components/profile/banner';
import { Notes } from '@/components/notes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { OnboardingModal } from '@/components/profile/onboarding-modal';
// import { Card } from '@/components/ui/card';
// import { Skeleton } from '@/components/ui/skeleton';

import { MOCK_BASE_PROFILES } from '@/config/constants';
// import { Zap } from '../zap';
// import { Ads } from './components/ads';
// import { DrawerDialogDemo } from '@/components/profile/edit-profile';

interface ProfileProps {
  value: string;
}

export const Profile = (props: ProfileProps) => {
  // TO-DO
  // Value can be: npub, pubkey hex or lightning address
  const { value } = props;

  // Flow
  // const [invoicePayed, setInvoicePayed] = useState(false);

  const { profile } = useProfileHook(value);
  const { user } = useAuth();
  const [onboarding, _] = useLocalStorage('onboarding', false, { initializeWithValue: false });

  const pubkeyToHex = useMemo(() => convertToHex(value) || '', [value]);

  const filtersNotes = useMemo(() => [{ authors: [pubkeyToHex], kinds: [1], limit: 12 }], [pubkeyToHex]);
  const { events: notes } = useSuscriptionHook({ pubkey: pubkeyToHex!, filters: filtersNotes });

  // const filtersZaps = useMemo(() => [{ '#p': [pubkeyToHex], kinds: [9735], limit: 12 }], [pubkeyToHex]);
  // const { events: zapcitos } = useSuscriptionHook({ pubkey: pubkeyToHex, filters: filtersZaps });

  // console.log('profile', profile);

  // const [firstFetch, setFirstFetch] = useState<boolean>(false);
  // const [profiles, setProfiles] = useState<NDKUserProfile[]>([]);

  // useEffect(() => {
  //   const getUsers = () => {
  //     const users = database.profiles.toArray();
  //     setProfiles(users);
  //     setFirstFetch(true);
  //     return;
  //   };

  //   !firstFetch && getUsers();
  // }, [pubkeyToHex]);

  // const shuffledProfiles = useMemo(() => shuffleArray(profiles, 5), [profiles]);
  // const shuffledProfiles = [];

  // const handlePayed = (value: boolean) => {
  //   setInvoicePayed(value);
  // };

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
                    <>{/* <DrawerDialogDemo profile={profile} /> */}</>
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
                    </>
                  )}
                </TooltipProvider>
                {/* {pubkeyToHex !== user?.id && <Zap pubkey={pubkeyToHex} onPayed={handlePayed} />} */}
              </div>
            </div>
          </div>

          {/* <Confetti mode='boom' particleCount={48} /> */}
          {/* {invoicePayed && <Confetti mode='boom' particleCount={48} />} */}
        </div>

        <div className='flex flex-col gap-4 w-full px-4'>
          <aside className='flex flex-col gap-1 w-full'>
            <Name value={profile?.displayName || profile?.name} />
            <LightningAddress value={profile?.nip05} />
            <Description value={profile?.about} />
            <Website value={profile?.website} />
          </aside>
        </div>

        <div className='mt-4 px-4'>
          <Tabs defaultValue='feed' className='w-full'>
            {/* <TabsList className='w-full bg-card'>
              <TabsTrigger className='flex-1' value='feed'>
                Feed
              </TabsTrigger>
              <TabsTrigger className='flex-1' value='zapcitos'>
                Zapcitos
              </TabsTrigger>
            </TabsList> */}
            <TabsContent className='flex flex-col gap-4' value='feed'>
              <div className='flex flex-col gap-2'>
                {notes &&
                  notes.length > 0 &&
                  notes?.map((post, key) => <Notes key={key} post={post} profile={profile} />)}
              </div>
            </TabsContent>
            {/* <TabsContent className='flex flex-col gap-4' value='zapcitos'>
              <div className='flex flex-col gap-2 mb-4'>
                {zapcitos?.length > 0 ? (
                  zapcitos?.map((zap: any, key: any) => {
                    const zapRequest: NostrEvent = JSON.parse(getTagValue(zap?.tags, 'description'));

                    const name = getTagValue(zapRequest?.tags, 'name');
                    const message = getTagValue(zapRequest?.tags, 'message');
                    const amount = Number(getTagValue(zapRequest?.tags, 'amount'));

                    // TO-DO
                    // Modificar via invoice
                    if (!amount) return null;

                    if (amount / 1000 > 100000) {
                      return <img key={key} src='/img/cat.webp' alt='Cat :)' />;
                    }

                    return (
                      <Card key={key} className='p-4'>
                        <div className='flex gap-4 justify-between items-start'>
                          <div className='flex flex-col gap-1 w-full'>
                            <div className='flex gap-1 items-center'>
                              {name && (
                                <p>
                                  <strong>{name}</strong>
                                </p>
                              )}
                              <p>
                                {name ? 'te hizo' : 'Te hicieron'} {amount / 1000}{' '}
                                {amount / 1000 === 1 ? 'zapcito' : 'zapcitos'}
                              </p>
                            </div>
                            <span className='text-sm text-gray-500'>{timeAgo(zapRequest?.created_at)}</span>
                            {message && <p className=''>{message}</p>}
                          </div>
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <Skeleton className='w-full h-[80px] bg-card rounded-lg' />
                )}
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>

      <div className='sticky top-20 hidden md:block w-full max-w-sm px-8'>
        <h2 className='font-bold font-lg'>You might like</h2>

        <div className='flex flex-col gap-1 w-full mt-2'>
          {/* {shuffledProfiles?.length > 0 ? (
            shuffledProfiles?.map((profile: any, key: any) => {
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
          )} */}
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
        </div>

        {/* <Ads /> */}
      </div>

      {onboarding && <OnboardingModal />}
    </div>
  );
};
