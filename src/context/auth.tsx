'use client';

import { useAutoLogin } from 'nostr-hooks';

export const AuthContext = ({ children }: any) => {
  useAutoLogin();

  return children;
};
