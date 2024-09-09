import Link from 'next/link';
import useSWR from 'swr';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import fetcher from '@/config/fetcher';

export function Mention(props: any) {
  const { value } = props;

  const { data: profile, isLoading } = useSWR(`/api/user?pubkey=${value}`, fetcher);

  return (
    <Button variant='link' className='p-0 h-auto items-center' disabled={isLoading} asChild={!isLoading}>
      {isLoading ? (
        <>
          @<Skeleton className='inline-flex w-12 h-4 bg-card rounded-full' />
        </>
      ) : (
        <Link href={`/p/${profile?.pubkey}`} tabIndex={-1}>
          @{profile?.name}
        </Link>
      )}
    </Button>
  );
}
