import UAParser from 'ua-parser-js';
import geoip from 'geoip-lite';
import type { DeviceInfo } from './device-fingerprint-client';

/**
 * Parse device information from user agent and IP
 * SERVER-SIDE ONLY - Uses geoip-lite which requires Node.js fs module
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
 * SERVER-SIDE ONLY
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
 * SERVER-SIDE ONLY
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
