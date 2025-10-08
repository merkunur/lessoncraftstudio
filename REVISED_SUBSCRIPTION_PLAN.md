# 🎯 REVISED: Professional Subscription System with Account Sharing Prevention

## 📋 Updated Subscription Model

### Tier Structure (NO USAGE LIMITS)

| Feature | Free | Core Bundle | Full Access |
|---------|------|-------------|-------------|
| **Price** | $0 | $15/mo or $144/yr | $25/mo or $240/yr |
| **Apps Access** | Word Search only | 10 popular apps | All 33 apps |
| **Watermarks** | Yes | No | No |
| **Downloads** | ✅ Unlimited | ✅ Unlimited | ✅ Unlimited |
| **Generation** | ✅ Unlimited | ✅ Unlimited | ✅ Unlimited |
| **Account Sharing** | ⚠️ Prevented | ⚠️ Prevented | ⚠️ Prevented |

### Professional Account Sharing Prevention

**Approach**: Grace period with friendly warnings instead of immediate blocking

```
User Signs In on Device 1 (Desktop)
    ↓
✅ Session created
    ↓
User Signs In on Device 2 (Tablet)
    ↓
⚠️  Warning shown: "You're signed in on another device"
    ↓
User continues (allowed)
    ↓
User Signs In on Device 3 (Phone)
    ↓
🔴 Action required: "Please sign out from one device first"
    ↓
User can:
  1. View all active sessions
  2. Sign out from specific device
  3. Continue after signing out elsewhere
```

**Key Principles**:
1. **2 concurrent devices allowed** (reasonable for one user)
2. **Friendly warnings** before blocking
3. **Self-service session management** (view & revoke)
4. **Grace period** for accidental logins
5. **Admin override** capability

---

## 🗄️ Database Schema Updates

### Enhanced Session Model

```typescript
// Prisma schema enhancement
model Session {
  id           String   @id @default(cuid())
  userId       String   @map("user_id")
  token        String   @unique
  refreshToken String?  @unique @map("refresh_token")

  // Device tracking
  deviceId     String?  @map("device_id")      // NEW: Browser fingerprint
  deviceName   String?  @map("device_name")    // NEW: "Chrome on Windows"
  deviceType   String?  @map("device_type")    // NEW: "desktop", "mobile", "tablet"

  // Location tracking
  ipAddress    String?  @map("ip_address")
  country      String?                          // NEW: From IP geolocation
  city         String?                          // NEW: From IP geolocation

  userAgent    String?  @map("user_agent")

  // Session metadata
  lastActivityAt DateTime @default(now()) @map("last_activity_at") // NEW
  expiresAt      DateTime @map("expires_at")
  createdAt      DateTime @default(now()) @map("created_at")

  // Sharing detection
  isSuspicious Boolean @default(false) @map("is_suspicious") // NEW
  warningCount Int     @default(0) @map("warning_count")      // NEW

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([token])
  @@index([deviceId])
  @@map("sessions")
}

// New model for tracking account sharing attempts
model AccountSharingLog {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")

  eventType String   @map("event_type") // "concurrent_login", "device_limit_exceeded", etc.
  deviceId  String?  @map("device_id")
  ipAddress String?  @map("ip_address")
  userAgent String?  @map("user_agent")

  action    String   // "warning_shown", "login_blocked", "session_revoked"
  metadata  Json?    // Additional context

  createdAt DateTime @default(now()) @map("created_at")

  @@index([userId])
  @@index([eventType])
  @@index([createdAt])
  @@map("account_sharing_logs")
}
```

---

## 🔐 Account Sharing Prevention System

### 1. Device Tracking & Fingerprinting

**File**: `frontend/lib/device-fingerprint.ts`

```typescript
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getDeviceFingerprint(): Promise<string> {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
}

export function getDeviceInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  // Detect device type
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isTablet = /iPad|Android.*Tablet/i.test(ua);

  // Get browser name
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  // Get OS
  let os = 'Unknown';
  if (platform.includes('Win')) os = 'Windows';
  else if (platform.includes('Mac')) os = 'macOS';
  else if (platform.includes('Linux')) os = 'Linux';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Android')) os = 'Android';

  return {
    deviceName: `${browser} on ${os}`,
    deviceType: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
    browser,
    os,
    userAgent: ua,
  };
}
```

