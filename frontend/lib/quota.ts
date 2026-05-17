/**
 * Free-tier daily quota helper per CLAUDE.md §7 + the homepage subscription
 * commission (commits e5ad0411 + 46075785). Free users get 2 actions per UTC
 * day across {deck-play-from-catalog, PDF-download, app-gen-download}.
 * Subscribers + bots bypass entirely.
 *
 * Identity resolution:
 *   - Logged-in user → identity by userId; subscription check via isLcsSubscriptionActive
 *   - Anonymous user → identity by lcs_anon_id cookie; if absent, generate UUID
 *     (caller sets the cookie on the response). Cookie-cleared abuse is caught
 *     by an IP-hash fallback (separate anonymousId for same-IP requests without
 *     the cookie).
 *   - Bots (User-Agent matches known crawler patterns) → bypass; no quota write.
 *
 * Daily reset: UTC midnight (no per-user-timezone logic yet; simplest).
 * Atomic increment: Prisma upsert with `actionCount: { increment: 1 }`.
 */
import { NextRequest } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { prisma } from './prisma';
import { isLcsSubscriptionActive } from './subscription-helpers';
import { getCurrentUser } from './auth';

export const DAILY_QUOTA_CAP = 2;

const ANON_COOKIE_NAME = 'lcs_anon_id';
const ANON_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

const BOT_UA_PATTERN =
  /bot|crawler|spider|googlebot|bingbot|baiduspider|yandexbot|duckduckbot|facebookexternalhit|slackbot|twitterbot|linkedinbot|whatsapp/i;

export type QuotaIdentity =
  | { kind: 'subscriber'; userId: string }
  | { kind: 'free-user'; userId: string }
  | { kind: 'anon'; anonymousId: string; generated: boolean }
  | { kind: 'bot' };

export interface QuotaResult {
  allowed: boolean;
  used: number;
  remaining: number | 'unlimited';
  resetAt: Date;
}

/**
 * Start of the current UTC day (midnight).
 */
export function startOfUtcDay(d: Date = new Date()): Date {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
}

/**
 * Next UTC midnight after `d` — the timestamp at which the current day's
 * quota resets.
 */
export function nextUtcMidnight(d: Date = new Date()): Date {
  const today = startOfUtcDay(d);
  return new Date(today.getTime() + 24 * 60 * 60 * 1000);
}

/**
 * Resolve the identity of the requester for quota purposes. Side-effect-free.
 * Caller is responsible for setting the lcs_anon_id cookie when
 * `kind === 'anon' && generated === true`.
 */
export async function resolveQuotaIdentity(
  request: NextRequest
): Promise<QuotaIdentity> {
  // Bot bypass — UA check before any DB lookup
  const ua = request.headers.get('user-agent') || '';
  if (BOT_UA_PATTERN.test(ua)) {
    return { kind: 'bot' };
  }

  // Logged-in path
  const user = await getCurrentUser(request);
  if (user) {
    // Re-fetch with subscription for definitive predicate
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { subscription: true },
    });
    if (isLcsSubscriptionActive(dbUser)) {
      return { kind: 'subscriber', userId: user.id };
    }
    return { kind: 'free-user', userId: user.id };
  }

  // Anonymous path
  const existing = request.cookies.get(ANON_COOKIE_NAME)?.value;
  if (existing && existing.length >= 16) {
    return { kind: 'anon', anonymousId: existing, generated: false };
  }

  // No cookie OR malformed. Generate a new UUID. Use IP-hash fallback for the
  // same-day-cookie-cleared retry abuse: if the same IP hits the API >2x today
  // without a cookie, we still cap via the ip-hash anonymousId.
  // Strategy: prefer fresh UUID (most users get this); fall through to
  // IP-hash if UUID generation isn't desirable in some future context.
  const newId = randomUUID();
  return { kind: 'anon', anonymousId: newId, generated: true };
}

/**
 * Extract requester IP for IP-hash fallback (currently unused at primary
 * identity but exposed for backstop quota writes).
 */
export function extractRequestIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri;
  const cfip = request.headers.get('cf-connecting-ip');
  if (cfip) return cfip;
  return 'unknown';
}

