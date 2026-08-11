/* =====================================================================
   _gap-fix-pulsed-and-tense.js — TWO live defects, both measured.
   Run:  node scripts/_gap-fix-pulsed-and-tense.js

   ---------------------------------------------------------------------
   1. ⚠⚠ `_pulsed` WAS READ AND NEVER WRITTEN — a half-applied repair.
   ---------------------------------------------------------------------
   `_paint` gates the ground's direction label on `!this._pulsed`, but
   MEASURED over the whole file the identifier appeared exactly twice:
   once in a comment and once in that condition. NOTHING EVER SET IT.
   So the flag was permanently `undefined`, the `gap` branch was always
   taken, and the direction stopped reaching a screen-reader user during
   the gap AT ALL — it now arrived only in phase `after`.

   The intended fix delayed the announcement by `T_FALL` so both channels
   carry the evidence at the same instant. The shipped one delayed it to
   the END of the gap, so the blind user gets the evidence LAST instead
   of simultaneously — a worse defect than the 380ms lead it replaced,
   and invisible to every gate because a never-written flag reads as a
   perfectly ordinary falsy value.

   This is the recorded class twice over: the dead constant that is
   declared and never read (#55 shipped seven), and "a repair is not
   finished when the thing it repaired starts working".

   The flag is now WRITTEN beside the pulse and CLEARED on every path
   that abandons or restarts a run — `_clearTimers` (the one exit),
   `_run` (each new gap starts unpulsed) and `_again` (a fresh scene).

   ---------------------------------------------------------------------
   2. ⚠⚠ THE PAID PROMISE DESCRIBED A RECORD THE TOOL REFUSES TO KEEP.
   ---------------------------------------------------------------------
   `lockedBody` said "ruled lines for the sentences they WROTE" — past
   tense, describing something captured. The lines are BLANK, and this
   very file states the platform ruling at :1398 — "RULED LINES, NOT A
   CAPTURED RECORD. class-graph.js:62 … a class's answers are a moment,
   not a record." The sentence sold the opposite of a deliberate design
   decision, on the string the money is taken on. Present tense.

   ⚠ A script file, not `node -e`; node, not Python text mode.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(TOOL, 'utf8');

const EDITS = [
  /* --- 1. write the flag beside the pulse --------------------------- */
  ['set _pulsed when the pulse starts',
    "        self._wave.classList.add('is-on');\n        self._snd(GEO.SND_STEP);",
    "        self._wave.classList.add('is-on');\n        /* ⚠ THE FLAG THE PAINT READS. Without this line `_pulsed` is\n           permanently undefined and the direction never reaches a\n           screen-reader user during the gap at all. */\n        self._pulsed = true;\n        self._paint();\n        self._snd(GEO.SND_STEP);"],

  /* --- clear it on the one exit ------------------------------------- */
  ['clear _pulsed in _clearTimers',
    "      this._busy = false;\n      if (this._wave) this._wave.classList.remove('is-on');",
    "      this._busy = false;\n      this._pulsed = false;\n      if (this._wave) this._wave.classList.remove('is-on');"],

  /* --- and each new gap starts unpulsed ----------------------------- */
  ['clear _pulsed when a run starts',
    "      this._busy = true;\n      this.st = n1;                       /* -> gap */",
    "      this._busy = true;\n      this._pulsed = false;\n      this.st = n1;                       /* -> gap */"],

  /* --- and a freshly dealt scene ------------------------------------ */
  ['clear _pulsed when a new scene is dealt',
    "      this.st = this.newState(this.api.settings.range);\n      this._snd(GEO.SND_FALL);",
    "      this._pulsed = false;\n      this.st = this.newState(this.api.settings.range);\n      this._snd(GEO.SND_FALL);"],

  /* --- 2. the tense on the paid promise ----------------------------- */
  ['lockedBody promises a record the tool refuses to keep',
    "and ruled lines for the sentences they wrote.'",
    "and ruled lines for the sentences the class writes.'"]
];

let faults = 0;
EDITS.forEach(function (e) {
  const label = e[0], find = e[1].replace(/\r\n/g, '\n'), repl = e[2];
  const hits = src.replace(/\r\n/g, '\n').split(find).length - 1;
  if (hits !== 1) { faults++; console.log('  ⚠ FAULT  ' + label + ' — needle matched ' + hits + ', expected 1'); return; }
  src = src.replace(/\r\n/g, '\n').replace(find, repl);
  console.log('  ✓ ' + label);
});
if (faults) { console.log('\nFAIL — NOTHING written.'); process.exit(1); }

fs.writeFileSync(TOOL, src);

/* ---- verify from disk -------------------------------------------- */
const after = fs.readFileSync(TOOL, 'utf8');
let bad = 0;
const writes = (after.match(/self\._pulsed = true|this\._pulsed = false/g) || []).length;
const reads = (after.match(/this\._pulsed/g) || []).length;
if (writes < 4) { console.log('✗ only ' + writes + ' _pulsed writes; expected 4'); bad++; }
if (!/!this\._pulsed/.test(after)) { console.log('✗ the _pulsed read vanished'); bad++; }
if (/sentences they wrote/.test(after)) { console.log('✗ the past tense survives'); bad++; }

delete require.cache[require.resolve(TOOL)];
const S = require(TOOL).strings;
if (!/the class writes/.test(S.lockedBody.en)) { console.log('✗ lockedBody.en = ' + JSON.stringify(S.lockedBody.en)); bad++; }
if (bad) process.exit(1);

console.log('\nPASS — _pulsed now written on 4 paths and read on ' + reads + '; lockedBody tense fixed');
console.log('  lockedBody: ' + S.lockedBody.en);
