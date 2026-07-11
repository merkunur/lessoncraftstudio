import { NextRequest } from 'next/server';
import { servePdfProxy } from '@/lib/quota-proxy';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** GET /api/quota/pdf/[deckId] — metered printable-PDF proxy (lib/quota-proxy). */
export async function GET(
  request: NextRequest,
  { params }: { params: { deckId: string } }
) {
  return servePdfProxy(request, params.deckId, 'pdf');
}
