import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';

// GET /api/stripe/invoices - List all invoices for the authenticated user
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
    const limit = parseInt(searchParams.get('limit') || '10');
    const startingAfter = searchParams.get('starting_after') || undefined;

    if (!user.stripeCustomerId) {
      return NextResponse.json({
        invoices: [],
        hasMore: false,
      });
    }

    // Get invoices from Stripe
    const invoices = await stripe.invoices.list({
      customer: user.stripeCustomerId,
      limit,
      starting_after: startingAfter,
      expand: ['data.payment_intent', 'data.charge'],
    });

    // Format invoices for response
    const formattedInvoices = invoices.data.map((invoice) => ({
      id: invoice.id,
      number: invoice.number,
      status: invoice.status,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      date: new Date(invoice.created * 1000),
      dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
      paidAt: invoice.status_transitions.paid_at
        ? new Date(invoice.status_transitions.paid_at * 1000)
        : null,
      description: invoice.description,
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      receiptUrl: invoice.charge && typeof invoice.charge !== 'string'
        ? invoice.charge.receipt_url
        : null,
      subtotal: invoice.subtotal / 100,
      tax: invoice.tax ? invoice.tax / 100 : 0,
      total: invoice.total / 100,
      lines: invoice.lines.data.map((line) => ({
        description: line.description,
        amount: line.amount / 100,
        quantity: line.quantity,
      })),
    }));

    // Store/update invoice records in database
    for (const invoice of formattedInvoices) {
      if (invoice.status === 'paid') {
        await prisma.payment.upsert({
          where: { stripeInvoiceId: invoice.id },
          create: {
            userId: user.id,
            stripeInvoiceId: invoice.id,
            amount: invoice.total,
            currency: invoice.currency,
            status: 'succeeded',
            description: invoice.description || 'Subscription payment',
            invoiceUrl: invoice.invoiceUrl,
            invoicePdf: invoice.invoicePdf,
            receiptUrl: invoice.receiptUrl,
            metadata: {
              invoiceNumber: invoice.number,
              tax: invoice.tax,
              subtotal: invoice.subtotal,
            },
          },
          update: {
            invoiceUrl: invoice.invoiceUrl,
            invoicePdf: invoice.invoicePdf,
            receiptUrl: invoice.receiptUrl,
            metadata: {
              invoiceNumber: invoice.number,
              tax: invoice.tax,
              subtotal: invoice.subtotal,
            },
          },
        });
      }
    }

    return NextResponse.json({
      invoices: formattedInvoices,
      hasMore: invoices.has_more,
    });
  } catch (error) {
    console.error('Get invoices error:', error);
    return NextResponse.json(
      { error: 'Failed to get invoices' },
      { status: 500 }
    );
  }
}
