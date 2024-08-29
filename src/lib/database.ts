import { NDKUserProfile } from '@nostr-dev-kit/ndk';
import Dexie, { Table } from 'dexie';

export interface Auth {
  id: string; // Public key on hex
  secret?: string; // Private key on hex
}

// Create db
class ExampleDB extends Dexie {
  auth!: Table<Auth, string>;
  profiles!: Table<NDKUserProfile, string>;

  constructor() {
    super('example');
    this.version(2).stores({
      auth: 'id, secret',
      profiles: 'id, banner, image, displayName, lud06, lud16, nip05, about, bio, website, created_at, npub',
    });
  }
}

export const database = new ExampleDB();
