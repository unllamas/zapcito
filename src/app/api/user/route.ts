import { NextRequest, NextResponse } from 'next/server';
import { NDKFilter } from '@nostr-dev-kit/ndk';

import { ndk, validateAndNormalizePubkey } from '@/lib/nostr-utils';

interface ProfileData {
  pubkey: string;
  name?: string;
  displayName?: string;
  about?: string;
  picture?: string;
  banner?: string;
  website?: string;
  nip05?: string;
  lud16?: string;
}

/**
 * Fetches the profile data from Nostr
 * @param pubkey The hex pubkey to fetch the profile for
 * @returns The profile data
 */
async function fetchNostrProfile(pubkey: string): Promise<ProfileData> {
  await ndk.connect();

  const filter: NDKFilter = { authors: [pubkey], kinds: [0], limit: 1 };
  const event = await ndk.fetchEvent(filter);

  if (!event) {
    throw new Error('Profile not found');
  }

  const content = JSON.parse(event.content);

  return {
    pubkey,
    name: content.displayName || content.display_name || content.name,
    about: content.about,
    picture: content.picture,
    banner: content.banner,
    website: content.website,
    nip05: content.nip05,
    lud16: content.lud16,
  };
}

export async function GET(request: NextRequest) {
  const pubkey = request.nextUrl.searchParams.get('pubkey');

  if (!pubkey) {
    return NextResponse.json({ error: 'Missing pubkey parameter' }, { status: 400 });
  }

  try {
    const normalizedPubkey = await validateAndNormalizePubkey(pubkey);
    const profile = await fetchNostrProfile(normalizedPubkey);

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching user profile:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
