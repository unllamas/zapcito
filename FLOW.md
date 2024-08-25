This document is work in progress. Information is probably outdated. Dont't trust, verify.

## Table of Contents

- [Overview](#overview)
- [Database Structure](#database-structure)
  - [Auth](#auth)
  - [Profile](#profile)
- [Auth](#auth)
  - [Login with private key](#login-with-private-key)
- [Payment](#payment)
  - [Generate invoice](#generate-invoice)

## Overview

...

## Database Structure

The database is managed using `Dexie`, a library that simplifies interaction with [IndexedDB](https://developer.mozilla.org/es/docs/Web/API/IndexedDB_API). 

### Auth

For easy handling of the authentication system we have decided that the table has the following structure:

``` typescript
interface Auth {
  id: string; // Public key on hex
  secret: string; // Private key on hex
}
```

### Profile

Because [Kind: 0](https://github.com/nostr-protocol/nips/blob/master/01.md) events can be somewhat chaotic, we've decided to normalize it as follows:

``` typescript
interface Profile {
  id: string; // Pubkey on hex
  banner: string;
  avatar: string; // Variant: image, picture
  name: string; // Variant: displayName, display_name
  lud16: string;
  nip05: string;
  about: string;
  website: string;
  created_at: number;
}
```

...

## Auth

...

### Login with private key

...

## Payment

...

### Generate invoice