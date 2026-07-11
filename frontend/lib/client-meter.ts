'use client';

/**
 * Client-side metering helper (2026-07-12 metered paywall). Shared by every
 * first-party surface that starts a metered action (deck play, activity play,
 * PDF/export download). The server is the source of truth — this only decides
 * whether to proceed / show the wall. Fail-OPEN: any network error proceeds
 * (metering must never block a paying-or-not user because the API hiccuped).
 *
 * Returns { proceed, detail }. When proceed is false, the caller shows the
 * quota modal with `detail` (reason 'quota_exceeded' | 'signup_required').
 */
export interface MeterOutcome {
  proceed: boolean;
  detail?: {
    reason?: 'quota_exceeded' | 'signup_required';
    used?: number;
    remaining?: number | 'unlimited';
    resetAt?: string;
  };
}

export async function meterAction(kind: 'download' | 'play'): Promise<MeterOutcome> {
  try {
    const res = await fetch('/api/quota/check-and-increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind }),
      credentials: 'include',
      cache: 'no-store',
    });
    if (res.ok) return { proceed: true };
    if (res.status === 401 || res.status === 402) {
      const detail = await res.json().catch(() => ({}));
      try {
        (window as unknown as { umami?: { track: (e: string, d?: object) => void } }).umami?.track(
          'meter-wall-shown',
          { kind, reason: detail?.reason }
        );
      } catch {
        /* no-op */
      }
      return { proceed: false, detail };
    }
    return { proceed: true }; // unexpected status → fail open
  } catch {
    return { proceed: true }; // network error → fail open
  }
}
