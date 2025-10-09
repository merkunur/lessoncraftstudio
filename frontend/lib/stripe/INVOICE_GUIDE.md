# Invoice Management Guide

## Overview

This guide explains how to manage invoices, including listing, viewing, and downloading invoices with full tax information. All invoices are generated and hosted by Stripe, with metadata stored in your database.

## Architecture

### Invoice Flow
1. **Stripe generates invoice** when subscription renews or payment is due
2. **Webhook notifies** your application of invoice events
3. **System stores** invoice metadata in Payment model
4. **User can access** invoice via API endpoints
5. **Stripe provides** hosted invoice page and PDF download

### Invoice Storage Strategy
- **Stripe**: Stores actual invoice data and generates PDFs
- **Your Database**: Stores invoice metadata, URLs, and payment status
- **Benefits**: No PDF storage costs, Stripe handles compliance, always up-to-date

## API Endpoints

### 1. List User Invoices
**Endpoint**: `GET /api/stripe/invoices`

Get paginated list of invoices for authenticated user.

**Query Parameters**:
- `limit` (optional): Number of invoices to return (default: 10, max: 100)
- `starting_after` (optional): Invoice ID to paginate after

**Response**:
```json
{
  "invoices": [
    {
      "id": "in_1ABC123",
      "number": "ABC123-0001",
      "status": "paid",
      "amount": 25.00,
      "currency": "usd",
      "date": "2024-01-15T10:30:00.000Z",
      "dueDate": null,
      "paidAt": "2024-01-15T10:30:15.000Z",
      "description": "Subscription update",
      "invoiceUrl": "https://invoice.stripe.com/i/acct_xxx/test_xxx",
      "invoicePdf": "https://pay.stripe.com/invoice/acct_xxx/test_xxx/pdf",
      "receiptUrl": "https://pay.stripe.com/receipts/xxx",
      "subtotal": 20.00,
      "tax": 5.00,
      "total": 25.00,
      "lines": [
        {
          "description": "Full Access (Jan 15 - Feb 15)",
          "amount": 20.00,
          "quantity": 1
        }
      ]
    }
  ],
  "hasMore": false
}
```

**Invoice Status Values**:
- `draft`: Invoice not yet finalized
- `open`: Invoice finalized, awaiting payment
- `paid`: Invoice successfully paid
- `uncollectible`: Payment failed, marked uncollectible
- `void`: Invoice voided/cancelled

---

### 2. Get Single Invoice
**Endpoint**: `GET /api/stripe/invoices/[id]`

Get detailed information about a specific invoice.

**Response**:
```json
{
  "id": "in_1ABC123",
  "number": "ABC123-0001",
  "status": "paid",
  "date": "2024-01-15T10:30:00.000Z",
  "dueDate": null,
  "paidAt": "2024-01-15T10:30:15.000Z",
  "description": "Subscription update",

  "subtotal": 20.00,
  "tax": 5.00,
  "taxRate": 25.0,
  "total": 25.00,
  "amountPaid": 25.00,
  "amountDue": 0.00,
  "currency": "usd",

  "taxIds": [
    {
      "type": "eu_vat",
      "value": "DE123456789"
    }
  ],
  "taxExempt": false,

  "lines": [
    {
      "id": "il_1ABC123",
      "description": "Full Access subscription",
      "amount": 20.00,
      "quantity": 1,
      "period": {
        "start": "2024-01-15T00:00:00.000Z",
        "end": "2024-02-15T00:00:00.000Z"
      }
    }
  ],

  "invoiceUrl": "https://invoice.stripe.com/...",
  "invoicePdf": "https://pay.stripe.com/.../pdf",
  "receiptUrl": "https://pay.stripe.com/receipts/...",

  "subscription": {
    "id": "sub_1ABC123",
    "status": "active"
  },

  "paymentIntent": {
    "id": "pi_1ABC123",
    "status": "succeeded",
    "paymentMethod": "pm_1ABC123"
  },

  "customerEmail": "user@example.com",
  "customerName": "John Doe",
  "customerAddress": {
    "line1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },

  "billingReason": "subscription_cycle",
  "collectionMethod": "charge_automatically",

  "metadata": {}
}
```

**Billing Reasons**:
- `subscription_cycle`: Regular subscription renewal
- `subscription_create`: First subscription payment
- `subscription_update`: Plan change or upgrade
- `manual`: Manually created invoice

---

## Frontend Implementation

### Invoice List Component

```tsx
'use client';

import { useState, useEffect } from 'react';

interface Invoice {
  id: string;
  number: string;
  status: string;
  amount: number;
  currency: string;
  date: string;
  invoiceUrl: string;
  invoicePdf: string;
  receiptUrl: string;
}

export function InvoiceList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  async function loadInvoices(startingAfter?: string) {
    try {
      const url = startingAfter
        ? `/api/stripe/invoices?starting_after=${startingAfter}`
        : '/api/stripe/invoices';

      const response = await fetch(url);
      const data = await response.json();

      if (startingAfter) {
        setInvoices((prev) => [...prev, ...data.invoices]);
      } else {
        setInvoices(data.invoices);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to load invoices:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function formatAmount(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  }

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No invoices found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Billing History</h2>

      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  Invoice #{invoice.number}
                </span>
                <StatusBadge status={invoice.status} />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(invoice.date)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold">
                {formatAmount(invoice.amount, invoice.currency)}
              </span>

              <div className="flex gap-2">
                <a
                  href={invoice.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View
                </a>
                <a
                  href={invoice.invoicePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  PDF
                </a>
                {invoice.receiptUrl && (
                  <a
                    href={invoice.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Receipt
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => loadInvoices(invoices[invoices.length - 1].id)}
          className="w-full border rounded-lg py-2 hover:bg-gray-50"
        >
          Load More
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    paid: 'bg-green-100 text-green-800',
    open: 'bg-yellow-100 text-yellow-800',
    draft: 'bg-gray-100 text-gray-800',
    void: 'bg-red-100 text-red-800',
    uncollectible: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colors[status] || colors.draft}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
```

