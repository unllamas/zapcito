// Packages
import type { Metadata } from 'next';

// Libs and hooks
import { Feedback } from '@/features/feedback';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Feedback | ${APP_TITLE}`,
};

export default function Page() {
  return (
    <>
      <Feedback />
    </>
  );
}
