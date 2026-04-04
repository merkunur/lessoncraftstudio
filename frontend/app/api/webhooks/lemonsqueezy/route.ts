/**
 * Lemon Squeezy Webhook Handler
 *
 * POST /api/webhooks/lemonsqueezy
 *
 * Handles:
 * - order_created → create Purchase record (unlocks apps for buyer)
 * - order_refunded → revoke Purchase
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { getAppsForLSProduct } from '@/config/lemonsqueezy-products';

export const dynamic = 'force-dynamic';

// ==========================================
// SIGNATURE VERIFICATION
// ==========================================

function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('LEMONSQUEEZY_WEBHOOK_SECRET not set');
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// ==========================================
// WEBHOOK HANDLER
// ==========================================

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature') || '';

    // Verify signature
    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error('LS webhook: invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;
    const orderId = String(payload.data?.id || '');
    const eventId = `ls_${eventName}_${orderId}`;

    // Idempotency check
    const existing = await prisma.lSWebhookEvent.findUnique({
      where: { eventId },
    });
    if (existing) {
      return NextResponse.json({ message: 'Already processed' }, { status: 200 });
    }

    // Record webhook event
    await prisma.lSWebhookEvent.create({
      data: {
        eventId,
        eventType: eventName,
        orderId,
        payload: payload as any,
        status: 'processing',
      },
    });

    // Route event
    switch (eventName) {
      case 'order_created':
        await handleOrderCreated(payload, eventId);
        break;
      case 'order_refunded':
        await handleOrderRefunded(payload, eventId);
        break;
      default:
        // Mark as processed but ignored
        await prisma.lSWebhookEvent.update({
          where: { eventId },
          data: { status: 'processed' },
        });
    }

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error: any) {
    console.error('LS webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// ==========================================
// EVENT HANDLERS
// ==========================================

async function handleOrderCreated(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    const orderId = String(payload.data?.id);
    const buyerEmail = (attrs.user_email || '').toLowerCase().trim();
    const buyerName = attrs.user_name || null;
    const amount = attrs.total || 0; // In cents
    const currency = attrs.currency || 'USD';

    // Get the first order item's product ID
    const firstItem = attrs.first_order_item;
    const lsProductId = String(firstItem?.product_id || '');

    // Resolve which apps this product unlocks
    const appsAccess = getAppsForLSProduct(lsProductId);

    if (!buyerEmail || !lsProductId) {
      throw new Error(`Missing data: email=${buyerEmail}, productId=${lsProductId}`);
    }

    // Create purchase record
    await prisma.purchase.create({
      data: {
        lsOrderId: orderId,
        lsProductId,
        buyerEmail,
        buyerName,
        appsAccess,
        amount,
        currency,
        status: 'active',
      },
    });

    console.log(`LS purchase: ${buyerEmail} bought product ${lsProductId} (${appsAccess.length} apps)`);

    // Mark webhook as processed
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'processed' },
    });
  } catch (error: any) {
    console.error('LS order_created error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}

async function handleOrderRefunded(payload: any, eventId: string) {
  try {
    const orderId = String(payload.data?.id);

    // Revoke the purchase
    await prisma.purchase.updateMany({
      where: { lsOrderId: orderId },
      data: {
        status: 'refunded',
        refundedAt: new Date(),
      },
    });

    console.log(`LS refund: order ${orderId} revoked`);

    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'processed' },
    });
  } catch (error: any) {
    console.error('LS order_refunded error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}
