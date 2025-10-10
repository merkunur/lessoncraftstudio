import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';
import { sendRefundConfirmationEmail } from '@/lib/email';

// POST /api/stripe/refunds - Create a refund (Admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    // Validate request
    const refundSchema = z.object({
      paymentId: z.string().min(1, 'Payment ID is required'),
      amount: z.number().positive().optional(), // If not provided, full refund
      reason: z.enum([
        'duplicate',
        'fraudulent',
        'requested_by_customer',
        'other'
      ]).optional().default('requested_by_customer'),
      customReason: z.string().optional(),
    });

    const body = await request.json();
    const validationResult = refundSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { paymentId, amount, reason, customReason } = validationResult.data;

    // Get payment from database
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { user: true },
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Check if payment can be refunded
    if (payment.status === 'refunded') {
      return NextResponse.json(
        { error: 'Payment already fully refunded' },
        { status: 400 }
      );
    }

    if (payment.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Can only refund successful payments' },
        { status: 400 }
      );
    }

    // Calculate refund amount
    const maxRefundable = payment.amount - payment.refundedAmount;
    const refundAmount = amount ? Math.min(amount, maxRefundable) : maxRefundable;

    if (refundAmount <= 0) {
      return NextResponse.json(
        { error: 'No refundable amount remaining' },
        { status: 400 }
      );
    }

    // Determine which Stripe ID to use for refund
    let stripeRefundId: string;
    if (payment.stripePaymentIntentId) {
      // Refund via PaymentIntent
      const refund = await stripe.refunds.create({
        payment_intent: payment.stripePaymentIntentId,
        amount: Math.round(refundAmount * 100), // Convert to cents
        reason: reason as any,
        metadata: {
          paymentId: payment.id,
          userId: payment.userId,
          adminId: user.id,
          customReason: customReason || '',
        },
      });
      stripeRefundId = refund.id;
    } else if (payment.stripePaymentId) {
      // Refund via Charge
      const refund = await stripe.refunds.create({
        charge: payment.stripePaymentId,
        amount: Math.round(refundAmount * 100),
        reason: reason as any,
        metadata: {
          paymentId: payment.id,
          userId: payment.userId,
          adminId: user.id,
          customReason: customReason || '',
        },
      });
      stripeRefundId = refund.id;
    } else {
      return NextResponse.json(
        { error: 'No Stripe payment ID found for this payment' },
        { status: 400 }
      );
    }

    // Update payment record
    const newRefundedAmount = payment.refundedAmount + refundAmount;
    const isFullyRefunded = newRefundedAmount >= payment.amount;

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        refundedAmount: newRefundedAmount,
        status: isFullyRefunded ? 'refunded' : 'partially_refunded',
        metadata: {
          ...(payment.metadata as object || {}),
          refunds: [
            ...((payment.metadata as any)?.refunds || []),
            {
              id: stripeRefundId,
              amount: refundAmount,
              reason,
              customReason,
              createdAt: new Date().toISOString(),
              createdBy: user.id,
            },
          ],
        },
      },
    });

    // Log activity
    await prisma.activityLog.create({
      data: {
        userId: payment.userId,
        action: isFullyRefunded ? 'payment_refunded' : 'payment_partially_refunded',
        details: `${isFullyRefunded ? 'Full' : 'Partial'} refund of $${refundAmount.toFixed(2)} processed by admin`,
        metadata: {
          paymentId: payment.id,
          refundAmount,
          reason,
          customReason,
          adminId: user.id,
          stripeRefundId,
        },
      },
    });

    // Send refund confirmation email
    try {
      await sendRefundConfirmationEmail({
        email: payment.user.email,
        firstName: payment.user.firstName || 'there',
        refundAmount: Math.round(refundAmount * 100), // Convert to cents for email template
        currency: payment.currency,
        originalAmount: Math.round(payment.amount * 100),
        invoiceNumber: (payment.metadata as any)?.invoiceNumber || 'N/A',
        refundReason: customReason || reason,
        processingDays: 5, // Typical processing time
        language: payment.user.language || 'en',
      });
    } catch (emailError) {
      console.error('Failed to send refund email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      message: `${isFullyRefunded ? 'Full' : 'Partial'} refund processed successfully`,
      refundAmount,
      totalRefunded: newRefundedAmount,
      remainingAmount: payment.amount - newRefundedAmount,
      stripeRefundId,
      status: isFullyRefunded ? 'refunded' : 'partially_refunded',
    });
  } catch (error: any) {
    console.error('Create refund error:', error);

    if (error.type === 'StripeCardError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create refund' },
      { status: 500 }
    );
  }
}

// GET /api/stripe/refunds - List refunds for a payment
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const paymentId = searchParams.get('payment_id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      );
    }

    // Get payment
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Verify ownership (unless admin)
    if (!user.isAdmin && payment.userId !== user.id) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Get refunds from Stripe
    let refunds: any[] = [];

    try {
      if (payment.stripePaymentIntentId) {
        const stripeRefunds = await stripe.refunds.list({
          payment_intent: payment.stripePaymentIntentId,
        });
        refunds = stripeRefunds.data;
      } else if (payment.stripePaymentId) {
        const stripeRefunds = await stripe.refunds.list({
          charge: payment.stripePaymentId,
        });
        refunds = stripeRefunds.data;
      }
    } catch (error) {
      console.error('Error fetching refunds from Stripe:', error);
      // Return data from database if Stripe fails
    }

    // Format refunds
    const formattedRefunds = refunds.map((refund) => ({
      id: refund.id,
      amount: refund.amount / 100,
      currency: refund.currency,
      reason: refund.reason,
      status: refund.status,
      createdAt: new Date(refund.created * 1000),
      metadata: refund.metadata,
    }));

    // Add refund info from database metadata
    const dbRefunds = (payment.metadata as any)?.refunds || [];

    return NextResponse.json({
      refunds: formattedRefunds.length > 0 ? formattedRefunds : dbRefunds,
      totalRefunded: payment.refundedAmount,
      originalAmount: payment.amount,
      remainingAmount: payment.amount - payment.refundedAmount,
      status: payment.status,
    });
  } catch (error) {
    console.error('Get refunds error:', error);
    return NextResponse.json(
      { error: 'Failed to get refunds' },
      { status: 500 }
    );
  }
}