### 2. Session Management API

**File**: `frontend/app/api/auth/session-check/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getDeviceFingerprint } from '@/lib/device-fingerprint';

const MAX_CONCURRENT_SESSIONS = 2; // Allow 2 devices simultaneously

export async function POST(request: NextRequest) {
  const { userId, deviceId, deviceInfo } = await request.json();

  // Get active sessions for this user
  const activeSessions = await prisma.session.findMany({
    where: {
      userId,
      expiresAt: { gt: new Date() }
    },
    orderBy: { lastActivityAt: 'desc' }
  });

  // Check if this device already has a session
  const existingSession = activeSessions.find(s => s.deviceId === deviceId);

  if (existingSession) {
    // Same device logging in again - allow and update
    await prisma.session.update({
      where: { id: existingSession.id },
      data: { lastActivityAt: new Date() }
    });

    return NextResponse.json({
      allowed: true,
      action: 'existing_session_updated'
    });
  }

  // Check concurrent session limit
  if (activeSessions.length >= MAX_CONCURRENT_SESSIONS) {
    // Log the attempt
    await prisma.accountSharingLog.create({
      data: {
        userId,
        eventType: 'device_limit_exceeded',
        deviceId,
        ipAddress: request.headers.get('x-forwarded-for') || request.ip,
        userAgent: deviceInfo.userAgent,
        action: 'login_blocked',
        metadata: {
          activeDevices: activeSessions.length,
          attemptedDevice: deviceInfo
        }
      }
    });

    // Return session list so user can sign out from one
    return NextResponse.json({
      allowed: false,
      action: 'device_limit_exceeded',
      message: 'You are signed in on the maximum number of devices. Please sign out from another device first.',
      activeSessions: activeSessions.map(s => ({
        id: s.id,
        deviceName: s.deviceName,
        deviceType: s.deviceType,
        location: s.city ? `${s.city}, ${s.country}` : s.country,
        lastActive: s.lastActivityAt,
        current: false
      }))
    }, { status: 403 });
  }

  // Show warning if this is the 2nd device
  if (activeSessions.length === MAX_CONCURRENT_SESSIONS - 1) {
    await prisma.accountSharingLog.create({
      data: {
        userId,
        eventType: 'concurrent_login_warning',
        deviceId,
        ipAddress: request.headers.get('x-forwarded-for') || request.ip,
        userAgent: deviceInfo.userAgent,
        action: 'warning_shown',
        metadata: {
          activeDevices: activeSessions.length + 1,
          warningLevel: 1
        }
      }
    });

    return NextResponse.json({
      allowed: true,
      action: 'warning_shown',
      warning: {
        title: 'Multiple Devices Detected',
        message: `You're now signed in on ${activeSessions.length + 1} devices. You can use up to ${MAX_CONCURRENT_SESSIONS} devices simultaneously.`,
        level: 'info'
      }
    });
  }

  // First device - no warning needed
  return NextResponse.json({
    allowed: true,
    action: 'new_session_created'
  });
}
```

### 3. Session Revocation API

**File**: `frontend/app/api/auth/revoke-session/route.ts`

```typescript
export async function POST(request: NextRequest) {
  const { userId, sessionId } = await request.json();
  const currentSession = await getCurrentSession(request);

  // Verify user owns this session
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!session || session.userId !== userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  // Don't allow revoking current session this way
  if (session.id === currentSession?.id) {
    return NextResponse.json({
      error: 'Use logout to end your current session'
    }, { status: 400 });
  }

  // Revoke the session
  await prisma.session.delete({ where: { id: sessionId } });

  // Log the action
  await prisma.accountSharingLog.create({
    data: {
      userId,
      eventType: 'session_revoked',
      action: 'session_revoked',
      metadata: {
        revokedSessionId: sessionId,
        revokedDeviceName: session.deviceName
      }
    }
  });

  return NextResponse.json({
    success: true,
    message: `Signed out from ${session.deviceName}`
  });
}
```

### 4. Active Sessions Dashboard

**File**: `frontend/app/dashboard/sessions/page.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Monitor, Tablet, MapPin, Clock, LogOut } from 'lucide-react';