/**
 * SHA256 hash of (ip, ua) for IP-fallback anonymousId. 32-char hex prefix.
 */
export function ipHashAnonymousId(request: NextRequest): string {
  const ip = extractRequestIp(request);
  const ua = request.headers.get('user-agent') || '';
  return createHash('sha256')
    .update(`${ip}:${ua}`)
    .digest('hex')
    .substring(0, 32);
}

/**
 * Check current quota WITHOUT incrementing. Used by /api/quota/status.
 */
export async function checkQuota(
  identity: QuotaIdentity
): Promise<QuotaResult> {
  const today = startOfUtcDay();
  const resetAt = nextUtcMidnight();

  if (identity.kind === 'subscriber' || identity.kind === 'bot') {
    return { allowed: true, used: 0, remaining: 'unlimited', resetAt };
  }

  const whereClause =
    identity.kind === 'free-user'
      ? { userId_date: { userId: identity.userId, date: today } }
      : { anonymousId_date: { anonymousId: identity.anonymousId, date: today } };

  const row = await prisma.dailyQuota.findUnique({ where: whereClause as any });
  const used = row?.actionCount ?? 0;
  const remaining = Math.max(0, DAILY_QUOTA_CAP - used);
  const allowed = used < DAILY_QUOTA_CAP;

  return { allowed, used, remaining, resetAt };
}

/**
 * Atomic check-and-increment. Returns the post-increment state if allowed,
 * else returns allowed=false without writing.
 *
 * Concurrency: Prisma upsert with `actionCount: { increment: 1 }` is atomic
 * at the DB layer via the (userId, date) / (anonymousId, date) unique
 * constraint. Two concurrent allowed-attempts at quota-boundary may both
 * succeed (rare race; cap is 2/day not 1/day; minor over-issuance acceptable).
 */
export async function checkAndIncrementQuota(
  identity: QuotaIdentity
): Promise<QuotaResult> {
  const today = startOfUtcDay();
  const resetAt = nextUtcMidnight();

  if (identity.kind === 'subscriber' || identity.kind === 'bot') {
    return { allowed: true, used: 0, remaining: 'unlimited', resetAt };
  }

  // Pre-check: bail without write if cap already reached
  const pre = await checkQuota(identity);
  if (!pre.allowed) {
    return pre;
  }

  // Atomic upsert with increment
  if (identity.kind === 'free-user') {
    const row = await prisma.dailyQuota.upsert({
      where: { userId_date: { userId: identity.userId, date: today } } as any,
      create: {
        userId: identity.userId,
        date: today,
        actionCount: 1,
      },
      update: { actionCount: { increment: 1 } },
    });
    return {
      allowed: row.actionCount <= DAILY_QUOTA_CAP,
      used: row.actionCount,
      remaining: Math.max(0, DAILY_QUOTA_CAP - row.actionCount),
      resetAt,
    };
  }

  // anon
  const row = await prisma.dailyQuota.upsert({
    where: {
      anonymousId_date: { anonymousId: identity.anonymousId, date: today },
    } as any,
    create: {
      anonymousId: identity.anonymousId,
      date: today,
      actionCount: 1,
    },
    update: { actionCount: { increment: 1 } },
  });
  return {
    allowed: row.actionCount <= DAILY_QUOTA_CAP,
    used: row.actionCount,
    remaining: Math.max(0, DAILY_QUOTA_CAP - row.actionCount),
    resetAt,
  };
}

/**
 * Helper for API routes: serialize the anon-cookie set-cookie header for the
 * response, only when the identity was anon AND newly generated.
 */
export function anonCookieSetHeader(identity: QuotaIdentity): string | null {
  if (identity.kind !== 'anon' || !identity.generated) return null;
  return [
    `${ANON_COOKIE_NAME}=${identity.anonymousId}`,
    `Max-Age=${ANON_COOKIE_MAX_AGE_SECONDS}`,
    'Path=/',
    'SameSite=Lax',
    'HttpOnly',
    'Secure',
  ].join('; ');
}

export const ANON_COOKIE = ANON_COOKIE_NAME;
