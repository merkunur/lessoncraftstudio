'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import WorkspaceSection from '../WorkspaceSection';
import WorkspaceEmptyState from '../WorkspaceEmptyState';
import { deckTitleFor, type Activity, type Slice } from '../useWorkspaceData';

/**
 * Recent activity is a FEED, not a paginated tab: /api/workspace caps it at
 * RECENT_LIMIT = 10 server-side (from three sources each capped at 10), so
 * there is no page 2 to paginate to. It lives at the foot of the overview.
 */
interface Props {
  locale: string;
  slice: Slice<{ recentActivity: Activity[] }>;
}

function deckHrefFor(language: string, slug: string): string {
  // §15.7 routing contract: deck URLs are nginx-served, with-slash form.
  return `/${language}/decks/${slug}/`;
}

function relativeTime(
  whenIso: string,
  t: (key: string, params?: Record<string, number>) => string
): string {
  const diffMs = Math.max(0, Date.now() - new Date(whenIso).getTime());
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return t('relativeTime.justNow');
  if (min < 60) return t('relativeTime.minutesAgo', { count: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t('relativeTime.hoursAgo', { count: hr });
  const day = Math.floor(hr / 24);
  if (day < 7) return t('relativeTime.daysAgo', { count: day });
  return t('relativeTime.weeksAgo', { count: Math.floor(day / 7) });
}

export default function RecentActivityPanel({ locale, slice }: Props) {
  const t = useTranslations('workspace.recentActivity');

  // A /api/workspace failure now degrades to hiding THIS panel only — it no
  // longer blanks the other four sections.
  if (slice.status !== 'ready') return null;

  const activities = slice.data?.recentActivity ?? [];

  return (
    <WorkspaceSection id="ws-recent" title={t('heading')} variant="full">
      {activities.length === 0 ? (
        <WorkspaceEmptyState title={t('empty.title')} body={t('empty.body')} />
      ) : (
        <ul className="actcat-card-flat rounded-2xl px-4 py-1">
          {activities.map((a, idx) => {
            const time = relativeTime(a.when, (k, p) => t(k, p));

            const label =
              a.type === 'collected'
                ? t('activityType.collected', {
                    deckTitle: deckTitleFor(a.deckTitle, locale),
                    collectionName: a.collectionName,
                  })
                : a.type === 'modified'
                  ? t('activityType.modified', { collectionName: a.collectionName })
                  : t('activityType.shared', { deckTitle: deckTitleFor(a.deckTitle, locale) });

            const key =
              a.type === 'modified'
                ? `${a.type}-${a.collectionId}-${idx}`
                : `${a.type}-${a.deckSlug}-${idx}`;

            const timeNode =
              a.type === 'shared' ? (
                <a
                  href={deckHrefFor(a.deckLanguage, a.deckSlug)}
                  className="inline-flex min-h-[44px] shrink-0 items-center font-lcsBody text-xs text-lcs-teal/55 hover:text-lcs-teal"
                >
                  {time}
                </a>
              ) : (
                <Link
                  href={`/${locale}/collections/${a.collectionId}`}
                  className="inline-flex min-h-[44px] shrink-0 items-center font-lcsBody text-xs text-lcs-teal/55 hover:text-lcs-teal"
                >
                  {time}
                </Link>
              );

            return (
              <li
                key={key}
                className="flex items-center gap-3 border-b border-lcs-teal/10 py-2.5 last:border-0"
              >
                <span className="flex-1 font-lcsBody text-sm text-lcs-teal/85">{label}</span>
                {timeNode}
              </li>
            );
          })}
        </ul>
      )}
    </WorkspaceSection>
  );
}
