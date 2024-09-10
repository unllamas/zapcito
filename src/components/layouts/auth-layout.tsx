'use client';

import { useAutoLogin } from 'nostr-hooks';

type LayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: LayoutProps) {
  useAutoLogin();

  return <div className='flex justify-center items-center h-full'>{children}</div>;
}
