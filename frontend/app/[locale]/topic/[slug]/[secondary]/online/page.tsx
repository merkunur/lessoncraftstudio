// Online-exercise hub variant (Unit 4, SEO real-cause program, 2026-07-06).
//
// URL: /[locale]/topic/<subject>/<grade>/online (e.g. /de/topic/mathe/1-klasse/online)
// Targets the online/interactive-exercise query class ("online übungen mathe
// klasse 1", "free online math exercises for grade 1") that the printable-hub
// incumbents structurally can't serve — every deck here is a playable in-browser
// exercise. Same deck set as the print hub, but play-first: deck cards link to
// the /decks/ play pages (NOT the /worksheets/ landings), the copy is
// online-intent, and an activities strip surfaces the richer interactive
// activities where grade+subject match.
//
// A static child segment under [secondary] cannot trigger Next's same-position
// dynamic-segment collision; it reuses resolveSubjectGrade() so only subject×grade
// coordinates render — real intersections (or locales without online copy) 404.

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound, redirect } from 'next/navigation';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import { getAxisSlug, getSubjectName, getSubjectSlugStrict, listSubjectKeys } from '@/lib/taxonomy';
import {
  fetchDecksForSubjectLevel,
  fetchLeadDeckForSubjectLevel,
  countDecksForSubjectLevel,
  TopicDeckSummary,
} from '@/lib/topic-decks';
import { ogImageFromLeadDeck } from '@/lib/seo/topic-og-image';
import {
  resolveSubjectGrade,
  isOnlineHubAvailable,
  onlineHubTitle,
  onlineHubH1,
  onlineHubDescription,
  onlineHubIntro,
  printHubLinkLabel,
  subjectHubGradeLabel,
  subjectHubH1,
  MIN_INDEXABLE_SUBJECT_HUB_DECKS,
  HUB_GRADE_KEYS,
  isSubjectHubAllowed,
} from '@/lib/subject-hub';
import { canonicalDeckAssets } from '@/lib/seo/landing-content';
import { listAllActivities, ActivityRow } from '@/lib/activities';
import ResultCount from '@/components/catalog/ResultCount';
import DeckGridClient, { TopicDeckCardData } from '../../DeckGridClient';
import { buildDeckThumbAlt } from '@/lib/seo/deck-vocab';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';

const TOPIC_LOCALES = TOPIC_ENABLED_LOCALES;
type TopicLocale = TopicEnabledLocale;
const BASE_URL = CANONICAL_HOST;

export const revalidate = 3600;

interface OnlineParams {
  locale: string;
  slug: string;
  secondary: string;
}

function isTopicLocale(l: string): l is TopicLocale {
  return (TOPIC_LOCALES as readonly string[]).includes(l);
}

function deckTitleFor(deck: TopicDeckSummary, locale: string): string {
  const t = deck.title;
  if (t && typeof t === 'object') {
    return (t as Record<string, string>)[locale] ?? (t as Record<string, string>).en ?? deck.slug;
  }
  return deck.slug;
}

/** Resolve the hub coordinate, or null when this URL is not an online hub. */
function resolveOnline(params: OnlineParams): { locale: TopicLocale; subjectKey: string; levelKey: string } | { redirectTo: string } | null {
  if (!isTopicLocale(params.locale)) return null;
  const sg = resolveSubjectGrade(params.slug, params.secondary, params.locale);
  if (!sg) return null;
  if (sg.kind === 'redirect') {
    return { redirectTo: localePath(params.locale, 'topic', sg.subjectSlug, sg.gradeSlug, 'online') };
  }
  if (!isOnlineHubAvailable(params.locale, sg.subjectKey)) return null;
  return { locale: params.locale, subjectKey: sg.subjectKey, levelKey: sg.levelKey };
}

/* ---------------- activities strip (grade + subject matched) ---------------- */

const MATH_STRAND_RE = /counting|operations|number|base ten|measurement|geometry|fraction/i;
const LETTERS_STRAND_RE = /reading|language|writing|foundational|phono|speaking|literature|informational/i;
const GRADE_BY_LEVEL: Record<string, string[]> = {
  kindergarten: ['K'],
  'grade-1': ['1'],
  'grade-2': ['2'],
  'grade-3': ['3'],
};

function activityMatchesSubject(a: ActivityRow, subjectKey: string): boolean {
  const strand = a.alignment?.strand ?? '';
  if (subjectKey === 'math') return MATH_STRAND_RE.test(strand);
  if (subjectKey === 'letters') return LETTERS_STRAND_RE.test(strand) && !MATH_STRAND_RE.test(strand);
  return false;
}

