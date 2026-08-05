/* =====================================================================
   mutate-part-whole-frame.js — does verify-part-whole-frame.js BITE?
   ---------------------------------------------------------------------
   Run:  node scripts/mutate-part-whole-frame.js

   A green gate proves nothing until it has been shown to go red. Every
   mutation must be KILLED.

   ⚠ THE RECORDED LESSONS, BUILT IN:
     1. NORMALISE \r\n BEFORE SEARCHING. `git checkout --` restores the
        working copy through core.autocrlf and every multi-line needle
        goes blind at once, without one of them being wrong.
     2. A NEEDLE THAT MISSES IS A HARNESS FAULT, never a silent skip —
        a dropped needle shrinks the total while the run still reports
        "every mutation killed".
     3. AN INERT MUTATION IS A HARNESS FAULT TOO.
     4. A GATE THAT HANGS COUNTS AS SURVIVED — hence the timeout, and
        hence verify- doing zero browser work.
     5. LOCALE NEEDLES SELF-ANCHOR on the live file. A needle carrying
        the CURRENT text of the thing it mutates has a half-life: the
        apply- script re-pads the whole strings block every run.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS = path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOLS, 'part-whole-frame.js'), 'utf8').replace(/\r\n/g, '\n');
const TIMEOUT = 30000;

/* ⭐ SELF-ANCHORING LOCALE NEEDLE — reads the CURRENT English value of
   `key` out of the live strings block and mutates that. Throws rather
   than returning null, so a key that has been renamed surfaces at load
   instead of quietly leaving the suite one mutation smaller. */
function enNeedle(key, replacement, name) {
  const re = new RegExp(key + ":\\s*\\{en:'((?:[^'\\\\]|\\\\.)*)'");
  const m = re.exec(SRC);
  if (!m) throw new Error(`enNeedle: no en value for "${key}" in the live strings block`);
  const from = m[0];
  const to = from.slice(0, from.length - m[1].length - 1) + replacement + "'";
  if (to === from) throw new Error(`enNeedle: "${key}" already reads "${replacement}" — the mutation would be INERT`);
  return [name, from, to];
}

