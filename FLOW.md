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
  secret?: string; // Private key on hex
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
  npub: string;
}
```

## Hooks

### Auth

``` javascript
import { useAuth } from '@/hooks/use-auth'

const MyComponent = () => {
  const {
    loading,
    loginWithExtention,
    loginWithSecretKey,
    logout,
  } = useAuth();

  return (
    <>
      <button disabled={loading} onClick={() => loginWithExtention()}>Login with extention</button>
      <button disabled={loading} onClick={() => loginWithSecretKey(secret)}>Login with secret key</button>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};
```

``` javascript
import { useAuth } from '@/hooks/use-auth'

const MyComponent = () => {
  const [secretKey, setSecretKey] = useState('');

  const { generateKey } = useAuth();

  const handleGenerateSecretKey = () => {
    const value = generateKey()
    setSecretKey(value)
  }

  return (
    <>
      <input type="text" value={secretKey} readonly />

      <button onClick={() => handleGenerateSecretKey()}>Generate secret key</button>
    </>
  );
};
```

### Profile

``` javascript
import { useProfile } from '@/hooks/use-profile'

const MyComponent = () => {
  const { profile } = useProfile({ npub: 'npub...' });

  return (
    <>
      <p>{profile.name}</p>
      <p>{profile.npub}</p>
      <p>{profile.about}</p>
      <p>{profile.website}</p>
    </>
  );
};
```

## Payment

...

### Generate invoice