'use client';

import React from 'react';
import useSWR from 'swr';

import fetcher from '@/config/fetcher';
import { Notes } from '@/components/notes';
import { Skeleton } from '@/components/ui/skeleton';

export const Event = ({ value }: { value: string }) => {
  const { data, isLoading } = useSWR(`/api/event?id=${value}`, fetcher);

  const replyIds = data?.tags.filter((tag: any) => tag[0] === 'e').map((tag: any) => tag[1]);
  const { data: repliesData, isLoading: repliesLoading } = useSWR(
    replyIds ? `/api/events?ids=${replyIds.join(',')}` : null,
    fetcher,
  );

  if (isLoading || repliesLoading)
    return (
      <div className='p-4'>
        <Skeleton className='w-full h-[128px] bg-card' />
      </div>
    );

  return (
    <>
      {repliesData &&
        Array.isArray(repliesData) &&
        repliesData.map((reply: any) => <Notes key={reply.id} post={reply} pubkey={reply.pubkey} />)}
      <Notes post={data} pubkey={data?.pubkey} />
    </>
  );
};
