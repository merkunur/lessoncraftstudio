# Step 25: Payment Integration - Test Guide

## Overview
This step implements comprehensive payment processing with Stripe integration including subscription management, checkout flow, payment methods, invoicing, and billing portal functionality.

## Components Created

### 1. Stripe Configuration
- `types/stripe.ts`: Type definitions
- Subscription management types
- Payment method types
- Invoice and checkout types
- Usage tracking types
- Webhook event types

### 2. Billing Dashboard
- `app/admin/billing/page.tsx`: Main billing interface
- Overview with current plan
- Usage statistics display
- Quick stats cards
- Multi-tab navigation
- Upgrade/downgrade flow

### 3. Pricing Plans
- Free tier configuration
- Professional plan ($29/month)
- Enterprise plan ($99/month)
- Feature comparison
- Usage limits display
- Recommended badge

### 4. Payment Methods
- `api/admin/billing/payment-methods/route.ts`: Payment API
- Card management
- Default payment method
- Add/remove cards
- Security display
- Expiration tracking

### 5. Invoice System
- `api/admin/billing/invoices/route.ts`: Invoice API
- Invoice listing
- PDF download
- Payment history
- Line items display
- Status tracking

## Testing Instructions

### Prerequisites
1. User must be logged in
2. Stripe test keys configured (for production)
3. Mock data enabled for development
4. Browser payment autofill disabled for testing

### Test 1: View Billing Dashboard
1. Navigate to /admin/billing
2. Verify displays:
   - Current plan details
   - Subscription status
   - Usage statistics
   - Next payment date
   - Quick stats cards
3. All data loads correctly

### Test 2: Current Plan Display
1. View overview tab
2. Check shows:
   - Plan name and description
   - Monthly/yearly price
   - Current billing period
   - Usage meters (worksheets/storage/members)
   - Action buttons
3. Status badge correct color

### Test 3: Usage Tracking
1. View usage meters
2. Verify:
   - Worksheet count accurate
   - Storage usage displayed
   - Team member count
   - Progress bars update
   - Percentages calculated correctly

### Test 4: Browse Pricing Plans
1. Click Plans tab
2. View all tiers:
   - Free plan features
   - Professional plan (recommended)
   - Enterprise plan
3. Compare features
4. Limits clearly shown

### Test 5: Select New Plan
1. Click "Upgrade Plan" button
2. Modal opens with plans
3. Select different tier
4. Verify:
   - Current plan disabled
   - Other plans selectable
   - Pricing accurate
5. Click Select Plan

### Test 6: Checkout Process
1. After selecting plan
2. Should redirect to:
   - Stripe checkout (production)
   - Mock checkout URL (development)
3. Success/cancel URLs configured
4. Session expires in 30 minutes

### Test 7: Payment Methods List
1. Click Payment Methods tab
2. View saved cards:
   - Card brand and last 4 digits
   - Expiration date
   - Default badge
3. Multiple cards supported

### Test 8: Add Payment Method
1. Click "Add Payment Method"
2. Enter card details
3. Save method
4. Verify:
   - Card added to list
   - Can set as default
   - Validation works

### Test 9: Remove Payment Method
1. Select non-default card
2. Click Remove button
3. Confirm deletion
4. Card removed from list
5. Cannot remove default card

### Test 10: Set Default Payment
1. Select non-default card
2. Click "Set as Default"
3. Verify:
   - Previous default updated
   - New card marked default
   - API call successful

### Test 11: View Invoices
1. Click Invoices tab
2. Table displays:
   - Invoice number
   - Date range
   - Amount
   - Status (paid/open/draft)
   - Actions (download/view)
3. Sorted by date

### Test 12: Download Invoice
1. Click download icon
2. PDF downloads/opens
3. Contains:
   - Company details
   - Line items
   - Tax information
   - Payment details

### Test 13: View Online Invoice
1. Click external link icon
2. Opens hosted invoice
3. Shows full details
4. Can print or save

### Test 14: Cancel Subscription
1. Click Cancel button
2. Confirmation dialog appears
3. Confirm cancellation
4. Verify:
   - Status updates to "Canceling"
   - End date shown
   - Access retained until end

### Test 15: Pause Subscription
1. Click Pause button
2. Select resume date (optional)
3. Confirm pause
4. Status shows "Paused"
5. Resume date displayed

### Test 16: Resume Subscription
1. With paused subscription
2. Click Resume button
3. Subscription reactivates
4. Status returns to "Active"
5. Billing resumes

