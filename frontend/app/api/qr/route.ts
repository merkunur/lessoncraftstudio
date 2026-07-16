import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

/**
 * GET /api/qr?u=<url> — QR PNG for a LessonCraftStudio URL.
 *
 * Serves the Center Board's assign-to-center station cards (and any
 * future own-site QR need). STRICTLY host-restricted: only https URLs
 * on our own host are encoded (apex is normalized to www per §A.10);
 * anything else is a 400 — this is not an open QR generator.
 */
const ALLOWED_HOSTS = new Set(['www.lessoncraftstudio.com', 'lessoncraftstudio.com']);

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get('u') || '';
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }
  if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname)) {
    return new NextResponse('Bad request', { status: 400 });
  }
  url.hostname = 'www.lessoncraftstudio.com';

  const png = await QRCode.toBuffer(url.toString(), {
    type: 'png',
    width: 480,
    margin: 2,
    color: { dark: '#146B5E', light: '#FFFFFF' },
  });

  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
