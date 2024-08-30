import Link from 'next/link';
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
import MotionNumber from 'motion-number';

import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/profile/avatar';

import { Mention } from './mention';
import { Quote } from './quote';
import { Video } from './video';
import { Spotify } from './spotify';
import { Audio } from './audio';
import { Iframe } from './iframe';

import { useMemo } from 'react';
import { useSubscribe } from 'nostr-hooks';
import { HeartFilledIcon } from '@radix-ui/react-icons';

interface ComponentProps {
  post: any;
  profile: any;
}

export function Notes(props: ComponentProps) {
  const { post, profile } = props;

  if (!post) null;

  const filters = useMemo(() => [{ '#e': [post.id], '#p': [post.pubkey], kinds: [7], limit: 10 }], [post]);
  const opts = useMemo(() => ({ closeOnEose: true }), []);

  const { events: likes } = useSubscribe({ filters, opts });

  const fullContent = parse(post);

  return (
    <div className='overflow-hidden pb-2 border-b-[1px] border-border last:border-none'>
      <div className='flex flex-row items-center gap-2 p-2 pb-0'>
        <Avatar src={profile?.image} alt={profile?.displayName} />
        <div className='flex flex-col'>
          <p className='text-md font-semibold'>{profile?.displayName || profile?.name}</p>
          <p className='text-sm text-gray-500'>{profile?.lud16 || profile?.nip05}</p>
        </div>
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
      <div className='flex justify-between p-2'>
        <div className='flex items-center gap-1 text-text'>
          <span className='text-sm'>≈</span>
          {likes.length > 0 ? <HeartFilledIcon className='text-red-500 fill-red-500' /> : <HeartFilledIcon />}
          <p>
            <MotionNumber
              value={likes.length}
              format={{ notation: 'standard' }} // Intl.NumberFormat() options
              locales='en-US'
            />{' '}
            likes
          </p>
        </div>
      </div>
    </div>
  );
}
