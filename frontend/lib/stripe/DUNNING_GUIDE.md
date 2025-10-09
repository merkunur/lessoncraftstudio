# Dunning & Failed Payment Recovery Guide

## Overview

This guide explains how to implement intelligent dunning (failed payment recovery) to reduce involuntary churn and maximize revenue recovery. The system handles failed payments with smart retry logic, automated email sequences, and graceful service degradation.

## Why Dunning Matters

**Involuntary churn statistics:**
- 20-40% of subscription churn is involuntary (failed payments)
- 70-80% of failed payments can be recovered with proper dunning
- Average recovery rate: 60-70% within 30 days

**Common failure reasons:**
- Expired credit cards (most common)
- Insufficient funds
- Card limits reached
- Bank declined for fraud prevention
- Technical issues

## Dunning Strategy

### Grace Period Timeline

**Day 0: Payment Fails**
- Stripe automatically retries payment (smart retries)
- Email: Payment failed notification
- Action: Update payment method link
- Service: Full access maintained

**Day 3: First Manual Retry**
- Stripe retries payment
- Email: Gentle reminder with urgency
- Action: Update payment method prominent CTA
- Service: Full access maintained

**Day 7: Second Manual Retry**
- Stripe retries payment
- Email: Stronger urgency, service at risk
- Action: Update payment method + downgrade warning
- Service: Full access maintained

**Day 14: Final Retry**
- Stripe final retry attempt
- Email: Final warning, service suspension imminent
- Action: Update payment method or lose access
- Service: Full access maintained

**Day 15: Service Suspension**
- Email: Service suspended, data retained
- Action: Update payment method to restore access
- Service: **Access suspended** (soft delete, read-only mode)

**Day 30: Account Cancellation**
- Email: Final notice before cancellation
- Action: Last chance to reactivate
- Service: Data retained for 60 more days

**Day 90: Data Deletion**
- Email: Data deletion notice
- Action: None (GDPR compliance)
- Service: User data permanently deleted

### Stripe Smart Retries

Stripe automatically retries failed payments based on:
- Card type and bank
- Failure reason
- Historical success rates
- Time of day/week

**Default retry schedule:**
- 3 days after failure
- 5 days after failure
- 7 days after failure
- Then follows your configured schedule

## Database Schema

### Payment Failure Tracking

Add to Prisma schema:

```prisma
model PaymentFailure {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")

  stripeInvoiceId      String   @map("stripe_invoice_id")
  stripePaymentIntentId String? @map("stripe_payment_intent_id")

  failureCode    String  @map("failure_code")   // card_declined, insufficient_funds, etc.
  failureMessage String? @map("failure_message")

  amount         Float
  currency       String  @default("usd")

  retryCount     Int     @default(0) @map("retry_count")
  lastRetryAt    DateTime? @map("last_retry_at")
  nextRetryAt    DateTime? @map("next_retry_at")

  recoveredAt    DateTime? @map("recovered_at")
  recoveredBy    String?   @map("recovered_by") // "stripe_retry", "customer_update", "admin"

  status         String    @default("pending") // "pending", "retrying", "recovered", "failed"

  metadata       Json?
  createdAt      DateTime  @default(now()) @map("created_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([status])
  @@index([nextRetryAt])
  @@map("payment_failures")
}

// Add to User model
model User {
  // ... existing fields

  paymentFailures   PaymentFailure[]

  gracePeriodEndsAt DateTime? @map("grace_period_ends_at")
  accountSuspendedAt DateTime? @map("account_suspended_at")
}

// Add to Subscription model
model Subscription {
  // ... existing fields

  pastDueAt      DateTime? @map("past_due_at")
  unpaidInvoiceId String?  @map("unpaid_invoice_id")
}
```

## Email Templates

### 1. Payment Failed Email

