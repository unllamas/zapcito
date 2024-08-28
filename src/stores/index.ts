import NDK from '@nostr-dev-kit/ndk';
import { create } from 'zustand';

import { RELAYS } from '@/config/constants';

type NDKState = {
  ndk: NDK;
};

type NDKActions = {
  setNdk: (ndk: NDK) => void;
};

export const useNostr = create<NDKState & NDKActions>()((set) => ({
  ndk: new NDK({
    explicitRelayUrls: RELAYS,
  }),

  setNdk: (ndk) => set({ ndk }),
}));