async function matchingActivities(locale: TopicLocale, subjectKey: string, levelKey: string): Promise<Array<{ href: string; label: string }>> {
  const grades = GRADE_BY_LEVEL[levelKey];
  if (!grades) return [];
  try {
    const all = await listAllActivities();
    return all
      .filter((a) => a.slug?.[locale] && grades.includes(a.alignment?.grade) && activityMatchesSubject(a, subjectKey))
      .slice(0, 8)
      .map((a) => ({
        href: `/${locale}/activities/${a.slug[locale]}`,
        label: a.page_title?.[locale] ?? a.page_title?.en ?? a.slug[locale],
      }));
  } catch {
    return [];
  }
}

/* ---------------- metadata ---------------- */

export async function generateMetadata({ params }: { params: OnlineParams }): Promise<Metadata> {
  const r = resolveOnline(params);
  if (!r) return { robots: { index: false, follow: false } };
  if ('redirectTo' in r) {
    return { alternates: { canonical: canonicalUrl(r.redirectTo) }, robots: { index: false, follow: true } };
  }
  const { locale, subjectKey, levelKey } = r;
  const count = await countDecksForSubjectLevel(subjectKey, levelKey, locale);
  const title = onlineHubTitle(locale, subjectKey, levelKey);
  const description = onlineHubDescription(locale, subjectKey, levelKey, count);
  const canonical = canonicalUrl(localePath(locale, 'topic', params.slug, params.secondary, 'online'));

  // Honest hreflang: only locales with online copy AND an indexable hub.
  const hreflangAlternates: Record<string, string> = {};
  for (const sib of TOPIC_LOCALES) {
    if (!isOnlineHubAvailable(sib, subjectKey)) continue;
    if (!isSubjectHubAllowed(sib, subjectKey, levelKey)) continue;
    const subjSlug = getSubjectSlugStrict(subjectKey, sib);
    const gradeSlug = getAxisSlug('educational-level', levelKey, sib);
    if (!subjSlug || !gradeSlug) continue;
    const c = await countDecksForSubjectLevel(subjectKey, levelKey, sib);
    if (c < MIN_INDEXABLE_SUBJECT_HUB_DECKS) continue;
    hreflangAlternates[getHreflangCode(sib)] = canonicalUrl(localePath(sib, 'topic', subjSlug, gradeSlug, 'online'));
  }
  const enHref = hreflangAlternates[getHreflangCode('en')];
  if (enHref) hreflangAlternates['x-default'] = enHref;

  const indexable = count >= MIN_INDEXABLE_SUBJECT_HUB_DECKS;
  // Per-hub social image from this hub's own first deck (see topicOgImage).
  const altT = await getTranslations({ locale, namespace: 'seo.ogImageAlt' });
  const ogImage = ogImageFromLeadDeck(
    await fetchLeadDeckForSubjectLevel(subjectKey, levelKey, locale),
    locale,
    (key, p) => altT(key as never, p as never),
  );
  return {
    title,
    description,
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
    alternates: { canonical, languages: hreflangAlternates },
    openGraph: {
      title, description, type: 'website', url: canonical, siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      images: [ogImage],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage.url] },
  };
}

/* ---------------- page ---------------- */

