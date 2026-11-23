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
    "K-005": C("a ring of six family pictures around a drawing frame; the family pictures are new art."),
    "K-011": C("a worker-to-product pair bank on the same pair layout (baker, barber and mail carrier pictures are in the occupations theme)."),
    "K-015": B("a color-the-land-and-water face of the maps family (a round outline, a blue dot in each ocean for level 1, a star for the United States at level 3)."),
    "K-016": B("a neighborhood face of the maps family (buildings as plan symbols, a dotted path to trace at level 1)."),
    "K-018": C("two place pictures as the groups, clothes and play items, no words."),
    "1-029": B("a park scene set (clean; litter, a broken branch and trampled flowers; clean again with new flowers)."),
    "2-038": C("a rules-and-reasons mode."),
    "2-051": C("a two-accounts bank (a child and the librarian on the day the library opened) with the underline-in-two-colors task."),
    "2-053": C("town-history texts with reason choices on the story-g2 factory."),
    "2-055": C("a lemonade-stand mode (a shopping list, the cost total, the income at two or three prices)."),
    "3-061": B("a map-scale face of the maps family."),
    "3-062": C("the grid-map plate with a title, a scale box and a places checklist."),
    "3-069": C("a problem-solver page (map, solutions table) with a 'Dear City Council members' letter frame."),
    "3-074": C("town-history texts in the same bank."),
  },
};
void N;
