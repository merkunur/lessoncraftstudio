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
    "K-002": C("a picture-only face with a big drawing frame and four helper buttons; level 3's traced 'I can ...' line is new."),
    "1-010": C("a fifth group (milk, yogurt, cheese) and a MyPlate plate as the sorting board."),
    "1-011": B("a MyPlate plate with five parts, a strip of food cards to glue, a drink to circle and a clock strip."),
    "1-012": C("a one-day habit-choice face of the same chart."),
    "2-019": B("a goal page (goal pictures to circle, three step boxes, a 'My helper' box, a 14-day strip of suns)."),
    "2-024": C("a weather-protection match (four weathers, six protections, many lines allowed)."),
    "3-026": B("a six-frame comic of a germ's trip with the frames to circle where a habit stops it and the habit to write."),
    "3-030": B("a goal-plan page with a 21-day tracker and a look-back on the back."),
    "3-031": B("a home escape-plan page on that grid plate. (G1-530 is not yet published in English.)"),
  },
};
void N;
