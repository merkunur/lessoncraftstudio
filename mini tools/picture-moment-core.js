/* =====================================================================
   CORE — Picture Moment  (picture-moment-core.js)
   ---------------------------------------------------------------------
   Generic, LOCALE-NEUTRAL "which illustration depicts this story moment"
   cognition — CCSS RL.K.7 (with prompting and support, describe the
   relationship between illustrations and the story in which they appear,
   e.g. what MOMENT in a story an illustration depicts). First skin:
   "Otto's Picture Book."

   A round is ONE story (4 illustrated beats, in order) + a `target` beat.
   The child hears the whole story, then ONE part is read aloud (the target
   caption) and they tap the ILLUSTRATION that shows that moment. The foils
   are the SAME story's OTHER real moments — so the child must know which
   part each picture depicts (not "pick the odd one"). A child who guesses
   has a 1-in-(beats) chance; the build-gate measures it.

   Validity is DERIVED — the correct panel is the target beat's panel, never
   a stored answer/correctIndex. `childView` exposes only the target caption
   (the question) + the choice PANELS (NO captions, NO answer). Pure
   functions, no DOM. Mirrors retell-story-core.js.
   ===================================================================== */
(function (global) {
  'use strict';

  function beats(round) { return round.story.beats; }
  function targetBeat(round) { var bs = beats(round); for (var i = 0; i < bs.length; i++) if (bs[i].id === round.target) return bs[i]; return null; }
  function targetCaption(round) { var b = targetBeat(round); return b ? b.caption : ''; }
  function correctPanel(round) { var b = targetBeat(round); return b ? b.panel : null; }
  /* the choices = every beat's illustration, in STORY ORDER (the picture-book spread) */
  function choicePanels(round) { return beats(round).map(function (b) { return b.panel; }); }
  function panelCaption(round, panel) { var bs = beats(round); for (var i = 0; i < bs.length; i++) if (bs[i].panel === panel) return bs[i].caption; return ''; }
  function correctIndex(round) { return choicePanels(round).indexOf(correctPanel(round)); }

  /* THE GRADE — the tapped illustration IS the target beat's illustration.
     DERIVED; no stored answer. Pure → the verify gate tests it directly. */
  function grade(round, pickedPanel) { return pickedPanel != null && pickedPanel === correctPanel(round); }

  /* the watch film (stage 0 — the story narrated in order, captions spoken) */
  function watchFilm(round) { return beats(round).map(function (b) { return { panel: b.panel, caption: b.caption }; }); }

  /* the ANSWER surface — the question (target caption) + the choice PANELS only;
     NEVER the answer, the correct index, or the choices' captions. */
  function childView(round) {
    return {
      id: round.id,
      prompt: targetCaption(round),
      choices: choicePanels(round).map(function (p) { return { panel: p }; })
    };
  }

  /* ---- seeded rng (the gate drives the solvers deterministically) ---- */
  function mulberry32(seed) { var a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  /* ---- SOLVERS (the gate's adversary bank; scored against grade) ---- */
  function oracleSolver(round) { return correctPanel(round); }
  function randomGuess(round, rng) { var c = choicePanels(round); return c[Math.floor(rng() * c.length)]; }
  function fixedPosition(round, pos) { var c = choicePanels(round); return c[pos % c.length]; }   // "always tap the Nth picture"

  global.PictureMomentCore = {
    beats: beats, targetBeat: targetBeat, targetCaption: targetCaption,
    correctPanel: correctPanel, correctIndex: correctIndex, choicePanels: choicePanels,
    panelCaption: panelCaption, grade: grade, watchFilm: watchFilm, childView: childView,
    mulberry32: mulberry32,
    SOLVERS: { oracleSolver: oracleSolver, randomGuess: randomGuess, fixedPosition: fixedPosition }
  };

}(typeof window !== 'undefined' ? window : this));
