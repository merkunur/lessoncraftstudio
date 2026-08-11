/* =====================================================================
   _gap-fix-english.js — the SIX English defects the ten native panels
   found in TOOL #56, applied to `mini tools/the-gap.js`.
   Run:  node scripts/_gap-fix-english.js

   ⚠ A SCRIPT FILE, NOT `node -e`. Backticks inside `node -e` are command
   substitution and have silently DELETED text three times this session.

   ⚠ NODE, NOT PYTHON TEXT MODE. `io.open(p,'w')` on Windows rewrites
   \n to CRLF and blinds every multi-line mutation needle at once.

   ⚠ EVERY REPLACEMENT IS ANCHORED ON THE FULL CURRENT VALUE AND MUST
   MATCH EXACTLY ONCE. A missing needle is a FAULT, not a skip — a
   dropped edit that still reports success is the recorded defect.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'the-gap.js');
let src = fs.readFileSync(TOOL, 'utf8');

const EDITS = [

  /* 1. ⭐⭐ `saidTryOff` — WRONG FOR THE SECOND TIME. 10 of 10 panels
     convicted it by reading the render path: the try is added to
     `_counts`, a SIBLING of `_stage`, while the ground is a CHILD of it,
     so nothing about a try is ever drawn on the ground. */
  ['saidTryOff',
    "en: 'That try is already on the ground.'",
    "en: 'That number is already your try.'"],

  /* 2. `test` — its ONLY call site is
        `_fmt(t('test'), {}) + ' ' + Math.abs(k)`
     so the shipped aria-label reads "Try this many 3". */
  ['test',
    "en: 'Try this many'",
    "en: 'Try'"],

  /* 3. `ariaEnd` — "1 marks" at {m}=1, reachable in 22 of 240 scenes.
     `_fmt` has NO plural selector, so the sentence is restructured to a
     label:value form rather than given one. */
  ['ariaEnd',
    "en: 'The gap has lifted. The ground has {m} marks on it now. It had {n} before.'",
    "en: 'The gap has lifted. Marks on the ground now: {m}. Before: {n}.'"],

  /* 4. `instruction` — the bare "it" in "The gap covers it" resolves to
     THE GROUND by nearest antecedent, which is the exact error just
     removed from `ariaGap`. "how much" is also wrong over a countable. */
  ['instruction',
    "en: 'Count what is on the ground. The gap covers it for a moment, and the ground shows you only whether something came or went — never how much. When the gap lifts, count again and work out what happened while you could not see.'",
    "en: 'Count the marks on the ground. The gap covers the marks for a moment — the ground stays visible, and it shows you only whether something came or went, never how many. When the gap lifts, count again and work out what happened while the marks were hidden.'"],

  /* 5. `sheetTitle` — promised "before and after" in every phase, but
     `_buildSheet` prints `[s.n, s.m]` ONLY in phase `after` and `[s.n]`
     otherwise, so the promise is broken in two phases of three. */
  ['sheetTitle',
    "en: 'The ground before and after, and room to write what happened'",
    "en: 'The ground as the class watched it, and room to write what happened'"],

  /* 6. `lockedBody` — garden path: "the class just watched and ruled
     lines" parses as "watched and ruled". One comma settles it. */
  ['lockedBody',
    "en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the before and the after the class just watched and ruled lines for the sentences they wrote.'",
    "en: 'The whole apparatus is free — every gap, the ground, and as many tries as the class wants. A Teacher plan adds the printed sheet, which carries the before and the after the class just watched, and ruled lines for the sentences they wrote.'"]
];

let faults = 0, done = 0;
EDITS.forEach(function (e) {
  const key = e[0], find = e[1], repl = e[2];
  const hits = src.split(find).length - 1;
  if (hits !== 1) {
    faults++;
    console.log('  ⚠ FAULT  ' + key + ' — needle matched ' + hits + ' times, expected exactly 1');
    return;
  }
  src = src.replace(find, repl);
  done++;
  console.log('  ✓ ' + key);
});

if (faults) { console.log('\nFAIL — ' + faults + ' fault(s); NOTHING written.'); process.exit(1); }

fs.writeFileSync(TOOL, src);

/* ---- verify every write landed, from disk, cache busted ---------- */
delete require.cache[require.resolve(TOOL)];
const after = require(TOOL).strings;
let bad = 0;
EDITS.forEach(function (e) {
  const key = e[0];
  const want = e[2].slice("en: '".length, -1);
  if (after[key].en !== want) {
    bad++;
    console.log('  ✗ VERIFY ' + key + ' = ' + JSON.stringify(after[key].en));
  }
});
if (bad) { console.log('\nFAIL — ' + bad + ' value(s) did not land'); process.exit(1); }
console.log('\nPASS — ' + done + ' English defects fixed and verified on disk');
