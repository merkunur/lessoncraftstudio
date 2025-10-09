# Subscription Upgrade/Downgrade Guide

## Overview

This guide explains how to implement subscription tier changes (upgrades/downgrades) and billing interval changes (monthly ↔ yearly) with proper proration handling.

## Key Concepts

### 1. Proration
When a user upgrades or changes their subscription:
- **Immediate charge**: User pays prorated amount for the remainder of current billing period
- **Credit applied**: If downgrading, unused time is credited toward new plan
- **Tax calculated**: Stripe Tax automatically calculates tax on prorated amount

### 2. Change Types

**Tier Upgrade (CORE → FULL)**
- Immediate access to new features
- Prorated charge for price difference
- Occurs immediately

**Tier Downgrade (FULL → CORE)**
- Change effective immediately with prorated credit
- User charged difference at next billing cycle

**Billing Interval Change**
- Monthly → Yearly: Immediate proration, 20% discount applied
- Yearly → Monthly: Prorated credit applied, higher per-month cost

## API Endpoints

### 1. Preview Subscription Change
**Endpoint**: `POST /api/stripe/subscription/preview`

Preview the cost before making changes.

**Request Body**:
```json
{
  "tier": "FULL",              // Target tier: "CORE" or "FULL"
  "billingInterval": "yearly"  // Optional: "monthly" or "yearly"
}
```

**Response**:
```json
{
  "currentPlan": {
    "tier": "CORE",
    "billingInterval": "monthly",
    "price": 15
  },
  "newPlan": {
    "tier": "FULL",
    "billingInterval": "yearly",
    "price": 240,
    "pricePerMonth": 20
  },
  "proration": {
    "changeType": "upgrade",
    "immediateCharge": 167.50,
    "tax": 13.40,
    "subtotal": 154.10,
    "currency": "usd",
    "nextBillingDate": "2024-11-15T00:00:00.000Z",
    "prorationDate": "2024-10-15T10:30:00.000Z"
  },
  "description": "You'll immediately get access to FULL features. Your card will be charged the prorated amount for the remainder of your billing period."
}
```

### 2. Execute Subscription Change
**Endpoint**: `PATCH /api/stripe/subscription`

**Request Body**:
```json
{
  "action": "change_plan",
  "tier": "FULL",
  "billingInterval": "yearly"  // Optional
}
```

**Response**:
```json
{
  "message": "Subscription updated successfully",
  "newTier": "FULL",
  "newBillingInterval": "yearly",
  "changeType": "upgrade"
}
```

### 3. Reactivate Cancelled Subscription
**Endpoint**: `PATCH /api/stripe/subscription`

**Request Body**:
```json
{
  "action": "reactivate"
}
```

## Frontend Implementation Example

```typescript
'use client';

import { useState } from 'react';

export function UpgradeButton({ currentTier }: { currentTier: string }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);

  // Step 1: Preview the change
  async function previewUpgrade() {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/subscription/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: 'FULL',
          billingInterval: 'yearly',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      const data = await response.json();
      setPreview(data);
    } catch (error) {
      console.error('Preview error:', error);
      alert('Failed to preview upgrade');
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Execute the change
  async function executeUpgrade() {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/subscription', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_plan',
          tier: 'FULL',
          billingInterval: 'yearly',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      const data = await response.json();
      alert('Subscription upgraded successfully!');
      window.location.reload(); // Refresh to show new tier
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to upgrade subscription');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={previewUpgrade}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Preview Upgrade to Full
      </button>

      {preview && (
        <div className="border p-4 rounded">
          <h3 className="font-bold">Upgrade Preview</h3>
          <p>{preview.description}</p>
          <div className="mt-4">
            <p>Current: {preview.currentPlan.tier} ({preview.currentPlan.billingInterval})</p>
            <p>New: {preview.newPlan.tier} ({preview.newPlan.billingInterval})</p>
            <p className="font-bold mt-2">
              Immediate Charge: ${preview.proration.immediateCharge.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">
              (Includes tax: ${preview.proration.tax.toFixed(2)})
            </p>
          </div>

          <button
            onClick={executeUpgrade}
            disabled={loading}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirm Upgrade
          </button>
        </div>
      )}
    </div>
  );
}
```

## How Proration Works

### Upgrade Example (CORE Monthly $15 → FULL Monthly $25)

**Scenario**: User upgrades 15 days into their 30-day billing cycle

