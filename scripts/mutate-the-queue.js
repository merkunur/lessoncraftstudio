/* =====================================================================
   mutate-the-queue.js — poison TOOL #58's model, its stylesheet and its
   strings, ONE edit at a time, and require `verify-the-queue.js` to
   notice every one.
   Run:  node scripts/mutate-the-queue.js

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
   through `enOf/enPrefix/enSwap`, which read the live literal off the
   file they are about to mutate, so a strings rewrite cannot silently
   blind them. The helpers THROW rather than return null.

   ⚠ THE GATE READS ONE FILE. `verify-the-queue.js` binds no port and
   opens no browser, so only `the-queue.js` travels to the tmp dir. This
   tool has no data file; if one is ever added it MUST come here too, or
   the CONTROL fails loudly rather than the mutations passing quietly.

   ⚠ timeout: 30000. A gate that HANGS is a gate that SURVIVED — the
   harness scores a timeout as survival, so it is set explicitly.
   ===================================================================== */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'the-queue.js');
const VERIFY = path.join(__dirname, 'verify-the-queue.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* ⚠⚠ CLONE TRAP. A sed-clone whose pattern did not match once kept
   loading the PREVIOUS tool and reported a plausible pass. */
if (ORIGINAL.indexOf('the-queue') < 0 || ORIGINAL.indexOf('TheQueue') < 0) {
  console.log('FATAL: ' + SRC + ' does not look like THE QUEUE — refusing to run.');
  process.exit(1);
}

/* ---- self-anchored English-literal needles ------------------------ */
function enOf(key) {
  const anchor = '      ' + key + ': { en: ';
  const at = ORIGINAL.indexOf(anchor);
  if (at === -1) throw new Error('mutate: no `' + anchor.trim() + '` in the tool — the needle cannot self-anchor.');
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
/* rename a key without ever typing its English */
function enRename(key, to) {
  const e = enOf(key);
  return [e.anchor + e.quote + e.body + e.quote,
    '      ' + to + ': { en: ' + e.quote + e.body + e.quote];
}

/* [label, find, replace] */
const MUTATIONS = [
  /* ---- L1 · the reversal itself ---------------------------------- */
  ['landedIndex: a-branch off by one',
    "s.end === 'a' ? s.k - 1 : this.n(s) - s.k",
    "s.end === 'a' ? s.k : this.n(s) - s.k"],
  ['landedIndex: b-branch off by one',
    "s.end === 'a' ? s.k - 1 : this.n(s) - s.k",
    "s.end === 'a' ? s.k - 1 : this.n(s) - s.k - 1"],
  ['landedIndex: the two ends swapped',
    "s.end === 'a' ? s.k - 1 : this.n(s) - s.k",
    "s.end === 'a' ? this.n(s) - s.k : s.k - 1"],
  ['landedIndex: both ends land the same (the misconception itself)',
    "s.end === 'a' ? s.k - 1 : this.n(s) - s.k",
    "s.k - 1"],
  ['landedIndex: answers before an end is chosen',
    'if (!s.end || s.k < 1) return null;',
    'if (s.k < 1) return null;'],
  ['mirrorK: n-k instead of n+1-k',
    'mirrorK: function (st, k) { return this.n(st) + 1 - k; }',
    'mirrorK: function (st, k) { return this.n(st) - k; }'],
  ['isSelfSame: parity inverted',
    'return n % 2 === 1 && k === (n + 1) / 2;',
    'return n % 2 === 0 && k === (n + 1) / 2;'],
  ['isSelfSame: wrong middle',
    'return n % 2 === 1 && k === (n + 1) / 2;',
    'return n % 2 === 1 && k === n / 2;'],
  ['isSelfSame: always true',
    'return n % 2 === 1 && k === (n + 1) / 2;',
    'return true;'],
  ['isSelfSame: always false (the tool\'s best moment deleted)',
    'return n % 2 === 1 && k === (n + 1) / 2;',
    'return false;'],

  /* ---- L2 · no default end, and the moves ------------------------ */
  ['newState: deals with an end already chosen',
    'return { members: out, end: null, k: 0 };',
    "return { members: out, end: 'a', k: 0 };"],
  ['newState: members no longer distinct',
    'pool.splice(j, 1);',
    ';'],
  ['newState: deals mid-count',
    'return { members: out, end: null, k: 0 };',
    'return { members: out, end: null, k: 1 };'],
  ['pickEnd: carries the half-walked count across the reversal',
    "return { members: s.members.slice(), end: e, k: 0 };",
    "return { members: s.members.slice(), end: e, k: s.k };"],
  ['pickEnd: accepts an end that is neither',
    "if (e !== 'a' && e !== 'b') return null;",
    'if (false) return null;'],
  ['pickEnd: mutates its input',
    "return { members: s.members.slice(), end: e, k: 0 };",
    'return { members: s.members, end: e, k: 0 };'],
  ['step: acts with no end chosen',
    'if (!s.end) return null;                 /* nothing to count from */',
    'if (false) return null;                 /* nothing to count from */'],
  ['step: walks off the far end',
    'if (s.k >= this.n(s)) return null;',
    'if (s.k >= this.n(s) + 1) return null;'],
  ['step: refuses always (the control exists for this)',
    'return { members: s.members.slice(), end: s.end, k: s.k + 1 };',
    'return null;'],
  ['_st: the held-state fallback removed',
    '_st: function (st) { return st || this.st; }',
    '_st: function (st) { return st; }'],

  /* ---- L3 · boarding --------------------------------------------- */
  ['board: acts with no end chosen',
    'if (!s.end) return null;\n      if (this.n(s) <= GEO.MIN) return null;',
    'if (false) return null;\n      if (this.n(s) <= GEO.MIN) return null;'],
  ['board: ends swapped',
    "if (s.end === 'a') m.shift(); else m.pop();",
    "if (s.end === 'a') m.pop(); else m.shift();"],
  ['board: removes TWO — the pitch rule that hides the self-same member',
    "if (s.end === 'a') m.shift(); else m.pop();",
    "if (s.end === 'a') { m.shift(); m.shift(); } else { m.pop(); m.pop(); }"],
  ['board: does not restart the count',
    'return { members: m, end: s.end, k: 0 };',
    'return { members: m, end: s.end, k: s.k };'],
  ['board: empties the platform past MIN',
    'if (this.n(s) <= GEO.MIN) return null;',
    'if (this.n(s) <= 1) return null;'],
  ['GEO.MIN lowered to 2 — below three there is no middle to reverse about',
    'MIN: 3,', 'MIN: 2,'],
  ['GEO.MIN raised to 4 — boarding becomes unreachable',
    'MIN: 3,', 'MIN: 4,'],

  /* ---- L0 · the shape of the export ------------------------------ */
  ['CAP no longer matches the forms',
    'CAP: 4,', 'CAP: 3,'],
  ['premium ships true',
    'premium: false,', 'premium: true,'],
  ['a `tasks` array appears — the shell would render activity chrome',
    "id: 'the-queue',", "id: 'the-queue',\n    tasks: [],"],
  ['the default end arrives through defaults',
    "defaults: { size: 'four' },", "defaults: { size: 'four', end: 'a' },"],

  /* ---- L4/A5 · the travel ---------------------------------------- */
  ['A5: the svg is wiped again, destroying the walker every paint',
    '[].slice.call(svg.childNodes).forEach(function (c) { if (c !== walker) svg.removeChild(c); });',
    'svg.innerHTML = \'\';'],
  ['A5: the walker is re-appended inside the paint (cancels the transition)',
    "walker.style.display = '';",
    "walker.style.display = ''; svg.appendChild(walker);"],
  ['A5: the walker is built fresh inside the paint',
    "this._walker = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');",
    "this._walker = this._walker || document.createElementNS('http://www.w3.org/2000/svg', 'polygon');"],
  ['A5: members are appended after the walker instead of before it',
    'svg.insertBefore(g, walker);',
    'svg.appendChild(g);'],
  /* ⚠ ANCHORED ON THE `} else {` ABOVE IT. The bare needle matched twice:
     `this._walker.style.display = 'none';` in _build CONTAINS
     `walker.style.display = 'none';` as a substring, and `String.replace`
     would have taken the first — mutating a place nobody chose. */
  ['A5: the walker is removed rather than hidden',
    "} else {\n        walker.style.display = 'none';",
    '} else {\n        if (walker.parentNode) walker.parentNode.removeChild(walker);'],
  ['the duration is never written',
    "this._stage.style.setProperty('--que-dur', (dur ? this._dur(dur) : 0) + 'ms');",
    ';'],
  ['the walker loses its transition',
    "'.que-walker{fill:#A34122;transition:transform var(--que-dur,0ms) ease-in-out}',",
    "'.que-walker{fill:#A34122}',"],
  ['T_STEP stops being read — a motion constant naming nothing',
    '_paint(GEO.T_STEP);', '_paint(300);'],
  ['T_SND_DEBOUNCE stops being read',
    'now - this._lastSound < GEO.T_SND_DEBOUNCE', 'now - this._lastSound < 160'],
  ['RM_FLOOR stops being read — reduced motion would SKIP, not compress',
    'return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));',
    'return Math.round(ms * GEO.RM_F);'],

  /* ---- L5 · no order in the material ------------------------------ */
  ['the stage draws members at a computed area — a SIZE RAMP',
    'this._shape(FORMS[s.members[i]], cx, 90, GEO.AREA)',
    'this._shape(FORMS[s.members[i]], cx, 90, GEO.AREA * (1 + i * 0.2))'],
  ['the stage draws members on a rising baseline — a HEIGHT RAMP',
    'this._shape(FORMS[s.members[i]], cx, 90, GEO.AREA)',
    'this._shape(FORMS[s.members[i]], cx, 90 - i * 4, GEO.AREA)'],
  ['a member is rotated — a facing asserts an end',
    "e.setAttribute('class', 'que-member');",
    "e.setAttribute('transform', 'rotate(12)'); e.setAttribute('class', 'que-member');"],
  ['a form is named for its size',
    "var FORMS = ['disc', 'square', 'triangle', 'cross'];",
    "var FORMS = ['disc', 'square', 'triangle', 'big'];"],
  ['a form is named for its position',
    "var FORMS = ['disc', 'square', 'triangle', 'cross'];",
    "var FORMS = ['disc', 'square', 'triangle', 'first'];"],
  ['a form is numbered',
    "var FORMS = ['disc', 'square', 'triangle', 'cross'];",
    "var FORMS = ['disc', 'square', 'triangle', 'cross2'];"],

  /* ---- L6 · the strings and the refuse-list ----------------------- */
  ['refuse-list POSITION: a string names a position', ...enPrefix('sayStepped', 'The third one. ')],
  ['refuse-list POSITION: the front is named', ...enPrefix('sayPickEnd', 'The front is here. ')],
  ['refuse-list JUDGE: a landing is marked correct', ...enPrefix('sayLandedSame', 'That is correct. ')],
  ['refuse-list JUDGE: a score appears', ...enPrefix('sayBoarded', 'Your score went up. ')],
  ['refuse-list EFFICACY: an efficacy claim', ...enPrefix('lockedBody', 'A proven method. ')],
  ['refuse-list TIMER: a clock appears', ...enPrefix('sayDealt', 'The timer is running. ')],
  ['a bare numeral stands for an ordinal', ...enPrefix('sayStepped', 'Number 3. ')],
  ['a token the paint never supplies', ...enSwap('sayStepped', 'Landed on {who}.')],
  ['an authored key is renamed out from under the render', ...enRename('sayStepped', 'saySteppedAlong')],
  ['an authored string is emptied', ...enSwap('gateCta', '')],

  /* ---- L7 · the stylesheet and the two print paths ---------------- */
  ['the html scroll rule is removed',
    "'html.que-scroll{overflow-y:auto;height:auto;min-height:100%}',\n", ''],
  ['the body scroll rule is removed',
    "'body.que-scroll{overflow-y:auto;height:auto;min-height:100%}',\n", ''],
  ['the html scroll rule is made INERT (overflow-y alone)',
    "'html.que-scroll{overflow-y:auto;height:auto;min-height:100%}',",
    "'html.que-scroll{overflow-y:auto}',"],
  ['the body scroll rule is made INERT (overflow-y alone)',
    "'body.que-scroll{overflow-y:auto;height:auto;min-height:100%}',",
    "'body.que-scroll{overflow-y:auto}',"],
  ['the two scroll rules collapse to a SELECTOR LIST',
    "'html.que-scroll{overflow-y:auto;height:auto;min-height:100%}',\n        'body.que-scroll{overflow-y:auto;height:auto;min-height:100%}',",
    "'html,body.que-scroll{overflow-y:auto;height:auto;min-height:100%}',"],
  ['the html scroll class is never added',
    "document.documentElement.classList.add('que-scroll');", ';'],
  ['the body scroll class is never added',
    "document.body.classList.add('que-scroll');", ';'],
  ['a vh unit enters the manipulative',
    "'.que-stage{width:100%;", "'.que-stage{min-height:40vh;width:100%;"],
  ['print no longer resets the shell',
    "'@media print{.lcs-shell,.que-wrap{display:none !important}',",
    "'@media print{.que-wrap{display:none !important}',"],
  ['Ctrl+P hands the paid sheet to every non-subscriber',
    'if (!self.premium) { if (self._sheet) self._sheet.innerHTML = \'\'; return; }',
    ';'],
  ['the print button stops checking entitlement',
    'if (!this.premium) { this._refuse(\'print\'); return; }', ';'],
  ['the entitlement fetch degrades to NOTHING rather than the free tier',
    "premium: false,\n", "premium: undefined,\n"],
  ['the entitlement failure path is removed',
    "['catch'](function () { /* degrades to the FREE TIER, never to nothing */ });", ';']
];

/* ------------------------------------------------------------------ */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'que-mut-'));
const tmpTool = path.join(tmp, 'the-queue.js');

function runGate() {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { QUE_TOOL_DIR: tmp }),
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
console.log('\n✓ mutate-the-queue: every mutation killed, 0 faults');
