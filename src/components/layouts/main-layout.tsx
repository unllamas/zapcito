'use client';

// Packages
import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActiveUser, useAutoLogin, useLogin, useNostrHooks } from 'nostr-hooks';

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

// Icons
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { config } from '@/config/payment';
import { LaWalletConfig } from '@lawallet/react';

function UserAuth() {
  useAutoLogin();

  // const router = useRouter();
  const { logout } = useLogin();

  const { activeUser } = useActiveUser({ fetchProfile: true });

  return (
    <>
      {!activeUser ? (
        <Button variant='link' asChild>
          <Link href='/login' className='menu_link' id='login'>
            Login
          </Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='relative h-8 w-8 rounded-full'>
              {activeUser?.profile?.image ? (
                <Avatar className='h-9 w-9'>
                  <AvatarImage loading='lazy' src={activeUser?.profile?.image || '/profile.png'} />
                  <AvatarFallback>{activeUser?.profile?.displayName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <Skeleton className='w-9 h-9 bg-card' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56 bg-card text-text' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                {!activeUser?.profile?.displayName && (!activeUser?.profile?.lud16 || !activeUser?.profile?.nip05) ? (
                  <>
                    <p className='text-sm font-medium leading-none'>Hola,</p>
                    <p className='text-xs leading-none text-muted-foreground'>Annonymous</p>
                  </>
                ) : (
                  <>
                    <p className='text-sm font-medium leading-none'>{activeUser?.profile?.displayName}</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {activeUser?.profile?.lud16 || activeUser?.profile?.nip05}
                    </p>
                  </>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-card' />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem onClick={() => router.push(`/p/${activeUser?.pubkey || activeUser?.npub}`)}>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem> */}
              {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={logout}>
              Cerrar sesión
              {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
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
    <LaWalletConfig config={config}>
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

      {children}
    </LaWalletConfig>
  );
}
