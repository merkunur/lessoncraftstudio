# 📁 Files to Create or Fix - Complete Checklist

## 🔴 NEW FILES (Must Create - Step 0)

### Authentication & Core Setup

#### 1. `frontend/lib/prisma.ts`
**Purpose**: Prisma client singleton
**Status**: ✅ Must Create
**Lines**: ~20
```typescript
import { PrismaClient } from '@prisma/client';
// Prevents multiple instances in development
```

#### 2. `frontend/lib/auth.ts`
**Purpose**: NextAuth configuration with device tracking
**Status**: ✅ Must Create
**Lines**: ~120
**Critical**: Contains `authOptions` used everywhere

#### 3. `frontend/lib/server-auth.ts`
**Purpose**: Server-side authentication helpers
**Status**: ✅ Must Create
**Lines**: ~80
**Exports**:
- `getAuthUser()`
- `requireAuth()`
- `requireAdmin()`
- `withAuth()` middleware
- `withAdmin()` middleware

#### 4. `frontend/lib/client-auth.ts`
**Purpose**: Client-side authentication hooks
**Status**: ✅ Must Create
**Lines**: ~30
**Exports**:
- `useAuth()`
- `useRequireAuth()`

#### 5. `frontend/app/api/auth/[...nextauth]/route.ts`
**Purpose**: NextAuth API route
**Status**: ✅ Must Create
**Lines**: ~6
```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## 🟡 MODIFIED FILES (Must Fix)

### Step 3 Fixes

#### 6. `frontend/components/device-fingerprint-provider.tsx`
**Current Status**: ⚠️ Broken - No Context exposed
**Fix Required**: Add React Context and useDeviceFingerprint hook
**Lines to Add**: ~30

**What's Missing**:
```typescript
// ❌ Current - No way to access deviceId
export function DeviceFingerprintProvider({ children }) {
  const [deviceId, setDeviceId] = useState(null);
  return <>{children}</>;
}

// ✅ Fixed - Proper Context
const DeviceFingerprintContext = createContext<{deviceId, isLoading, error}>(...);

export function useDeviceFingerprint() {
  return useContext(DeviceFingerprintContext);
}

