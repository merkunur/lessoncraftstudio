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

/**
 * Relative for the recent past, ABSOLUTE past four weeks.
 *
 * Beyond that a relative string stops being a timestamp and becomes noise: five
 * entries spread over a month all rendered "13 weeks ago", which is unscannable
 * and tells the teacher nothing. Five distinct "3 Jun" do. The year is appended
 * once the entry is not from the current year.
 */
const ABSOLUTE_AFTER_DAYS = 28;

function relativeTime(
  whenIso: string,
  locale: string,
  t: (key: string, params?: Record<string, number>) => string
): string {
  const when = new Date(whenIso);
  const diffMs = Math.max(0, Date.now() - when.getTime());
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return t('relativeTime.justNow');
  if (min < 60) return t('relativeTime.minutesAgo', { count: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t('relativeTime.hoursAgo', { count: hr });
  const day = Math.floor(hr / 24);
  if (day < 7) return t('relativeTime.daysAgo', { count: day });
  if (day < ABSOLUTE_AFTER_DAYS) return t('relativeTime.weeksAgo', { count: Math.floor(day / 7) });

  const sameYear = when.getFullYear() === new Date().getFullYear();
  return when.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
}

/**
 * Event-type token.
 *
 * The three types already existed in the data and were completely
 * indistinguishable on screen — the feed was five identical grey lines. A
 * colored round gives the eye three sortable shapes, and it puts the otherwise
 * unused `lcs-sage` token to work. aria-hidden: the label already says what
 * happened, so announcing the glyph would be duplication.
 */
const TYPE_TOKEN: Record<Activity['type'], { wrap: string; path: string }> = {
  collected: { wrap: 'bg-lcs-teal-soft text-lcs-teal', path: 'M6 1.5v9M1.5 6h9' },
  shared: { wrap: 'bg-lcs-coral-soft text-lcs-coral-deep', path: 'M3 9L9 3M4.5 3H9v4.5' },
  modified: { wrap: 'bg-lcs-sage text-[#4A5C46]', path: 'M8.4 1.6l2 2L4 10H2V8z' },
};

function TypeToken({ type }: { type: Activity['type'] }) {
  const token = TYPE_TOKEN[type];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${token.wrap}`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={token.path} />
      </svg>
    </span>
  );
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
        /* Same full-bleed ruled-line idiom as the worksheet rows, so the whole
           panel reads with one rhythm. */
        <ul className="-mx-5 divide-y divide-[#14322D]/[0.08] border-y border-[#14322D]/[0.08] md:-mx-6">
          {activities.map((a, idx) => {
            const time = relativeTime(a.when, locale, (k, p) => t(k, p));

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

            /* The WHOLE ROW is the link now. Previously only the timestamp was,
               wrapped in a 44px box to make it tappable — an odd affordance
               (why is the date the target?) and the reason the rows were tall. */
            const rowClass =
              /* ring-inset, not ring-offset: the row runs full-bleed to the
                 panel edge, so an outset ring would be clipped by the panel's
                 overflow-hidden. */
              'group flex min-h-[44px] items-center gap-3 px-5 py-2.5 transition-colors hover:bg-[#14322D]/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lcs-coral md:px-6';

            const body = (
              <>
                <TypeToken type={a.type} />
                <span className="flex-1 truncate font-lcsBody text-sm text-[#3D4F49] transition-colors group-hover:text-[#14322D]">
                  {label}
                </span>
                {/* Fixed-width tabular rail so the times form a straight edge
                    down the feed. */}
                <time className="w-20 shrink-0 text-right font-lcsBody text-[0.8125rem] tabular-nums text-[#5E706A]">
                  {time}
                </time>
              </>
            );

            return (
              <li key={key}>
                {a.type === 'shared' ? (
                  <a href={deckHrefFor(a.deckLanguage, a.deckSlug)} className={rowClass}>
                    {body}
                  </a>
                ) : (
                  <Link href={`/${locale}/collections/${a.collectionId}`} className={rowClass}>
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </WorkspaceSection>
  );
}
