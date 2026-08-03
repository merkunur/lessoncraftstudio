'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import WorkspaceShell from './WorkspaceShell';

/**
 * Gates ONLY. Everything past the gates lives in WorkspaceShell.
 *
 * The split exists because React hooks cannot be called conditionally: if the
 * data hook sat in this component it would run for signed-out and non-subscribed
 * visitors too, firing five requests that all 401/403 before a gate could
 * render. Keeping the gates in a parent means the fetch layer is never mounted
 * for a user who isn't entitled to it.
 *
 * The <main> element, the Direction A ground, the container and the fonts all
 * live in page.tsx — next/font cannot be called from a 'use client' file.
 */
export default function WorkspaceClient({ locale }: { locale: string }) {
  const t = useTranslations('workspace');
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p className="font-lcsBody text-sm text-lcs-teal/60">{t('loading')}</p>;
  }

  if (!user) {
    return (
      <div className="max-w-2xl py-4">
        <h1 className="mb-3 font-lcsDisplay text-3xl font-extrabold text-lcs-teal">
          {t('gate.signInPromptTitle')}
        </h1>
        <span aria-hidden="true" className="mb-4 block h-1.5 w-16 rounded-full bg-lcs-coral" />
        <p className="mb-7 font-lcsBody text-lcs-teal/80">{t('gate.signInPromptBody')}</p>
        <Link
          href={`/${locale}/auth/signin`}
          className="inline-flex min-h-[44px] items-center rounded-2xl bg-lcs-coral px-6 py-3 font-lcsDisplay font-semibold text-lcs-cream transition-colors hover:bg-lcs-coral-deep"
        >
          {t('gate.signInCta')}
        </Link>
      </div>
    );
  }

  if (!isLcsSubscriptionActive(user)) {
    return (
      <div className="max-w-2xl py-4">
        <h1 className="mb-3 font-lcsDisplay text-3xl font-extrabold text-lcs-teal">
          {t('gate.subscriberTitle')}
        </h1>
        <span aria-hidden="true" className="mb-4 block h-1.5 w-16 rounded-full bg-lcs-coral" />
        <p className="mb-7 font-lcsBody text-lcs-teal/80">{t('gate.subscriberBody')}</p>
        {PRICING_PUBLIC && (
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex min-h-[44px] items-center rounded-2xl bg-lcs-coral px-6 py-3 font-lcsDisplay font-semibold text-lcs-cream transition-colors hover:bg-lcs-coral-deep"
          >
            {t('gate.subscriberCta')}
          </Link>
        )}
      </div>
    );
  }

  return <WorkspaceShell locale={locale} user={user} />;
}
