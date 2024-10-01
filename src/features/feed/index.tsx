'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { NDKEvent, NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useActiveUser } from 'nostr-hooks';

import { PublishNote } from '@/components/notes/publish-note';

import { Notes } from '@/components/notes';
import fetcher from '@/config/fetcher';

export const Feed: React.FC = () => {
  const { activeUser } = useActiveUser();

  const urlKey = useCallback(() => {
    return `/api/feed?pubkey=${activeUser?.pubkey}`;
  }, [activeUser?.pubkey]);

  const { data: notes, isLoading } = useSWR(urlKey, fetcher);

  const profileKey = useCallback(() => {
    return `/api/user?pubkey=${activeUser?.pubkey}`;
  }, [activeUser?.pubkey]);

  const { data: profile } = useSWR(profileKey, fetcher);

  if (!activeUser) {
    return <div className='text-center py-4'>Please log in to view your feed.</div>;
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='flex flex-col w-full'>
        <PublishNote profile={profile as NDKUserProfile} />
        {!isLoading && notes?.length === 0 && <div className='text-center py-2'>No notes to display</div>}
        {notes &&
          notes?.length > 0 &&
          notes?.map((post: NDKEvent) => {
            if (!post) return null;

            const isReply = post.tags.find((tag: any) => tag[0] === 'e');
            return (
              <Link key={post?.id} href={`/e/${post?.id}`} className='border-b-[1px] border-border last:border-none'>
                {isReply && <div className='p-4 bg-border text-sm'>See reply to...</div>}
                <Notes post={post} pubkey={post?.pubkey} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};
