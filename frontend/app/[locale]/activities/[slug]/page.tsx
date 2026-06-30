import { Metadata } from 'next';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { TOPIC_ENABLED_LOCALES, TopicEnabledLocale } from '@/config/topic-locales';

/* Map manifest `alignment.grade` ("K"/"1"/"2"/"3") to the localized
   `seo.educational_level.*` key. Reused across activities of all engines. */
const GRADE_KEY_MAP: Record<string, string> = {
  'K': 'kindergarten',
  '1': 'grade_1',
  '2': 'grade_2',
  '3': 'grade_3',
};

/* Per-locale grade override — the visible grade chip + JSON-LD level normally come
   from the shared `alignment.grade` (= the US CCSS grade). Where a national curriculum
   places the content in a DIFFERENT grade (e.g. German grades by Zahlenraum: bis-1000
   arithmetic is Klasse 3, not the CCSS-Grade-2 of 2.NBT.B.7), map activity-id → locale →
   grade here. EN + any locale/activity without an entry are unaffected. Sits beside the
   route's other localization maps (EDUCATIONAL_FRAMEWORK_BY_LOCALE, strand-names). */
const GRADE_OVERRIDE: Record<string, Record<string, string>> = {
  'place-value-regroup.subtract-decompose.2-nbt-b-7': { de: '3' },        // bis-1000 subtraction (borrow) → DE Klasse 3
  'place-value-regroup.add-compose-hundred.2-nbt-b-7': { de: '3' },       // bis-1000 add (carry to hundreds) → DE Klasse 3
  'place-value-regroup.subtract-decompose-hundred.2-nbt-b-7': { de: '3' },// bis-1000 borrow across zero → DE Klasse 3
  'pond-juice.pour-measure.3-md-a-2': { de: '2' },                        // Hohlmaße/Liter (whole-l 0-10, no ml) → DE Klasse 2 (ml/Umrechnung = Klasse 3)
  'bundle-bot.bundle-machine.1-nbt-b-2-a': { de: '2' },                   // two-digit Stellenwert (20-49, multiple tens) → DE Klasse 2 (Klasse 1 = ZR bis 20)
  'tense.past-present-future.l-1-1-e': { de: '2' },                       // Zeitformen 3-way contrast + werden-future → DE Klasse 2 (Klasse 1 = nur Gegenwart)
  'sentence-builder.build-a-sentence.l-1-1-j': { de: '2' },               // Satzbau/Wortreihenfolge reorder task → DE Klasse 2 (mastery by end of Klasse 2)
  'pronoun.case.l-1-1-d': { de: '3' },                                    // case-correct pronoun-form choice (er/ihn) → DE Klasse 3 (Fall-arbeit is Klasse 3/4)
  'olive-kind-of.category-attribute.l-1-5-b': { de: '2' },                // Oberbegriff/Hyperonym abstraction → DE Klasse 2 (EN Grade 1 placement doesn't transfer)
  'vera-verb-match.be-agreement.l-1-1-c': { de: '2' },                    // reflective Subjekt-Verb-Kongruenz (bin/ist/sind) → DE Klasse 2 (K-1 kids speak it; the grammar task is Klasse 2)
  'hazel-word-bridge.joining-words.l-1-1-g': { de: '3' },                 // selection-by-meaning across 4 Bindewörter incl. causal „denn" + Pflichtkomma → DE Klasse 3
  'cleo-packing-list.series-commas.l-1-2-b': { de: '3' },                 // Komma bei Aufzählung = first comma rule, DE Lehrplan Klasse 3 (K1/2 = only Satzschlusszeichen)
  'robin-mirror.reflexive.l-2-1-c': { de: '3' },                          // Reflexivpronomen as a category (beuge zur Person) → DE Klasse 3 (US Grade 2 too low)
  'rusty-yesterday.irregular-past.l-2-1-d': { de: '3' },                  // starke-vs-schwache Verben + Präteritum form-building → DE Klasse 3
  'roary-roar-meter.shades.l-2-5-b': { de: '3' },                         // Bedeutungsnuancen (Abstufen innerhalb einer Bedeutung) → DE Klasse 3 (K2 = clear opposites)
  'wren-question-window.question-words.l-k-1-d': { de: '1' },             // Fragewörter = Anfangsunterricht Klasse 1 (de chip „Klasse 1", NOT „Kindergarten"); en stays Kindergarten
  'echo-grove.match-the-rune.3-oa-a-1': { de: '2' },                      // Multiplikation als gleiche Gruppen / kleines Einmaleins = DE Klasse 2 (US Grade 3 a year higher)
  'maple-bakery.share.3-oa-a-2': { de: '2' },                             // Division (Verteilen/Aufteilen, ohne Rest) introduced alongside Einmaleins = DE Klasse 2
  'comet-kangaroo.tens-hundreds.2-nbt-b-8': { de: '3' },                  // 10/100 mehr-weniger im ZR bis 1000 = DE Klasse 3 (Tausenderraum; Klasse 2 = bis 100)
  'track-repair.count-to-120.1-nbt-a-1': { de: '2' },                     // Orientierung am Zahlenstrahl bis 100 + skip-counting = DE Klasse 2 (ZR bis 20 = Klasse 1); US Grade 1 offset
  'bos-berry-pantry.slingshot-tens.1-nbt-b-2': { de: '2' },               // read/match two-digit Stellenwert (values to 85, multiple tens, ZR bis 100) → DE Klasse 2 (Klasse 1 = ZR bis 20); bundle-bot precedent
  'vet-diagnosis.word-problems.1-oa-a-1': { de: '2' },                    // Sachaufgaben ZR bis 20 BUT grade follows STRUCTURE: Anfang-unbekannt + additiver Vergleich = schwierigste Klasse-2 Sachaufgabentypen; length-sibling precedent
  'bramble.holds-more.k-md-a-2': { de: '1' },                             // K capacity: German „Kindergarten"=daycare (not a school stage) → Klasse 1; direkter Größenvergleich is Klasse-1 Lehrplan; en stays Kindergarten (the K-cluster K-label pattern)
  'pip-museum.curate-wing.k-g-a-2': { de: '1' },                          // K geometry shape-naming → Klasse 1 (Formen erkennen/benennen = Kern-Geometrie Klasse 1); en stays Kindergarten (K-cluster pattern)
  'chuffer.rail-decompose.k-oa-a-3': { de: '1' },                         // K number-decompose (Zahlzerlegung bis 10) → Klasse 1 (Kernstoff erste Wochen); en stays Kindergarten (K-cluster pattern)
  'friendship-bridge.compare-balance.k-cc-c-6': { de: '1' },              // K compare-sets-by-matching (Mengen vergleichen mehr/weniger/gleich viel) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'necklace.bead-string.k-cc-b-4': { de: '1' },                           // K count-to-cardinality (Anzahl durch Zählen + Anzahlinvarianz) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'star-stitcher.connect-sequence.k-cc-a-2': { de: '1' },                 // K count-forward-from-N (Weiterzählen ab einer Zahl) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'mochi-feast.count-out.k-cc-b-5': { de: '1' },                          // K count-out-N / Menge herstellen (eine vorgegebene Anzahl abzählen) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'ten-tank.ten-frame-tank.k-nbt-a-1': { de: '1' },                       // K teen numbers 11-19 as ten+ones (Bündeln) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'wondering-jar.estimate-jar.k-cc-b-5': { de: '1' },                     // K estimate-then-count (Anzahlen schätzen) → Klasse 1; en stays Kindergarten (K-cluster pattern)
  'pips-round.mail-route.k-cc-a-3': { de: '1' },                          // K numeral reading/recognition (Zahlen lesen bis 20) → Klasse 1; en stays Kindergarten (K-cluster pattern)
};
function effGrade(row: ActivityRow, locale: string): string {
  return (locale !== 'en' && GRADE_OVERRIDE[row.id] && GRADE_OVERRIDE[row.id][locale]) || row.alignment.grade;
}

