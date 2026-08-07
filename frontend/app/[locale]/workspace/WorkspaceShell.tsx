'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import WorkspaceTabs from './WorkspaceTabs';
import { useWorkspaceData, type AuthUser } from './useWorkspaceData';
import { WORKSPACE_TABS, type WorkspaceTab } from './constants';
import HostedWorksheetsSection from './sections/HostedWorksheetsSection';
import SharedActivitiesSection from './sections/SharedActivitiesSection';
import CollectionsSection from './sections/CollectionsSection';
import FavoritesSection from './sections/FavoritesSection';
import RecentActivityPanel from './sections/RecentActivityPanel';

/**
 * The authenticated, subscribed workspace.
 *
 * Mounted ONLY past the gates in WorkspaceClient. That separation is load
 * bearing: hooks can't be called conditionally, so if useWorkspaceData lived
 * alongside the gates, every signed-out or non-subscribed visitor would fire
 * five requests that all 401/403 before the gate rendered.
 */
export default function WorkspaceShell({
  locale,
  user,
}: {
  locale: string;
  user: AuthUser;
}) {
  const t = useTranslations('workspace');
  const [tab, setTab] = useState<WorkspaceTab>('overview');
  const data = useWorkspaceData(true);

  const counts: Partial<Record<WorkspaceTab, number | null>> = {
    worksheets: data.worksheets.data?.worksheets.length ?? null,
    activities: data.activities.data?.shares.length ?? null,
    collections: data.collections.data?.collections.length ?? null,
    favorites: data.favorites.data?.favorites.length ?? null,
  };

  // Hide a tab whose surface this user has no access to (401/403), rather than
  // offering a clickable tab that can only ever render nothing. Still loading
  // counts as available so tabs don't pop in and out during the first paint.
  const gated: Partial<Record<WorkspaceTab, boolean>> = {
    worksheets: data.worksheets.status === 'gated',
    activities: data.activities.status === 'gated',
    collections: data.collections.status === 'gated',
    favorites: data.favorites.status === 'gated',
  };
  const tabs = WORKSPACE_TABS.filter((tb) => !gated[tb]);

  // If the active tab just disappeared, fall back to the overview.
  const activeTab: WorkspaceTab = tabs.includes(tab) ? tab : 'overview';

  const showBilling =
    user.subscription?.lsSubscriptionId && user.subscription?.status === 'active';

  const anyReady =
    data.worksheets.status !== 'loading' ||
    data.activities.status !== 'loading' ||
    data.collections.status !== 'loading' ||
    data.favorites.status !== 'loading';

  return (
    <>
      {/* The header sits on the DESK, outside the panel — it names the surface
          rather than being part of it. h1 comes down from 36px: a dashboard
          title is not a marketing headline, and 28 → 17 (section h2) → 15 (row
          title) is a hierarchy the old 30 → 20 in one color at one weight never
          had. Baloo 2 is wide and rounded and needs the negative tracking above
          ~20px or it reads as a toy. The coral rule stays — it is the site-wide
          identity mark. */}
      <header className="mb-6 max-w-3xl md:mb-8">
        <h1 className="mb-2.5 font-lcsDisplay text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#14322D] md:text-[2rem]">
          {t('header.title')}
        </h1>
        <span aria-hidden="true" className="mb-3.5 block h-1.5 w-14 rounded-full bg-lcs-coral" />
        <p className="font-lcsBody text-sm leading-relaxed text-[#5E706A] md:text-[0.9375rem]">
          {t('header.welcomeLine')}
        </p>
      </header>

      {/* Real Lemon Squeezy subscribers only — the admin bypass has no LS row.
          A well on the desk. "Manage billing" is a link, not the page's CTA, so
          it loses the coral and the 44px invisible box. */}
      {showBilling && (
        <section className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#14322D]/10 bg-[#F5F1E6] px-4 py-3">
          <p className="font-lcsBody text-[0.8125rem] text-[#3D4F49]">
            {t('billing.line')}
            {user.subscription?.currentPeriodEnd && (
              <span className="text-[#5E706A]">
                {' '}· {t('billing.renewsOn')}{' '}
                {new Date(user.subscription.currentPeriodEnd).toLocaleDateString(locale)}
              </span>
            )}
          </p>
          <a
            href="https://lessoncraftstudio-com.lemonsqueezy.com/billing"
            target="_blank"
            rel="noopener noreferrer"
            /* -my-3 pulls the 44px touch target back so it does not inflate
               the strip: it is a flex item (so blockified, not an inline text
               link) and at 20px tall it was a real touch defect. */
            className="-my-3 inline-flex min-h-[44px] items-center rounded-full font-lcsBody text-[0.8125rem] font-bold text-lcs-teal underline-offset-4 transition-colors hover:text-lcs-teal-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F1E6]"
          >
            {t('billing.manage')}
          </a>
        </section>
      )}

      {/* THE SHEET. One panel holds the tab strip and every section, so the tabs
          read as folder tabs cut into its top edge rather than as a loose band
          of chips floating above unrelated cards.
          `overflow-hidden` is load-bearing: it lets section dividers and row
          hover washes run full-bleed into the rounded corners, which is what
          makes the whole thing read as a single sheet instead of a stack. */}
      <div className="overflow-hidden rounded-[20px] border border-[#14322D]/10 bg-[#FFFDF8] shadow-[0_1px_2px_rgba(20,50,45,0.04),0_18px_40px_-24px_rgba(20,50,45,0.18)]">
        <WorkspaceTabs tabs={tabs} active={activeTab} counts={counts} onChange={setTab} />

        {!anyReady && (
          <p className="px-5 py-8 font-lcsBody text-sm text-[#5E706A] md:px-6">{t('loading')}</p>
        )}

        {activeTab === 'overview' && (
          <>
            <HostedWorksheetsSection
              locale={locale}
              slice={data.worksheets}
              variant="preview"
              onSeeAll={() => setTab('worksheets')}
            />
            <SharedActivitiesSection
              locale={locale}
              slice={data.activities}
              variant="preview"
              onSeeAll={() => setTab('activities')}
            />
            <CollectionsSection
              locale={locale}
              slice={data.collections}
              variant="preview"
              onSeeAll={() => setTab('collections')}
            />
            <FavoritesSection
              locale={locale}
              slice={data.favorites}
              variant="preview"
              onSeeAll={() => setTab('favorites')}
            />
            <RecentActivityPanel locale={locale} slice={data.recent} />
          </>
        )}

        {activeTab === 'worksheets' && (
          <HostedWorksheetsSection locale={locale} slice={data.worksheets} variant="full" />
        )}
        {activeTab === 'activities' && (
          <SharedActivitiesSection locale={locale} slice={data.activities} variant="full" />
        )}
        {activeTab === 'collections' && (
          <CollectionsSection locale={locale} slice={data.collections} variant="full" />
        )}
        {activeTab === 'favorites' && (
          <FavoritesSection locale={locale} slice={data.favorites} variant="full" />
        )}
      </div>
    </>
  );
}
