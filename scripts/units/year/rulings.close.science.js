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
    "K-003": C("a body-needs bank (food, water, air) with the circle-and-cross-out task; level 3's drawing box is new."),
    "K-006": C("a wind face of the K-356 diary layout with three drawn streamer states to circle in each day box; level 3's windiest and calmest day circles are new."),
    "K-009": B("a storm-safety face (a weather picture and three drawn choices per row, circle the safe one) on the row layout of K-365 or the choice rows of G1-404."),
    "K-011": C("an 'eats' face of the G1-398 habitats family with three food chips and omnivores."),
    "K-012": B("a cut-and-glue habitat model page (an empty place box, a strip of eight cut-outs, two that do not fit) on the cut-and-paste layout of G1-388."),
    "K-013": C("a before/after face of the same pairs."),
    "K-014": C("a push / pull rule with action pictures on the same science-category-sort layout (lines to a push hand and a pull hand)."),
    "K-020": B("a boat-plan face of the G1-399 sink-or-float family (the bear in a box, a material strip, a big drawing tank, label words for level 3)."),
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
