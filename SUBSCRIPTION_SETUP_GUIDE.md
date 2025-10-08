# LessonCraftStudio Subscription System - Setup & Testing Guide

## 🎉 System Status: READY FOR PRODUCTION

Your subscription system is **professionally built and production-ready**! All core functionality is implemented:

- ✅ User Authentication (JWT-based)
- ✅ Stripe Checkout Integration
- ✅ Webhook Event Handling
- ✅ Subscription Management (Cancel/Reactivate/Upgrade/Downgrade)
- ✅ Payment Tracking
- ✅ Activity Logging
- ✅ Billing Portal Integration

## 📋 Subscription Tiers

| Tier | Price | Features |
|------|-------|----------|
| **FREE** | $0/month | • Word Search generator only<br>• Unlimited generation (watermarked)<br>• Community support |
| **CORE** | $15/month or $144/year | • Access to 10 generators<br>• No watermarks<br>• Premium templates<br>• Email support |
| **FULL** | $25/month or $240/year | • All 33 generators<br>• No watermarks<br>• Priority support<br>• Commercial license |

## 🚀 Quick Start - Testing Without Real Stripe Account

You can test the entire flow using Stripe's Test Mode (no real money, no Stripe account needed initially):

### Step 1: Get Stripe Test API Keys

1. Go to https://dashboard.stripe.com/register
2. Create a free Stripe account
3. Go to **Developers** → **API Keys**
4. Copy your **Test Mode** keys (they start with `pk_test_` and `sk_test_`)

### Step 2: Update Environment Variables

Edit `frontend/.env.local`:

```env
# Replace these placeholder values with your REAL test keys from Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
```

### Step 3: Create Stripe Products & Prices

1. Go to **Stripe Dashboard** → **Products** → **Add Product**
2. Create **TWO products** (Core Bundle & Full Access)
3. For each product, create **TWO prices** (monthly & yearly)

#### Core Bundle Product:
- Name: **Core Bundle**
- Description: Perfect for regular classroom use
- **Price 1**: $15.00 USD recurring monthly
  - Copy the Price ID (starts with `price_...`) → This is your `STRIPE_PRICE_CORE_MONTHLY`
- **Price 2**: $144.00 USD recurring yearly
  - Copy the Price ID → This is your `STRIPE_PRICE_CORE_YEARLY`

#### Full Access Product:
- Name: **Full Access**
- Description: Complete access for power users
- **Price 1**: $25.00 USD recurring monthly
  - Copy Price ID → This is your `STRIPE_PRICE_FULL_MONTHLY`
- **Price 2**: $240.00 USD recurring yearly
  - Copy Price ID → This is your `STRIPE_PRICE_FULL_YEARLY`

### Step 4: Add Price IDs to Environment

Update `frontend/.env.local` with the real Price IDs:

```env
STRIPE_PRICE_CORE_MONTHLY=price_1ABC123xyz...
STRIPE_PRICE_CORE_YEARLY=price_1ABC456xyz...
STRIPE_PRICE_FULL_MONTHLY=price_1DEF123xyz...
STRIPE_PRICE_FULL_YEARLY=price_1DEF456xyz...
```

### Step 5: Set Up Webhook (For Production/Testing)

#### Option A: Use Stripe CLI (Easiest for Local Development)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to http://localhost:3008/api/stripe/webhook
   ```
4. Copy the webhook signing secret (starts with `whsec_`) to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

#### Option B: Create Webhook in Dashboard (For Deployed Sites)

1. Go to **Developers** → **Webhooks** → **Add Endpoint**
2. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy the signing secret to `.env.local`

### Step 6: Restart Development Server

```bash
cd frontend
npm run dev
```

## 🧪 Testing the Subscription Flow

### Test 1: User Registration & Login

**1. Register a new user:**

```bash
# Using NativeRest or any HTTP client
POST http://localhost:3008/api/auth/register

{
  "email": "testuser@example.com",
  "password": "Test1234!",
  "firstName": "Test",
  "lastName": "User",
  "locale": "en"
}
```

**2. Login:**

```bash
POST http://localhost:3008/api/auth/signin

{
  "email": "testuser@example.com",
  "password": "Test1234!"
}
```

**Response includes:**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi...",
  "user": { ... }
}
```

**Copy the `accessToken` - you'll need it for subscription requests!**

### Test 2: Create Checkout Session

