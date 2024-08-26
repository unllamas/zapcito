'use client';

// Packages
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

// Libs and hooks
import { useProfile } from '@/hooks/use-profile';
// import { useAuth } from '@/hooks/use-auth';

// Components
import { Skeleton } from '@/components/ui/skeleton';
// import { Button } from '@/components/ui/button';

// Internal components
import { Website } from './components/website';
import { Description } from './components/description';
import { LightningAddress } from './components/lightning-address';
import { Name } from './components/name';
import { Banner } from './components/banner';
import { Zap } from '../zap';

interface ProfileProps {
  value: string;
}

export const Profile = (props: ProfileProps) => {
  // TO-DO
  // Value can be: npub, pubkey hex or lightning address
  const { value } = props;

  const { profile } = useProfile({ pubkey: value });
  // const { user } = useAuth();

  return (
    <div className='w-full max-w-xl mx-auto pt-4'>
      <div className='h-[200px]'>
        <Banner value={profile?.banner} />
      </div>

      <div className='relative mt-[-50px] mb-2 px-4'>
        <div className='w-full'>
          <div className='flex justify-between items-end gap-4 w-full'>
            <Avatar className='overflow-hidden w-[100px] h-[100px] bg-card border-4 border-background rounded-full'>
              <AvatarImage src={profile?.avatar || ''} loading='lazy' />
              <AvatarFallback>
                <Skeleton className='bg-card' />
              </AvatarFallback>
            </Avatar>

            <div>
              <Zap pubkey={value} />
            </div>
            {/* {pubkey === user?.id && <Button variant='secondary'>Edit</Button>} */}
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 w-full px-4'>
        <aside className='w-full'>
          <Name value={profile?.name} />
          <LightningAddress value={profile?.address} />
          <Description value={profile?.about} />
          <Website value={profile?.website} />
        </aside>
      </div>
    </div>
  );
};
