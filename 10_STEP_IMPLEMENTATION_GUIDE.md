# 🎯 10-Step Implementation Guide
## Professional Subscription System with Account Sharing Prevention

This guide breaks down the implementation into 10 digestible steps, each building on the previous one. Total time: **23 hours** (3 focused days).

---

## 📊 Implementation Overview

```
Step 1-2: Foundation (Database + Dependencies)     → 1.5 hours
Step 3-4: Account Sharing Prevention              → 3.5 hours
Step 5-6: Core Stripe Automation                  → 7 hours
Step 7-8: Admin & User Interfaces                 → 5 hours
Step 9-10: Polish & Testing                       → 6 hours
```

---

## Step 1: Database Schema Enhancement
**Time**: 1 hour
**Complexity**: Low
**Why First**: Everything depends on the database structure

### What You're Building
Enhance the Session model to track devices and create AccountSharingLog for monitoring suspicious activity.

### Database Changes

```prisma
// Add to prisma/schema.prisma

model Session {
  id                String    @id @default(cuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt         DateTime

  // NEW: Device Tracking Fields
  deviceId          String?   // Fingerprint from FingerprintJS
  deviceName        String?   // "Chrome on MacOS"
  deviceType        String?   // "desktop", "mobile", "tablet"
  browser           String?   // "Chrome 120.0"
  os                String?   // "MacOS 14.2"
  ipAddress         String?
  country           String?
  city              String?
  lastActivityAt    DateTime  @default(now())
  createdAt         DateTime  @default(now())

  @@index([userId])
  @@index([deviceId])
  @@index([expiresAt])
}

model AccountSharingLog {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  eventType       String   // "device_limit_exceeded", "impossible_travel", "rapid_login"
  deviceId        String?
  ipAddress       String?
  location        String?
  metadata        Json?    // Additional context
  createdAt       DateTime @default(now())

  @@index([userId])
  @@index([eventType])
  @@index([createdAt])
}

// Add to User model
model User {
  // ... existing fields
  accountSharingLogs AccountSharingLog[]
}
```

### Tasks
1. Add new fields to Session model in `frontend/prisma/schema.prisma`
2. Create AccountSharingLog model
3. Update User model relationship
4. Run migration: `npx prisma migrate dev --name add_device_tracking`
5. Generate Prisma client: `npx prisma generate`

### Verification
```bash
npx prisma studio
# Check that Session and AccountSharingLog tables exist with new fields
```

---

## Step 2: Install Dependencies
**Time**: 0.5 hours
**Complexity**: Low
**Why Second**: Need libraries before writing code that uses them

### What You're Installing

```json
{
  "dependencies": {
    "@fingerprintjs/fingerprintjs": "^4.2.0",  // Device fingerprinting
    "geoip-lite": "^1.4.7",                     // IP geolocation
    "ua-parser-js": "^1.0.37"                   // User agent parsing
  }
}
```

### Tasks
1. Install packages:
```bash
cd frontend
npm install @fingerprintjs/fingerprintjs geoip-lite ua-parser-js
```

2. Verify installation:
```bash
npm list @fingerprintjs/fingerprintjs geoip-lite ua-parser-js
```

### What Each Library Does
- **FingerprintJS**: Creates unique browser fingerprint (device ID)
- **geoip-lite**: Converts IP address to country/city
- **ua-parser-js**: Parses user agent string to extract browser/OS info

---

## Step 3: Device Fingerprinting Setup
**Time**: 1.5 hours
**Complexity**: Medium
**Why Third**: Need device tracking before session management

### What You're Building
Create utilities to identify and track devices across sessions.

### File to Create: `frontend/lib/device-fingerprint.ts`

```typescript
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import UAParser from 'ua-parser-js';
import geoip from 'geoip-lite';

export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  ipAddress?: string;
  country?: string;
  city?: string;
}

/**
 * Generate device fingerprint on client side
 */
export async function getDeviceFingerprint(): Promise<string> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

/**
 * Parse device information from user agent and IP
 */
export function parseDeviceInfo(
  userAgent: string,
  ipAddress?: string
): Omit<DeviceInfo, 'deviceId'> {
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  // Determine device type
  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  if (device.type === 'mobile') deviceType = 'mobile';
  else if (device.type === 'tablet') deviceType = 'tablet';

  // Create friendly device name
  const browserName = browser.name || 'Unknown Browser';
  const browserVersion = browser.version?.split('.')[0] || '';
  const osName = os.name || 'Unknown OS';
  const deviceName = `${browserName}${browserVersion ? ` ${browserVersion}` : ''} on ${osName}`;

  // Get location from IP
  let country: string | undefined;
  let city: string | undefined;
  if (ipAddress) {
    const geo = geoip.lookup(ipAddress);
    if (geo) {
      country = geo.country;
      city = geo.city;
    }
  }

  return {
    deviceName,
    deviceType,
    browser: `${browserName} ${browser.version || ''}`.trim(),
    os: `${osName} ${os.version || ''}`.trim(),
    ipAddress,
    country,
    city,
  };
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(request: Request): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') || // Cloudflare
    undefined
  );
}

/**
 * Detect suspicious activity patterns
 */
export function detectSuspiciousActivity(
  sessions: Array<{ ipAddress?: string; country?: string; createdAt: Date }>
): {
  impossibleTravel: boolean;
  rapidLogins: boolean;
} {
  let impossibleTravel = false;
  let rapidLogins = false;

  // Check for impossible travel (different countries in short time)
  const sortedSessions = [...sessions].sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
  );

  for (let i = 1; i < sortedSessions.length; i++) {
    const prev = sortedSessions[i - 1];
    const curr = sortedSessions[i];

    if (prev.country && curr.country && prev.country !== curr.country) {
      const timeDiff = curr.createdAt.getTime() - prev.createdAt.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Flag if different countries within 1 hour
      if (hoursDiff < 1) {
        impossibleTravel = true;
        break;
      }
    }
  }

  // Check for rapid logins (more than 3 logins in 5 minutes)
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recentLogins = sessions.filter(s => s.createdAt > fiveMinutesAgo);
  if (recentLogins.length > 3) {
    rapidLogins = true;
  }

  return { impossibleTravel, rapidLogins };
}
```

