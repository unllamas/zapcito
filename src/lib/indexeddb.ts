import Dexie, { Table } from 'dexie';

// Define interfaces
export interface Auth {
  id: string;
  secret: string;
}

export interface Profile {
  id: string;
  banner: string | null;
  picture: string | null;
  name: string | null;
  about: string | null;
  lud16: string | null;
  nip05: string | null;
  website: string | null;
}

// Create db
class ExampleDB extends Dexie {
  auth!: Table<Auth, string>;
  profiles!: Table<Profile>;

  constructor() {
    super('example');
    this.version(1).stores({
      auth: 'id, secret',
      profiles: 'id, banner, picture, name, about, lud16, nip05, website',
    });
  }
}

export const database = new ExampleDB();
