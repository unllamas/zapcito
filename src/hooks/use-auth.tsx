// Packages
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { useIdentity, useNostr } from '@lawallet/react';
import { generateSecretKey, getPublicKey } from 'nostr-tools';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { toast } from 'sonner';
import { nip19 } from 'nostr-tools';

// Libs and hooks
import { useAuthStore } from '@/stores/use-auth-store';

// Types
import { Auth, database } from '@/lib/database';

export const useAuth = () => {
  const router = useRouter();

  // Flow
  const [user, setUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Internal
  // const { initializeSigner } = useNostr();
  // const identity = useIdentity();
  const { handleGet, handleDelete } = useAuthStore();

  // const { profile } = useProfile(user ? { pubkey: user.id } : undefined);

  const handleLoginWithSecretKey = async (value: string) => {
    setLoading(true);

    if (value.length < 32) {
      setLoading(false);
      toast.warning('The private key must have a minimum of 32 digits.');
      return;
    }

    let secretToBytes: Uint8Array;

    if (value.startsWith('nsec')) {
      const { data } = nip19.decode(value);
      // @ts-ignore
      secretToBytes = data;
    } else {
      secretToBytes = hexToBytes(value);
    }

    if (!secretToBytes) {
      toast.warning('Ups...');
      return;
    }

    const pubkey = getPublicKey(secretToBytes);

    const AuthSave: Auth = {
      id: pubkey,
      secret: value,
    };

    try {
      await database.auth.put(AuthSave);
      setUser(AuthSave);

      const npub = nip19.npubEncode(pubkey);
      router.push(`/p/${npub}`);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await handleDelete().then(() => {
      setUser(null);
      toast.success('Session closed.');
    });
  };

  const handleGenerateSecretKey = () => {
    const secret = generateSecretKey();
    return bytesToHex(secret);
  };

  const handleLoginWithExtention = async () => {
    setLoading(true);
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

    try {
      await database.auth.put(AuthSave);
      setUser(AuthSave);

      const npub = nip19.npubEncode(pubkey);
      router.push(`/p/${npub}`);
    } catch (error) {
      console.log('error', error);
      toast.warning('handleLoginWithExtention: An error occurred while logging in.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUser = () => {
      handleGet().then((user) => setUser(user));
    };

    !user && getUser();
  }, [user, handleLoginWithSecretKey, handleLogout]);

  return {
    user,
    // profile,
    loading,
    loginWithSecretKey: handleLoginWithSecretKey,
    loginWithExtention: handleLoginWithExtention,
    logout: handleLogout,
    generateSecret: handleGenerateSecretKey,
  };
};
