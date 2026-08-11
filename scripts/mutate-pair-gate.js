/* =====================================================================
   mutate-pair-gate.js — poison TOOL #53's model, its stylesheet and its
   strings, ONE edit at a time, and require `verify-pair-gate.js` to
   notice every one.
   Run:  node scripts/mutate-pair-gate.js

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable from
   a failing one, so an unmutated copy must PASS before any mutation's
   failure means anything.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP — and so is an AMBIGUOUS
   one. `String.replace` takes the first hit, so a needle matching twice
   mutates a place nobody chose. #43 lost seven needles to a line-ending
   change alone and the run still said "every mutation killed".

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING, in the original AND in the
   needle. `git checkout` normalises line endings through core.autocrlf.

   ⚠ NO ENGLISH LITERAL IS TYPED ANYWHERE HERE. String mutations go
   through `enOf/enPrefix/enSwap/enRename`, which read the live literal
   off the file they are about to mutate, so a strings rewrite cannot
   silently blind them. The helpers THROW rather than return null.
   This tool's strings block is MULTI-LINE (`key: {\n        en: `),
   unlike #58's — the anchor knows that.

   ⚠ THE GATE READS ONE FILE. `verify-pair-gate.js` binds no port and
   opens no browser, so only `pair-gate.js` travels to the tmp dir.
   This tool has no data file; if one is ever added it MUST come here
   too, or the CONTROL fails loudly rather than the mutations passing
   quietly.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED — the
   harness scores a timeout as survival, so it is set explicitly.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'pair-gate.js');
const VERIFY = path.join(__dirname, 'verify-pair-gate.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* ⚠⚠ CLONE TRAP. A sed-clone whose pattern did not match once kept
   loading the PREVIOUS tool and reported a plausible pass. */
if (ORIGINAL.indexOf('pair-gate') < 0 || ORIGINAL.indexOf('PairGate') < 0) {
  console.log('FATAL: ' + SRC + ' does not look like THE PAIR GATE — refusing to run.');
  process.exit(1);
}

/* ---- self-anchored English-literal needles ------------------------ */
/* this tool writes `      key: {\n        en: '…',` */
function enOf(key) {
  const anchor = '      ' + key + ': {\n        en: ';
  const at = ORIGINAL.indexOf(anchor);
  if (at === -1) throw new Error('mutate: no multi-line anchor for `' + key + '` — the needle cannot self-anchor.');
  if (ORIGINAL.indexOf(anchor, at + 1) !== -1) throw new Error('mutate: `' + key + '` anchors twice; the needle would be ambiguous.');
  const q = ORIGINAL[at + anchor.length];
  if (q !== '"' && q !== "'") throw new Error('mutate: `' + key + '` is not followed by a string literal.');
  let i = at + anchor.length + 1;
  for (; i < ORIGINAL.length; i++) {
    if (ORIGINAL[i] === '\\') { i++; continue; }
    if (ORIGINAL[i] === q) break;
    if (ORIGINAL[i] === '\n') throw new Error('mutate: `' + key + '` literal is unterminated on its line.');
  }
  return { anchor: anchor, quote: q, body: ORIGINAL.slice(at + anchor.length + 1, i) };
}
function enPrefix(key, inject) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote, e.anchor + e.quote + inject + e.body + e.quote];
}
function enSwap(key, text) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote, e.anchor + e.quote + text + e.quote];
}
function enRename(key, to) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote,
    '      ' + to + ': {\n        en: ' + e.quote + e.body + e.quote];
}

