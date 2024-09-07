// Packages
import { useState, useEffect } from 'react';
import { generateSecretKey, getPublicKey, nip19 } from 'nostr-tools';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { toast } from 'sonner';

import { Auth, database } from '@/lib/database';

// Types
import { NostrWindow } from '@/types/extension';

const w: NostrWindow | undefined = typeof window !== 'undefined' ? (window as any) : undefined;

export const useAuth = () => {
  // Flow
  const [user, setUser] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginWithSecretKey = async (value: string): Promise<boolean | void> => {
    if (isLoading) return;

    setIsLoading(true);

    if (value.length < 32) {
      setIsLoading(false);

      toast.warning('The private key must have a minimum of 32 digits.');

      return;
    }

    let bytes: Uint8Array;

    if (value.startsWith('nsec')) {
      const { data } = nip19.decode(value);
      // @ts-ignore
      bytes = data;
    } else {
      bytes = hexToBytes(value);
    }

    try {
      const pubkey = getPublicKey(bytes);

      const auth: Auth = {
        id: pubkey,
        secret: bytesToHex(bytes),
      };

      await database.auth.put(auth);

      setUser(auth);
      setIsLoading(true);

      return true;
    } catch (err) {
      console.log('err', err);
      setIsLoading(false);

      toast.warning('An error occurred while logging in.');

      return false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    await database.auth.clear();

    setUser(null);
    setIsLoading(false);

    toast.success('Session closed.');
  };

  const handleGenerateSecretKey = (): string => {
    const secret = generateSecretKey();

    return bytesToHex(secret);
  };

  const handleLoginWithExtension = async (): Promise<boolean | void> => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (!w?.nostr) {
        toast.warning('GetAlby is not installed or is not available');
        throw new Error('GetAlby is not installed or is not available');
      }

      // @ts-ignore
      const pubkey = await w.nostr.getPublicKey();

      const authStore: Auth = {
        id: pubkey,
        secret: undefined,
      };

      await database.auth.put(authStore);

      setUser(authStore);
      setIsLoading(false);

      toast.success('Logged with extension');

      return true;
    } catch (error) {
      toast.warning('handleLoginWithExtension: An error occurred while logging in.');
      setIsLoading(false);

      return false;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await database.auth.toArray();
      if (data?.length > 0) {
        const { id, secret } = data[0];

        if (secret) {
          setUser({ id, secret });
        } else {
          setUser({ id, secret: undefined });
        }
      }
    };

    !user && getUser();
  }, [user, handleLoginWithSecretKey, handleLoginWithExtension, handleLogout]);

  return {
    user,
    // signer,
    isLoading,
    loginWithSecretKey: handleLoginWithSecretKey,
    loginWithExtention: handleLoginWithExtension,
    logout: handleLogout,
    generateSecret: handleGenerateSecretKey,
  };
};
