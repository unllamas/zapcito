import { useState, useEffect, useCallback } from 'react';
import { finalizeEvent, generateSecretKey, getPublicKey, nip19, Event } from 'nostr-tools';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { toast } from 'sonner';
import { Auth, database } from '@/lib/database';
import { NostrWindow } from '@/types/extension';

interface UseAuthReturn {
  user: Auth | null;
  signer: (event: Omit<Event, 'sig'>) => Event;
  isLoading: boolean;
  loginWithSecretKey: (value: string) => Promise<boolean | void>;
  loginWithExtension: () => Promise<boolean | void>;
  logout: () => Promise<void>;
  generateSecret: () => string;
}

const w: NostrWindow | undefined = typeof window !== 'undefined' ? (window as any) : undefined;

/**
 * Custom hook for authentication and user management
 * @returns {UseAuthReturn} Object containing user data and authentication methods
 */
export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handles login with a secret key
   * @param {string} value - The secret key
   * @returns {Promise<boolean | void>} True if login successful, false otherwise
   */
  const handleLoginWithSecretKey = async (value: string): Promise<boolean | void> => {
    if (isLoading) return;
    setIsLoading(true);

    if (value.length < 32) {
      setIsLoading(false);
      toast.warning('The private key must have a minimum of 32 digits.');
      return false;
    }

    try {
      // @ts-ignore
      const bytes: Uint8Array = value.startsWith('nsec') ? nip19.decode(value).data : hexToBytes(value);
      const pubkey = getPublicKey(bytes);

      const auth: Auth = {
        id: pubkey,
        secret: bytesToHex(bytes),
      };

      await database.auth.put(auth);
      setUser(auth);
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      toast.warning('An error occurred while logging in.');
      return false;
    }
  };

  /**
   * Handles user logout
   */
  const handleLogout = async (): Promise<void> => {
    await database.auth.clear();
    setUser(null);
    setIsLoading(false);
    toast.success('Session closed.');
  };

  /**
   * Generates a new secret key
   * @returns {string} The generated secret key
   */
  const handleGenerateSecretKey = (): string => {
    const secret = generateSecretKey();
    return bytesToHex(secret);
  };

  /**
   * Handles login with a browser extension (e.g., GetAlby)
   * @returns {Promise<boolean | void>} True if login successful, false otherwise
   */
  const handleLoginWithExtension = async (): Promise<boolean | void> => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!w?.nostr) {
        throw new Error('GetAlby is not installed or is not available');
      }

      const pubkey = await w.nostr.getPublicKey();
      const authStore: Auth = { id: pubkey, secret: undefined };

      await database.auth.put(authStore);

      setUser(authStore);
      setIsLoading(false);
      toast.success('Logged in with extension');

      return true;
    } catch (error) {
      console.error('Extension login error:', error);

      setIsLoading(false);
      toast.warning('An error occurred while logging in with the extension.');

      return false;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await database.auth.toArray();
      if (data?.length > 0) {
        const { id, secret } = data[0];
        setUser({ id, secret: secret || '' });
      }
    };

    if (!user) {
      getUser();
    }
  }, [user, handleGenerateSecretKey, handleLogout, handleLoginWithExtension]);

  /**
   * Signs an event with the user's secret key
   * @param {Omit<Event, 'sig'>} event - The event to be signed
   * @returns {Event} The signed event
   */
  const handleSign = useCallback(
    (event: any): Event => {
      if (!user?.secret) {
        throw new Error('No private key available. Please generate or import a key pair.');
      }

      return finalizeEvent(event, hexToBytes(user?.secret));
    },
    [user?.secret],
  );

  return {
    user,
    signer: handleSign,
    isLoading,
    loginWithSecretKey: handleLoginWithSecretKey,
    loginWithExtension: handleLoginWithExtension,
    logout: handleLogout,
    generateSecret: handleGenerateSecretKey,
  };
};
