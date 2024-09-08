export type NostrRelay = { read: boolean; write: boolean };

export type NostrRelays = Record<string, NostrRelay>;

export type NostrRelayEvent = {
  kind: number;
  content: any;
  created_at: number;
  tags: string[][];
};

export type NostrRelaySignedEvent = NostrRelayEvent & {
  id: string;
  pubkey: string;
  sig: string;
};

export type NostrExtension = {
  getPublicKey: () => Promise<string>;
  getRelays: () => Promise<NostrRelays>;
  signEvent: (event: NostrRelayEvent) => Promise<NostrRelaySignedEvent>;
  nip04: {
    encrypt: (pubkey: string, message: string) => Promise<string>;
    decrypt: (pubkey: string, message: string) => Promise<string>;
  };
  enable: () => Promise<void>;
  isEnabled: () => Promise<boolean>;
};

interface SendPaymentResponse {
  preimage: string;
}

export type WebLnExtension = {
  enable: () => Promise<void>;
  sendPayment: (req: string) => Promise<SendPaymentResponse>;
};

export type NostrWindow = Window &
  typeof globalThis & {
    nostr?: NostrExtension;
    webln?: WebLnExtension;
    walletStore: any;
  };
