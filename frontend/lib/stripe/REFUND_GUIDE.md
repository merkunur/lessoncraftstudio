# Refund Management Guide

## Overview

This guide explains how to manage refunds, including full and partial refunds, with automatic email notifications and proper tracking. The system supports both customer-requested and admin-initiated refunds.

## Architecture

### Refund Flow
1. **Admin initiates refund** via API or admin dashboard
2. **System validates** payment eligibility
3. **Stripe processes** refund (typically 5-10 business days)
4. **Database updates** payment status and refunded amount
5. **Email sent** to customer confirming refund
6. **Activity logged** for audit trail

### Refund Types
- **Full Refund**: Complete refund of original payment
- **Partial Refund**: Refund portion of payment (can be done multiple times)
- **Automatic**: System-initiated (e.g., subscription cancellation)
- **Manual**: Admin-initiated via API

## API Endpoints

### 1. Create Refund (Admin Only)
**Endpoint**: `POST /api/stripe/refunds`

**Authentication**: Requires admin privileges

**Request Body**:
```json
{
  "paymentId": "pay_abc123",           // Payment database ID
  "amount": 15.50,                      // Optional: partial refund amount
  "reason": "requested_by_customer",    // Optional: refund reason
  "customReason": "Product not as described" // Optional: custom explanation
}
```

**Refund Reasons**:
- `requested_by_customer` - Customer requested refund (default)
- `duplicate` - Duplicate payment
- `fraudulent` - Fraudulent transaction
- `other` - Other reason (use customReason)

**Response**:
```json
{
  "message": "Full refund processed successfully",
  "refundAmount": 25.00,
  "totalRefunded": 25.00,
  "remainingAmount": 0.00,
  "stripeRefundId": "re_1ABC123",
  "status": "refunded"
}
```

**Status Values**:
- `refunded` - Fully refunded
- `partially_refunded` - Partially refunded, more can be refunded

---

### 2. List Refunds
**Endpoint**: `GET /api/stripe/refunds?payment_id={paymentId}`

**Authentication**: User sees their own refunds, admin sees all

**Response**:
```json
{
  "refunds": [
    {
      "id": "re_1ABC123",
      "amount": 25.00,
      "currency": "usd",
      "reason": "requested_by_customer",
      "status": "succeeded",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "metadata": {
        "paymentId": "pay_abc123",
        "userId": "user_123",
        "adminId": "admin_456",
        "customReason": "Customer not satisfied"
      }
    }
  ],
  "totalRefunded": 25.00,
  "originalAmount": 25.00,
  "remainingAmount": 0.00,
  "status": "refunded"
}
```

**Refund Statuses**:
- `pending` - Refund initiated, processing
- `succeeded` - Refund completed successfully
- `failed` - Refund failed
- `canceled` - Refund canceled

---

## Frontend Implementation

### Admin Refund Component