/* [label, find, replace] */
const MUTATIONS = [
  /* ---- the model: the law itself --------------------------------- */
  ['standing: division instead of remainder',
    'standing: function (st) { var s = this._st(st); return s.total % s.k; },',
    'standing: function (st) { var s = this._st(st); return Math.floor(s.total / s.k); },'],
  ['standing: the complement (the misconception itself)',
    'standing: function (st) { var s = this._st(st); return s.total % s.k; },',
    'standing: function (st) { var s = this._st(st); return (s.k - s.total % s.k) % s.k; },'],
  ['done: an empty road claims to be done',
    'done: function (st) { var s = this._st(st); return s.total > 0 && this.waiting(s) < s.k; },',
    'done: function (st) { var s = this._st(st); return this.waiting(s) < s.k; },'],
  ['sendRank: marches with the bar down (the cutscene returns)',
    'sendRank: function (st) {\n      var s = this._st(st);\n      if (s.pred === null) return null;',
    'sendRank: function (st) {\n      var s = this._st(st);\n      if (false) return null;'],
  ['sendRank: a part-rank squeezes through',
    'if (this.waiting(s) < s.k) return null;\n      var x = this._copy(s);\n      x.ranks = s.ranks + 1;',
    'if (this.waiting(s) < s.k - 1) return null;\n      var x = this._copy(s);\n      x.ranks = s.ranks + 1;'],
  ['predict: accepts a boolean again (the old binary shape)',
    'if (s.total <= 0) return null;\n      if (s.pred !== null) return null;\n      if (typeof n !== \'number\' || n % 1 !== 0) return null;',
    'if (s.total <= 0) return null;\n      if (s.pred !== null) return null;\n      if (n === undefined) return null; n = +n;'],
  ['predict: accepts k — an impossible standing count',
    'if (s.total <= 0) return null;\n      if (s.pred !== null) return null;\n      if (typeof n !== \'number\' || n % 1 !== 0) return null;\n      if (n < 0 || n >= s.k) return null;',
    'if (s.total <= 0) return null;\n      if (s.pred !== null) return null;\n      if (typeof n !== \'number\' || n % 1 !== 0) return null;\n      if (n < 0 || n > s.k) return null;'],
  ['setTotal: a committed parade can be resized',
    'setTotal: function (st, t) {\n      var s = this._st(st);\n      if (s.pred !== null) return null;',
    'setTotal: function (st, t) {\n      var s = this._st(st);\n      if (false) return null;'],
  ['setSecond: the RIG returns (multiples of k refused)',
    'if (s.pred2 !== null) return null;\n      if (typeof t !== \'number\' || t % 1 !== 0) return null;',
    'if (s.pred2 !== null) return null;\n      if (t % s.k === 0) return null;\n      if (typeof t !== \'number\' || t % 1 !== 0) return null;'],
  ['setSecond: arrives mid-march',
    'if (!this.done(s)) return null;\n      if (this.standing(s) === 0) return null;',
    'if (false) return null;\n      if (this.standing(s) === 0) return null;'],
  ['setSecond: arrives after a cleared parade',
    'if (!this.done(s)) return null;\n      if (this.standing(s) === 0) return null;',
    'if (!this.done(s)) return null;\n      if (false) return null;'],
  ['predictSill: commits after a fizzle',
    'if (this.standing(s) === 0 || this.standing2(s) === 0) return null;',
    'if (this.standing(s) === 0) return null;'],
  ['predictSill: accepts any numeral',
    'if (n !== 0 && n !== ab) return null;',
    'if (false) return null;'],
  ['toSill: loads without its commit',
    'toSill: function (st) {\n      var s = this._st(st);\n      if (s.sillPred === null) return null;',
    'toSill: function (st) {\n      var s = this._st(st);\n      if (false) return null;'],
  ['sillFull: full at merely-enough instead of exactly-fills',
    'return s.onSill > 0 && s.onSill % s.k === 0;',
    'return s.onSill >= s.k;'],
  ['sillThrough: a short plate passes',
    'sillThrough: function (st) {\n      var s = this._st(st);\n      if (!this.sillFull(s)) return null;',
    'sillThrough: function (st) {\n      var s = this._st(st);\n      if (s.onSill === 0) return null;'],
  ['yardCount: the sill\'s passengers vanish from the yard',
    'if (s.sillGone) y += this.standing(s) + this.standing2(s);',
    ';'],

  /* ---- the export shape ------------------------------------------ */
  ['CAP off the curriculum cap', 'CAP: 20,', 'CAP: 21,'],
  ['MIN_N admits an archway of one', 'MIN_N: 2,', 'MIN_N: 1,'],
  ['premium ships true', 'premium: false,', 'premium: true,'],
  ['a `tasks` array appears — the shell would render activity chrome',
    "id: 'pair-gate',", "id: 'pair-gate',\n    tasks: [],"],
  ['setWidth returns from the dead',
    'barUp: function (st) { return this._st(st).pred !== null; },',
    'barUp: function (st) { return this._st(st).pred !== null; },\n    setWidth: function (st, k) { var s = this._st(st); var x = this._copy(s); x.k = k; return x; },'],
  ['bringSecond returns from the dead',
    'sillFull: function (st) {',
    'bringSecond: function (st, t) { return this.setSecond(st, t); },\n    sillFull: function (st) {'],
  ['the debounce goes back under a frequency name',
    'T_SND_DEBOUNCE: 160', 'SND_DEBOUNCE: 160'],

  /* ---- motion constants that must reach the screen ---------------- */
  ['T_STEP2 stops being read — the auto-march cadence names nothing',
    'self._autoTimer = window.setTimeout(step, self._dur(GEO.T_STEP2));',
    'self._autoTimer = window.setTimeout(step, self._dur(300));'],
  ['T_SND_DEBOUNCE stops being read',
    'now - this._lastSound < GEO.T_SND_DEBOUNCE', 'now - this._lastSound < 160'],
  ['RM_FLOOR stops being read — reduced motion would SKIP, not compress',
    'return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));',
    'return Math.round(ms * GEO.RM_F);'],
  ['T_THUD stops being read — the wall thud hardcodes',
    "'transition:transform ' + GEO.T_THUD + 'ms ease-out;}'",
    "'transition:transform 90ms ease-out;}'"],
  ['T_SILL is routed through _dur — a wait is not movement',
    '}, GEO.T_SILL);', '}, self._dur(GEO.T_SILL));'],

  /* ---- the fly engine: persistent nodes, one interpolator ---------- */
  ['the fly engine CLONES — the persistent-node law broken',
    'holder.appendChild(it.node);',
    'holder.appendChild(it.node.cloneNode(true));'],
  ['a second interpolator appears',
    'this._snd(GEO.SND_REFUSE, true);',
    'this._snd(GEO.SND_REFUSE, true);\n      window.requestAnimationFrame(function () {});'],

  /* ---- strings and the refuse-list -------------------------------- */
  ['refuse-list JUDGE: a landing is marked correct', ...enPrefix('saidRank', 'That is correct. ')],
  ['refuse-list JUDGE: a score appears', ...enPrefix('saidClear', 'Your score went up. ')],
  ['refuse-list TIMER: a clock appears', ...enPrefix('saidParade', 'The timer is running. ')],
  ['refuse-list EFFICACY: an efficacy claim', ...enPrefix('gateBody', 'A proven method. ')],
  ['a token the paint never supplies', ...enSwap('saidRank', '{n} through, {who} still waiting.')],
  ['the standing count loses its token', ...enSwap('saidStand', 'Some are left standing.')],
  ['the short-sill string claims wider archways never fill (refuted in 237 states)',
    ...enSwap('saidSillShort', '{a} and {b} on the sill make {c} — and {c} does not fill a rank of {k}. Two left-behinds only ever make a full rank when the archway takes two.')],
  ['an authored key is renamed out from under the render', ...enRename('saidMarchOn', 'saidMarchOnward')],
  ['an authored string is emptied', ...enSwap('gateCta', '')],
  ['the product name drifts', ...enSwap('title', 'The Parade Arch')],
  ['a banned part-noun enters', ...enPrefix('saidBusy', 'The loner waits. ')],

  /* ---- the stylesheet and the two print paths ---------------------- */
  ['the html scroll rule is removed',
    "+ 'html.pgt-scroll{overflow-y:auto;height:auto;min-height:100%;}'\n", '+ \'\'\n'],
  ['the body scroll rule is made INERT (overflow-y alone)',
    "+ 'body.pgt-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'",
    "+ 'body.pgt-scroll{overflow-y:auto;}'"],
  ['the html scroll class is never added',
    "document.documentElement.classList.add('pgt-scroll');", ';'],
  ['the body scroll class is never added',
    "document.body.classList.add('pgt-scroll');", ';'],
  ['a vh unit enters the manipulative',
    "'.pgt-card{container-type:inline-size;",
    "'.pgt-card{min-height:40vh;container-type:inline-size;"],
  ['the emitted @media print{ literal is split',
    "+ '@media print{'", "+ '@media ' + 'print{'"],
  ['the sheet moves back inside the wrap (0mm on paper)',
    'api.stage.appendChild(this._sheet);', 'this._wrap.appendChild(this._sheet);'],
  ['Ctrl+P hands the paid sheet to every non-subscriber',
    "if (self.premium) { self._buildSheet(); document.body.classList.add('pgt-printing'); }",
    "self._buildSheet(); document.body.classList.add('pgt-printing');"],
  ['the print chip stops checking entitlement',
    'if (!this.premium) { this._gate(); return; }', ';'],
  ['the entitlement failure path is removed',
    "['catch'](function () {});", ';'],
  ['the lifted boom fades again',
    "+ '.pgt-bar.is-up{transform:translateY(",
    "+ '.pgt-bar.is-up{opacity:.25;transform:translateY("],
  ['the empty seat regresses to the uneven CSS border dash',
    "+ '.pgt-seat{width:var(--pgt-m);height:var(--pgt-m);flex:none;'",
    "+ '.pgt-seat{width:var(--pgt-m);height:var(--pgt-m);flex:none;border:2px dashed #7A6A55;'"],
  ['the seat builder loses its round caps',
    "stroke-linecap=\"round\" ", ''],
  ['the pgt-wrap literal drifts — the liveness gate goes blind',
    "api.el('div', 'pgt-wrap')", "api.el('div','pgt-wrap')"]
];

