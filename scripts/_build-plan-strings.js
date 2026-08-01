/* =====================================================================
   _build-plan-strings.js — the SoT for TOOL #44's UI strings
   ---------------------------------------------------------------------
   18 keys × 11 locales. Applied by apply-build-plan-locales.js.
   ⚠ NEVER hand-edit the strings block in `mini tools/build-plan.js`.

   ⭐ REBUILT, NEVER TRANSLATED (§A.13.48). Ten native panels across
   three ensembles, each a linguist + a K-2 teacher + a marketing
   writer. They were handed the ENGLISH AS A SOURCE TO AUDIT, not as a
   target to render.
   ===================================================================== */

module.exports = {
  en: {
    "title": "The Blueprint",
    "instruction": "Write a number in each square of the blueprint — that is how many cubes tall it is. The building follows. Turn it, and see what changes.",
    "sceneLabel": "A blueprint of nine squares, each with a number in it, and beside it the building those numbers make, drawn in cubes. Below the blueprint, the same building seen from the front and seen from the side.",
    "hintPlan": "Change a number in the blueprint and watch that part of the building rise or fall.",
    "hintTurn": "Turn it a quarter turn. The building is the same one — but the front becomes the side.",
    "hintSame": "Another building can look exactly like this from the front and from the side. Ask the class to picture one before you show it.",
    "hintDetermined": "This one is pinned down: no other building looks like this from both directions.",
    "cellAria": "blueprint square, row {r} of 3, place {c} of 3, height {v}. Drag up or down, or use the arrow keys.",
    "colAria": "the building, row {r} of 3, place {c} of 3, height {v}. Drag up or down, or use the arrow keys.",
    "frontAria": "the same building seen from the front",
    "sideAria": "the same building seen from the side",
    "turnBtn": "Turn a quarter",
    "sameBtn": "Another one like this",
    "nextBtn": "Another blueprint",
    "printBtn": "Print the blueprints",
    "gateTitle": "More blueprints",
    "gateBody": "Eleven more, ordered so each one surprises after the last, and the sheet to print: empty blueprints with the squares ruled and no numbers, to fill in by hand.",
    "gateCta": "See the Teacher plan"
  }
};
