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
 * Register: the locale's own national-curriculum DOMAIN name (the term that
 * curriculum actually uses), not a literal gloss of the CCSS English — e.g.
 * fr collapses Counting/Operations/Base-Ten onto "Nombres et calcul", sv onto
 * "Taluppfattning och tals användning". Rendered for international teachers in
 * the chip + JSON-LD; the §A.13.49 framework register names the framework, this
 * names the domain within it.
 *
 * Native-curriculum review of ALL 11 locales completed 2026-06-04 via per-locale
 * expert agents (de/fr/nl/sv/da/no/fi first; then es=LOMLOE, it=Indicazioni
 * nazionali, pt=BNCC) — the best-effort CCSS-calque glosses were replaced with
 * the real national-curriculum domain names. Several CCSS strands legitimately
 * collapse onto one national domain per locale (e.g. es Counting/Operations/
 * Base-Ten → "Sentido numérico"; it → "Numeri"; pt → "Números") — §17.4.3.
 */

export const STRAND_NAMES: Record<string, Partial<Record<string, string>>> = {
  'Counting & Cardinality': {
    en: 'Counting & Cardinality',
    de: 'Zählen und Anzahl',
    es: 'Sentido numérico',
    fr: 'Nombres et calcul',
    it: 'Numeri',
    pt: 'Números',
    nl: 'Getallen (tellen en getalbegrip)',
    sv: 'Taluppfattning och tals användning',
    da: 'Tal og algebra (tælling og antal)',
    no: 'Telling og tall',
    fi: 'Lukumäärä ja laskeminen',
  },
  'Operations & Algebraic Thinking': {
    en: 'Operations & Algebraic Thinking',
    de: 'Rechnen und algebraisches Denken',
    es: 'Sentido numérico',
    fr: 'Nombres et calcul',
    it: 'Numeri',
    pt: 'Álgebra',
    nl: 'Bewerkingen',
    sv: 'Algebra',
    da: 'Tal og algebra (regnestrategier)',
    no: 'Regneoperasjoner og algebraisk tenkning',
    fi: 'Laskutoimitukset ja algebrallinen ajattelu',
  },
  'Geometry': {
    en: 'Geometry',
    de: 'Geometrie',
    es: 'Sentido espacial',
    fr: 'Espace et géométrie',
    it: 'Spazio e figure',
    pt: 'Geometria',
    nl: 'Meetkunde',
    sv: 'Geometri',
    da: 'Geometri og måling',
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
    it: 'Misure e dati',
    pt: 'Grandezas e medidas',
    nl: 'Meten en gegevens',
    sv: 'Mätning och data',
    da: 'Måling og data',
    no: 'Måling og data',
    fi: 'Mittaaminen ja tieto',
  },
  'Number & Operations in Base Ten': {
    en: 'Number & Operations in Base Ten',
    de: 'Zahlen und Rechnen im Zehnersystem',
    es: 'Sentido numérico',
    fr: 'Nombres et calcul',
    it: 'Numeri',
    pt: 'Números',
    nl: 'Getallen en het tientallig stelsel',
    sv: 'Taluppfattning och tals användning',
    da: 'Tal og algebra (positionssystemet)',
    no: 'Tall og titallssystemet',
    fi: 'Luvut ja kymmenjärjestelmä',
  },
  // Alias: manifest uses the "and" spelling in places — map to the same value.
  'Number and Operations in Base Ten': {
    en: 'Number & Operations in Base Ten',
    de: 'Zahlen und Rechnen im Zehnersystem',
    es: 'Sentido numérico',
    fr: 'Nombres et calcul',
    it: 'Numeri',
    pt: 'Números',
    nl: 'Getallen en het tientallig stelsel',
    sv: 'Taluppfattning och tals användning',
    da: 'Tal og algebra (positionssystemet)',
    no: 'Tall og titallssystemet',
    fi: 'Luvut ja kymmenjärjestelmä',
  },
  'Reading: Foundational Skills': {
    en: 'Reading: Foundational Skills',
    de: 'Lesen: Grundfertigkeiten',
    es: 'Comprensión lectora',
    fr: 'Lecture et compréhension de l\'écrit',
    it: 'Lettura',
    pt: 'Leitura/escuta',
    nl: 'Lezen: technisch lezen (fundamentele leesvaardigheden)',
    sv: 'Läsa och skriva',
    da: 'Læsning (afkodning)',
    no: 'Lesing: grunnleggende ferdigheter',
    fi: 'Lukemisen perustaidot',
  },
  // Phonological Awareness (pre-reading sound awareness; literacy). No deployed
  // activity uses this strand yet (forward-looking); all 11 locales curriculum-reviewed.
  'Phonological Awareness': {
    en: 'Phonological Awareness',
    de: 'Phonologische Bewusstheit',
    es: 'Conciencia fonológica',
    fr: 'Conscience phonologique',
    it: 'Consapevolezza fonologica',
    pt: 'Análise linguística/semiótica',
    nl: 'Fonologisch bewustzijn',
    sv: 'Fonologisk medvetenhet',
    da: 'Sproglig opmærksomhed (fonologisk opmærksomhed)',
    no: 'Språklig bevissthet',
    fi: 'Kielellinen tietoisuus',
  },
  // Language (CCSS-ELA: vocabulary / grammar / conventions — incl. prepositions L.K.1.e, spell-phonetically L.K.2.d).
  // EN-only this wave; per-locale names filled at each locale's fan-out (native ensemble, no MT per §A.13.49). The
  // row.en fallback covers non-EN until then, and no non-EN Language page exists yet.
  'Language': {
    en: 'Language',
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
