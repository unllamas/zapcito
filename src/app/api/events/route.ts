import { NextRequest, NextResponse } from 'next/server';
import { fetchNostrEvent } from '@/lib/nostr-utils';

export async function GET(request: NextRequest) {
  const ids = request.nextUrl.searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 });
  }

  const idArray = ids.split(',');

  try {
    const events = await Promise.all(idArray.map((id) => fetchNostrEvent({ ids: [id], kinds: [1] })));

    const data = events.map((event) => ({
      id: event?.id,
      created_at: event?.created_at,
      pubkey: event?.pubkey,
      content: event?.content,
      tags: event?.tags,
      kind: event?.kind,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching events:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
