import Dexie, { Table } from 'dexie';

// Define interfaces
export interface Auth {
  id: string;
  secret: string;
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
