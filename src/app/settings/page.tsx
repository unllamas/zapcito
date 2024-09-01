// Packages
import type { Metadata } from 'next';

// Libs and hooks
import { Settings } from '@/features/settings';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Settings | ${APP_TITLE}`,
};

export default function Page() {
  return (
    <>
      <Settings />
    </>
  );
}