### File to Create: `frontend/components/device-fingerprint-provider.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getDeviceFingerprint } from '@/lib/device-fingerprint';

export function DeviceFingerprintProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    async function loadFingerprint() {
      try {
        const id = await getDeviceFingerprint();
        setDeviceId(id);
        // Store in localStorage for immediate access
        localStorage.setItem('deviceId', id);
      } catch (error) {
        console.error('Failed to load device fingerprint:', error);
      }
    }

    loadFingerprint();
  }, []);

  return <>{children}</>;
}
```

### Tasks
1. Create `frontend/lib/device-fingerprint.ts` with utilities
2. Create `frontend/components/device-fingerprint-provider.tsx`
3. Add provider to root layout (will do in integration step)

### Why This Matters
Device fingerprinting allows you to track sessions across different browsers/devices without relying solely on IP addresses (which can change).

---

## Step 4: Session Management APIs
**Time**: 2 hours
**Complexity**: Medium
**Why Fourth**: Need session checking before integrating with auth flow

### What You're Building
APIs to check device limits and allow users to revoke sessions.

### File to Create: `frontend/app/api/auth/session-check/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseDeviceInfo, getClientIP, detectSuspiciousActivity } from '@/lib/device-fingerprint';

const MAX_CONCURRENT_SESSIONS = 2;

