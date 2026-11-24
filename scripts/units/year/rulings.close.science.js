/**
 * The ruling of every "close" line of the science type work list (Daily Teaching System, Stage D-1b, 2026-11-23).
 *
 * The matching (match.en.science.json, every candidate's generator read by the analyst) said for 22 of the pages the
 * English science year needs: an existing type does part of the task. The rule is the one of mathematics and literacy:
 * "use" only where the existing page teaches the lesson's OBJECTIVE at the lesson's grade as it stands. I read all
 * 22 accounts: none does, so
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
    "2-061": N("G2-584", "built (Stage D-5 batch 2, 2026-11-24): G2-584, reviewed by one US second-grade teacher in three rounds"),
    "2-063": N("G2-585", "built (Stage D-5 batch 2, 2026-11-24): G2-585, reviewed by one US second-grade teacher in three rounds"),
    "2-064": N("G2-586", "built (Stage D-5 batch 2, 2026-11-24): G2-586, reviewed by one US second-grade teacher in three rounds"),
    "2-065": N("G2-587", "built (Stage D-5 batch 2, 2026-11-24): G2-587, reviewed by one US second-grade teacher in three rounds"),
    "2-066": N("G2-588", "built (Stage D-5 batch 2, 2026-11-24): G2-588, reviewed by one US second-grade teacher in three rounds"),
    "2-067": N("G2-589", "built (Stage D-5 batch 2, 2026-11-24): G2-589, reviewed by one US second-grade teacher in three rounds"),
    "2-068": N("G2-590", "built (Stage D-5 batch 2, 2026-11-24): G2-590, reviewed by one US second-grade teacher in three rounds"),
    "2-071": N("G2-591", "built (Stage D-5 batch 2, 2026-11-24): G2-591, reviewed by one US second-grade teacher in three rounds"),
    "2-072": N("G2-592", "built (Stage D-5 batch 2, 2026-11-24): G2-592, reviewed by one US second-grade teacher in three rounds"),
    "2-073": N("G2-593", "built (Stage D-5 batch 2, 2026-11-24): G2-593, reviewed by one US second-grade teacher in three rounds"),
    "2-074": N("G2-594", "built (Stage D-5 batch 2, 2026-11-24): G2-594, reviewed by one US second-grade teacher in three rounds"),
    "2-075": N("G2-595", "built (Stage D-5 batch 2, 2026-11-24): G2-595, reviewed by one US second-grade teacher in three rounds"),
    "2-076": N("G2-596", "built (Stage D-5 batch 2, 2026-11-24): G2-596, reviewed by one US second-grade teacher in three rounds"),
    "2-077": N("G2-597", "built (Stage D-5 batch 2, 2026-11-24): G2-597, reviewed by one US second-grade teacher in three rounds"),
    "2-078": N("G2-598", "built (Stage D-5 batch 2, 2026-11-24): G2-598, reviewed by one US second-grade teacher in three rounds"),
    "2-080": N("G2-599", "built (Stage D-5 batch 2, 2026-11-24): G2-599, reviewed by one US second-grade teacher in three rounds"),
    "2-081": N("G2-600", "built (Stage D-5 batch 2, 2026-11-24): G2-600, reviewed by one US second-grade teacher in three rounds"),
    "2-082": N("G2-601", "built (Stage D-5 batch 2, 2026-11-24): G2-601, reviewed by one US second-grade teacher in three rounds"),
    "2-085": N("G2-602", "built (Stage D-5 batch 2, 2026-11-24): G2-602, reviewed by one US second-grade teacher in three rounds"),
    "2-086": N("G2-603", "built (Stage D-5 batch 2, 2026-11-24): G2-603, reviewed by one US second-grade teacher in three rounds"),
    "2-087": N("G2-604", "built (Stage D-5 batch 2, 2026-11-24): G2-604, reviewed by one US second-grade teacher in three rounds"),
    "1-033": N("G1-626", "built (Stage D-5 batch 1, 2026-11-24): G1-626, reviewed by one US first-grade teacher in three rounds"),
    "1-034": N("G1-627", "built (Stage D-5 batch 1, 2026-11-24): G1-627, reviewed by one US first-grade teacher in three rounds"),
    "1-035": N("G1-628", "built (Stage D-5 batch 1, 2026-11-24): G1-628, reviewed by one US first-grade teacher in three rounds"),
    "1-036": N("G1-629", "built (Stage D-5 batch 1, 2026-11-24): G1-629, reviewed by one US first-grade teacher in three rounds"),
    "1-037": N("G1-630", "built (Stage D-5 batch 1, 2026-11-24): G1-630, reviewed by one US first-grade teacher in three rounds"),
    "1-038": N("G1-631", "built (Stage D-5 batch 1, 2026-11-24): G1-631, reviewed by one US first-grade teacher in three rounds"),
    "1-039": N("G1-632", "built (Stage D-5 batch 1, 2026-11-24): G1-632, reviewed by one US first-grade teacher in three rounds"),
    "1-040": N("G1-633", "built (Stage D-5 batch 1, 2026-11-24): G1-633, reviewed by one US first-grade teacher in three rounds"),
    "1-043": N("G1-634", "built (Stage D-5 batch 1, 2026-11-24): G1-634, reviewed by one US first-grade teacher in three rounds"),
    "1-044": N("G1-635", "built (Stage D-5 batch 1, 2026-11-24): G1-635, reviewed by one US first-grade teacher in three rounds"),
    "1-045": N("G1-636", "built (Stage D-5 batch 1, 2026-11-24): G1-636, reviewed by one US first-grade teacher in three rounds"),
    "1-046": N("G1-637", "built (Stage D-5 batch 1, 2026-11-24): G1-637, reviewed by one US first-grade teacher in three rounds"),
    "1-050": N("G1-638", "built (Stage D-5 batch 1, 2026-11-24): G1-638, reviewed by one US first-grade teacher in three rounds"),
    "1-051": N("G1-639", "built (Stage D-5 batch 1, 2026-11-24): G1-639, reviewed by one US first-grade teacher in three rounds"),
    "1-054": N("G1-640", "built (Stage D-5 batch 1, 2026-11-24): G1-640, reviewed by one US first-grade teacher in three rounds"),
    "1-055": N("G1-641", "built (Stage D-5 batch 1, 2026-11-24): G1-641, reviewed by one US first-grade teacher in three rounds"),
    "1-058": N("G1-642", "built (Stage D-5 batch 1, 2026-11-24): G1-642, reviewed by one US first-grade teacher in three rounds"),
    "1-059": N("G1-643", "built (Stage D-5 batch 1, 2026-11-24): G1-643, reviewed by one US first-grade teacher in three rounds"),
    "K-029": N("K-704", "built (Stage D-5 batch K, 2026-11-23): K-704, reviewed by one US Kindergarten teacher in two rounds"),
    "K-028": N("K-703", "built (Stage D-5 batch K, 2026-11-23): K-703, reviewed by one US Kindergarten teacher in two rounds"),
    "K-024": N("K-702", "built (Stage D-5 batch K, 2026-11-23): K-702, reviewed by one US Kindergarten teacher in two rounds"),
    "K-022": N("K-701", "built (Stage D-5 batch K, 2026-11-23): K-701, reviewed by one US Kindergarten teacher in two rounds"),
    "K-021": N("K-700", "built (Stage D-5 batch K, 2026-11-23): K-700, reviewed by one US Kindergarten teacher in two rounds"),
    "K-018": N("K-698", "built (Stage D-5 batch K, 2026-11-23): K-698, reviewed by one US Kindergarten teacher in two rounds"),
    "K-017": N("K-697", "built (Stage D-5 batch K, 2026-11-23): K-697, reviewed by one US Kindergarten teacher in two rounds"),
    "K-016": N("K-696", "built (Stage D-5 batch K, 2026-11-23): K-696, reviewed by one US Kindergarten teacher in two rounds"),
    "K-015": N("K-695", "built (Stage D-5 batch K, 2026-11-23): K-695, reviewed by one US Kindergarten teacher in two rounds"),
    "K-007": N("K-689", "built (Stage D-5 batch K, 2026-11-23): K-689, reviewed by one US Kindergarten teacher in two rounds"),
    "K-003": N("K-687", "built (Stage D-5 batch K, 2026-11-23): K-687, reviewed by one US Kindergarten teacher in two rounds"),
    "K-006": N("K-688", "built (Stage D-5 batch K, 2026-11-23): K-688, reviewed by one US Kindergarten teacher in two rounds"),
    "K-009": N("K-690", "built (Stage D-5 batch K, 2026-11-23): K-690, reviewed by one US Kindergarten teacher in two rounds"),
    "K-011": N("K-691", "built (Stage D-5 batch K, 2026-11-23): K-691, reviewed by one US Kindergarten teacher in two rounds"),
    "K-012": N("K-692", "built (Stage D-5 batch K, 2026-11-23): K-692, reviewed by one US Kindergarten teacher in two rounds"),
    "K-013": N("K-693", "built (Stage D-5 batch K, 2026-11-23): K-693, reviewed by one US Kindergarten teacher in two rounds"),
    "K-014": N("K-694", "built (Stage D-5 batch K, 2026-11-23): K-694, reviewed by one US Kindergarten teacher in two rounds"),
    "K-020": N("K-699", "built (Stage D-5 batch K, 2026-11-23): K-699, reviewed by one US Kindergarten teacher in two rounds"),
    "3-097": C("a weather-data mode of the graph-tasks bar-fill (school days, highs in °F on a scaled axis) with the table and two comparison questions."),
    "3-098": C("a monthly climate mode with the season boxes."),
    "3-109": C("a two-background tally table and bar graph for the camouflage game."),
  },
};
void N;