/* Per-activity strand/domain override — the shared `localizeStrand` maps the CCSS
   strand, but where a national curriculum files the content under a DIFFERENT domain
   (e.g. German splits CCSS "Measurement & Data": a bar-graph is „Daten und Häufigkeit",
   NOT „Größen und Messen"), map activity-id → locale → domain name here. Other locales/
   activities fall through to localizeStrand unchanged. Display-only (chip + JSON-LD
   teaches/targetDescription); related-activity matching keeps the raw alignment.strand. */
const STRAND_OVERRIDE: Record<string, Record<string, string>> = {
  'graph-it.bar-graph.2-md-d-10': { de: 'Daten und Häufigkeit' },   // bar graph = data, not Größen
  'line-plot.read.2-md-d-9': { de: 'Daten und Häufigkeit' },        // line plot of measured lengths = data, not Größen
  'hoppers-number-line.jump-sums.2-md-b-6': { de: 'Zahlen und Rechnen im Zehnersystem' }, // add/sub on a number line = arithmetic, not Größen
  'mosaic-menders.area-match.3-md-c-6': { de: 'Raum und Form' },    // Flächeninhalt = Raum und Form in KMK, not Größen und Messen
  'olive-kind-of.category-attribute.l-1-5-b': { de: 'Wortschatz untersuchen' }, // Oberbegriffe = Wortschatzarbeit, not Grammatik („Sprache untersuchen")
  'cleo-packing-list.series-commas.l-1-2-b': { de: 'Richtig schreiben' }, // Zeichensetzung = orthography/Rechtschreiben, not „Sprache untersuchen"
  'wally-capital-crane.special-names.l-2-2-a': { de: 'Richtig schreiben' }, // Nomen-Großschreibung = orthography/Rechtschreiben, not „Sprache untersuchen"
  'roary-roar-meter.shades.l-2-5-b': { de: 'Wortschatz untersuchen' },    // Bedeutungsnuancen = vocabulary work, not grammar
  'ziggy-odd-one-out.category.l-1-5-a': { de: 'Wortschatz untersuchen' }, // Wortfelder/Kategorien = vocabulary work, not grammar
  'halfway-harbors.nearest.3-nbt-a-1': { de: 'Zahlen und Operationen' },  // Runden = KMK Leitidee „Zahlen und Operationen", broader than the auto-localized „…Zehnersystem"
  'echo-grove.match-the-rune.3-oa-a-1': { de: 'Zahlen und Operationen' }, // Multiplikation = KMK Leitidee „Zahlen und Operationen"; literal „Rechnen und algebraisches Denken" reads wrong (Sekundarstufe term)
  'maple-bakery.share.3-oa-a-2': { de: 'Zahlen und Operationen' },        // Division = same KMK Leitidee „Zahlen und Operationen" (pairs with multiplication)
  'winter-piles.draw-partition.2-oa-c-4': { de: 'Zahlen und Operationen' }, // Punktefeld/wiederholte Addition = foundation of multiplication, same Leitidee
  'comet-kangaroo.tens-hundreds.2-nbt-b-8': { de: 'Zahlen und Operationen' }, // Stellenwert/Orientierung im Tausenderraum lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'mending-fences.mend-board.3-md-d-8': { de: 'Raum und Form' },          // Umfang+Fläche = geometric figure property (KMK „Raum und Form"), like the area activity — not the free-measured Längen of „Größen und Messen"
  'track-repair.count-to-120.1-nbt-a-1': { de: 'Zahlen und Operationen' }, // Orientierung am Zahlenstrahl / Zahlvorstellung lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'gus-snack-cart.within-100.2-nbt-b-5': { de: 'Zahlen und Operationen' }, // add/sub within 100 = Rechnen/Operationen → KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'bos-berry-pantry.slingshot-tens.1-nbt-b-2': { de: 'Zahlen und Operationen' }, // Stellenwert (Zehner+Einer lesen) lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
  'vet-diagnosis.word-problems.1-oa-a-1': { de: 'Zahlen und Operationen' }, // Sachaufgaben add/sub = KMK Leitidee „Zahlen und Operationen"; „algebraisches Denken" is Sek-I framing, not a Primarstufe Leitidee
  'chuffer.rail-decompose.k-oa-a-3': { de: 'Zahlen und Operationen' }, // Zahlzerlegung = KMK Leitidee „Zahlen und Operationen" (OA calque „algebraisches Denken" is Sek-I)
  'ten-tank.ten-frame-tank.k-nbt-a-1': { de: 'Zahlen und Operationen' }, // teen numbers as Zehner+Einer (Bündeln) lives inside KMK Leitidee „Zahlen und Operationen" (not the base-ten calque)
};
function effStrand(row: ActivityRow, locale: string): string {
  return (STRAND_OVERRIDE[row.id] && STRAND_OVERRIDE[row.id][locale]) || localizeStrand(row.alignment.strand, locale);
}
import {
  resolveActivitySlug,
  listActivitySitemapEntries,
  hreflangAlternatesForRow,
  listRelatedActivities,
  otherLocalesForRow,
  ActivityRow,
} from '@/lib/activities';
import BreadcrumbTrail from '@/components/breadcrumbs/BreadcrumbTrail';
import { ActivityIframe } from '@/components/activities/ActivityIframe';
import TopicFaq from '@/components/catalog/TopicFaq';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { buildBreadcrumbSchema, BreadcrumbCrumb } from '@/lib/seo/breadcrumb-schema';
import { localizeStrand } from '@/lib/seo/strand-names';
import { getHreflangCode } from '@/lib/seo/hreflang';
import { getActivityContent, gradeToAgeRange } from '@/lib/seo/activity-content';
import { LOCALE_NAMES, SupportedLocale } from '@/config/locales';
import { ogLocaleMap } from '@/lib/schema-generator';

