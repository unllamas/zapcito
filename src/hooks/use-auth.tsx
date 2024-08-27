// Packages
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useIdentity, useNostr } from '@lawallet/react';
import { getPublicKey, generatePrivateKey } from '@lawallet/nostr-tools';
import { toast } from 'sonner';

// Libs and hooks
import { useAuthStore } from '@/stores/use-auth-store';
import { useProfile } from './use-profile';

// Types
import { Auth } from '@/lib/database';

export const useAuth = () => {
  const router = useRouter();

  // Flow
  const [user, setUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Internal
  // const { initializeSigner } = useNostr();
  // const identity = useIdentity();
  const { handleAdd, handleGet, handleDelete } = useAuthStore();

  const { profile } = useProfile(user ? { pubkey: user.id } : undefined);

  const handleLoginWithSecretKey = async (value: string) => {
    if (value.length < 32) {
      toast.warning('The private key must have a minimum of 32 digits.');
      return;
    }

    setLoading(true);

    // TO-DO
    // Revisar que no ingresa con @hodl.ar
    try {
      const pubkey: string = getPublicKey(value);

      const AuthSave: Auth = {
        id: pubkey,
        secret: value,
      };

      handleAdd(AuthSave).then(() => {
        setUser(AuthSave);
        // initializeSigner(identity.signer);
        router.push('/');
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

  const handleGenerateSecretKey = () => {
    const secret = generatePrivateKey();
    return secret;
  };

  const handleLoginWithExtension = async () => {
    try {
      if (typeof window.nostr === 'undefined') {
        toast.warning('GetAlby is not installed or is not available');
        throw new Error('GetAlby is not installed or is not available');
      }

      // @ts-ignore
      const pubkey = await window.nostr.getPublicKey();

      const AuthSave: Auth = {
        id: pubkey,
        secret: '',
      };

      handleAdd(AuthSave).then(() => {
        setUser(AuthSave);
        router.push('/');
      });
    } catch (error) {
      toast.warning('handleLoginWithExtension: An error occurred while logging in.');
    }
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
    loginWithExtension: handleLoginWithExtension,
    logout: handleLogout,
    generateKey: handleGenerateSecretKey,
  };
};
