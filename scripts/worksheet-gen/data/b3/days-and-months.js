/**
 * data/b3/days-and-months.js — the K-321 `days-and-months` bank.
 *
 * EN block HAND-AUTHORED (2026-09-14, K-321 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json after tools/validate-b3-draft.js. `data/` is
 * gitignored — the reviewer force-adds this module.
 *
 * THE NAMES ARE NOT HERE. Every day name, month name, abbreviation and week
 * start is read at render from data/b2/calendar.js CALENDAR[loc] (`names:
 * 'calendar'` is a sentinel, never a copy); a name fix is a calendar.js
 * commit, and the gate FAILS any block that defines dayNames / monthNames /
 * dayAbbr / weekStart (design §5 rule 2, poison P14).
 *
 * Shape (design file §5):
 *   DAYS_AND_MONTHS[loc] = {
 *     names:      'calendar',
 *     labels:     { yesterday, today, tomorrow, before, after },   F2 / F4 column heads (Phase 2)
 *     alt:        { days:{<idx>:[…]}, labels:{<key>:[…]} },        accepted regional forms, never printed
 *     dayShort:   null | [7 strings],                              pt option; if set the tiles print it
 *     laneGlyphH: { days, months, neighbours },                     face writing-lane glyph heights
 *     abbrev:     'calendar' | null,                               null = F5 refused for this locale
 *     strings:    { 'K-321':{title, instruction}, 'K-337':…, 'G1-319':…, 'G1-320':…, 'G1-321':…, 'G1-322':… }
 *                 keyed by the FIXED face ids (_records/b3var-id-allocation.json):
 *                 F1 K-337 gaps · F2 G1-319 neighbours · F3 G1-320 months · F4 G1-321 months-neighbours · F5 G1-322 abbrev
 *   }
 * The base page reads `names`, `dayShort` and `strings['K-321']`; F1 reads
 * `laneGlyphH.days`; F2 `labels.{yesterday,today,tomorrow}` + `laneGlyphH.neighbours`
 * (pt: 28); F4 `labels.{before,after}` + `laneGlyphH.months`; F5 `abbrev`
 * (null = REFUSED for that locale, no landing). The EN title/instruction of every
 * face is the same text as the emitted spec's i18n.en (the gate asserts it).
 */
'use strict';
const DAYS_AND_MONTHS = {
  en: {
    names: 'calendar',
    labels: { yesterday: 'yesterday', today: 'today', tomorrow: 'tomorrow', before: 'before', after: 'after' },
    alt: { days: {}, labels: {} },
    dayShort: null,
    laneGlyphH: { days: 40, months: 32, neighbours: 32 },
    abbrev: 'calendar',
    strings: {
      'K-321': {
        title: 'Days of the Week in Order',
        instruction: 'The first day of the week is already marked 1. Number the other days 2 to 7 in the order they come.',
      },
      'K-337': {
        title: 'Missing Days: Write the Week in Order',
        instruction: 'Some days are already written on the ladder. Copy the missing days from the word bank into the right places.',
      },
      'G1-319': {
        title: 'Yesterday, Today, Tomorrow',
        instruction: 'The day in the middle is today. Write the day that was yesterday and the day that will be tomorrow.',
      },
      'G1-320': {
        title: 'Months of the Year in Order',
        instruction: 'January is already marked 1. Number the other months 2 to 12 in the order of the year.',
      },
      'G1-321': {
        title: 'The Month Before and After',
        instruction: 'One month is given in the middle. Write the month that comes before it and the month that comes after it.',
      },
      'G1-322': {
        title: 'Days of the Week: Abbreviations',
        instruction: 'Read each short form and draw a line to the day it stands for.',
      },
    },
  },
};

module.exports = { DAYS_AND_MONTHS };