// Internal-link-mesh strip headings (Part 2). Per-locale nav labels, inlined
// here following the ACTIVITIES_SECTION_LABEL precedent (single-consumer
// chrome). `{code}` in PRACTICE_HEADING is interpolated with the CC code.
const RELATED_HEADING: Record<string, string> = {
  en: 'More activities to try',
  de: 'Weitere Aufgaben zum Ausprobieren',
  es: 'Más actividades para probar',
  fr: 'Plus d\'activités à essayer',
  it: 'Altre attività da provare',
  pt: 'Mais atividades para experimentar',
  nl: 'Meer activiteiten om te proberen',
  sv: 'Fler aktiviteter att prova',
  da: 'Flere aktiviteter at prøve',
  no: 'Flere aktiviteter å prøve',
  fi: 'Lisää tehtäviä kokeiltavaksi',
};

const PRACTICE_HEADING: Record<string, string> = {
  en: 'Practice this standard',
  de: 'Diesen Standard üben',
  es: 'Practica este estándar',
  fr: 'Travailler ce standard',
  it: 'Esercita questo standard',
  pt: 'Pratique este padrão',
  nl: 'Oefen deze standaard',
  sv: 'Öva på denna standard',
  da: 'Øv denne standard',
  no: 'Øv på denne standarden',
  fi: 'Harjoittele tätä standardia',
};

