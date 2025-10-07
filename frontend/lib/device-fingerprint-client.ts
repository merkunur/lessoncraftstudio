import FingerprintJS from '@fingerprintjs/fingerprintjs';

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