```typescript
// lib/email/templates/payment-failed-email.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Link,
} from '@react-email/components';

interface PaymentFailedEmailProps {
  firstName: string;
  amount: number;
  currency: string;
  failureReason: string;
  updatePaymentUrl: string;
  nextRetryDate: string;
  language?: string;
}

const translations = {
  en: {
    subject: 'Payment Failed - Action Required',
    heading: 'Payment Failed',
    intro: 'We were unable to process your recent payment.',
    amount: 'Amount',
    reason: 'Reason',
    action: 'Please update your payment method to continue your subscription.',
    button: 'Update Payment Method',
    retry: 'We\'ll automatically retry the payment on',
    noAction: 'If you don\'t take action, your subscription may be suspended.',
    questions: 'Questions? Contact support.',
  },
  // Add other languages...
};

export function PaymentFailedEmail({
  firstName,
  amount,
  currency,
  failureReason,
  updatePaymentUrl,
  nextRetryDate,
  language = 'en',
}: PaymentFailedEmailProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  const formatCurrency = (amt: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr.toUpperCase(),
    }).format(amt / 100);
  };

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{t.heading}</Heading>

          <Text style={text}>Hi {firstName},</Text>

          <Text style={text}>{t.intro}</Text>

          <Section style={infoBox}>
            <Text style={infoText}>
              <strong>{t.amount}:</strong> {formatCurrency(amount, currency)}
            </Text>
            <Text style={infoText}>
              <strong>{t.reason}:</strong> {failureReason}
            </Text>
          </Section>

          <Text style={text}>{t.action}</Text>

          <Button style={button} href={updatePaymentUrl}>
            {t.button}
          </Button>

          <Hr style={hr} />

          <Text style={smallText}>
            {t.retry} <strong>{nextRetryDate}</strong>
          </Text>

          <Text style={warningText}>{t.noAction}</Text>

          <Text style={footer}>{t.questions}</Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px' };
const h1 = { color: '#dc2626', fontSize: '28px', fontWeight: 'bold', margin: '40px 0', padding: '0', lineHeight: '1.4' };
const text = { color: '#333', fontSize: '16px', lineHeight: '26px' };
const infoBox = { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', margin: '24px 0' };
const infoText = { color: '#333', fontSize: '14px', margin: '8px 0' };
const button = { backgroundColor: '#dc2626', borderRadius: '8px', color: '#fff', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center' as const, display: 'block', padding: '12px 20px', margin: '24px 0' };
const hr = { borderColor: '#e6ebf1', margin: '24px 0' };
const smallText = { color: '#666', fontSize: '14px', lineHeight: '24px' };
const warningText = { color: '#dc2626', fontSize: '14px', lineHeight: '24px', fontWeight: '500' };
const footer = { color: '#8898aa', fontSize: '12px', lineHeight: '16px', marginTop: '24px' };

export default PaymentFailedEmail;
```

### 2. Payment Reminder Email (Day 7)

```typescript
// lib/email/templates/payment-reminder-email.tsx
// Similar structure with stronger urgency
const translations = {
  en: {
    subject: 'Urgent: Payment Still Failed - Subscription at Risk',
    heading: 'Payment Reminder',
    intro: 'Your payment is still failing, and your subscription is at risk.',
    urgency: 'We\'ve attempted to process your payment multiple times without success.',
    // ... rest of translations
  },
};
```

### 3. Service Suspension Email

```typescript
// lib/email/templates/service-suspended-email.tsx
const translations = {
  en: {
    subject: 'Service Suspended - Update Payment to Restore Access',
    heading: 'Subscription Suspended',
    intro: 'Your subscription has been suspended due to payment failure.',
    dataRetained: 'Your data is safe and will be retained for 60 days.',
    restore: 'Update your payment method now to restore access.',
    // ... rest of translations
  },
};
```

## Webhook Handler Enhancement

Update your Stripe webhook handler to track payment failures:

