# Payment Method Management Guide

## Overview

This guide explains how to implement secure payment method management, allowing users to add, remove, and manage their payment cards.

## Architecture

### Security Flow
1. **Frontend**: Uses Stripe Elements to securely collect card details
2. **Backend**: Creates SetupIntent and manages payment methods via Stripe API
3. **Stripe**: Validates card, creates payment method, returns payment method ID
4. **Database**: Stores payment method associations and activity logs

**Important**: Card details NEVER touch your servers - Stripe Elements handles all sensitive data.

## API Endpoints

### 1. Create SetupIntent
**Endpoint**: `POST /api/stripe/setup-intent`

Create a SetupIntent to securely collect payment method details on the frontend.

**Request**: No body required (authenticated)

**Response**:
```json
{
  "clientSecret": "seti_1ABC...secret_xyz",
  "setupIntentId": "seti_1ABC123"
}
```

**Usage**: Pass `clientSecret` to Stripe Elements on frontend

---

### 2. List Payment Methods
**Endpoint**: `GET /api/stripe/payment-methods`

Get all payment methods for the authenticated user.

**Response**:
```json
{
  "paymentMethods": [
    {
      "id": "pm_1ABC123",
      "type": "card",
      "card": {
        "brand": "visa",
        "last4": "4242",
        "expMonth": 12,
        "expYear": 2025
      },
      "isDefault": true,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "defaultPaymentMethod": "pm_1ABC123"
}
```

---

### 3. Add Payment Method
**Endpoint**: `POST /api/stripe/payment-methods`

Attach a payment method to the customer (called after SetupIntent succeeds).

**Request Body**:
```json
{
  "paymentMethodId": "pm_1ABC123",
  "setAsDefault": true  // Optional, default: false
}
```

**Response**:
```json
{
  "message": "Payment method added successfully",
  "paymentMethodId": "pm_1ABC123",
  "isDefault": true
}
```

---

### 4. Set Default Payment Method
**Endpoint**: `PATCH /api/stripe/payment-methods`

Set a payment method as the default for all future charges.

**Request Body**:
```json
{
  "paymentMethodId": "pm_1ABC123",
  "action": "set_default"
}
```

**Response**:
```json
{
  "message": "Default payment method updated successfully",
  "paymentMethodId": "pm_1ABC123"
}
```

---

### 5. Remove Payment Method
**Endpoint**: `DELETE /api/stripe/payment-methods?id=pm_1ABC123`

Remove a payment method from the customer.

**Query Parameters**:
- `id`: Payment method ID to remove

**Response**:
```json
{
  "message": "Payment method removed successfully"
}
```

**Error Cases**:
- Cannot remove default payment method if active subscriptions exist
- Must set another card as default first

---

## Frontend Implementation

### Complete React Component Example

