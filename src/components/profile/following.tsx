import useSWR from 'swr';

import { Skeleton } from '@/components/ui/skeleton';

import fetcher from '@/config/fetcher';

interface FollowsProps {
  pubkey: string;
}

export const Following: React.FC<FollowsProps> = ({ pubkey }) => {
  const { data, error, isLoading } = useSWR(`/api/user/following?pubkey=${pubkey}`, fetcher);

  if (error) return <div className='text-sm text-red-500'>Failed follows.</div>;

  return (
    <div className='flex items-center gap-1 text-sm'>
      {isLoading && !data ? <Skeleton className='h-4 w-8 bg-card' /> : <span className='font-bold'>{data}</span>}
      <span className='text-muted-foreground'> follows</span>
    </div>
  );
};
