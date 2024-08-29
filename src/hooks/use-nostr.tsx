import { useNdk } from 'nostr-hooks';
import { defaultNdk } from '@/config/constants';

export const useNostr = () => {
  const { ndk, setNdk } = useNdk();

  setNdk(defaultNdk);

  return { ndk };
};
