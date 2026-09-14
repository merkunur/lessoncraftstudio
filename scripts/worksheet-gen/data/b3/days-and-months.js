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
 *     strings:    { 'K-321':{title, instruction} }                 faces F1..F5 added in Phase 2
 *   }
 * The base page reads `names`, `dayShort` and `strings` only.
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
    },
  },
};

module.exports = { DAYS_AND_MONTHS };
