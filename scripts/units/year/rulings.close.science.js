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
    "1-039": C("a two-box drawing level (near / far) with a circle for the bigger shadow and the sentence frame."),
    "1-045": C("a two-window drawing face with a picture bank (the Sun, stars, the Moon allowed in either window) and the sentence frame."),
    "1-046": C("a daylight mode of the graph-tasks factory (months, hours 9 to 15)."),
    "1-058": B("a raft-design face of the G1-399 sink-or-float family (material pictures to check, a sketch box, three label lines)."),
    "2-065": C("a land-and-water face of the maps family (color key boxes, a lake and hills on the island, four labels)."),
    "2-066": B("a model-to-map page (a side-view box and a top-down map box with a key; landform pictures to circle for level 1)."),
    "2-068": C("a globe-toss mode with two outcomes (water, land), 10 or 30 catches and the frame 'Most of Earth is covered by ___.'"),
    "2-078": C("a claim / evidence mode ('My claim: ___ can / cannot change back.' 'My evidence: I saw ___.' and a drawing box) with the unit's changes as the questions."),
    "2-085": C("a field-survey mode with two side-by-side tallies and a two-bar graph of the kinds."),
    "2-086": C("a three-column chart face of the habitats family (desert, rain forest, ocean) with a picture bank for level 1."),
    "2-087": C("a plant face (three plants, three habitat windows, the helping part to circle) on the G1-398 habitats layout."),
    "3-097": C("a weather-data mode of the graph-tasks bar-fill (school days, highs in °F on a scaled axis) with the table and two comparison questions."),
    "3-098": C("a monthly climate mode with the season boxes."),
    "3-109": C("a two-background tally table and bar graph for the camouflage game."),
  },
};
void N;
