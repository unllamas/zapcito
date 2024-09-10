'use client';

import dynamic from 'next/dynamic';
import { useAutoLogin } from 'nostr-hooks';

const AuthLayout = dynamic(() => import('@/components/layouts/auth-layout').then((mod) => mod.AuthLayout), {
  loading: () => (
    <div className='flex justify-center items-center w-full h-full'>
      <p className='font-bold'>Loading...</p>
    </div>
  ),
  ssr: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  useAutoLogin();

  return <AuthLayout>{children}</AuthLayout>;
}