### Test 17: Usage Limits
1. Approach plan limits
2. Warning indicators appear:
   - Yellow at 80%
   - Red at 95%
3. Upgrade prompts shown
4. Cannot exceed limits

### Test 18: Plan Downgrade
1. Select lower tier plan
2. Warning about feature loss
3. Confirm downgrade
4. Takes effect next period
5. Prorated credit applied

### Test 19: Plan Upgrade
1. Select higher tier plan
2. Immediate upgrade option
3. Prorated charge calculated
4. New features available
5. Limits increased

### Test 20: Billing Period
1. View current period dates
2. Check renewal date
3. Verify:
   - Period start correct
   - Period end accurate
   - Days remaining shown
   - Auto-renewal status

## Advanced Testing

### Test 21: Webhook Processing
1. Trigger Stripe webhook
2. Events processed:
   - payment_succeeded
   - payment_failed
   - subscription_updated
   - invoice_paid
3. Database updated
4. User notified

### Test 22: Failed Payment
1. Simulate payment failure
2. Verify:
   - Status changes to "Past Due"
   - Warning emails sent
   - Grace period applied
   - Retry attempts logged

### Test 23: Trial Period
1. Start free trial
2. Check:
   - Trial end date shown
   - Full features accessible
   - No charge until trial ends
   - Convert to paid option

### Test 24: Coupon Codes
1. Apply discount code
2. Verify:
   - Discount calculated
   - Duration applied
   - Restrictions enforced
   - Cannot stack codes

### Test 25: Tax Calculation
1. Enter tax information
2. VAT/sales tax applied
3. Invoice shows:
   - Tax rate
   - Tax amount
   - Total with tax
4. Tax ID validated

## API Testing

### Create Checkout Session
```bash
curl -X POST /api/admin/billing/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "planId": "plan_professional",
    "successUrl": "/billing/success",
    "cancelUrl": "/billing/cancel"
  }'
```

### Get Subscription Status
```bash
curl /api/admin/billing/subscription \
  -H "Authorization: Bearer TOKEN"
```

### Add Payment Method
```bash
curl -X POST /api/admin/billing/payment-methods \
  -H "Content-Type: application/json" \
  -d '{
    "paymentMethodId": "pm_card_visa",
    "setAsDefault": true
  }'
```

### Get Usage Data
```bash
curl /api/admin/billing/usage?period=month \
  -H "Authorization: Bearer TOKEN"
```

## Performance Benchmarks
1. Dashboard load: < 500ms
2. Plan selection: < 200ms
3. Checkout redirect: < 1 second
4. Invoice generation: < 2 seconds
5. Payment processing: < 3 seconds
6. Webhook processing: < 500ms
7. Usage calculation: < 100ms

## Success Criteria
✅ Billing dashboard loads completely
✅ All pricing plans displayed
✅ Checkout process initiates
✅ Payment methods manageable
✅ Invoices downloadable
✅ Subscription actions work
✅ Usage tracking accurate
✅ Webhooks process correctly
✅ Error handling robust
✅ Security measures in place

## Common Issues & Solutions

### Issue: Stripe keys not configured
- Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- Set STRIPE_SECRET_KEY (server only)
- Set STRIPE_WEBHOOK_SECRET
- Use test keys for development

### Issue: Checkout session fails
- Verify Stripe account active
- Check product/price IDs exist
- Ensure customer email valid
- Review API key permissions

### Issue: Webhooks not received
- Configure webhook endpoint in Stripe
- Verify webhook secret matches
- Check firewall/proxy settings
- Use Stripe CLI for local testing

### Issue: Payment method fails
- Validate card details
- Check for sufficient funds
- Verify billing address
- Test with Stripe test cards

### Issue: Invoice PDF not generating
- Check Stripe invoice settings
- Verify PDF generation enabled
- Ensure proper permissions
- Test download endpoint

## Security Best Practices
1. Never expose secret keys client-side
2. Validate webhook signatures
3. Use HTTPS for all payment flows
4. Implement rate limiting
5. Log all payment events
6. PCI compliance for card handling
7. Secure storage of customer data
8. Regular security audits

## Stripe Test Cards
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Requires Auth: 4000 0025 0000 3155
- Expired: 4000 0000 0000 0069
- Insufficient Funds: 4000 0000 0000 9995

## Next Steps
Step 26 will implement Analytics and Reporting with:
- Usage analytics dashboard
- Revenue tracking
- User behavior analytics
- Custom report builder
- Export capabilities