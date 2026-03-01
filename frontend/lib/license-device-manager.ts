import { prisma } from '@/lib/prisma';

const MAX_DEVICES_PER_EMAIL = 5;
const DEVICE_WINDOW_DAYS = 30;

interface DeviceCheckResult {
  allowed: boolean;
  currentCount: number;
  maxAllowed: number;
  message?: string;
}

/**
 * Check if a device (IP) can access the license, and register it if allowed.
 * Max 5 unique IPs per email in a 30-day sliding window.
 * Stale devices (not seen in 30 days) are auto-freed.
 */
export async function checkAndRegisterDevice(
  email: string,
  ipAddress: string,
  userAgent?: string
): Promise<DeviceCheckResult> {
  const normalizedEmail = email.toLowerCase();
  const cutoff = new Date(Date.now() - DEVICE_WINDOW_DAYS * 24 * 60 * 60 * 1000);

  return await prisma.$transaction(async (tx) => {
    // Clean up stale devices (not seen in 30 days)
    await tx.licenseDevice.deleteMany({
      where: {
        email: normalizedEmail,
        lastSeenAt: { lt: cutoff },
      },
    });

    // Check if this IP is already registered for this email
    const existingDevice = await tx.licenseDevice.findUnique({
      where: {
        email_ipAddress: {
          email: normalizedEmail,
          ipAddress,
        },
      },
    });

    if (existingDevice) {
      // Known device - update last seen
      await tx.licenseDevice.update({
        where: { id: existingDevice.id },
        data: {
          lastSeenAt: new Date(),
          ...(userAgent && { userAgent }),
        },
      });

      const count = await tx.licenseDevice.count({
        where: { email: normalizedEmail },
      });

      return {
        allowed: true,
        currentCount: count,
        maxAllowed: MAX_DEVICES_PER_EMAIL,
      };
    }

    // New device - check if under limit
    const activeDeviceCount = await tx.licenseDevice.count({
      where: { email: normalizedEmail },
    });

    if (activeDeviceCount >= MAX_DEVICES_PER_EMAIL) {
      return {
        allowed: false,
        currentCount: activeDeviceCount,
        maxAllowed: MAX_DEVICES_PER_EMAIL,
        message: `License is being used on too many devices (${activeDeviceCount}/${MAX_DEVICES_PER_EMAIL}). Please contact support if you need to reset your devices.`,
      };
    }

    // Register new device
    await tx.licenseDevice.create({
      data: {
        email: normalizedEmail,
        ipAddress,
        userAgent: userAgent || null,
      },
    });

    return {
      allowed: true,
      currentCount: activeDeviceCount + 1,
      maxAllowed: MAX_DEVICES_PER_EMAIL,
    };
  });
}

/**
 * Get all registered devices for an email (admin use)
 */
export async function getDevicesForEmail(email: string) {
  return prisma.licenseDevice.findMany({
    where: { email: email.toLowerCase() },
    orderBy: { lastSeenAt: 'desc' },
  });
}

/**
 * Reset all devices for an email (admin use)
 */
export async function resetDevicesForEmail(email: string) {
  const result = await prisma.licenseDevice.deleteMany({
    where: { email: email.toLowerCase() },
  });
  return result.count;
}
