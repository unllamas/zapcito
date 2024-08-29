import Link from 'next/link';

import { useProfileHook } from '@/hooks/use-profile';

import { Button } from '@/components/ui/button';

export function Mention(props: any) {
  const { value } = props;

  const { profile } = useProfileHook(value);

  if (!profile) return null;

  return (
    <Link href={`/p/${profile?.npub || profile?.id}`} tabIndex={-1}>
      <Button variant='link' className='p-0'>
        @{profile?.displayName || profile?.name}
      </Button>
    </Link>
  );
}
