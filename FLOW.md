This document is work in progress. Information is probably outdated. Dont't trust, verify.

## Table of Contents

- [Overview](#overview)
- [Payment](#payment)
  - [Generate invoice](#generate-invoice)
- [Auth](#auth)
  - [Login with private key](#login-with-private-key)
- [Database Structure](#database-structure)

## Overview

...

## Payment

...

### Generate invoice

...

## Auth

...

### Login with private key

...

## Database Structure

The database is managed using `Dexie`, a library that simplifies interaction with [IndexedDB](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API). 

In this case, the database is named `example` and contains a single table called `auth`:

``` typescript
import Dexie, { Table } from 'dexie';

export interface Auth {
  id: string; // Public key on hex
  secret: string; // Private key on hex
}

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
```