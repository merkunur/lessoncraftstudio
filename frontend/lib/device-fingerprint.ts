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
 * This creates a unique ID for the browser/device combination
 */
export async function getDeviceFingerprint(): Promise<string> {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error('Failed to generate device fingerprint:', error);
    // Fallback to a random ID if fingerprinting fails
    return `fallback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Parse device information from user agent and IP
 * Used on the server side to extract device details
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
    try {
      const geo = geoip.lookup(ipAddress);
      if (geo) {
        country = geo.country;
        city = geo.city;
      }
    } catch (error) {
      console.error('Geolocation lookup failed:', error);
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
 * Handles various proxy and CDN headers
 */
export function getClientIP(request: Request): string | undefined {
  // Check forwarded headers (common with proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list, take the first one
    return forwarded.split(',')[0].trim();
  }

  // Check other common headers
  return (
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') || // Cloudflare
    request.headers.get('x-client-ip') ||
    undefined
  );
}

/**
 * Detect suspicious activity patterns
 * Returns flags for different types of suspicious behavior
 */
export function detectSuspiciousActivity(
  sessions: Array<{ ipAddress?: string; country?: string; createdAt: Date }>
): {
  impossibleTravel: boolean;
  rapidLogins: boolean;
} {
  let impossibleTravel = false;
  let rapidLogins = false;

  if (sessions.length === 0) {
    return { impossibleTravel, rapidLogins };
  }

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
      // (Physically impossible to travel between countries that fast)
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

/**
 * Calculate time since last activity in human-readable format
 */
export function formatLastActivity(lastActivityAt: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - lastActivityAt.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}

/**
 * Validate device ID format
 * FingerprintJS IDs are typically 20 alphanumeric characters
 */
export function isValidDeviceId(deviceId: string): boolean {
  if (!deviceId || deviceId.length < 10) return false;
  // Allow alphanumeric and underscores (for fallback IDs)
  return /^[a-zA-Z0-9_]+$/.test(deviceId);
}

/**
 * Get device icon based on device type
 * Returns emoji or icon identifier for UI display
 */
export function getDeviceIcon(deviceType: 'desktop' | 'mobile' | 'tablet'): string {
  switch (deviceType) {
    case 'mobile':
      return '📱';
    case 'tablet':
      return '📱'; // iPad emoji
    case 'desktop':
    default:
      return '💻';
  }
}

/**
 * Privacy-safe IP address masking
 * Masks the last octet for IPv4 or last segments for IPv6
 */
export function maskIPAddress(ip: string): string {
  if (!ip) return 'Unknown';

  // IPv4
  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length === 4) {
      parts[3] = 'xxx';
      return parts.join('.');
    }
  }

  // IPv6
  if (ip.includes(':')) {
    const parts = ip.split(':');
    if (parts.length > 2) {
      // Mask last 2 segments
      parts[parts.length - 1] = 'xxxx';
      parts[parts.length - 2] = 'xxxx';
      return parts.join(':');
    }
  }

  return ip;
}
