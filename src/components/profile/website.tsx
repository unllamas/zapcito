import Link from 'next/link';
import { Link1Icon } from '@radix-ui/react-icons';

import { extractDomain, normalizeUrl } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ComponentProps {
  value: string | undefined;
}

export const Website = (props: ComponentProps) => {
  const { value } = props;

  if (!value) return <Skeleton className='w-full h-[20px] bg-card rounded-full' />;

  return (
    <Link href={normalizeUrl(value)} title={value} target='_blank' tabIndex={-1} rel='nofollow'>
      <Button size='sm' variant='link' className='text-left p-0 gap-2'>
        <Link1Icon />
        <span className='truncate overflow-hidden w-full lg:max-w-[200px] whitespace-nowrap'>
          {extractDomain(value)}
        </span>
      </Button>
    </Link>
  );
};
