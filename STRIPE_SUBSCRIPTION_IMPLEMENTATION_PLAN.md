# 🎯 Professional Stripe Subscription & User Control Implementation Plan

## Executive Summary

This document outlines the comprehensive implementation plan for automating Stripe payments, subscription management, and providing admin user control for LessonCraftStudio.

**Status**: Ready for Implementation
**Estimated Time**: 2-3 days
**Priority**: High
**Complexity**: Medium-High

---

## 📊 Current State Analysis

### ✅ ALREADY IMPLEMENTED

1. **Database Schema** (Excellent Foundation)
   - `User` model with subscription fields (`subscriptionTier`, `stripeCustomerId`)
   - `Subscription` model with full lifecycle tracking
   - `Payment` model for transaction history
   - Proper indexes and relations

2. **Admin Dashboard Structure**
   - `/admin` dashboard with stats overview
   - `/admin/users` user management page with filters, search, bulk actions
   - `/admin/subscriptions` subscription management with MRR/ARR tracking
   - `/admin/subscriptions/payments` payment tracking page (exists)

3. **Stripe Integration Started**
   - Stripe libraries installed (`stripe`, `@stripe/stripe-js`)
   - Price configuration in `stripe-config.ts`
   - Client-side checkout helpers in `stripe.ts`
   - Pricing tiers defined: Free, Core ($15/mo), Full ($25/mo)

4. **Admin Navigation**
   - Comprehensive sidebar with all sections
   - User authentication and admin checks

### ❌ MISSING COMPONENTS (Implementation Required)

1. **User Control Link** - Not visible/active in admin dashboard
2. **Stripe Webhook Handlers** - Critical for automation
3. **Subscription Automation** - Lifecycle management
4. **Customer Portal** - Self-service management
5. **API Endpoints** - Backend integration
6. **Email Notifications** - Automated communications
7. **Testing Suite** - Quality assurance

---

## 🏗️ Implementation Plan

### PHASE 1: User Control Integration (2 hours)

#### 1.1 Update Admin Navigation

**File**: `frontend/components/admin/admin-layout.tsx` (Line 51-145)

**Action**: The "Users" submenu already exists but needs enhancement. Add new dedicated "User Control" section:

```typescript
{
  name: 'User Control', // NEW SECTION
  icon: Users,
  current: pathname.startsWith('/admin/user-control'),
  children: [
    { name: 'All Users', href: '/admin/user-control' },
    { name: 'Subscriptions', href: '/admin/user-control/subscriptions' },
    { name: 'Billing History', href: '/admin/user-control/billing' },
    { name: 'Quota Management', href: '/admin/user-control/quotas' },
    { name: 'Bulk Operations', href: '/admin/user-control/bulk' },
  ],
},
```

#### 1.2 Create User Control Dashboard

**New File**: `frontend/app/admin/user-control/page.tsx`

**Features**:
- Unified view of users, subscriptions, and payments
- Quick actions: Upgrade/downgrade, suspend, refund
- Real-time subscription status
- Payment method management
- Usage quota overview

---

### PHASE 2: Stripe Webhook System (4 hours)

#### 2.1 Create Webhook Handler

**New File**: `frontend/app/api/stripe/webhook/route.ts`

**Webhook Events to Handle**:

```typescript
export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Verify webhook signature
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

  switch (event.type) {
    case 'checkout.session.completed':
      // Create subscription, update user tier
      await handleCheckoutCompleted(event.data.object);
      break;

    case 'customer.subscription.created':
      // New subscription started
      await handleSubscriptionCreated(event.data.object);
      break;

    case 'customer.subscription.updated':
      // Subscription changed (upgrade/downgrade/renewal)
      await handleSubscriptionUpdated(event.data.object);
      break;

    case 'customer.subscription.deleted':
      // Subscription cancelled/expired
      await handleSubscriptionDeleted(event.data.object);
      break;

    case 'invoice.paid':
      // Payment successful
      await handleInvoicePaid(event.data.object);
      break;

    case 'invoice.payment_failed':
      // Payment failed - retry logic
      await handlePaymentFailed(event.data.object);
      break;

    case 'customer.subscription.trial_will_end':
      // Trial ending soon (3 days notice)
      await handleTrialEnding(event.data.object);
      break;
  }
}
```

#### 2.2 Webhook Event Handlers

**New File**: `frontend/lib/stripe-webhooks.ts`

