import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/request';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { LocaleLayoutClient } from './LocaleLayoutClient';
import { listNonEmptyAxisKeys } from '@/lib/topic-decks';
import { listAllActivities } from '@/lib/activities';

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

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LocaleLayoutClient
        locale={locale}
        footerAvailableExerciseTypes={footerAvailableExerciseTypes}
        footerAvailableThemes={footerAvailableThemes}
        footerAvailableLevels={footerAvailableLevels}
        availableActivities={availableActivities}
      >
        {children}
      </LocaleLayoutClient>
    </NextIntlClientProvider>
  );
}
