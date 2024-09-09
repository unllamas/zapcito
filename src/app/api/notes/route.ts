import { NextRequest, NextResponse } from 'next/server';
import { NDKFilter } from '@nostr-dev-kit/ndk';
import { fetchNostrEvents } from '@/lib/nostr-utils';

export async function GET(request: NextRequest) {
  const pubkey = request.nextUrl.searchParams.get('pubkey');

  if (!pubkey) {
    return NextResponse.json({ error: 'Missing pubkey parameter' }, { status: 400 });
  }

  const filter: NDKFilter = {
    authors: [pubkey],
    kinds: [1],
    limit: 50,
  };

  try {
    const nostrEvents = await fetchNostrEvents(filter);

    const notes = nostrEvents.map((event) => ({
      id: event.id,
      pubkey: event.pubkey,
      content: event.content,
      created_at: event.created_at,
      tags: event.tags,
    }));

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching user posts:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