const M = [
  /* ---- P1 conservation: the one thesis ------------------------------- */
  ['part two gets a slot of its own', 'partB: function (f) { return f.whole - f.a; },',
    'partB: function (f) { return (typeof f.b === \'number\') ? f.b : f.whole - f.a; },'],
  ['the whole drifts as the parts move', 'return { whole: f.whole, a: next };',
    'return { whole: f.whole + (next === 0 ? 1 : 0), a: next };'],

  /* ---- P2 carry ------------------------------------------------------- */
  ['carry moves two at a time', "var next = dir === 'toB' ? f.a - 1 : f.a + 1;",
    "var next = dir === 'toB' ? f.a - 2 : f.a + 1;"],
  ['carry mutates its input', 'return { whole: f.whole, a: next };', 'f.a = next; return f;'],
  ['carry wraps at the floor instead of stopping', 'if (next < 0 || next > f.whole) return { whole: f.whole, a: f.a };',
    'if (next < 0) next = f.whole; if (next > f.whole) next = 0;'],

  /* ---- P3 the record -------------------------------------------------- */
  ['the record sorts itself behind the child', 'return list.concat([k]);', 'return list.concat([k]).sort();'],
  ['the record stops de-duplicating', 'for (var i = 0; i < list.length; i++) if (list[i] === k) return list;', ''],
  ['⭐ the ordered VIEW becomes a destructive edit',
    'return list.slice().sort(function (x, y) { return parseInt(x, 10) - parseInt(y, 10); });',
    'return list.sort(function (x, y) { return parseInt(x, 10) - parseInt(y, 10); });'],

  /* ---- P3b the arrangement: stability under n -> n+1 ------------------- */
  ['⭐ the arrangement becomes divisor-derived and RE-FLOWS on every carry',
    'var c = this.colsFor(whole);\n    return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };',
    'var c = (i % 3 === 0) ? 3 : 5;\n    return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };'],
  ['the arrangement goes back to a fixed five-per-row, asserting a five-structure',
    'var c = this.colsFor(whole);\n    return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };',
    'var c = 5;\n    return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };'],
  ['two counters land in one cell',
    'return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };',
    'return { col: (i % c) + 1, row: 1 };'],
  /* ⭐ the defect the RENDER caught and no model check could: column-major
     pairs are stable, collide nowhere, and fit — and they put the two-tone
     boundary on a diagonal, which is not the unbroken run the whole design
     rests on. */
  ['⭐ the fill goes column-major and the two-tone boundary becomes a DIAGONAL',
    'var c = this.colsFor(whole);\n    return { col: (i % c) + 1, row: Math.floor(i / c) + 1 };',
    'var r = this.rowsFor(whole);\n    return { col: Math.floor(i / r) + 1, row: (i % r) + 1 };'],
  ['the tray reserves fewer rows than the arrangement uses',
    'return Math.max(2, Math.ceil(w / this.colsFor(w)));',
    'return 2;'],
  ['the tray reserves a whole extra row it never fills',
    'return Math.max(2, Math.ceil(w / this.colsFor(w)));',
    'return Math.max(2, Math.ceil(w / this.colsFor(w)) + 1);'],
  ['the tray goes back to a fixed five columns, so a whole of six sits in a lake',
    'return Math.max(1, Math.min(this.COLS, Math.ceil(Math.min(w, 10) / 2)));',
    'return this.COLS;'],
  ['⭐ the renderer stops placing counters on the grid',
    "      d.style.gridColumn = String(s.col);\n      d.style.gridRow = String(s.row);", ''],

  /* ---- P4 the teacher move -------------------------------------------- */
  ['setWhole scales the parts instead of clamping', 'return { whole: w, a: Math.max(0, Math.min(w, f.a)) };',
    'return { whole: w, a: Math.round(f.a * w / (f.whole || 1)) };'],
  ['the ceiling stops clamping', 'if (n > this.MAX_WHOLE) return this.MAX_WHOLE;', ''],

  /* ---- P5 anti-grading ------------------------------------------------- */
  ['the tool grows something to check', "  splitKey: function (f) {", "  isCorrect: function (f) { return f.a === this.partB(f); },\n  splitKey: function (f) {"],
  ['the tool declares tasks', "  id: 'part-whole-frame',", "  id: 'part-whole-frame',\n  tasks: [],"],

  /* ---- P6 identity + P6b totality -------------------------------------- */
  ['the store key silently reuses v1, so a v1 boolean is read as a mode',
    "STORE_KEY: 'lcs:part-whole-frame:v2',", "STORE_KEY: 'lcs:part-whole-frame:v1',"],
  ['the floor goes back to three, losing the first double and the zero bond',
    '  MIN_WHOLE: 2,', '  MIN_WHOLE: 3,'],
  ['the shape resolver stops being total',
    'shapeFor: function (val) { return this.SHAPES.indexOf(val) === -1 ? this.SHAPES[0] : val; },',
    'shapeFor: function (val) { return val || this.SHAPES[0]; },'],
  ['the notation resolver stops being total',
    'return this.NOTATIONS.indexOf(val) === -1 ? \'off\' : val;', 'return val;'],
  ['the v1 boolean migration is dropped', "if (val === true) return 'sum';", ''],
  ['the scheme resolver hands back undefined', 'return this.SCHEMES[0];\n  },', 'return undefined;\n  },'],

  /* ---- P7 no exfil ------------------------------------------------------ */
  ['a second network call appears', "fetch('/api/auth/me', { headers:", "fetch('/api/telemetry', { method: 'POST' });\n      fetch('/api/auth/me', { headers:"],

  /* ---- P8 / P13 the strings --------------------------------------------- */
  enNeedle('instruction', 'Carry one counter across and check you got it right.', 'a verdict enters the instruction'),
  enNeedle('waysHint', 'You have found 3 of 6 ways so far.', '⭐ a found-count enters the record hint'),
  enNeedle('resetBtn', 'Start again — beat your streak', 'streak vocabulary enters a string'),
  enNeedle('allWays', "All the ways you didn't miss", 'a straight apostrophe enters a string'),

  /* ---- P10b the colour schemes ------------------------------------------ */
  ['⭐ a scheme pair differs by HUE alone and dies in greyscale',
    "c2: { fill: '#1F4E79', lit: '#2E6797', shade: '#17405F', edge: '#14385A', edgeSm: '#0D2A45' } },",
    "c2: { fill: '#4BC5F2', lit: '#6ED4F8', shade: '#35A8DF', edge: '#2F8FC2', edgeSm: '#1F7AA8' } },"],
  ['a scheme ships the same colour twice — the two-tone nest shows no boundary',
    "c1: { fill: '#5B4B8A', lit: '#7160A6', shade: '#4A3C74', edge: '#3C2F63', edgeSm: '#2C2149' },",
    "c1: { fill: '#E8B33C', lit: '#F2C55E', shade: '#D19B26', edge: '#A8761A', edgeSm: '#8B6012' },"],
  ['an edge goes pale and vanishes on a lit-room projector',
    "edge: '#C2562F', edgeSm: '#A8481F' }", "edge: '#F6C8B4', edgeSm: '#A8481F' }"],
  ['a light fill drops its border boost and loses its only contrast',
    "edgeSm: '#8B6012', bwx: 1.3 } },", "edgeSm: '#8B6012' } },"],
  ['the volume ramp inverts, so the token reads as a hole',
    "c1: { fill: '#F2784B', lit: '#F8956E', shade: '#DF6435',", "c1: { fill: '#F2784B', lit: '#DF6435', shade: '#F8956E',"],
  /* ⚠ THIS MUTATION WAS MIS-SPECIFIED ON ITS FIRST RUN and reported as a
     gate hole when it was a harness one: it recoloured c1 red and left
     c2 as BONE, so the pair was red-vs-bone, which every rule here
     legitimately allows. Both members have to move for the mutation to
     be the thing its name says it is. Same family as the recorded
     "sort each example by what it MEANS, not by whether it currently
     passes" lesson. */
  ['⭐ red versus green — a verdict before it is a colour',
    "c1: { fill: '#2A2A35', lit: '#3B3B49', shade: '#1E1E27', edge: '#14141C', edgeSm: '#0A0A11' },\n                          c2: { fill: '#C9B79A', lit: '#DCCCB2', shade: '#B5A184', edge: '#6E5B41', edgeSm: '#55442E', bwx: 1.3 } }",
    "c1: { fill: '#C81E1E', lit: '#DB4444', shade: '#A81414', edge: '#7A0F0F', edgeSm: '#5A0A0A' },\n                          c2: { fill: '#3FBF3F', lit: '#63D163', shade: '#2FA02F', edge: '#237023', edgeSm: '#175017' } }"],
  ['the drawer swatch shows one colour instead of the pair',
    "return 'linear-gradient(90deg,' + s.c1.fill + ' 0 50%,' + s.c2.fill + ' 50% 100%)';",
    "return s.c1.fill;"],

  /* ---- P13 the refusals -------------------------------------------------- */
  ['⭐ the pre-drawn empty rows come back', '  _wayRow: function (key, current) {',
    '  waysFor: function (n) { return this.clampWhole(n) + 1; },\n  _wayRow: function (key, current) {'],

  /* ---- P14 the cloth holds in every channel -------------------------------- */
  ['⭐ the spoken split says the number the cloth is hiding',
    'if (!this.api.settings.voice || this._anyCovered()) return;\n    var self = this;',
    'if (!this.api.settings.voice) return;\n    var self = this;'],
  ['the numeral is spoken from under the cloth',
    "if (!this.api.settings.voice || !text || this._anyCovered()) return;",
    "if (!this.api.settings.voice || !text) return;"],
  ['the live region announces the hidden split', 'if (!this._anyCovered()) this.api.announce(this._splitText());',
    'this.api.announce(this._splitText());'],
  ['⭐ the two-tone nest keeps its colour boundary under the cloth',
    "(this._anyPartCovered() ? ' pwf-partcovered' : '')", "''"],
  ['⭐ the RECORD leaks the split the cloth is hiding',
    'var blind = this._anyPartCovered();', 'var blind = false;'],
  /* the first fix blinded only the CURRENT row; a native panel showed that
     a row recorded ONE CARRY EARLIER gives the answer by subtracting one */
  ['⭐ only the CURRENT record row goes blind, so the row before it leaks',
    'var blind = this._anyPartCovered();', 'var blind = current && this._anyPartCovered();'],
  ['⭐ the stepper prints the whole the cloth is hiding',
    "val.textContent = this.covers.whole ? '?' : String(this.frame.whole);",
    'val.textContent = String(this.frame.whole);'],
  ['narrowing the band leaves a record describing another number',
    'if (narrowed.whole !== this.frame.whole) { this.frame = narrowed; this.ways = this.recordSplit([], this.frame); }',
    'if (false) { this.frame = narrowed; this.ways = this.recordSplit([], this.frame); }'],
  ['Start again throws away the number the teacher set',
    'this.frame = this.newFrame(this.frame ? this.frame.whole : this._todaysWhole());',
    'this.frame = this.newFrame(this._todaysWhole());'],
  ['the blinded record row still prints the hidden numerals',
    'if (api.settings.numerals && !blind) {', 'if (api.settings.numerals) {'],
  ['the blinded record row still states the split to a screen reader',
    "      if (!blind) row.setAttribute('aria-label', split);",
    "      row.setAttribute('aria-label', split);"],
  ['⭐ the row already on the board goes back to being a control that can do nothing',
    "    var row = api.el(current ? 'div' : 'button',", "    var row = api.el('button',"],
  ['the current row keeps a click handler that refuses to act',
    "if (!current) row.addEventListener('click', function () { self._useWay(key); });",
    "row.addEventListener('click', function () { self._useWay(key); });"],

  /* ---- P15 the drag flag --------------------------------------------------- */
  ['⭐ the drag flag goes back to being reset in the click handler',
    'if (self._dragMoved) return;\n        e.preventDefault();',
    'if (self._dragMoved) { self._dragMoved = false; return; }\n        e.preventDefault();'],
  ['the drag flag is never released, so the tray dies after one drag',
    'setTimeout(function () { self._dragMoved = false; }, 0);', ''],

  /* ---- P16 the connectors -------------------------------------------------- */
  ['⭐ the legs go back to percentages of a differently-sized box',
    "var S = sheet.getBoundingClientRect();", "var S = { left: 0, top: 0, width: 340, height: 100 };"],
  ['nothing recomputes the legs when the stage resizes', 'this._ro = new ResizeObserver(function () { self._layoutLegs(); });',
    'this._ro = null;'],
  ['the legs SVG carries a width cap again', ".pwf-legs{position:absolute;left:0;top:0;",
    ".pwf-legs{position:absolute;left:0;top:0;width:min(100%,340px);"],

  /* ---- P17 the band gate --------------------------------------------------- */
  ['⭐ the premium band is merely DISABLED, not absent',
    "this.settings[0].options = this.premium ? ['10', '20'] : ['10'];",
    "this.settings[0].options = ['10', '20'];"],
  ['the entitlement callback stops re-applying the band options',
    "self._applyBandOptions();\n          document.body.classList.toggle('pwf-paid', !!self.premium);",
    "document.body.classList.toggle('pwf-paid', !!self.premium);"],
  /* ⭐ the operator's headline ask, shipping dead: the shell paints a
     colour chip with `style.background = value`, so handing it the scheme
     KEY drew three blank swatches */
  ['⭐ the colour picker ships the scheme KEY, so every swatch is blank',
    'this.settings[2].options = this.SCHEMES.map(function (sc) { return self0.schemeValue(sc); });',
    'this.settings[2].options = this.SCHEMES.map(function (sc) { return sc.key; });'],
  ['the stored scheme stops matching the chip, so none is ever selected',
    'api.settings.scheme = this.schemeValue(this.schemeFor(api.settings.scheme));',
    'api.settings.scheme = this.schemeFor(api.settings.scheme).key;'],
  /* ⭐ gating the CHIP is not gating the FEATURE — a free Ctrl+P printed
     a blank sheet, the recorded fraction-kitchen defect back again */
  ['⭐ a free visitor pressing Ctrl+P gets a blank sheet',
    "'body.pwf-paid .lcs-header,body.pwf-paid .pwf-head,body.pwf-paid .pwf-controls,'",
    "'body.pwf-wide .lcs-header,.pwf-head,.pwf-controls,'"],
  ['a free visitor is offered a premium quick-set chip',
    '  QUICK_FREE: [5, 10],', '  QUICK_FREE: [5, 10, 20],'],

  /* ---- P12 the print surface ------------------------------------------------ */
  ['the printed mat and the record collide on one page',
    ".pwf-printmat{display:block !important;break-after:page;page-break-after:always;}",
    ".pwf-printmat{display:block !important;}"],
  ['the screen sheet is carried onto paper and prints near-blank',
    "'body.pwf-paid .pwf-cloth{display:none !important;}'", "'body.pwf-paid .pwf-xcloth{display:none !important;}'"],
  ['print-color-adjust is dropped and the driver eats the dashes',
    "'*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'", "''"],
  ['a shell selector is written unscoped', "'body.pwf-wide .lcs-stage{container-type:inline-size;}'",
    "'.lcs-stage{container-type:inline-size;}'"]
];

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pwf-mut-'));