```typescript
export async function handleCheckoutCompleted(session) {
  // 1. Get customer and subscription from Stripe
  // 2. Update User.stripeCustomerId
  // 3. Create/Update Subscription record
  // 4. Update User.subscriptionTier
  // 5. Create initial UsageQuota
  // 6. Send welcome email
  // 7. Log activity
}

export async function handleSubscriptionUpdated(subscription) {
  // 1. Find user by stripeCustomerId
  // 2. Update subscription status
  // 3. Handle tier changes (upgrade/downgrade)
  // 4. Update usage quotas
  // 5. Send confirmation email
  // 6. Log activity
}

export async function handlePaymentFailed(invoice) {
  // 1. Update subscription status to 'past_due'
  // 2. Send payment failed email
  // 3. Schedule retry (Stripe handles this automatically)
  // 4. After 3 failures, cancel subscription
  // 5. Notify admin
}
```

---

### PHASE 3: Subscription Management API (4 hours)

#### 3.1 Checkout Session Creation

**New File**: `frontend/app/api/stripe/create-checkout/route.ts`

```typescript
export async function POST(request: Request) {
  const { priceId, tier, interval, userId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    customer: user.stripeCustomerId, // Existing customer
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
    metadata: { userId, tier, interval },
    subscription_data: {
      metadata: { userId, tier },
    },
  });

  return Response.json({ sessionId: session.id });
}
```

#### 3.2 Customer Portal Session

**New File**: `frontend/app/api/stripe/create-portal/route.ts`

```typescript
export async function POST(request: Request) {
  const user = await getAuthenticatedUser(request);

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
  });

  return Response.json({ url: session.url });
}
```

#### 3.3 Admin Subscription Operations

**New File**: `frontend/app/api/admin/subscriptions/[id]/route.ts`

```typescript
// PATCH: Update subscription
export async function PATCH(request: Request, { params }) {
  const { action, data } = await request.json();

  switch (action) {
    case 'cancel':
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
      break;

    case 'reactivate':
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        cancel_at_period_end: false
      });
      break;

    case 'upgrade':
      await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
        items: [{ id: subscription.itemId, price: data.newPriceId }],
        proration_behavior: 'create_prorations'
      });
      break;

    case 'refund':
      await stripe.refunds.create({
        payment_intent: data.paymentIntentId
      });
      break;
  }
}
```

---

### PHASE 4: User Control Dashboard Features (3 hours)

#### 4.1 Enhanced User Detail Page

**File**: `frontend/app/admin/users/[id]/page.tsx` (Enhance existing)

**Add Sections**:
1. **Subscription Management**
   - Current plan & status
   - Payment method on file
   - Billing history
   - Quick upgrade/downgrade buttons

2. **Usage Metrics**
   - Worksheets generated this month
   - Downloads used
   - Generators accessed
   - Quota utilization chart

3. **Quick Actions**
   - Grant free subscription
   - Apply discount code
   - Extend trial
   - Reset password
   - Suspend/unsuspend account
   - Delete account (with confirmation)

4. **Activity Timeline**
   - Login history
   - Subscription changes
   - Payment transactions
   - Support tickets

#### 4.2 Bulk Operations Enhancement

**File**: `frontend/app/admin/user-control/bulk/page.tsx` (New)

**Operations**:
- Grant subscription to multiple users
- Send email to filtered users
- Export user data
- Apply quota adjustments
- Suspend accounts (with reason)

---

### PHASE 5: Automated Email Notifications (2 hours)

#### 5.1 Email Templates

**New Files**: Create email templates in `frontend/lib/email-templates/`

1. `subscription-created.ts` - Welcome email with plan details
2. `subscription-upgraded.ts` - Upgrade confirmation
3. `subscription-downgraded.ts` - Downgrade confirmation
4. `subscription-cancelled.ts` - Cancellation confirmation
5. `payment-failed.ts` - Payment issue notification
6. `trial-ending.ts` - 3-day trial ending warning
7. `subscription-renewed.ts` - Monthly/yearly renewal confirmation

#### 5.2 Email Service Integration

**File**: `frontend/lib/email-service.ts`

```typescript
export async function sendEmail(template, userId, data) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const emailTemplate = await getEmailTemplate(template);

  // Use nodemailer or SendGrid
  await transporter.sendMail({
    to: user.email,
    subject: emailTemplate.subject,
    html: renderTemplate(emailTemplate.html, { user, ...data })
  });

  // Log email sent
  await prisma.activityLog.create({
    data: {
      userId,
      action: 'email_sent',
      details: template,
      metadata: { template, ...data }
    }
  });
}
```

