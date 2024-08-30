import NDK from '@nostr-dev-kit/ndk';

// App
export const APP_TITLE = 'Zapcito';

// Nostr
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

// Lightning Address: dios@lawallet.ar
export const DEFAULT_PUBKEY: string = 'cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547';

export const defaultNdk = new NDK({ explicitRelayUrls: RELAYS });

export const MOCK_BASE_PROFILES = [
  {
    pubkey: 'cee287bb0990a8ecbd1dee7ee7f938200908a5c8aa804b3bdeaed88effb55547',
    image: 'https://m.primal.net/HWWM.png',
    name: 'Jona |🇦🇷',
    lud16: 'dios@lawallet.ar',
  },
  {
    pubkey: '3748b5a01edca05ae9f7dd434679eb768193aa27262024ae89add65cdccc1965',
    image: 'https://i.imgur.com/YQyX3Lo.png',
    name: 'Fer',
    lud16: 'fer@hodl.ar',
  },
  {
    pubkey: '2ad91f1dca2dcd5fc89e7208d1e5059f0bac0870d63fc3bac21c7a9388fa18fd',
    image: 'https://m.primal.net/HcNC.gif',
    name: 'Agustin Kassis',
    lud16: 'agustin@lawallet.ar',
  },
  {
    pubkey: 'b632a9073e8337a228969f46badaac6eb0035d4a4e08fd37c82355d263559a11',
    image: 'https://image.nostr.build/8d71027dca097a196ae17935139415d3f6040a2ce83d3e7d5b1891164966221b.jpg',
    name: 'Jota',
    lud16: 'juan@lawallet.ar',
  },
  {
    pubkey: '10fe7e324ad92e91a2c915934b9a349fc21d15d19d638ab61ed15bf65cd9b9df',
    image: 'https://image.nostr.build/24a76de6e7f2082c831d836f1e943be4209e13ba3be6dc59f668bc33389be437.gif',
    name: 'Rapax',
    lud16: 'rapax@lawallet.ar',
  },
];
