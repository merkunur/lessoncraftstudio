import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { listNonEmptyAxisKeys, countDecksForSubjectLevel } from '@/lib/topic-decks';
import { resolveAxisSlug, resolveAxisName, LABELS } from '@/lib/category-nav-data';
import { listSubjectKeys, getSubjectSlugStrict, getSubjectName, getAxisSlug, getAxisName } from '@/lib/taxonomy';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { NATIVE_LOCALE_NAMES } from '@/components/homepage-v4/v4-strings';
import { HUB_GRADE_KEYS, MIN_INDEXABLE_SUBJECT_HUB_DECKS, isSubjectHubAllowed, isOnlineHubAvailable, onlineHubLinkLabel, subjectHubHeading, subjectHubGradeLabel } from '@/lib/subject-hub';
import { isSeasonalHubUpgraded, seasonalHeading, seasonsByProximity } from '@/lib/seasonal-hub';
import { getToolSlugMap } from '@/lib/seo/tool-content';
import { MANIPULATIVES } from '@/lib/manipulatives';

// SSR crawl-bait section (Remediation Part 2 / R2c). The homepage-v3 promotion
// (bc215a5c) dropped the BreadthGrid, collapsing above-fold internal links from
// ~140 to ~12. This server component restores a real, crawlable "Browse by
// topic / type" link grid — text-only links (no above-fold image → no LCP
// cost), honesty-gated to axis-keys with published decks (listNonEmptyAxisKeys),
// reusing the same taxonomy resolvers the footer/nav use. Direction-A aesthetics
// via the .hv3-section-cream / .hv3-card scope. Do NOT remove — these are the
// homepage's primary crawlable internal links.

const MAX_PER_GROUP = 16;

interface BrowseByTopicSSRProps {
  locale: string;
  /**
   * Parameterization for the homepage-v4 preview (2026-07). All three
   * props are OPTIONAL with defaults matching today's live behavior
   * exactly — the live homepage at app/[locale]/page.tsx passes only
   * `locale`, so its output is unchanged until the v4 promotion commit.
   */
  /** Cap for the theme-link group. Default 16 (= live). v4 passes 32. */
  maxThemesPerGroup?: number;
  /** Adds a grade-hub group (educational-level topic pages, honesty-gated
   *  to grades with published decks). Default false (= live). */
  includeGradeGroup?: boolean;
  /** Adds an 11-locale language group linking each locale root with its
   *  native name. Default false (= live). */
  includeLanguageGroup?: boolean;
  /**
   * Homepage-v6 "Class Index" restyle (2026-08). STRICTLY ADDITIVE: absent
   * (every pre-v6 call site) → output is byte-identical to before. When
   * 'hv6': the section joins the Lesson Line ground (mist, rise panel),
   * groups render as pinned index cards with coral drawer tabs, headings
   * read the homepageV6.browse namespace, and a "Classroom tools" group
   * links all 47 tool landings (native titles from MANIPULATIVES).
   */
  variant?: 'hv6';
}

