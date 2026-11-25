/**
 * The ruling of every "close" line of the social studies type work list (Daily Teaching System, Stage D-1b, 2026-11-23).
 *
 * The matching (match.en.social.json, every candidate's generator read by the analyst) said for 14 of the pages the
 * English social studies year needs: an existing type does part of the task. The rule is the one of mathematics and literacy:
 * "use" only where the existing page teaches the lesson's OBJECTIVE at the lesson's grade as it stands. I read all
 * 14 accounts: none does, so
 *
 *   change  the type gets a new mode, level or content bank; the note says which (the analyst's own closing sentence)
 *   build   the layout itself is missing ("Far:"): a new type; it joins the "to build" list (4 lines)
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
    "1-019": N("G1-653", "built (Stage D-5 batch S1, 2026-11-24): G1-653, reviewed by one US first-grade teacher"),
    "1-020": N("G1-654", "built (Stage D-5 batch S1, 2026-11-24): G1-654, reviewed by one US first-grade teacher"),
    "1-021": N("G1-655", "built (Stage D-5 batch S1, 2026-11-24): G1-655, reviewed by one US first-grade teacher"),
    "1-023": N("G1-656", "built (Stage D-5 batch S1, 2026-11-24): G1-656, reviewed by one US first-grade teacher"),
    "1-024": N("G1-657", "built (Stage D-5 batch S1, 2026-11-24): G1-657, reviewed by one US first-grade teacher"),
    "1-025": N("G1-658", "built (Stage D-5 batch S1, 2026-11-24): G1-658, reviewed by one US first-grade teacher"),
    "1-027": N("G1-659", "built (Stage D-5 batch S1, 2026-11-24): G1-659, reviewed by one US first-grade teacher"),
    "1-028": N("G1-660", "built (Stage D-5 batch S1, 2026-11-24): G1-660, reviewed by one US first-grade teacher"),
    "1-029": N("G1-661", "built (Stage D-5 batch S1, 2026-11-24): G1-661, reviewed by one US first-grade teacher"),
    "1-030": N("G1-662", "built (Stage D-5 batch S1, 2026-11-24): G1-662, reviewed by one US first-grade teacher"),
    "1-031": N("G1-663", "built (Stage D-5 batch S1, 2026-11-24): G1-663, reviewed by one US first-grade teacher"),
    "1-032": N("G1-664", "built (Stage D-5 batch S1, 2026-11-24): G1-664, reviewed by one US first-grade teacher"),
    "1-033": N("G1-665", "built (Stage D-5 batch S1, 2026-11-24): G1-665, reviewed by one US first-grade teacher"),
    "1-034": N("G1-666", "built (Stage D-5 batch S1, 2026-11-24): G1-666, reviewed by one US first-grade teacher"),
    "1-035": N("G1-667", "built (Stage D-5 batch S1, 2026-11-24): G1-667, reviewed by one US first-grade teacher"),
    "1-037": N("G1-668", "built (Stage D-5 batch S1, 2026-11-24): G1-668, reviewed by one US first-grade teacher"),
    "K-001": N("K-712", "built (Stage D-5 batch SK, 2026-11-24): K-712, reviewed by one US Kindergarten teacher in two rounds"),
    "K-002": N("K-713", "built (Stage D-5 batch SK, 2026-11-24): K-713, reviewed by one US Kindergarten teacher in two rounds"),
    "K-005": N("K-714", "built (Stage D-5 batch SK, 2026-11-24): K-714, reviewed by one US Kindergarten teacher in two rounds"),
    "K-006": N("K-715", "built (Stage D-5 batch SK, 2026-11-24): K-715, reviewed by one US Kindergarten teacher in two rounds"),
    "K-007": N("K-716", "built (Stage D-5 batch SK, 2026-11-24): K-716, reviewed by one US Kindergarten teacher in two rounds"),
    "K-010": N("K-717", "built (Stage D-5 batch SK, 2026-11-24): K-717, reviewed by one US Kindergarten teacher in two rounds"),
    "K-011": N("K-718", "built (Stage D-5 batch SK, 2026-11-24): K-718, reviewed by one US Kindergarten teacher in two rounds"),
    "K-012": N("K-719", "built (Stage D-5 batch SK, 2026-11-24): K-719, reviewed by one US Kindergarten teacher in two rounds"),
    "K-013": N("K-720", "built (Stage D-5 batch SK, 2026-11-24): K-720, reviewed by one US Kindergarten teacher in two rounds"),
    "K-014": N("K-721", "built (Stage D-5 batch SK, 2026-11-24): K-721, reviewed by one US Kindergarten teacher in two rounds"),
    "K-015": N("K-722", "built (Stage D-5 batch SK, 2026-11-24): K-722, reviewed by one US Kindergarten teacher in two rounds"),
    "K-016": N("K-723", "built (Stage D-5 batch SK, 2026-11-24): K-723, reviewed by one US Kindergarten teacher in two rounds"),
    "K-018": N("K-724", "built (Stage D-5 batch SK, 2026-11-24): K-724, reviewed by one US Kindergarten teacher in two rounds"),
    "2-039": N("G2-615", "built (Stage D-5 batch S2, 2026-11-25): G2-615, reviewed by one US second-grade teacher in three rounds"),
    "2-040": N("G2-616", "built (Stage D-5 batch S2, 2026-11-25): G2-616, reviewed by one US second-grade teacher in three rounds"),
    "2-041": N("G2-617", "built (Stage D-5 batch S2, 2026-11-25): G2-617, reviewed by one US second-grade teacher in three rounds"),
    "2-044": N("G2-618", "built (Stage D-5 batch S2, 2026-11-25): G2-618, reviewed by one US second-grade teacher in three rounds"),
    "2-045": N("G2-619", "built (Stage D-5 batch S2, 2026-11-25): G2-619, reviewed by one US second-grade teacher in three rounds"),
    "2-046": N("G2-620", "built (Stage D-5 batch S2, 2026-11-25): G2-620, reviewed by one US second-grade teacher in three rounds"),
    "2-047": N("G2-621", "built (Stage D-5 batch S2, 2026-11-25): G2-621, reviewed by one US second-grade teacher in three rounds"),
    "2-048": N("G2-622", "built (Stage D-5 batch S2, 2026-11-25): G2-622, reviewed by one US second-grade teacher in three rounds"),
    "2-049": N("G2-623", "built (Stage D-5 batch S2, 2026-11-25): G2-623, reviewed by one US second-grade teacher in three rounds"),
    "2-052": N("G2-625", "built (Stage D-5 batch S2, 2026-11-25): G2-625, reviewed by one US second-grade teacher in three rounds"),
    "2-054": N("G2-627", "built (Stage D-5 batch S2, 2026-11-25): G2-627, reviewed by one US second-grade teacher in three rounds"),
    "2-056": N("G2-629", "built (Stage D-5 batch S2, 2026-11-25): G2-629, reviewed by one US second-grade teacher in three rounds"),
    "2-038": N("G2-614", "built (Stage D-5 batch S2, 2026-11-25): G2-614, reviewed by one US second-grade teacher in three rounds"),
    "2-051": N("G2-624", "built (Stage D-5 batch S2, 2026-11-25): G2-624, reviewed by one US second-grade teacher in three rounds"),
    "2-053": N("G2-626", "built (Stage D-5 batch S2, 2026-11-25): G2-626, reviewed by one US second-grade teacher in three rounds"),
    "2-055": N("G2-628", "built (Stage D-5 batch S2, 2026-11-25): G2-628, reviewed by one US second-grade teacher in three rounds"),
    "3-061": B("a map-scale face of the maps family."),
    "3-062": C("the grid-map plate with a title, a scale box and a places checklist."),
    "3-069": C("a problem-solver page (map, solutions table) with a 'Dear City Council members' letter frame."),
    "3-074": C("town-history texts in the same bank."),
  },
};
void N;
