'use client';

// Packages
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { LaWalletProvider } from '@lawallet/react';
import { useNostrHooks } from 'nostr-hooks';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';

// Components
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

// Config
// import { paymentConfig } from '@/config/payment';

// Icons
import { ArrowTopRightIcon, ExitIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
import { useProfileHook } from '@/hooks/use-profile';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { database } from '@/lib/database';

import { LightningAddress } from '@/components/profile/lightning-address';
import { Avatar } from '@/components/profile/avatar';

export function CommandMenu(props: any) {
  const { profiles } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading={`Suggestions (${profiles.length})`}>
          {profiles.map((profile: any, key: any) => {
            return (
              <CommandItem key={key} className='flex gap-2 items-center hover:bg-card' onClick={() => setOpen(false)}>
                <div className='flex flex-1 gap-2 items-center'>
                  <Avatar src={profile.image || ''} />
                  <div className='flex flex-col'>
                    {profile?.displayName || profile?.name}
                    <LightningAddress value={profile?.lud16 || profile?.nip05} />
                  </div>
                </div>
                <Button size='icon' variant='ghost' asChild>
                  <Link href={`/p/${profile?.npub || profile.id}`}>
                    <ArrowTopRightIcon />
                  </Link>
                </Button>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

function UserAuth() {
  // useAutoLogin();
  const { user, logout } = useAuth();

  const { profile } = useProfileHook(user?.id || '');

  return (
    <>
      {!user ? (
        <Button variant='link' asChild>
          <Link href='/login' className='menu_link' id='login'>
            Login
          </Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='relative h-8 w-8 p-0 rounded-full'>
              <Avatar src={profile?.image || ''} alt={profile?.displayName} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 bg-card text-text' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                {!profile?.displayName && !profile?.lud16 ? (
                  <>
                    <p className='text-sm font-medium leading-none'>Hello,</p>
                    <p className='text-xs leading-none text-muted-foreground'>Anonymous</p>
                  </>
                ) : (
                  <>
                    <p className='text-sm font-medium leading-none'>{profile?.displayName}</p>
                    <p className='text-xs leading-none text-muted-foreground'>{profile?.lud16}</p>
                  </>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-card' />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href='/'>
                  <HomeIcon />
                  <p className='ml-2'>Home</p>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/p/${profile?.npub || user?.id}`}>
                  <PersonIcon />
                  <p className='ml-2'>Profile</p>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className='bg-card' />
            <DropdownMenuItem onClick={logout}>
              <ExitIcon />
              <p className='ml-2'>Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  useNostrHooks();

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
      <nav className='fixed top-0 w-full h-16 bg-black/10 backdrop-blur-lg z-10'>
        <div className='flex justify-between items-center w-full max-w-[1024px] h-full mx-auto px-4'>
          <Link href='/'>
            <Image src='/img/logo.png' width={115} height={30} alt='Zapcito logo' priority />
          </Link>

          <div className='flex items-center gap-2'>
            <Button variant='link' asChild>
              <Link href='/explore'>Explore</Link>
            </Button>
            <UserAuth />

            {/* <Button variant='link' size='icon' asChild>
              <Link href='https://github.com/unllamas/zapcito' target='_blank' rel='noreferrer'>
                <GitHubLogoIcon />
              </Link>
            </Button> */}
          </div>
        </div>
      </nav>

      <div className='mt-[60px]'>{children}</div>

      <footer className='py-8 border-t-[1px] border-card mt-8'>
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
      </footer>

      <CommandMenu profiles={profiles} />
    </>
  );
}