const PRACTICE_LINK: Record<string, string> = {
  en: 'See all {code} activities',
  de: 'Alle {code}-Aufgaben ansehen',
  es: 'Ver todas las actividades de {code}',
  fr: 'Voir toutes les activités {code}',
  it: 'Vedi tutte le attività {code}',
  pt: 'Ver todas as atividades de {code}',
  nl: 'Bekijk alle {code}-activiteiten',
  sv: 'Se alla {code}-aktiviteter',
  da: 'Se alle {code}-aktiviteter',
  no: 'Se alle {code}-aktiviteter',
  fi: 'Katso kaikki {code}-tehtävät',
};

const OTHER_LANGS_HEADING: Record<string, string> = {
  en: 'Available in other languages',
  de: 'In anderen Sprachen verfügbar',
  es: 'Disponible en otros idiomas',
  fr: 'Disponible dans d\'autres langues',
  it: 'Disponibile in altre lingue',
  pt: 'Disponível em outros idiomas',
  nl: 'Beschikbaar in andere talen',
  sv: 'Tillgängligt på andra språk',
  da: 'Tilgængelig på andre sprog',
  no: 'Tilgjengelig på andre språk',
  fi: 'Saatavilla muilla kielillä',
};

// "Activities" section label per locale — used for the middle breadcrumb
// crumb on individual activity landing pages. Same string as the title of
// /<locale>/activities/. Inlined here (not next-intl) since it's read by
// one consumer; promote to a message file when a second consumer appears.
const ACTIVITIES_SECTION_LABEL: Record<string, string> = {
  en: 'Activities',
  de: 'Aufgaben',
  es: 'Actividades',
  fr: 'Activités',
  it: 'Attività',
  pt: 'Atividades',
  nl: 'Activiteiten',
  sv: 'Aktiviteter',
  da: 'Aktiviteter',
  no: 'Aktiviteter',
  fi: 'Tehtävät',
};

