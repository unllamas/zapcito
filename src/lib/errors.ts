import { NextResponse } from 'next/server';

export function handleError(error: any) {
  console.error('Error fetching Nostr events:', error);
  return new NextResponse(JSON.stringify({ error: 'An error occurred while fetching events' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
