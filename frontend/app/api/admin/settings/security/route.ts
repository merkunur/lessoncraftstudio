import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAdmin } from '@/lib/server-auth';

// GET /api/admin/settings/security - Get security settings
export const GET = withAdmin(async (request: NextRequest) => {
  try {
    let settings = await prisma.securitySetting.findUnique({
      where: { id: 'security' },
    });

    // Create default settings if they don't exist
    if (!settings) {
      settings = await prisma.securitySetting.create({
        data: { id: 'security' },
      });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching security settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch security settings' },
      { status: 500 }
    );
  }
});

// PATCH /api/admin/settings/security - Update security settings
export const PATCH = withAdmin(async (request: NextRequest, context: any) => {
  try {
    const body = await request.json();
    const { user } = context;

    // Validate input - ensure boolean values are actually booleans
    const validatedData: any = {};

    // Password Policy
    if ('passwordMinLength' in body) {
      const val = parseInt(body.passwordMinLength);
      if (isNaN(val) || val < 4 || val > 128) {
        return NextResponse.json(
          { error: 'Password min length must be between 4 and 128' },
          { status: 400 }
        );
      }
      validatedData.passwordMinLength = val;
    }

    if ('passwordRequireUppercase' in body) validatedData.passwordRequireUppercase = Boolean(body.passwordRequireUppercase);
    if ('passwordRequireLowercase' in body) validatedData.passwordRequireLowercase = Boolean(body.passwordRequireLowercase);
    if ('passwordRequireNumbers' in body) validatedData.passwordRequireNumbers = Boolean(body.passwordRequireNumbers);
    if ('passwordRequireSpecial' in body) validatedData.passwordRequireSpecial = Boolean(body.passwordRequireSpecial);

    // Session Management
    if ('maxSessionsPerUser' in body) {
      const val = parseInt(body.maxSessionsPerUser);
      if (isNaN(val) || val < 1 || val > 100) {
        return NextResponse.json(
          { error: 'Max sessions per user must be between 1 and 100' },
          { status: 400 }
        );
      }
      validatedData.maxSessionsPerUser = val;
    }

    if ('sessionTimeoutMinutes' in body) {
      const val = parseInt(body.sessionTimeoutMinutes);
      if (isNaN(val) || val < 5 || val > 10080) {
        return NextResponse.json(
          { error: 'Session timeout must be between 5 and 10080 minutes (7 days)' },
          { status: 400 }
        );
      }
      validatedData.sessionTimeoutMinutes = val;
    }

    if ('sessionIdleMinutes' in body) {
      const val = parseInt(body.sessionIdleMinutes);
      if (isNaN(val) || val < 5 || val > 1440) {
        return NextResponse.json(
          { error: 'Session idle timeout must be between 5 and 1440 minutes (24 hours)' },
          { status: 400 }
        );
      }
      validatedData.sessionIdleMinutes = val;
    }

    // Login Security
    if ('maxLoginAttempts' in body) {
      const val = parseInt(body.maxLoginAttempts);
      if (isNaN(val) || val < 3 || val < 20) {
        validatedData.maxLoginAttempts = Math.max(3, Math.min(20, val));
      } else {
        validatedData.maxLoginAttempts = val;
      }
    }

    if ('lockoutDurationMinutes' in body) {
      const val = parseInt(body.lockoutDurationMinutes);
      if (isNaN(val) || val < 1 || val > 1440) {
        return NextResponse.json(
          { error: 'Lockout duration must be between 1 and 1440 minutes (24 hours)' },
          { status: 400 }
        );
      }
      validatedData.lockoutDurationMinutes = val;
    }

    if ('require2FA' in body) validatedData.require2FA = Boolean(body.require2FA);
    if ('require2FAForAdmins' in body) validatedData.require2FAForAdmins = Boolean(body.require2FAForAdmins);
    if ('enableEmailVerification' in body) validatedData.enableEmailVerification = Boolean(body.enableEmailVerification);

    // Account Sharing Detection
    if ('enableAccountSharingDetection' in body) validatedData.enableAccountSharingDetection = Boolean(body.enableAccountSharingDetection);

    if ('maxConcurrentDevices' in body) {
      const val = parseInt(body.maxConcurrentDevices);
      if (isNaN(val) || val < 1 || val > 20) {
        return NextResponse.json(
          { error: 'Max concurrent devices must be between 1 and 20' },
          { status: 400 }
        );
      }
      validatedData.maxConcurrentDevices = val;
    }

    if ('suspiciousActivityThreshold' in body) {
      const val = parseInt(body.suspiciousActivityThreshold);
      if (isNaN(val) || val < 1 || val > 50) {
        return NextResponse.json(
          { error: 'Suspicious activity threshold must be between 1 and 50' },
          { status: 400 }
        );
      }
      validatedData.suspiciousActivityThreshold = val;
    }

    // IP Security
    if ('enableIpWhitelist' in body) validatedData.enableIpWhitelist = Boolean(body.enableIpWhitelist);
    if ('ipWhitelist' in body) {
      if (!Array.isArray(body.ipWhitelist)) {
        return NextResponse.json(
          { error: 'IP whitelist must be an array' },
          { status: 400 }
        );
      }
      validatedData.ipWhitelist = body.ipWhitelist;
    }

    if ('enableIpBlacklist' in body) validatedData.enableIpBlacklist = Boolean(body.enableIpBlacklist);
    if ('ipBlacklist' in body) {
      if (!Array.isArray(body.ipBlacklist)) {
        return NextResponse.json(
          { error: 'IP blacklist must be an array' },
          { status: 400 }
        );
      }
      validatedData.ipBlacklist = body.ipBlacklist;
    }

    // Security Features
    if ('enableCsrfProtection' in body) validatedData.enableCsrfProtection = Boolean(body.enableCsrfProtection);
    if ('enableRateLimiting' in body) validatedData.enableRateLimiting = Boolean(body.enableRateLimiting);

    if ('rateLimitRequestsPerMin' in body) {
      const val = parseInt(body.rateLimitRequestsPerMin);
      if (isNaN(val) || val < 10 || val > 10000) {
        return NextResponse.json(
          { error: 'Rate limit must be between 10 and 10000 requests per minute' },
          { status: 400 }
        );
      }
      validatedData.rateLimitRequestsPerMin = val;
    }

    // Audit Logging
    if ('logAllAuthEvents' in body) validatedData.logAllAuthEvents = Boolean(body.logAllAuthEvents);
    if ('logFailedLogins' in body) validatedData.logFailedLogins = Boolean(body.logFailedLogins);
    if ('logPasswordChanges' in body) validatedData.logPasswordChanges = Boolean(body.logPasswordChanges);
    if ('logRoleChanges' in body) validatedData.logRoleChanges = Boolean(body.logRoleChanges);

    if ('retainAuditLogDays' in body) {
      const val = parseInt(body.retainAuditLogDays);
      if (isNaN(val) || val < 7 || val > 365) {
        return NextResponse.json(
          { error: 'Audit log retention must be between 7 and 365 days' },
          { status: 400 }
        );
      }
      validatedData.retainAuditLogDays = val;
    }

    validatedData.updatedBy = user?.id || 'system';

    // Update settings
    const settings = await prisma.securitySetting.upsert({
      where: { id: 'security' },
      update: validatedData,
      create: {
        id: 'security',
        ...validatedData,
      },
    });

    // Log the security settings change
    await prisma.activityLog.create({
      data: {
        userId: user?.id || 'system',
        action: 'security_settings_updated',
        details: 'Security settings were updated',
        metadata: {
          changedFields: Object.keys(validatedData),
        },
      },
    });

    return NextResponse.json({
      message: 'Security settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error('Error updating security settings:', error);
    return NextResponse.json(
      { error: 'Failed to update security settings' },
      { status: 500 }
    );
  }
});
