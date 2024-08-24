import Dexie, { Table } from 'dexie';

export interface Auth {
  id: string; // Public key on hex
  secret: string; // Private key on hex
}

// Create db
class ExampleDB extends Dexie {
  auth!: Table<Auth, string>;

  constructor() {
    super('example');
    this.version(1).stores({
      auth: 'id, secret',
    });
  }
}

export const database = new ExampleDB();
