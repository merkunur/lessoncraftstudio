/**
 * WarriorPlus IPN (Instant Payment Notification) Webhook Handler
 *
 * POST /api/webhooks/warriorplus
 *
 * Handles:
 * - New sales → generates license key + sends delivery email
 * - Refunds → revokes license key
 * - Chargebacks → revokes license key
 *
 * WarriorPlus IPN sends POST data with these fields:
 * - WP_ACTION: "sale", "refund", "chargeback"
 * - WP_SALE_ID: unique transaction ID
 * - WP_BUYER_EMAIL: buyer email
 * - WP_BUYER_NAME: buyer name
 * - WP_BUYER_IP: buyer IP
 * - WP_ITEM_NAME: product name
 * - WP_ITEM_NUMBER: product ID (our internal mapping)
 * - WP_SALE_AMOUNT: sale amount
 * - WP_CURRENCY: currency code
 * - WP_AFFILIATE_ID: affiliate ID if applicable
 * - WP_AFFILIATE_AMOUNT: affiliate commission
 * - WP_SECURITY_KEY: shared secret for verification
 * - WP_REFUND_AMOUNT: refund amount (for refunds)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateLicenseKey, revokeLicenseByTransaction } from '@/lib/license-manager';
import { WPLUS_PRODUCTS, getAppsForProduct } from '@/config/warriorplus-products';
import { sendLicenseDeliveryEmail } from '@/lib/email-license';
import type { LicenseTier } from '@/lib/license-manager';
import type { AppId } from '@/config/warriorplus-products';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Security key must match what's configured in WarriorPlus
const WPLUS_SECURITY_KEY = process.env.WARRIORPLUS_SECURITY_KEY || '';

export async function POST(request: NextRequest) {
  try {
    // Parse the form data (WarriorPlus sends application/x-www-form-urlencoded)
    let body: Record<string, string>;
    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      body = {};
      formData.forEach((value, key) => {
        body[key] = value.toString();
      });
    } else if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      // Try form data as default
      const text = await request.text();
      body = {};
      const params = new URLSearchParams(text);
      params.forEach((value, key) => {
        body[key] = value;
      });
    }

    console.log(`[WPlus Webhook] Received: action=${body.WP_ACTION}, sale_id=${body.WP_SALE_ID}`);

    // Verify security key
    if (WPLUS_SECURITY_KEY && body.WP_SECURITY_KEY !== WPLUS_SECURITY_KEY) {
      console.error('[WPlus Webhook] Invalid security key');
      return NextResponse.json(
        { error: 'Invalid security key' },
        { status: 401 }
      );
    }

    const action = (body.WP_ACTION || '').toLowerCase();
    const saleId = body.WP_SALE_ID || '';
    const buyerEmail = body.WP_BUYER_EMAIL || '';
    const buyerName = body.WP_BUYER_NAME || '';
    const productNumber = body.WP_ITEM_NUMBER || '';
    const productName = body.WP_ITEM_NAME || '';
    const saleAmount = parseFloat(body.WP_SALE_AMOUNT || '0');
    const currency = body.WP_CURRENCY || 'USD';
    const affiliateId = body.WP_AFFILIATE_ID || null;
    const affiliateAmount = body.WP_AFFILIATE_AMOUNT ? parseFloat(body.WP_AFFILIATE_AMOUNT) : null;
    const buyerIp = body.WP_BUYER_IP || null;

    if (!saleId) {
      return NextResponse.json({ error: 'Missing sale ID' }, { status: 400 });
    }

    // Create event ID for idempotency
    const eventId = `wplus_${action}_${saleId}`;

    // Idempotency check
    const existingEvent = await prisma.wPlusWebhookEvent.findUnique({
      where: { eventId },
    });

    if (existingEvent && existingEvent.status === 'processed') {
      console.log(`[WPlus Webhook] Duplicate event: ${eventId}`);
      return NextResponse.json({ received: true, duplicate: true });
    }

    // Log event
    if (!existingEvent) {
      await prisma.wPlusWebhookEvent.create({
        data: {
          eventId,
          eventType: action,
          transactionId: saleId,
          status: 'processing',
          payload: body as any,
        },
      });
    }

    let processingError: string | null = null;

    try {
      switch (action) {
        case 'sale':
          await handleSale({
            saleId,
            buyerEmail,
            buyerName,
            buyerIp,
            productNumber,
            productName,
            saleAmount,
            currency,
            affiliateId,
            affiliateAmount,
          });
          break;

        case 'refund':
          await handleRefund({
            saleId,
            buyerEmail,
            refundAmount: parseFloat(body.WP_REFUND_AMOUNT || body.WP_SALE_AMOUNT || '0'),
            refundReason: body.WP_REFUND_REASON || 'Customer requested refund',
          });
          break;

        case 'chargeback':
          await handleChargeback({
            saleId,
            buyerEmail,
          });
          break;

        default:
          console.log(`[WPlus Webhook] Unknown action: ${action}`);
      }
    } catch (err: any) {
      processingError = err.message || 'Unknown error';
      console.error(`[WPlus Webhook] Processing error:`, err);
    }

    // Update event status
    await prisma.wPlusWebhookEvent.update({
      where: { eventId },
      data: {
        status: processingError ? 'failed' : 'processed',
        errorMessage: processingError,
      },
    });

    // Always return 200 to WarriorPlus to prevent retries
    return NextResponse.json({
      received: true,
      status: processingError ? 'error' : 'ok',
    });
  } catch (error: any) {
    console.error('[WPlus Webhook] Fatal error:', error);
    // Still return 200 to prevent WarriorPlus from hammering us
    return NextResponse.json({ received: true, status: 'error' });
  }
}

// ==========================================
// HANDLE SALE
// ==========================================

interface SaleData {
  saleId: string;
  buyerEmail: string;
  buyerName: string;
  buyerIp: string | null;
  productNumber: string;
  productName: string;
  saleAmount: number;
  currency: string;
  affiliateId: string | null;
  affiliateAmount: number | null;
}

async function handleSale(data: SaleData) {
  console.log(`[WPlus Webhook] Processing sale: ${data.saleId} for ${data.buyerEmail}`);

  // Map WarriorPlus product number to our internal product
  const product = findProductByWPlusNumber(data.productNumber);
  if (!product) {
    throw new Error(`Unknown product number: ${data.productNumber}`);
  }

  // Parse buyer name
  const nameParts = (data.buyerName || '').split(' ');
  const firstName = nameParts[0] || null;
  const lastName = nameParts.slice(1).join(' ') || null;

  // Generate license key
  const license = await generateLicenseKey({
    email: data.buyerEmail,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
    productId: product.id,
    productTier: product.tier,
    source: 'warriorplus',
    transactionId: data.saleId,
    appsAccess: product.apps as AppId[],
  });

  // Record transaction
  await prisma.wPlusTransaction.create({
    data: {
      transactionId: data.saleId,
      licenseKeyId: await getLicenseIdByKey(license.licenseKey),
      buyerEmail: data.buyerEmail,
      buyerName: data.buyerName || null,
      buyerIp: data.buyerIp,
      productId: product.id,
      productName: data.productName || product.name,
      amount: data.saleAmount,
      currency: data.currency,
      affiliateId: data.affiliateId,
      affiliateAmount: data.affiliateAmount,
      status: 'completed',
      rawPayload: data as any,
    },
  });

  // Send delivery email
  try {
    await sendLicenseDeliveryEmail({
      to: data.buyerEmail,
      buyerName: data.buyerName || data.buyerEmail,
      licenseKey: license.licenseKey,
      productName: product.name,
      productId: product.id,
      appsAccess: license.appsAccess,
      memberUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.lessoncraftstudio.com'}/member`,
    });
  } catch (emailError) {
    console.error('[WPlus Webhook] Failed to send delivery email:', emailError);
    // Don't throw — license was created successfully
  }

  console.log(`[WPlus Webhook] Sale processed: license=${license.licenseKey}`);
}

// ==========================================
// HANDLE REFUND
// ==========================================

interface RefundData {
  saleId: string;
  buyerEmail: string;
  refundAmount: number;
  refundReason: string;
}

async function handleRefund(data: RefundData) {
  console.log(`[WPlus Webhook] Processing refund: ${data.saleId}`);

  // Revoke license
  const revoked = await revokeLicenseByTransaction(data.saleId, `Refund: ${data.refundReason}`);

  // Update transaction record
  const transaction = await prisma.wPlusTransaction.findUnique({
    where: { transactionId: data.saleId },
  });

  if (transaction) {
    await prisma.wPlusTransaction.update({
      where: { id: transaction.id },
      data: {
        status: 'refunded',
        refundedAt: new Date(),
        refundAmount: data.refundAmount,
        refundReason: data.refundReason,
      },
    });
  }

  console.log(`[WPlus Webhook] Refund processed: revoked=${revoked}`);
}

// ==========================================
// HANDLE CHARGEBACK
// ==========================================

interface ChargebackData {
  saleId: string;
  buyerEmail: string;
}

async function handleChargeback(data: ChargebackData) {
  console.log(`[WPlus Webhook] Processing chargeback: ${data.saleId}`);

  // Revoke license immediately
  await revokeLicenseByTransaction(data.saleId, 'Chargeback');

  // Update transaction
  const transaction = await prisma.wPlusTransaction.findUnique({
    where: { transactionId: data.saleId },
  });

  if (transaction) {
    await prisma.wPlusTransaction.update({
      where: { id: transaction.id },
      data: {
        status: 'chargeback',
      },
    });
  }

  console.log(`[WPlus Webhook] Chargeback processed`);
}

// ==========================================
// HELPERS
// ==========================================

function findProductByWPlusNumber(productNumber: string) {
  // First try direct match (our product IDs)
  if (WPLUS_PRODUCTS[productNumber]) {
    return WPLUS_PRODUCTS[productNumber];
  }

  // Then try matching by wplusProductId
  for (const product of Object.values(WPLUS_PRODUCTS)) {
    if (product.wplusProductId === productNumber) {
      return product;
    }
  }

  // Fallback: try lowercase/normalized match
  const normalized = productNumber.toLowerCase().replace(/\s+/g, '-');
  if (WPLUS_PRODUCTS[normalized]) {
    return WPLUS_PRODUCTS[normalized];
  }

  return null;
}

async function getLicenseIdByKey(licenseKey: string): Promise<string | null> {
  const license = await prisma.licenseKey.findUnique({
    where: { licenseKey },
    select: { id: true },
  });
  return license?.id ?? null;
}
