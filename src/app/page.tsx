// Packages
import { Metadata } from 'next';

// Components
import { Home } from '@/pages/home';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Home | ${APP_TITLE}`,
};

export default function Page() {
  return (
    <>
      <Home />
    </>
  );
}
