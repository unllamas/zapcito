'use client';

import React, { useCallback } from 'react';
import { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';

import { PublishNote } from '@/components/notes/publish-note';

import { useActiveUser } from 'nostr-hooks';
import { Notes } from '@/components/notes';
import fetcher from '@/config/fetcher';
import useSWR from 'swr';

export const Feed: React.FC = () => {
  const { activeUser } = useActiveUser();

  const urlKey = useCallback(() => {
    return `/api/feed?pubkey=${activeUser?.pubkey}`;
  }, [activeUser?.pubkey]);

  const { data: notes, isLoading } = useSWR(urlKey, fetcher);

  if (!activeUser) {
    return <div className='text-center py-4'>Please log in to view your feed.</div>;
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col gap-2 w-full max-w-lg'>
        <PublishNote profile={activeUser?.profile as NDKUserProfile} />
        {!isLoading && notes?.length === 0 && <div className='text-center py-2'>No notes to display</div>}
        {notes &&
          notes?.length > 0 &&
          notes?.map((post: NDKEvent) => {
            if (!post) return null;
            return <Notes key={post?.id} post={post} pubkey={post?.pubkey} />;
          })}
      </div>
    </div>
  );
};
