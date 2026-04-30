/**
 * Lemon Squeezy Webhook Handler
 *
 * POST /api/webhooks/lemonsqueezy
 *
 * Handles:
 * - order_created → create Purchase + auto-create user account + send email
 * - order_refunded → revoke Purchase
 * - subscription_created → create Subscription + auto-create user account
 * - subscription_updated → update Subscription period / status
 * - subscription_cancelled → mark Subscription canceled
 * - subscription_payment_success → refresh Subscription period; ensure status active
 * - subscription_payment_failed → mark Subscription past_due
 *
 * Subscription handling per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.5 + SUBSCRIPTION-SCOPE.md.
 * Reuses verifyWebhookSignature (LEMONSQUEEZY_WEBHOOK_SECRET) and the user-resolve-or-create
 * pattern from handleOrderCreated. The Subscription row is keyed by lsSubscriptionId; the
 * is-LCS-subscription-active predicate at lib/subscription-helpers.ts matches on
 * lsSubscriptionId IS NOT NULL AND status = 'active'.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getAppsForLSProduct } from '@/config/lemonsqueezy-products';
import { SUBSCRIPTION_PRODUCT } from '@/config/lemonsqueezy-product-config';
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

    // Idempotency key: prefer LS's per-delivery X-Event-Id header (unique UUID per webhook
    // delivery, regardless of underlying entity) so subscription events that re-fire for the
    // same subscription (subscription_updated, subscription_payment_success, etc.) are not
    // blocked by the entity-level eventId pattern. Fall back to the legacy
    // ls_${eventName}_${orderId} pattern for older event types where the header is absent.
    const xEventId = request.headers.get('x-event-id') || '';
    const eventId = xEventId ? `ls_event_${xEventId}` : `ls_${eventName}_${orderId}`;

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
      case 'subscription_created':
        await handleSubscriptionCreated(payload, eventId);
        break;
      case 'subscription_updated':
        await handleSubscriptionUpdated(payload, eventId);
        break;
      case 'subscription_cancelled':
        await handleSubscriptionCancelled(payload, eventId);
        break;
      case 'subscription_payment_success':
        await handleSubscriptionPaymentSuccess(payload, eventId);
        break;
      case 'subscription_payment_failed':
        await handleSubscriptionPaymentFailed(payload, eventId);
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

// ==========================================
// SUBSCRIPTION HANDLERS
// ==========================================

/**
 * Map a Lemon Squeezy subscription status onto the existing schema's status enum.
 * LS statuses: on_trial, active, paused, past_due, unpaid, cancelled, expired.
 * Our schema (planName comment at schema.prisma:193): "active", "past_due", "canceled",
 * "incomplete", "unpaid". Note American spelling 'canceled' — preserved from existing schema.
 */
function mapLsStatusToSchemaStatus(lsStatus: string): string {
  switch (lsStatus) {
    case 'on_trial':
    case 'active':
      return 'active';
    case 'paused':
    case 'past_due':
    case 'unpaid':
      return 'past_due';
    case 'cancelled':
    case 'expired':
      return 'canceled';
    default:
      return lsStatus;
  }
}

/**
 * Resolve-or-create a user account by buyer email. Mirrors the auto-account-creation
 * pattern in handleOrderCreated. Used by handleSubscriptionCreated only; subscription
 * updates against missing users are logged and skipped (webhook ordering issue).
 */
async function resolveOrCreateUserByEmail(buyerEmail: string, buyerName: string | null) {
  let user = await prisma.user.findUnique({ where: { email: buyerEmail } });
  let isNewAccount = false;

  if (!user) {
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
    console.log(`LS subscription webhook: created account for ${buyerEmail}`);
  }

  return { user, isNewAccount };
}