export default async function BrowseByTopicSSR({
  locale,
  maxThemesPerGroup = MAX_PER_GROUP,
  includeGradeGroup = false,
  includeLanguageGroup = false,
  variant,
}: BrowseByTopicSSRProps) {
  const [themeKeys, typeKeys, tFooter, tBrowse] = await Promise.all([
    listNonEmptyAxisKeys('theme', locale).catch(() => [] as string[]),
    listNonEmptyAxisKeys('exercise-type', locale).catch(() => [] as string[]),
    getTranslations({ locale, namespace: 'footer' }),
    getTranslations({ locale, namespace: 'homepageV4.browse' }),
  ]);

  // hv6 only: the Class Index headings + the classroom-tools link group.
  const tBrowse6 = variant === 'hv6'
    ? await getTranslations({ locale, namespace: 'homepageV6.browse' })
    : null;
  let toolLinks: Array<{ href: string; label: string }> = [];
  if (variant === 'hv6') {
    try {
      const slugMap = await getToolSlugMap(locale);
      toolLinks = MANIPULATIVES
        .filter(m => slugMap[m.id])
        .map(m => ({
          href: `/${locale}/tools/${slugMap[m.id]}`,
          label: m.title[locale] ?? m.title.en,
        }));
    } catch { /* content files unreachable — omit the group, honesty */ }
  }

  const themeLinks = themeKeys.slice(0, maxThemesPerGroup).map(k => ({
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

  // Seasonal hub links (2026-07-06) — the upgraded seasonal theme pages,
  // ordered by demand proximity (in-season first; month-granular UTC →
  // ISR-cache-safe). Honesty-gated twice: the theme must have published decks
  // (themeKeys) AND the (locale, season) must be copy-upgraded. Locales
  // without seasonal copy render no group (fails closed).
  const seasonalLinks = seasonsByProximity(new Date().getUTCMonth())
    .filter(k => themeKeys.includes(k) && isSeasonalHubUpgraded(locale, k))
    .map(k => ({
      href: `/${locale}/topic/${resolveAxisSlug(k, locale, 'theme')}/`,
      label: resolveAxisName(k, locale, 'theme'),
    }));

  // Grade-hub group (v4 preview only — includeGradeGroup defaults false).
  // Honesty-gated via listNonEmptyAxisKeys: only educational-level axis-keys
  // with published decks in this locale link out (§16.6 array-membership gate).
  let gradeLinks: Array<{ href: string; label: string }> = [];
  let gradeHeading = '';
  if (includeGradeGroup) {
    try {
      const gradeKeys = await listNonEmptyAxisKeys('educational-level', locale);
      gradeHeading = tBrowse('byGrade');
      gradeLinks = gradeKeys.map(k => ({
        href: `/${locale}/topic/${getAxisSlug('educational-level', k, locale) ?? k}/`,
        label: getAxisName('educational-level', k, locale) ?? k,
      }));
    } catch { /* DB unreachable — omit the group, honesty */ }
  }

  // Language group (v4 preview only — includeLanguageGroup defaults false).
  // Every locale root has a live catalog (all 11 locales published as of
  // 2026-06), so no per-locale deck gate is needed here.
  const languageLinks: Array<{ href: string; label: string }> = includeLanguageGroup
    ? SUPPORTED_LOCALES.map(l => ({ href: `/${l}`, label: NATIVE_LOCALE_NAMES[l] ?? l.toUpperCase() }))
    : [];

  // Nothing to show for a substrate-empty locale — render nothing (honesty).
  if (themeLinks.length === 0 && typeLinks.length === 0 && subjectGradeLinks.length === 0 && seasonalLinks.length === 0 && gradeLinks.length === 0 && languageLinks.length === 0 && toolLinks.length === 0) return null;

  const labels = LABELS[locale] ?? LABELS.en;
  const subjectGradeHeading = subjectHubHeading(locale);
  const isHv6 = variant === 'hv6';
  const navClass = isHv6
    ? 'hv6-index-card'
    : 'rounded-2xl border border-[#14322D]/8 bg-white p-7 md:p-8 shadow-[var(--e1)] hover:shadow-[var(--e2)] transition-shadow';
  const eyebrowClass = isHv6 ? 'hv6-eyebrow mb-4' : 'hv5-eyebrow mb-4';

  const onlineWord = (onlineHubLinkLabel(locale) ?? 'online').split(' ')[0].replace(/[–—-]$/, '') || 'online';
  const group = (heading: string, links: Array<{ href: string; label: string; onlineHref?: string | null }>, browseHref?: string, browseLabel?: string) => {
    if (links.length === 0) return null;
    return (
      <nav aria-label={heading} className={navClass}>
        <h2 className={eyebrowClass}>{heading}</h2>
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
        {browseHref && browseLabel && (
          <Link
            href={browseHref}
            className="inline-block mt-4 text-[15px] font-semibold text-[#F2784B] hover:underline"
          >
            {browseLabel} →
          </Link>
        )}
      </nav>
    );
  };

  const headerEyebrow = isHv6 ? tBrowse6!('eyebrow') : tBrowse('eyebrow');
  const headerHeading = isHv6 ? tBrowse6!('heading') : tBrowse('heading');
  const headerSub = isHv6 ? tBrowse6!('sub') : tBrowse('sub');

  const groups = (
    <>
      {group(subjectGradeHeading, subjectGradeLinks, `/${locale}/worksheets/`, labels.browseAllTopics)}
      {group(seasonalHeading(locale), seasonalLinks, `/${locale}/topic/`, labels.browseAllTopics)}
      {group(tFooter('byTopic'), themeLinks, `/${locale}/topic/`, labels.browseAllTopics)}
      {group(tFooter('byExerciseType'), typeLinks, `/${locale}/worksheets/`, labels.browseAllTopics)}
      {includeGradeGroup && group(gradeHeading, gradeLinks, `/${locale}/worksheets/`, labels.browseAllTopics)}
      {isHv6 && group(tBrowse6!('toolsHeading'), toolLinks)}
      {includeLanguageGroup && group(tFooter('byLanguage'), languageLinks)}
    </>
  );

  if (isHv6) {
    /* The Installation's Class Index: the whole link mesh hangs as a
       PEGBOARD from two nails and ropes; every group is a card pushpinned
       to it. Link-generating code above is untouched — the mesh is
       byte-identical. */
    return (
      <section id="browse-by-topic" className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 max-w-6xl mb-8 md:mb-10">
          <p className="hv6-eyebrow on-dark">{headerEyebrow}</p>
          <h2 className="mt-3 font-lcsDisplay font-bold text-lcs-cream leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">{headerHeading}</h2>
          <p className="mt-3 font-lcsBody text-lg text-[#C3DBD3] leading-relaxed max-w-2xl">{headerSub}</p>
        </div>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="hv6-hangboard">
            <span className="hv6-nail is-l" aria-hidden="true" />
            <span className="hv6-nail is-r" aria-hidden="true" />
            <div className="hv6-pegboard grid gap-6 md:grid-cols-2">
              {groups}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="browse-by-topic" className="bg-[#F0F4F0] py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-6xl mb-8 md:mb-10">
        <p className="hv5-eyebrow">{headerEyebrow}</p>
        <h2 className="mt-3 font-lcsDisplay font-bold text-[#14322D] leading-[1.08] tracking-tight text-[1.875rem] sm:text-[2.5rem] md:text-[3rem]">{headerHeading}</h2>
        <p className="mt-3 font-lcsBody text-lg text-[#3d574f] leading-relaxed max-w-2xl">{headerSub}</p>
      </div>
      <div className="container mx-auto px-4 max-w-6xl grid gap-6 md:grid-cols-2">
        {groups}
      </div>
    </section>
  );
}
