import { NextRequest, NextResponse } from 'next/server';
import { Invoice } from '@/types/stripe';

// GET /api/admin/billing/invoices - Get invoices
export async function GET(request: NextRequest) {
  try {
    // Mock invoices for development
    const invoices: Invoice[] = [
      {
        id: 'inv_1',
        stripeInvoiceId: 'in_mock123',
        subscriptionId: 'sub_1',
        number: 'INV-2024-001',
        status: 'paid',
        amount: 2900,
        currency: 'usd',
        paidAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        periodStart: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        periodEnd: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        lineItems: [
          {
            id: 'li_1',
            description: 'Professional Plan - Monthly Subscription',
            quantity: 1,
            unitAmount: 2900,
            amount: 2900,
            currency: 'usd'
          }
        ],
        pdfUrl: 'https://invoice.stripe.com/mock/pdf',
        hostedInvoiceUrl: 'https://invoice.stripe.com/mock/view'
      },
      {
        id: 'inv_2',
        stripeInvoiceId: 'in_mock456',
        subscriptionId: 'sub_1',
        number: 'INV-2024-002',
        status: 'paid',
        amount: 2900,
        currency: 'usd',
        paidAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        periodStart: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
        periodEnd: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        lineItems: [
          {
            id: 'li_2',
            description: 'Professional Plan - Monthly Subscription',
            quantity: 1,
            unitAmount: 2900,
            amount: 2900,
            currency: 'usd'
          }
        ],
        pdfUrl: 'https://invoice.stripe.com/mock/pdf2',
        hostedInvoiceUrl: 'https://invoice.stripe.com/mock/view2'
      },
      {
        id: 'inv_3',
        stripeInvoiceId: 'in_mock789',
        subscriptionId: 'sub_1',
        number: 'INV-2024-003',
        status: 'open',
        amount: 2900,
        currency: 'usd',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        periodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        periodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        lineItems: [
          {
            id: 'li_3',
            description: 'Professional Plan - Monthly Subscription',
            quantity: 1,
            unitAmount: 2900,
            amount: 2900,
            currency: 'usd'
          }
        ],
        hostedInvoiceUrl: 'https://invoice.stripe.com/mock/view3'
      }
    ];

    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Failed to get invoices:', error);
    return NextResponse.json(
      { error: 'Failed to get invoices' },
      { status: 500 }
    );
  }
}

// POST /api/admin/billing/invoices/download - Download invoice
export async function POST(request: NextRequest) {
  try {
    const { invoiceId } = await request.json();

    // In production, generate or fetch invoice PDF from Stripe
    console.log('Downloading invoice:', invoiceId);

    // Mock PDF URL
    const pdfUrl = `https://invoice.stripe.com/mock/${invoiceId}/download`;

    return NextResponse.json({ pdfUrl });
  } catch (error) {
    console.error('Failed to download invoice:', error);
    return NextResponse.json(
      { error: 'Failed to download invoice' },
      { status: 500 }
    );
  }
}