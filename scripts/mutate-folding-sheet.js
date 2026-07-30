#!/usr/bin/env node
/* Mutation harness for verify-folding-sheet.js.
   Each mutation is a defect a future edit could plausibly introduce; the
   gate must FAIL on every one. A SURVIVOR is a hole in the gate, never
   an acceptable mutation — fix the gate, never the mutation list.
   A gate run that HANGS counts as failed too, hence the timeout. */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC_PATH = path.join(ROOT, 'mini tools', 'folding-sheet.js');
const ORIG = fs.readFileSync(SRC_PATH, 'utf8');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'fsh-mut-'));

/* anchor on the GENERATED shape of a strings line, so a locale pass
   (which rewrites the block) cannot silently un-anchor a mutation */
const sline = (k) => {
  const m = new RegExp('^ {4}' + k + ':\\s+\\{ ?en: [\'"][^\'"]*[\'"]', 'm').exec(ORIG);
  if (!m) throw new Error('cannot anchor string ' + k);
  return m[0];
};

const M = [
  /* ---- the reflection maps: the deepest thing this tool claims ---- */
  ['vertical crease off by one', "nc = 2 * x.k + 1 - c;", "nc = 2 * x.k - c;"],
  ['horizontal crease off by one', "nr = 2 * x.k + 1 - r;", "nr = 2 * x.k + 2 - r;"],
  ['main diagonal is not a transpose',
   "else if (x.kind === 'd') { nr = c;                nc = r; }",
   "else if (x.kind === 'd') { nr = r;                nc = c; }"],
  /* the anti-diagonal composed with a 180 turn — subtle, and a real
     thing a hurried edit would write */
  ['anti-diagonal is the main diagonal turned around',
   "else                     { nr = n - 1 - c;        nc = n - 1 - r; }",
   "else                     { nr = n - 1 - r;        nc = n - 1 - c; }"],
  ['the partner may land off the sheet', "if (nr < 0 || nr > n - 1 || nc < 0 || nc > n - 1) return -1;", "if (false) return -1;"],
  ['the straight crease sits ON a row, not in a gap',
   "if (x.kind === 'v')      { nr = r;                nc = 2 * x.k + 1 - c; }",
   "if (x.kind === 'v')      { nr = r;                nc = 2 * x.k - c + 0; }"],
  ['a diagonal crease is allowed off-centre', "if (kk === 'd' || kk === 'a') return { kind: kk, k: 0 };", "if (false) return { kind: kk, k: 0 };"],
  ['the near half is the wrong side', "if (x.kind === 'v') return c <= x.k;", "if (x.kind === 'v') return c > x.k;"],

  /* ---- the fold ---- */
  ['fold mutates the sheet', "fold: function (st) { var n = this._clone(st); n.folded = true; return n; }", "fold: function (st) { st.folded = true; return st; }"],
  ['open does not open', "open: function (st) { var n = this._clone(st); n.folded = false; return n; }", "open: function (st) { var n = this._clone(st); n.folded = true; return n; }"],
  ['two colours collapse into two layers', "if (self !== other) return { kind: 'twotone', count: 2 };", "if (false) return { kind: 'twotone', count: 2 };"],
  ['a lone painted cell counts as two layers', "if (self === null || other === null) return { kind: 'one', count: 1 };", "if (self === null || other === null) return { kind: 'one', count: 2 };"],
  ['a crease cell is treated as an ordinary pair', "if (m === idx) return { kind: self === null ? 'none' : 'crease', count: self === null ? 0 : 1 };", "if (false) return { kind: 'crease', count: 1 };"],

  /* ---- the claim: moving the crease must cost nothing ---- */
  ['moving the crease wipes the paint',
   "    next.crease = this.clampCrease(next.n, kind, k);\n    next.folded = false;",
   "    next.crease = this.clampCrease(next.n, kind, k);\n    next.paint = next.paint.map(function () { return null; });\n    next.folded = false;"],

  /* ---- ghosts ---- */
  ['ghosts include cells that are already painted', "if (st.paint[m] !== null) continue;", "if (false) continue;"],
  /* ⚠ the first version of this mutation just deleted the `m < 0` guard,
     and SURVIVED because it is provably inert: paint[-1] is undefined,
     and `undefined !== null` already continues. An inert mutation is not
     a gate hole — it is a bad mutation, and the honest fix is to write
     one that actually bites. This one really does push -1. */
  ['ghosts include off-sheet partners',
   "      if (m < 0 || m === i) continue;\n      if (st.paint[m] !== null) continue;",
   "      if (m === i) continue;\n      if (m >= 0 && st.paint[m] !== null) continue;"],
  ['committing a ghost overwrites the child’s colour',
   "      if (m >= 0) next.paint[g[i]] = st.paint[m];",
   "      if (m >= 0) { next.paint[g[i]] = st.paint[m]; next.paint[m] = st.paint[m]; }\n      next.paint[0] = 0;"],

  /* ---- state hygiene ---- */
  ['a mutator widens the state', "  paintAt: function (st, idx, colour) {\n    var next = this._clone(st);", "  paintAt: function (st, idx, colour) {\n    var next = this._clone(st); next.lastTouched = idx;"],
  ['paintAt mutates its input', "  paintAt: function (st, idx, colour) {\n    var next = this._clone(st);", "  paintAt: function (st, idx, colour) {\n    var next = st;"],
  ['the colour index stops clamping', "if (ci > this.COLOURS.length - 1) ci = this.COLOURS.length - 1;", "if (false) ci = 0;"],
  ['the crease offset stops clamping', "if (kn > n - 2) kn = n - 2;", "if (false) kn = n - 2;"],
  ['clampCrease rejects instead of clamping', "var kk = this.KINDS.indexOf(kind) > -1 ? kind : 'v';", "var kk = this.KINDS.indexOf(kind) > -1 ? kind : (function () { throw new Error('bad kind'); }());"],

  /* ---- the stance ---- */
  ['a verdict class appears', ".fsh-l-one{opacity:.4;}", ".fsh-l-one{opacity:.4;}.fsh-mismatch{color:#c00;}"],
  ['a score creeps in', "  singlesCount: function (st) {", "  score: function () { return 1; },\n  singlesCount: function (st) {"],
  ['the tool becomes an activity', "  STORE_KEY: 'lcs:folding-sheet:v1',", "  tasks: [{ id: 'x' }],\n  STORE_KEY: 'lcs:folding-sheet:v1',"],
  ['a verdict word enters a locale string', sline('oneLayer'), sline('oneLayer').replace(/en: (['"]).*?\1/, 'en: "wrong"')],
  ['⭐ the Grade-4 axis vocabulary enters a string', sline('creaseLabel'), sline('creaseLabel').replace(/en: (['"]).*?\1/, 'en: "The line of symmetry"')],
  ['⭐ a COUNT is named on screen', sline('twoLayers'), sline('twoLayers').replace(/en: (['"]).*?\1/, 'en: "2 layers"')],
  ['⭐ letters leak in from L5', "  COLOURS: ['#146B5E', '#F2C879', '#6B4C9A', '#3E7CB1'],", "  LETTERS: ['b','d','p','q'],\n  COLOURS: ['#146B5E', '#F2C879', '#6B4C9A', '#3E7CB1'],"],
  ['an exfiltration path opens', "fetch('/api/auth/me'", "fetch('/api/track');fetch('/api/auth/me'"],
  ['a verdict colour enters the palette', "'#146B5E', '#F2C879'", "'#D33A2C', '#F2C879'"],

  /* ---- geometry + chrome ---- */
  ['the sheet stops being square', "aspect-ratio:1/1", "aspect-ratio:4/3"],
  ['the paint cell drops below the canvas floor', "--fsh-cell:clamp(34px", "--fsh-cell:clamp(22px"],
  ['a control drops below the tap floor', ".fsh-chip{min-height:44px", ".fsh-chip{min-height:30px"],
  ['the gap handle shrinks', ".fsh-gaps-v .fsh-gap{top:0;bottom:0;width:44px", ".fsh-gaps-v .fsh-gap{top:0;bottom:0;width:20px"],
  ['css injector not idempotent', "if (document.getElementById('fsh-style')) return;", "if (false) return;"],
  ['print block removed', "@media print", "@media screen and (min-width:99999px)"],
  ['reduced motion SKIPS the fold', "@media (prefers-reduced-motion:reduce){.fsh-flap{transition-duration:.12s;}}", "@media (prefers-reduced-motion:reduce){.fsh-flap{transition:none;}}"],
  ['restyles shell internals unscoped', ".fsh-wrap{", ".lcs-stage{padding:0;}.fsh-wrap{"],
  ['wide scope removed', "body.fsh-wide", "body.fsh-nope"]
];

let died = 0; const survivors = [];
M.forEach(([name, from, to], n) => {
  if (ORIG.indexOf(from) === -1) { survivors.push(`${name}  [ANCHOR NOT FOUND — mutation never applied]`); return; }
  const dir = path.join(TMP, 'm' + n);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'folding-sheet.js'), ORIG.split(from).join(to), 'utf8');
  let failed = false;
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-folding-sheet.js')],
      { env: Object.assign({}, process.env, { FSH_TOOL_DIR: dir }), stdio: 'pipe', timeout: 30000 });
  } catch (e) { failed = true; }
  if (failed) { died++; console.log(`  killed   ${name}`); }
  else survivors.push(name);
});

console.log('');
survivors.forEach((s) => console.error(`  SURVIVED ${s}`));
console.log(`${died}/${M.length} mutations killed`);
process.exit(died === M.length ? 0 : 1);
