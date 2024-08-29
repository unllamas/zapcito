// Packages
import type { Metadata } from 'next';

// Libs and hooks
import { Explore } from '@/features/explore';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Explore | ${APP_TITLE}`,
};

export default function Page() {
  return (
    <>
      <Explore />
    </>
  );
}
