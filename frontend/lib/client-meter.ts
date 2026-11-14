'use client';

/**
 * Client-side metering helper (2026-07-12 metered paywall). Shared by every
 * first-party surface that starts a metered action (deck play, activity play,
 * PDF/export download). The server is the source of truth — this only decides
 * whether to proceed / show the wall. Fail-OPEN: any network error proceeds
 * (metering must never block a paying-or-not user because the API hiccuped).
 *
 * Returns { proceed, detail }. When proceed is false, the caller shows the
 * quota modal with `detail` (reason 'quota_exceeded' | 'signup_required' | 'verify_required': an account whose e-mail
 * is not confirmed).
 */
export interface MeterOutcome {
  proceed: boolean;
  detail?: {
    reason?: 'quota_exceeded' | 'signup_required' | 'verify_required';
    /** what was asked for (the wall chooses its words by it) */
    kind?: 'download' | 'play' | 'make';
    used?: number;
    remaining?: number | 'unlimited';
    resetAt?: string;
  };
}

const CLASS_TOKEN_IN_HASH = /[#&]lcs=([a-z2-9]{20})(?:&|$)/;

export async function meterAction(kind: 'download' | 'play', surface?: 'activity' | 'tool' | 'sample'): Promise<MeterOutcome> {
  try {
    // This app authenticates via a JWT in localStorage sent as a Bearer header
    // (see contexts/auth-context.tsx) — there is NO cookie session. Without this
    // header the meter API can't identify the user, so every signed-in user
    // (including active subscribers) was resolved as anonymous and metered.
    let token: string | null = null;
    try {
      token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    } catch {
      /* localStorage unavailable (private mode / SSR) → proceed unauthenticated */
    }
    let classToken: string | null = null;
    try {
      const m = kind === 'play' && typeof window !== 'undefined' ? CLASS_TOKEN_IN_HASH.exec(window.location.hash || '') : null;
      classToken = m ? m[1] : null;
    } catch {
      /* no hash to read → an ordinary play */
    }
    const res = await fetch('/api/quota/check-and-increment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // a class visit names nobody: no sign-in header and no cookie travel with it (legal decision 2026-11-14, E6).
        // A child on a shared tablet must not be tied to whoever is signed in on that browser.
        ...(token && !classToken ? { Authorization: `Bearer ${token}` } : {}),
      },
      // a play opened through a class link carries its attempt token after '#'; the server does not meter a play of
      // a live class (thirty children on six shared tablets must not meet the per-device wall) and ignores any
      // other token (app/api/quota/check-and-increment)
      // surface: what is played. Every play needs an account but the homepage sample (lib/quota.ts playNeedsAccount)
      body: JSON.stringify({ kind, ...(surface ? { surface } : {}), ...(classToken ? { classToken } : {}) }),
      credentials: classToken ? 'omit' : 'include',
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

/**
 * Ask, without counting anything, whether this visitor may play: used by a card that sends her on to a deck page,
 * which counts the play itself (lcs-meter.js). Until 2026-11-12 the card counted too, so one worksheet opened from
 * a topic page cost two of the day's ten plays. Fail-open like meterAction.
 */
export async function peekPlay(): Promise<MeterOutcome> {
  try {
    let token: string | null = null;
    try { token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null; } catch { /* no storage */ }
    const res = await fetch('/api/quota/status', { headers: token ? { Authorization: `Bearer ${token}` } : {}, credentials: 'include', cache: 'no-store' });
    if (!res.ok) return { proceed: true };
    const j = await res.json().catch(() => ({}));
    if (j?.needs === 'signup') return { proceed: false, detail: { reason: 'signup_required', kind: 'play' } };
    if (j?.needs === 'verify') return { proceed: false, detail: { reason: 'verify_required', kind: 'play' } };
    if (j?.play && j.play.allowed === false) return { proceed: false, detail: { reason: 'quota_exceeded', kind: 'play' } };
    return { proceed: true };
  } catch {
    return { proceed: true };
  }
}
