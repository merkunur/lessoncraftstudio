/* =====================================================================
   MUTATION TEST — TOOL #58, THE QUEUE (Counting rebuild)
   =====================================================================
   Copies the tool into a tmp dir, applies ONE single-edit mutation, runs
   verify-the-queue.js against the copy (QUE_TOOL_DIR), and requires verify
   to FAIL. A CONTROL (unmutated) must PASS first. A needle that matches
   NOTHING is a FAULT (an inert mutation tests nothing and looks like a
   pass). This tool has no data file, so only the-queue.js is copied.

   Run: node scripts/mutate-the-queue.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const SRCFILE = path.join(__dirname, '..', 'mini tools', 'the-queue.js');
const VERIFY = path.join(__dirname, 'verify-the-queue.js');
const SRC = fs.readFileSync(SRCFILE, 'utf8');

function runVerify(dir) {
  try {
    execFileSync('node', [VERIFY], { env: Object.assign({}, process.env, { QUE_TOOL_DIR: dir }), stdio: 'pipe' });
    return 0;
  } catch (e) { return e.status || 1; }
}
function stage(src) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'que-mut-'));
  fs.writeFileSync(path.join(dir, 'the-queue.js'), src, 'utf8');
  return dir;
}

/* [label, find, replace] — each find MUST be present exactly once */
const MUTS = [
  ['landedIndex off-by-one', "return s.end === 'a' ? s.k - 1 : this.n(s) - s.k;", "return s.end === 'a' ? s.k : this.n(s) - s.k;"],
  ['both ends identical', "return s.end === 'a' ? s.k - 1 : this.n(s) - s.k;", "return s.k - 1;"],
  ['memberAtSlot both ends same', "return s.end === 'a' ? j : this.n(s) - 1 - j;", "return j;"],
  ['default end in newState', 'return { members: out, end: null, k: 0 };', "return { members: out, end: 'a', k: 0 };"],
  ['default end via defaults', "defaults: { size: 'five' },", "defaults: { size: 'five', end: 'a' },"],
  ['premium true', 'premium: false,', 'premium: true,'],
  ['tasks smuggled in', "id: 'the-queue',", "id: 'the-queue',\n    tasks: [],"],
  ['default size four', "defaults: { size: 'five' },", "defaults: { size: 'four' },"],
  ['CAP not 6', 'CAP: 6,', 'CAP: 5,'],
  ['MIN not 3', 'MIN: 3,', 'MIN: 2,'],
  ['mirrorK broken', 'mirrorK: function (st, k) { return this.n(st) + 1 - k; },', 'mirrorK: function (st, k) { return this.n(st) - k; },'],
  ['isSelfSame always', 'return n % 2 === 1 && k >= 1 && k === (n + 1) / 2;', 'return k >= 1;'],
  ['leave removes two', 'm.pop();                                    /* leaves from the', 'm.pop(); m.pop();                           /* leaves from the'],
  ['join duplicates a friend', 'm.push(pick);', 'm.push(s.members[0]);'],
  ['tags at rest', 'for (i = 0; i < s.k; i++) {', 'for (i = 0; i < Math.max(1, s.k); i++) {'],
  ['hand re-appended in paint', "hand.style.display = '';", "hand.style.display = ''; this._svg.appendChild(hand);"],
  ['scroll rule mangled', "'html.que-scroll{overflow-y:auto;height:auto;min-height:100%}',", "'html.que-BROKE{overflow-y:auto;height:auto;min-height:100%}',"],
  ['vh in the manipulative', "'.que-stage{position:relative;width:100%;", "'.que-stage{position:relative;height:50vh;width:100%;"],
  ['beforeprint leak', "if (!self.premium) { if (self._sheet) self._sheet.textContent = ''; return; }", "if (false) { return; }"],
  ['coral bare (hand loses stroke)', '.que-hand{fill:#F2784B;stroke:#A34122;stroke-width:2', '.que-hand{fill:#F2784B;stroke-width:0'],
  ['position word smuggled', 'sayPickEnd: { en: "Pick an end to count from.",', 'sayPickEnd: { en: "Pick the first end to count from.",'],
  ['efficacy claim smuggled', 'lockedTitle: { en: "The sheet is part of a Teacher plan",', 'lockedTitle: { en: "Proven to boost test scores — Teacher plan",'],
  ['timer word smuggled', 'sayTotal: { en: "How many? {n}.",', 'sayTotal: { en: "How many? {n}. Beat the clock — streak!",'],
  ['stray interpolation token', 'ariaLine: { en: "A line of {n} friends.",', 'ariaLine: { en: "A line of {n} friends {z}.",']
];

let fails = 0, survived = 0, faults = 0;
console.log('CONTROL (unmutated must PASS):');
const cdir = stage(SRC);
if (runVerify(cdir) !== 0) { console.log('  ✗ CONTROL FAILED — verify does not pass the real tool'); process.exit(1); }
console.log('  ✓ control passes\n');

MUTS.forEach(function (m) {
  const label = m[0], find = m[1], repl = m[2];
  const idx = SRC.indexOf(find);
  if (idx < 0) { console.log('  ⚠ FAULT (needle missing): ' + label); faults++; return; }
  if (SRC.indexOf(find, idx + 1) >= 0) { console.log('  ⚠ FAULT (needle not unique): ' + label); faults++; return; }
  const mutated = SRC.slice(0, idx) + repl + SRC.slice(idx + find.length);
  const dir = stage(mutated);
  const code = runVerify(dir);
  if (code === 0) { console.log('  ✗ SURVIVED: ' + label); survived++; }
});

if (faults) { console.log('\n' + faults + ' FAULTS (needles missing/duplicated) — fix the mutation list'); fails += faults; }
if (survived) { console.log('\n' + survived + ' MUTATIONS SURVIVED — verify has a hole'); fails += survived; }
console.log('\n' + (fails === 0 ? 'ALL ' + MUTS.length + ' MUTATIONS KILLED' : fails + ' problems'));
process.exit(fails === 0 ? 0 : 1);