```tsx
'use client';

import { useState } from 'react';

interface RefundFormProps {
  payment: {
    id: string;
    amount: number;
    currency: string;
    refundedAmount: number;
  };
  onSuccess: () => void;
}

export function RefundForm({ payment, onSuccess }: RefundFormProps) {
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('requested_by_customer');
  const [customReason, setCustomReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxRefundable = payment.amount - payment.refundedAmount;
  const isFullRefund = !amount || parseFloat(amount) >= maxRefundable;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const refundAmount = amount ? parseFloat(amount) : undefined;

      // Validate amount
      if (refundAmount && refundAmount > maxRefundable) {
        setError(`Maximum refundable amount is $${maxRefundable.toFixed(2)}`);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/stripe/refunds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: payment.id,
          amount: refundAmount,
          reason,
          customReason: customReason || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process refund');
      }

      const data = await response.json();
      alert(`${data.message}\n\nRefund Amount: $${data.refundAmount.toFixed(2)}`);
      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      <h3 className="text-xl font-bold">Process Refund</h3>

      <div>
        <p className="text-sm text-gray-600">
          Original Amount: ${payment.amount.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          Already Refunded: ${payment.refundedAmount.toFixed(2)}
        </p>
        <p className="text-sm font-semibold">
          Maximum Refundable: ${maxRefundable.toFixed(2)}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Refund Amount (leave empty for full refund)
        </label>
        <input
          type="number"
          step="0.01"
          min="0.01"
          max={maxRefundable}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Max: ${maxRefundable.toFixed(2)}`}
          className="w-full border rounded px-3 py-2"
        />
        <p className="text-xs text-gray-600 mt-1">
          {isFullRefund ? 'Full refund' : `Partial refund of $${amount || '0'}`}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Refund Reason
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="requested_by_customer">Requested by Customer</option>
          <option value="duplicate">Duplicate Payment</option>
          <option value="fraudulent">Fraudulent</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Custom Reason (optional)
        </label>
        <textarea
          value={customReason}
          onChange={(e) => setCustomReason(e.target.value)}
          placeholder="Explain the refund reason..."
          rows={3}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || maxRefundable <= 0}
          className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : `Process ${isFullRefund ? 'Full' : 'Partial'} Refund`}
        </button>
        <button
          type="button"
          onClick={() => onSuccess()}
          className="border px-4 py-2 rounded hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
```

### Refund History Component

```tsx
'use client';

import { useState, useEffect } from 'react';

