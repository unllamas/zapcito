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

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/profile/avatar';

import { UserMention } from '@/components/notes/user-mention';
import { Quote } from './quote';
import { Video } from './video';
import { Spotify } from './spotify';
import { Audio } from './audio';
import { Iframe } from './iframe';

interface ComponentProps {
  post: any;
  profile: any;
}

export function Notes(props: ComponentProps) {
  const { post, profile } = props;

  if (!post) null;

  const fullContent = parse(post);

  return (
    <Card className='gap-0 overflow-hidden'>
      <div className='flex flex-row items-center gap-2 p-4 pb-0'>
        <Avatar src={profile?.image || ''} alt={profile?.displayName} />
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
              return <UserMention key={i} value={parsed.value.pubkey} />;
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
      {/* <div className='flex justify-between p-4 pt-0'>
<Button variant='ghost' size='icon' onClick={() => setLiked(!liked)}>
  <HeartIcon className={`h-5 w-5 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
</Button>
</div> */}
    </Card>
  );
}
