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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleLayoutClient
        locale={locale}
        footerAvailableExerciseTypes={footerAvailableExerciseTypes}
        footerAvailableThemes={footerAvailableThemes}
        footerAvailableLevels={footerAvailableLevels}
        availableActivities={availableActivities}
        availableTargets={availableTargets}
        toolSlugs={toolSlugs}
        makerSlugs={makerSlugs}
      >
        {children}
      </LocaleLayoutClient>
    </NextIntlClientProvider>
  );
}
