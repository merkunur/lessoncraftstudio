/**
 * The published Syllable Division pages: locale → face → theme (one page per face, level 2, copy 1), read from the live
 * catalog (decks.subject_tags, 2026-10-01). en has no Syllable Scramble and no Vowel King; fr has no Vowel King.
 */
'use strict';
const S = 'At the Supermarket', H = 'around the house', Z = 'zoo animals', A = 'animals', C = 'clothing', T = 'toys';
const std = { 'G1-305': A, 'G1-325': Z, 'G1-326': H, 'G1-327': C, 'G1-328': S, 'G1-329': T };
const PUBLISHED = {
  en: { 'G1-305': A, 'G1-325': Z, 'G1-326': H, 'G1-328': S },
  de: { ...std },
  es: { ...std },
  fr: { 'G1-305': A, 'G1-325': Z, 'G1-326': H, 'G1-327': S, 'G1-328': Z },
  it: { ...std },
  pt: { ...std },
  nl: { ...std },
  sv: { ...std },
  da: { 'G1-305': A, 'G1-325': H, 'G1-326': H, 'G1-327': C, 'G1-328': H, 'G1-329': A },
  no: { ...std, 'G1-327': S },
  fi: { ...std },
};
module.exports = { PUBLISHED };
