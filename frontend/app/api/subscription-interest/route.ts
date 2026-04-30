import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { subscriptionInterestLimiter } from '@/lib/rate-limiter';
import { isValidLocale, DEFAULT_LOCALE } from '@/config/locales';

// POST /api/subscription-interest
// Captures email for the pre-launch Notify-me form per HOMEPAGE-IMPLEMENTATION-PROMPT.md §9
// launch readiness item 1 + T5 default. Idempotent on email — duplicate submissions
// upsert silently and return 200, so existence of a prior row does not leak through
// the response.
//
// Out of scope per the prompt: email-sending (no provider integration), double-opt-in,
// admin UI, analytics. Captured rows sit in the subscription_interest table until
// the operator runs the launch blast manually.

export const dynamic = 'force-dynamic';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  // Rate limit per IP — 5/min via the shared in-memory limiter (lib/rate-limiter.ts).
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const limit = subscriptionInterestLimiter.check(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 }
    );
  }

  let body: { email?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const rawLocale = typeof body.locale === 'string' ? body.locale : '';

  if (!rawEmail) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }
  if (!EMAIL_REGEX.test(rawEmail) || rawEmail.length > 254) {
    return NextResponse.json(
      { error: 'Please enter a valid email address' },
      { status: 400 }
    );
  }

  const locale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  try {
    // Upsert by email — first-submit locale wins; subsequent submissions no-op
    // on the row but still return 200 so duplicate-submission state doesn't leak.
    await prisma.subscriptionInterest.upsert({
      where: { email: rawEmail },
      update: {},
      create: {
        email: rawEmail,
        locale,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Subscription-interest upsert failed:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
