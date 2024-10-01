import { NextRequest, NextResponse } from 'next/server';
import { NDKFilter } from '@nostr-dev-kit/ndk';
import { fetchNostrEvent } from '@/lib/nostr-utils';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
  }

  const filter: NDKFilter = {
    ids: [id],
    kinds: [1],
  };

  try {
    const event = await fetchNostrEvent(filter);

    const data = {
      created_at: event?.created_at,
      pubkey: event?.pubkey,
      content: event?.content,
      tags: event?.tags,
      kind: event?.kind,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching user posts:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
