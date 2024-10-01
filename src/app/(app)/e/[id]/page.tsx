// Packages
import React from 'react';
import type { Metadata } from 'next';

// Libs and hooks
import { Event } from '@/features/event';

// Config
import { APP_TITLE } from '@/config/constants';

export const metadata: Metadata = {
  title: `Event | ${APP_TITLE}`,
};

type Props = {
  params: { id: string };
};

export default function Page(props: Props) {
  const { params } = props;

  return (
    <>
      <Event value={params?.id} />
    </>
  );
}