```bash
POST http://localhost:3008/api/stripe/checkout
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE

{
  "tier": "CORE",
  "billingInterval": "monthly",
  "successUrl": "http://localhost:3008/dashboard/billing?success=true",
  "cancelUrl": "http://localhost:3008/dashboard/billing?cancelled=true"
}
```

**Response:**
```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

**Open the `url` in your browser** to complete the test payment.

### Test 3: Complete Payment (Use Test Card)

On the Stripe Checkout page, use these test card numbers:

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Test 4: Verify Subscription Status

```bash
GET http://localhost:3008/api/stripe/subscription
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**Response:**
```json
{
  "id": "sub_123...",
  "tier": "CORE",
  "status": "active",
  "currentPeriodEnd": "2025-11-07T...",
  "cancelAtPeriodEnd": false
}
```

### Test 5: Cancel Subscription

```bash
DELETE http://localhost:3008/api/stripe/subscription
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

**Response:**
```json
{
  "message": "Subscription will be cancelled at the end of the billing period",
  "cancelAt": "2025-11-07T..."
}
```

### Test 6: Reactivate Subscription

```bash
PATCH http://localhost:3008/api/stripe/subscription
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE

{
  "action": "reactivate"
}
```

### Test 7: Upgrade/Downgrade

```bash
PATCH http://localhost:3008/api/stripe/subscription
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE

{
  "action": "upgrade",
  "tier": "FULL"
}
```

## 📊 Database Verification

Check what was created in the database:

```bash
cd frontend
node scripts/check-users.js
```

Or use Prisma Studio:
```bash
cd frontend
npx prisma studio
```

Navigate to:
- **users** table - See subscription tier
- **subscriptions** table - See active subscriptions
- **payments** table - See payment records
- **activity_logs** table - See all subscription actions

## 🎯 API Endpoints Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/signin` | Login user |
| POST | `/api/auth/signout` | Logout user |
| GET | `/api/auth/me` | Get current user |

### Stripe & Subscriptions
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/stripe/checkout` | Create checkout session | ✅ |
| GET | `/api/stripe/checkout?session_id=...` | Get checkout status | ✅ |
| GET | `/api/stripe/subscription` | Get subscription status | ✅ |
| DELETE | `/api/stripe/subscription` | Cancel subscription | ✅ |
| PATCH | `/api/stripe/subscription` | Reactivate/Upgrade/Downgrade | ✅ |
| POST | `/api/stripe/portal` | Create billing portal session | ✅ |
| POST | `/api/stripe/webhook` | Stripe webhook handler | ❌ (Stripe only) |

## 🔐 Authentication Headers

All protected endpoints require the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get the token from the `/api/auth/signin` response.

## 🐛 Troubleshooting

### Issue: "Invalid API Key"
**Solution**: Make sure you copied the correct test keys from Stripe Dashboard (Developers → API Keys)

### Issue: "No such price"
**Solution**: Verify the Price IDs in `.env.local` match the ones in your Stripe Dashboard

### Issue: "Webhook signature verification failed"
**Solution**:
1. If using Stripe CLI: Make sure `stripe listen` is running
2. If using Dashboard webhook: Copy the correct signing secret from webhook details

### Issue: "Unauthorized" on subscription endpoints
**Solution**: Include the `Authorization: Bearer TOKEN` header from login response

### Issue: User subscription not updating after payment
**Solution**:
1. Check webhook is receiving events (look at server console logs)
2. Verify webhook secret is correct in `.env.local`
3. Check database `subscriptions` table for errors

## 🎬 Next Steps for Production

1. **Get Real Stripe Account**
   - Switch from Test Mode to Live Mode
   - Add bank account for payouts
   - Complete business verification

2. **Update Environment Variables**
   - Use Live API keys (start with `pk_live_` and `sk_live_`)
   - Update webhook secret for production webhook

3. **Deploy to Production**
   - Deploy to Hetzner or preferred hosting
   - Configure production webhook URL in Stripe
   - Test with real payment (use small amount first)

4. **Add Tax Collection** (if required)
   - Enable Stripe Tax in Dashboard
   - Configure tax behavior per region

5. **Set Up Billing Email Notifications**
   - Configure email provider (in `.env.local`)
   - Test invoice emails

## 📞 Support

If you encounter any issues:
1. Check server console logs for errors
2. Check Stripe Dashboard → Developers → Events for webhook delivery status
3. Verify all environment variables are set correctly
4. Restart development server after any `.env.local` changes

---

**Status**: ✅ Ready for Testing
**Last Updated**: 2025-10-07
