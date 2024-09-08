import { NextRequest, NextResponse } from 'next/server';
import { NDKFilter, NDKEvent } from '@nostr-dev-kit/ndk';

import { ndk } from '@/lib/nostr-utils';
import { handleError } from '@/lib/errors';

/**
 * Handles GET requests to fetch user following
 * @param {NextRequest} req - The incoming request object
 * @returns {Promise<NextResponse>} The response containing user following or an error
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const pubkey = req.nextUrl.searchParams.get('pubkey');

  try {
    if (!pubkey) {
      return NextResponse.json({ error: 'Invalid pubkey' }, { status: 400 });
    }

    const events = await nostrFetch(pubkey);

    const count = countFollowing(events);

    return NextResponse.json(count);
  } catch (error) {
    console.error('Error fetching user following:', error);
    return handleError(error);
  }
}

/**
 * Fetches the following event for a user
 * @param {string} pubkey - The public key of the user
 * @returns {Promise<NDKEvent | null>} The following event or null if not found
 */
async function nostrFetch(pubkey: string): Promise<NDKEvent | null> {
  const followingFilter: NDKFilter = {
    kinds: [3],
    authors: [pubkey],
    limit: 1,
  };

  await ndk.connect();
  const events = await ndk.fetchEvent(followingFilter);

  return events;
}

/**
 * Counts the number of following from an event
 * @param {NDKEvent | null} event - The event containing following information
 * @returns {number} The count of following
 */
function countFollowing(event: NDKEvent | null): number {
  return event ? event.tags.filter((tag) => tag[0] === 'p').length : 0;
}