```typescript
// app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';
import {
  sendPaymentFailedEmail,
  sendPaymentReminderEmail,
  sendServiceSuspendedEmail,
} from '@/lib/email';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle payment failed events
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice;
    await handlePaymentFailed(invoice);
  }

  // Handle payment succeeded (recovery)
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    await handlePaymentRecovered(invoice);
  }

  // Handle subscription past due
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;

    if (subscription.status === 'past_due') {
      await handleSubscriptionPastDue(subscription);
    }
  }

  return NextResponse.json({ received: true });
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const userId = invoice.metadata?.userId;

  if (!userId) return;

  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return;

  // Determine failure reason
  const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent | null;
  const failureCode = paymentIntent?.last_payment_error?.code || 'unknown';
  const failureMessage = paymentIntent?.last_payment_error?.message || 'Payment failed';

  // Check if this is a new failure or existing
  const existingFailure = await prisma.paymentFailure.findFirst({
    where: {
      stripeInvoiceId: invoice.id,
      status: { in: ['pending', 'retrying'] },
    },
  });

  const retryCount = existingFailure ? existingFailure.retryCount + 1 : 1;

  // Calculate next retry date (Stripe handles this, but we track it)
  const nextRetryAt = invoice.next_payment_attempt
    ? new Date(invoice.next_payment_attempt * 1000)
    : null;

  // Create or update payment failure record
  const paymentFailure = await prisma.paymentFailure.upsert({
    where: { id: existingFailure?.id || 'new' },
    create: {
      userId: user.id,
      stripeInvoiceId: invoice.id,
      stripePaymentIntentId: paymentIntent?.id,
      failureCode,
      failureMessage,
      amount: invoice.amount_due / 100,
      currency: invoice.currency,
      retryCount: 1,
      lastRetryAt: new Date(),
      nextRetryAt,
      status: 'retrying',
    },
    update: {
      retryCount,
      lastRetryAt: new Date(),
      nextRetryAt,
      failureCode,
      failureMessage,
    },
  });

  // Set grace period if not already set
  if (!user.gracePeriodEndsAt) {
    const gracePeriodEnd = new Date();
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 15); // 15 day grace period

    await prisma.user.update({
      where: { id: user.id },
      data: { gracePeriodEndsAt: gracePeriodEnd },
    });
  }

  // Send appropriate email based on retry count
  const updatePaymentUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`;
  const nextRetryDate = nextRetryAt?.toLocaleDateString() || 'soon';

  if (retryCount === 1) {
    // First failure - gentle reminder
    await sendPaymentFailedEmail({
      email: user.email,
      firstName: user.firstName || 'there',
      amount: invoice.amount_due,
      currency: invoice.currency,
      failureReason: formatFailureReason(failureCode),
      updatePaymentUrl,
      nextRetryDate,
      language: user.language || 'en',
    });
  } else if (retryCount === 2 || retryCount === 3) {
    // Subsequent failures - stronger reminder
    await sendPaymentReminderEmail({
      email: user.email,
      firstName: user.firstName || 'there',
      amount: invoice.amount_due,
      currency: invoice.currency,
      failureReason: formatFailureReason(failureCode),
      updatePaymentUrl,
      daysUntilSuspension: calculateDaysUntilSuspension(user.gracePeriodEndsAt),
      language: user.language || 'en',
    });
  }

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId: user.id,
      action: 'payment_failed',
      details: `Payment failed (attempt ${retryCount}): ${failureMessage}`,
      metadata: {
        invoiceId: invoice.id,
        amount: invoice.amount_due / 100,
        failureCode,
        retryCount,
      },
    },
  });
}

async function handlePaymentRecovered(invoice: Stripe.Invoice) {
  const userId = invoice.metadata?.userId;

  if (!userId) return;

  // Mark payment failure as recovered
  await prisma.paymentFailure.updateMany({
    where: {
      stripeInvoiceId: invoice.id,
      status: { in: ['pending', 'retrying'] },
    },
    data: {
      status: 'recovered',
      recoveredAt: new Date(),
      recoveredBy: 'stripe_retry',
    },
  });

  // Clear grace period
  await prisma.user.update({
    where: { id: userId },
    data: {
      gracePeriodEndsAt: null,
      accountSuspendedAt: null,
    },
  });

  // Send recovery confirmation email
  // (use existing payment receipt email)
}

async function handleSubscriptionPastDue(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;

  if (!userId) return;

  // Update subscription status
  await prisma.subscription.updateMany({
    where: {
      userId,
      stripeSubscriptionId: subscription.id,
    },
    data: {
      status: 'past_due',
      pastDueAt: new Date(),
      unpaidInvoiceId: subscription.latest_invoice as string,
    },
  });
}

function formatFailureReason(code: string): string {
  const reasons: Record<string, string> = {
    card_declined: 'Your card was declined',
    insufficient_funds: 'Insufficient funds',
    expired_card: 'Your card has expired',
    incorrect_cvc: 'Incorrect CVC code',
    processing_error: 'Processing error',
    card_not_supported: 'Card type not supported',
  };

  return reasons[code] || 'Payment could not be processed';
}

