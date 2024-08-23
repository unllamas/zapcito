'use client';

// Packages
import { useMemo } from 'react';
import { useActiveUser, useLogin, useProfile } from 'nostr-hooks';

export function useUser() {
  const { activeUser } = useActiveUser();
  const { logout } = useLogin();

  const { profile } = useProfile(
    useMemo(() => (activeUser?.pubkey ? { pubkey: activeUser?.pubkey } : undefined), [activeUser]),
  );

  return {
    activeUser,
    profile,
    logout,
  };
}