export async function POST(request: NextRequest) {
  try {
    const { userId, deviceId } = await request.json();

    if (!userId || !deviceId) {
      return NextResponse.json(
        { error: 'Missing userId or deviceId' },
        { status: 400 }
      );
    }

    // Get user agent and IP
    const userAgent = request.headers.get('user-agent') || '';
    const ipAddress = getClientIP(request);
    const deviceInfo = parseDeviceInfo(userAgent, ipAddress);

    // Get all active sessions for this user
    const activeSessions = await prisma.session.findMany({
      where: {
        userId,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActivityAt: 'desc' },
    });

    // Check if this device already has a session
    const existingSession = activeSessions.find(s => s.deviceId === deviceId);
    if (existingSession) {
      // Update last activity
      await prisma.session.update({
        where: { id: existingSession.id },
        data: { lastActivityAt: new Date() },
      });

      return NextResponse.json({
        allowed: true,
        action: 'existing_session',
        sessionId: existingSession.id,
      });
    }

    // Check device limit
    if (activeSessions.length >= MAX_CONCURRENT_SESSIONS) {
      // Log account sharing attempt
      await prisma.accountSharingLog.create({
        data: {
          userId,
          eventType: 'device_limit_exceeded',
          deviceId,
          ipAddress,
          location: deviceInfo.city && deviceInfo.country
            ? `${deviceInfo.city}, ${deviceInfo.country}`
            : deviceInfo.country || 'Unknown',
          metadata: {
            deviceName: deviceInfo.deviceName,
            totalActiveSessions: activeSessions.length,
          },
        },
      });

      return NextResponse.json({
        allowed: false,
        action: 'device_limit_exceeded',
        message: `You are signed in on the maximum number of devices (${MAX_CONCURRENT_SESSIONS}). Please sign out from one of your other devices first.`,
        activeSessions: activeSessions.map(s => ({
          id: s.id,
          deviceName: s.deviceName,
          location: s.city && s.country ? `${s.city}, ${s.country}` : s.country || 'Unknown',
          lastActive: s.lastActivityAt,
        })),
      }, { status: 403 });
    }

    // Check for suspicious activity
    const recentSessions = await prisma.session.findMany({
      where: {
        userId,
        createdAt: { gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
      },
      select: {
        ipAddress: true,
        country: true,
        createdAt: true,
      },
    });

    const { impossibleTravel, rapidLogins } = detectSuspiciousActivity([
      ...recentSessions,
      { ipAddress, country: deviceInfo.country, createdAt: new Date() },
    ]);

    if (impossibleTravel) {
      await prisma.accountSharingLog.create({
        data: {
          userId,
          eventType: 'impossible_travel',
          deviceId,
          ipAddress,
          location: deviceInfo.city && deviceInfo.country
            ? `${deviceInfo.city}, ${deviceInfo.country}`
            : deviceInfo.country || 'Unknown',
          metadata: { deviceName: deviceInfo.deviceName },
        },
      });
    }

    if (rapidLogins) {
      await prisma.accountSharingLog.create({
        data: {
          userId,
          eventType: 'rapid_login',
          deviceId,
          ipAddress,
          location: deviceInfo.city && deviceInfo.country
            ? `${deviceInfo.city}, ${deviceInfo.country}`
            : deviceInfo.country || 'Unknown',
          metadata: { deviceName: deviceInfo.deviceName },
        },
      });
    }

    // Allow login with optional warning
    return NextResponse.json({
      allowed: true,
      action: activeSessions.length === 1 ? 'second_device_warning' : 'new_session',
      warning: activeSessions.length === 1
        ? 'This is your second device. You can only be signed in on 2 devices at once.'
        : undefined,
      suspiciousActivity: impossibleTravel || rapidLogins,
      deviceInfo,
    });

  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### File to Create: `frontend/app/api/auth/revoke-session/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    // Verify the session belongs to the user
    const targetSession = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!targetSession || targetSession.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Session not found or unauthorized' },
        { status: 404 }
      );
    }

    // Delete the session
    await prisma.session.delete({
      where: { id: sessionId },
    });

    return NextResponse.json({
      success: true,
      message: 'Session revoked successfully',
    });

  } catch (error) {
    console.error('Session revocation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### File to Create: `frontend/app/api/auth/active-sessions/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const activeSessions = await prisma.session.findMany({
      where: {
        userId: session.user.id,
        expiresAt: { gt: new Date() },
      },
      orderBy: { lastActivityAt: 'desc' },
      select: {
        id: true,
        deviceName: true,
        deviceType: true,
        browser: true,
        os: true,
        ipAddress: true,
        country: true,
        city: true,
        lastActivityAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ sessions: activeSessions });

  } catch (error) {
    console.error('Active sessions fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Tasks
1. Create `frontend/app/api/auth/session-check/route.ts`
2. Create `frontend/app/api/auth/revoke-session/route.ts`
3. Create `frontend/app/api/auth/active-sessions/route.ts`
4. Test API endpoints with curl or Postman

### Testing
```bash
# Test session check (should fail with missing params)
curl -X POST http://localhost:3001/api/auth/session-check \
  -H "Content-Type: application/json" \
  -d '{"userId": "test", "deviceId": "test123"}'
```

---

## Step 5: Stripe Webhook Handler
**Time**: 4 hours
**Complexity**: High (CRITICAL)
**Why Fifth**: Core automation - everything else depends on this

### What You're Building
The brain of your subscription system. Automatically processes all Stripe events.

### Environment Variables Needed

Add to `.env.local`:
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Price IDs from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_CORE_YEARLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_FULL_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_FULL_YEARLY=price_...
```

### File to Create: `frontend/lib/stripe-webhooks.ts`

```typescript
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

/**
 * Handle checkout.session.completed
 * User just paid - grant access immediately
 */
export async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  // Get full subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Determine tier from price ID
  const priceId = subscription.items.data[0].price.id;
  const tier = determineTierFromPriceId(priceId);

  // Get or create user from customer email
  const customerEmail = session.customer_email || session.customer_details?.email;
  if (!customerEmail) {
    throw new Error('No customer email found in checkout session');
  }

  // Update user
  const user = await prisma.user.upsert({
    where: { email: customerEmail },
    update: {
      stripeCustomerId: customerId,
      subscriptionTier: tier,
    },
    create: {
      email: customerEmail,
      name: session.customer_details?.name || 'User',
      stripeCustomerId: customerId,
      subscriptionTier: tier,
    },
  });

  // Create subscription record
  await prisma.subscription.create({
    data: {
      userId: user.id,
      stripeSubscriptionId: subscriptionId,
      stripeCustomerId: customerId,
      status: subscription.status,
      tier,
      billingInterval: subscription.items.data[0].price.recurring?.interval === 'year' ? 'yearly' : 'monthly',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  console.log(`✅ Subscription created for ${customerEmail} - Tier: ${tier}`);
}

/**
 * Handle customer.subscription.updated
 * Subscription changed (upgrade, downgrade, renewal)
 */
export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;

  // Find user
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  // Determine tier from price ID
  const priceId = subscription.items.data[0].price.id;
  const tier = determineTierFromPriceId(priceId);

  // Update user tier
  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionTier: tier },
  });

  // Update subscription record
  await prisma.subscription.updateMany({
    where: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
    },
    data: {
      status: subscription.status,
      tier,
      billingInterval: subscription.items.data[0].price.recurring?.interval === 'year' ? 'yearly' : 'monthly',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });

  console.log(`✅ Subscription updated for user ${user.id} - Status: ${subscription.status}`);
}

/**
 * Handle customer.subscription.deleted
 * Subscription cancelled or failed
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;

  // Find user
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  // Revert to free tier
  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionTier: 'free' },
  });

  // Update subscription record
  await prisma.subscription.updateMany({
    where: {
      userId: user.id,
      stripeSubscriptionId: subscription.id,
    },
    data: {
      status: 'canceled',
      canceledAt: new Date(),
    },
  });

  console.log(`✅ Subscription canceled for user ${user.id}`);
}

/**
 * Handle invoice.paid
 * Successful payment - record transaction
 */
export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  // Find user
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  // Record payment
  await prisma.payment.create({
    data: {
      userId: user.id,
      stripePaymentId: invoice.payment_intent as string,
      amount: invoice.amount_paid / 100, // Convert cents to dollars
      currency: invoice.currency.toUpperCase(),
      status: 'succeeded',
    },
  });

  console.log(`✅ Payment recorded for user ${user.id} - Amount: $${invoice.amount_paid / 100}`);
}