/* ------------------------------------------------------------------ */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pgt-mut-'));
const tmpTool = path.join(tmp, 'pair-gate.js');

function runGate() {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { PAIR_GATE_TOOL_DIR: tmp }),
      timeout: 30000, stdio: 'pipe'
    });
    return true;                    /* gate passed */
  } catch (e) {
    if (e.killed || e.signal) return 'TIMEOUT';
    return false;                   /* gate failed — the mutation was killed */
  }
}

/* ⚠⚠ THE CONTROL COMES FIRST. */
fs.writeFileSync(tmpTool, ORIGINAL, 'utf8');
const control = runGate();
if (control !== true) {
  console.log('CONTROL FAILED (' + control + ') — the unmutated tool does not pass its own gate.');
  console.log('Nothing below would mean anything. Fix the gate or the tool first.');
  process.exit(1);
}
console.log('CONTROL: the unmutated tool PASSES.\n');

let killed = 0, survived = [], faults = [];
MUTATIONS.forEach(([label, find, repl]) => {
  const needle = String(find).replace(/\r\n/g, '\n');
  const hits = ORIGINAL.split(needle).length - 1;
  if (hits === 0) { faults.push('NEEDLE MISSING  · ' + label); return; }
  if (hits > 1) { faults.push('NEEDLE AMBIGUOUS (' + hits + ' hits) · ' + label); return; }
  fs.writeFileSync(tmpTool, ORIGINAL.replace(needle, repl), 'utf8');
  const r = runGate();
  if (r === false) { killed++; }
  else survived.push(label + (r === 'TIMEOUT' ? '   [the gate TIMED OUT — a hang is a survival]' : ''));
});

fs.rmSync(tmp, { recursive: true, force: true });

console.log('mutations: ' + MUTATIONS.length + '  killed: ' + killed +
  '  survived: ' + survived.length + '  faults: ' + faults.length);
if (faults.length) { console.log('\nFAULTS (a needle that does not match is a FAULT, never a skip):'); faults.forEach(f => console.log('  ! ' + f)); }
if (survived.length) { console.log('\nSURVIVED:'); survived.forEach(s => console.log('  ✗ ' + s)); }
if (faults.length || survived.length) process.exit(1);
console.log('\n✓ mutate-pair-gate: every mutation killed, 0 faults');