function calculateDaysUntilSuspension(gracePeriodEnd: Date | null): number {
  if (!gracePeriodEnd) return 15;

  const now = new Date();
  const diff = gracePeriodEnd.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
```

## Cron Jobs for Dunning Management

Create a cron job to handle suspension and cleanup:

```typescript
// app/api/cron/dunning/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendServiceSuspendedEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  // 1. Suspend accounts past grace period
  const accountsToSuspend = await prisma.user.findMany({
    where: {
      gracePeriodEndsAt: { lte: now },
      accountSuspendedAt: null,
    },
    include: { subscription: true },
  });

  for (const user of accountsToSuspend) {
    await prisma.user.update({
      where: { id: user.id },
      data: { accountSuspendedAt: now },
    });

    await sendServiceSuspendedEmail({
      email: user.email,
      firstName: user.firstName || 'there',
      suspensionDate: now.toLocaleDateString(),
      dataRetentionDays: 60,
      updatePaymentUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
      language: user.language || 'en',
    });

    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'account_suspended',
        details: 'Account suspended due to payment failure',
      },
    });
  }

  // 2. Cancel subscriptions after 30 days suspended
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const accountsToCancel = await prisma.user.findMany({
    where: {
      accountSuspendedAt: { lte: thirtyDaysAgo },
    },
    include: { subscription: true },
  });

  for (const user of accountsToCancel) {
    // Cancel Stripe subscription
    if (user.subscription?.stripeSubscriptionId) {
      await stripe.subscriptions.cancel(user.subscription.stripeSubscriptionId);
    }

    await prisma.subscription.updateMany({
      where: { userId: user.id },
      data: { status: 'canceled', canceledAt: now },
    });
  }

  // 3. Delete data after 90 days total (60 days after cancellation)
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const accountsToDelete = await prisma.user.findMany({
    where: {
      accountSuspendedAt: { lte: ninetyDaysAgo },
    },
  });

  for (const user of accountsToDelete) {
    // Delete user data (cascades via Prisma relations)
    await prisma.user.delete({
      where: { id: user.id },
    });
  }

  return NextResponse.json({
    suspended: accountsToSuspend.length,
    canceled: accountsToCancel.length,
    deleted: accountsToDelete.length,
  });
}
```

## Middleware for Suspended Accounts

Add middleware to prevent access for suspended accounts:

```typescript
// middleware.ts (enhancement)

export async function middleware(request: NextRequest) {
  // ... existing auth check

  const user = await getCurrentUser(request);

  if (user && user.accountSuspendedAt) {
    const isBillingPage = request.nextUrl.pathname.includes('/dashboard/billing');

    if (!isBillingPage) {
      // Redirect to billing page to update payment
      return NextResponse.redirect(new URL('/dashboard/billing?suspended=true', request.url));
    }
  }

  return NextResponse.next();
}
```

## Admin Dashboard for Dunning

```typescript
// app/admin/dunning/page.tsx

'use client';

export default function DunningDashboard() {
  // Display:
  // - Active payment failures
  // - Grace period status
  // - Suspended accounts
  // - Recovery rate statistics
  // - Manual retry options
}
```

## Best Practices

1. **Email Tone**: Start gentle, increase urgency gradually
2. **Always Provide Action**: Clear "Update Payment" CTA
3. **Transparency**: Explain what happens and when
4. **Grace Period**: 14-15 days is industry standard
5. **Data Retention**: Communicate clearly about data safety
6. **Recovery Options**: Make it easy to restore access
7. **Analytics**: Track recovery rates by email, retry timing
8. **Test**: Use Stripe test mode to simulate failures

## Testing

```bash
# Stripe CLI to simulate failed payment
stripe trigger invoice.payment_failed

# Test email sequences
npm run test:dunning-emails

# Test cron job locally
curl http://localhost:3000/api/cron/dunning \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Metrics to Track

- Failed payment recovery rate
- Time to recovery
- Recovery by email sequence (which email works best)
- Voluntary vs involuntary churn
- Revenue recovered
- Suspension rate
- Cancellation rate

## Production Checklist

- [ ] Configure Stripe retry schedule
- [ ] Set up email templates (all languages)
- [ ] Configure grace period duration
- [ ] Set up cron job (Vercel Cron, Render Cron, or similar)
- [ ] Test webhook handlers
- [ ] Implement access restrictions for suspended accounts
- [ ] Add admin dunning dashboard
- [ ] Configure monitoring and alerts
- [ ] Test recovery workflows
- [ ] Document customer support procedures
