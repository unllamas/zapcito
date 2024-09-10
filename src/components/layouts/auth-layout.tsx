'use client';

type LayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: LayoutProps) {
  return <div className='flex justify-center items-center h-full'>{children}</div>;
}
