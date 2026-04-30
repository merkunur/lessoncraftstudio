'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Tier-weighted language ordering per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.6 + CLAUDE.md §19.
// At launch only Tier 1 (en, de) has catalog content per Brief B Phase 6 state.
// As Tier 2/3/4 launches populate content, append entries here.
const FOOTER_LANGUAGES: Array<{ code: string; label: string; tier: 1 | 2 | 3 | 4 }> = [
  { code: 'en', label: 'English', tier: 1 },
  { code: 'de', label: 'German', tier: 1 },
  // Tier 2 (Spanish, Dutch) — added when Tier 2 launches
  // Tier 3 (Swedish, Finnish, Norwegian) — added when Tier 3 launches
  // Tier 4 (French, Italian, Danish, Portuguese) — added when Tier 4 launches
];

// By-topic and by-exercise-type columns per §5.6:
// "List only the topics that have real pages backing them. Don't fabricate links to
// pages that don't exist yet — they'd 404 and erode trust."
// Topic-taxonomy pages and per-app landing pages do NOT yet exist as Next.js routes
// (only /[locale]/decks/[slug]/ ships via nginx per Brief B Phase 1). Both columns
// render with the "More topics added regularly" cue + an empty list at launch.
// Populate as routes ship.
const FOOTER_TOPICS: Array<{ slug: string; label: string }> = [];
const FOOTER_EXERCISE_TYPES: Array<{ slug: string; label: string }> = [];

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('footer');

  return (
    <footer className="bg-white border-t border-gray-200 py-16 mt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* By language */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('byLanguage')}</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LANGUAGES.map(lang => (
                <li key={lang.code}>
                  <Link href={`/${lang.code}`} className="text-gray-600 hover:text-gray-900">
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4">{t('moreLanguagesSoon')}</p>
          </div>

          {/* By topic */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('byTopic')}</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_TOPICS.map(topic => (
                <li key={topic.slug}>
                  <Link href={`/${locale}/topic/${topic.slug}/`} className="text-gray-600 hover:text-gray-900">
                    {topic.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-500 mt-4">{t('moreTopicsSoon')}</p>
          </div>

          {/* By exercise type */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">{t('byExerciseType')}</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_EXERCISE_TYPES.map(ex => (
                <li key={ex.slug}>
                  <Link href={`/${locale}/topic/${ex.slug}/`} className="text-gray-600 hover:text-gray-900">
                    {ex.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand strip */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600">{t('copyright')}</p>
          <ul className="flex items-center gap-4 text-sm text-gray-600">
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-gray-900">
                {t('contact')}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-gray-900">
                {t('terms')}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-gray-900">
                {t('privacy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
