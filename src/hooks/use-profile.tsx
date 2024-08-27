// Packages
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { splitHandle, useNostr } from '@lawallet/react';
import { nip19 } from '@lawallet/nostr-tools';
import { toast } from 'sonner';

// Libs and hooks
import { useProfilesStore } from '@/stores/use-profiles-store';

// Config
import { paymentConfig } from '@/config/payment';

// Types
import { Profile } from '@/lib/database';
import { NDKUserProfile } from '@/types';

type ProfileParams = {
  nip05?: string;
  pubkey?: string;
  npub?: string;
};

export const useProfile = (profileParams?: ProfileParams) => {
  // Flow
  const [profile, setProfile] = useState<Profile | null>(null);

  // Libs and hooks
  const router = useRouter();
  const { handleGet, handleAdd } = useProfilesStore();

  const { ndk } = useNostr({ config: paymentConfig });

  const handleSearch = async (value: string) => {
    // TO-DO
    // Verificar si el formato de la pubkey es válido
    let pubkey: string;
    if (value) {
      switch (true) {
        case value.includes('@'): {
          const [username, domain] = splitHandle(value);
          try {
            const response = await fetch(`https://${domain}/.well-known/nostr.json?name=${username}`);
            if (!response) return null;

            let jsonResponse = await response.json();

            if (!jsonResponse || !jsonResponse.names || !jsonResponse.names[username]) throw new Error('Invalid nip05');

            pubkey = jsonResponse.names[username];

            break;
          } catch (err) {
            toast.info('Oops...', {
              description: (err as Error).message,
            });

            return null;
          }
        }

        case value.startsWith('npub'): {
          // TO-DO
          // Decodificar npub a hex usando nostr-tools
          const decoded = nip19.decode(value);
          if (decoded.type === 'npub') {
            pubkey = decoded.data as string;

            break;
          } else {
            toast.info('Oops...', {
              description: 'Invalid public key format.',
            });

            return null;
          }
        }

        case /^[0-9a-fA-F]{64}$/.test(value): {
          pubkey = value;

          break;
        }

        default: {
          toast.info('Oops...', {
            description: 'Invalid public key format.',
          });

          return null;
        }
      }

      router.push(`/p/${pubkey}`);
    } else {
      toast.info('Oops...', {
        description: 'No public key provided.',
      });

      return null;
    }

    return null;
  };

  useEffect(() => {
    if (!profileParams || Object.keys(profileParams).length === 0) return;
    if (!ndk) return;

    const fetchProfile = async () => {
      setProfile(null);

      try {
        const localUser = await handleGet(profileParams?.pubkey || '');

        if (!localUser) {
          const nostrResponse = ndk.getUser(profileParams);
          const nostrProfile: NDKUserProfile | null = await nostrResponse.fetchProfile();

          const profile: Profile = {
            id: profileParams?.pubkey || '',
            banner: nostrProfile?.banner || '',
            avatar: nostrProfile?.image || '',
            name: nostrProfile?.displayName || '',
            address: nostrProfile?.lud16 || nostrProfile?.nip05 || '',
            lud16: nostrProfile?.lud16 || '',
            nip05: nostrProfile?.nip05 || '',
            about: nostrProfile?.about || '',
            website: nostrProfile?.website || '',
            created_at: Number(nostrProfile?.created_at),
            npub: String(nostrProfile?.npub),
          };

          await handleAdd(profile);
          setProfile(profile);
        } else {
          setProfile(localUser);
        }

        return null;
      } catch (err) {
        console.log('Oops, algo paso en fetchProfile');
      }
    };

    !profile && fetchProfile();
  }, [profileParams, ndk, profile]);

  return { profile, search: handleSearch };
};
