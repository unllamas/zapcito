import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

// import { AdsLightningAddress } from '@/components/ads/ads-lightning-address';
import { Avatar } from '@/components/profile/avatar';
import { LightningAddress } from '@/components/profile/lightning-address';
import { Button } from '@/components/ui/button';

import { MOCK_BASE_PROFILES } from '@/config/constants';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-full justify-center items-start'>
      <main className='w-full max-w-lg'>{children}</main>

      <div className='sticky top-20 hidden md:block w-full max-w-sm px-8'>
        <h2 className='font-bold font-lg'>You might like</h2>
        <div className='flex flex-col gap-1 w-full mt-2'>
          {MOCK_BASE_PROFILES.map((profile) => (
            <div key={profile?.pubkey} className='flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-card'>
              <div className='flex gap-2 items-center w-full'>
                <Avatar src={profile?.image} />
                <div className='flex flex-col'>
                  {profile?.name}
                  <LightningAddress value={profile?.lud16} />
                </div>
              </div>
              <div>
                <Button className='flex-0' size='icon' variant='outline' asChild>
                  <Link href={`/p/${profile?.pubkey}`}>
                    <ArrowTopRightIcon />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* <AdsLightningAddress /> */}
      </div>
    </div>
  );
}
