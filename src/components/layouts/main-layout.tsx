'use client';

// Packages
import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useActiveUser } from 'nostr-hooks';
import { LaWalletProvider } from '@lawallet/react';
import useSWR from 'swr';
import { ArrowTopRightIcon, EnvelopeClosedIcon, HomeIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

// Components
import { Button } from '@/components/ui/button';

import { Avatar } from '@/components/profile/avatar';

import { paymentConfig } from '@/config/payment';
import fetcher from '@/config/fetcher';
import { PlusIcon } from 'lucide-react';
import { MOCK_BASE_PROFILES } from '@/config/constants';
import { LightningAddress } from '../profile/lightning-address';

// function UserAuth() {
//   if (!activeUser)
//     return (
//       <Button variant='link' asChild>
//         <Link href='/login' className='menu_link' id='login'>
//           Login
//         </Link>
//       </Button>
//     );

//   return (
//     <>
//       <Button className='gap-1' size='sm'>
//             <PlusIcon />
//             Publish
//           </Button>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant='ghost' className='relative w-12 h-12 p-0 rounded-full'>
//             <Avatar src={profile?.picture} alt={profile?.displayName || profile?.name} />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className='w-56 bg-card text-text' align='end' forceMount>
//           <DropdownMenuLabel className='font-normal'>
//             <div className='flex flex-col space-y-1'>
//               <p className='text-sm font-medium leading-none'>{profile?.displayName || profile?.name || 'Hello,'}</p>
//               <p className='text-xs leading-none text-muted-foreground'>{profile?.lud16 || 'Anonymous'}</p>
//             </div>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator className='bg-card' />
//           <DropdownMenuGroup>
//             <DropdownMenuItem asChild>
//               <Link href='/'>
//                 <HomeIcon />
//                 <p className='ml-2'>Home</p>
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link href='/feed'>
//                 <HomeIcon />
//                 <p className='ml-2'>Feed</p>
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link href={`/p/${activeUser?.pubkey}`}>
//                 <PersonIcon />
//                 <p className='ml-2'>Profile</p>
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem asChild>
//               <Link href={`/settings`}>
//                 <GearIcon />
//                 <p className='ml-2'>Settings</p>
//               </Link>
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator className='bg-card' />
//           <DropdownMenuItem onClick={logout}>
//             <ExitIcon />
//             <p className='ml-2'>Logout</p>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </>
//   );
// }

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { activeUser } = useActiveUser();

  const getKeyUrl = useMemo(() => `/api/user?pubkey=${activeUser?.pubkey}`, [activeUser?.pubkey]);
  const { data: profile } = useSWR(getKeyUrl, fetcher);

  return (
    <LaWalletProvider config={paymentConfig}>
      <div className='flex justify-center w-full'>
        <nav className='z-10 fixed md:sticky bottom-0 md:top-0 w-full md:w-auto lg:w-full lg:max-w-[240px] h-16 md:h-screen bg-black/65 md:bg-transparent backdrop-blur-lg'>
          <div className='flex justify-end items-center md:items-center lg:items-start w-full h-full mx-auto px-4 md:p-4 lg:pt-0'>
            <div className='flex md:flex-col justify-center items-center lg:items-start gap-2 w-full'>
              <div className='hidden lg:flex items-center w-full h-14 px-4'>
                <Link href='/'>
                  <Image src='/img/logo.png' width={115} height={30} alt='Zapcito logo' priority />
                </Link>
              </div>

              <Link
                className='flex-1 md:flex-initial flex justify-center items-center gap-2 w-12 h-12 lg:h-14 lg:w-auto lg:justify-start lg:px-4 lg:pr-8 rounded-full hover:bg-card font-semibold'
                href='/'
              >
                <HomeIcon className='w-6 h-6' />
                <span className='hidden lg:inline-flex ml-2'>Home</span>
              </Link>
              <button
                className='flex-1 md:flex-initial flex justify-center items-center gap-2 w-12 h-12 lg:h-14 lg:w-auto lg:justify-start lg:px-4 lg:pr-8 rounded-full text-muted-foreground font-semibold'
                disabled
              >
                <MagnifyingGlassIcon className='w-6 h-6' />
                <span className='hidden lg:inline-flex ml-2'>Explore</span>
              </button>
              <button
                className='flex-1 md:flex-initial flex justify-center items-center gap-2 w-12 h-12 lg:h-14 lg:w-auto lg:justify-start lg:px-4 lg:pr-8 rounded-full text-muted-foreground font-semibold'
                disabled
              >
                <PlusIcon className='w-6 h-6' />
                <span className='hidden lg:inline-flex ml-2'>Publish</span>
              </button>
              <button
                className='flex-1 md:flex-initial flex justify-center items-center gap-2 w-12 h-12 lg:h-14 lg:w-auto lg:justify-start lg:px-4 lg:pr-8 rounded-full text-muted-foreground font-semibold'
                disabled
              >
                <EnvelopeClosedIcon className='w-6 h-6' />
                <span className='hidden lg:inline-flex ml-2'>Messages</span>
              </button>

              {activeUser && (
                <Link
                  className='flex-1 md:flex-initial flex justify-center items-center gap-2 w-12 h-12 lg:h-14 lg:w-full lg:justify-start lg:pl-3 lg:pr-4 rounded-full hover:bg-card'
                  href={`/p/${activeUser?.pubkey}`}
                >
                  <Avatar src={profile?.picture} alt={profile?.displayName || profile?.name} />
                  <div className='hidden lg:inline-flex flex-col space-y-1 ml-1'>
                    <p className='font-medium leading-none'>{profile?.displayName || profile?.name || 'Hello,'}</p>
                    <p className='leading-none text-muted-foreground'>{profile?.lud16 || 'Anonymous'}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </nav>

        <div className='flex-1 w-full md:min-w-lg lg:max-w-xl h-full min-h-screen md:border-l-[1px] lg:border-r-[1px] border-border'>
          {/* Topbar */}
          <div className='flex items-center w-full h-14 px-4 bg-background border-b-[1px] border-border'>
            {/* <Button size='icon'>Back</Button> */}
            <span>Topbar</span>
          </div>

          <div className='mb-12'>{children}</div>
        </div>

        <div className='hidden xl:block w-full max-w-sm h-auto px-8'>
          <div className='sticky top-8 flex flex-col gap-1 w-full mt-2'>
            <h2 className='font-bold font-lg mb-2'>You might like</h2>
            {MOCK_BASE_PROFILES.map((profile) => (
              <div key={profile?.pubkey} className='flex gap-2 items-center py-1 pl-3 pr-2 rounded-full hover:bg-card'>
                <div className='flex gap-2 items-center w-full'>
                  <Avatar src={profile?.image} />
                  <div className='flex flex-col'>
                    {profile?.name}
                    <LightningAddress value={profile?.lud16} />
                  </div>
                </div>
                <div>
                  <Button className='flex-0' size='icon' variant='outline' asChild>
                    <Link href={`/p/${profile?.pubkey}`}>
                      <ArrowTopRightIcon />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* <AdsLightningAddress /> */}
        </div>

        {/* <footer className='py-8 border-t-[1px] border-card mt-8'>
          <div className='w-full max-w-lg mx-auto'>
            <div className='flex items-center justify-center gap-1'>
              <p className='text-sm text-muted-foreground'>® Zapcito, 2024</p>
              <span className='text-sm text-muted-foreground'>-</span>
              <p className='text-sm'>With love by</p>
              <Link
                href={`/p/cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547`}
                className='footer_link'
                id='by'
                tabIndex={-1}
              >
                <Button size='sm' variant='link' className='p-0'>
                  @unllamas
                </Button>
              </Link>
            </div>
          </div>
        </footer> */}
      </div>
    </LaWalletProvider>
  );
}
