import { prisma } from './prisma';

/**
 * Audit logging utility for security and compliance
 *
 * Logs important security events and user actions for:
 * - GDPR compliance
 * - Security monitoring
 * - Incident investigation
 * - Compliance audits
 */

export interface AuditLogEntry {
  userId: string;
  action: string;
  details?: string;
  metadata?: Record<string, any>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

/**
 * Log an audit event
 */
export async function logAuditEvent({
  userId,
  action,
  details,
  metadata = {},
  ipAddress,
  userAgent,
}: AuditLogEntry): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        details: details || null,
        metadata: metadata as any,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });
  } catch (error) {
    // Don't throw error - audit logging should never break the main flow
    console.error('Failed to log audit event:', error);
  }
}

/**
 * Log authentication events
 */
export async function logAuthEvent(
  userId: string,
  action: 'LOGIN' | 'LOGOUT' | 'LOGIN_FAILED' | 'PASSWORD_RESET' | 'EMAIL_VERIFIED',
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    userId,
    action: `AUTH_${action}`,
    metadata,
  });
}

/**
 * Log payment events
 */
export async function logPaymentEvent(
  userId: string,
  action: 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' | 'REFUND' | 'SUBSCRIPTION_CREATED' | 'SUBSCRIPTION_CANCELED',
  metadata: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    userId,
    action: `PAYMENT_${action}`,
    metadata,
  });
}

/**
 * Log admin actions
 */
export async function logAdminAction(
  adminId: string,
  action: string,
  targetResource: string,
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    userId: adminId,
    action: `ADMIN_${action}`,
    details: targetResource,
    metadata: {
      ...metadata,
      isAdminAction: true,
    },
  });
}

/**
 * Log GDPR-related events
 */
export async function logGDPREvent(
  userId: string,
  action: 'DATA_EXPORT' | 'DATA_DELETION' | 'CONSENT_UPDATED',
  metadata?: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    userId,
    action: `GDPR_${action}`,
    details: 'GDPR compliance action',
    metadata,
  });
}

/**
 * Log subscription events
 */
export async function logSubscriptionEvent(
  userId: string,
  action: 'UPGRADE' | 'DOWNGRADE' | 'CANCEL' | 'REACTIVATE',
  metadata: Record<string, any>
): Promise<void> {
  await logAuditEvent({
    userId,
    action: `SUBSCRIPTION_${action}`,
    details: 'Subscription change',
    metadata,
  });
}

/**
 * Get audit logs for a user (admin only)
 */
export async function getUserAuditLogs(
  userId: string,
  options: {
    limit?: number;
    offset?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<any[]> {
  const { limit = 100, offset = 0, startDate, endDate } = options;

  return prisma.activityLog.findMany({
    where: {
      userId,
      ...(startDate && endDate
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });
}

/**
 * Get audit logs by action type (admin only)
 */
export async function getAuditLogsByAction(
  action: string,
  options: {
    limit?: number;
    offset?: number;
    startDate?: Date;
    endDate?: Date;
  } = {}
): Promise<any[]> {
  const { limit = 100, offset = 0, startDate, endDate } = options;

  return prisma.activityLog.findMany({
    where: {
      action,
      ...(startDate && endDate
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });
}

/**
 * Delete old audit logs (data retention policy)
 * Recommendation: Run as cron job
 */
export async function cleanupOldAuditLogs(retentionDays: number = 90): Promise<number> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

  const result = await prisma.activityLog.deleteMany({
    where: {
      createdAt: {
        lt: cutoffDate,
      },
      // Keep security-critical logs longer
      action: {
        notIn: [
          'AUTH_LOGIN_FAILED',
          'ADMIN_*',
          'GDPR_*',
          'PAYMENT_REFUND',
        ],
      },
    },
  });

  return result.count;
}
