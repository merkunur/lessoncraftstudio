/**
 * Worksheet-gen types whose LEVEL SET decks (do-not-index, no landing; Level Set programme
 * 2026-09-27) ship an interactive screen version (scripts/worksheet-gen emit/interactive-runtime.js).
 *
 * Deliberately NOT `INTERACTIVE_EXERCISE_TYPES`: that set is type-level and its gates
 * (verify-hub-type-rows, audit-worksheet-formats) forbid printable families — and the published,
 * indexed deck of each of these types stays printable-only (byte-identical). Only the Level Set
 * rows of a listed type are marked interactive (lib/worksheets-sheets.ts levelSetRows).
 */
export const INTERACTIVE_LEVEL_SET_TYPES: ReadonlySet<string> = new Set<string>([
  '2d-shapes',
  'alphabetical-order',
  'arrays-multiplication',
  'articles',
  'calendar',
  'capitals-punctuation',
  'compound-words',
  'digraphs',
  'feelings',
  'cloze',
  'color-by-number',
  'column-arithmetic',   // Column Addition and Subtraction (2026-10-05): tap the right answer under each column problem   // the illustrated scenes + pictures (K-393/K-394, 2026-10-05): tap-to-colour screen version
  'opposites',
  'pronouns',
  'question-words',
  'read-and-do',
  'reading-comprehension',
  'rhyming-words',
  'sentence-building',
  'singular-plural',
  'sound-boxes',
  'spelling-rules',
  'story-sequencing',
  'syllable-reading',
  'syllable-split',
  'synonyms',
  'verb-forms',
  'word-classes',
  'word-parts',
]);

/**
 * Variations of an interactive Level Set type whose copies are PRINTABLE ONLY (open-ended pages with no
 * single right answer — operator rule 2026-09-27): their cards keep the "PDF only" mark. Keyed by the
 * variation code the slug ends with (`…-k332-3` → "k332").
 */
export const LEVEL_SET_PRINT_ONLY_VARIATIONS: Readonly<Record<string, readonly string[]>> = {
  feelings: ['k332'],
  opposites: ['g1336'],   // Pair Up: sorting words into written pairs (Level Set 2026-09-28)
  'question-words': ['g2357'],   // Ask About the Picture: open questions (Level Set 2026-09-29)
  'read-and-do': ['g1342'],   // Read and Draw: open drawing (Level Set 2026-09-30)
  'rhyming-words': ['g1346'],   // Write Your Own Rhymes: open answers (Level Set 2026-09-30)
  'story-sequencing': ['g2378'],   // Retell the Story with Starters: open writing (Level Set 2026-10-01)
  '2d-shapes': ['k372'],   // Draw on Dot Paper: a drawing has more than one right answer (Level Set 2026-10-04)
};
