/* =====================================================================
   mutate-doubling-mirror.js — poison TOOL #54's model, its stylesheet
   and its strings, ONE edit at a time, and require
   `verify-doubling-mirror.js` to notice every one.
   Run:  node scripts/mutate-doubling-mirror.js

   ⚠⚠ THIS GATE HAS NEVER EXISTED FOR THIS TOOL. Gate 2 of the six was
   never run on #54 — on a tool whose own git history reads "both my
   gates helped themselves past it". A 744-assertion model gate that
   has never been mutation-tested is a gate nobody has watched fail.

   ⚠ A CONTROL RUN COMES FIRST. A crashed gate is indistinguishable
   from a failing one, so an unmutated copy must PASS before any
   mutation's failure means anything.

   ⚠ A MISSING NEEDLE IS A FAULT, NOT A SKIP — and so is an AMBIGUOUS
   one. `String.replace` takes the first hit, so a needle matching
   twice mutates a place nobody chose.

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING, in the original AND in the
   needle. `git checkout` normalises line endings through core.autocrlf.

   ⚠ NO ENGLISH LITERAL IS TYPED ANYWHERE HERE. String mutations go
   through `enOf/enPrefix/enSwap/enRename`, which read the live literal
   off the file they are about to mutate, so a locale fold cannot
   silently blind them. The helpers THROW rather than return null.

   ⚠ THE GATE READS ONE FILE. `verify-doubling-mirror.js` binds no port
   and opens no browser, so only `doubling-mirror.js` travels to the
   tmp dir. This tool has no data file; if one is ever added it MUST
   come here too.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'doubling-mirror.js');
const VERIFY = path.join(__dirname, 'verify-doubling-mirror.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* ⚠⚠ CLONE TRAP. A sed-clone whose pattern did not match once kept
   loading the PREVIOUS tool and reported a plausible pass. */