1. **Current subscription**: $15/month CORE
2. **Days remaining**: 15 days (50% of cycle)
3. **Credit for unused CORE**: $15 × 50% = $7.50
4. **Charge for remaining FULL**: $25 × 50% = $12.50
5. **Net immediate charge**: $12.50 - $7.50 = $5.00
6. **With tax (20%)**: $5.00 + $1.00 = **$6.00 total**

Next billing cycle: Full $25 + tax

### Interval Change Example (CORE Monthly $15 → CORE Yearly $144)

**Scenario**: User switches to annual billing 10 days into monthly cycle

1. **Current subscription**: $15/month
2. **Days remaining**: 20 days (67% of cycle)
3. **Credit for unused monthly**: $15 × 67% = $10.05
4. **Annual cost**: $144/year (save $36/year vs monthly)
5. **Prorated annual for 20 days**: $144 × (20/365) = $7.89
6. **Net immediate charge**: $7.89 - $10.05 = **-$2.16 credit**

User receives $2.16 credit, next charge is full $144 in one year

## Email Notifications

When a subscription is upgraded/downgraded, the system automatically sends an email:

- **Template**: `SubscriptionUpgradeEmail`
- **Languages**: All 11 supported languages
- **Contains**: Old plan, new plan, what changed
- **Subject** (English): "Subscription Upgraded - LessonCraftStudio"

The email is sent via the priority queue to ensure delivery.

## Activity Logging

Every subscription change is logged to the `ActivityLog` table:

```typescript
{
  userId: "user_123",
  action: "subscription_upgraded", // or "subscription_downgraded" or "billing_interval_changed_to_yearly"
  details: "Subscription changed from core_monthly to full_yearly",
  metadata: {
    subscriptionId: "sub_123",
    fromTier: "core",
    toTier: "full",
    fromInterval: "monthly",
    toInterval: "yearly"
  }
}
```

## Error Handling

### Common Errors

1. **"No active subscription found"**
   - User doesn't have an active subscription
   - Solution: Redirect to checkout to create new subscription

2. **"This is your current plan"**
   - User is trying to "upgrade" to their current plan
   - Solution: Show message that they already have this plan

3. **"Invalid subscription tier or billing interval"**
   - Price ID not configured in environment variables
   - Solution: Check `.env.local` for proper Stripe price IDs

4. **"Failed to preview subscription change"**
   - Stripe API error (network, invalid customer, etc.)
   - Solution: Check Stripe Dashboard and logs

## Testing Scenarios

### Test Plan

1. **Upgrade: CORE Monthly → FULL Monthly**
   - Preview shows correct proration
   - Upgrade executes immediately
   - Email sent with upgrade confirmation
   - Activity logged correctly

2. **Downgrade: FULL Yearly → CORE Yearly**
   - Preview shows credit applied
   - Downgrade executes with proration
   - Email sent with downgrade notice
   - Activity logged correctly

3. **Interval Change: CORE Monthly → CORE Yearly**
   - Preview shows annual discount
   - Change executes with proper proration
   - Email sent with interval change notice
   - Activity logged with interval change

4. **Invalid Changes**
   - Try to change to same plan → Error
   - Try to change without active subscription → Error
   - Try to change with invalid tier → Error

### Test with Stripe Test Mode

Use test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## Database Schema

### Subscription Model
```prisma
model Subscription {
  id                    String   @id @default(cuid())
  userId                String
  planName              String   // e.g., "core_monthly", "full_yearly"
  stripePriceId         String?
  stripeSubscriptionId  String?  @unique
  billingInterval       String?  // "monthly" or "yearly"
  status                String   // "active", "canceled", etc.
  cancelAtPeriodEnd     Boolean  @default(false)
  currentPeriodEnd      DateTime?
  // ... other fields
}
```

## Security Considerations

1. **Authentication Required**: All endpoints require valid JWT token
2. **User Ownership**: Endpoints verify subscription belongs to authenticated user
3. **Stripe Verification**: Subscription changes verified through Stripe API
4. **Tax Compliance**: Automatic tax calculation ensures compliance
5. **Activity Logging**: All changes tracked for audit trail

## Production Checklist

- [ ] Configure Stripe price IDs in environment variables
- [ ] Enable Stripe Tax in Stripe Dashboard
- [ ] Test all upgrade/downgrade paths
- [ ] Verify email notifications work
- [ ] Check activity logging
- [ ] Test with different tax jurisdictions
- [ ] Implement frontend UI for subscription changes
- [ ] Add confirmation dialogs before changes
- [ ] Handle edge cases (expired cards, insufficient funds)
- [ ] Set up monitoring for failed subscription changes