export default async function OnlineHubPage({ params }: { params: OnlineParams }) {
  const r = resolveOnline(params);
  if (!r) notFound();
  if ('redirectTo' in r) redirect(r.redirectTo);
  const { locale, subjectKey, levelKey } = r;

  const count = await countDecksForSubjectLevel(subjectKey, levelKey, locale);
  if (count === 0) notFound();
  const decks = await fetchDecksForSubjectLevel(subjectKey, levelKey, locale, { take: 24 });

  const t = await getTranslations({ locale, namespace: 'topicPage' });
  const tDeckAlt = await getTranslations({ locale, namespace: 'seo.deckCardAlt' });
  const tMainAlt = await getTranslations({ locale, namespace: 'seo.worksheetMainAlt' });
  const tBreadcrumb = await getTranslations({ locale, namespace: 'topicPage.breadcrumb' });

  const h1 = onlineHubH1(locale, subjectKey, levelKey);
  const intro = onlineHubIntro(locale, subjectKey, levelKey, count);
  const canonical = canonicalUrl(localePath(locale, 'topic', params.slug, params.secondary, 'online'));
  const gradeName = subjectHubGradeLabel(locale, levelKey);
  const printHubHref = `/${locale}/topic/${params.slug}/${params.secondary}`;
  const printLabel = printHubLinkLabel(locale, subjectKey, levelKey);
  const activities = await matchingActivities(locale, subjectKey, levelKey);

  // Sibling online hubs (other grades of this subject) — small mesh.
  const otherGrades: Array<{ label: string; href: string }> = [];
  for (const g of HUB_GRADE_KEYS) {
    if (g === levelKey) continue;
    if (!isSubjectHubAllowed(locale, subjectKey, g)) continue;
    const gSlug = getAxisSlug('educational-level', g, locale);
    if (!gSlug) continue;
    const c = await countDecksForSubjectLevel(subjectKey, g, locale);
    if (c < MIN_INDEXABLE_SUBJECT_HUB_DECKS) continue;
    otherGrades.push({ label: subjectHubGradeLabel(locale, g), href: `/${locale}/topic/${params.slug}/${gSlug}/online` });
  }
  // Other subjects online at this grade.
  const otherSubjects: Array<{ label: string; href: string }> = [];
  const gradeLevelSlug = getAxisSlug('educational-level', levelKey, locale);
  for (const s of listSubjectKeys()) {
    if (s === subjectKey) continue;
    if (!isOnlineHubAvailable(locale, s)) continue;
    if (!isSubjectHubAllowed(locale, s, levelKey)) continue;
    const sSlug = getSubjectSlugStrict(s, locale);
    if (!sSlug || !gradeLevelSlug) continue;
    const c = await countDecksForSubjectLevel(s, levelKey, locale);
    if (c < MIN_INDEXABLE_SUBJECT_HUB_DECKS) continue;
    otherSubjects.push({ label: getSubjectName(s, locale) ?? s, href: `/${locale}/topic/${sSlug}/${gradeLevelSlug}/online` });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: h1,
    description: intro,
    url: canonical,
    inLanguage: locale,
    isAccessibleForFree: true,
    hasPart: decks.slice(0, 12).map((deck) => ({
      '@type': 'LearningResource',
      name: deckTitleFor(deck, locale),
      learningResourceType: 'Interactive exercise',
      isAccessibleForFree: true,
      url: `${BASE_URL}/${deck.language}/decks/${deck.slug}/`,
    })),
  };
  const breadcrumbTrail: BreadcrumbCrumb[] = [
    { name: tBreadcrumb('home'), path: localePath(locale) },
    { name: subjectHubH1(locale, subjectKey, levelKey), path: localePath(locale, 'topic', params.slug, params.secondary) },
    { name: h1, path: localePath(locale, 'topic', params.slug, params.secondary, 'online') },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbTrail);

  const activitiesHeading = locale === 'de' ? 'Interaktive Lernspiele passend dazu' : 'Matching interactive activities';
  const otherGradesLabel = locale === 'de' ? 'Online üben – andere Klassenstufen' : 'Practice online – other grades';
  const otherSubjectsLabel = locale === 'de' ? `Weitere Fächer online für ${gradeName}` : `More subjects online for ${gradeName}`;
  const linkCls = 'text-ink-900 underline underline-offset-2 hover:no-underline';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="container mx-auto px-4 max-w-6xl py-12">
        <nav className="text-sm text-ink-500 mb-4" aria-label="Breadcrumb">
          {breadcrumbTrail.map((c, i) => (
            <span key={c.path}>
              {i > 0 && <span className="mx-1">›</span>}
              {i < breadcrumbTrail.length - 1
                ? <a href={c.path} className="hover:underline">{c.name}</a>
                : <span aria-current="page">{c.name}</span>}
            </span>
          ))}
        </nav>

        <header className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-3">{h1}</h1>
          <ResultCount locale={locale} count={count} />
          <p className="mt-3 text-ink-700 max-w-3xl leading-relaxed">{intro}</p>
          {printLabel && (
            <p className="mt-3">
              <a href={printHubHref} className={`font-medium ${linkCls}`}>{printLabel}</a>
            </p>
          )}
        </header>

        {decks.length > 0 && (
          <DeckGridClient
            decks={decks.map<TopicDeckCardData>(deck => {
              const title = deckTitleFor(deck, locale);
              return {
                id: deck.id,
                slug: deck.slug,
                language: deck.language,
                title,
                richAlt: buildDeckThumbAlt(
                  { slug: deck.slug, exerciseType: deck.exerciseType, subjectTags: deck.subjectTags, ageRange: deck.ageRange, title },
                  locale,
                  (key, p) => tMainAlt(key as never, p as never),
                  (key, p) => tDeckAlt(key, p),
                ),
                // Play-first: the card opens the in-browser play page, not the landing.
                href: `/${deck.language}/decks/${deck.slug}/`,
                ...canonicalDeckAssets(deck),
              };
            })}
            labels={{ playLink: t('deckCard.playLink'), pdfLink: t('deckCard.pdfLink'), answerKeyLink: t('deckCard.answerKeyLink') }}
          />
        )}

        {activities.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">{activitiesHeading}</h2>
            <ul className="space-y-1">
              {activities.map(a => <li key={a.href}><a href={a.href} className={linkCls}>{a.label}</a></li>)}
            </ul>
          </section>
        )}

        {(otherSubjects.length > 0 || otherGrades.length > 0) && (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {otherSubjects.length > 0 && (
              <section>
                <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">{otherSubjectsLabel}</h2>
                <ul className="space-y-1">
                  {otherSubjects.map(l => <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>)}
                </ul>
              </section>
            )}
            {otherGrades.length > 0 && (
              <section>
                <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">{otherGradesLabel}</h2>
                <ul className="space-y-1">
                  {otherGrades.map(l => <li key={l.href}><a href={l.href} className={linkCls}>{l.label}</a></li>)}
                </ul>
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
}