if (ORIGINAL.indexOf('doubling-mirror') < 0 || ORIGINAL.indexOf('DoublingMirror') < 0) {
  console.log('FATAL: ' + SRC + ' does not look like THE DOUBLING MIRROR — refusing to run.');
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
  /* ---- the model: composition and decomposition ------------------ */
  ['close: the far leaf receives nothing (the doubling is deleted)',
    'var t = s.far === 0 ? s.near * 2 : s.near + s.far + s.odd;',
    'var t = s.near + s.far + s.odd;'],
  ['close: the far leaf receives one too many',
    'var t = s.far === 0 ? s.near * 2 : s.near + s.far + s.odd;',
    'var t = s.far === 0 ? s.near * 2 + 1 : s.near + s.far + s.odd;'],
  ['close: a gathered tray loses the odd one',
    'var t = s.far === 0 ? s.near * 2 : s.near + s.far + s.odd;',
    'var t = s.far === 0 ? s.near * 2 : s.near + s.far;'],
  /* ⭐⭐ THESE FOUR REPLACED PROVEN-INERT MUTATIONS. `scripts/_dbm-inertness.js`
     walked all 1788 reachable states and showed that removing close's
     empty/shut guards, open's unshut guard and claim's >=2 guard
     changes NO mutator's answer anywhere and reaches NO new state --
     they are defence in depth behind an earlier check, so no test
     could ever have observed them. An inert mutation is a BAD
     MUTATION, not a gate hole; but DELETING it would trade a false
     pass for less coverage, so each is replaced by a mutation of the
     same guard that IS observable. */
  ['close: a near leaf of ONE is refused',
    'if (s.near < 1) return null;', 'if (s.near < 2) return null;'],
  ['close: it acts on a SHUT tray instead of an open one',
    'close: function (st) {\n      var s = this._st(st);\n      if (s.shut) return null;',
    'close: function (st) {\n      var s = this._st(st);\n      if (!s.shut) return null;'],
  ['open: the split rounds the wrong way',
    'var h = Math.floor(s.inTray / 2);', 'var h = Math.ceil(s.inTray / 2);'],
  ['open: the odd one is dropped (the counter vanishes)',
    'x.shut = false; x.near = h; x.far = h; x.odd = s.inTray % 2;',
    'x.shut = false; x.near = h; x.far = h; x.odd = 0;'],
  ['open: the leaves come out unequal',
    'x.shut = false; x.near = h; x.far = h; x.odd = s.inTray % 2;',
    'x.shut = false; x.near = h + 1; x.far = h; x.odd = s.inTray % 2;'],
  ['open: the whole is not emptied from the tray (conservation broken)',
    'x.inTray = 0; x.claim = [];\n      return x;\n    },\n\n    /* the odd one joins the NEAR leaf',
    'x.claim = [];\n      return x;\n    },\n\n    /* the odd one joins the NEAR leaf'],
  ['open: ⚠⚠ the tray stays SHUT — a control with no consequence',
    'x.shut = false; x.near = h; x.far = h; x.odd = s.inTray % 2;',
    'x.shut = true; x.near = h; x.far = h; x.odd = s.inTray % 2;'],
  ['open: it acts on an OPEN tray instead of a shut one',
    'open: function (st) {\n      var s = this._st(st);\n      if (!s.shut) return null;',
    'open: function (st) {\n      var s = this._st(st);\n      if (s.shut) return null;'],
  ['give: the odd one lands on the far leaf instead',
    'x.near = s.near + 1; x.odd = 0;\n      return x;',
    'x.far = s.far + 1; x.odd = 0;\n      return x;'],
  ['give: the odd one is consumed rather than placed',
    'x.near = s.near + 1; x.odd = 0;\n      return x;',
    'x.odd = 0;\n      return x;'],
  ['give: it acts with nothing waiting',
    'give: function (st) {\n      var s = this._st(st);\n      if (s.odd !== 1) return null;',
    'give: function (st) {\n      var s = this._st(st);\n      if (false) return null;'],
  ['fetch: only one leaf grows, so the leaves do not match',
    'x.near = s.near + 1; x.far = s.far + 1; x.odd = 0;',
    'x.near = s.near + 1; x.odd = 0;'],
  ['fetch: two partners arrive',
    'x.near = s.near + 1; x.far = s.far + 1; x.odd = 0;',
    'x.near = s.near + 2; x.far = s.far + 1; x.odd = 0;'],
  ['fetch: it acts with nothing waiting',
    'fetch: function (st) {\n      var s = this._st(st);\n      if (s.odd !== 1) return null;',
    'fetch: function (st) {\n      var s = this._st(st);\n      if (false) return null;'],

  /* ---- the material pushes back ---------------------------------- */
  ['place: the near leaf may run away from the far one (n+(n+2) becomes expressible)',
    'if (s.far > 0 && (n < s.far || n > s.far + 1)) return null;', ';'],
  ['place: the near leaf may drop below the far one',
    'if (s.far > 0 && (n < s.far || n > s.far + 1)) return null;',
    'if (s.far > 0 && n > s.far + 1) return null;'],
  ['place: the leaf cap is gone',
    'if (n < 0 || n > s.cap) return null;', 'if (n < 0) return null;'],
  /* ⚠ ANCHORED. The bare guard is byte-identical in `place`'s shut
     branch and in `close`, so the needle matched twice and the harness
     correctly scored it a FAULT rather than silently mutating one of
     them. The preceding line disambiguates. */
  ['place: the shut tray passes 2*cap and stalls its own odd counter',
    'var t = s.inTray + d;',
    'var t = s.inTray + d;\n        if (t >= 2 && t <= s.cap * 2 + 1) { var _x = this._copy(s); _x.inTray = t; _x.claim = []; return _x; }'],
  ['place: a step of two is accepted',
    "if (d !== 1 && d !== -1) return null;", 'if (false) return null;'],
  ['place: it acts while a counter is still waiting for a home',
    'if (s.odd !== 0) return null;                 /* settle the odd one first */', ';'],

  /* ---- the claim -------------------------------------------------- */
  ['claim: a prediction MOVES THE APPARATUS',
    'x.claim = s.claim.concat([v]);\n      return x;',
    'x.claim = s.claim.concat([v]); x.near = v;\n      return x;'],
  ['claim: the same numeral latches twice, so saidSameTwice dies',
    'if (s.claim.indexOf(v) >= 0) return null;', 'if (false) return null;'],
  ['claim: a value the strip does not offer is accepted',
    'if (this.predValues(s).indexOf(v) < 0) return null;', ';'],
  ['claim: the hinge moves with no claim at all',
    'return !s.ask || !this.needsClaim(s) || s.claim.length > 0;', 'return true;'],
  ['claim: the double strip offers odd totals',
    'for (i = 1; i <= s.cap; i++) out.push(i * 2);', 'for (i = 1; i <= s.cap; i++) out.push(i);'],
  ['claim: a gathered tray demands a numeral it has no question for',
    'return s.shut ? s.inTray >= 2 : (s.far === 0 && s.near >= 1);',
    'return s.shut ? s.inTray >= 2 : (s.near >= 1);'],

  /* ---- the shape of the export ----------------------------------- */
  ['CAP moves off the within-20 doubles family', 'CAP: 9,', 'CAP: 8,'],
  ['CAP_LOW moves', 'CAP_LOW: 5,', 'CAP_LOW: 6,'],
  ['ROW moves off the house grouping', 'ROW: 5,', 'ROW: 4,'],
  ['premium ships true', 'premium: false,', 'premium: true,'],
  ['a `tasks` array appears — the shell would render activity chrome',
    "id: 'doubling-mirror',", "id: 'doubling-mirror',\n    tasks: [],"],
  ['giveSide returns from the dead',
    'total: function (st) {',
    'giveSide: function (st, dir) { return dir < 0 ? this.give(st) : this.fetch(st); },\n    total: function (st) {'],
  ['the millisecond debounce goes back under a frequency name',
    'T_SND_DEBOUNCE: 160', 'SND_DEBOUNCE: 160'],
  ['the shut tray reports the wrong total',
    'return s.shut ? s.inTray : s.near + s.far + s.odd;',
    'return s.shut ? s.inTray : s.near + s.far;'],

  /* ---- motion constants that must reach the screen ---------------- */
  /* ⭐⭐ TWO MUTATIONS MOVED TO `probe-doubling-mirror.js`, WHICH IS
     WHERE THEY CAN BE OBSERVED. The deal stagger and the arriving
     counter's second frame are properties of the RENDER, and this gate
     runs `verify-doubling-mirror.js`, which binds no port and opens no
     browser — so a model gate is structurally blind to both and they
     survived here for a reason that is not a hole. The probe now asks
     the question the right way round: it samples how many counters are
     VISIBLE every 50ms through the deal and requires the count to pass
     through at least three distinct values. Same-frame arrival is a
     GROUPING; staggered arrival is a COUNT, and the whole beat exists
     for the second. Leaving them here would have left two permanent
     survivors that mean nothing, which is how a suite learns to be
     ignored. */
  ['T_SND_DEBOUNCE stops being read',
    'now - this._lastSound < GEO.T_SND_DEBOUNCE', 'now - this._lastSound < 160'],
  ['RM_FLOOR stops being read — reduced motion would SKIP, not compress',
    'return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));',
    'return Math.round(ms * GEO.RM_F);'],
  ['NUDGE_DEG stops being read — the refusal hardcodes',
    'self._setFold(base + GEO.NUDGE_DEG * Math.sin(Math.PI * t));',
    'self._setFold(base + 2.6 * Math.sin(Math.PI * t));'],
  ['PERSP stops being read — the fold flattens',
    "'perspective:' + M(GEO.PERSP) + ';}'", "'perspective:' + M(22) + ';}'"],
  ['SHEEN_AT stops being read — the sheen is no longer resolution-gated',
    "+ '@container (min-width:' + GEO.SHEEN_AT + 'px){.dbm-c::after{display:block;}}'",
    "+ '@container (min-width:560px){.dbm-c::after{display:block;}}'"],
  ['T_BEAT is routed through _dur — a wait is not movement',
    '}, GEO.T_BEAT);', '}, self._dur(GEO.T_BEAT));'],

  /* ---- the render laws -------------------------------------------- */
  /* ⚠ ANCHORED on the aria branch, which is unique — the bare
     `this._nearEl.setAttribute(` now appears in both halves of the
     shut/open split added when ten panels proved the reveal discipline
     was sighted-only. */
  ['⚠⚠ THE FAR LEAF IS HIDDEN AGAIN — the defect this rebuild exists to kill',
    "        this._nearEl.removeAttribute('aria-hidden');",
    "        this._farEl.style.visibility = s.shut ? '' : 'hidden';\n        this._nearEl.removeAttribute('aria-hidden');"],
  ['_sync becomes _fill: every counter is destroyed and rebuilt each paint',
    '_sync: function (leaf, n, k, dealFrom) {', '_fill: function (leaf, n, k, dealFrom) {'],
  ['the paint clones counters instead of moving them',
    "var c = api.el('span', 'dbm-c');", "var c = api.el('span', 'dbm-c').cloneNode(true);"],
  ['the refusal recolours a LEAF — a verdict on the child\'s material',
    "+ '.dbm-tray.is-refuse .dbm-knuckle{background-color:#A34122;}'",
    "+ '.dbm-tray.is-refuse .dbm-leaf{border-color:#A34122;}'"],
  ['an operator glyph is written as text',
    "var t = this.api.el('span', 'dbm-lab');",
    "var t = this.api.el('span', 'dbm-lab'); t.textContent = '+';"],

  /* ---- strings and the refuse-list -------------------------------- */
  ['refuse-list JUDGE: a landing is marked correct', ...enPrefix('saidClosed', 'That is correct. ')],
  ['refuse-list JUDGE: a score appears', ...enPrefix('saidOpened', 'Your score went up. ')],
  ['refuse-list TIMER: a clock appears', ...enPrefix('saidPlace', 'The timer is running. ')],
  ['the founding ruling: a string calls the far leaf a reflection', ...enPrefix('saidClosed', 'The reflection lands. ')],
  ['the founding ruling: a string says the tray folds', ...enPrefix('saidGathered', 'The tray folds over. ')],
  ['parity leaks in from the Pair Gate', ...enPrefix('saidOddWaiting', 'This is an odd number. ')],
  ['the odd-one question goes back to asking WHICH LEAF',
    ...enSwap('saidOddWaiting', '{t} will not share evenly. Which leaf should the class give it to?')],
  ['a token the paint never supplies', ...enSwap('saidGave', '{t} shares out into {a} and {who}.')],
  ['the give sentence loses its tokens', ...enSwap('saidGave', 'It went to a leaf.')],
  ['an authored key is renamed out from under the render', ...enRename('saidGathered', 'saidGatheredUp')],
  ['an authored string is emptied', ...enSwap('gateCta', '')],
  ['the product name drifts', ...enSwap('title', 'The Hinge Tray')],

  /* ---- the stylesheet and the two print paths ---------------------- */
  ['the html scroll rule is removed',
    "+ 'html.dbm-scroll{overflow-y:auto;height:auto;min-height:100%;}'\n", "+ ''\n"],
  ['the body scroll rule is made INERT (overflow-y alone)',
    "+ 'body.dbm-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'",
    "+ 'body.dbm-scroll{overflow-y:auto;}'"],
  ['the html scroll class is never added',
    "document.documentElement.classList.add('dbm-scroll');", ';'],
  ['the body scroll class is never added',
    "document.body.classList.add('dbm-scroll');", ';'],
  ['a vh unit enters the manipulative',
    "+ '.dbm-stage{display:flex;", "+ '.dbm-stage{min-height:40vh;display:flex;"],
  ['the emitted @media print{ literal is split',
    "+ '@media print{'", "+ '@media ' + 'print{'"],
  ['the sheet moves back inside the wrap (0mm on paper)',
    'api.stage.appendChild(this._sheet);', 'this._wrap.appendChild(this._sheet);'],
  ['Ctrl+P hands the paid sheet to every non-subscriber',
    "if (self.premium) { self._buildSheet(); document.body.classList.add('dbm-printing'); }",
    "self._buildSheet(); document.body.classList.add('dbm-printing');"],
  ['the print chip stops checking entitlement',
    'if (!this.premium) { this._gate(); return; }', ';'],
  ['the entitlement failure path is removed',
    "['catch'](function () {});", ';'],
  ['the dbm-wrap literal drifts — the liveness gate goes blind',
    "api.el('div', 'dbm-wrap')", "api.el('div','dbm-wrap')"]
];

/* ------------------------------------------------------------------ */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dbm-mut-'));
const tmpTool = path.join(tmp, 'doubling-mirror.js');

function runGate() {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { DOUBLING_MIRROR_TOOL_DIR: tmp }),
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
console.log('\n✓ mutate-doubling-mirror: every mutation killed, 0 faults');
