import { NextRequest, NextResponse } from 'next/server';
import { NDKEvent, NDKFilter } from '@nostr-dev-kit/ndk';

import { fetchNostrEvent, fetchNostrEvents } from '@/lib/nostr-utils';

/**
 * Handles GET requests to fetch user following
 * @param {NextRequest} req - The incoming request object
 * @returns {Promise<NextResponse>} The response containing user following or an error
 */
export async function GET(request: NextRequest) {
  const pubkey = request.nextUrl.searchParams.get('pubkey');

  if (!pubkey) {
    return NextResponse.json({ error: 'Missing pubkey parameter' }, { status: 400 });
  }

  try {
    // Fetch the most recent kind 3 event
    const filterFollowing: NDKFilter = {
      kinds: [3],
      authors: [pubkey],
      limit: 1,
    };

    const followingEvent = await fetchNostrEvent(filterFollowing);

    if (!followingEvent) {
      return NextResponse.json({ error: 'No following list found for this pubkey' }, { status: 404 });
    }

    // Extract the list of followed pubkeys
    const followingList = followingEvent.tags.filter((tag) => tag[0] === 'p').map((tag) => tag[1]);

    // Fetch notes from followed users
    const filterNotes: NDKFilter = {
      kinds: [1],
      authors: followingList,
      limit: 20,
    };

    const events = await fetchNostrEvents(filterNotes);

    const notes = events.map((event: NDKEvent) => ({
      id: event.id,
      pubkey: event.pubkey,
      content: event.content,
      created_at: event.created_at,
      tags: event.tags,
    }));

    // Sort notes from newest to oldest
    const sortedNotes = notes?.sort((a, b) => b?.created_at! - a?.created_at!);

    return NextResponse.json(sortedNotes);
  } catch (error) {
    console.error('Error fetching user feed:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
