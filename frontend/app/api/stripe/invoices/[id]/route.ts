import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { stripe, getInvoiceTax } from '@/lib/stripe-server';

// GET /api/stripe/invoices/[id] - Get a specific invoice
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

    const invoiceId = params.id;

    // Get invoice from Stripe
    const invoice = await stripe.invoices.retrieve(invoiceId, {
      expand: ['payment_intent', 'charge', 'subscription'],
    });

    // Verify this invoice belongs to the user
    if (invoice.customer !== user.stripeCustomerId) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Get detailed tax information
    const taxInfo = await getInvoiceTax(invoiceId);

    // Format invoice details
    const formattedInvoice = {
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      date: new Date(invoice.created * 1000),
      dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
      paidAt: invoice.status_transitions.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : null,
      description: invoice.description,

      // Amounts
      subtotal: invoice.subtotal / 100,
      tax: taxInfo?.taxAmount || ((invoice.total - invoice.subtotal) / 100),
      taxRate: taxInfo?.taxRate || null,
      total: invoice.total / 100,
      amountPaid: invoice.amount_paid / 100,
      amountDue: invoice.amount_due / 100,
      currency: invoice.currency,

      // Tax details
      taxIds: taxInfo?.taxIds || [],
      taxExempt: taxInfo?.taxExempt || false,

      // Line items
      lines: invoice.lines.data.map((line) => ({
        id: line.id,
        description: line.description,
        amount: line.amount / 100,
        quantity: line.quantity,
        period: {
          start: new Date(line.period.start * 1000),
          end: new Date(line.period.end * 1000),
        },
      })),

      // URLs
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      receiptUrl: (invoice as any).charge && typeof (invoice as any).charge !== 'string'
        ? (invoice as any).charge.receipt_url
        : null,

      // Subscription info
      subscription: (invoice as any).subscription && typeof (invoice as any).subscription !== 'string'
        ? {
            id: (invoice as any).subscription.id,
            status: (invoice as any).subscription.status,
          }
        : null,

      // Payment method
      paymentIntent: (invoice as any).payment_intent && typeof (invoice as any).payment_intent !== 'string'
        ? {
            id: (invoice as any).payment_intent.id,
            status: (invoice as any).payment_intent.status,
            paymentMethod: (invoice as any).payment_intent.payment_method,
          }
        : null,

      // Customer info
      customerEmail: invoice.customer_email,
      customerName: invoice.customer_name,
      customerAddress: invoice.customer_address,

      // Billing details
      billingReason: invoice.billing_reason,
      collectionMethod: invoice.collection_method,

      // Metadata
      metadata: invoice.metadata,
    };

    return NextResponse.json(formattedInvoice);
  } catch (error: any) {
    console.error('Get invoice error:', error);

    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to get invoice' },
      { status: 500 }
    );
  }
}