---

### PHASE 6: Testing & Quality Assurance (3 hours)

#### 6.1 Stripe Test Mode Configuration

**File**: `.env.local`

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY=price_test_...
NEXT_PUBLIC_STRIPE_PRICE_CORE_YEARLY=price_test_...
NEXT_PUBLIC_STRIPE_PRICE_FULL_MONTHLY=price_test_...
NEXT_PUBLIC_STRIPE_PRICE_FULL_YEARLY=price_test_...
```

#### 6.2 Test Scenarios

**Test Suite**: `frontend/__tests__/stripe-integration.test.ts`

1. **Subscription Creation**
   - New user subscribes → Creates Stripe customer + subscription
   - User tier updated correctly
   - Usage quota initialized

2. **Subscription Upgrade**
   - Core → Full upgrade works
   - Prorated charges calculated correctly
   - Quota limits updated immediately

3. **Subscription Downgrade**
   - Full → Core downgrade scheduled for period end
   - User retains access until period ends
   - Quota adjusted on renewal

4. **Payment Failure**
   - Card declined → Subscription marked past_due
   - User notified via email
   - Admin notified after 3 failures
   - Subscription auto-cancelled after final failure

5. **Cancellation Flow**
   - User cancels → cancel_at_period_end set
   - Access retained until period ends
   - Tier reverts to Free on expiration

6. **Webhook Processing**
   - All 7 webhook events processed correctly
   - Database updates atomic
   - Email notifications sent
   - Activity logged

---

## 🔐 Security Considerations

### 1. Webhook Signature Verification
```typescript
// ALWAYS verify Stripe webhook signatures
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  webhookSecret
);
```

### 2. Idempotency
```typescript
// Handle duplicate webhooks gracefully
const existingPayment = await prisma.payment.findUnique({
  where: { stripePaymentId: event.data.object.id }
});
if (existingPayment) return; // Already processed
```

### 3. Admin Authorization
```typescript
// ALWAYS verify admin access
if (!user?.isAdmin) {
  return Response.json({ error: 'Unauthorized' }, { status: 403 });
}
```

### 4. Sensitive Data Protection
- Never log Stripe secret keys
- Sanitize user emails in logs
- Use environment variables for all secrets

---

## 📈 Monitoring & Analytics

### 1. Key Metrics Dashboard

**File**: `frontend/app/admin/user-control/analytics/page.tsx`

**Track**:
- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Churn Rate
- Upgrade/Downgrade ratios
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)
- Payment success/failure rates

### 2. Alert System

**Conditions to Monitor**:
- Churn rate > 5% (send admin email)
- Failed payments > 10/day (investigate)
- Subscription cancellations spike
- Webhook processing delays

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Create Stripe account (live mode)
- [ ] Set up production price IDs
- [ ] Configure webhook endpoint in Stripe Dashboard
- [ ] Update environment variables (production)
- [ ] Test all payment flows in test mode
- [ ] Run database migrations
- [ ] Configure email service (SendGrid/Mailgun)
- [ ] Set up monitoring alerts
- [ ] Create admin account
- [ ] Test admin user control features
- [ ] Document support procedures
- [ ] Create runbook for common issues

### Production Environment Variables

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Prices (PRODUCTION)
NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_CORE_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_FULL_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_FULL_YEARLY=price_...

# URLs
NEXT_PUBLIC_URL=https://lessoncraftstudio.com
```

---

## 📚 File Structure

```
frontend/
├── app/
│   ├── admin/
│   │   ├── user-control/                    # NEW
│   │   │   ├── page.tsx                     # Main user control dashboard
│   │   │   ├── subscriptions/
│   │   │   │   └── page.tsx                 # Subscription management
│   │   │   ├── billing/
│   │   │   │   └── page.tsx                 # Billing history
│   │   │   ├── quotas/
│   │   │   │   └── page.tsx                 # Quota management
│   │   │   ├── bulk/
│   │   │   │   └── page.tsx                 # Bulk operations
│   │   │   └── analytics/
│   │   │       └── page.tsx                 # Subscription analytics
│   │   ├── users/[id]/page.tsx              # ENHANCE
│   │   └── subscriptions/
│   │       ├── page.tsx                     # EXISTS
│   │       └── [id]/page.tsx                # ENHANCE
│   └── api/
│       ├── stripe/                           # NEW
│       │   ├── webhook/route.ts             # Webhook handler
│       │   ├── create-checkout/route.ts     # Checkout session
│       │   └── create-portal/route.ts       # Customer portal
│       └── admin/
│           ├── subscriptions/
│           │   └── [id]/route.ts            # Admin subscription operations
│           └── users/
│               └── [id]/
│                   └── subscription/route.ts # User subscription management
├── lib/
│   ├── stripe-webhooks.ts                    # NEW - Webhook handlers
│   ├── email-service.ts                      # NEW - Email notifications
│   ├── email-templates/                      # NEW - Email templates
│   │   ├── subscription-created.ts
│   │   ├── payment-failed.ts
│   │   └── ...
│   ├── stripe.ts                             # EXISTS - Enhance
│   └── stripe-config.ts                      # EXISTS
└── __tests__/
    └── stripe-integration.test.ts            # NEW - Test suite
```