/**
 * Handle invoice.payment_failed
 * Payment failed - notify user
 */
export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;

  // Find user
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    include: { subscription: true },
  });

  if (!user) {
    console.error(`User not found for customer: ${customerId}`);
    return;
  }

  // Update subscription status
  await prisma.subscription.updateMany({
    where: {
      userId: user.id,
      stripeSubscriptionId: invoice.subscription as string,
    },
    data: {
      status: 'past_due',
    },
  });

  console.log(`⚠️ Payment failed for user ${user.id}`);
  // TODO: Send email notification (Step 9)
}

/**
 * Helper: Determine tier from Stripe price ID
 */
function determineTierFromPriceId(priceId: string): 'free' | 'core' | 'full' {
  const coreMonthly = process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY;
  const coreYearly = process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_YEARLY;
  const fullMonthly = process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_MONTHLY;
  const fullYearly = process.env.NEXT_PUBLIC_STRIPE_PRICE_FULL_YEARLY;

  if (priceId === coreMonthly || priceId === coreYearly) {
    return 'core';
  } else if (priceId === fullMonthly || priceId === fullYearly) {
    return 'full';
  }

  return 'free';
}
```

### File to Create: `frontend/app/api/stripe/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  handleCheckoutCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
} from '@/lib/stripe-webhooks';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle event
    console.log(`📥 Received webhook: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}
```

### Tasks
1. Get Stripe test API keys from dashboard.stripe.com
2. Create products and prices in Stripe Dashboard
3. Add environment variables to `.env.local`
4. Create `frontend/lib/stripe-webhooks.ts`
5. Create `frontend/app/api/stripe/webhook/route.ts`
6. Test webhook with Stripe CLI: `stripe listen --forward-to localhost:3001/api/stripe/webhook`

### Testing Webhooks
```bash
# Install Stripe CLI
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3001/api/stripe/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

---

## Step 6: Subscription Management APIs
**Time**: 3 hours
**Complexity**: Medium
**Why Sixth**: Enable users and admins to manage subscriptions

### What You're Building
APIs for checkout, customer portal, and admin operations.

### File to Create: `frontend/app/api/stripe/create-checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: 'Missing priceId' },
        { status: 400 }
      );
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });

  } catch (error: any) {
    console.error('Checkout session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
```

### File to Create: `frontend/app/api/stripe/create-portal/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user with Stripe customer ID
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 404 }
      );
    }

    // Create customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });

  } catch (error: any) {
    console.error('Portal session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session', details: error.message },
      { status: 500 }
    );
  }
}
```

### File to Create: `frontend/app/api/admin/subscriptions/[action]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

