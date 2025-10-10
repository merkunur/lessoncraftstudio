import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';

// GET /api/stripe/payment-intent/[id] - Get payment intent details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Fetch payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(id, {
      expand: ['customer', 'payment_method'],
    });

    // Verify this payment belongs to the user
    const customer = paymentIntent.customer as any;
    if (customer?.id !== user.stripeCustomerId && customer !== user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Get invoice if available
    let invoiceUrl;
    let receiptUrl;
    if ((paymentIntent as any).invoice) {
      const invoice = await stripe.invoices.retrieve((paymentIntent as any).invoice as string);
      invoiceUrl = invoice.hosted_invoice_url;
      receiptUrl = invoice.invoice_pdf;
    }

    // Format response
    const paymentDetails = {
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      description: paymentIntent.description || 'Payment',
      status: paymentIntent.status,
      created: new Date(paymentIntent.created * 1000),
      customerEmail: typeof customer === 'object' ? customer.email : null,
      paymentMethod: paymentIntent.payment_method ? {
        type: (paymentIntent.payment_method as any).type,
        card: (paymentIntent.payment_method as any).card ? {
          brand: (paymentIntent.payment_method as any).card.brand,
          last4: (paymentIntent.payment_method as any).card.last4,
          expMonth: (paymentIntent.payment_method as any).card.exp_month,
          expYear: (paymentIntent.payment_method as any).card.exp_year,
        } : null,
      } : null,
      invoiceUrl,
      receiptUrl,
    };

    return NextResponse.json(paymentDetails);
  } catch (error: any) {
    console.error('Get payment intent error:', error);
    
    if (error.code === 'resource_missing') {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch payment details' },
      { status: 500 }
    );
  }
}