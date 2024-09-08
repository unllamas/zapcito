import Link from 'next/link';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import fetcher from '@/config/fetcher';

export function Mention(props: any) {
  const { value } = props;

  const { data: profile, isLoading } = useSWR(`/api/user?pubkey=${value}`, fetcher);

  if (isLoading) return <Skeleton className='w-12 h-4 bg-card rounded-full' />;

  return (
    <Link href={`/p/${profile?.pubkey}`} tabIndex={-1}>
      <Button variant='link' className='p-0 h-auto'>
        @{profile?.name}
      </Button>
    </Link>
  );
}