/**
 * Admin actions: upgrade, downgrade, cancel, refund
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { action: string } }
) {
  try {
    // Check admin authorization
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { userId, subscriptionId, priceId, refundAmount } = await request.json();
    const { action } = params;

    switch (action) {
      case 'upgrade':
      case 'downgrade':
        return await handleTierChange(subscriptionId, priceId);

      case 'cancel':
        return await handleCancellation(userId, subscriptionId);

      case 'refund':
        return await handleRefund(userId, refundAmount);

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error(`Admin action error:`, error);
    return NextResponse.json(
      { error: 'Action failed', details: error.message },
      { status: 500 }
    );
  }
}

async function handleTierChange(subscriptionId: string, newPriceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: 'always_invoice',
  });

  return NextResponse.json({
    success: true,
    subscription: updatedSubscription,
  });
}

async function handleCancellation(userId: string, subscriptionId: string) {
  // Cancel at period end (user keeps access until then)
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  await prisma.subscription.updateMany({
    where: { userId, stripeSubscriptionId: subscriptionId },
    data: { cancelAtPeriodEnd: true },
  });

  return NextResponse.json({
    success: true,
    message: 'Subscription will cancel at period end',
  });
}

async function handleRefund(userId: string, amount: number) {
  // Get latest payment for user
  const payment = await prisma.payment.findFirst({
    where: { userId, status: 'succeeded' },
    orderBy: { createdAt: 'desc' },
  });

  if (!payment) {
    return NextResponse.json(
      { error: 'No payment found to refund' },
      { status: 404 }
    );
  }

  // Create refund in Stripe
  const refund = await stripe.refunds.create({
    payment_intent: payment.stripePaymentId,
    amount: Math.round(amount * 100), // Convert to cents
  });

  // Record refund in database
  await prisma.payment.create({
    data: {
      userId,
      stripePaymentId: refund.id,
      amount: -amount,
      currency: payment.currency,
      status: 'refunded',
    },
  });

  return NextResponse.json({
    success: true,
    refund,
  });
}
```

### Tasks
1. Create `frontend/app/api/stripe/create-checkout/route.ts`
2. Create `frontend/app/api/stripe/create-portal/route.ts`
3. Create `frontend/app/api/admin/subscriptions/[action]/route.ts`
4. Add `NEXT_PUBLIC_BASE_URL=http://localhost:3001` to `.env.local`
5. Test checkout flow with test card: 4242 4242 4242 4242

### Testing Checkout
```bash
# Test creating checkout session
curl -X POST http://localhost:3001/api/stripe/create-checkout \
  -H "Content-Type: application/json" \
  -d '{"priceId": "price_xxx"}'
```

---

## Step 7: User Control Dashboard
**Time**: 3 hours
**Complexity**: Medium
**Why Seventh**: Admin needs centralized control after APIs are working

### What You're Building
Unified admin dashboard for managing users and subscriptions.

### File to Modify: `frontend/components/admin/admin-layout.tsx`

Add User Control to navigation (around line 50):

```typescript
const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },

  // ADD THIS NEW SECTION
  {
    name: 'User Control',
    href: '/admin/user-control',
    icon: UserCog, // Import: import { UserCog } from 'lucide-react'
  },

  {
    name: 'Users',
    icon: Users,
    children: [
      // ... existing children
    ]
  },
  // ... rest of navigation
];
```

### File to Create: `frontend/app/admin/user-control/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Monitor, AlertTriangle, TrendingUp } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionTier: 'free' | 'core' | 'full';
  stripeCustomerId?: string;
  createdAt: string;
  activeSessions: number;
  suspiciousActivity: boolean;
}

export default function UserControlPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('/api/admin/user-control/list');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade(userId: string, tier: 'core' | 'full') {
    const confirmed = confirm(`Upgrade user to ${tier.toUpperCase()} tier?`);
    if (!confirmed) return;

    try {
      await fetch('/api/admin/user-control/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, tier }),
      });

      alert('User upgraded successfully');
      fetchUsers();
    } catch (error) {
      alert('Failed to upgrade user');
    }
  }

  async function handleCancelSubscription(userId: string) {
    const confirmed = confirm('Cancel user subscription? They will retain access until period ends.');
    if (!confirmed) return;

    try {
      await fetch('/api/admin/user-control/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      alert('Subscription cancelled');
      fetchUsers();
    } catch (error) {
      alert('Failed to cancel subscription');
    }
  }

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">User Control</h1>
        <p className="text-muted-foreground">
          Manage user subscriptions, sessions, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
          </div>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-2 mb-2">
            <Monitor className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
          </div>
          <p className="text-3xl font-bold">
            {users.reduce((sum, u) => sum + u.activeSessions, 0)}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <p className="text-sm font-medium text-muted-foreground">Suspicious Activity</p>
          </div>
          <p className="text-3xl font-bold">
            {users.filter(u => u.suspiciousActivity).length}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
          </div>
          <p className="text-3xl font-bold">
            {users.filter(u => u.subscriptionTier !== 'free').length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Active Sessions</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.subscriptionTier === 'full'
                          ? 'default'
                          : user.subscriptionTier === 'core'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {user.subscriptionTier.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      {user.activeSessions}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.suspiciousActivity ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Suspicious
                      </Badge>
                    ) : (
                      <Badge variant="outline">Normal</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {user.subscriptionTier === 'free' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpgrade(user.id, 'core')}
                          >
                            → Core
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpgrade(user.id, 'full')}
                          >
                            → Full
                          </Button>
                        </>
                      )}
                      {user.subscriptionTier !== 'free' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleCancelSubscription(user.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```

### File to Create: `frontend/app/api/admin/user-control/list/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionTier: true,
        stripeCustomerId: true,
        createdAt: true,
        sessions: {
          where: {
            expiresAt: { gt: new Date() },
          },
        },
        accountSharingLogs: {
          where: {
            createdAt: { gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }, // Last 7 days
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const usersWithStats = users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name || 'Unknown',
      subscriptionTier: user.subscriptionTier,
      stripeCustomerId: user.stripeCustomerId,
      createdAt: user.createdAt.toISOString(),
      activeSessions: user.sessions.length,
      suspiciousActivity: user.accountSharingLogs.length > 0,
    }));

    return NextResponse.json({ users: usersWithStats });

  } catch (error) {
    console.error('User control list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

### Tasks
1. Modify `frontend/components/admin/admin-layout.tsx` to add User Control
2. Create `frontend/app/admin/user-control/page.tsx`
3. Create `frontend/app/api/admin/user-control/list/route.ts`
4. Test by visiting http://localhost:3001/admin/user-control

---

## Step 8: Active Sessions User Interface
**Time**: 2 hours
**Complexity**: Low
**Why Eighth**: Users need self-service session management

### What You're Building
User-facing dashboard where they can see and revoke their active sessions.

### File to Create: `frontend/app/dashboard/sessions/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Monitor, Smartphone, Tablet, MapPin, Calendar, Trash2 } from 'lucide-react';

interface Session {
  id: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  ipAddress?: string;
  country?: string;
  city?: string;
  lastActivityAt: string;
  createdAt: string;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    try {
      const response = await fetch('/api/auth/active-sessions');
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  }

  async function revokeSession(sessionId: string) {
    const confirmed = confirm('Sign out from this device?');
    if (!confirmed) return;

    try {
      await fetch('/api/auth/revoke-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      setSessions(sessions.filter(s => s.id !== sessionId));
      alert('Session revoked successfully');
    } catch (error) {
      alert('Failed to revoke session');
    }
  }

  function getDeviceIcon(type: string) {
    switch (type) {
      case 'mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString();
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Active Sessions</h1>
        <p className="text-muted-foreground">
          Manage devices where you're currently signed in. You can be signed in on up to 2 devices.
        </p>
      </div>

      {/* Session Limit Warning */}
      {sessions.length >= 2 && (
        <Card className="mb-6 border-orange-500/50 bg-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Monitor className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="font-medium text-orange-500">Device Limit Reached</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You are signed in on the maximum number of devices ({sessions.length}/2).
                  To sign in on a new device, please sign out from one of your current sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sessions List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading sessions...</p>
        </div>
      ) : sessions.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Monitor className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No active sessions found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getDeviceIcon(session.deviceType)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{session.deviceName}</CardTitle>
                      <CardDescription className="mt-1">
                        {session.browser} • {session.os}
                      </CardDescription>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge>Current Session</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {session.city && session.country && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{session.city}, {session.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Last active: {formatDate(session.lastActivityAt)}</span>
                  </div>
                </div>

                {index !== 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => revokeSession(session.id)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Sign Out This Device
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Help Text */}
      <Card className="mt-6 bg-muted/50">
        <CardContent className="pt-6">
          <h3 className="font-medium mb-2">About Device Limits</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• You can be signed in on up to 2 devices at once</li>
            <li>• Sign out from a device you're no longer using to free up a slot</li>
            <li>• Your current session (this device) cannot be revoked from here</li>
            <li>• Suspicious activity is monitored for account security</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
```

### File to Modify: `frontend/app/dashboard/layout.tsx` (or main navigation)

Add link to Sessions page:

```typescript
<Link href="/dashboard/sessions" className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent">
  <Monitor className="h-4 w-4" />
  Active Sessions
</Link>
```

### Tasks
1. Create `frontend/app/dashboard/sessions/page.tsx`
2. Add link to sessions page in dashboard navigation
3. Test by signing in on two different browsers
4. Verify session revocation works

---

## Step 9: Email Notifications
**Time**: 3 hours
**Complexity**: Medium
**Why Ninth**: Polish - keep users informed about their subscriptions

### What You're Building
Email notifications for subscription lifecycle events.

### Choose Email Service

**Option A: Resend (Recommended)**
```bash
npm install resend
```

**Option B: SendGrid**
```bash
npm install @sendgrid/mail
```

Add to `.env.local`:
```bash
# For Resend
RESEND_API_KEY=re_...

# Or for SendGrid
SENDGRID_API_KEY=SG...
EMAIL_FROM=noreply@yourdomain.com
```

### File to Create: `frontend/lib/email-service.ts`

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await resend.emails.send({
      from: 'LessonCraftStudio <noreply@yourdomain.com>',
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string, tier: string) {
  const subject = 'Welcome to LessonCraftStudio! 🎉';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #4F46E5;">Welcome to LessonCraftStudio!</h1>
        <p>Hi ${name},</p>
        <p>Thank you for subscribing to <strong>${tier === 'core' ? 'Core Bundle' : 'Full Access'}</strong>!</p>

        <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="margin-top: 0;">Your Plan Includes:</h2>
          ${tier === 'core' ? `
            <ul>
              <li>Access to 10 premium worksheet generators</li>
              <li>No watermarks</li>
              <li>Unlimited downloads</li>
            </ul>
          ` : `
            <ul>
              <li>Access to all 33 worksheet generators</li>
              <li>No watermarks</li>
              <li>Unlimited downloads</li>
              <li>Priority support</li>
            </ul>
          `}
        </div>

        <p>Get started now:</p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
           style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; margin: 10px 0;">
          Go to Dashboard
        </a>

        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          Questions? Reply to this email or visit our support page.
        </p>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, html });
}

export async function sendPaymentSuccessEmail(
  email: string,
  name: string,
  amount: number,
  currency: string
) {
  const subject = 'Payment Received - Thank You!';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Confirmation</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #10B981;">Payment Received ✓</h1>
        <p>Hi ${name},</p>
        <p>We've successfully received your payment of <strong>${currency.toUpperCase()} ${amount.toFixed(2)}</strong>.</p>

        <p>Your subscription is active and you have full access to your plan features.</p>

        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
           style="display: inline-block; background: #10B981; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; margin: 10px 0;">
          View Dashboard
        </a>

        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          You can manage your subscription anytime from your dashboard.
        </p>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, html });
}

export async function sendPaymentFailedEmail(email: string, name: string) {
  const subject = 'Payment Failed - Action Required';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Payment Failed</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #EF4444;">Payment Failed</h1>
        <p>Hi ${name},</p>
        <p>We were unable to process your recent payment. This could be due to:</p>

        <ul>
          <li>Insufficient funds</li>
          <li>Expired card</li>
          <li>Card declined by bank</li>
        </ul>

        <p>Please update your payment method to continue your subscription:</p>

        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard"
           style="display: inline-block; background: #EF4444; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; margin: 10px 0;">
          Update Payment Method
        </a>

        <p style="margin-top: 20px; color: #6B7280; font-size: 14px;">
          Stripe will automatically retry the payment. If payment continues to fail,
          your subscription will be cancelled and you'll be moved to the free plan.
        </p>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, html });
}

export async function sendCancellationEmail(
  email: string,
  name: string,
  periodEnd: Date
) {
  const subject = 'Subscription Cancelled';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Subscription Cancelled</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1>Subscription Cancelled</h1>
        <p>Hi ${name},</p>
        <p>Your subscription has been cancelled. You'll continue to have access until:</p>

        <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <strong style="font-size: 18px;">${periodEnd.toLocaleDateString()}</strong>
        </div>

        <p>After this date, you'll be moved to our free plan with access to the Word Search generator.</p>

        <p>Changed your mind? You can reactivate your subscription anytime:</p>

        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/pricing"
           style="display: inline-block; background: #4F46E5; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; margin: 10px 0;">
          Reactivate Subscription
        </a>

        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          We'd love to hear your feedback about why you cancelled.
        </p>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, html });
}

export async function sendDeviceLimitWarning(email: string, name: string) {
  const subject = 'Multiple Devices Detected';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Device Limit</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #F59E0B;">Multiple Devices Detected</h1>
        <p>Hi ${name},</p>
        <p>We noticed you're signed in on multiple devices. Your account allows up to 2 concurrent sessions.</p>

        <p>If you're sharing your account with others, please note this violates our terms of service.</p>

        <p>Manage your active sessions:</p>

        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/sessions"
           style="display: inline-block; background: #F59E0B; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 6px; margin: 10px 0;">
          View Active Sessions
        </a>

        <p style="margin-top: 30px; color: #6B7280; font-size: 14px;">
          This is an automated security notification. If this wasn't you,
          please secure your account immediately.
        </p>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, html });
}
```

### Update Webhook Handlers to Send Emails

Modify `frontend/lib/stripe-webhooks.ts` to include email notifications:

```typescript
// Add to handleCheckoutCompleted
export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // ... existing code ...

  // Send welcome email
  await sendWelcomeEmail(customerEmail, user.name || 'User', tier);
}

// Add to handleInvoicePaid
export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // ... existing code ...

  // Send payment confirmation
  const user = await prisma.user.findUnique({ where: { stripeCustomerId: customerId } });
  if (user) {
    await sendPaymentSuccessEmail(
      user.email,
      user.name || 'User',
      invoice.amount_paid / 100,
      invoice.currency
    );
  }
}

// Add to handleInvoicePaymentFailed
export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  // ... existing code ...

  // Send failure notification
  if (user) {
    await sendPaymentFailedEmail(user.email, user.name || 'User');
  }
}

// Add to handleSubscriptionDeleted
export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // ... existing code ...

  // Send cancellation confirmation
  if (user) {
    await sendCancellationEmail(
      user.email,
      user.name || 'User',
      new Date(subscription.current_period_end * 1000)
    );
  }
}
```

### Tasks
1. Choose and install email service (Resend recommended)
2. Get API key and add to `.env.local`
3. Create `frontend/lib/email-service.ts`
4. Update `frontend/lib/stripe-webhooks.ts` to send emails
5. Test emails using Stripe test mode

### Testing Emails
```bash
# Trigger test checkout to receive welcome email
stripe trigger checkout.session.completed

# Check email inbox (use test mode with your real email)
```

---

## Step 10: Testing & Admin Analytics
**Time**: 3 hours
**Complexity**: Medium
**Why Last**: Verify everything works and add final polish

### What You're Testing

### A. Payment Flow Testing

Create test checklist and test each flow:

1. **New Subscription (Core Monthly)**
   - [ ] Click subscribe on pricing page
   - [ ] Complete checkout with test card: `4242 4242 4242 4242`
   - [ ] Verify redirect to dashboard
   - [ ] Check user tier updated in database
   - [ ] Verify subscription record created
   - [ ] Confirm welcome email received

2. **New Subscription (Full Annual)**
   - [ ] Subscribe to Full Access annual
   - [ ] Verify correct price charged ($240)
   - [ ] Check billing interval is "yearly"

3. **Upgrade**
   - [ ] Start with Core subscription
   - [ ] Upgrade to Full via customer portal
   - [ ] Verify prorated charge
   - [ ] Check tier updated immediately

4. **Cancellation**
   - [ ] Cancel subscription via portal
   - [ ] Verify `cancelAtPeriodEnd` = true
   - [ ] Confirm access continues until period end
   - [ ] Check cancellation email received

5. **Payment Failure**
   - [ ] Use test card: `4000 0000 0000 0341` (decline)
   - [ ] Verify subscription status = "past_due"
   - [ ] Check failure email sent

### B. Device Tracking Testing

1. **First Device**
   - [ ] Sign in on Chrome desktop
   - [ ] Verify session created with device info
   - [ ] Check device fingerprint stored

2. **Second Device**
   - [ ] Sign in on Firefox
   - [ ] Verify warning shown: "This is your second device"
   - [ ] Confirm login allowed
   - [ ] See 2 sessions in /dashboard/sessions

3. **Third Device (Limit Exceeded)**
   - [ ] Try to sign in on mobile
   - [ ] Verify blocked with message
   - [ ] Check list of active sessions shown
   - [ ] Revoke one session
   - [ ] Retry login - should succeed

4. **Suspicious Activity**
   - [ ] Use VPN to change country
   - [ ] Sign in quickly (< 1 hour)
   - [ ] Verify "impossible_travel" log created
   - [ ] Check admin sees suspicious activity flag

### C. Admin Control Testing

1. **User Control Dashboard**
   - [ ] Visit `/admin/user-control`
   - [ ] Search for users by email
   - [ ] View user stats (sessions, tier, etc.)
   - [ ] Upgrade free user to Core
   - [ ] Verify tier change in Stripe
   - [ ] Cancel paid subscription
   - [ ] Check refund functionality

2. **Session Monitoring**
   - [ ] View suspicious activity alerts
   - [ ] See all active sessions by user
   - [ ] Verify session count accurate

### File to Create: `frontend/app/admin/analytics/account-sharing/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';

interface SharingLog {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  eventType: string;
  location: string;
  createdAt: string;
}

interface Analytics {
  totalEvents: number;
  deviceLimitExceeded: number;
  impossibleTravel: number;
  rapidLogins: number;
  uniqueUsers: number;
  recentLogs: SharingLog[];
}

export default function AccountSharingAnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      const response = await fetch('/api/admin/analytics/account-sharing');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="p-8">Failed to load analytics</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Sharing Analytics</h1>
        <p className="text-muted-foreground">
          Monitor suspicious activity and device limit violations
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Device Limits Hit</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.deviceLimitExceeded}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Impossible Travel</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.impossibleTravel}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Users Flagged</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.uniqueUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Suspicious Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.recentLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No suspicious activity detected
                  </TableCell>
                </TableRow>
              ) : (
                analytics.recentLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{log.userName}</p>
                        <p className="text-sm text-muted-foreground">{log.userEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          log.eventType === 'impossible_travel'
                            ? 'destructive'
                            : log.eventType === 'device_limit_exceeded'
                            ? 'default'
                            : 'secondary'
                        }
                      >
                        {log.eventType.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
```

### File to Create: `frontend/app/api/admin/analytics/account-sharing/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const logs = await prisma.accountSharingLog.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const analytics = {
      totalEvents: logs.length,
      deviceLimitExceeded: logs.filter(l => l.eventType === 'device_limit_exceeded').length,
      impossibleTravel: logs.filter(l => l.eventType === 'impossible_travel').length,
      rapidLogins: logs.filter(l => l.eventType === 'rapid_login').length,
      uniqueUsers: new Set(logs.map(l => l.userId)).size,
      recentLogs: logs.map(log => ({
        id: log.id,
        userId: log.userId,
        userEmail: log.user.email,
        userName: log.user.name || 'Unknown',
        eventType: log.eventType,
        location: log.location || 'Unknown',
        createdAt: log.createdAt.toISOString(),
      })),
    };

    return NextResponse.json(analytics);

  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
```

### Final Deployment Checklist

Before going to production:

- [ ] **Environment Variables**
  - [ ] Update all `.env.local` to `.env.production`
  - [ ] Switch from Stripe test keys to live keys
  - [ ] Add production URLs

- [ ] **Stripe Configuration**
  - [ ] Create production products and prices
  - [ ] Configure webhook endpoint with live URL
  - [ ] Test webhook with live keys
  - [ ] Enable customer portal in Stripe settings

- [ ] **Database**
  - [ ] Run migrations on production database
  - [ ] Verify all indexes created
  - [ ] Backup database

- [ ] **Security**
  - [ ] Verify webhook signature validation
  - [ ] Test admin authorization
  - [ ] Check session security
  - [ ] Enable rate limiting on APIs

- [ ] **Testing**
  - [ ] Make real test purchase
  - [ ] Cancel and verify refund
  - [ ] Test customer portal
  - [ ] Verify all emails deliver

- [ ] **Monitoring**
  - [ ] Set up error tracking (Sentry)
  - [ ] Monitor webhook failures
  - [ ] Track conversion rates
  - [ ] Alert on payment failures

---

## 🎉 Implementation Complete!

After completing all 10 steps, you will have:

✅ **Fully Automated Subscription System**
- Stripe payments processed automatically
- User tiers updated in real-time
- No manual intervention needed

✅ **Professional Account Sharing Prevention**
- 2-device limit enforced
- Friendly user experience
- Suspicious activity detection
- Self-service session management

✅ **Powerful Admin Control**
- Unified user control dashboard
- One-click upgrades/downgrades
- Session monitoring
- Revenue analytics

✅ **Complete Visibility**
- MRR/ARR tracking
- Churn analytics
- Account sharing insights
- Payment success/failure rates

✅ **Excellent User Experience**
- Secure Stripe checkout
- Customer portal for self-service
- Email notifications
- Active sessions management

---

## 📊 Success Metrics

After implementation, track:

1. **Subscription Conversion Rate**: % of visitors who subscribe
2. **Churn Rate**: % of subscribers who cancel per month
3. **MRR Growth**: Month-over-month revenue growth
4. **Device Limit Hits**: How often users hit 2-device limit
5. **Suspicious Activity**: Account sharing attempts
6. **Payment Success Rate**: % of payments that succeed

---

## 🆘 Troubleshooting

### Webhooks Not Firing
- Check webhook endpoint is publicly accessible
- Verify webhook secret matches `.env` file
- Use Stripe CLI to forward webhooks locally
- Check Stripe Dashboard > Developers > Webhooks for delivery logs

### Sessions Not Tracking
- Ensure device fingerprint loads before auth
- Check session creation in auth callback
- Verify Session model updated correctly

### Emails Not Sending
- Check API key is correct
- Verify email service account verified
- Check spam folder
- Review email service logs

### Admin Dashboard Empty
- Verify admin user has `isAdmin: true` in database
- Check API routes return data
- Inspect browser console for errors

---

## 📞 Next Steps

1. **Start with Step 1** - Database schema enhancement
2. **Work sequentially** - Each step builds on previous
3. **Test after each step** - Don't wait until the end
4. **Ask questions** - If anything is unclear

**Ready to begin?** Start with Step 1! 🚀
