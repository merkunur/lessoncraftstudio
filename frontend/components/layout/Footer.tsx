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

// "By topic" + "By exercise type" columns per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.6:
// "List only the topics that have real pages backing them. Don't fabricate links to
// pages that don't exist yet — they'd 404 and erode trust."
//
// Populated in Pass 7b of the taxonomy expansion arc with the non-empty axis-key
// subset per locale, mirroring the operator-curated FOOTER_LANGUAGES pattern.
// "By topic" surfaces theme + educational-level axes (subject-matter discovery);
// "By exercise type" surfaces the exercise-type axis (mechanic discovery) — the
// split mirrors CLAUDE.md §16.5's three-axis schema.
//
// `slug` and `label` are sourced from `frontend/config/topics-taxonomy.json`
// (per-axis-key slug.<locale> + name.<locale>). Update entries when new axis-keys
// gain decks, when new locales' Tier launches, or when taxonomy slugs change.
type FooterLink = { slug: string; label: string };

const FOOTER_TOPICS_BY_LOCALE: Record<string, FooterLink[]> = {
  en: [
    { slug: 'animals', label: 'animals' },
    { slug: 'grade-1', label: 'grade 1' },
    { slug: 'kindergarten', label: 'kindergarten' },
  ],
  de: [
    { slug: '1-klasse', label: '1. Klasse' },
    { slug: '2-klasse', label: '2. Klasse' },
    { slug: 'kindergarten', label: 'Kindergarten' },
  ],
};

const FOOTER_EXERCISE_TYPES_BY_LOCALE: Record<string, FooterLink[]> = {
  en: [
    { slug: 'addition', label: 'addition' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'crossword', label: 'crossword' },
    { slug: 'cryptogram', label: 'cryptogram' },
    { slug: 'pattern-train', label: 'pattern train' },
    { slug: 'picture-sudoku', label: 'picture sudoku' },
    { slug: 'word-scramble', label: 'word scramble' },
  ],
  de: [
    { slug: 'addition', label: 'Addition' },
    { slug: 'bingo', label: 'Bingo' },
    { slug: 'kreuzwortraetsel', label: 'Kreuzworträtsel' },
    { slug: 'kryptogramm', label: 'Kryptogramm' },
    { slug: 'muster-zug', label: 'Musterzug' },
    { slug: 'bildpfad', label: 'Bildpfad' },
    { slug: 'bilder-sudoku', label: 'Bilder-Sudoku' },
    { slug: 'buchstabensalat', label: 'Buchstabensalat' },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('footer');

  const topics = FOOTER_TOPICS_BY_LOCALE[locale] ?? [];
  const exerciseTypes = FOOTER_EXERCISE_TYPES_BY_LOCALE[locale] ?? [];

  return (
    <footer className="bg-cream-50 border-t border-cream-300 py-16 mt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* By language */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 mb-4">{t('byLanguage')}</h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LANGUAGES.map(lang => (
                <li key={lang.code}>
                  <Link href={`/${lang.code}`} className="text-ink-600 hover:text-ink-900">
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-500 mt-4">{t('moreLanguagesSoon')}</p>
          </div>

          {/* By topic */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 mb-4">{t('byTopic')}</h4>
            <ul className="space-y-2 text-sm">
              {topics.map(topic => (
                <li key={topic.slug}>
                  <Link href={`/${locale}/topic/${topic.slug}/`} className="text-ink-600 hover:text-ink-900">
                    {topic.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-500 mt-4">{t('moreTopicsSoon')}</p>
          </div>

          {/* By exercise type */}
          <div>
            <h4 className="font-display text-sm font-semibold text-ink-900 mb-4">{t('byExerciseType')}</h4>
            <ul className="space-y-2 text-sm">
              {exerciseTypes.map(ex => (
                <li key={ex.slug}>
                  <Link href={`/${locale}/topic/${ex.slug}/`} className="text-ink-600 hover:text-ink-900">
                    {ex.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand strip */}
        <div className="mt-16 pt-8 border-t border-cream-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-ink-600">{t('copyright')}</p>
          <ul className="flex items-center gap-4 text-sm text-ink-600">
            <li>
              <Link href={`/${locale}/contact`} className="hover:text-ink-900">
                {t('contact')}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={`/${locale}/terms`} className="hover:text-ink-900">
                {t('terms')}
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              <Link href={`/${locale}/privacy`} className="hover:text-ink-900">
                {t('privacy')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
