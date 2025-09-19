# Step 9: Payment System Foundation - Test Guide

## Overview
This step implements Stripe integration for subscription management, including checkout, webhooks, and billing portal.

## Components Created

### 1. Configuration Files
- `lib/stripe-config.ts`: Subscription tiers and Stripe configuration
- `lib/stripe-server.ts`: Server-side Stripe utilities

### 2. API Endpoints

#### Checkout API
- `POST /api/stripe/checkout` - Create checkout session
- `GET /api/stripe/checkout` - Get session status

#### Portal API
- `POST /api/stripe/portal` - Create billing portal session

#### Subscription API
- `GET /api/stripe/subscription` - Get current subscription
- `DELETE /api/stripe/subscription` - Cancel subscription
- `PATCH /api/stripe/subscription` - Update/reactivate subscription

#### Webhook API
- `POST /api/stripe/webhook` - Handle Stripe events

### 3. Subscription Tiers
- **FREE**: 5 generators, 10 downloads/month
- **CORE ($9.99)**: 20 generators, unlimited downloads
- **FULL ($19.99)**: All 33+ generators, priority support

## Environment Setup

### 1. Add Stripe Keys to `.env.local`:
```env
# Stripe Keys (get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create in Stripe Dashboard)
STRIPE_CORE_PRICE_ID=price_...
STRIPE_FULL_PRICE_ID=price_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Create Products in Stripe Dashboard:
1. Go to https://dashboard.stripe.com/test/products
2. Create "Core Bundle" product ($9.99/month)
3. Create "Full Access" product ($19.99/month)
4. Copy the price IDs to `.env.local`

### 3. Setup Webhook Endpoint:
```bash
# Install Stripe CLI
# Download from https://stripe.com/docs/stripe-cli

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET in .env.local
```

## Testing Instructions

### Test 1: Checkout Session Creation
```bash
# First, get an auth token (from a logged-in user session)
# Then test checkout creation:

curl -X POST http://localhost:3000/api/stripe/checkout \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"tier": "CORE"}'

# Should return:
# {
#   "sessionId": "cs_test_...",
#   "url": "https://checkout.stripe.com/..."
# }
```

### Test 2: Billing Portal
```bash
curl -X POST http://localhost:3000/api/stripe/portal \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN"

# Should return:
# {
#   "url": "https://billing.stripe.com/..."
# }
```

### Test 3: Webhook Processing
1. Keep Stripe CLI running: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
2. Trigger test events:
```bash
# Test checkout completed
stripe trigger checkout.session.completed

# Test subscription updated
stripe trigger customer.subscription.updated

# Test payment succeeded
stripe trigger invoice.paid
```
3. Check console logs for webhook processing

### Test 4: Subscription Status
```bash
curl http://localhost:3000/api/stripe/subscription \
  -H "Cookie: session-token=YOUR_TOKEN"

# Should return current subscription or:
# {
#   "status": "inactive",
#   "tier": "FREE",
#   "message": "No active subscription"
# }
```

### Test 5: Complete Checkout Flow
1. Create a test user account
2. Call checkout API to get session URL
3. Visit the URL and complete checkout with test card:
   - Card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
4. Verify webhook processed the event
5. Check user's subscription status updated

### Test 6: Cancel Subscription
```bash
curl -X DELETE http://localhost:3000/api/stripe/subscription \
  -H "Cookie: session-token=YOUR_TOKEN"

# Should return:
# {
#   "message": "Subscription will be cancelled at the end of the billing period",
#   "cancelAt": "2024-01-31T..."
# }
```

### Test 7: Reactivate Subscription
```bash
curl -X PATCH http://localhost:3000/api/stripe/subscription \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=YOUR_TOKEN" \
  -d '{"action": "reactivate"}'

# Should return:
# {
#   "message": "Subscription reactivated successfully"
# }
```

## Database Verification

Run Prisma Studio to verify data:
```bash
npm run prisma:studio
```

Check:
1. User has `stripeCustomerId` after checkout
2. Subscription record created with correct tier
3. Payment records created for successful payments
4. Activity logs track all subscription events

## Success Criteria
✅ Checkout session creates successfully
✅ Stripe webhook endpoint receives events
✅ User subscription status updates after payment
✅ Billing portal accessible for subscribers
✅ Subscription can be cancelled
✅ Cancelled subscription can be reactivated
✅ Database records match Stripe state
✅ Activity logs capture all events

## Troubleshooting

### Webhook signature verification fails
- Ensure STRIPE_WEBHOOK_SECRET is correct
- Use raw body in webhook handler (not parsed JSON)

### Checkout session not completing
- Check Stripe Dashboard for error details
- Verify price IDs in environment variables
- Ensure user is authenticated

### Subscription status not updating
- Check webhook forwarding is active
- Verify database migrations are up to date
- Check Stripe Dashboard for webhook delivery status

## Security Notes

1. **Never expose secret keys**: Only use publishable key on frontend
2. **Verify webhook signatures**: Prevents fake webhook calls
3. **Validate user ownership**: Check user owns resources they're accessing
4. **Use metadata**: Track user IDs in Stripe metadata for reconciliation
5. **Handle idempotency**: Webhooks may be delivered multiple times

## Next Steps
Step 10 will implement subscription UI components for the frontend, including:
- Pricing page
- Billing dashboard
- Upgrade/downgrade flows
- Payment method management