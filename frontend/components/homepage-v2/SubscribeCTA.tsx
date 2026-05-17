'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/Button';

// Join-for-Free CTA per CLAUDE.md §7 (post-subscription-pivot, 2026-05-17).
// Platform is free for any signed-in teacher; no paid tier. Two states:
//   - Signed-out → "Join for free" → /auth/signup
//   - Signed-in  → "Go to workspace" → /workspace
//
// Component name retained as `SubscribeCTA` for import-stability; the
// downstream behavior is now sign-up-driven, not subscription-driven.

export default function SubscribeCTA() {
  const t = useTranslations('homepage.subscription');
  const { user } = useAuth();

  const homepageButtonOverride =
    '!bg-terracotta-400 !text-cream-50 hover:!bg-terracotta-500 focus:!ring-terracotta-400';
  const homepageGhostOverride =
    '!text-ink-700 hover:!bg-cream-200 focus:!ring-ink-700';

  if (user) {
    return (
      <Button
        variant="ghost"
        size="lg"
        href="/workspace"
        className={homepageGhostOverride}
      >
        {t('alreadySubscribedCta')}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="primary"
        size="lg"
        href="/en/auth/signup"
        className={homepageButtonOverride}
      >
        {t('subscribeCta')}
      </Button>
      <p className="text-sm text-ink-500 leading-relaxed max-w-md">
        {t('subscribeSubCopy')}
      </p>
    </div>
  );
}
