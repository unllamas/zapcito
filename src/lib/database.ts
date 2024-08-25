import Dexie, { Table } from 'dexie';

export interface Auth {
  id: string; // Public key on hex
  secret: string; // Private key on hex
}

export interface Profile {
  id: string; // Pubkey on hex
  banner: string;
  avatar: string;
  name: string;
  lud16: string;
  nip05: string;
  about: string;
  website: string;
  created_at: number;
}

// Create db
class ExampleDB extends Dexie {
  auth!: Table<Auth, string>;
  profiles!: Table<Profile, string>;

  constructor() {
    super('example');
    this.version(1).stores({
      auth: 'id, secret',
      profiles: 'id, banner, avatar, name, lud16, nip05, about, website, created_at',
    });
  }
}

export const database = new ExampleDB();
