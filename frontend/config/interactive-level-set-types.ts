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
  'alphabetical-order',
  'articles',
  'capitals-punctuation',
  'compound-words',
  'digraphs',
]);
