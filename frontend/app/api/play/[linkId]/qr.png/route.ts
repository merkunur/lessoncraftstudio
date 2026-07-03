import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { resolvePlayLink } from '@/lib/studio/story-gate';

// Accountless QR image for a story play link. Keyed by the link itself —
// a QR of a link, given the link, leaks nothing (the link IS the
// capability), which is what lets the share drawer use a plain <img>
// without Bearer headers. Revoked/deleted → 404 like every play route.

export const dynamic = 'force-dynamic';

const CANONICAL_BASE = 'https://www.lessoncraftstudio.com'; // §A.10 www-form

interface Params {
  params: { linkId: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  const link = await resolvePlayLink(params.linkId);
  if (!link) return new NextResponse('Not found', { status: 404 });

  const url =
    CANONICAL_BASE + '/' + (link.story.locale || 'en') + '/play/story/' + params.linkId;

  const png = await QRCode.toBuffer(url, {
    type: 'png',
    width: 480,
    margin: 1,
    errorCorrectionLevel: 'M',
    color: { dark: '#146B5E', light: '#FFFFFF' }, // Direction A teal on white
  });

  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': String(png.length),
      'Cache-Control': 'private, max-age=300',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
