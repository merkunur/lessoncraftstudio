# 🔐 AUTHENTICATION CRITICAL FILES - REFERENCE DOCUMENT

**⚠️ WARNING: These files implement critical security features. DO NOT MODIFY without understanding the complete authentication flow!**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Critical Files List](#critical-files-list)
3. [Security Implementation Details](#security-implementation-details)
4. [Complete Authentication Flow](#complete-authentication-flow)
5. [Testing Requirements](#testing-requirements)
6. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
7. [Troubleshooting](#troubleshooting)

---

## Overview

**Last Updated:** 2025-10-26
**Related Commits:** `c6d4950` (device signout), `968dfb1` (signin UI state)

### Two Critical Fixes Implemented:

#### Fix #1: Device Conflict Modal (Commit c6d4950)
**Purpose:** Fix device conflict modal to properly sign out users from other devices

**The Problem:**
- ✅ Backend deleted the other device's session from database
- ❌ **BUT** the other device continued to work normally
- **Root Cause:** Authentication only checked JWT validity, never verified session existence in database

**The Solution:**
Implement **dual validation** for all authentication checks:
1. ✅ Verify JWT token is valid (signature + expiration)
2. ✅ **NEW:** Verify session record exists in database

This ensures that when a session is deleted from the database, it immediately becomes invalid on the next API request.

#### Fix #2: Signin Header Update (Commit 968dfb1)
**Purpose:** Make header update immediately after signin (no page refresh needed)

**The Problem:**
- Users signed in successfully
- ❌ **BUT** header still showed "Sign In" instead of "Sign Out"
- **Root Cause:** Signin page didn't update auth context after storing tokens

**The Solution:**
Call `checkAuth()` from auth context immediately after signin:
1. ✅ Tokens stored in localStorage
2. ✅ **NEW:** Call `checkAuth()` to update auth context
3. ✅ Navigation component re-renders with updated user state

This ensures the header reflects signin state immediately without page refresh.

---

## Critical Files List

### 🔴 CRITICAL - Core Authentication & Session Management

| File | Purpose | Lines | Impact |
|------|---------|-------|--------|
| `frontend/lib/auth.ts` | Core authentication logic - `getCurrentUser()` | 25-39 | **CRITICAL** - Used by most API routes |
| `frontend/lib/auth-middleware.ts` | Middleware functions for route protection | Multiple | **HIGH** - Used by protected routes |
| `frontend/app/api/auth/me/route.ts` | User profile API endpoint | 28-45, 180-197 | **CRITICAL** - Called by dashboard |
| `frontend/app/[locale]/dashboard/page.tsx` | Dashboard session verification | 143-171 | **CRITICAL** - User-facing trigger |
| `frontend/app/api/auth/force-signin/route.ts` | Device signout endpoint | 106-111 | **CRITICAL** - Session deletion |

### 🟡 CRITICAL - UI State Management

| File | Purpose | Lines | Impact |
|------|---------|-------|--------|
| `frontend/app/[locale]/auth/signin/signin-client.tsx` | Signin page - Updates auth context | 9, 64, 114, 211 | **CRITICAL** - Header state update |
| `frontend/contexts/auth-context.tsx` | Global auth state management | All | **CRITICAL** - Used by Navigation |
| `frontend/components/layout/Navigation.tsx` | Header navigation component | 25 | **HIGH** - Displays signin/signout button |

---

## Security Implementation Details

### 1. `frontend/lib/auth.ts`

**Function:** `getCurrentUser(request: NextRequest)`

**Purpose:** Get authenticated user from JWT token in Authorization header. Used by most API routes.

**Critical Code (Lines 25-39):**

```typescript
// Check if session still exists in database (prevents revoked sessions from working)
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: {
      gt: new Date()  // Session not expired
    }
  }
});

if (!session) {
  // Session was revoked or doesn't exist
  return null;
}
```

**Why This Matters:**

- This function is called by `/api/users/me/generations` and many other protected endpoints
- Without database check: Revoked sessions with valid JWTs continue to work
- With database check: Revoked sessions return `null`, triggering 401 errors

**API Routes Using This Function:**

```bash
grep -r "getCurrentUser" frontend/app/api --include="*.ts"
```

Common routes:
- `/api/users/me/generations`
- `/api/admin/*` routes
- Any route importing `getCurrentUser` from `@/lib/auth`

---

### 2. `frontend/lib/auth-middleware.ts`

**Functions:**
- `withAuth(request, handler)` - Basic authentication
- `withAdmin(request, handler)` - Admin access required
- `withSubscription(request, requiredTier, handler)` - Subscription tier check
- `getUserIdFromRequest(request)` - Get user ID without enforcing auth

**Critical Code Pattern (Repeated in each function):**

```typescript
const payload = verifyAccessToken(token);
if (!payload) {
  return NextResponse.json(
    { error: 'Invalid or expired token' },
    { status: 401 }
  );
}

// ⭐ CRITICAL: Database session validation
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: {
      gt: new Date()
    }
  }
});

if (!session) {
  return NextResponse.json(
    { error: 'Session expired or revoked. Please sign in again.' },
    { status: 401 }
  );
}
```

**Why This Matters:**

- These middleware functions provide an additional layer of protection
- Used by routes that explicitly wrap handlers with middleware
- Provides consistent session validation across different auth levels

---

### 3. `frontend/app/api/auth/me/route.ts`

**Endpoints:**
- `GET /api/auth/me` - Get current user profile
- `PATCH /api/auth/me` - Update user profile

**Critical Code (Lines 28-45 in GET, Lines 180-197 in PATCH):**

```typescript
const payload = verifyAccessToken(token);
if (!payload) {
  return NextResponse.json(
    { error: 'Invalid or expired token' },
    { status: 401 }
  );
}

// ⭐ CRITICAL: Check if session still exists in database
const session = await prisma.session.findFirst({
  where: {
    token: token,
    userId: payload.userId,
    expiresAt: {
      gt: new Date()
    }
  }
});

if (!session) {
  // Session was revoked or doesn't exist
  return NextResponse.json(
    { error: 'Session expired or revoked. Please sign in again.' },
    { status: 401 }
  );
}
```

**Why This Matters:**

- **This is the FIRST API endpoint called when dashboard loads**
- If this check is missing, revoked sessions won't be detected on dashboard load
- The 401 error from this endpoint triggers the signout flow in the dashboard

**Request Flow:**

```
Dashboard loads
    ↓
verifySession() called
    ↓
fetch('/api/auth/me')
    ↓
[Database session check happens here]
    ↓
If session not found → 401 error
    ↓
Dashboard clears localStorage
    ↓
Redirect to /auth/signin
```

---

### 4. `frontend/app/[locale]/dashboard/page.tsx`

**Critical Function:** `verifySession(token: string)`

**Lines:** 143-171

**Complete Implementation:**

```typescript
const verifySession = async (token: string) => {
  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      // ⭐ CRITICAL: Session expired or revoked - redirect to signin
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      router.push('/auth/signin');
      return;
    }

    const data = await response.json();
    setUser(data.user);
    fetchRecentGenerations(token);
  } catch (error) {
    console.error('Session verification failed:', error);
    // ⭐ CRITICAL: On error, clear tokens and redirect
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/auth/signin');
  }
};
```

**Why This Matters:**

- Called in `useEffect()` when dashboard component mounts
- This is the **user-facing trigger** for device signout
- Without this check, users would need to manually refresh or navigate to trigger signout
- Provides immediate feedback when session is revoked

**What Happens:**

1. User on Device 1 has active session
2. User signs in on Device 2, clicks "Sign out from another device"
3. Device 1's session deleted from database
4. User on Device 1 refreshes page or navigates
5. Dashboard loads, `verifySession()` called
6. `/api/auth/me` returns 401 (session not found in database)
7. Dashboard clears localStorage
8. Dashboard redirects to signin page
9. ✅ **Device 1 is signed out!**

---

### 5. `frontend/app/api/auth/force-signin/route.ts`

**Endpoint:** `POST /api/auth/force-signin`

**Critical Code (Lines 106-111):**

```typescript
// ⭐ CRITICAL: REVOKE ALL OTHER SESSIONS (force single device)
const revokedSessions = await prisma.session.deleteMany({
  where: {
    userId: user.id,
    deviceId: { not: deviceId }, // Delete all sessions except current device
  }
});

console.log(`Force signin: Revoked ${revokedSessions.count} session(s) for user ${user.id}`);
```

**Why This Matters:**

- This is the **trigger** that starts the device signout process
- Deletes all other device sessions from database
- The deletion makes those sessions invalid (because database checks in other files)

**Request Flow:**

```
User clicks "Sign out from another device and continue"
    ↓
POST /api/auth/force-signin with deviceId
    ↓
[Code finds all sessions EXCEPT current deviceId]
    ↓
prisma.session.deleteMany({ where: { userId, deviceId: { not: deviceId }}})
    ↓
Other device sessions deleted from database
    ↓
Other devices now have invalid sessions
    ↓
Next API request from other device → 401 error
```

---

### 6. `frontend/app/[locale]/auth/signin/signin-client.tsx` - Signin Page

**Critical Functions:** `handleSubmit()` and `handleForceSignin()`

**Purpose:** Signin page that updates auth context to reflect UI state changes

**Critical Code (Lines 9, 64, 114, 211):**

```typescript
// Line 9: Import auth context
import { useAuth } from '@/contexts/auth-context';

// Line 64: Get checkAuth function from context
const { checkAuth } = useAuth();

// Line 114: Update auth context after normal signin
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);
localStorage.setItem('user', JSON.stringify(data.user));

// ⭐ CRITICAL: Update auth context to reflect signin state
await checkAuth();

// Line 211: Update auth context after force signin
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);
localStorage.setItem('user', JSON.stringify(data.user));

// ⭐ CRITICAL: Update auth context to reflect signin state
await checkAuth();
```

**Why This Matters:**

- Navigation component reads auth state from auth context (`useAuth()`)
- Without `checkAuth()` call: Auth context's `user` remains `null`
- Result: Header still shows "Sign In" instead of "Sign Out"
- With `checkAuth()` call: Auth context updates → Navigation re-renders → Header updates

**What Happens:**

1. User submits signin form
2. API returns tokens and user data
3. Tokens stored in localStorage
4. **`checkAuth()` called** ← **CRITICAL**
5. Auth context fetches `/api/auth/me` to verify session
6. Auth context sets `user` state
7. Navigation component re-renders (uses `useAuth()`)
8. ✅ **Header changes from "Sign In" to "Sign Out" immediately!**

**Impact of Removing `checkAuth()` Calls:**

| Before Fix (No checkAuth) | After Fix (With checkAuth) |
|---------------------------|----------------------------|
| ❌ Header shows "Sign In" after signin | ✅ Header shows "Sign Out" immediately |
| ❌ Requires page refresh to update | ✅ Updates without page refresh |
| ❌ Unprofessional UX | ✅ Professional UX |
| ❌ User confusion | ✅ Clear visual feedback |

---

## Complete Authentication Flow

### Normal Sign-In Flow

```mermaid
User signs in
    ↓
POST /api/auth/signin
    ↓
Create session in database (with token)
    ↓
Return { accessToken, refreshToken, user }
    ↓
Frontend stores in localStorage
    ↓
Dashboard loads
    ↓
verifySession() → GET /api/auth/me
    ↓
getCurrentUser() checks:
  1. JWT valid? ✅
  2. Session in database? ✅
    ↓
Return user data
    ↓
Dashboard displays
```

### Device Conflict Flow

```mermaid
User already signed in on Device 1
    ↓
User tries to sign in on Device 2
    ↓
POST /api/auth/signin detects existing session
    ↓
Return 409 Conflict with device info
    ↓
Device conflict modal appears
    ↓
User clicks "Sign out from another device and continue"
    ↓
POST /api/auth/force-signin
    ↓
Delete Device 1's session from database
    ↓
Create new session for Device 2
    ↓
Return { accessToken, refreshToken, user } to Device 2
    ↓
[Meanwhile on Device 1...]
    ↓
User refreshes page or navigates
    ↓
Dashboard loads → verifySession()
    ↓
GET /api/auth/me
    ↓
getCurrentUser() checks:
  1. JWT valid? ✅
  2. Session in database? ❌ (deleted!)
    ↓
Return 401 "Session expired or revoked"
    ↓
Dashboard receives 401
    ↓
Clear localStorage
    ↓
Redirect to /auth/signin
    ↓
✅ Device 1 signed out!
```

---

## Testing Requirements

### ✅ Manual Testing Checklist

**After ANY modification to these files, you MUST test:**

#### Test 1: Basic Device Signout

1. Open Chrome (Device 1)
2. Sign in to your account
3. Verify dashboard loads successfully
4. Open Firefox (Device 2)
5. Try to sign in with same account
6. ✅ **VERIFY:** Device conflict modal appears
7. Click "Sign out from another device and continue"
8. ✅ **VERIFY:** Device 2 dashboard loads successfully
9. Go back to Chrome (Device 1)
10. Refresh the page
11. ✅ **VERIFY:** Device 1 redirects to signin page
12. Try to access `/dashboard` directly on Device 1
13. ✅ **VERIFY:** Device 1 still redirects to signin page

#### Test 2: Session Persistence on Active Device

1. Continue from Test 1 with Device 2 active
2. Navigate around dashboard
3. Access different worksheet generators
4. ✅ **VERIFY:** Device 2 continues to work normally
5. Refresh page on Device 2
6. ✅ **VERIFY:** Device 2 still works (session not revoked)

#### Test 3: Multiple Sign-Ins

1. Sign in on Device 1 (Chrome)
2. Sign in on Device 2 (Firefox) → Force signout Device 1
3. Sign in on Device 3 (Edge) → Force signout Device 2
4. ✅ **VERIFY:** Device 1 is signed out
5. ✅ **VERIFY:** Device 2 is signed out
6. ✅ **VERIFY:** Device 3 is active and working

#### Test 4: API Endpoint Protection

1. Sign in on Device 1
2. Open browser DevTools → Network tab
3. Note the `Authorization: Bearer <token>` header
4. Sign in on Device 2 → Force signout Device 1
5. In Device 1 DevTools Console, manually call:
   ```javascript
   fetch('/api/users/me/generations', {
     headers: {
       'Authorization': 'Bearer <old-token-from-step-3>'
     }
   }).then(r => r.json()).then(console.log)
   ```
6. ✅ **VERIFY:** Response is 401 or null (not valid user data)

### 🧪 Automated Testing (Future Enhancement)

```typescript
// Example test for getCurrentUser
describe('getCurrentUser', () => {
  it('should return null if session is revoked', async () => {
    // Create user and session
    const user = await createTestUser();
    const session = await createTestSession(user);

    // Make request with valid token
    const request = createMockRequest({
      headers: { authorization: `Bearer ${session.token}` }
    });

    // Delete session from database (simulate force-signin)
    await prisma.session.delete({ where: { id: session.id }});

    // getCurrentUser should return null
    const result = await getCurrentUser(request);
    expect(result).toBeNull();
  });
});
```

---

## Common Mistakes to Avoid

### ❌ Mistake #1: Removing Database Check

**WRONG:**
```typescript
const payload = verifyAccessToken(token);
if (!payload) {
  return null;
}
// ❌ Missing database check!
const user = await prisma.user.findUnique({ where: { id: payload.userId }});
return user;
```

**CORRECT:**
```typescript
const payload = verifyAccessToken(token);
if (!payload) {
  return null;
}

// ✅ Database session check
const session = await prisma.session.findFirst({
  where: { token, userId: payload.userId, expiresAt: { gt: new Date() }}
});

if (!session) {
  return null; // Session revoked
}

const user = await prisma.user.findUnique({ where: { id: payload.userId }});
return user;
```

---

### ❌ Mistake #2: Dashboard Not Calling API

**WRONG:**
```typescript
useEffect(() => {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    router.push('/auth/signin');
    return;
  }

  // ❌ Just setting state from localStorage - no API verification!
  setUser(JSON.parse(userStr));
}, [router]);
```

**CORRECT:**
```typescript
useEffect(() => {
  const token = localStorage.getItem('accessToken');
  const userStr = localStorage.getItem('user');

  if (!token || !userStr) {
    router.push('/auth/signin');
    return;
  }

  // ✅ Verify session with API
  verifySession(token);
}, [router]);

const verifySession = async (token: string) => {
  const response = await fetch('/api/auth/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!response.ok) {
    // Clear and redirect
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/auth/signin');
    return;
  }

  const data = await response.json();
  setUser(data.user);
};
```

---

### ❌ Mistake #3: Inconsistent Session Checks

**WRONG:**
```typescript
// File 1: lib/auth.ts - Has database check ✅
const session = await prisma.session.findFirst({...});

// File 2: api/auth/me - Missing database check ❌
const payload = verifyAccessToken(token);
return user;

// Result: Inconsistent behavior!
```

**CORRECT:**
```typescript
// ✅ ALL files must have database check
// Pattern should be identical across:
// - lib/auth.ts
// - lib/auth-middleware.ts
// - api/auth/me/route.ts

const payload = verifyAccessToken(token);
if (!payload) return null;

const session = await prisma.session.findFirst({
  where: { token, userId: payload.userId, expiresAt: { gt: new Date() }}
});

if (!session) return null;
```

---

### ❌ Mistake #4: Signin Page Not Updating Auth Context

**WRONG:**
```typescript
// signin-client.tsx - Missing checkAuth() call
const handleSubmit = async (e) => {
  // ... signin logic ...

  // Store tokens
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));

  // ❌ Missing checkAuth() call - header won't update!
  router.push('/dashboard');
};
```

**Result:**
- ❌ Tokens stored in localStorage
- ❌ User redirected to dashboard
- ❌ Auth context `user` still `null`
- ❌ Navigation header still shows "Sign In"
- ❌ Requires page refresh to see "Sign Out"

**CORRECT:**
```typescript
// signin-client.tsx - With checkAuth() call
import { useAuth } from '@/contexts/auth-context';

const SignInClient = () => {
  const { checkAuth } = useAuth();

  const handleSubmit = async (e) => {
    // ... signin logic ...

    // Store tokens
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    // ✅ Update auth context - header updates immediately!
    await checkAuth();

    router.push('/dashboard');
  };
};
```

**Result:**
- ✅ Tokens stored in localStorage
- ✅ Auth context updated via `checkAuth()`
- ✅ Navigation component re-renders
- ✅ Header immediately shows "Sign Out"
- ✅ Professional UX - no refresh needed

**Must Have `checkAuth()` In:**
1. ✅ Normal signin flow (`handleSubmit` - line 114)
2. ✅ Force signin flow (`handleForceSignin` - line 211)

**Impact:** If removed, users will see "Sign In" button even after signing in until they manually refresh the page.

---

## Troubleshooting

### Problem: Device not signing out

**Symptoms:**
- User clicks "Sign out from another device"
- Other device still works after refresh

**Diagnosis Steps:**

1. **Check database:**
   ```sql
   -- Are sessions being deleted?
   SELECT * FROM Session WHERE userId = '<user-id>';
   ```
   - If sessions NOT deleted: Issue in `force-signin/route.ts`
   - If sessions ARE deleted: Issue in auth validation

2. **Check API responses:**
   - Open DevTools on "stuck" device
   - Refresh page
   - Check Network tab for `/api/auth/me` request
   - Should return 401, not 200

3. **Check getCurrentUser:**
   - Add console.log in `lib/auth.ts`:
   ```typescript
   const session = await prisma.session.findFirst({...});
   console.log('Session found:', !!session);
   ```
   - Should log `Session found: false`

4. **Check dashboard:**
   - Add console.log in `dashboard/page.tsx`:
   ```typescript
   if (!response.ok) {
     console.log('Session invalid, redirecting...');
     // Clear and redirect
   }
   ```
   - Should log message before redirect

---

### Problem: Users getting signed out unexpectedly

**Symptoms:**
- User working normally
- Suddenly redirected to signin
- Didn't sign in on another device

**Diagnosis Steps:**

1. **Check session expiration:**
   ```sql
   SELECT expiresAt FROM Session WHERE token = '<token>';
   ```
   - If `expiresAt < NOW()`: Session naturally expired (normal)

2. **Check for duplicate database checks:**
   - Make sure not querying with wrong token
   - Verify `token` field matches exactly

3. **Check JWT expiration:**
   - JWTs expire after 7 days (default)
   - Session database records should match JWT expiry

---

## Version History

| Date | Commit | Changes |
|------|--------|---------|
| 2025-10-26 | `79f32f4` | Initial device signout attempt - Updated middleware only (incomplete) |
| 2025-10-26 | `c6d4950` | Complete device signout fix - Updated getCurrentUser, /api/auth/me, dashboard |
| 2025-10-26 | `968dfb1` | Signin header update fix - Added checkAuth() calls to signin-client.tsx |

---

## Related Documentation

- `DEPLOYMENT.md` - Section "CRITICAL: AUTHENTICATION & SESSION SECURITY FILES"
- `DEVICE_SIGNOUT_BUG_ANALYSIS.md` - Original bug analysis and fix
- Database Schema: `prisma/schema.prisma` - Session model definition

---

**Document Created:** 2025-10-26
**Last Updated:** 2025-10-26
**Maintained By:** Development Team

**⚠️ REMEMBER: These files are CRITICAL for security. Always test thoroughly after ANY changes!**
