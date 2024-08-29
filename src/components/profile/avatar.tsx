import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt?: string;
  variant?: 'default' | 'profile';
}

export const Avatar = (props: AvatarProps) => {
  const { src, alt, variant = 'default' } = props;

  let size;
  switch (variant) {
    case 'profile':
      size = 100;
      break;

    default:
      size = 32;
      break;
  }

  return (
    <div
      className={cn(
        `overflow-hidden bg-background rounded-full`,
        variant === 'default' ? 'w-8 h-8 max-h-8' : 'w-28 h-28 max-h-28 border-4 border-background',
      )}
    >
      {!src ? (
        <Skeleton className={`w-full h-full bg-border`} />
      ) : (
        <Image
          {...props}
          className={`w-full h-full max-h-full object-cover`}
          width={size}
          height={size}
          src={src}
          alt={alt || ''}
          quality={70}
          priority
        />
      )}
    </div>
  );
};
