import { NextRequest, NextResponse } from 'next/server';
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe-server';
import { handleApiError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/user-control/refund
 * Refund a payment for a user
 *
 * Auth: Requires admin
 */
export const POST = withAdmin(async (request: NextRequest, user) => {
  try {
    const body = await request.json();
    const { paymentId, amount, reason } = body;

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Get payment details
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    if (payment.status === 'refunded') {
      return NextResponse.json(
        { error: 'Payment already refunded' },
        { status: 400 }
      );
    }

    if (!payment.stripePaymentIntentId) {
      return NextResponse.json(
        { error: 'No Stripe payment intent associated with this payment' },
        { status: 400 }
      );
    }

    // Process refund with Stripe
    const refundAmount = amount
      ? Math.round(amount * 100) // Convert to cents
      : Math.round(payment.amount * 100); // Refund full amount

    // Get the actual payment intent ID
    // The stripePaymentIntentId field might contain either:
    // - A payment intent ID (starts with 'pi_')
    // - An invoice ID (starts with 'in_') as fallback
    let actualPaymentIntentId = payment.stripePaymentIntentId;

    // Determine what we're refunding (payment intent, invoice charge, or direct charge)
    let refundParams: any = {
      amount: refundAmount,
      reason: reason === 'requested_by_customer' ? 'requested_by_customer' : 'duplicate',
      metadata: {
        refundedBy: user.email,
        refundedById: user.id,
        adminReason: reason || 'Admin refund',
      },
    };

    if (payment.stripePaymentIntentId.startsWith('in_')) {
      // This is an invoice ID, we need to retrieve the invoice to get the payment intent or charge
      console.log(`Retrieving invoice ${payment.stripePaymentIntentId} to get payment details`);
      const invoice = await stripe.invoices.retrieve(payment.stripePaymentIntentId);

      // Try payment_intent first, then charge
      const invoicePaymentIntent = (invoice as any).payment_intent as string | null;
      const invoiceCharge = (invoice as any).charge as string | null;

      if (invoicePaymentIntent) {
        refundParams.payment_intent = invoicePaymentIntent;
        console.log(`Found payment intent ${invoicePaymentIntent} from invoice`);
      } else if (invoiceCharge) {
        refundParams.charge = invoiceCharge;
        console.log(`Found charge ${invoiceCharge} from invoice (no payment intent)`);
      } else {
        return NextResponse.json(
          { error: 'Invoice does not have an associated payment intent or charge. Cannot process refund.' },
          { status: 400 }
        );
      }
    } else if (payment.stripePaymentIntentId.startsWith('pi_')) {
      // This is a payment intent ID
      refundParams.payment_intent = payment.stripePaymentIntentId;
    } else if (payment.stripePaymentIntentId.startsWith('ch_')) {
      // This is a charge ID
      refundParams.charge = payment.stripePaymentIntentId;
    } else {
      return NextResponse.json(
        { error: 'Unknown payment identifier format. Cannot process refund.' },
        { status: 400 }
      );
    }

    const refund = await stripe.refunds.create(refundParams);

    // Update payment record
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: refund.amount === Math.round(payment.amount * 100) ? 'refunded' : 'partially_refunded',
        refundedAmount: (payment.refundedAmount || 0) + (refundAmount / 100),
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: payment.userId,
        action: 'payment_refunded',
        details: `Payment refunded by ${user.email}: ${reason || 'No reason provided'}`,
        metadata: {
          paymentId: payment.id,
          refundId: refund.id,
          amount: refundAmount / 100,
          refundedBy: user.email,
          refundedById: user.id,
          reason,
        },
      },
    });

    // Create notification for user
    await prisma.notification.create({
      data: {
        userId: payment.userId,
        type: 'payment_refunded',
        title: 'Payment Refunded',
        message: `A refund of $${(refundAmount / 100).toFixed(2)} has been processed to your original payment method.`,
        priority: 'high',
      },
    });

    return NextResponse.json({
      success: true,
      message: `Refund of $${(refundAmount / 100).toFixed(2)} processed successfully for ${payment.user.email}`,
      refund: {
        id: refund.id,
        amount: refundAmount / 100,
        status: refund.status,
      },
    });

  } catch (error: any) {
    // Handle Stripe-specific errors
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return handleApiError(error);
  }
});
