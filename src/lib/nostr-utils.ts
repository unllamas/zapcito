import NDK from '@nostr-dev-kit/ndk';

import { RELAYS } from '@/config/constants';

export const ndk = new NDK({ explicitRelayUrls: RELAYS });
