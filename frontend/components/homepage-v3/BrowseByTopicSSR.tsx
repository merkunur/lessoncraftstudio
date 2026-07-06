import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { listNonEmptyAxisKeys, countDecksForSubjectLevel } from '@/lib/topic-decks';
import { resolveAxisSlug, resolveAxisName, LABELS } from '@/lib/category-nav-data';
import { listSubjectKeys, getSubjectSlugStrict, getSubjectName, getAxisSlug } from '@/lib/taxonomy';
import { HUB_GRADE_KEYS, MIN_INDEXABLE_SUBJECT_HUB_DECKS, isSubjectHubAllowed, isOnlineHubAvailable, onlineHubLinkLabel, subjectHubHeading, subjectHubGradeLabel } from '@/lib/subject-hub';

// SSR crawl-bait section (Remediation Part 2 / R2c). The homepage-v3 promotion
// (bc215a5c) dropped the BreadthGrid, collapsing above-fold internal links from
// ~140 to ~12. This server component restores a real, crawlable "Browse by
// topic / type" link grid — text-only links (no above-fold image → no LCP
// cost), honesty-gated to axis-keys with published decks (listNonEmptyAxisKeys),
// reusing the same taxonomy resolvers the footer/nav use. Direction-A aesthetics
// via the .hv3-section-cream / .hv3-card scope. Do NOT remove — these are the
// homepage's primary crawlable internal links.

const MAX_PER_GROUP = 16;

export default async function BrowseByTopicSSR({ locale }: { locale: string }) {
  const [themeKeys, typeKeys, tFooter] = await Promise.all([
    listNonEmptyAxisKeys('theme', locale).catch(() => [] as string[]),
    listNonEmptyAxisKeys('exercise-type', locale).catch(() => [] as string[]),
    getTranslations({ locale, namespace: 'footer' }),
  ]);

  const themeLinks = themeKeys.slice(0, MAX_PER_GROUP).map(k => ({
    href: `/${locale}/topic/${resolveAxisSlug(k, locale, 'theme')}/`,
    label: resolveAxisName(k, locale, 'theme'),
  }));
  const typeLinks = typeKeys.slice(0, MAX_PER_GROUP).map(k => ({
    href: `/${locale}/topic/${resolveAxisSlug(k, locale, 'exercise-type')}/`,
    label: resolveAxisName(k, locale, 'exercise-type'),
  }));

  // Subject×grade hub links (Fach×Klasse) — only for locales that define subjects
  // (de/en at MVP). The getSubjectSlugStrict null-check short-circuits the other
  // 9 locales to zero DB queries. Count-gated so we never link a thin/404 hub.
  const subjectGradeLinks: Array<{ href: string; label: string; onlineHref?: string | null }> = [];
  try {
    const combos = listSubjectKeys().flatMap(s => HUB_GRADE_KEYS.map(g => ({ s, g })));
    const resolved = await Promise.all(
      combos.map(async ({ s, g }) => {
        if (!isSubjectHubAllowed(locale, s, g)) return null;
        const ss = getSubjectSlugStrict(s, locale);
        const gs = getAxisSlug('educational-level', g, locale);
        if (!ss || !gs) return null;
        const c = await countDecksForSubjectLevel(s, g, locale);
        if (c < MIN_INDEXABLE_SUBJECT_HUB_DECKS) return null;
        const gradeLabel = subjectHubGradeLabel(locale, g);
        // Online-exercise variant link (Unit 12) — same gate as the sitemap emitter.
        const onlineHref = isOnlineHubAvailable(locale, s) ? `/${locale}/topic/${ss}/${gs}/online` : null;
        return { href: `/${locale}/topic/${ss}/${gs}`, label: `${getSubjectName(s, locale) ?? s} · ${gradeLabel}`, onlineHref };
      }),
    );
    for (const r of resolved) if (r) subjectGradeLinks.push(r);
  } catch { /* DB unreachable — omit the group, honesty */ }

  // Nothing to show for a substrate-empty locale — render nothing (honesty).
  if (themeLinks.length === 0 && typeLinks.length === 0 && subjectGradeLinks.length === 0) return null;

  const labels = LABELS[locale] ?? LABELS.en;
  const subjectGradeHeading = subjectHubHeading(locale);

  const onlineWord = (onlineHubLinkLabel(locale) ?? 'online').split(' ')[0].replace(/[–—-]$/, '') || 'online';
  const group = (heading: string, links: Array<{ href: string; label: string; onlineHref?: string | null }>, browseHref: string, browseLabel: string) => {
    if (links.length === 0) return null;
    return (
      <nav aria-label={heading} className="hv3-card p-7 md:p-8">
        <h2 className="hv3-eyebrow text-[#146B5E] mb-4">{heading}</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[15px] text-[#146B5E] hover:text-[#F2784B] hover:underline"
              >
                {l.label}
              </Link>
              {l.onlineHref && (
                <>
                  {' '}
                  <Link
                    href={l.onlineHref}
                    className="text-[13px] text-[#5A5345] hover:text-[#F2784B] hover:underline"
                  >
                    · {onlineWord}
                  </Link>
                </>
              )}
            </li>
          ))}
        </ul>
        <Link
          href={browseHref}
          className="inline-block mt-4 text-[15px] font-semibold text-[#F2784B] hover:underline"
        >
          {browseLabel} →
        </Link>
      </nav>
    );
  };

  return (
    <section id="browse-by-topic" className="hv3-section-cream py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl grid gap-6 md:grid-cols-2">
        {group(subjectGradeHeading, subjectGradeLinks, `/${locale}/worksheets/`, labels.browseAllTopics)}
        {group(tFooter('byTopic'), themeLinks, `/${locale}/topic/`, labels.browseAllTopics)}
        {group(tFooter('byExerciseType'), typeLinks, `/${locale}/worksheets/`, labels.browseAllTopics)}
      </div>
    </section>
  );
}
