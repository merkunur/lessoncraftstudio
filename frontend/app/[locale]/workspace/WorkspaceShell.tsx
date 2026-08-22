'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import WorkspaceTabs from './WorkspaceTabs';
import { QuotaMeter, SectionIconDisc, CARD_FRAME } from './WorkspaceSection';
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
 *
 * LAYOUT ("desk & cards", 2026-08-22): header and tab strip sit directly on
 * the desk; below them a 12-col grid at lg — the MAIN column (8 cols) holds
 * the material cards and follows the active tab, the RAIL (4 cols) holds the
 * plan-&-usage card and the recent-activity card and persists across tabs.
 * Under lg everything stacks: plan card first (it replaces the old billing
 * strip's position), then the material cards, then recent activity.
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
    !!user.subscription?.lsSubscriptionId && user.subscription?.status === 'active';

  const anyReady =
    data.worksheets.status !== 'loading' ||
    data.activities.status !== 'loading' ||
    data.collections.status !== 'loading' ||
    data.favorites.status !== 'loading';

  const worksheetsQuota = data.worksheets.data?.quota ?? null;
  const activitiesLimit = data.activities.data?.limit ?? null;

  // First-run: every material slice loaded and came back empty. The overview
  // then renders each section card WITH its empty state (instead of hiding
  // them all and leaving a blank main column for a brand-new subscriber).
  const allEmpty =
    data.worksheets.status === 'ready' &&
    data.activities.status === 'ready' &&
    data.collections.status === 'ready' &&
    data.favorites.status === 'ready' &&
    (data.worksheets.data?.worksheets.length ?? 0) === 0 &&
    (data.activities.data?.shares.length ?? 0) === 0 &&
    (data.collections.data?.collections.length ?? 0) === 0 &&
    (data.favorites.data?.favorites.length ?? 0) === 0;

  return (
    <>
      {/* The header sits on the DESK — it names the surface rather than being
          part of it. 32→36px h1: card headings moved up to 20px, so the h1
          keeps a clear step above them. Baloo 2 needs the negative tracking
          above ~20px or it reads as a toy. */}
      <header className="mb-6 max-w-3xl md:mb-7">
        <h1 className="mb-2.5 font-lcsDisplay text-[2rem] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#14322D] md:text-[2.25rem]">
          {t('header.title')}
        </h1>
        <CrayonStroke />
        {/* #3D4F49, not #5E706A: the muted grey is 3.6:1 on the stone desk —
            it survives only on card/well surfaces. */}
        <p className="font-lcsBody text-sm leading-relaxed text-[#3D4F49] md:text-[0.9375rem]">
          {t('header.welcomeLine')}
        </p>
      </header>

      {/* Tabs on the desk, governing the main column. */}
      <div className="mb-5 md:mb-6">
        <WorkspaceTabs tabs={tabs} active={activeTab} counts={counts} onChange={setTab} />
      </div>

      {/* The card grid. Mobile: plan → materials → recent, via order-* — the
          rail wrapper is display:contents below lg so its cards join the outer
          flex individually. Desktop: main column (8 cols) + a rail column
          (4 cols) whose two cards stack top-aligned; items-start stops the
          grid stretching cards — cards HUG content. (An earlier row-span-2
          shape let the main column's height inflate grid row 1, stranding the
          recent-activity card ~500px below the plan card.) */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6">
        <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-none lg:col-span-8">
          {!anyReady && (
            <p className="font-lcsBody text-sm text-[#3D4F49]">{t('loading')}</p>
          )}

          {activeTab === 'overview' && (
            <>
              <HostedWorksheetsSection
                locale={locale}
                slice={data.worksheets}
                variant="preview"
                onSeeAll={() => setTab('worksheets')}
                showEmptyPreview={allEmpty}
              />
              <SharedActivitiesSection
                locale={locale}
                slice={data.activities}
                variant="preview"
                onSeeAll={() => setTab('activities')}
                showEmptyPreview={allEmpty}
              />
              <CollectionsSection
                locale={locale}
                slice={data.collections}
                variant="preview"
                onSeeAll={() => setTab('collections')}
                showEmptyPreview={allEmpty}
              />
              <FavoritesSection
                locale={locale}
                slice={data.favorites}
                variant="preview"
                onSeeAll={() => setTab('favorites')}
                showEmptyPreview={allEmpty}
              />
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

        {/* THE RAIL. display:contents below lg (its cards join the outer flex
            with their own order), a real stacked column at lg. Recent activity
            persists across tabs — the data is fetched once and a stable rail
            is itself a landmark. Each card handles its own null. */}
        <div className="contents lg:col-span-4 lg:flex lg:flex-col lg:gap-6">
          <PlanUsageCard
            locale={locale}
            user={user}
            showBilling={showBilling}
            worksheetsQuota={worksheetsQuota}
            activitiesLimit={activitiesLimit}
            className="order-1 lg:order-none"
          />
          <RecentActivityPanel
            locale={locale}
            slice={data.recent}
            className="order-3 lg:order-none"
          />
        </div>
      </div>
    </>
  );
}

/**
 * The identity mark under the h1 — a coral crayon tick, hand-drawn rather than
 * a geometric pill: the K-3 warmth carried as craft instead of UI chrome. It
 * appears exactly ONCE; no other decorative coral exists on the page.
 */
function CrayonStroke() {
  return (
    <svg
      aria-hidden="true"
      width="78"
      height="12"
      viewBox="0 0 78 12"
      fill="none"
      className="mb-3.5 block"
    >
      <path
        d="M3 8.1 C 20 5.2, 45 3.6, 74 4.7"
        stroke="#F2784B"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <path
        d="M7 10.1 C 26 7.6, 48 6.4, 69 6.9"
        stroke="#F2784B"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * The rail's status card: subscription line + the two usage meters, merged
 * from the old billing strip and the per-section header meters. One place to
 * answer "how am I doing" — the meters sat in two different section headers
 * before, which made the page's status legible only by scanning everything.
 *
 * Renders nothing when there is nothing to show (admin bypass with slices
 * still loading/gated).
 */
function PlanUsageCard({
  locale,
  user,
  showBilling,
  worksheetsQuota,
  activitiesLimit,
  className,
}: {
  locale: string;
  user: AuthUser;
  showBilling: boolean;
  worksheetsQuota: { count: number; maxCount: number } | null;
  activitiesLimit: { count: number; maxCount: number } | null;
  className?: string;
}) {
  const t = useTranslations('workspace');
  const tTabs = useTranslations('workspace.tabs');

  if (!showBilling && !worksheetsQuota && !activitiesLimit) return null;

  return (
    <section
      data-workspace-card=""
      className={className ? `${CARD_FRAME} ${className}` : CARD_FRAME}
    >
      {showBilling && (
        <div className="flex items-start gap-2.5">
          <SectionIconDisc icon="usage" />
          <div className="min-w-0 pt-1">
            <p className="font-lcsBody text-[0.875rem] font-bold leading-snug text-[#14322D]">
              {t('billing.line')}
            </p>
            {user.subscription?.currentPeriodEnd && (
              <p className="mt-0.5 font-lcsBody text-[0.8125rem] text-[#5E706A]">
                {t('billing.renewsOn')}{' '}
                {new Date(user.subscription.currentPeriodEnd).toLocaleDateString(locale)}
              </p>
            )}
          </div>
        </div>
      )}

      {(worksheetsQuota || activitiesLimit) && (
        <div className={`space-y-3 ${showBilling ? 'mt-4' : 'mt-1'}`}>
          {worksheetsQuota && (
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="font-lcsBody text-[0.8125rem] font-semibold text-[#3D4F49]">
                {tTabs('worksheets')}
              </span>
              <QuotaMeter
                label={t('quotaLabel', {
                  count: worksheetsQuota.count,
                  max: worksheetsQuota.maxCount,
                })}
                count={worksheetsQuota.count}
                max={worksheetsQuota.maxCount}
              />
            </div>
          )}
          {activitiesLimit && (
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <span className="font-lcsBody text-[0.8125rem] font-semibold text-[#3D4F49]">
                {tTabs('activities')}
              </span>
              <QuotaMeter
                label={t('quotaLabel', {
                  count: activitiesLimit.count,
                  max: activitiesLimit.maxCount,
                })}
                count={activitiesLimit.count}
                max={activitiesLimit.maxCount}
              />
            </div>
          )}
        </div>
      )}

      {showBilling && (
        <a
          href="https://lessoncraftstudio-com.lemonsqueezy.com/billing"
          target="_blank"
          rel="noopener noreferrer"
          /* -mb-2 pulls the 44px touch box back into the card's bottom padding
             so it does not inflate the card. */
          className="-mb-2 mt-3 inline-flex min-h-[44px] items-center rounded-full font-lcsBody text-[0.8125rem] font-bold text-lcs-teal underline-offset-4 transition-colors hover:text-lcs-teal-deep hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lcs-coral focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFDF8]"
        >
          {t('billing.manage')}
        </a>
      )}
    </section>
  );
}
