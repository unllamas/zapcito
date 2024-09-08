import NDK, { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';
import { nip05, nip19 } from 'nostr-tools';

import { RELAYS } from '@/config/constants';

export const ndk = new NDK({ explicitRelayUrls: RELAYS });

export async function validateAndNormalizePubkey(pubkey: string): Promise<string> {
  if (pubkey.startsWith('npub1')) {
    try {
      const { data } = nip19.decode(pubkey);
      return data as string;
    } catch (error) {
      throw new Error('Invalid npub');
    }
  } else if (/^[0-9a-fA-F]{64}$/.test(pubkey)) {
    return pubkey.toLowerCase();
  } else if (pubkey.includes('@')) {
    try {
      // @ts-ignore
      const { pubkey: resolvedPubkey } = await nip05.queryProfile(pubkey);
      if (!resolvedPubkey) throw new Error('NIP-05 resolution failed');
      return resolvedPubkey;
    } catch (error) {
      throw new Error('Invalid or unresolvable NIP-05 address');
    }
  }
  throw new Error('Invalid pubkey format');
}

export async function fetchNostrEvents(filter: NDKFilter): Promise<NDKEvent[]> {
  await ndk.connect();
  const events = await ndk.fetchEvents(filter);

  return Array.from(events);
}
