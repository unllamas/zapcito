import { createConfig, createSignerWithPrivateKey } from '@lawallet/react';

export const RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.hodl.ar',
  'wss://relay.lawallet.ar',
  'wss://nostr-pub.wellorder.net',
  'wss://nos.lol',
  'wss://soloco.nl',
  'wss://relay.primal.net',
  'wss://nostr.wine',
];

const signer = createSignerWithPrivateKey(process.env.SIGNER_KEY || '');

export const paymentConfig = createConfig({
  federationId: 'lawallet.ar',
  endpoints: {
    lightningDomain: 'https://lawallet.ar',
    gateway: 'https://api.lawallet.ar',
  },
  relaysList: RELAYS,
  signer,
});
