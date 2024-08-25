'use client';

// Packages
import * as React from 'react';
import Link from 'next/link';
import { LaWalletProvider } from '@lawallet/react';
import { useAutoLogin, useNostrHooks } from 'nostr-hooks';

// Libs and hooks
import { useAuth } from '@/hooks/use-auth';

// Components
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Config
import { paymentConfig } from '@/config/payment';

// Icons
import { ExitIcon, GitHubLogoIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';

function UserAuth() {
  useAutoLogin();
  const { user, profile, logout } = useAuth();

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
            <Button variant='secondary' className='relative h-8 w-8 rounded-full'>
              {profile?.image ? (
                <Avatar className='h-9 w-9'>
                  <AvatarImage loading='lazy' src={profile?.image || '/profile.png'} />
                  <AvatarFallback>{profile?.displayName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className='w-9 h-9 bg-card' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 bg-card text-text' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                {!profile?.displayName && (!profile?.lud16 || !profile?.nip05) ? (
                  <>
                    <p className='text-sm font-medium leading-none'>Hello,</p>
                    <p className='text-xs leading-none text-muted-foreground'>Anonymous</p>
                  </>
                ) : (
                  <>
                    <p className='text-sm font-medium leading-none'>{profile?.displayName}</p>
                    <p className='text-xs leading-none text-muted-foreground'>{profile?.lud16 || profile?.nip05}</p>
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
                <Link href={`/p/${user?.id}`}>
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

  return (
    <LaWalletProvider config={paymentConfig}>
      <nav className='fixed top-0 w-full h-16 bg-black/10 backdrop-blur-lg z-10'>
        <div className='flex justify-end items-center max-w-[1024px] h-full mx-auto'>
          <div className='flex items-center gap-2'>
            <UserAuth />

            <Button variant='link' size='icon' asChild>
              <Link href='https://github.com/unllamas/next-nostr-starter-kit' target='_blank' rel='noreferrer'>
                <GitHubLogoIcon />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className='mt-[60px]'>{children}</div>
    </LaWalletProvider>
  );
}
