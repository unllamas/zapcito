import { createConfig, createSignerWithPrivateKey } from '@lawallet/react';

import { RELAYS } from './constants';

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
