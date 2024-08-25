import { create } from 'zustand';

import { Profile, database } from '@/lib/database';

// Define store interfaces
interface UseProfilesStoreProps {
  profile: Profile | null;
  handleAdd: (profile: Profile) => Promise<void>;
  handleDelete: () => Promise<void>;
  handleGet: (id: string) => Promise<Profile | null>;
}

// Create the Zustand stores
export const useProfilesStore = create<UseProfilesStoreProps>((set) => ({
  profile: null,

  handleAdd: async (profile: Profile) => {
    await database.profiles.put(profile);
    set({ profile });
  },

  handleDelete: async () => {
    await database.profiles.clear();
    set({ profile: null });
  },

  handleGet: async (id: string) => {
    const profile = await database.profiles.get(id);
    if (profile) {
      set({ profile });
      return profile;
    }

    return null;
  },
}));
