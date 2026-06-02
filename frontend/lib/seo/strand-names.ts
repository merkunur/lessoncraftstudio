/**
 * Localized CCSS strand / domain names (audit P2-01 / CLAUDE.md §20.8).
 *
 * Activity + standards manifests carry `alignment.strand` as a raw ENGLISH
 * CCSS domain name (e.g. "Counting & Cardinality"). It was rendered verbatim
 * on every page — including non-EN activity/standards pages — leaking English
 * into the visible chip, the editorial prose, the FAQ, and the JSON-LD
 * `teaches` / `educationalAlignment.targetDescription`. This table localizes
 * the human-readable domain NAME (the CCSS *code* itself, e.g. "K.CC.B.4",
 * stays as-is — it's the identifier).
 *
 * Keyed by the verbatim English strand string used in the manifests (kept in
 * sync with the `byStrand` template keys in `activity-content.ts`). The two
 * base-ten spellings ("&" vs "and") both alias to the canonical "&" form.
 *
 * Register: a natural pedagogical translation of the domain name — these are
 * CCSS domain labels rendered for international teachers, not a curriculum-
 * framework credibility surface (so NOT the §A.13.49 framework-register).
 *
 * [NSR-FLAG][sv][da][no][fi] — Nordic + Finnic translations authored at
 * best-effort per §17.5.1; flag for native-speaker review.
 */

export const STRAND_NAMES: Record<string, Partial<Record<string, string>>> = {
  'Counting & Cardinality': {
    en: 'Counting & Cardinality',
    de: 'Zählen und Anzahl',
    es: 'Conteo y cardinalidad',
    fr: 'Dénombrement et cardinalité',
    it: 'Contare e cardinalità',
    pt: 'Contagem e cardinalidade',
    nl: 'Tellen en aantal',
    sv: 'Räkning och antal',
    da: 'Tælling og antal',
    no: 'Telling og antall',
    fi: 'Lukumäärä ja laskeminen',
  },
  'Operations & Algebraic Thinking': {
    en: 'Operations & Algebraic Thinking',
    de: 'Rechnen und algebraisches Denken',
    es: 'Operaciones y pensamiento algebraico',
    fr: 'Opérations et pensée algébrique',
    it: 'Operazioni e pensiero algebrico',
    pt: 'Operações e pensamento algébrico',
    nl: 'Bewerkingen en algebraïsch denken',
    sv: 'Räknesätt och algebraiskt tänkande',
    da: 'Regnearter og algebraisk tænkning',
    no: 'Regnearter og algebraisk tenkning',
    fi: 'Laskutoimitukset ja algebrallinen ajattelu',
  },
  'Geometry': {
    en: 'Geometry',
    de: 'Geometrie',
    es: 'Geometría',
    fr: 'Géométrie',
    it: 'Geometria',
    pt: 'Geometria',
    nl: 'Meetkunde',
    sv: 'Geometri',
    da: 'Geometri',
    no: 'Geometri',
    fi: 'Geometria',
  },
  // Grown incrementally as the K.MD.A.2 "Comparing Length" activity fans out
  // per locale (each ship adds its sub-key). Absent locales fall back to en.
  'Measurement & Data': {
    en: 'Measurement & Data',
    de: 'Größen und Messen',
    es: 'Magnitudes y medida',
    fr: 'Grandeurs et mesures',
    fi: 'Mittaaminen ja tieto',
  },
  'Number & Operations in Base Ten': {
    en: 'Number & Operations in Base Ten',
    de: 'Zahlen und Rechnen im Zehnersystem',
    es: 'Números y operaciones en base diez',
    fr: 'Nombres et opérations en base dix',
    it: 'Numeri e operazioni in base dieci',
    pt: 'Números e operações na base dez',
    nl: 'Getallen en bewerkingen in het tientallig stelsel',
    sv: 'Tal och räkning i basen tio',
    da: 'Tal og regning i titalssystemet',
    no: 'Tall og regning i titallssystemet',
    fi: 'Luvut ja kymmenjärjestelmä',
  },
  // Alias: manifest uses the "and" spelling in places — map to the same value.
  'Number and Operations in Base Ten': {
    en: 'Number & Operations in Base Ten',
    de: 'Zahlen und Rechnen im Zehnersystem',
    es: 'Números y operaciones en base diez',
    fr: 'Nombres et opérations en base dix',
    it: 'Numeri e operazioni in base dieci',
    pt: 'Números e operações na base dez',
    nl: 'Getallen en bewerkingen in het tientallig stelsel',
    sv: 'Tal och räkning i basen tio',
    da: 'Tal og regning i titalssystemet',
    no: 'Tall og regning i titallssystemet',
    fi: 'Luvut ja kymmenjärjestelmä',
  },
  'Reading: Foundational Skills': {
    en: 'Reading: Foundational Skills',
    de: 'Lesen: Grundfertigkeiten',
    es: 'Lectura: destrezas fundamentales',
    fr: 'Lecture : compétences fondamentales',
    it: 'Lettura: competenze di base',
    pt: 'Leitura: habilidades fundamentais',
    nl: 'Lezen: fundamentele vaardigheden',
    sv: 'Läsning: grundläggande färdigheter',
    da: 'Læsning: grundlæggende færdigheder',
    no: 'Lesing: grunnleggende ferdigheter',
    fi: 'Lukeminen: perustaidot',
  },
};

/**
 * Localize a CCSS strand/domain name for `locale`. Unknown strands fall back
 * to the raw string; a missing locale on a known strand falls back to EN.
 */
export function localizeStrand(strand: string, locale: string): string {
  const row = STRAND_NAMES[strand];
  if (!row) return strand;
  return row[locale] ?? row.en ?? strand;
}
