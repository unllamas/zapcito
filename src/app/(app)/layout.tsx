'use client';

import dynamic from 'next/dynamic';
import { useAutoLogin } from 'nostr-hooks';

const MainLayout = dynamic(() => import('@/components/layouts/main-layout').then((mod) => mod.MainLayout), {
  loading: () => (
    <div className='flex justify-center items-center w-full h-full'>
      <p className='font-bold'>Loading...</p>
    </div>
  ),
  ssr: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  useAutoLogin();

  return <MainLayout>{children}</MainLayout>;
}
