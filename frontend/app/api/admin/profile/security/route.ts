import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import crypto from 'crypto';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator' | 'sms' | 'email';
  backupCodes: string[];
  sessions: Session[];
  passwordLastChanged: string;
  loginHistory: LoginAttempt[];
  securityQuestions: SecurityQuestion[];
  trustedDevices: TrustedDevice[];
}

interface Session {
  id: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  location: string;
  lastActive: string;
  createdAt: string;
  isCurrent: boolean;
}

interface LoginAttempt {
  id: string;
  timestamp: string;
  ip: string;
  location: string;
  device: string;
  success: boolean;
  reason?: string;
}

interface SecurityQuestion {
  id: string;
  question: string;
  answerHash: string;
}

interface TrustedDevice {
  id: string;
  name: string;
  deviceId: string;
  lastUsed: string;
  addedAt: string;
}

// Mock security data
const securitySettings = new Map<string, SecuritySettings>([
  ['user_1', {
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator',
    backupCodes: [
      'ABCD-1234-EFGH',
      'IJKL-5678-MNOP',
      'QRST-9012-UVWX',
      'YZAB-3456-CDEF',
      'GHIJ-7890-KLMN'
    ],
    sessions: [
      {
        id: 'sess_1',
        device: 'Desktop',
        browser: 'Chrome 119',
        os: 'Windows 11',
        ip: '192.168.1.100',
        location: 'San Francisco, CA',
        lastActive: new Date().toISOString(),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isCurrent: true
      },
      {
        id: 'sess_2',
        device: 'iPhone 14 Pro',
        browser: 'Safari 17',
        os: 'iOS 17.1',
        ip: '192.168.1.101',
        location: 'San Francisco, CA',
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isCurrent: false
      }
    ],
    passwordLastChanged: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    loginHistory: [
      {
        id: 'login_1',
        timestamp: new Date().toISOString(),
        ip: '192.168.1.100',
        location: 'San Francisco, CA',
        device: 'Chrome on Windows',
        success: true
      },
      {
        id: 'login_2',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ip: '192.168.1.100',
        location: 'San Francisco, CA',
        device: 'Safari on iPhone',
        success: true
      },
      {
        id: 'login_3',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        ip: '203.0.113.45',
        location: 'Unknown',
        device: 'Unknown',
        success: false,
        reason: 'Invalid password'
      }
    ],
    securityQuestions: [
      {
        id: 'sq_1',
        question: 'What was the name of your first pet?',
        answerHash: 'hashed_answer_1'
      },
      {
        id: 'sq_2',
        question: 'In what city were you born?',
        answerHash: 'hashed_answer_2'
      }
    ],
    trustedDevices: [
      {
        id: 'device_1',
        name: 'John\'s MacBook Pro',
        deviceId: 'device_fingerprint_1',
        lastUsed: new Date().toISOString(),
        addedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }]
]);

// GET /api/admin/profile/security
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id || 'user_1';
    const settings = securitySettings.get(userId);

    if (!settings) {
      // Initialize default settings
      const defaultSettings: SecuritySettings = {
        twoFactorEnabled: false,
        twoFactorMethod: 'authenticator',
        backupCodes: [],
        sessions: [],
        passwordLastChanged: new Date().toISOString(),
        loginHistory: [],
        securityQuestions: [],
        trustedDevices: []
      };
      securitySettings.set(userId, defaultSettings);
      return NextResponse.json(defaultSettings);
    }

    // Don't send backup codes in regular GET
    const { backupCodes, ...publicSettings } = settings;

    return NextResponse.json(publicSettings);
  } catch (error) {
    console.error('Error fetching security settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch security settings' },
      { status: 500 }
    );
  }
}

// POST /api/admin/profile/security/2fa/enable
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { method, verificationCode } = await request.json();

    if (!method || !['authenticator', 'sms', 'email'].includes(method)) {
      return NextResponse.json(
        { error: 'Invalid 2FA method' },
        { status: 400 }
      );
    }

    // Verify the code (mock verification)
    if (verificationCode !== '123456') {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const settings = securitySettings.get(userId) || {
      twoFactorEnabled: false,
      twoFactorMethod: 'authenticator',
      backupCodes: [],
      sessions: [],
      passwordLastChanged: new Date().toISOString(),
      loginHistory: [],
      securityQuestions: [],
      trustedDevices: []
    };

    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () =>
      `${generateCode()}-${generateCode()}-${generateCode()}`
    );

    settings.twoFactorEnabled = true;
    settings.twoFactorMethod = method as 'authenticator' | 'sms' | 'email';
    settings.backupCodes = backupCodes;

    securitySettings.set(userId, settings);

    return NextResponse.json({
      success: true,
      backupCodes,
      message: 'Two-factor authentication enabled successfully'
    });
  } catch (error) {
    console.error('Error enabling 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to enable 2FA' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/profile/security/2fa/disable
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    if (action === '2fa') {
      const userId = session.user.id || 'user_1';
      const settings = securitySettings.get(userId);

      if (!settings) {
        return NextResponse.json(
          { error: 'Settings not found' },
          { status: 404 }
        );
      }

      settings.twoFactorEnabled = false;
      settings.backupCodes = [];
      securitySettings.set(userId, settings);

      return NextResponse.json({
        success: true,
        message: 'Two-factor authentication disabled'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error disabling 2FA:', error);
    return NextResponse.json(
      { error: 'Failed to disable 2FA' },
      { status: 500 }
    );
  }
}

// POST /api/admin/profile/security/sessions/revoke
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId, revokeAll } = await request.json();
    const userId = session.user.id || 'user_1';
    const settings = securitySettings.get(userId);

    if (!settings) {
      return NextResponse.json(
        { error: 'Settings not found' },
        { status: 404 }
      );
    }

    if (revokeAll) {
      // Keep only current session
      settings.sessions = settings.sessions.filter(s => s.isCurrent);
      return NextResponse.json({
        success: true,
        message: 'All sessions revoked except current'
      });
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Revoke specific session
    settings.sessions = settings.sessions.filter(s => s.id !== sessionId);
    securitySettings.set(userId, settings);

    return NextResponse.json({
      success: true,
      message: 'Session revoked successfully'
    });
  } catch (error) {
    console.error('Error revoking session:', error);
    return NextResponse.json(
      { error: 'Failed to revoke session' },
      { status: 500 }
    );
  }
}

// POST /api/admin/profile/security/password
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current and new passwords required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { error: 'Password must contain uppercase, lowercase, number and special character' },
        { status: 400 }
      );
    }

    // Mock password verification
    if (currentPassword !== 'currentPassword123!') {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    const userId = session.user.id || 'user_1';
    const settings = securitySettings.get(userId);

    if (settings) {
      settings.passwordLastChanged = new Date().toISOString();
      securitySettings.set(userId, settings);
    }

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}

// Helper functions
function generateCode(): string {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function hashAnswer(answer: string): string {
  return crypto
    .createHash('sha256')
    .update(answer.toLowerCase().trim())
    .digest('hex');
}