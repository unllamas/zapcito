// Packages
import { useEffect, useMemo, useState } from 'react';
import { NDKUserProfile } from '@nostr-dev-kit/ndk';

// Libs and hooks
import { convertToHex } from '@/lib/utils';
import { database } from '@/lib/database';
import { useNostr } from '@/hooks/use-nostr';

export const useProfileHook = (id: string) => {
  const valueToHex = useMemo(() => convertToHex(id) || '', [id]);

  const [profile, setProfile] = useState<NDKUserProfile | null>(null);

  const { ndk } = useNostr();

  const fetchProfile = async () => {
    // @ts-ignore
    const storedProfile = await database.profiles.get(valueToHex);
    if (storedProfile) {
      setProfile(storedProfile);
      return;
    }

    try {
      const ndkProfile = await ndk.getUser({ pubkey: valueToHex }).fetchProfile();
      if (ndkProfile) {
        const newProfile = {
          id: valueToHex,
          ...ndkProfile,
        };
        setProfile(ndkProfile);
        await database.profiles.put(newProfile);
        return;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (!id || id.length === 0 || !ndk) return;

    fetchProfile();
  }, [valueToHex, ndk]);

  return { profile };
};