/**
 * Activity landing page route — one URL per (manifest row × locale).
 *
 * Mirrors the topic-page pattern:
 *   - ISR with revalidate=3600
 *   - generateStaticParams for build-time static generation
 *   - generateMetadata for per-locale title/description/hreflang
 *   - SSR'd content + iframe-embedded mini-tool
 *
 * Common Core code is metadata only — never in the URL slug (native-language
 * slugs across all 11 locales per CLAUDE.md §17.4), never visible to kids.
 * Surfaced in a subtle "Grade K · Counting & Cardinality · K.CC.B.4" chip
 * on the landing page (teacher-facing) and in JSON-LD educationalAlignment
 * for SEO / structured-data search.
 */
export const revalidate = 3600;

// SEO URLs go through `canonicalUrl()` / `localePath()` from `@/lib/seo/url`
// to enforce the no-trailing-slash invariant. `BASE_URL` retained as alias
// of `CANONICAL_HOST` for the activity-sitemap-entries helper which builds
// hreflang URLs from a base argument.
const BASE_URL = CANONICAL_HOST;

interface PageParams {
  locale: string;
  slug: string;
}

function isTopicLocale(l: string): l is TopicEnabledLocale {
  return (TOPIC_ENABLED_LOCALES as readonly string[]).includes(l);
}

export async function generateStaticParams(): Promise<PageParams[]> {
  try {
    const entries = await listActivitySitemapEntries();
    return entries.map(({ locale, slug }) => ({ locale, slug }));
  } catch (err) {
    console.warn('[activities/[slug]] generateStaticParams failed:', (err as Error).message);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!isTopicLocale(params.locale)) return {};
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) return {};
  const canonical = canonicalUrl(localePath(params.locale, 'activities', params.slug));
  return {
    title: row.page_title[params.locale],
    description: row.page_intro[params.locale],
    alternates: {
      canonical,
      languages: await hreflangAlternatesForRow(row, BASE_URL),
    },
    openGraph: {
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      url: canonical,
      siteName: 'LessonCraftStudio',
      // og:locale / og:locale:alternate kept consistent with the hreflang set:
      // the alternates mirror otherLocalesForRow (the same honest-filtered sibling
      // locales emitted by hreflangAlternatesForRow), mapped to OG locale codes.
      locale: ogLocaleMap[params.locale] || params.locale,
      alternateLocale: (await otherLocalesForRow(row, params.locale)).map(
        ({ locale }) => ogLocaleMap[locale] || locale,
      ),
      type: 'article',
      images: [
        {
          url: `${CANONICAL_HOST}/og-homepage.png`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: 'LessonCraftStudio — K-3 worksheets in 11 languages',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: row.page_title[params.locale],
      description: row.page_intro[params.locale],
      images: [{ url: `${CANONICAL_HOST}/og-homepage.png`, alt: 'LessonCraftStudio — K-3 worksheets in 11 languages' }],
    },
    robots: INDEXABLE_ROBOTS,
  };
}

// Per-locale curriculum-framework NAME for the human-/crawler-facing
// `educationalFramework`. The internal CCSS code (row.alignment.code) stays the
// machine anchor in `targetName` + the /standards/<code> hub. EN keeps Common
// Core; non-EN cite each country's national framework (§A.13.49). Names only —
// no national code (operator decision 2026-05-31).
const EDUCATIONAL_FRAMEWORK_BY_LOCALE: Record<string, string> = {
  en: 'Common Core State Standards',
  de: 'Lehrplan',
  fr: 'Programmes officiels',
  es: 'Planes y programas de estudio (SEP)',
  pt: 'BNCC',
  it: 'Indicazioni nazionali',
  nl: 'SLO-kerndoelen',
  sv: 'Lgr22',
  da: 'Fælles Mål',
  no: 'LK20',
  fi: 'OPS 2014',
};

function jsonLdFor(row: ActivityRow, locale: string): string {
  const canonical = canonicalUrl(localePath(locale, 'activities', row.slug[locale]));
  const grade = effGrade(row, locale);
  const ageRange = gradeToAgeRange(grade);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: row.page_title[locale],
    description: row.page_intro[locale],
    inLanguage: locale,
    learningResourceType: 'Interactive activity',
    educationalUse: 'interactive activity',
    educationalLevel: grade,
    teaches: effStrand(row, locale),
    isAccessibleForFree: true,
    image: `${CANONICAL_HOST}/og-homepage.png`,
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'educationalSubject',
      targetName: row.alignment.code,
      targetDescription: effStrand(row, locale),
      educationalFramework: EDUCATIONAL_FRAMEWORK_BY_LOCALE[locale] || 'Common Core State Standards',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
    },
    creator: {
      '@type': 'Organization',
      name: 'LessonCraftStudio',
      url: CANONICAL_HOST,
    },
    url: canonical,
  };
  if (ageRange) data.typicalAgeRange = ageRange;
  return JSON.stringify(data);
}

