/**
 * The ruling of every "close" line of the health type work list (Daily Teaching System, Stage D-1b, 2026-11-23).
 *
 * The matching (match.en.health.json, every candidate's generator read by the analyst) said for 9 of the pages the
 * English health year needs: an existing type does part of the task. The rule is the one of mathematics and literacy:
 * "use" only where the existing page teaches the lesson's OBJECTIVE at the lesson's grade as it stands. I read all
 * 9 accounts: none does, so
 *
 *   change  the type gets a new mode, level or content bank; the note says which (the analyst's own closing sentence)
 *   build   the layout itself is missing ("Far:"): a new type; it joins the "to build" list (5 lines)
 *   N(type) a change that is DONE names the type that was built (as in the mathematics file)
 *
 * The analyst's notes on designer pages above the grade or with two right answers (median, the lemonade-stand
 * dollars, daylight hours from sunrise and sunset, the rabbit's foods, the sneezing child, the iceberg) are build
 * constraints for the new types, not rulings. Written by a one-off script from the match file
 * (lcs-stage-d/make-rulings.js); from here on it is edited by hand as lines are built.
 */
'use strict';
const U = (note, level, type) => ({ rule: 'use', note, ...(level ? { level } : {}), ...(type ? { type } : {}) });
const N = (type, note, level) => U(note, level, type);
const C = (note) => ({ rule: 'change', note });
const B = (note) => ({ rule: 'build', note });
module.exports = {
  en: {
    "2-015": N("G2-605", "built (Stage D-5 batch 2, 2026-11-24): G2-605, reviewed by one US second-grade teacher in three rounds"),
    "2-017": N("G2-606", "built (Stage D-5 batch 2, 2026-11-24): G2-606, reviewed by one US second-grade teacher in three rounds"),
    "2-018": N("G2-607", "built (Stage D-5 batch 2, 2026-11-24): G2-607, reviewed by one US second-grade teacher in three rounds"),
    "2-019": N("G2-608", "built (Stage D-5 batch 2, 2026-11-24): G2-608, reviewed by one US second-grade teacher in three rounds"),
    "2-020": N("G2-609", "built (Stage D-5 batch 2, 2026-11-24): G2-609, reviewed by one US second-grade teacher in three rounds"),
    "2-021": N("G2-610", "built (Stage D-5 batch 2, 2026-11-24): G2-610, reviewed by one US second-grade teacher in three rounds"),
    "2-023": N("G2-611", "built (Stage D-5 batch 2, 2026-11-24): G2-611, reviewed by one US second-grade teacher in three rounds"),
    "2-024": N("G2-612", "built (Stage D-5 batch 2, 2026-11-24): G2-612, reviewed by one US second-grade teacher in three rounds"),
    "2-025": N("G2-613", "built (Stage D-5 batch 2, 2026-11-24): G2-613, reviewed by one US second-grade teacher in three rounds"),
    "1-009": N("G1-644", "built (Stage D-5 batch 1, 2026-11-24): G1-644, reviewed by one US first-grade teacher in three rounds"),
    "1-010": N("G1-645", "built (Stage D-5 batch 1, 2026-11-24): G1-645, reviewed by one US first-grade teacher in three rounds"),
    "1-011": N("G1-646", "built (Stage D-5 batch 1, 2026-11-24): G1-646, reviewed by one US first-grade teacher in three rounds"),
    "1-012": N("G1-647", "built (Stage D-5 batch 1, 2026-11-24): G1-647, reviewed by one US first-grade teacher in three rounds"),
    "1-014": N("G1-648", "built (Stage D-5 batch 1, 2026-11-24): G1-648, reviewed by one US first-grade teacher in three rounds"),
    "K-006": N("K-707", "built (Stage D-5 batch K, 2026-11-23): K-707, reviewed by one US Kindergarten teacher in two rounds"),
    "K-005": N("K-706", "built (Stage D-5 batch K, 2026-11-23): K-706, reviewed by one US Kindergarten teacher in two rounds"),
    "K-002": N("K-705", "built (Stage D-5 batch K, 2026-11-23): K-705, reviewed by one US Kindergarten teacher in two rounds"),
    "3-026": B("a six-frame comic of a germ's trip with the frames to circle where a habit stops it and the habit to write."),
    "3-030": B("a goal-plan page with a 21-day tracker and a look-back on the back."),
    "3-031": B("a home escape-plan page on that grid plate. (G1-530 is not yet published in English.)"),
  },
};
void N;