export function DeviceFingerprintProvider({ children }) {
  // ... load deviceId
  return (
    <DeviceFingerprintContext.Provider value={{deviceId, isLoading, error}}>
      {children}
    </DeviceFingerprintContext.Provider>
  );
}
```

---

### Step 4 Fixes

#### 7. `frontend/app/api/auth/session-check/route.ts`
**Current Status**: ⚠️ CRITICAL SECURITY ISSUE - No authentication
**Fix Required**: Add authentication check
**Lines to Change**: ~5

**Before** (DANGEROUS):
```typescript
export async function POST(request: NextRequest) {
  const { userId, deviceId } = await request.json();
  // ❌ No auth check - anyone can check any user!
```

**After** (SECURE):
```typescript
import { withAuth } from '@/lib/server-auth';

export const POST = withAuth(async (request, user) => {
  const { userId, deviceId } = await request.json();

  // ✅ Verify user can only check own sessions
  if (user.id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
```

#### 8. `frontend/app/api/auth/revoke-session/route.ts`
**Current Status**: ⚠️ References missing authOptions
**Fix Required**: Update import
**Lines to Change**: 2

**Before**:
```typescript
import { authOptions } from '@/lib/auth'; // ❌ File doesn't exist
```

**After**:
```typescript
import { withAuth } from '@/lib/server-auth'; // ✅ Use helper
export const POST = withAuth(async (request, user) => {
  // user already authenticated
});
```

#### 9. `frontend/app/api/auth/active-sessions/route.ts`
**Current Status**: ⚠️ References missing authOptions
**Fix Required**: Same as above
**Lines to Change**: 2

---

### Step 5 Fixes - Stripe Webhooks (CRITICAL)

#### 10. `frontend/lib/stripe-webhooks.ts`
**Current Status**: ⚠️ Multiple critical issues
**Fixes Required**:
1. Change API version: `2024-11-20.acacia` → `2024-10-28.acacia`
2. Add idempotency handling
3. Fix user creation schema mismatch
4. Add database transactions

**Line-by-Line Fixes**:

**Line ~5** - API Version:
```typescript
// ❌ Before
apiVersion: '2024-11-20.acacia'

// ✅ After
apiVersion: '2024-10-28.acacia'
```

**Line ~650** - User Creation:
```typescript
// ❌ Before - Missing required passwordHash
create: {
  email: customerEmail,
  name: session.customer_details?.name || 'User',
  stripeCustomerId: customerId,
  subscriptionTier: tier,
}

// ✅ After - All required fields
create: {
  email: customerEmail,
  firstName: session.customer_details?.name?.split(' ')[0] || 'User',
  lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') || '',
  passwordHash: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10),
  stripeCustomerId: customerId,
  subscriptionTier: tier,
}
```

**Line ~790** - Payment Idempotency:
```typescript
// ❌ Before - Can create duplicates
await prisma.payment.create({
  data: {
    userId: user.id,
    stripePaymentId: invoice.payment_intent as string,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency.toUpperCase(),
    status: 'succeeded',
  },
});

// ✅ After - Upsert prevents duplicates
await prisma.payment.upsert({
  where: {
    stripePaymentId: invoice.payment_intent as string,
  },
  update: {
    status: 'succeeded',
  },
  create: {
    userId: user.id,
    stripePaymentId: invoice.payment_intent as string,
    amount: invoice.amount_paid / 100,
    currency: invoice.currency.toUpperCase(),
    status: 'succeeded',
  },
});
```

#### 11. `frontend/app/api/stripe/webhook/route.ts`
**Current Status**: ⚠️ Missing raw body configuration
**Fix Required**: Add config export
**Lines to Add**: 5

**Add at Top**:
```typescript
// ✅ CRITICAL: Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
```

**Fix Imports**:
```typescript
// ❌ Before
apiVersion: '2024-11-20.acacia'

// ✅ After
apiVersion: '2024-10-28.acacia'
```

---

### Step 6 Fixes - Missing Admin Routes

#### 12. `frontend/app/api/admin/subscriptions/[action]/route.ts`
**Current Status**: ⚠️ References missing authOptions
**Fix Required**: Update to use withAdmin
**Lines to Change**: 3

**Before**:
```typescript
const session = await getServerSession(authOptions);
if (!session?.user?.isAdmin) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}
```

**After**:
```typescript
import { withAdmin } from '@/lib/server-auth';

export const POST = withAdmin(async (request, user, { params }) => {
  // user is already verified as admin
});
```

---

## 🟢 NEW FILES (Missing Admin Routes)

#### 13. `frontend/app/api/admin/user-control/upgrade/route.ts`
**Purpose**: Upgrade user subscription tier
**Status**: ⚠️ Referenced but never created
**Lines**: ~60

```typescript
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const upgradeSchema = z.object({
  userId: z.string().cuid(),
  tier: z.enum(['core', 'full']),
});

export const POST = withAdmin(async (request) => {
  const body = await request.json();
  const { userId, tier } = upgradeSchema.parse(body);

  // Update user tier
  await prisma.user.update({
    where: { id: userId },
    data: { subscriptionTier: tier },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      userId,
      action: 'tier_upgraded',
      details: `Upgraded to ${tier} by admin`,
    },
  });

  return NextResponse.json({ success: true });
});
```

#### 14. `frontend/app/api/admin/user-control/cancel/route.ts`
**Purpose**: Cancel user subscription
**Status**: ⚠️ Referenced but never created
**Lines**: ~50

```typescript
import { withAdmin } from '@/lib/server-auth';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = withAdmin(async (request) => {
  const { userId } = await request.json();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
  }

  // Cancel in Stripe
  if (user.subscription?.stripeSubscriptionId) {
    await stripe.subscriptions.update(user.subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });
  }

  // Update database
  await prisma.subscription.updateMany({
    where: { userId },
    data: { cancelAtPeriodEnd: true },
  });

  return NextResponse.json({ success: true });
});
```

#### 15. `frontend/app/api/admin/user-control/list/route.ts`
**Current Status**: ⚠️ References missing authOptions
**Fix Required**: Update to use withAdmin
**Lines to Change**: 3

---

## 🔵 NEW FILES (Validation & Error Handling)

#### 16. `frontend/lib/validations/subscription.ts`
**Purpose**: Zod validation schemas
**Status**: ✅ Must Create (NEW)
**Lines**: ~40

```typescript
import { z } from 'zod';