export default function ActiveSessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState('');

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const response = await fetch('/api/auth/sessions');
    const data = await response.json();
    setSessions(data.sessions);
    setCurrentSessionId(data.currentSessionId);
  };

  const handleRevoke = async (sessionId: string) => {
    if (!confirm('Sign out from this device?')) return;

    const response = await fetch('/api/auth/revoke-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId })
    });

    if (response.ok) {
      toast.success('Device signed out successfully');
      fetchSessions();
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return <Smartphone className="h-6 w-6" />;
      case 'tablet': return <Tablet className="h-6 w-6" />;
      default: return <Monitor className="h-6 w-6" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          You can be signed in on up to 2 devices at the same time.
          Sign out from a device if you want to use a different one.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`bg-white border rounded-lg p-4 ${
              session.id === currentSessionId ? 'border-green-500' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="text-gray-600 mt-1">
                  {getDeviceIcon(session.deviceType)}
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {session.deviceName}
                    {session.id === currentSessionId && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        Current Device
                      </span>
                    )}
                  </h3>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    {session.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{session.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Last active: {formatRelativeTime(session.lastActive)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {session.id !== currentSessionId && (
                <button
                  onClick={() => handleRevoke(session.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No active sessions found
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 User Experience Flow

### Scenario 1: Normal Usage (1 Device)
```
User signs in on Desktop
    ↓
✅ Session created
    ↓
User uses the app normally
    ↓
No warnings or restrictions
```

### Scenario 2: Two Devices (Within Limit)
```
User signs in on Desktop
    ↓
✅ Session 1 created
    ↓
User signs in on Tablet
    ↓
⚠️  Friendly info message shown:
    "You're now signed in on 2 devices. You can use up to 2 devices simultaneously."
    ↓
✅ Session 2 created
    ↓
Both devices work normally
```

### Scenario 3: Third Device Attempt
```
User tries to sign in on Phone
    ↓
🔴 Blocked with friendly message:
    "You're already signed in on 2 devices.
     Please sign out from one device first."
    ↓
Shows list of active sessions:
    1. Chrome on Windows (Desktop) - Last active: 2 min ago
    2. Safari on iPad (Tablet) - Last active: 5 min ago
    ↓
User clicks "Sign Out" on Desktop
    ↓
Desktop session revoked
    ↓
✅ Phone login now allowed
```

### Scenario 4: Suspicious Activity Detection
```
User signs in from:
  - New York (normal location)
    ↓
5 minutes later, sign in from:
  - London (impossible travel)
    ↓
🚨 System flags as suspicious
    ↓
Admin notified
    ↓
User receives email:
    "We noticed a sign-in from an unusual location"
    ↓
User can review sessions and revoke suspicious ones
```

---

## 👨‍💼 Admin User Control Features

### 1. User Session Monitoring

**File**: `frontend/app/admin/users/[id]/sessions/page.tsx`

**Features**:
- View all active sessions for any user
- See device types, locations, last activity
- Force revoke sessions (emergency)
- View account sharing logs
- See suspicious activity flags

```typescript
export default function UserSessionsPage({ params }) {
  return (
    <div>
      <h2>Active Sessions for {user.email}</h2>

      {/* Session List */}
      <div className="space-y-4">
        {sessions.map(session => (
          <div className="border p-4 rounded">
            <div className="flex justify-between">
              <div>
                <h3>{session.deviceName}</h3>
                <p>{session.location}</p>
                <p>Last active: {session.lastActivityAt}</p>
              </div>
              <button
                onClick={() => forceRevoke(session.id)}
                className="text-red-600"
              >
                Force Sign Out
              </button>
            </div>

            {session.isSuspicious && (
              <div className="mt-2 bg-yellow-50 p-2 rounded">
                ⚠️ Flagged as suspicious
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Account Sharing Logs */}
      <div className="mt-8">
        <h3>Account Sharing Activity</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Device</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sharingLogs.map(log => (
              <tr key={log.id}>
                <td>{log.createdAt}</td>
                <td>{log.eventType}</td>
                <td>{log.metadata?.deviceName}</td>
                <td>{log.ipAddress}</td>
                <td>{log.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Admin Actions */}
      <div className="mt-8 flex gap-4">
        <button onClick={() => revokeAllSessions()}>
          Revoke All Sessions
        </button>
        <button onClick={() => resetWarnings()}>
          Reset Warnings
        </button>
        <button onClick={() => whitelistDevice()}>
          Whitelist Device
        </button>
      </div>
    </div>
  );
}
```

### 2. Account Sharing Analytics

**File**: `frontend/app/admin/analytics/account-sharing/page.tsx`

**Metrics**:
- Users with multiple concurrent sessions
- Account sharing attempts blocked today/week/month
- Suspicious activity alerts
- Most frequently shared accounts
- Geographic distribution of logins

```typescript
export default function AccountSharingAnalytics() {
  const stats = {
    totalBlocked: 45,
    suspiciousActivity: 12,
    multipleDevices: 234,
    averageDevicesPerUser: 1.4
  };

  return (
    <div>
      <h1>Account Sharing Analytics</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Attempts Blocked"
          value={stats.totalBlocked}
          trend="+12% from last week"
        />
        <StatCard
          title="Suspicious Activity"
          value={stats.suspiciousActivity}
          trend="2 pending review"
        />
        <StatCard
          title="Multi-Device Users"
          value={stats.multipleDevices}
          trend="19% of active users"
        />
        <StatCard
          title="Avg Devices/User"
          value={stats.averageDevicesPerUser}
          trend="↓ 0.2 from last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <h3>Blocking Events Over Time</h3>
          <LineChart data={blockingEvents} />
        </div>
        <div>
          <h3>Device Types Distribution</h3>
          <PieChart data={deviceTypes} />
        </div>
      </div>

      {/* Flagged Accounts */}
      <div className="mt-8">
        <h3>Accounts Flagged for Review</h3>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Reason</th>
              <th>Severity</th>
              <th>Last Incident</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flaggedAccounts.map(account => (
              <tr>
                <td>{account.email}</td>
                <td>{account.reason}</td>
                <td>
                  <span className={`badge ${account.severity}`}>
                    {account.severity}
                  </span>
                </td>
                <td>{account.lastIncident}</td>
                <td>
                  <button>Review</button>
                  <button>Dismiss</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

## 🔧 Configuration & Settings

### Admin Settings Panel

**File**: `frontend/app/admin/settings/account-sharing/page.tsx`

```typescript
export default function AccountSharingSettings() {
  const [settings, setSettings] = useState({
    maxConcurrentSessions: 2,
    enableWarnings: true,
    enableSuspiciousActivityDetection: true,
    autoBlockSuspicious: false,
    sessionTimeout: 30, // days
    notifyAdminOnSuspicious: true
  });

  return (
    <div>
      <h1>Account Sharing Prevention Settings</h1>

      <form onSubmit={handleSave}>
        <div className="space-y-6">
          {/* Max Sessions */}
          <div>
            <label>Maximum Concurrent Sessions</label>
            <select value={settings.maxConcurrentSessions}>
              <option value="1">1 device only</option>
              <option value="2">2 devices (recommended)</option>
              <option value="3">3 devices</option>
              <option value="5">5 devices</option>
            </select>
            <p className="text-sm text-gray-500">
              Number of devices a user can be signed in on simultaneously
            </p>
          </div>

          {/* Warnings */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableWarnings}
                onChange={(e) => setSettings({...settings, enableWarnings: e.target.checked})}
              />
              Enable friendly warnings
            </label>
            <p className="text-sm text-gray-500">
              Show informational message when approaching device limit
            </p>
          </div>

          {/* Suspicious Activity */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableSuspiciousActivityDetection}
                onChange={(e) => setSettings({...settings, enableSuspiciousActivityDetection: e.target.checked})}
              />
              Detect suspicious activity
            </label>
            <p className="text-sm text-gray-500">
              Flag logins from impossible locations or unusual patterns
            </p>
          </div>

          {/* Auto-block */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.autoBlockSuspicious}
                onChange={(e) => setSettings({...settings, autoBlockSuspicious: e.target.checked})}
              />
              Automatically block suspicious logins
            </label>
            <p className="text-sm text-gray-500">
              Requires manual review if disabled (recommended)
            </p>
          </div>

          {/* Session Timeout */}
          <div>
            <label>Session Timeout (days)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
            />
            <p className="text-sm text-gray-500">
              Automatically sign out inactive sessions after this period
            </p>
          </div>

          {/* Admin Notifications */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifyAdminOnSuspicious}
                onChange={(e) => setSettings({...settings, notifyAdminOnSuspicious: e.target.checked})}
              />
              Notify admin of suspicious activity
            </label>
            <p className="text-sm text-gray-500">
              Send email alert when unusual patterns detected
            </p>
          </div>
        </div>

        <button type="submit" className="mt-6 btn-primary">
          Save Settings
        </button>
      </form>
    </div>
  );
}
```

---

## 📧 Email Notifications (Updated)

### Account Sharing Related Emails

1. **Multiple Devices Info Email**
```
Subject: You're signed in on multiple devices

Hi [Name],

We noticed you're now signed in on 2 devices:
• Chrome on Windows - New York, USA
• Safari on iPad - New York, USA

This is completely normal! You can use LessonCraftStudio on up to 2 devices simultaneously.

If you didn't sign in on one of these devices, please secure your account:
[View Active Sessions]

Thanks,
LessonCraftStudio Team
```

2. **Device Limit Reached**
```
Subject: Please sign out from one device

Hi [Name],

You tried to sign in on a new device, but you're already signed in on the maximum number of devices (2).

Active devices:
• Chrome on Windows - Last active: 2 minutes ago
• Safari on iPad - Last active: 5 minutes ago

To sign in on a new device, please sign out from one of your active devices:
[Manage Sessions]

Thanks,
LessonCraftStudio Team
```

3. **Suspicious Activity Alert**
```
Subject: Unusual sign-in activity detected

Hi [Name],

We detected a sign-in to your account from an unusual location:
• London, UK (Safari on iPhone)
• Your usual location: New York, USA

If this was you, you can safely ignore this email.

If this wasn't you, please secure your account immediately:
[Review Sessions & Sign Out Devices]
[Change Password]

Thanks,
LessonCraftStudio Team
```

---

## 🚀 Implementation Priority (Revised)

### Phase 1: Core Subscription (Unchanged - 10 hours)
- Stripe webhooks
- Checkout integration
- Basic subscription management

### Phase 2: Account Sharing Prevention (NEW - 6 hours)
- Device fingerprinting
- Session tracking
- Multi-device detection
- Session revocation API
- Active sessions dashboard

### Phase 3: User Control Dashboard (4 hours)
- Enhanced user profiles with session view
- Admin session management
- Account sharing analytics
- Settings panel

### Phase 4: Email & Monitoring (3 hours)
- Account sharing emails
- Suspicious activity alerts
- Admin notifications

**Total: 23 hours (3 days)**

---

## ✅ Testing Checklist

### Account Sharing Tests

- [ ] User signs in on 1 device → Success
- [ ] User signs in on 2nd device → Warning shown, allowed
- [ ] User signs in on 3rd device → Blocked, session list shown
- [ ] User revokes session → 3rd device can now sign in
- [ ] Simultaneous sign-ins from distant locations → Flagged as suspicious
- [ ] Session expires after 30 days of inactivity
- [ ] Admin can force revoke any session
- [ ] Admin receives notification for suspicious activity
- [ ] User receives email for multi-device usage
- [ ] Device fingerprinting works across browsers

---

## 📦 Required Dependencies

```json
{
  "dependencies": {
    "@fingerprintjs/fingerprintjs": "^4.2.0",
    "geoip-lite": "^1.4.7",
    "ua-parser-js": "^1.0.37"
  }
}
```

Install with:
```bash
npm install @fingerprintjs/fingerprintjs geoip-lite ua-parser-js
```

---

## 🎯 Success Metrics

After implementation, track:

1. **Account Sharing Prevention**
   - % of users with 2+ concurrent sessions
   - Blocked login attempts per week
   - False positive rate (legitimate users blocked)
   - User satisfaction with session management

2. **Security**
   - Suspicious activity flags per month
   - Impossible travel detections
   - Account takeover prevention rate

3. **User Experience**
   - Time to resolve "device limit" issues
   - Session management feature usage
   - Support tickets related to account access

---

## 🔄 Next Steps

1. **Review this revised plan** - Confirm approach is acceptable
2. **Choose implementation scope**:
   - Full implementation (23 hours)
   - Core subscription only (10 hours)
   - Subscription + Account sharing (16 hours)
3. **Set up dependencies** - Install required packages
4. **Begin coding** - Start with Phase 1 or Phase 2

---

**This professional approach balances security with user experience - preventing abuse while treating legitimate users with respect.** 🎓

Ready to implement?
