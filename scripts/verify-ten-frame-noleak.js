#!/usr/bin/env node
/* =====================================================================
   verify-ten-frame-noleak.js — the numeral-leak gate for the SHARED
   ten-frame core and its activity sibling.

   Run:  node scripts/verify-ten-frame-noleak.js

   THE DEFECT THIS EXISTS FOR (found 2026-08-04, fixed the same day):
   `ten-frame-core.js` sets `hideReadout = true` for a "how many?" task
   so the child is not shown the answer they are being asked to work
   out. It hid the readout correctly — and then announced the count to
   the shell's polite live region ANYWAY, because the `api.announce`
   call sat OUTSIDE the `if (this.readoutNum)` guard. A screen-reader
   user was told the answer to the question on screen.

   It affected two shipped activities on their primary path:
     · ten-frame.how-many.0-10.animals      (K.CC.B.5)
     · ten-frame.write-numeral.0-20.fruits  (K.CC.A.3)

   ⭐ AND IT WAS IN TWO FILES. `ten-frame-activity.js` replaces paint()
   wholesale for the image-theme activities and carried its own copy of
   the line — and `how-many.animals` is an image-theme activity, so the
   copy in the SIBLING was the one that mattered most. Fixing only the
   core would have looked like a fix and left the worst instance live.

   `estimation-jar` (whose revealedCount() throws) and
   `number-talk-easel` (its numeral-leak gate) each carry a dedicated
   gate against exactly this class. This core predates both and had
   none. This is it, and it POISON-TESTS ITSELF against the shape of the
   original line, so a gate that could not fire is caught here rather
   than in a classroom.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = process.env.TNF_TOOL_DIR || path.join(__dirname, '..', 'mini tools');
const FILES = ['ten-frame-core.js', 'ten-frame-activity.js'];

let PASS = 0, FAIL = 0;
function is(cond, msg) { if (cond) PASS++; else { FAIL++; console.error('   FAIL: ' + msg); } }

/* Every `announce` of the count must be lexically INSIDE a block that
   is guarded by the readout's existence. Rather than parse JS, walk the
   braces: find the guard, find its block, and require the announce to
   sit within it. That is a structural test, not a pattern match. */
function announcesAreGuarded(src) {
  const out = { total: 0, guarded: 0, sites: [] };
  const re = /this\.api\.announce\s*\(/g;
  let m;
  while ((m = re.exec(src))) {
    out.total++;
    const at = m.index;
    /* find the nearest enclosing `if (this.readoutNum) {` block */
    let guarded = false;
    const gre = /if\s*\(\s*this\.readoutNum\s*\)\s*\{/g;
    let g;
    while ((g = gre.exec(src))) {
      if (g.index > at) break;
      /* walk to the matching close brace */
      let depth = 0, i = g.index + g[0].length - 1;
      for (; i < src.length; i++) {
        if (src[i] === '{') depth++;
        else if (src[i] === '}') { depth--; if (depth === 0) break; }
      }
      if (at > g.index && at < i) { guarded = true; break; }
    }
    if (guarded) out.guarded++;
    else out.sites.push(src.slice(Math.max(0, at - 90), at + 60).replace(/\s+/g, ' '));
  }
  return out;
}

console.log('\n[N1] every count announcement is inside the readout guard');
for (const f of FILES) {
  const p = path.join(DIR, f);
  is(fs.existsSync(p), `${f} exists`);
  if (!fs.existsSync(p)) continue;
  const src = fs.readFileSync(p, 'utf8');
  const r = announcesAreGuarded(src);
  is(r.total > 0, `${f} really does announce something (${r.total} sites) — a file that announces nothing would pass vacuously`);
  is(r.total === r.guarded,
    `${f}: ${r.guarded}/${r.total} announcements are guarded` +
    (r.sites.length ? ` — LEAKING at: ${r.sites.join(' | ')}` : ''));
}

console.log('\n[N2] hideReadout still does what it is for');
{
  const core = fs.readFileSync(path.join(DIR, 'ten-frame-core.js'), 'utf8');
  is(/hideReadout/.test(core), 'the core still carries hideReadout');
  is(/this\.readoutNum\s*=\s*null/.test(core),
    'and it still nulls the readout, which is what the guard keys on');
  /* the two activities that depend on it are still declared */
  const acts = JSON.parse(fs.readFileSync(path.join(DIR, 'ten-frame-activities.json'), 'utf8'));
  const rows = acts.activities || acts;
  const ids = rows.map((a) => a.id);
  is(ids.indexOf('ten-frame.how-many.0-10.animals') !== -1,
    'the K.CC.B.5 how-many activity is still shipped (it is what this protects)');
  is(ids.indexOf('ten-frame.write-numeral.0-20.fruits') !== -1,
    'and the K.CC.A.3 write-numeral activity');
}

console.log('\n[N3] POISON — the check fires on the shape of the original defect');
{
  const leaky = [
    'paint: function () {',
    '  if (this.readoutNum) this.readoutNum.textContent = String(this.count);',
    '  this.api.announce(this.api.t("count") + ": " + this.count);',
    '}'
  ].join('\n');
  const r1 = announcesAreGuarded(leaky);
  is(r1.total === 1 && r1.guarded === 0, 'POISON: an announce outside the guard is caught');

  const fixed = [
    'paint: function () {',
    '  if (this.readoutNum) {',
    '    this.readoutNum.textContent = String(this.count);',
    '    this.api.announce(this.api.t("count") + ": " + this.count);',
    '  }',
    '}'
  ].join('\n');
  const r2 = announcesAreGuarded(fixed);
  is(r2.total === 1 && r2.guarded === 1, 'POISON: the guarded form passes');

  /* ⚠ AND THE HARDER POISON: a guard that CLOSES before the announce.
     A naive "is there an if(readoutNum) somewhere above" check would
     pass this, which is the version of this gate I nearly wrote. */
  const sneaky = [
    'paint: function () {',
    '  if (this.readoutNum) { this.readoutNum.textContent = String(this.count); }',
    '  this.api.announce(this.api.t("count") + ": " + this.count);',
    '}'
  ].join('\n');
  const r3 = announcesAreGuarded(sneaky);
  is(r3.total === 1 && r3.guarded === 0,
    'POISON: an announce AFTER a closed guard is still caught (a nearest-guard-above check would miss it)');
}

console.log('');
if (FAIL) { console.error(`FAIL — ${FAIL} of ${PASS + FAIL}`); process.exit(1); }
console.log(`PASS — ${PASS} assertions`);
