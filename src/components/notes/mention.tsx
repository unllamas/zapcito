import Link from 'next/link';
import { nip19 } from 'nostr-tools';

import { useProfileHook } from '@/hooks/use-profile';

import { Button } from '@/components/ui/button';

export function Mention(props: any) {
  const { value } = props;

  const { profile } = useProfileHook(value);

  if (!profile) return null;

  const npub = nip19.npubEncode(String(profile?.id));

  return (
    <Link href={`/p/${npub}`} tabIndex={-1}>
      <Button variant='link' className='p-0 h-auto'>
        @{profile?.displayName || profile?.name}
      </Button>
    </Link>
  );
}
