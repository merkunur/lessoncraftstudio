# Customer Self-Service Billing Portal Guide

## Overview

The billing portal provides customers with complete self-service access to manage their subscriptions, payment methods, invoices, and billing information. This guide covers the enhanced billing portal implementation that integrates all billing features.

## Portal Features

### Core Features
1. **Subscription Management**
   - View current plan and status
   - Upgrade/downgrade with proration preview
   - Cancel subscription (retains access until period end)
   - Reactivate cancelled subscription
   - Switch billing intervals (monthly ↔ yearly)

2. **Payment Method Management**
   - Add new payment methods
   - Remove old payment methods
   - Set default payment method
   - View all saved cards

3. **Invoice & Payment History**
   - View all invoices
   - Download invoice PDFs
   - View payment receipts
   - Filter and search invoices

4. **Usage Statistics**
   - Current usage vs limits
   - Usage trends and analytics
   - Feature access tracking

5. **Plan Comparison**
   - Compare available plans
   - See upgrade benefits
   - Calculate savings (annual billing)

## Architecture

### Page Structure
```
/dashboard/billing
├── Main billing overview
├── /payment-methods (Payment method management)
├── /invoices (Invoice history)
└── /upgrade (Plan upgrade with preview)
```

### Integration Points
- **Stripe APIs**: All APIs we've built (/api/stripe/*)
- **Email System**: Automatic notifications for changes
- **Activity Logging**: All actions tracked
- **Real-time Updates**: Subscription status synced

## Implementation Guide

### Main Billing Page Enhancement

The existing billing page should be enhanced to include:

**1. Add Payment Method Management Section**
```tsx
import { PaymentMethodManager } from '@/components/billing/PaymentMethodManager';

// Add to billing page:
<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
  <PaymentMethodManager />
</div>
```

**2. Add Invoice History Section**
```tsx
import { InvoiceList } from '@/components/billing/InvoiceList';

// Add to billing page:
<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
  <h2 className="text-xl font-semibold text-gray-900 mb-6">
    Billing History
  </h2>
  <InvoiceList />
</div>
```

**3. Add Upgrade/Downgrade Preview**
```tsx
import { PlanUpgradeModal } from '@/components/billing/PlanUpgradeModal';

// Add upgrade modal with proration preview:
<PlanUpgradeModal
  currentTier={currentTier}
  currentInterval={currentInterval}
  onUpgrade={handleUpgrade}
/>
```

### Component Library

Create a `components/billing/` directory with these reusable components:

#### 1. PaymentMethodManager.tsx
```tsx
'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentMethodCard } from './PaymentMethodCard';
import { AddPaymentMethodForm } from './AddPaymentMethodForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function PaymentMethodManager() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  async function loadPaymentMethods() {
    const response = await fetch('/api/stripe/payment-methods');
    const data = await response.json();
    setPaymentMethods(data.paymentMethods || []);
  }

  async function handleAddCard() {
    const response = await fetch('/api/stripe/setup-intent', {
      method: 'POST',
    });
    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
    setShowAddForm(true);
  }

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  return (
    <div className="space-y-4">
      {paymentMethods.map((pm) => (
        <PaymentMethodCard
          key={pm.id}
          paymentMethod={pm}
          onUpdate={loadPaymentMethods}
        />
      ))}

      {paymentMethods.length === 0 && (
        <p className="text-gray-600">No payment methods on file</p>
      )}

      <button
        onClick={handleAddCard}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add Payment Method
      </button>

      {showAddForm && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <AddPaymentMethodForm
            clientSecret={clientSecret}
            onSuccess={() => {
              setShowAddForm(false);
              loadPaymentMethods();
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </Elements>
      )}
    </div>
  );
}
```