```tsx
'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Main component
export function PaymentMethodManager() {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load payment methods
  async function loadPaymentMethods() {
    const response = await fetch('/api/stripe/payment-methods');
    const data = await response.json();
    setPaymentMethods(data.paymentMethods || []);
  }

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  // Create setup intent for adding new card
  async function handleAddCard() {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/setup-intent', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to create setup intent');
      }

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to initialize card form');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Payment Methods</h2>

      {/* Existing payment methods */}
      <div className="space-y-3">
        {paymentMethods.length === 0 && (
          <p className="text-gray-600">No payment methods on file</p>
        )}

        {paymentMethods.map((pm) => (
          <PaymentMethodCard
            key={pm.id}
            paymentMethod={pm}
            onUpdate={loadPaymentMethods}
          />
        ))}
      </div>

      {/* Add new card button */}
      <button
        onClick={handleAddCard}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add New Card
      </button>

      {/* Stripe Elements form */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <SetupForm
            clientSecret={clientSecret}
            onSuccess={() => {
              setClientSecret('');
              loadPaymentMethods();
            }}
            onCancel={() => setClientSecret('')}
          />
        </Elements>
      )}
    </div>
  );
}

// Form for adding new payment method
function SetupForm({ clientSecret, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Confirm the SetupIntent
      const { error: confirmError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: window.location.href, // Fallback
        },
        redirect: 'if_required', // Don't redirect unless 3D Secure required
      });

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (setupIntent.status === 'succeeded') {
        // Attach payment method to customer
        const response = await fetch('/api/stripe/payment-methods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentMethodId: setupIntent.payment_method,
            setAsDefault: true,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to add payment method');
        }

        alert('Card added successfully!');
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border p-6 rounded-lg space-y-4">
      <h3 className="text-xl font-semibold">Add New Card</h3>

      <PaymentElement />

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : 'Save Card'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Individual payment method card
function PaymentMethodCard({ paymentMethod, onUpdate }) {
  const [loading, setLoading] = useState(false);

  async function handleSetDefault() {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/payment-methods', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          action: 'set_default',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to set default');
      }

      alert('Default payment method updated');
      onUpdate();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove() {
    if (!confirm('Are you sure you want to remove this card?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `/api/stripe/payment-methods?id=${paymentMethod.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to remove card');
      }

      alert('Card removed successfully');
      onUpdate();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-3xl">
          {paymentMethod.card.brand === 'visa' && '💳'}
          {paymentMethod.card.brand === 'mastercard' && '💳'}
          {paymentMethod.card.brand === 'amex' && '💳'}
        </div>
        <div>
          <p className="font-semibold capitalize">
            {paymentMethod.card.brand} •••• {paymentMethod.card.last4}
          </p>
          <p className="text-sm text-gray-600">
            Expires {paymentMethod.card.expMonth}/{paymentMethod.card.expYear}
          </p>
          {paymentMethod.isDefault && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Default
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {!paymentMethod.isDefault && (
          <button
            onClick={handleSetDefault}
            disabled={loading}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            Set as Default
          </button>
        )}
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-sm text-red-600 hover:text-red-800 disabled:text-gray-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
```

## Security Features

### 1. PCI Compliance
- Card data never touches your servers
- Stripe Elements handles all sensitive data
- Tokenization via Stripe API

### 2. Authentication
- All endpoints require valid JWT token
- Payment methods verified to belong to authenticated user
- Customer ID validation

### 3. 3D Secure Support
- Automatically handled by Stripe Elements
- `redirect: 'if_required'` prevents unnecessary redirects
- Supports SCA (Strong Customer Authentication) for EU

### 4. Activity Logging
Every payment method change is logged:

```typescript
{
  action: "payment_method_added",
  details: "New payment method added and set as default",
  metadata: {
    paymentMethodId: "pm_123",
    setAsDefault: true
  }
}
```

## Error Handling

### Common Errors

1. **"Cannot remove default payment method with active subscriptions"**
   - User tried to remove their only payment method
   - Solution: Set another card as default first

2. **"Payment method not found"**
   - Payment method doesn't belong to this user
   - Solution: Reload payment methods list

3. **"Failed to add payment method"**
   - Card declined or invalid
   - Solution: Check card details, try different card

4. **"Your card was declined"**
   - Insufficient funds or bank rejection
   - Solution: Contact bank or try different payment method

## Testing

### Test Card Numbers (Stripe Test Mode)

**Successful Cards:**
- Visa: `4242 4242 4242 4242`
- Mastercard: `5555 5555 5555 4444`
- Amex: `3782 822463 10005`

**Declined Cards:**
- Generic decline: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`
- Expired card: `4000 0000 0000 0069`

**3D Secure Required:**
- `4000 0025 0000 3155` - Requires authentication

**Use any future expiry date and any 3-digit CVC**

## Best Practices

1. **Always validate on backend**: Never trust frontend validation alone
2. **Show card brands**: Display appropriate card icons (Visa, MC, Amex)
3. **Confirm before deleting**: Ask for confirmation before removing cards
4. **Handle 3D Secure**: Use `redirect: 'if_required'` for better UX
5. **Update subscriptions**: When setting default, update all active subscriptions
6. **Activity logging**: Log all payment method changes for audit trail
7. **Error messages**: Show user-friendly error messages, not raw Stripe errors

## Production Checklist

- [ ] Configure Stripe publishable key in environment
- [ ] Test all card addition flows
- [ ] Test 3D Secure authentication
- [ ] Test card removal (with and without subscriptions)
- [ ] Test setting default payment method
- [ ] Verify activity logging works
- [ ] Test error scenarios (declined cards, etc.)
- [ ] Implement proper error UI
- [ ] Add loading states
- [ ] Test on mobile devices
- [ ] Verify PCI compliance (card data never touches servers)