export const sessionCheckSchema = z.object({
  userId: z.string().cuid(),
  deviceId: z.string().min(10).max(100),
});

export const revokeSessionSchema = z.object({
  sessionId: z.string().cuid(),
});

export const createCheckoutSchema = z.object({
  priceId: z.string().startsWith('price_'),
});

export const upgradeUserSchema = z.object({
  userId: z.string().cuid(),
  tier: z.enum(['free', 'core', 'full']),
});
```

#### 17. `frontend/lib/api-error.ts`
**Purpose**: Structured error handling
**Status**: ✅ Must Create (NEW)
**Lines**: ~50

```typescript
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Resource already exists', code: error.code },
        { status: 409 }
      );
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Resource not found', code: error.code },
        { status: 404 }
      );
    }
  }

  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

---

## 📝 MODIFIED FILES (Layout)

#### 18. `frontend/app/layout.tsx`
**Current Status**: ⚠️ Missing SessionProvider
**Fix Required**: Wrap with SessionProvider
**Lines to Add**: 3

**Before**:
```typescript
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**After**:
```typescript
import { SessionProvider } from 'next-auth/react';
import { DeviceFingerprintProvider } from '@/components/device-fingerprint-provider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <DeviceFingerprintProvider>
            {children}
          </DeviceFingerprintProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
```

---

## ✅ Complete Checklist

### Priority 1: CRITICAL (Must Do First)
- [ ] Create `frontend/lib/prisma.ts`
- [ ] Create `frontend/lib/auth.ts`
- [ ] Create `frontend/lib/server-auth.ts`
- [ ] Create `frontend/lib/client-auth.ts`
- [ ] Create `frontend/app/api/auth/[...nextauth]/route.ts`
- [ ] Fix `frontend/app/api/stripe/webhook/route.ts` (add config)
- [ ] Fix `frontend/lib/stripe-webhooks.ts` (API version, idempotency)
- [ ] Fix `frontend/app/api/auth/session-check/route.ts` (authentication)

### Priority 2: HIGH (Required for Functionality)
- [ ] Fix `frontend/components/device-fingerprint-provider.tsx` (add Context)
- [ ] Create `frontend/app/api/admin/user-control/upgrade/route.ts`
- [ ] Create `frontend/app/api/admin/user-control/cancel/route.ts`
- [ ] Fix all API routes to use `withAuth` or `withAdmin`
- [ ] Update `frontend/app/layout.tsx` (add SessionProvider)

### Priority 3: MEDIUM (Quality Improvements)
- [ ] Create `frontend/lib/validations/subscription.ts`
- [ ] Create `frontend/lib/api-error.ts`
- [ ] Add validation to all API routes
- [ ] Add error handling to all API routes

### Priority 4: LOW (Nice to Have)
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Add API documentation
- [ ] Add logging infrastructure

---

## 📊 Summary

| Category | Files to Create | Files to Fix | Total |
|----------|----------------|--------------|-------|
| **Authentication** | 5 | 1 | 6 |
| **Device Tracking** | 0 | 1 | 1 |
| **Session Management** | 0 | 3 | 3 |
| **Stripe Webhooks** | 0 | 2 | 2 |
| **Admin Routes** | 2 | 2 | 4 |
| **Validation** | 1 | 0 | 1 |
| **Error Handling** | 1 | 0 | 1 |
| **Layout** | 0 | 1 | 1 |
| **TOTAL** | **9** | **10** | **19** |

---

## ⏱️ Time Estimate

- **Creating new files**: ~3 hours
- **Fixing existing files**: ~2 hours
- **Testing everything**: ~2 hours
- **Total**: ~7 hours

**But saves**: ~40 hours of debugging production issues!

---

## 🎯 Implementation Order

1. **Day 1 (3 hours)**: Authentication setup (Files 1-5)
2. **Day 2 (2 hours)**: Fix critical security issues (Files 6-11)
3. **Day 3 (2 hours)**: Add missing routes and validation (Files 12-17)

**Result**: Production-ready system in 3 days instead of months of debugging.