---

## 💰 Pricing Structure (Reference)

| Plan | Monthly | Yearly | Generators | Watermark | Support |
|------|---------|--------|------------|-----------|---------|
| **Free** | $0 | $0 | 1 (Word Search) | Yes | Community |
| **Core** | $15 | $144 ($12/mo) | 10 Popular | No | Email |
| **Full** | $25 | $240 ($20/mo) | All 33 | No | Priority |

**Stripe Price IDs** (to be created):
- Core Monthly: `price_core_monthly_live`
- Core Yearly: `price_core_yearly_live`
- Full Monthly: `price_full_monthly_live`
- Full Yearly: `price_full_yearly_live`

---

## ⏱️ Implementation Timeline

| Phase | Description | Duration | Priority |
|-------|-------------|----------|----------|
| 1 | User Control Integration | 2 hours | HIGH |
| 2 | Stripe Webhook System | 4 hours | CRITICAL |
| 3 | Subscription API | 4 hours | CRITICAL |
| 4 | User Control Dashboard | 3 hours | HIGH |
| 5 | Email Notifications | 2 hours | MEDIUM |
| 6 | Testing & QA | 3 hours | CRITICAL |
| **TOTAL** | **Complete Implementation** | **18 hours** | **2-3 Days** |

---

## 🎯 Success Criteria

### Technical
- [ ] All webhook events processed correctly (100% success rate)
- [ ] Zero data inconsistencies between Stripe and database
- [ ] Subscription changes reflect immediately in user access
- [ ] Payment failures handled gracefully with retries
- [ ] Admin can manage all users/subscriptions from dashboard

### Business
- [ ] Automated subscription lifecycle (no manual intervention)
- [ ] Users can self-service via customer portal
- [ ] Clear visibility into MRR, churn, and user metrics
- [ ] Professional email notifications for all events
- [ ] Smooth upgrade/downgrade experiences

### User Experience
- [ ] Checkout process completes in < 2 minutes
- [ ] Immediate access after payment
- [ ] Clear communication at every step
- [ ] Easy cancellation with access until period ends
- [ ] Self-service billing management

---

## 🆘 Support & Troubleshooting

### Common Issues

**1. Webhook not receiving events**
- Check Stripe Dashboard → Webhooks → Event logs
- Verify webhook secret matches
- Ensure endpoint is publicly accessible
- Check server logs for errors

**2. Subscription not updating**
- Check webhook processing logs
- Verify Stripe customer ID matches user
- Check for database transaction failures
- Review activity logs

**3. Payment failures**
- Review Stripe Dashboard → Payments → Failed
- Check customer payment method
- Verify card has sufficient funds
- Contact customer for updated payment info

**4. Duplicate subscriptions**
- Check for multiple Stripe customer IDs
- Implement idempotency keys
- Merge duplicate customers in Stripe

---

## 📞 Next Steps

1. **Review this plan** with stakeholders
2. **Set up Stripe test account** if not already done
3. **Configure test price IDs** in Stripe Dashboard
4. **Begin Phase 1 implementation** (User Control Integration)
5. **Test each phase** before moving to next
6. **Deploy to staging** for final QA
7. **Go live** with production Stripe account

---

## 📝 Notes

- This plan assumes PostgreSQL database is already set up
- Prisma schema is ready (no migrations needed)
- Next.js 14+ App Router architecture
- React 18+ with TypeScript
- Stripe API version 2023-10-16 or later

**Questions?** Refer to:
- Stripe Documentation: https://stripe.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs

---

**Plan Created**: October 7, 2025
**Status**: Ready for Implementation
**Estimated Completion**: 2-3 days with focused development
