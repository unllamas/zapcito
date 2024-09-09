import dynamic from 'next/dynamic';

const MainLayout = dynamic(() => import('@/components/layouts/main-layout').then((mod) => mod.MainLayout), {
  loading: () => (
    <div className='flex justify-center items-center w-full h-full'>
      <p className='font-bold'>Loading...</p>
    </div>
  ),
  ssr: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
