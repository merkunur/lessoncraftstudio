/**
 * Usage metering for the 2026-07 subscription launch v2 ("everything under the
 * subscription, the smart way" — operator ruling 2026-07-12, modeled on
 * education.com + IXL):
 *
 *   - kind 'download' (PDFs, answer keys, generator exports): 3 per UTC MONTH,
 *     FREE ACCOUNT REQUIRED — anonymous download attempts return
 *     reason 'signup_required' (the education.com model).
 *   - kind 'play' (interactive decks + activities): 10 per UTC DAY for both
 *     anonymous and free accounts (the IXL model).
 *   - Subscribers (isSubscriptionUsable — active/grace/paid-through) and
 *     crawler UAs bypass entirely (crawlers NEVER see the wall — the Google
 *     flexible-sampling requirement).
 *
 * Resurrected/adapted from the May daily-quota system (commit 7478cf72).
 * Kill switch: METERING_ENABLED env — anything but '1' makes every check
 * return allowed (deploy-dark + instant global revert). Fail-open on internal
 * errors (metering must never take the site down).
 */
import { NextRequest } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { prisma } from './prisma';
import { isSubscriptionUsable } from './entitlements';
import { getCurrentUser } from './auth';
import { verifyRefreshToken } from './auth-utils';

export const DOWNLOADS_PER_MONTH = 3;
export const PLAYS_PER_DAY = 10;

export type QuotaKind = 'download' | 'play';

const ANON_COOKIE_NAME = 'lcs_anon_id';
const ANON_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

// Aligned with the nginx crawler map (patch-nginx-bot-limits.py, 36 families).
const BOT_UA_PATTERN =
  /bot|crawler|spider|googlebot|google-inspectiontool|adsbot|googleother|storebot|bingbot|bingpreview|msnbot|duckduckbot|yandex|applebot|slurp|baiduspider|petalbot|seznambot|semrush|ahrefs|mj12bot|dotbot|dataforseo|gptbot|oai-searchbot|chatgpt|claudebot|claude-user|anthropic|perplexity|amazonbot|bytespider|ccbot|facebookexternalhit|meta-externalagent|twitterbot|linkedinbot|pinterest|whatsapp|telegrambot|slackbot|discordbot/i;

export function meteringEnabled(): boolean {
  return process.env.METERING_ENABLED === '1';
}

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
  reason?: 'signup_required' | 'quota_exceeded';
}

export function startOfUtcDay(d: Date = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function nextUtcMidnight(d: Date = new Date()): Date {
  return new Date(startOfUtcDay(d).getTime() + 24 * 60 * 60 * 1000);
}

export function startOfUtcMonth(d: Date = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export function nextUtcMonthStart(d: Date = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1));
}

function periodFor(kind: QuotaKind): { periodStart: Date; resetAt: Date; cap: number } {
  return kind === 'download'
    ? { periodStart: startOfUtcMonth(), resetAt: nextUtcMonthStart(), cap: DOWNLOADS_PER_MONTH }
    : { periodStart: startOfUtcDay(), resetAt: nextUtcMidnight(), cap: PLAYS_PER_DAY };
}

/**
 * Resolve the requester's metering identity. Side-effect-free; caller sets the
 * lcs_anon_id cookie when `kind === 'anon' && generated === true`.
 */
/** Subscriber-vs-free identity for a known userId (single subscription lookup). */
async function identityForUserId(userId: string): Promise<QuotaIdentity> {
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });
  if (dbUser && isSubscriptionUsable(dbUser)) {
    return { kind: 'subscriber', userId };
  }
  return { kind: 'free-user', userId };
}

