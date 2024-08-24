// Packages
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIdentity, useNostr } from '@lawallet/react';
import { getPublicKey } from '@lawallet/nostr-tools';
import { toast } from 'sonner';

// Libs and hooks
import { useAuthStore } from '@/stores/use-auth-store';
import { useProfile } from './use-profile';

// Types
import { Auth } from '@/lib/indexeddb';

export const useAuth = () => {
  const router = useRouter();

  const { initializeSigner } = useNostr();

  // Flow
  const [user, setUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Internal
  const identity = useIdentity();

  const { handleAdd, handleGet, handleDelete } = useAuthStore();
  const { profile } = useProfile(user ? { pubkey: user.id } : undefined);

  const handleLoginWithSecretKey = async (props: { secretKey: string }) => {
    const { secretKey } = props;

    if (secretKey.length < 32) {
      toast.warning('The private key must have a minimum of 32 digits.');
      return;
    }

    setLoading(true);

    try {
      const pubkey: string = getPublicKey(secretKey);

      identity.initializeFromPrivateKey(secretKey).then((res) => {
        if (res) {
          const IdentityToSave: Auth = {
            id: pubkey,
            secret: secretKey,
          };

          handleAdd(IdentityToSave).then(() => {
            setUser(IdentityToSave);
            initializeSigner(identity.signer);
            router.push('/');
          });
        }
      });
    } catch (err) {
      toast.warning('An error occurred while logging in.');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await handleDelete().then(() => {
      setUser(null);
      toast.success('Session closed.');
    });
  };

  useEffect(() => {
    const getUser = () => {
      handleGet().then((user) => setUser(user));
    };

    !user && getUser();
  }, [user, handleLoginWithSecretKey, handleLogout, profile]);

  return {
    user,
    profile,
    loading,
    loginWithSecretKey: handleLoginWithSecretKey,
    logout: handleLogout,
  };
};
