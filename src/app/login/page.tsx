// Packages
import type { Metadata } from 'next';

// Libs and hooks
import { Login } from '@/pages/login';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Login | ${APP_TITLE}`,
};

export default function Page() {
  return (
    <>
      <Login />
    </>
  );
}