#### 2. InvoiceList.tsx
```tsx
'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';

export function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      try {
        const response = await fetch('/api/stripe/invoices');
        const data = await response.json();
        setInvoices(data.invoices || []);
      } catch (error) {
        console.error('Failed to load invoices:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        No invoices yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {invoices.map((invoice: any) => (
        <div
          key={invoice.id}
          className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">
                Invoice #{invoice.number}
              </span>
              <StatusBadge status={invoice.status} />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(invoice.date).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">
              {formatCurrency(invoice.amount, invoice.currency)}
            </span>

            <div className="flex gap-2">
              <a
                href={invoice.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="View Invoice"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
              <a
                href={invoice.invoicePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Download PDF"
              >
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    paid: 'bg-green-100 text-green-800',
    open: 'bg-yellow-100 text-yellow-800',
    void: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded ${colors[status] || colors.open}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
```

#### 3. PlanUpgradeModal.tsx
```tsx
'use client';

import { useState } from 'react';
import { SUBSCRIPTION_TIERS } from '@/lib/stripe-config';

interface ProrationPreview {
  currentPlan: any;
  newPlan: any;
  proration: {
    changeType: string;
    immediateCharge: number;
    tax: number;
    subtotal: number;
    currency: string;
  };
  description: string;
}

export function PlanUpgradeModal({
  currentTier,
  currentInterval,
  onUpgrade,
}) {
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState('monthly');
  const [preview, setPreview] = useState<ProrationPreview | null>(null);
  const [loading, setLoading] = useState(false);

  async function handlePreview(tier: string, interval: string) {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/subscription/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          billingInterval: interval,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPreview(data);
      }
    } catch (error) {
      console.error('Preview error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmUpgrade() {
    if (!selectedTier) return;

    setLoading(true);
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_plan',
          tier: selectedTier,
          billingInterval: selectedInterval,
        }),
      });

      if (response.ok) {
        onUpgrade();
      }
    } catch (error) {
      console.error('Upgrade error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(SUBSCRIPTION_TIERS)
          .filter(([key]) => key !== 'FREE' && key !== currentTier)
          .map(([key, tier]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedTier(key);
                handlePreview(key, selectedInterval);
              }}
              className={`border-2 rounded-lg p-6 text-left transition-colors ${
                selectedTier === key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-600 mb-4">{tier.description}</p>
              <p className="text-2xl font-bold">
                ${selectedInterval === 'yearly' ? tier.priceYearly : tier.priceMonthly}
                <span className="text-sm text-gray-600">
                  /{selectedInterval === 'yearly' ? 'year' : 'month'}
                </span>
              </p>
              {selectedInterval === 'yearly' && (
                <p className="text-sm text-green-600 mt-1">
                  Save 20% with annual billing
                </p>
              )}
            </button>
          ))}
      </div>

      {/* Billing Interval */}
      <div className="flex gap-4">
        <button
          onClick={() => setSelectedInterval('monthly')}
          className={`px-4 py-2 rounded-lg ${
            selectedInterval === 'monthly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setSelectedInterval('yearly')}
          className={`px-4 py-2 rounded-lg ${
            selectedInterval === 'yearly'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Yearly (Save 20%)
        </button>
      </div>

      {/* Proration Preview */}
      {preview && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="font-bold text-lg mb-4">Proration Preview</h3>
          <p className="text-gray-700 mb-4">{preview.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${preview.proration.subtotal.toFixed(2)}</span>
            </div>
            {preview.proration.tax > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>${preview.proration.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Immediate Charge:</span>
              <span>${preview.proration.immediateCharge.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleConfirmUpgrade}
            disabled={loading}
            className="w-full mt-6 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Confirm Upgrade'}
          </button>
        </div>
      )}
    </div>
  );
}
```

## User Flows

### 1. Upgrading Plan
1. User clicks "Upgrade Plan" button
2. Modal shows available plans
3. User selects plan and billing interval
4. System shows proration preview
5. User confirms upgrade
6. Immediate charge processed
7. Subscription updated
8. Email confirmation sent

### 2. Adding Payment Method
1. User clicks "Add Payment Method"
2. SetupIntent created
3. Stripe Elements form displays
4. User enters card details
5. 3D Secure if required
6. Payment method attached to customer
7. Option to set as default
8. Success confirmation

### 3. Cancelling Subscription
1. User clicks "Cancel Subscription"
2. Confirmation dialog explains access retained until period end
3. User confirms cancellation
4. Subscription marked cancel_at_period_end
5. Email confirmation sent
6. User retains access until period end

### 4. Viewing Invoices
1. User navigates to invoices section
2. System loads invoice history
3. User can view, download PDF, or see receipt
4. Invoices filterable by date/status

## Stripe Billing Portal Integration

### When to Use Stripe Portal
- **Use for**: Comprehensive billing management when you don't need custom branding
- **Benefits**: Pre-built, fully compliant, handles edge cases
- **Access**: POST /api/stripe/portal

### When to Use Custom Portal
- **Use for**: Custom branding, specific workflows, integrated experience
- **Benefits**: Full control, custom analytics, specific user flows
- **Access**: Use the APIs we've built

### Hybrid Approach (Recommended)
```tsx
// Use custom UI for main features
<BillingOverview />
<PaymentMethodManager />
<InvoiceList />

// Link to Stripe Portal for advanced features
<button onClick={openStripePortal}>
  Advanced Settings
</button>
```

## Security Considerations

1. **Authentication**: All endpoints require valid JWT
2. **Authorization**: Users can only access their own data
3. **PCI Compliance**: Card data handled by Stripe Elements
4. **HTTPS**: All production traffic must use HTTPS
5. **CSRF Protection**: Enabled for all state-changing operations

## Mobile Responsiveness

All components must be mobile-responsive:

```tsx
// Use responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Use responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">

// Use responsive padding
<div className="p-4 md:p-6 lg:p-8">
```

## Analytics & Tracking

Track key billing portal events:

```tsx
// Track page views
analytics.track('Billing Portal Viewed', {
  tier: currentTier,
  hasPaymentMethod: !!stripeCustomerId,
});

// Track upgrades
analytics.track('Plan Upgraded', {
  fromTier: currentTier,
  toTier: newTier,
  interval: billingInterval,
  prorationAmount: immediateCharge,
});

// Track cancellations
analytics.track('Subscription Cancelled', {
  tier: currentTier,
  reason: cancelReason,
});
```

## Error Handling

### Common Errors & Solutions

1. **"Failed to load subscription"**
   - Check user authentication
   - Verify Stripe customer ID exists
   - Check API error logs

2. **"Payment method declined"**
   - Show user-friendly message
   - Suggest trying different card
   - Provide support contact

3. **"Cannot upgrade at this time"**
   - Check if user already upgraded
   - Verify no pending changes
   - Check Stripe subscription status

## Performance Optimization

1. **Lazy Loading**: Load invoice history on demand
2. **Caching**: Cache subscription data (5-minute TTL)
3. **Debouncing**: Debounce proration previews
4. **Progressive Enhancement**: Show skeleton loaders

## Testing Checklist

- [ ] Upgrade from FREE → CORE
- [ ] Upgrade from CORE → FULL
- [ ] Downgrade from FULL → CORE
- [ ] Switch monthly → yearly
- [ ] Switch yearly → monthly
- [ ] Add payment method
- [ ] Remove payment method (with active subscription)
- [ ] Cancel subscription
- [ ] Reactivate subscription
- [ ] View invoices
- [ ] Download invoice PDF
- [ ] Mobile responsiveness
- [ ] Error handling
- [ ] 3D Secure authentication

## Production Deployment

Before going live:

1. **Environment Variables**: Verify all production keys
2. **Stripe Webhook**: Configure webhook endpoint
3. **SSL Certificate**: Ensure HTTPS enabled
4. **Email Templates**: Test all email flows
5. **Error Monitoring**: Set up Sentry/LogRocket
6. **Analytics**: Configure event tracking
7. **Support**: Train support team on billing flows
8. **Documentation**: Update customer help docs

## Support & Troubleshooting

### User Support Resources
- In-app help tooltips
- FAQ section on billing page
- Email support link
- Live chat (if available)

### Admin Tools
- User subscription dashboard
- Payment history viewer
- Refund management
- Subscription override capability