let killed = 0;
const survived = [], harness = [];

for (const [name, from, to] of M) {
  if (SRC.indexOf(from) === -1) { harness.push(`${name} — NEEDLE NOT FOUND`); continue; }
  const mutated = SRC.replace(from, to);
  if (mutated === SRC) { harness.push(`${name} — INERT (the patch changed nothing)`); continue; }
  fs.writeFileSync(path.join(tmp, 'part-whole-frame.js'), mutated, 'utf8');
  let died = false, why = '';
  try {
    execFileSync(process.execPath, [path.join(__dirname, 'verify-part-whole-frame.js')], {
      env: Object.assign({}, process.env, { PWF_TOOL_DIR: tmp }),
      timeout: TIMEOUT, stdio: 'pipe'
    });
  } catch (e) {
    died = true;
    why = (e.signal === 'SIGTERM' || /ETIMEDOUT/.test(String(e.code))) ? 'TIMEOUT' : 'gate';
  }
  if (died && why === 'TIMEOUT') survived.push(`${name} (the gate HUNG — that is a survival)`);
  else if (died) killed++;
  else survived.push(name);
}

try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (_) { }

console.log(`mutations: ${M.length}   killed: ${killed}   survived: ${survived.length}   harness faults: ${harness.length}`);
if (harness.length) { console.error('\nHARNESS FAULTS (never actually tested):'); for (const h of harness) console.error('  ' + h); }
if (survived.length) { console.error('\nSURVIVED (the gate does not see these):'); for (const s of survived) console.error('  ' + s); }
process.exit(survived.length || harness.length ? 1 : 0);
