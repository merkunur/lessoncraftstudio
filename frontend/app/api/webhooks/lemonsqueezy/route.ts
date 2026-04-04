/**
 * Lemon Squeezy Webhook Handler
 *
 * POST /api/webhooks/lemonsqueezy
 *
 * Handles:
 * - order_created → create Purchase + auto-create user account + send email
 * - order_refunded → revoke Purchase
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getAppsForLSProduct } from '@/config/lemonsqueezy-products';
import { generatePasswordResetToken, hashToken } from '@/lib/auth-utils';
import { sendPasswordResetEmail } from '@/lib/email';

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

  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch {
    return false;
  }
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
// ORDER CREATED
// ==========================================

async function handleOrderCreated(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    const orderId = String(payload.data?.id);
    const buyerEmail = (attrs.user_email || '').toLowerCase().trim();
    const buyerName = attrs.user_name || null;
    const amount = attrs.total || 0;
    const currency = attrs.currency || 'USD';

    // Get the first order item's product ID
    const firstItem = attrs.first_order_item;
    const lsProductId = String(firstItem?.product_id || '');

    // Resolve which apps this product unlocks
    const appsAccess = getAppsForLSProduct(lsProductId);

    if (!buyerEmail || !lsProductId) {
      throw new Error(`Missing data: email=${buyerEmail}, productId=${lsProductId}`);
    }

    // Find or create user account
    let user = await prisma.user.findUnique({
      where: { email: buyerEmail },
    });

    let isNewAccount = false;

    if (!user) {
      // Auto-create account for new buyer
      const nameParts = (buyerName || '').trim().split(/\s+/);
      const tempPassword = crypto.randomBytes(24).toString('hex');
      const passwordHash = await bcrypt.hash(tempPassword, 12);

      user = await prisma.user.create({
        data: {
          email: buyerEmail,
          passwordHash,
          firstName: nameParts[0] || null,
          lastName: nameParts.slice(1).join(' ') || null,
          emailVerified: true,
          emailVerifiedAt: new Date(),
        },
      });

      isNewAccount = true;
      console.log(`LS webhook: created account for ${buyerEmail}`);
    }

    // Create purchase record linked to user
    await prisma.purchase.create({
      data: {
        lsOrderId: orderId,
        lsProductId,
        buyerEmail,
        buyerName,
        userId: user.id,
        appsAccess,
        amount,
        currency,
        status: 'active',
      },
    });

    console.log(`LS purchase: ${buyerEmail} bought product ${lsProductId} (${appsAccess.length} apps, user: ${user.id})`);

    // Send "set your password" email for new accounts
    if (isNewAccount) {
      try {
        const resetToken = generatePasswordResetToken();
        const hashedToken = hashToken(resetToken);

        await prisma.passwordReset.create({
          data: {
            userId: user.id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours (longer than normal reset)
          },
        });

        await sendPasswordResetEmail({
          email: buyerEmail,
          firstName: user.firstName || 'there',
          token: resetToken,
          language: 'en',
        });

        console.log(`LS webhook: sent password setup email to ${buyerEmail}`);
      } catch (emailErr) {
        console.error(`LS webhook: failed to send email to ${buyerEmail}:`, emailErr);
        // Don't fail the webhook — purchase is recorded, user can use "forgot password" later
      }
    }

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

// ==========================================
// ORDER REFUNDED
// ==========================================

async function handleOrderRefunded(payload: any, eventId: string) {
  try {
    const orderId = String(payload.data?.id);

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
