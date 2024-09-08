import { useMemo } from 'react';
import Link from 'next/link';
import {
  parse,
  render as renderParsed,
  isTopic,
  isCode,
  isCashu,
  isInvoice,
  isLink,
  isProfile,
  isEvent,
  isAddress,
  isNewline,
} from '@welshman/content';
import useSWR from 'swr';

import { timeAgo } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar } from '@/components/profile/avatar';

import { Mention } from './mention';
import { Quote } from './quote';
import { Video } from './video';
import { Spotify } from './spotify';
import { Audio } from './audio';
import { Iframe } from './iframe';

import fetcher from '@/config/fetcher';

interface ComponentProps {
  post: any;
  pubkey: any;
}

export function Notes(props: ComponentProps) {
  const { post, pubkey } = props;

  if (!post) null;

  const { data: profile, isLoading } = useSWR(`/api/user?pubkey=${pubkey}`, fetcher);

  // @ts-ignore
  const key = useMemo(() => pubkey, [pubkey]);

  const fullContent = parse(post);

  return (
    <div className='overflow-hidden pb-2 border-b-[1px] border-border last:border-none'>
      <div className='flex flex-row items-center justify-between gap-2 p-2 pb-0'>
        <div className='flex flex-row items-center gap-2'>
          {isLoading ? (
            <Skeleton className='w-8 h-8 bg-card rounded-full' />
          ) : (
            <Avatar src={profile?.picture} alt={profile?.name} />
          )}
          <div className='flex flex-col'>
            {isLoading ? (
              <>
                <Skeleton className='w-full h-6 bg-card rounded-full' />
                <Skeleton className='w-fukk h-4 bg-card rounded-full' />
              </>
            ) : (
              <>
                <p className='text-md font-semibold'>{profile?.name}</p>
                <p className='text-sm text-gray-500'>{profile?.nip05}</p>
              </>
            )}
          </div>
        </div>
        <span className='text-sm text-muted-foreground'>{timeAgo(post.created_at)}</span>
      </div>
      <div className='p-2'>
        {fullContent.length > 0 &&
          fullContent?.map((parsed, i) => {
            if (isNewline(parsed)) {
              return <br key={i} />;
            } else if (isTopic(parsed)) {
              return (
                <Button variant='link' size='lg' className='p-0 h-auto' key={i}>
                  #{parsed.value}
                </Button>
              );
            } else if (isCode(parsed)) {
              return <span key={i}>{parsed.value.trim()}</span>;
            } else if (isCashu(parsed) || isInvoice(parsed)) {
              return (
                <div key={i} onClick={(e) => e.stopPropagation()}>
                  {/* <QRCode copyOnClick code={parsed.value} /> */}
                  Mostrar QR
                </div>
              );
            } else if (isLink(parsed)) {
              const url = parsed.value.url.toString();
              const isIframe = !url.match(/\.(wav|mp3|m3u8)$/);
              const zapcitoRegexp = /^(https?:\/\/)?zapcito\.app/;

              if (url.match(zapcitoRegexp)) {
                return (
                  <>
                    <Button className='p-0' key={i} variant='link' size='sm' asChild>
                      <Link href={url.replace(zapcitoRegexp, '')} onClick={(e) => e.stopPropagation()}>
                        {url}
                      </Link>
                    </Button>
                  </>
                );
              } else if (isIframe) {
                const isAudio = url.match(/\.(wav|mp3|m3u8)$/);
                const isSpotify = url.match(/open.spotify.com/);
                const isVideo = url.match(/\.(mov|webm|mp4)$/);
                const isImage = url.match(/\.(jpe?g|png|gif|webp)$/);

                if (isAudio) {
                  return <Audio key={i} src={url} />;
                }
                if (isSpotify) {
                  return <Spotify key={i} src={url} />;
                }
                if (isVideo) {
                  return <Video key={i} src={url} />;
                }
                if (isImage) {
                  return <img key={i} loading='lazy' src={url} alt='img' className='w-full h-auto rounded-md mt-1' />;
                }
              } else {
                return <Iframe key={i} src={url} />;
              }
            } else if (isProfile(parsed)) {
              return <Mention key={i} value={parsed.value.pubkey} />;
            } else if (isEvent(parsed) || isAddress(parsed)) {
              return <Quote key={i} raw={parsed.raw} />;
            } else {
              return (
                <span
                  key={i}
                  className='text-sm'
                  id='alguito'
                  dangerouslySetInnerHTML={{ __html: String(renderParsed(parsed)) }}
                />
              );
            }
          })}
      </div>
    </div>
  );
}
