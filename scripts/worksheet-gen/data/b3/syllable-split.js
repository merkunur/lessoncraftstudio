/**
 * data/b3/syllable-split.js — the G1-305 `syllable-split` locale bank.
 * Per-locale DATA only (design file §5): the base's marking convention, the
 * display case, the pool rules and the faces' literals. Words are NEVER
 * listed here — build() joins `entriesFor(theme, loc)` to the phonics
 * pipeline's approved-words file on vocabKey at render (lib/b3-common.js
 * approvedByKey), so the split and the count always come from the gated
 * source and never from a hand copy.
 *
 * EN block hand-authored 2026-09-14; the ten other blocks are GENERATED from
 * i18n/.draft-b3-<loc>.json by tools/apply-b3-locale.js after
 * tools/validate-b3-draft.js (b2 pattern). A missing block is a REFUSAL.
 *
 *   mark        'arc' (bowl under each syllable) | 'bar' (vertical bar between)
 *   hyphen      the written separator on the Write face
 *   casing      'keep' (de: the vocab capital stays) | 'lower'
 *   kings       Vowel King face ships (en refused: silent e / vowel teams)
 *   vowelExtra  extra one-king digraphs (nl 'ij')
 *   strictPool  null | 'policy_managed_absent' (da K-1 pool)
 *   refuse      { finalMuteE } (fr: /[^aeiouyéèêë]e$/u on the last syllable)
 *   sortLabels  the Sort face's column headings, both present and distinct
 *   example     the Vowel King banner word: approved, count 2-3, texPool
 *               (en: rab-bit, TeX-agreed — the banner itself is refused in en)
 *   instructionTavutettu  fi only (the hyphenated instruction literal)
 *   exclude     vocabKeys the panel removed from every face
 */
'use strict';
const SYLLABLE_SPLIT = {
  en: {
    mark: 'arc',
    hyphen: '-',
    casing: 'lower',
    kings: false,
    vowelExtra: [],
    strictPool: null,
    refuse: { finalMuteE: false },
    sortLabels: { 2: '2 syllables', 3: '3 syllables' },
    example: { vocabKey: 'rabbit' },
    instructionTavutettu: null,
    exclude: [],
  },
};
module.exports = { SYLLABLE_SPLIT };
