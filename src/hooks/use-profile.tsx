// Packages
import { useEffect, useState } from 'react';
import { useNostr } from '@lawallet/react';

// Config
import { paymentConfig } from '@/config/payment';

// Types
import { useProfilesStore } from '@/stores/use-profiles-store';
import { Profile } from '@/lib/database';

type ProfileParams = {
  nip05?: string;
  pubkey?: string;
  npub?: string;
};

export const useProfile = (profileParams?: ProfileParams) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const { handleGet, handleAdd } = useProfilesStore();

  const { ndk } = useNostr({ config: paymentConfig });

  useEffect(() => {
    if (!profileParams || Object.keys(profileParams).length === 0) return;
    if (!ndk) return;

    const fetchProfile = async () => {
      setProfile(null);

      try {
        const localUser = await handleGet(profileParams?.pubkey || '');

        if (!localUser) {
          const nostrResponse = ndk.getUser(profileParams);
          const nostrProfile = await nostrResponse.fetchProfile();

          const profile: Profile = {
            id: profileParams?.pubkey || '',
            banner: nostrProfile?.banner || '',
            avatar: nostrProfile?.image || '',
            name: nostrProfile?.displayName || '',
            lud16: nostrProfile?.lud16 || '',
            nip05: nostrProfile?.nip05 || '',
            about: nostrProfile?.about || '',
            website: nostrProfile?.website || '',
            created_at: Number(nostrProfile?.created_at),
          };

          await handleAdd(profile);
          setProfile(profile);
        } else {
          setProfile(localUser);
        }

        return null;
      } catch (err) {
        console.log('Ups, algo paso en fetchProfile');
      }
    };

    !profile && fetchProfile();
  }, [profileParams, ndk, profile]);

  return { profile };
};
