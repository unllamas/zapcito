// Packages
import { useEffect, useState } from 'react';
import { useNostr } from '@lawallet/react';

// Config
import { paymentConfig } from '@/config/payment';

// Types
import { NDKUserProfile } from '@/types';

type ProfileParams = {
  nip05?: string;
  pubkey?: string;
  npub?: string;
};

export const useProfile = (profileParams?: ProfileParams) => {
  const [profile, setProfile] = useState<NDKUserProfile | null>(null);

  const { ndk } = useNostr({ config: paymentConfig });

  useEffect(() => {
    if (!profileParams || Object.keys(profileParams).length === 0) return;
    if (!ndk) return;

    const fetchProfile = async () => {
      try {
        const user = ndk.getUser(profileParams);
        const fetchedProfile = await user.fetchProfile();
        setProfile(fetchedProfile);
      } catch (err) {
        console.log('Ups, algo paso en fetchProfile');
      }
    };

    fetchProfile();
  }, [profileParams, ndk, profile]);

  return { profile };
};
