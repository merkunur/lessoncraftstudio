interface RateLimitEntry {
  count: number;
  resetAt: number;
}

/**
 * Simple in-memory rate limiter.
 * Tracks requests per key (typically IP) with auto-cleanup.
 */
export class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  constructor(maxRequests = 10, windowMs = 60_000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Auto-cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60_000);
    // Allow GC if this is the only reference
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Check if a request is allowed for the given key.
   * Returns { allowed, remaining, resetIn }
   */
  check(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now >= entry.resetAt) {
      // New window
      this.store.set(key, { count: 1, resetAt: now + this.windowMs });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetIn: this.windowMs,
      };
    }

    entry.count++;

    if (entry.count > this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: entry.resetAt - now,
      };
    }

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetIn: entry.resetAt - now,
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.store) {
      if (now >= entry.resetAt) {
        this.store.delete(key);
      }
    }
  }
}

// Shared instances for common use cases
export const licenseLookupLimiter = new RateLimiter(10, 60_000); // 10/min
export const licenseCheckEmailLimiter = new RateLimiter(10, 60_000); // 10/min
