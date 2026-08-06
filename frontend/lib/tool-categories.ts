/**
 * Tool browse categories — the grouping axis for the /[locale]/tools hub.
 *
 * WHY THIS IS NOT A CCSS STRAND. The activities index groups by grade band →
 * CCSS strand, because every activity carries an `alignment.{grade,strand}`.
 * Tools deliberately carry neither: they are free-play apparatus with no
 * tasks, no grading and no `educationalAlignment` (CLAUDE.md §23.2). Grouping
 * them by curriculum strand would imply an alignment that does not exist, and
 * inventing a grade for a manipulative a teacher uses from PK to Grade 3 would
 * be worse. So this is a browse axis of its own: "what is this thing for".
 *
 * Four buckets, kept deliberately coarse — at 40 tools, more buckets would
 * mean sections of two or three cards, which reads as noise rather than
 * structure.
 *
 * Labels are authored per locale rather than machine-translated, reusing the
 * vocabulary already attested in lib/seo/strand-names.ts (itself natively
 * authored per locale) wherever a term carries over — e.g. de "Zahlen und
 * Mengen", fr "Nombres et calcul", es "Forma, espacio y medida" (the SEP axis
 * that legitimately covers both shape and measure).
 *
 * [NSR-FLAG][sv][da][no][fi] — the Nordic labels are short, low-risk compound
 * nouns but have not had native review (§17.5.1).
 */

export type ToolCategory = 'number' | 'measurement' | 'literacy' | 'classroom';

/** Render order of the sections on the hub. */
export const TOOL_CATEGORY_ORDER: readonly ToolCategory[] = [
  'number',
  'measurement',
  'literacy',
  'classroom',
] as const;

/**
 * tool key → category. Keys match TOOL_KEYS / MANIPULATIVES ids exactly.
 * A tool missing from this map falls back to 'number' via toolCategory(),
 * so a newly-shipped tool renders rather than vanishing from the hub — but
 * add it here in the same commit (see the §21.5/§23.5 registration points).
 */
export const TOOL_CATEGORY: Record<string, ToolCategory> = {
  // Numbers & counting — quantity, place value, parts/whole, arithmetic apparatus
  'ten-frame': 'number',
  'number-line': 'number',
  'rekenrek': 'number',
  'place-value-lab': 'number',
  'part-whole-frame': 'number',
  'open-number-line': 'number',
  'number-balance': 'number',
  'choral-counting': 'number',
  'fraction-kitchen': 'number',
  'money-mat': 'number',
  'estimation-jar': 'number',
  'number-talk-easel': 'number',
  'number-sieve': 'number',

  // Measurement, shape & data — measuring, time, space, sorting, graphing
  'ruler': 'measurement',
  'measurement-bench': 'measurement',
  'learning-clock': 'measurement',
  'class-graph': 'measurement',
  'folding-sheet': 'measurement',
  'sorting-hoops': 'measurement',
  'wodb': 'measurement',
  // Repeating patterns are early ALGEBRA (Muster und Strukturen / patronen /
  // mönster / säännönmukaisuudet), not measurement or shape. Filed under
  // 'measurement' at introduction and moved 2026-08-06 when both the design
  // and pedagogy panels flagged it independently; of the four coarse buckets,
  // number sense is where a unit-of-repeat instrument belongs.
  'pattern-bench': 'number',
  'arrow-strip': 'measurement',
  // chance and data — the bucket's "& data" half, alongside class-graph.
  // Absent, this fell back to 'number' and filed a chance instrument under
  // "Numbers & Counting", silently.
  'draw-bag': 'measurement',
  'lids': 'number',
  'unit-handle': 'measurement',
  'unroll-tape': 'measurement',
  'comparison-planks': 'measurement',
  'cold-line': 'measurement',
  'build-plan': 'measurement',

  // Reading & phonics — sounds, letters, words, sentences
  'sound-boxes': 'literacy',
  'blending-board': 'literacy',
  'letter-tiles': 'literacy',
  'letter-studio': 'literacy',
  'syllable-splitter': 'literacy',
  'heart-words': 'literacy',
  'picture-word-wall': 'literacy',
  'dictation-desk': 'literacy',
  'reading-easel': 'literacy',
  'story-line': 'literacy',

  // Classroom routines — the apparatus of the day itself
  'calendar-wall': 'classroom',
  'class-timer': 'classroom',
  'name-sticks': 'classroom',
  'center-board': 'classroom',
  'hush-owl': 'classroom',
  'our-day': 'classroom',
  'feelings-check-in': 'classroom',
  'home-language-bridge': 'classroom',
};

