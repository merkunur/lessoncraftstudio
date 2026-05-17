'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSignInGate } from '@/components/auth/SignInRequiredGate';

export type Activity =
  | {
      type: 'collected';
      when: string;
      deckTitle: Record<string, string> | string;
      deckLanguage: string;
      deckSlug: string;
      collectionId: string;
      collectionName: string;
    }
  | {
      type: 'modified';
      when: string;
      collectionId: string;
      collectionName: string;
    }
  | {
      type: 'shared';
      when: string;
      deckTitle: Record<string, string> | string;
      deckLanguage: string;
      deckSlug: string;
    };

interface RecentActivityWidgetProps {
  locale: string;
  activities: Activity[];
}

function deckTitleFor(title: Record<string, string> | string, locale: string): string {
  if (typeof title === 'string') return title;
  return title?.[locale] ?? title?.en ?? '';
}

function deckHrefFor(language: string, slug: string): string {
  // §15.7 routing-contract: deck URLs are nginx-served, with-slash form.
  return `/${language}/decks/${slug}/`;
}

function relativeTime(
  whenIso: string,
  t: (key: string, params?: Record<string, number>) => string
): string {
  const when = new Date(whenIso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - when);
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return t('relativeTime.justNow');
  if (min < 60) return t('relativeTime.minutesAgo', { count: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t('relativeTime.hoursAgo', { count: hr });
  const day = Math.floor(hr / 24);
  if (day < 7) return t('relativeTime.daysAgo', { count: day });
  const wk = Math.floor(day / 7);
  return t('relativeTime.weeksAgo', { count: wk });
}

export default function RecentActivityWidget({
  locale,
  activities,
}: RecentActivityWidgetProps) {
  const t = useTranslations('workspace.recentActivity');
  const { gatedClick } = useSignInGate();

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-ink-900 mb-6">
        {t('heading')}
      </h2>

      {activities.length === 0 ? (
        <div className="border border-cream-300 rounded-lg p-6 bg-cream-50">
          <h3 className="font-display text-lg font-semibold text-ink-900 mb-2">
            {t('empty.title')}
          </h3>
          <p className="text-ink-700">{t('empty.body')}</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {activities.map((a, idx) => {
            const time = relativeTime(a.when, (k, p) => t(k, p));
            if (a.type === 'collected') {
              const title = deckTitleFor(a.deckTitle, locale);
              return (
                <li
                  key={`${a.type}-${a.collectionId}-${a.deckSlug}-${idx}`}
                  className="flex items-center gap-3 py-2 border-b border-cream-300 last:border-0"
                >
                  <span className="text-sm text-ink-700 flex-1">
                    {t('activityType.collected', {
                      deckTitle: title,
                      collectionName: a.collectionName,
                    })}
                  </span>
                  <Link
                    href={`/${locale}/collections/${a.collectionId}`}
                    className="text-xs text-ink-500 hover:text-ink-900 flex-shrink-0"
                  >
                    {time}
                  </Link>
                </li>
              );
            }
            if (a.type === 'modified') {
              return (
                <li
                  key={`${a.type}-${a.collectionId}-${idx}`}
                  className="flex items-center gap-3 py-2 border-b border-cream-300 last:border-0"
                >
                  <span className="text-sm text-ink-700 flex-1">
                    {t('activityType.modified', { collectionName: a.collectionName })}
                  </span>
                  <Link
                    href={`/${locale}/collections/${a.collectionId}`}
                    className="text-xs text-ink-500 hover:text-ink-900 flex-shrink-0"
                  >
                    {time}
                  </Link>
                </li>
              );
            }
            // type === 'shared'
            const title = deckTitleFor(a.deckTitle, locale);
            return (
              <li
                key={`${a.type}-${a.deckSlug}-${idx}`}
                className="flex items-center gap-3 py-2 border-b border-cream-300 last:border-0"
              >
                <span className="text-sm text-ink-700 flex-1">
                  {t('activityType.shared', { deckTitle: title })}
                </span>
                <a
                  href={deckHrefFor(a.deckLanguage, a.deckSlug)}
                  onClick={e => {
                    const url = deckHrefFor(a.deckLanguage, a.deckSlug);
                    gatedClick(e, url, 'self');
                  }}
                  className="text-xs text-ink-500 hover:text-ink-900 flex-shrink-0"
                >
                  {time}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
