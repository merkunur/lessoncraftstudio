'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { isLcsSubscriptionActive } from '@/lib/subscription-helpers';
import { PRICING_PUBLIC } from '@/config/subscription-launch';
import WorkspaceShell from './WorkspaceShell';
import MyTeaching from '@/components/my-teaching/MyTeaching';
import VerifyEmailBanner from '@/components/verify-email/VerifyEmailBanner';
import type { MyTeachingProps } from '@/lib/my-teaching-page';

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
export default function WorkspaceClient({ locale, classesLabel = null, myTeaching = null }: { locale: string; classesLabel?: string | null; myTeaching?: MyTeachingProps | null }) {
  const t = useTranslations('workspace');
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return <p className="font-lcsBody text-sm text-[#5E706A]">{t('loading')}</p>;
  }

  // Both gates render on the DESK, with no panel behind them — there is no
  // working surface to show yet. The focus-ring offset is therefore the desk
  // color, not the sheet color used everywhere inside the panel.
  if (!user) {
    return (
      <div className="max-w-2xl py-4">
        <h1 className="mb-2.5 font-lcsDisplay text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#14322D] md:text-[2rem]">
          {t('gate.signInPromptTitle')}
        </h1>
        <span aria-hidden="true" className="mb-3.5 block h-1.5 w-14 rounded-full bg-lcs-coral" />
        <p className="mb-7 font-lcsBody text-[#3D4F49]">{t('gate.signInPromptBody')}</p>
        <Link
          href={`/${locale}/auth/signin`}
          className="inline-flex min-h-[44px] items-center rounded-full bg-lcs-coral px-6 py-3 font-lcsDisplay font-semibold text-[#14322D] transition-all hover:shadow-[0_3px_10px_-2px_rgba(84,66,39,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#DDD4C2]"
        >
          {t('gate.signInCta')}
        </Link>
      </div>
    );
  }

  if (!isLcsSubscriptionActive(user)) {
    // an account whose e-mail is not confirmed does not get what a free account gets (lib/quota.ts): say so here,
    // with the address the link went to and a button that sends it again. `=== false`: an older stored account
    // without the field is not accused.
    const confirm = user.emailVerified === false ? <VerifyEmailBanner locale={locale} userId={user.id} email={user.email} /> : null;
    // an account without the plan: her own grade's units, what the account can do, what the plan adds (Part 11.3)
    if (myTeaching) {
      return (
        <>
          {confirm}
          <MyTeaching locale={locale} plan={myTeaching.plan} data={myTeaching.data} gate={myTeaching.gate} gradeLabels={myTeaching.gradeLabels} subjectLabels={myTeaching.subjectLabels} topicHrefs={myTeaching.topicHrefs} />
          {classesLabel && (
            <p className="mt-6">
              <Link href={`/${locale}/workspace/classes`} className="font-lcsBody font-semibold text-[#14322D] underline underline-offset-4">{classesLabel}</Link>
            </p>
          )}
        </>
      );
    }
    return (
      <div className="max-w-2xl py-4">
        {confirm}
        <h1 className="mb-2.5 font-lcsDisplay text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#14322D] md:text-[2rem]">
          {t('gate.subscriberTitle')}
        </h1>
        <span aria-hidden="true" className="mb-3.5 block h-1.5 w-14 rounded-full bg-lcs-coral" />
        <p className="mb-7 font-lcsBody text-[#3D4F49]">{t('gate.subscriberBody')}</p>
        {PRICING_PUBLIC && (
          <Link
            href={`/${locale}/pricing`}
            className="inline-flex min-h-[44px] items-center rounded-full bg-lcs-coral px-6 py-3 font-lcsDisplay font-semibold text-[#14322D] transition-all hover:shadow-[0_3px_10px_-2px_rgba(84,66,39,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#DDD4C2]"
          >
            {t('gate.subscriberCta')}
          </Link>
        )}
        {/* results already stored stay readable and removable without a plan (lib/class-results/store.ts) */}
        {classesLabel && (
          <p className="mt-6">
            <Link href={`/${locale}/workspace/classes`} className="font-lcsBody font-semibold text-[#14322D] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral">
              {classesLabel}
            </Link>
          </p>
        )}
      </div>
    );
  }

  return <WorkspaceShell locale={locale} user={user} classesLabel={classesLabel} />;
}
