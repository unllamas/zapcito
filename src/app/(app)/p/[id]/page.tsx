// Packages
import type { Metadata } from 'next';

// Libs and hooks
import { Profile } from '@/features/profile';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Profile | ${APP_TITLE}`,
};

type Props = {
  params: { id: string };
};

export default function Page(props: Props) {
  const { params } = props;

  return (
    <>
      <Profile value={params?.id} />
    </>
  );
}
