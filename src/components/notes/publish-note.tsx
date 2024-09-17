'use client';

import React, { useEffect, useRef, useState } from 'react';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import { useActiveUser, useNewEvent } from 'nostr-hooks';
import { toast } from 'sonner';
import { Cross1Icon } from '@radix-ui/react-icons';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar } from '../profile/avatar';
import { DrawerGifSearch } from './drawer-gif-search';

const isGiphyIntegrated = process.env.NEXT_PUBLIC_GIPHY_API_KEY as string;

export function PublishNote({ profile }: { profile: NDKUserProfile }) {
  const [content, setContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const gifRef = useRef<HTMLImageElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Libs and hooks
  const { activeUser } = useActiveUser();
  const { createNewEvent } = useNewEvent();

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePublish = async (): Promise<void> => {
    if (!activeUser || !content.trim()) return;
    setIsPublishing(true);

    const event = createNewEvent();

    event.kind = 1; // kind 1 para notas de texto

    const combinedContent = selectedGif ? `${content.trim()}\n\n${selectedGif}` : content.trim();

    event.content = combinedContent;

    event
      .publish()
      .then(() => {
        toast.success('Successfully published.');
        setContent('');
        setSelectedGif(null);
        setIsPublishing(false);
      })
      .catch((err) => {
        toast.error('Oops...', { description: err.message });
        setIsPublishing(false);
      });
  };

  const handleRemoveGif = () => {
    setSelectedGif(null);
  };

  const handleGifSelect = (gifUrl: string) => {
    setSelectedGif(gifUrl);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  return (
    <div className='w-full max-w-full p-4'>
      <div className='flex flex-col items-start space-x-4'>
        <div className='flex gap-2 w-full'>
          <Avatar src={profile?.picture as string} alt={profile?.name as string} />
          <div className='flex flex-col gap-2 w-full'>
            <Textarea
              ref={textareaRef}
              placeholder="What's happening?"
              value={content}
              onChange={handleContentChange}
              className='w-full min-h-8 p-2 resize-none no-scrollbar border-none bg-transparent text-md !focus:ring-offset-0 !focus:ring-0 !focus:shadow-none'
            />
            {selectedGif && (
              <div className='relative w-full mb-2'>
                <img ref={gifRef} src={selectedGif} alt='Selected GIF' className='w-full h-auto rounded-md' />
                <div className='absolute top-2 right-2 flex gap-2'>
                  <Button variant='secondary' size='icon' onClick={handleRemoveGif} aria-label='Remove GIF'>
                    <Cross1Icon className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )}
            <div className='flex justify-end items-center gap-2 w-full'>
              {isGiphyIntegrated && <DrawerGifSearch onGifSelect={handleGifSelect} />}
              <Button onClick={handlePublish} disabled={isPublishing || !content.trim()}>
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
