import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /play/w/[linkId]/qr.png — QR code for a hosted worksheet's play URL.
 * Public (the QR encodes a public capability link); 404 for unknown links.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const linkId = params.linkId;
  if (!/^[a-z0-9]{6,20}$/i.test(linkId)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const row = await prisma.hostedWorksheet.findUnique({
    where: { linkId },
    select: { status: true },
  });
  if (!row || row.status !== 'live') {
    return new NextResponse('Not found', { status: 404 });
  }

  const png = await QRCode.toBuffer(
    `https://www.lessoncraftstudio.com/play/w/${linkId}`,
    { type: 'png', width: 480, margin: 2, color: { dark: '#146B5E', light: '#FFFFFF' } }
  );

  return new NextResponse(new Uint8Array(png), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
