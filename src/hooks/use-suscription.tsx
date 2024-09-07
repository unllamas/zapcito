// Packages
import { useMemo } from 'react';
import { NDKFilter } from '@nostr-dev-kit/ndk';

// Libs and hooks
import { useSubscribe } from 'nostr-hooks';

interface HookProps {
  pubkey: string;
  filters?: NDKFilter[];
}

export const useSuscriptionHook = ({ pubkey, filters }: HookProps) => {
  const opts = useMemo(() => ({ closeOnEose: true }), [pubkey, filters]);

  // @ts-ignore
  const { events } = useSubscribe({ filters, opts });

  return { events };
};
