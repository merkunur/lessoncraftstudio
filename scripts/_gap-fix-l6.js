/* =====================================================================
   _gap-fix-l6.js — L6 sampled a state its own comment says it does not.
   Run:  node scripts/_gap-fix-l6.js

   ⚠⚠ THIS IS A FIX TO **WHAT IS MEASURED**, NOT TO A THRESHOLD. The
   house rule is that a gate is never weakened to let a change through;
   it is corrected when it measures the wrong thing. Here the harness
   states its own intent in a comment —

       "the state the CHILD sees: the pulse is running"

   — and then paints the gap phase BEFORE switching the pulse on, with
   `T._pulsed` left unset. The runtime sets `_pulsed` beside
   `_wave.classList.add('is-on')`, so the harness was fingerprinting a
   state that exists for 380ms at the START of the gap and calling it the
   pulse-running state. The two disagreed, and the disagreement surfaced
   as "the two directions announce the SAME thing".

   ⭐ AND IT IS MADE STRICTLY STRONGER, NOT LOOSER. The old L6 asked one
   question: does the ground carry the direction while the pulse runs? It
   now asks TWO, and the second is the invariant the `_pulsed` change
   exists to protect:

     (a) WHILE THE PULSE RUNS — the two directions must differ. (as before)
     (b) BEFORE THE PULSE STARTS — the ground must announce NOTHING, in
         both directions. A screen-reader user must not receive the
         evidence ahead of the sighted class. That leak was live for the
         first 380ms of every gap and NO GATE COULD SEE IT, because the
         harness never sampled that instant.

   So the change closes a hole rather than opening one: a build that
   announces the direction at gap-entry now FAILS (b), and a build that
   never announces it at all still fails (a).

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const GATE = path.join(__dirname, 'verify-the-gap.js');
let src = fs.readFileSync(GATE, 'utf8').replace(/\r\n/g, '\n');

const EDITS = [

  /* ---- sample BOTH instants, and set the flag the runtime sets ----- */
  ['sample the pre-pulse instant and the pulse-running instant',
    "        T.st = { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };\n" +
    "        T._paint();\n" +
    "        /* ⚠ the state the CHILD sees: the pulse is running. Statically the\n" +
    "           two directions differ only by a class name; it is the running\n" +
    "           animation that carries the evidence, so it is measured here. */\n" +
    "        wave.classList.add('is-on');",

    "        T.st = { n: s.n, k: s.k, m: s.m, phase: 'gap', tried: null };\n" +
    "        /* ⚠⚠ INSTANT ONE — THE GAP HAS OPENED AND THE PULSE HAS NOT RUN.\n" +
    "           The runtime sets `_pulsed` beside `_wave.classList.add('is-on')`,\n" +
    "           so this is the real 380ms window at the head of every gap. The\n" +
    "           ground must announce NOTHING here, or a screen-reader user gets\n" +
    "           the evidence before the sighted class does. */\n" +
    "        T._pulsed = false;\n" +
    "        T._paint();\n" +
    "        const preGroundAria = ground.getAttribute('aria-label') || '';\n" +
    "        /* ⚠ the state the CHILD sees: the pulse is running. Statically the\n" +
    "           two directions differ only by a class name; it is the running\n" +
    "           animation that carries the evidence, so it is measured here.\n" +
    "           ⚠⚠ `_pulsed` IS SET FIRST — this comment claimed the pulse was\n" +
    "           running while the paint still saw it stopped, so the harness\n" +
    "           fingerprinted the pre-pulse state and called it the pulse. */\n" +
    "        T._pulsed = true;\n" +
    "        T._paint();\n" +
    "        wave.classList.add('is-on');"],

  /* ---- carry the pre-pulse reading out of the page ----------------- */
  ['record the pre-pulse ground announcement',
    "          /* (4) the aria label, on both the stage and the ground */\n" +
    "          aria: (stage.getAttribute('aria-label') || '') + ' || ' + (ground.getAttribute('aria-label') || ''),",

    "          /* (4) the aria label, on both the stage and the ground */\n" +
    "          aria: (stage.getAttribute('aria-label') || '') + ' || ' + (ground.getAttribute('aria-label') || ''),\n" +
    "          /* (4b) what the ground said BEFORE the pulse ran */\n" +
    "          preAria: preGroundAria,"],

  /* ---- and assert it ----------------------------------------------- */
  ['assert no direction reaches the ground before the pulse',
    "      ok(!/\\{\\w+\\}/.test(recs[0].aria), 'L6 ⚠ a RAW TOKEN is rendering in the gap aria label: ' + recs[0].aria);",

    "      ok(!/\\{\\w+\\}/.test(recs[0].aria), 'L6 ⚠ a RAW TOKEN is rendering in the gap aria label: ' + recs[0].aria);\n" +
    "      /* ⭐⭐ THE ALIGNMENT INVARIANT. The direction is the evidence, and it\n" +
    "         may not reach one channel before the other. At gap-entry the\n" +
    "         sighted class sees a dark stage and no pulse, so the ground must\n" +
    "         say nothing to a screen reader either. This ran unmeasured for\n" +
    "         the first 380ms of every gap. */\n" +
    "      const leaked = recs.filter(function (r) { return r.preAria !== ''; });\n" +
    "      ok(leaked.length === 0, 'L6 ⚠⚠ the ground announced the DIRECTION at ' + leaked.length +\n" +
    "        ' scenes BEFORE the pulse ran — a screen-reader user gets the evidence ahead of the sighted class (e.g. ' +\n" +
    "        (leaked[0] ? JSON.stringify(leaked[0].preAria) : '') + ')');\n" +
    "      ok(recs.every(function (r) { return typeof r.preAria === 'string'; }),\n" +
    "        'L6 non-vacuity: the pre-pulse channel was never recorded, so the leak assertion above is empty');"]
];

let faults = 0;
EDITS.forEach(function (e) {
  const label = e[0], find = e[1], repl = e[2];
  const hits = src.split(find).length - 1;
  if (hits !== 1) { faults++; console.log('  ⚠ FAULT  ' + label + ' — needle matched ' + hits + ', expected 1'); return; }
  src = src.replace(find, repl);
  console.log('  ✓ ' + label);
});
if (faults) { console.log('\nFAIL — NOTHING written.'); process.exit(1); }

fs.writeFileSync(GATE, src);
console.log('\nPASS — L6 now samples both instants');
