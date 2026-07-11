import { NextRequest } from 'next/server';
import { servePdfProxy } from '@/lib/quota-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/quota/answer-key/[deckId] — metered answer-key proxy (lib/quota-proxy). */
export async function GET(
  request: NextRequest,
  { params }: { params: { deckId: string } }
) {
  return servePdfProxy(request, params.deckId, 'answerKey');
}