export function toolCategory(id: string): ToolCategory {
  return TOOL_CATEGORY[id] ?? 'number';
}

/** Section headings, per locale. en is the fallback for any missing locale. */
const CATEGORY_LABELS: Record<ToolCategory, Record<string, string>> = {
  number: {
    en: 'Numbers & Counting',
    de: 'Zahlen und Mengen',
    es: 'Números y conteo',
    fr: 'Nombres et calcul',
    it: 'Numeri e conteggio',
    pt: 'Números e contagem',
    nl: 'Getallen en tellen',
    sv: 'Tal och räkning',
    da: 'Tal og regning',
    no: 'Telling og tall',
    fi: 'Luvut ja laskeminen',
  },
  measurement: {
    en: 'Measurement, Shape & Data',
    de: 'Größen, Formen und Daten',
    es: 'Forma, espacio y medida',
    fr: 'Grandeurs, formes et données',
    it: 'Misure, forme e dati',
    pt: 'Grandezas, formas e dados',
    nl: 'Meten, vormen en gegevens',
    sv: 'Mätning, form och data',
    da: 'Måling, form og data',
    no: 'Måling, form og data',
    fi: 'Mittaaminen, muodot ja tiedot',
  },
  literacy: {
    en: 'Reading & Phonics',
    de: 'Lesen und Laute',
    es: 'Lectura y sonidos',
    fr: 'Lecture et sons',
    it: 'Lettura e suoni',
    pt: 'Leitura e sons',
    nl: 'Lezen en klanken',
    sv: 'Läsning och språkljud',
    da: 'Læsning og sproglyd',
    no: 'Lesing og språklyd',
    fi: 'Lukeminen ja äänteet',
  },
  classroom: {
    en: 'Classroom Routines',
    de: 'Klassenrituale',
    es: 'Rutinas de aula',
    fr: 'Rituels de classe',
    it: 'Routine di classe',
    pt: 'Rotinas da turma',
    nl: 'Klassenroutines',
    sv: 'Klassrumsrutiner',
    da: 'Klasserutiner',
    no: 'Klasseromsrutiner',
    fi: 'Luokan rutiinit',
  },
};

export function toolCategoryLabel(cat: ToolCategory, locale: string): string {
  const row = CATEGORY_LABELS[cat];
  return row[locale] ?? row.en;
}

/**
 * Panel / edge / coin tints per category, mirroring SUBJECT_STYLE in
 * lib/activities-catalog.ts so a tool card and an activity card read as the
 * same system. Math-ish categories take the teal family, literacy the coral
 * family (exactly as activities does), and classroom a muted sand so the
 * "not a subject" bucket is visually distinct without introducing a new hue.
 */
export const TOOL_CATEGORY_STYLE: Record<ToolCategory, {
  panel: string; glyph: string; edge: string; coin: string;
}> = {
  number: { panel: 'bg-[#DCEAE6]', glyph: 'text-lcs-teal', edge: 'bg-lcs-teal', coin: 'bg-lcs-teal/12' },
  measurement: { panel: 'bg-[#E2EBE4]', glyph: 'text-lcs-teal', edge: 'bg-lcs-teal/70', coin: 'bg-lcs-teal/12' },
  literacy: { panel: 'bg-[#FBE0D2]', glyph: 'text-lcs-coral-deep', edge: 'bg-lcs-coral', coin: 'bg-lcs-coral/12' },
  classroom: { panel: 'bg-[#F1E7D6]', glyph: 'text-lcs-teal', edge: 'bg-[#D9A441]', coin: 'bg-[#D9A441]/15' },
};
