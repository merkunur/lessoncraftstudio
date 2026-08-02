import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/request';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { LocaleLayoutClient } from './LocaleLayoutClient';
import { listNonEmptyAxisKeys } from '@/lib/topic-decks';
import { listAllActivities } from '@/lib/activities';
import { fetchCrossLanguageTargets } from '@/lib/cross-language-decks';
import { targetLangSlug, targetLangName } from '@/lib/target-language';
import { getToolSlugMap } from '@/lib/seo/tool-content';
import { getMakerSlugMap } from '@/lib/seo/maker-content';
import { MANIPULATIVES } from '@/lib/manipulatives';
import { buildAxisLabels } from '@/lib/category-nav-taxonomy';
import { buildCategoryMeshSlots } from '@/components/layout/CategoryNavMesh';
import { ACTIVITIES_NAV_COUNT } from '@/lib/category-nav-data';

// Generate static params for all locales - enables static generation
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Load messages server-side - critical for SEO
  // Explicitly pass locale to ensure correct messages are loaded
  const messages = await getMessages({ locale });

  /* ── Client payload trim ──────────────────────────────────────────────
     NextIntlClientProvider serialises whatever it is given into the RSC
     flight data inside EVERY page's HTML. Handing it the whole message set
     put 298KB of JSON into every route — measured: the homepage's HTML was
     577KB and contained `topicProse` and `topicFaq`, neither of which it
     renders. On a 1.6 Mbps link that is ~2.9s before anything else happens.

     These three are consumed ONLY by server components via getTranslations,
     which reads from the request and not from this provider — so topic pages
     keep their prose. Verified before removing them: every useTranslations()
     call in the codebase names a literal namespace (no root consumers), and
     nothing uses useMessages/useFormatter to walk the object dynamically.

     ⚠ If a CLIENT component ever needs one of these, delete it from this list
     or it will throw MISSING_MESSAGE at runtime. `topicPage` is deliberately
     NOT here — client components do use it. */
  const SERVER_ONLY_NAMESPACES = [
    // The original three: 209KB of topic prose/FAQ/meta.
    'topicProse', 'topicFaq', 'topicMeta',
    // A second measured pass (scripts-side audit: 37 client files, 16 namespaces
    // actually requested, ZERO dynamic useTranslations calls). These ten are
    // page-scoped content read only by SERVER components via getTranslations —
    // another 44KB off every route. Sub-2KB namespaces were deliberately LEFT
    // IN: the risk per byte is not worth it.
    'homepageV4', 'faq', 'homepageV6', 'privacy', 'about',
    'license', 'terms', 'billing', 'aboutPage', 'worksheetsPage',
  ];
  const clientMessages = Object.fromEntries(
    Object.entries(messages as Record<string, unknown>).filter(
      ([ns]) => !SERVER_ONLY_NAMESPACES.includes(ns),
    ),
  );

  // Footer content-gating per §16.6.1 substrate-honesty discipline. Fetch the
  // set of axis-keys with ≥1 published deck in this locale and pass through to
  // Footer as a Set; Footer filters its hardcoded FOOTER_EXERCISE_TYPES /
  // FOOTER_TOPICS arrays against these sets so non-published axis-keys don't
  // render as broken links. Computed at layout level (Server Component) to keep
  // the DB hits centralized and ISR-cacheable.
  let footerAvailableExerciseTypes: string[] = [];
  let footerAvailableThemes: string[] = [];
  let footerAvailableLevels: string[] = [];
  try {
    footerAvailableExerciseTypes = await listNonEmptyAxisKeys('exercise-type', locale);
    footerAvailableThemes = await listNonEmptyAxisKeys('theme', locale);
    footerAvailableLevels = await listNonEmptyAxisKeys('educational-level', locale);
  } catch {
    // DB unavailable (local dev / startup): fall back to empty arrays. Footer
    // will render nothing for axis-bound columns; language column still works.
  }

  // Activities-dropdown payload for CategoryNav. Loaded once per locale
  // page-render; cached at lib/activities.ts level so subsequent layouts
  // hit the in-memory cache.
  let availableActivities: Array<{ id: string; slug: string; title: string; code: string }> = [];
  try {
    const all = await listAllActivities();
    for (const row of all) {
      const slug = row.slug[locale];
      const title = row.page_title[locale];
      if (slug && title) {
        availableActivities.push({ id: row.id, slug, title, code: row.alignment.code });
      }
      // ⚠ STOP AT WHAT THE NAV RENDERS. The dropdown slices to
      // ACTIVITIES_NAV_COUNT, but this array is serialised into the RSC flight
      // data of EVERY page first — all 194 rows, ~21KB per document, to render
      // ten links. Trimming here instead of at the consumer is the whole saving.
      if (availableActivities.length >= ACTIVITIES_NAV_COUNT) break;
    }
  } catch {
    // Manifest unreachable: dropdown renders empty + Browse-all link still works.
  }

  // Cross-language ("Languages") category targets for this locale (≥1 deck each).
  let availableTargets: Array<{ iso: string; slug: string; name: string; count: number }> = [];
  try {
    const targets = await fetchCrossLanguageTargets(locale);
    availableTargets = targets.map((tg) => ({ iso: tg.iso, slug: targetLangSlug(tg.iso, locale), name: targetLangName(tg.iso, locale), count: tg.count }));
  } catch {
    // DB unavailable: Languages category simply won't render.
  }

  // Per-tool native slugs for the Manipulatives dropdown, so each of the 38
  // tools links to its OWN landing instead of the shared /tools index.
  // Resolved here (Server Component) because the tool-content JSON is ~1.4 MB
  // across 11 locales and the nav renderers are client components.
  let toolSlugs: Record<string, string> = {};
  try {
    toolSlugs = await getToolSlugMap(locale);
  } catch {
    // Content files unreachable: buildCategories falls back to the /tools
    // index link for every item — the pre-2026-07-30 behaviour, never a 410.
  }

  // Same treatment for the "Worksheet creators" dropdown: its items were
  // /worksheet-makers/#anchor fragments, which are not separate URLs, so all that
  // nav equity landed on the hub while the 33 maker landings got no nav link at all.
  let makerSlugs: Record<string, string> = {};
  try {
    makerSlugs = await getMakerSlugMap(locale);
  } catch {
    // Content files unreachable: buildCategories falls back to the fragment links.
  }

  /* The tool catalogue and the axis taxonomy, resolved HERE for this locale
     only. Both used to be imported directly by `lib/category-nav-data.ts`,
     which three client components consume — so 554KB of manipulatives and
     189KB of taxonomy were compiled into `app/[locale]/layout-*.js`, a 727KB
     chunk loading on every route in every language. The client needs about
     3KB of it: `id` + `title` in one locale, and ~21 axis name/slug pairs.
     Same reasoning as toolSlugs/makerSlugs directly above. */
  const toolLabels = MANIPULATIVES.map((m) => ({
    id: m.id,
    title: m.title[locale] ?? m.title.en,
  }));
  const axisLabels = buildAxisLabels(locale);

  /* The header nav's sr-only crawl mesh, built on the SERVER. It was 94 links
     inside a Client Component, hydrated on every page of the site to render
     something entirely static. Passed down as elements, which React does not
     hydrate. */
  const meshSlots = await buildCategoryMeshSlots({
    locale,
    availableExerciseTypes: footerAvailableExerciseTypes,
    availableActivities,
    availableThemes: footerAvailableThemes,
    availableTargets,
    toolSlugs,
    toolLabels,
    axisLabels,
    makerSlugs,
  });

  return (
    <NextIntlClientProvider locale={locale} messages={clientMessages}>
      <LocaleLayoutClient
        locale={locale}
        footerAvailableExerciseTypes={footerAvailableExerciseTypes}
        footerAvailableThemes={footerAvailableThemes}
        footerAvailableLevels={footerAvailableLevels}
        availableActivities={availableActivities}
        availableTargets={availableTargets}
        toolSlugs={toolSlugs}
        makerSlugs={makerSlugs}
        toolLabels={toolLabels}
        axisLabels={axisLabels}
        meshSlots={meshSlots}
        /* Rendered HERE, on the server, and handed down as an element: a Client
           Component cannot render a Server Component as a child, but it can
           render one it receives as a prop — and React never hydrates it. */
        footerSlot={
          <Footer
            locale={locale}
            availableExerciseTypes={footerAvailableExerciseTypes}
            availableThemes={footerAvailableThemes}
            axisLabels={axisLabels}
          />
        }
      >
        {children}
      </LocaleLayoutClient>
    </NextIntlClientProvider>
  );
}