export function RefundHistory({ paymentId }: { paymentId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRefunds() {
      try {
        const response = await fetch(`/api/stripe/refunds?payment_id=${paymentId}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Failed to load refunds:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRefunds();
  }, [paymentId]);

  if (loading) {
    return <div>Loading refund history...</div>;
  }

  if (!data || data.refunds.length === 0) {
    return (
      <div className="text-gray-600 text-sm">
        No refunds for this payment
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.refunds[0]?.currency || 'usd',
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Refund History</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            Total Refunded: {formatCurrency(data.totalRefunded)}
          </p>
          {data.remainingAmount > 0 && (
            <p className="text-sm text-gray-600">
              Remaining: {formatCurrency(data.remainingAmount)}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {data.refunds.map((refund: any) => (
          <div
            key={refund.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {formatCurrency(refund.amount)}
                </span>
                <StatusBadge status={refund.status} />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Reason: {refund.reason?.replace(/_/g, ' ')}
              </p>
              {refund.metadata?.customReason && (
                <p className="text-sm text-gray-600">
                  "{refund.metadata.customReason}"
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {new Date(refund.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">ID: {refund.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    succeeded: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    canceled: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colors[status] || colors.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
```

## Email Notifications

When a refund is processed, the system automatically sends a confirmation email to the customer using the `RefundConfirmationEmail` template.

**Email includes**:
- Refund amount
- Original payment amount
- Invoice number
- Refund reason
- Expected processing time (5-10 business days)
- Multi-language support (11 languages)

**Automatic email sending**:
```typescript
await sendRefundConfirmationEmail({
  email: user.email,
  firstName: user.firstName || 'there',
  refundAmount: 2500, // In cents
  currency: 'usd',
  originalAmount: 2500,
  invoiceNumber: 'INV-001',
  refundReason: 'Product not as expected',
  processingDays: 5,
  language: user.language || 'en',
});
```

## Database Schema

### Payment Model Updates

The Payment model tracks refund information:

```prisma
model Payment {
  id                     String  @id @default(cuid())
  userId                 String
  stripePaymentIntentId  String? @unique
  stripeInvoiceId        String? @unique

  amount         Float
  currency       String  @default("usd")
  status         String  // "succeeded", "refunded", "partially_refunded"
  refundedAmount Float   @default(0)  // Tracks total refunded

  // Metadata stores refund history
  metadata      Json?  // Contains refunds array

  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id])
}
```

**Metadata Structure**:
```json
{
  "invoiceNumber": "INV-001",
  "refunds": [
    {
      "id": "re_1ABC123",
      "amount": 15.50,
      "reason": "requested_by_customer",
      "customReason": "Product not as expected",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "createdBy": "admin_456"
    }
  ]
}
```

## Activity Logging

All refund actions are logged to the ActivityLog:

```typescript
await prisma.activityLog.create({
  data: {
    userId: payment.userId,
    action: 'payment_refunded', // or 'payment_partially_refunded'
    details: 'Full refund of $25.00 processed by admin',
    metadata: {
      paymentId: 'pay_123',
      refundAmount: 25.00,
      reason: 'requested_by_customer',
      customReason: 'Product defective',
      adminId: 'admin_456',
      stripeRefundId: 're_1ABC123',
    },
  },
});
```

## Security & Permissions

### Admin-Only Operations
- Creating refunds requires `isAdmin: true`
- Only admins can initiate refunds via API
- Customers cannot self-refund (prevents abuse)

### Ownership Verification
- Customers can only view refunds for their own payments
- Admins can view all refunds
- Stripe payment ID verification before processing

### Validation Rules
1. **Payment Status**: Only `succeeded` payments can be refunded
2. **Already Refunded**: Cannot refund if `status === 'refunded'`
3. **Amount Limits**: Cannot refund more than `amount - refundedAmount`
4. **Stripe ID Required**: Must have `stripePaymentIntentId` or `stripePaymentId`

## Best Practices

1. **Always provide reason**: Include clear refund reason for customer
2. **Custom explanations**: Use customReason for better customer experience
3. **Partial refunds**: Support partial refunds for partial service/product issues
4. **Email confirmation**: Always send email when refund is processed
5. **Activity logging**: Log all refund actions for audit trail
6. **Process time**: Inform customers of 5-10 business day processing time
7. **Admin approval**: Require admin review for large refunds

## Refund Processing Timeline

1. **Immediate**: Refund initiated in Stripe
2. **1-2 hours**: Stripe processes refund
3. **3-10 business days**: Customer receives refund (bank dependent)
4. **Bank processing**: Additional time based on customer's bank

## Error Handling

### Common Errors

1. **"Payment not found"**
   - Invalid payment ID
   - Payment doesn't exist in database

2. **"Payment already fully refunded"**
   - Payment status is already 'refunded'
   - No refundable amount remaining

3. **"Can only refund successful payments"**
   - Payment status is not 'succeeded'
   - Cannot refund pending/failed payments

4. **"No refundable amount remaining"**
   - Full amount already refunded via partial refunds
   - refundedAmount >= amount

5. **"Forbidden - Admin access required"**
   - User is not an admin
   - Requires isAdmin: true permission

## Testing

### Test Scenarios

1. **Full Refund**
   ```bash
   POST /api/stripe/refunds
   {
     "paymentId": "pay_test123",
     "reason": "requested_by_customer"
   }
   ```

2. **Partial Refund**
   ```bash
   POST /api/stripe/refunds
   {
     "paymentId": "pay_test123",
     "amount": 10.00,
     "reason": "requested_by_customer"
   }
   ```

3. **Multiple Partial Refunds**
   - Refund $10, then $5, then $10
   - Verify totalRefunded tracks correctly
   - Status changes to 'refunded' when full amount refunded

4. **Refund with Custom Reason**
   ```bash
   POST /api/stripe/refunds
   {
     "paymentId": "pay_test123",
     "amount": 15.50,
     "reason": "other",
     "customReason": "Product arrived damaged"
   }
   ```

## Production Checklist

- [ ] Configure admin user permissions
- [ ] Test refund email delivery
- [ ] Verify Stripe webhook handles refund events
- [ ] Set up refund approval workflow (if needed)
- [ ] Create admin dashboard for refund management
- [ ] Test partial refund calculations
- [ ] Verify refund amount limits
- [ ] Test refund status tracking
- [ ] Implement refund analytics/reporting
- [ ] Set up alerts for large refunds
- [ ] Document refund policy for customers
- [ ] Train support team on refund process