export async function resolveQuotaIdentity(request: NextRequest): Promise<QuotaIdentity> {
  const ua = request.headers.get('user-agent') || '';
  if (BOT_UA_PATTERN.test(ua)) {
    return { kind: 'bot' };
  }

  // 1) Access token (Authorization: Bearer).
  const user = await getCurrentUser(request);
  if (user) {
    return identityForUserId(user.id);
  }

  // 2) Fallback: the httpOnly `refreshToken` cookie (sent by meterAction's
  //    credentials:'include'; same-origin sameSite:strict; 30-day lifetime).
  //    Access tokens are short-lived (~10 min), so an actively-playing
  //    subscriber's Bearer often expires between refreshes — without this the
  //    meter mis-classifies them as anon and walls them. The long-lived refresh
  //    cookie still identifies them. Read-only: token rotation only happens at
  //    POST /api/auth/refresh, never here.
  const refreshCookie = request.cookies.get('refreshToken')?.value;
  if (refreshCookie) {
    try {
      const payload = verifyRefreshToken(refreshCookie);
      if (payload?.userId) {
        const session = await prisma.session.findFirst({
          where: {
            userId: payload.userId,
            refreshToken: refreshCookie,
            expiresAt: { gt: new Date() },
          },
          select: { userId: true },
        });
        if (session) {
          return identityForUserId(session.userId);
        }
      }
    } catch {
      /* invalid/expired refresh cookie → fall through to anon */
    }
  }

  // 3) Anonymous.
  const existing = request.cookies.get(ANON_COOKIE_NAME)?.value;
  if (existing && existing.length >= 16) {
    return { kind: 'anon', anonymousId: existing, generated: false };
  }
  return { kind: 'anon', anonymousId: randomUUID(), generated: true };
}

export function extractRequestIp(request: NextRequest): string {
  const cfip = request.headers.get('cf-connecting-ip');
  if (cfip) return cfip;
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xri = request.headers.get('x-real-ip');
  if (xri) return xri;
  return 'unknown';
}

export function ipHashAnonymousId(request: NextRequest): string {
  const ip = extractRequestIp(request);
  const ua = request.headers.get('user-agent') || '';
  return createHash('sha256').update(`${ip}:${ua}`).digest('hex').substring(0, 32);
}

function unlimited(resetAt: Date): QuotaResult {
  return { allowed: true, used: 0, remaining: 'unlimited', resetAt };
}

/** Read-only check (for /api/quota/status). */
export async function checkQuota(identity: QuotaIdentity, kind: QuotaKind): Promise<QuotaResult> {
  const { periodStart, resetAt, cap } = periodFor(kind);

  if (!meteringEnabled()) return unlimited(resetAt);
  if (identity.kind === 'subscriber' || identity.kind === 'bot') return unlimited(resetAt);
  if (kind === 'download' && identity.kind === 'anon') {
    return { allowed: false, used: 0, remaining: 0, resetAt, reason: 'signup_required' };
  }

  const where =
    identity.kind === 'free-user'
      ? { userId_kind_periodStart: { userId: identity.userId, kind, periodStart } }
      : { anonymousId_kind_periodStart: { anonymousId: identity.anonymousId, kind, periodStart } };

  const row = await prisma.usageQuota.findUnique({ where: where as never });
  const used = row?.actionCount ?? 0;
  const allowed = used < cap;
  return {
    allowed,
    used,
    remaining: Math.max(0, cap - used),
    resetAt,
    reason: allowed ? undefined : 'quota_exceeded',
  };
}

/**
 * Atomic check-and-increment (pre-check bail, then upsert with increment —
 * the boundary race can minimally over-issue; accepted, per the May system).
 */
export async function checkAndIncrementQuota(
  identity: QuotaIdentity,
  kind: QuotaKind
): Promise<QuotaResult> {
  const { periodStart, resetAt, cap } = periodFor(kind);

  if (!meteringEnabled()) return unlimited(resetAt);
  if (identity.kind === 'subscriber' || identity.kind === 'bot') return unlimited(resetAt);
  if (kind === 'download' && identity.kind === 'anon') {
    return { allowed: false, used: 0, remaining: 0, resetAt, reason: 'signup_required' };
  }

  const pre = await checkQuota(identity, kind);
  if (!pre.allowed) return pre;

  const data =
    identity.kind === 'free-user'
      ? { userId: identity.userId }
      : { anonymousId: (identity as { anonymousId: string }).anonymousId };
  const where =
    identity.kind === 'free-user'
      ? { userId_kind_periodStart: { userId: identity.userId, kind, periodStart } }
      : {
          anonymousId_kind_periodStart: {
            anonymousId: (identity as { anonymousId: string }).anonymousId,
            kind,
            periodStart,
          },
        };

  const row = await prisma.usageQuota.upsert({
    where: where as never,
    create: { ...data, kind, periodStart, actionCount: 1 },
    update: { actionCount: { increment: 1 } },
  });
  const allowed = row.actionCount <= cap;
  return {
    allowed,
    used: row.actionCount,
    remaining: Math.max(0, cap - row.actionCount),
    resetAt,
    reason: allowed ? undefined : 'quota_exceeded',
  };
}

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
