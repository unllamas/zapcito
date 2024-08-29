// Packages
import { useMemo } from 'react';

// Libs and hooks
import { convertToHex } from '@/lib/utils';
import { useSubscribe } from 'nostr-hooks';

export const useSuscriptionHook = (id: string) => {
  const valueToHex = useMemo(() => convertToHex(id) || '', [id]);

  const filters = useMemo(() => [{ authors: [valueToHex], kinds: [1], limit: 12 }], [valueToHex]);
  const opts = useMemo(() => ({ closeOnEose: true }), []);

  const { events } = useSubscribe({ filters, opts });

  return { events };
};
