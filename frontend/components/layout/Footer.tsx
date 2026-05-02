'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Tier-weighted language ordering per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.6 + CLAUDE.md §19.
// Pass 7b F4 honesty discipline: array membership IS the gate — only locales with
// real catalog content link out. Per Section 2 Option D stagger pattern locked at
// Tier 2 i18n recon: per-locale entries are added at the commission that publishes
// that locale's first deck (operator-curated, not runtime content-checked). Tier 2
// Track A registers es + nl in TOPIC_LOCALES + topics-taxonomy.json + middleware
// but does NOT add Footer entries here — those land at Track C Batch 1's first es
// (and later first nl) deck publish.
const FOOTER_LANGUAGES: Array<{ code: string; label: string; tier: 1 | 2 | 3 | 4 }> = [
  { code: 'en', label: 'English', tier: 1 },
  { code: 'de', label: 'German', tier: 1 },
  // Tier 2 (Spanish, Dutch) — added at Track C per-locale stagger when first es / first nl deck publishes
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
    { slug: 'preschool', label: 'preschool' },
    { slug: 'kindergarten', label: 'kindergarten' },
    { slug: 'grade-1', label: 'grade 1' },
    { slug: 'grade-2', label: 'grade 2' },
  ],
  de: [
    { slug: 'tiere', label: 'Tiere' },
    { slug: 'vorschule', label: 'Vorschule' },
    { slug: 'kindergarten', label: 'Kindergarten' },
    { slug: '1-klasse', label: '1. Klasse' },
    { slug: '2-klasse', label: '2. Klasse' },
  ],
};

const FOOTER_EXERCISE_TYPES_BY_LOCALE: Record<string, FooterLink[]> = {
  en: [
    { slug: 'addition', label: 'addition' },
    { slug: 'alphabet-train', label: 'alphabet train' },
    { slug: 'big-small', label: 'big or small' },
    { slug: 'bingo', label: 'bingo' },
    { slug: 'chart-count', label: 'chart count' },
    { slug: 'code-addition', label: 'code addition' },
    { slug: 'crossword', label: 'crossword' },
    { slug: 'cryptogram', label: 'cryptogram' },
    { slug: 'find-and-count', label: 'find and count' },
    { slug: 'find-objects', label: 'find objects' },
    { slug: 'grid-match', label: 'grid match' },
    { slug: 'matching', label: 'matching' },
    { slug: 'math-puzzle', label: 'math puzzle' },
    { slug: 'math-worksheet', label: 'math worksheet' },
    { slug: 'missing-pieces', label: 'missing pieces' },
    { slug: 'more-less', label: 'more or less' },
    { slug: 'odd-one-out', label: 'odd one out' },
    { slug: 'pattern-train', label: 'pattern train' },
    { slug: 'pattern-worksheet', label: 'pattern worksheet' },
    { slug: 'picture-sort', label: 'picture sort' },
    { slug: 'picture-sudoku', label: 'picture sudoku' },
    { slug: 'picture-trail', label: 'picture trail' },
    { slug: 'prepositions', label: 'prepositions' },
    { slug: 'shadow-match', label: 'shadow match' },
    { slug: 'subtraction', label: 'subtraction' },
    { slug: 'treasure-hunt', label: 'treasure hunt' },
    { slug: 'word-guess', label: 'word guess' },
    { slug: 'word-scramble', label: 'word scramble' },
    { slug: 'wordsearch', label: 'word search' },
  ],
  de: [
    { slug: 'addition', label: 'Addition' },
    { slug: 'buchstabenzug', label: 'Buchstabenzug' },
    { slug: 'gross-klein', label: 'groß oder klein' },
    { slug: 'bingo', label: 'Bingo' },
    { slug: 'tabelle-zaehlen', label: 'Tabelle zählen' },
    { slug: 'code-addition', label: 'Code-Addition' },
    { slug: 'kreuzwortraetsel', label: 'Kreuzworträtsel' },
    { slug: 'kryptogramm', label: 'Kryptogramm' },
    { slug: 'suchen-und-zaehlen', label: 'Suchen und zählen' },
    { slug: 'objekte-finden', label: 'Objekte finden' },
    { slug: 'gitter-zuordnung', label: 'Gitter-Zuordnung' },
    { slug: 'zuordnung', label: 'Zuordnung' },
    { slug: 'mathe-raetsel', label: 'Mathe-Rätsel' },
    { slug: 'mathe-arbeitsblatt', label: 'Mathe-Arbeitsblatt' },
    { slug: 'was-fehlt', label: 'Was fehlt' },
    { slug: 'mehr-weniger', label: 'mehr oder weniger' },
    { slug: 'was-passt-nicht', label: 'Was passt nicht' },
    { slug: 'muster-zug', label: 'Musterzug' },
    { slug: 'muster-arbeitsblatt', label: 'Musterarbeitsblatt' },
    { slug: 'bildpfad', label: 'Bildpfad' },
    { slug: 'bildersortierung', label: 'Bildersortierung' },
    { slug: 'bilder-sudoku', label: 'Bilder-Sudoku' },
    { slug: 'praepositionen', label: 'Präpositionen' },
    { slug: 'schatten-zuordnen', label: 'Schatten zuordnen' },
    { slug: 'subtraktion', label: 'Subtraktion' },
    { slug: 'schatzsuche', label: 'Schatzsuche' },
    { slug: 'wort-raten', label: 'Wort raten' },
    { slug: 'buchstabensalat', label: 'Buchstabensalat' },
    { slug: 'wortsuche', label: 'Wortsuche' },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('footer');

  const topics = FOOTER_TOPICS_BY_LOCALE[locale] ?? [];
  const exerciseTypes = FOOTER_EXERCISE_TYPES_BY_LOCALE[locale] ?? [];

  return (
    <footer id="footer" className="bg-cream-50 border-t border-cream-300 py-16 mt-24">
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