export default async function ActivityPage({ params }: { params: PageParams }) {
  if (!isTopicLocale(params.locale)) notFound();
  const row = await resolveActivitySlug(params.slug, params.locale);
  if (!row) notFound();

  /* Teacher-chip grade label: reuse the existing seo.educational_level.*
     table (complete in all 11 locales). The manifest's alignment.grade is
     a literal "K"/"1"/"2"/"3"; lookup the localized phrase via the map.
     The CC code (RF.K.2.B and siblings) stays English — it's a CCSS
     identifier; the strand NAME is localized via localizeStrand (below,
     §A.13.56 / curriculum-domain fix). */
  const tSeo = await getTranslations({ locale: params.locale, namespace: 'seo' });
  const effectiveGrade = effGrade(row, params.locale);
  const gradeKey = GRADE_KEY_MAP[effectiveGrade];
  const localizedGrade = gradeKey
    ? tSeo(`educational_level.${gradeKey}`)
    : `Grade ${effectiveGrade}`;

  // v7.5 cache buster: bump on any mini tools/*-activity.html change so
  // browsers fetch fresh wrapper HTML on every navigation. Defends
  // against iOS Safari + Android WebView page-cache/bfcache quirks that
  // can ignore upstream Cache-Control: max-age=0 under back-forward
  // restoration. Same discipline as §A.13.42 lcs-shell.css?v=N bump
  // applied here to the iframe-loaded wrapper URL (the only un-busted
  // link in the activity-page → mini-tool chain). The wrapper reads
  // only `activity` / `lang` / `embed` params; `v` is harmless to it.
  const ACTIVITY_WRAPPER_VERSION = '9.63';

  const iframeSrc =
    `/mini-tools/${row.tool}.html?v=${ACTIVITY_WRAPPER_VERSION}` +
    `&activity=${encodeURIComponent(row.id)}` +
    `&lang=${encodeURIComponent(params.locale)}` +
    `&embed=1`;

  const sectionLabel =
    ACTIVITIES_SECTION_LABEL[params.locale] ?? ACTIVITIES_SECTION_LABEL.en;

  // Crawlable editorial body (3-tier resolve, mirrors topic-prose). Returns
  // null for locales without an activity-content file (non-EN until Part 3),
  // in which case the page keeps its intro-only shape — never English prose
  // on a non-EN page.
  const content = await getActivityContent(params.locale, row);

  // Internal-link mesh (Part 2) — ships for all 11 locales (navigation).
  const related = await listRelatedActivities(row, params.locale);
  const otherLangs = await otherLocalesForRow(row, params.locale);
  const standardsHref = localePath(params.locale, 'standards', row.alignment.code);
  const relatedHeading = RELATED_HEADING[params.locale] ?? RELATED_HEADING.en;
  // Localized CCSS strand name (R4 / §20.8) — the raw English domain name
  // (e.g. "Counting & Cardinality") was leaking into the chip + FAQ on non-EN
  // pages. Feeds the visible chip + TopicFaq (FAQPage JSON-LD) below.
  const localizedStrand = effStrand(row, params.locale);

  // BreadcrumbList JSON-LD (R12) — mirrors the visible BreadcrumbTrail
  // (Home › Activities › title).
  const tBreadcrumb = await getTranslations({ locale: params.locale, namespace: 'topicPage.breadcrumb' });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: tBreadcrumb('home'), path: localePath(params.locale) },
    { name: sectionLabel, path: localePath(params.locale, 'activities') },
    { name: row.page_title[params.locale], path: localePath(params.locale, 'activities', params.slug) },
  ] as BreadcrumbCrumb[]);
  const practiceHeading = PRACTICE_HEADING[params.locale] ?? PRACTICE_HEADING.en;
  const practiceLink = (PRACTICE_LINK[params.locale] ?? PRACTICE_LINK.en).replace(
    '{code}',
    row.alignment.code,
  );
  const otherLangsHeading =
    OTHER_LANGS_HEADING[params.locale] ?? OTHER_LANGS_HEADING.en;

  // v7 cascade (post-K.NBT.A.1 prototype approval): all activities render
  // the operator-locked sage-field layout. The v6.x prototype gate
  // (`isTenFramePrototype` check on alignment.code) was removed once the
  // design was approved. Card height = 2/3 of viewport via the inline
  // <style> below + the iframe-side rules now in lcs-shell.css scoped to
  // .lcs-app.activity. Engine-specific cell/tile scaling stays per-wrapper.
  return (
    <main className="bg-cream-50 pt-4 pb-4 px-4 md:pt-6 md:pb-6 md:px-8 lg:pt-8">
      <article className="mx-auto">
        <BreadcrumbTrail
          locale={params.locale}
          trail={[
            { href: `/${params.locale}/activities/`, label: sectionLabel },
            { label: row.page_title[params.locale] },
          ]}
        />
        <section
          className="lcs-prototype-play-area relative overflow-hidden mt-3 md:mt-4 rounded-2xl md:rounded-3xl bg-[#DBE7DF] px-4 pt-5 pb-12 md:px-8 md:pt-7 md:pb-16 shadow-[0_2px_8px_rgba(20,30,28,0.08),_0_28px_64px_rgba(20,30,28,0.12)]"
          aria-label={row.page_title[params.locale]}
        >
          {/* Adult chrome — tightened, sits ON the sage field. Header
              feels integrated with the play area rather than stacked
              above it. */}
          <header className="relative z-10 mb-4 md:mb-5 text-center">
            <h1 className="font-display font-semibold text-base md:text-lg text-teal-800 leading-tight mb-0.5">
              {row.page_title[params.locale]}
            </h1>
            <p className="hidden lg:block text-xs text-ink-600/70 max-w-2xl mx-auto leading-snug mb-2">
              {row.page_intro[params.locale]}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cream-100/80 text-teal-800 text-xs font-medium backdrop-blur-sm">
              <span>{localizedGrade}</span>
              <span className="text-teal-800/40">·</span>
              <span className="hidden sm:inline">{localizedStrand}</span>
              <span className="hidden sm:inline text-teal-800/40">·</span>
              {/* Code is clickable: navigates to the per-standard landing
                  page (/[locale]/standards/<code>) which aggregates every
                  activity aligned to this code. Internal-linking surface
                  per external SEO audit 2026-05-27. */}
              <Link
                href={`/${params.locale}/standards/${row.alignment.code}`}
                className="font-mono underline decoration-dotted underline-offset-2 hover:decoration-solid"
              >
                {row.alignment.code}
              </Link>
            </div>
          </header>

          {/* Desktop keeps the 66.67vh floor (fills the wide card nicely).
              MOBILE FIT (mobile-QA standard §A.13.55, 2026-06-02): the old
              85vh mobile floor forced the iframe far taller than short
              activities, leaving a big blank band below the card (audit
              emptyBand 150-264px on phones). Lower to a small px floor so
              ActivityIframe's postMessage auto-resize (§20.3) sizes the
              iframe to the card's real content height; pairs with
              lcs-shell.css dropping the card's mobile min-height. */}
          <style dangerouslySetInnerHTML={{ __html:
            '.lcs-prototype-iframe-wrapper iframe { min-height: 66.67vh !important; }' +
            '@media (max-width: 767px) { .lcs-prototype-iframe-wrapper iframe { min-height: 360px !important; } }'
          }} />
          <div className="lcs-prototype-iframe-wrapper relative z-10">
            <ActivityIframe src={iframeSrc} title={row.page_title[params.locale]} />
          </div>

          {/* Soft cream wave at the base of the field — gentle "foam"
              that gives the field life without becoming a graphic.
              Absolutely positioned over the field's bottom padding;
              pointer-events:none so it never blocks the iframe. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 right-0 w-full h-[60px] md:h-[72px] pointer-events-none"
          >
            <path
              d="M0,50 C200,15 380,75 600,40 C820,5 1000,70 1200,35 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.62"
            />
            <path
              d="M0,60 C220,30 420,80 640,52 C860,24 1040,76 1200,50 L1200,80 L0,80 Z"
              fill="#FCFAF4"
              opacity="0.45"
            />
          </svg>
        </section>

        {/* Crawlable editorial body below the play surface. The interactive
            engine lives in an iframe (invisible to crawlers), so this SSR'd
            prose is the activity's SEO surface: an always-rendered intro
            paragraph, then the 3-tier content sections (when available for
            the locale), then a 3-item FAQ with FAQPage JSON-LD. */}
        <section className="activity-detail mx-auto max-w-2xl mt-8 px-1">
          <p className="text-base text-ink-700 leading-relaxed">
            {row.page_intro[params.locale]}
          </p>

          {content && (
            <div className="mt-8 space-y-8">
              {content.proseParagraphs.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.about}
                  </h2>
                  {content.proseParagraphs.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-3'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {content.whatsInside.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.whatsInside}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
                    {content.whatsInside.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.howToPlay.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.howToPlay}
                  </h2>
                  {content.howToPlay.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-2'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {content.practices.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.practices}
                  </h2>
                  <ul className="list-disc pl-5 space-y-1 text-base text-ink-700 leading-relaxed">
                    {content.practices.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              {content.learningGoals.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3">
                    {content.labels.learningGoals}
                  </h2>
                  {content.learningGoals.map((para, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-base text-ink-700 leading-relaxed'
                          : 'text-base text-ink-700 leading-relaxed mt-2'
                      }
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
        <div className="mx-auto max-w-2xl px-1">
          <TopicFaq
            locale={params.locale}
            variant="activity"
            title={row.page_title[params.locale]}
            grade={localizedGrade}
            strand={localizedStrand}
            pageUrl={canonicalUrl(localePath(params.locale, 'activities', params.slug))}
          />
        </div>

        {/* Internal-link mesh (Part 2) — crawlable <a> lists tying every
            activity to its siblings, its Common Core standard hub, and its
            own translations. Real anchors (not JS buttons) so they feed the
            internal link graph. Ships for all 11 locales. */}
        <div className="mx-auto max-w-2xl px-1 mt-10 space-y-10">
          {/* Practice this standard — explicit crawl-bait anchor to the hub. */}
          <section aria-labelledby="activity-practice-heading">
            <h2
              id="activity-practice-heading"
              className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3"
            >
              {practiceHeading}
            </h2>
            <Link
              href={standardsHref}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-800 font-semibold underline decoration-2 underline-offset-2"
            >
              {practiceLink}
              <span aria-hidden="true">→</span>
            </Link>
          </section>

          {/* Related activities — same strand, then same grade. */}
          {related.length > 0 && (
            <section aria-labelledby="activity-related-heading">
              <h2
                id="activity-related-heading"
                className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-4"
              >
                {relatedHeading}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => {
                  const rTitle = r.page_title[params.locale];
                  const rSlug = r.slug[params.locale];
                  if (!rTitle || !rSlug) return null;
                  return (
                    <li key={r.id}>
                      <Link
                        href={localePath(params.locale, 'activities', rSlug)}
                        className="flex items-center gap-2 rounded-2xl bg-cream-50 hover:bg-teal-50 px-4 py-3 text-teal-800 font-medium shadow-sm transition-colors"
                      >
                        <span className="font-mono text-xs text-teal-500">
                          {r.alignment.code}
                        </span>
                        <span>{rTitle}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Available in other languages — visible hreflang siblings. */}
          {otherLangs.length > 0 && (
            <section aria-labelledby="activity-langs-heading">
              <h2
                id="activity-langs-heading"
                className="font-display text-xl md:text-2xl font-semibold text-ink-900 mb-3"
              >
                {otherLangsHeading}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {otherLangs.map(({ locale, href }) => (
                  <li key={locale}>
                    <a
                      href={href}
                      hrefLang={getHreflangCode(locale)}
                      className="inline-flex items-center px-3 py-1.5 rounded-full bg-cream-50 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
                    >
                      {LOCALE_NAMES[locale as SupportedLocale] ?? locale}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* LearningResource structured data — plain <script> so it is present
            in the server-rendered HTML (crawlable without JS execution),
            unlike next/script's afterInteractive injection. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdFor(row, params.locale) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </article>
    </main>
  );
}
