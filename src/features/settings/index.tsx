'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nip19 } from 'nostr-tools';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';

import { Button, buttonVariants } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { hexToBytes } from '@noble/hashes/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    active: boolean;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className='overflow-x-scroll w-full p-4 flex gap-2 flex-nowrap' {...props}>
      {items.map((item) => {
        if (item.active) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-disabled={item.active}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href ? 'bg-border' : 'hover:bg-card hover:text-white',
                'justify-start',
              )}
            >
              {item.title}
            </Link>
          );
        } else {
          return (
            <Button key={item.href} variant='ghost' disabled>
              {item.title}
            </Button>
          );
        }
      })}
    </nav>
  );
}

const sidebarNavItems = [
  {
    title: 'General',
    href: '/settings',
    active: true,
  },
  {
    title: 'Database',
    href: '/settings/database',
    active: false,
  },
  {
    title: 'Network',
    href: '/settings/network',
    active: false,
  },
  {
    title: 'Support',
    href: '/settings/support',
    active: false,
  },
];

export const Settings = () => {
  const { user } = useAuth();

  // Flow
  const [showSecret, setShowSecret] = useState<boolean>(false);

  if (!user) return null;

  const npub = nip19.npubEncode(user?.id!);
  const nsec = nip19.nsecEncode(hexToBytes(user?.secret || ''));

  return (
    <>
      <div className='overflow-x-hidden flex flex-col items-center w-full max-w-lg mx-auto'>
        <div className='w-full p-4 pb-0'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
        </div>
        <div className='flex flex-col justify-center w-full'>
          <SidebarNav items={sidebarNavItems} />
          <div className='flex flex-col gap-2 w-full max-w-xl p-4'>
            {/* Content */}
            <Card className=''>
              <CardHeader>
                <CardTitle>Public key</CardTitle>
                <CardDescription>
                  Your public key acts as your digital address. Share it freely so others can find you on the network.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea placeholder='npub' value={npub} readOnly />
              </CardContent>
            </Card>
            {user?.secret && (
              <Card className='bg-background border-primary'>
                <CardHeader className='flex flex-row items-start gap-8'>
                  <div className='flex flex-col gap-2'>
                    <CardTitle>Private key</CardTitle>
                    <CardDescription>
                      Keep it safe and never share it. If someone gets it, they will permanently control your account.
                    </CardDescription>
                  </div>
                  <Switch onCheckedChange={() => setShowSecret(!showSecret)} />
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder='npub'
                    value={!showSecret ? '********************************' : nsec}
                    readOnly
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
