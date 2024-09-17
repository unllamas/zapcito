// Packages
import type { Metadata } from 'next';

// Libs and hooks
import { Feed } from '@/features/feed';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Feed | ${APP_TITLE}`,
};

export default function Page() {
  return (
    <>
      <Feed />
    </>
  );
}