### Invoice Detail Component

```tsx
'use client';

import { useState, useEffect } from 'react';

export function InvoiceDetail({ invoiceId }: { invoiceId: string }) {
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoice() {
      try {
        const response = await fetch(`/api/stripe/invoices/${invoiceId}`);
        const data = await response.json();
        setInvoice(data);
      } catch (error) {
        console.error('Failed to load invoice:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInvoice();
  }, [invoiceId]);

  if (loading) {
    return <div>Loading invoice...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency.toUpperCase(),
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Invoice</h1>
            <p className="text-gray-600">#{invoice.number}</p>
          </div>
          <div className="text-right">
            <StatusBadge status={invoice.status} />
            <p className="text-sm text-gray-600 mt-2">
              {new Date(invoice.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Bill To</h2>
            <p>{invoice.customerName}</p>
            <p className="text-sm text-gray-600">{invoice.customerEmail}</p>
            {invoice.customerAddress && (
              <p className="text-sm text-gray-600">
                {invoice.customerAddress.line1}<br />
                {invoice.customerAddress.city}, {invoice.customerAddress.state} {invoice.customerAddress.postal_code}<br />
                {invoice.customerAddress.country}
              </p>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Line Items</h2>
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Qty</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.lines.map((line: any) => (
                  <tr key={line.id} className="border-b">
                    <td className="py-2">
                      {line.description}
                      <p className="text-sm text-gray-600">
                        {new Date(line.period.start).toLocaleDateString()} - {new Date(line.period.end).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="text-right">{line.quantity}</td>
                    <td className="text-right">{formatCurrency(line.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex justify-between">
                <span>
                  Tax {invoice.taxRate && `(${invoice.taxRate.toFixed(1)}%)`}:
                </span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <a
              href={invoice.invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
            >
              View Invoice
            </a>
            <a
              href={invoice.invoicePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border text-center py-2 rounded hover:bg-gray-50"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Database Schema

### Payment Model (Stores Invoice Metadata)

```prisma
model Payment {
  id                     String  @id @default(cuid())
  userId                 String
  stripePaymentId        String? @unique
  stripePaymentIntentId  String? @unique
  stripeInvoiceId        String? @unique  // Links to Stripe invoice

  amount         Float
  currency       String  @default("usd")
  status         String  // "succeeded", "failed", etc.
  description    String?
  refundedAmount Float   @default(0)

  // Invoice URLs (from Stripe)
  invoiceUrl String?  // Hosted invoice page
  invoicePdf String?  // PDF download URL
  receiptUrl String?  // Payment receipt URL

  // Metadata (stores tax info, invoice number, etc.)
  metadata      Json?
  failureReason String?

  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([stripeInvoiceId])
  @@index([status])
}
```

## Webhook Integration

### Storing Invoice Data

When Stripe webhook fires for invoice events:

```typescript
// In your webhook handler (app/api/webhooks/stripe/route.ts)

case 'invoice.paid': {
  const invoice = event.data.object as Stripe.Invoice;

  await prisma.payment.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      userId: user.id,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency,
      status: 'succeeded',
      description: invoice.description || 'Subscription payment',
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      metadata: {
        invoiceNumber: invoice.number,
        tax: invoice.tax ? invoice.tax / 100 : 0,
        subtotal: invoice.subtotal / 100,
      },
    },
    update: {
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
    },
  });
  break;
}

case 'invoice.payment_failed': {
  const invoice = event.data.object as Stripe.Invoice;

  await prisma.payment.upsert({
    where: { stripeInvoiceId: invoice.id },
    create: {
      userId: user.id,
      stripeInvoiceId: invoice.id,
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
      status: 'failed',
      description: invoice.description || 'Subscription payment',
      invoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      failureReason: invoice.last_finalization_error?.message,
      metadata: {
        invoiceNumber: invoice.number,
      },
    },
    update: {
      status: 'failed',
      failureReason: invoice.last_finalization_error?.message,
    },
  });
  break;
}
```

## Best Practices

1. **URL Expiration**: Stripe invoice URLs don't expire, but always fetch fresh URLs from Stripe API
2. **PDF Generation**: Stripe handles PDF generation, don't generate your own
3. **Tax Compliance**: Stripe Tax ensures invoices are compliant
4. **Data Retention**: Store invoice metadata locally for quick access
5. **Privacy**: Verify user ownership before serving invoice data
6. **Currency**: Always display amounts in user's currency
7. **Pagination**: Use cursor-based pagination for large invoice lists

## Production Checklist

- [ ] Verify webhook handles all invoice events
- [ ] Test invoice viewing for different subscription types
- [ ] Verify tax amounts display correctly
- [ ] Test PDF download links work
- [ ] Implement invoice email notifications
- [ ] Add invoice filtering (date range, status)
- [ ] Test pagination with large invoice lists
- [ ] Verify ownership checks prevent unauthorized access
- [ ] Add analytics for invoice views/downloads
- [ ] Test with different currencies and tax rates