async function handleSubscriptionCreated(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    const lsSubscriptionId = String(payload.data?.id || '');
    const lsProductId = String(attrs.product_id || '');
    const lsVariantId = String(attrs.variant_id || '');
    const buyerEmail = (attrs.customer_email || attrs.user_email || '').toLowerCase().trim();
    const buyerName = attrs.user_name || null;
    const lsStatus = String(attrs.status || 'active');
    const renewsAt = attrs.renews_at ? new Date(attrs.renews_at) : null;
    const trialEndsAt = attrs.trial_ends_at ? new Date(attrs.trial_ends_at) : null;

    if (!lsSubscriptionId || !lsProductId || !buyerEmail) {
      throw new Error(`Missing data: subId=${lsSubscriptionId}, productId=${lsProductId}, email=${buyerEmail}`);
    }

    // Verify this is OUR LCS subscription product, not some unrelated LS subscription.
    if (Number(lsProductId) !== SUBSCRIPTION_PRODUCT.productId) {
      console.warn(`LS subscription_created: ignoring non-LCS product ${lsProductId} (expected ${SUBSCRIPTION_PRODUCT.productId})`);
      await prisma.lSWebhookEvent.update({ where: { eventId }, data: { status: 'processed' } });
      return;
    }

    const { user, isNewAccount } = await resolveOrCreateUserByEmail(buyerEmail, buyerName);

    // Upsert the Subscription row keyed by userId (User has @unique on userId in Subscription).
    // The lsSubscriptionId @unique constraint also catches duplicate-create races.
    // Cast `data` as any: the local Prisma client predates the migration; production builds
    // regenerate the client and the cast becomes harmless.
    await (prisma.subscription as any).upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        lsSubscriptionId,
        lsVariantId,
        planName: SUBSCRIPTION_PRODUCT.slug,
        status: mapLsStatusToSchemaStatus(lsStatus),
        billingInterval: 'yearly',
        currentPeriodStart: new Date(),
        currentPeriodEnd: renewsAt,
        trialEnd: trialEndsAt,
      },
      update: {
        lsSubscriptionId,
        lsVariantId,
        planName: SUBSCRIPTION_PRODUCT.slug,
        status: mapLsStatusToSchemaStatus(lsStatus),
        billingInterval: 'yearly',
        currentPeriodEnd: renewsAt,
        trialEnd: trialEndsAt,
        canceledAt: null,
        cancelAtPeriodEnd: false,
      },
    });

    console.log(`LS subscription_created: ${buyerEmail} subscribed to ${SUBSCRIPTION_PRODUCT.slug} (user: ${user.id}, sub: ${lsSubscriptionId})`);

    if (isNewAccount) {
      try {
        const resetToken = generatePasswordResetToken();
        const hashedToken = hashToken(resetToken);

        await prisma.passwordReset.create({
          data: {
            userId: user.id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        });

        await sendPasswordResetEmail({
          email: buyerEmail,
          firstName: user.firstName || 'there',
          token: resetToken,
          language: 'en',
        });

        console.log(`LS subscription webhook: sent password setup email to ${buyerEmail}`);
      } catch (emailErr) {
        console.error(`LS subscription webhook: failed to send email to ${buyerEmail}:`, emailErr);
        // Don't fail the webhook — subscription is recorded.
      }
    }

    await prisma.lSWebhookEvent.update({ where: { eventId }, data: { status: 'processed' } });
  } catch (error: any) {
    console.error('LS subscription_created error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}

async function handleSubscriptionUpdated(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    const lsSubscriptionId = String(payload.data?.id || '');
    const lsStatus = String(attrs.status || '');
    const renewsAt = attrs.renews_at ? new Date(attrs.renews_at) : null;
    const endsAt = attrs.ends_at ? new Date(attrs.ends_at) : null;
    const cancelled = !!attrs.cancelled;

    if (!lsSubscriptionId) {
      throw new Error('Missing data: subscriptionId');
    }

    // Update the Subscription row keyed by lsSubscriptionId. If no row exists, log and skip
    // (webhook ordering issue: subscription_created should arrive first).
    const result = await (prisma.subscription as any).updateMany({
      where: { lsSubscriptionId },
      data: {
        status: mapLsStatusToSchemaStatus(lsStatus),
        currentPeriodEnd: renewsAt,
        cancelAtPeriodEnd: cancelled,
        canceledAt: cancelled && endsAt ? endsAt : null,
      },
    });

    if (result.count === 0) {
      console.warn(`LS subscription_updated: no Subscription row for lsSubscriptionId=${lsSubscriptionId} (webhook ordering issue?)`);
    } else {
      console.log(`LS subscription_updated: ${lsSubscriptionId} → ${mapLsStatusToSchemaStatus(lsStatus)} (renewsAt=${renewsAt?.toISOString() || 'null'})`);
    }

    await prisma.lSWebhookEvent.update({ where: { eventId }, data: { status: 'processed' } });
  } catch (error: any) {
    console.error('LS subscription_updated error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}

async function handleSubscriptionCancelled(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    const lsSubscriptionId = String(payload.data?.id || '');
    const endsAt = attrs.ends_at ? new Date(attrs.ends_at) : null;
    const cancelReason = attrs.cancel_reason || null;

    if (!lsSubscriptionId) {
      throw new Error('Missing data: subscriptionId');
    }

    // Per LS subscription lifecycle: 'cancelled' status means the user cancelled but
    // access continues until ends_at. Mark cancelAtPeriodEnd=true; status flips to
    // 'canceled' only at expiry (which fires a separate subscription_updated event with
    // status='expired', mapped to our 'canceled').
    const result = await (prisma.subscription as any).updateMany({
      where: { lsSubscriptionId },
      data: {
        status: mapLsStatusToSchemaStatus(String(attrs.status || 'cancelled')),
        cancelAtPeriodEnd: true,
        canceledAt: new Date(),
        cancelReason,
        currentPeriodEnd: endsAt,
      },
    });

    if (result.count === 0) {
      console.warn(`LS subscription_cancelled: no Subscription row for lsSubscriptionId=${lsSubscriptionId}`);
    } else {
      console.log(`LS subscription_cancelled: ${lsSubscriptionId} cancelled (endsAt=${endsAt?.toISOString() || 'null'}, reason=${cancelReason || 'unspecified'})`);
    }

    await prisma.lSWebhookEvent.update({ where: { eventId }, data: { status: 'processed' } });
  } catch (error: any) {
    console.error('LS subscription_cancelled error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}

async function handleSubscriptionPaymentSuccess(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    // LS subscription_payment_success payload has subscription_id at the top of attrs;
    // data.id is the invoice id, NOT the subscription id (per LS docs).
    const lsSubscriptionId = String(attrs.subscription_id || '');
    const lsStatus = String(attrs.status || 'paid');

    if (!lsSubscriptionId) {
      throw new Error('Missing data: subscription_id in payment_success payload');
    }

    // On successful renewal payment, ensure the subscription is marked active and clear any
    // past_due status. The associated subscription_updated event also fires with the new
    // renews_at; this handler is defensive in case ordering is unreliable.
    const result = await (prisma.subscription as any).updateMany({
      where: { lsSubscriptionId },
      data: {
        status: 'active',
        pastDueAt: null,
        unpaidInvoiceId: null,
      },
    });

    if (result.count === 0) {
      console.warn(`LS subscription_payment_success: no Subscription row for lsSubscriptionId=${lsSubscriptionId}`);
    } else {
      console.log(`LS subscription_payment_success: ${lsSubscriptionId} → active (lsStatus=${lsStatus})`);
    }

    await prisma.lSWebhookEvent.update({ where: { eventId }, data: { status: 'processed' } });
  } catch (error: any) {
    console.error('LS subscription_payment_success error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}

async function handleSubscriptionPaymentFailed(payload: any, eventId: string) {
  try {
    const attrs = payload.data?.attributes || {};
    const lsSubscriptionId = String(attrs.subscription_id || '');
    const invoiceId = String(payload.data?.id || '');

    if (!lsSubscriptionId) {
      throw new Error('Missing data: subscription_id in payment_failed payload');
    }

    const result = await (prisma.subscription as any).updateMany({
      where: { lsSubscriptionId },
      data: {
        status: 'past_due',
        pastDueAt: new Date(),
        unpaidInvoiceId: invoiceId,
      },
    });

    if (result.count === 0) {
      console.warn(`LS subscription_payment_failed: no Subscription row for lsSubscriptionId=${lsSubscriptionId}`);
    } else {
      console.log(`LS subscription_payment_failed: ${lsSubscriptionId} → past_due (invoice ${invoiceId})`);
    }

    await prisma.lSWebhookEvent.update({ where: { eventId }, data: { status: 'processed' } });
  } catch (error: any) {
    console.error('LS subscription_payment_failed error:', error);
    await prisma.lSWebhookEvent.update({
      where: { eventId },
      data: { status: 'failed', errorMessage: error.message },
    });
  }
}
