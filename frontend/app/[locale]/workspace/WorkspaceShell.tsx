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
      <header className="mb-6 max-w-3xl md:mb-8">
        <h1 className="mb-2.5 font-lcsDisplay text-3xl font-extrabold leading-tight text-lcs-teal md:text-4xl">
          {t('header.title')}
        </h1>
        <span aria-hidden="true" className="mb-3.5 block h-1.5 w-16 rounded-full bg-lcs-coral" />
        <p className="font-lcsBody text-sm leading-relaxed text-lcs-teal/80 md:text-base">
          {t('header.welcomeLine')}
        </p>
      </header>

      {/* Real Lemon Squeezy subscribers only — the admin bypass has no LS row. */}
      {showBilling && (
        <section className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-lcs-teal/15 bg-white/70 px-5 py-3.5">
          <p className="font-lcsBody text-sm text-lcs-teal/85">
            {t('billing.line')}
            {user.subscription?.currentPeriodEnd && (
              <span className="text-lcs-teal/60">
                {' '}· {t('billing.renewsOn')}{' '}
                {new Date(user.subscription.currentPeriodEnd).toLocaleDateString(locale)}
              </span>
            )}
          </p>
          <a
            href="https://lessoncraftstudio-com.lemonsqueezy.com/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-lcsBody text-sm font-semibold text-lcs-coral-deep hover:underline"
          >
            {t('billing.manage')}
          </a>
        </section>
      )}

      <WorkspaceTabs tabs={tabs} active={activeTab} counts={counts} onChange={setTab} />

      {!anyReady && (
        <p className="font-lcsBody text-sm text-lcs-teal/60">{t('loading')}</p>
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
    </>
  );
}
