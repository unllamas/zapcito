// @ts-nocheck

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { type NDKEvent } from '@nostr-dev-kit/ndk';
// import { useSubscription } from '@lawallet/react';
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

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ComponentProps {
  post: any;
  profile: any;
}

export function Notes(props: ComponentProps) {
  const { post, profile } = props;

  if (!post) null;

  const fullContent = parse(post);

  return (
    <Card className='gap-0'>
      <div className='flex flex-row items-center gap-2 p-4 pb-0'>
        <Avatar>
          <AvatarImage src={profile?.image} alt={profile?.displayName} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='text-md font-semibold'>{profile?.displayName}</p>
          <p className='text-sm text-gray-500'>{profile?.lud16 || profile?.nip05}</p>
        </div>
      </div>
      <div className='p-4'>
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
                  <a key={i} href={url.replace(zapcitoRegexp, '')} onClick={(e) => e.stopPropagation()}>
                    {url}
                  </a>
                );
              } else if (isIframe) {
                const isAudio = url.match(/\.(wav|mp3|m3u8)$/);
                const isSpotify = url.match(/open.spotify.com/);
                const isVideo = url.match(/\.(mov|webm|mp4)$/);
                const isImage = url.match(/\.(jpe?g|png|gif|webp)$/);

                if (isAudio) {
                  return 'Es un audio';
                }
                if (isSpotify) {
                  return 'Es un Spoty';
                }
                if (isVideo) {
                  return 'Es un Video';
                }
                if (isImage) {
                  return <img key={i} src={url} alt='img' className='rounded-md mt-1' />;
                }
              } else {
                return 'Mostrar iframe';
              }
            } else if (isProfile(parsed)) {
              return (
                <Link key={i} href={`/p/${parsed.value.pubkey}`} tabIndex={-1}>
                  <Button variant='link' className='p-0'>
                    @{parsed.value.pubkey.slice(0, 5)}
                  </Button>
                </Link>
              );
            } else if (isEvent(parsed) || isAddress(parsed)) {
              return (
                <a key={i} href={parsed.raw} id='ni-idea'>
                  {parsed.raw}
                </a>
              );
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
      {/* <div className='flex justify-between p-4 pt-0'>
<Button variant='ghost' size='icon' onClick={() => setLiked(!liked)}>
  <HeartIcon className={`h-5 w-5 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
</Button>
</div> */}
    </Card>
  );
}
