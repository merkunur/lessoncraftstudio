#!/usr/bin/env node
/* =====================================================================
   mutate-times-shelf.js — does `verify-times-shelf.js` actually CATCH
   anything, or is it a very long way of writing `true`?

   ⚠ THE CONTROL RUN IS NOT OPTIONAL. #46 reported "every mutation
   killed" while the gate was CRASHING on `document is not defined` —
   a crashed gate is indistinguishable from a failing one, so every
   mutation scored as caught and the suite proved nothing. The control
   runs the UNMUTATED source through the same harness and must PASS.

   ⚠ EVERY NEEDLE IS SELF-ANCHORED AND A MISSING ONE THROWS. A needle
   that quietly matches nothing shrinks the denominator while the run
   still says "every mutation killed" (#43).

   ⚠ \r\n IS COLLAPSED BEFORE SEARCHING. `git checkout` normalises line
   endings through core.autocrlf and seven multi-line needles went blind
   at once on #43.

   ⚠ AND NO LOOP HERE MAY DEPEND ON THE TOOL TERMINATING: a gate that
   HANGS is scored TIMED OUT, which the harness counts as survived.
   Hence timeout: 30000 on every child.
   ===================================================================== */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC = path.join(__dirname, '..', 'mini tools', 'times-shelf.js');
const VERIFY = path.join(__dirname, 'verify-times-shelf.js');
const ORIGINAL = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

/* [ name, find, replace ] — `find` must occur EXACTLY ONCE. */
const MUTATIONS = [
  /* ---- law 1: the shelf ---- */
  ['seat boundary is r>c, not r>=c',
    'if (s.stacked && L[i] > L[j]) continue;   /* the seat is empty */',
    'if (s.stacked && L[i] >= L[j]) continue;   /* the seat is empty */'],
  ['a card carries the PRODUCT of its own two factors',
    'if (s.stacked && L[i] > L[j]) continue;   /* the seat is empty */\n          out.push({ r: L[i], c: L[j], p: L[i] * L[j] });',
    'if (s.stacked && L[i] > L[j]) continue;   /* the seat is empty */\n          out.push({ r: L[i], c: L[j], p: L[i] + L[j] });'],
  ['live() returns what SURVIVES, not what left',
    'for (v = 1; v <= HI; v++) if (!s.off[v]) out.push(v);',
    'for (v = 1; v <= HI; v++) if (s.off[v]) out.push(v);'],
  ['seats exist only when stacked',
    'if (!s.stacked) return out;',
    'if (s.stacked) return out;'],
  ['stacked is unrepresentable with a family standing',
    'return { off: off, stacked: (o.stacked === true) && all };',
    'return { off: off, stacked: (o.stacked === true) };'],
  ['the model is TOTAL — null, 0 and a string all survive',
    "var src = (o.off && typeof o.off === 'object') ? o.off : {};",
    'var src = o.off;'],

  /* ---- law 2: the cross ---- */
  ['the cross is 2n-1, not 2n-2',
    'return 2 * this.live(st).length - 1;',
    'return 2 * this.live(st).length - 2;'],
  ['the cross is a ROW AND A COLUMN, not a column',
    'return 2 * this.live(st).length - 1;',
    'return 1 * this.live(st).length - 1;'],
  ['the four families are 1, 2, 5, 10',
    'var FAMILIES = [1, 2, 5, 10];',
    'var FAMILIES = [1, 2, 5, 9];'],
  ['x9 is refused — a fifth family empties the shelf',
    'var FAMILIES = [1, 2, 5, 10];',
    'var FAMILIES = [1, 2, 5, 10, 9];'],
  ['the shelf is ten wide, never twelve',
    'var HI = 10;',
    'var HI = 12;'],
  ['putAway actually puts the family away',
    'o[k] = true;\n      return this._st({ off: o, stacked: false });',
    'o[k] = false;\n      return this._st({ off: o, stacked: false });'],
  ['canPutAway refuses a family already away',
    'return this.isFamily(k) && !s.stacked && !s.off[k];',
    'return this.isFamily(k) && !s.stacked;'],

  /* ---- law 4: the distinct list ---- */
  ['the study list KEEPS the diagonal',
    'for (j = i; j < L.length; j++) out.push({ a: L[i], b: L[j], p: L[i] * L[j] });',
    'for (j = i + 1; j < L.length; j++) out.push({ a: L[i], b: L[j], p: L[i] * L[j] });'],
  ['⚠ the study list is NEVER deduplicated by numeral (21, not 19)',
    'for (j = i; j < L.length; j++) out.push({ a: L[i], b: L[j], p: L[i] * L[j] });',
    'for (j = i; j < L.length; j++) if (!out.some(function (z) { return z.p === L[i] * L[j]; })) out.push({ a: L[i], b: L[j], p: L[i] * L[j] });'],
  ['the study list writes the smaller factor first',
    'out.push({ a: L[i], b: L[j], p: L[i] * L[j] });\n      }',
    'out.push({ a: L[j], b: L[i], p: L[i] * L[j] });\n      }'],

  /* ---- law 5: the fibre ---- */
  ['the fibre is every card with that numeral — not half of them',
    'if (all[i].p === p) out.push(all[i]);',
    'if (all[i].p === p && all[i].r <= all[i].c) out.push(all[i]);'],
  ['the fibre is not an involution — it does not stop at two',
    'if (all[i].p === p) out.push(all[i]);',
    'if (all[i].p === p && out.length < 2) out.push(all[i]);'],

  /* ---- law 6: nothing crosses the diagonal ---- */
  ['⚠ no cell-to-cell path may enter this file (mirror)',
    '    _wasStanding: function (a, r, c) {',
    '    _mirrorOf: function (r, c) { return { r: c, c: r }; },\n    _wasStanding: function (a, r, c) {'],
  ['⚠ no cell-to-cell path may enter this file (transpose)',
    '    _wasStanding: function (a, r, c) {',
    '    _transposeSeat: function (r, c) { return c + "x" + r; },\n    _wasStanding: function (a, r, c) {'],
  ['the travel is ONE shared scalar, not a per-card target',
    'var off = D * slide;',
    'var off = D * slide * 0.5;'],

  /* ---- law 7: the squares ---- */
  ['stacking removes no diagonal card',
    'if (!s.stacked) return out;\n      for (i = 0; i < L.length; i++) {\n        for (j = 0; j < L.length; j++) {\n          if (L[i] > L[j]) out.push',
    'if (!s.stacked) return out;\n      for (i = 0; i < L.length; i++) {\n        for (j = 0; j < L.length; j++) {\n          if (L[i] >= L[j]) out.push'],

  /* ---- law 8: reversibility ---- */
  ['a family is a TOGGLE — retirement, not destruction',
    'return this.isFamily(k) && !s.stacked && s.off[k] === true;',
    'return false;'],
  ['stacking is refused until all four families are away',
    'for (i = 0; i < FAMILIES.length; i++) if (!s.off[FAMILIES[i]]) return false;',
    'for (i = 0; i < FAMILIES.length; i++) if (false) return false;'],
  ['unstack undoes stack',
    'return this._st({ off: s.off, stacked: false });\n    },\n\n    isVirgin',
    'return this._st({ off: s.off, stacked: true });\n    },\n\n    isVirgin'],
  ['restore reaches the virgin state',
    'if (!this.canRestore(st)) return null;\n      return this.newState();',
    'if (!this.canRestore(st)) return null;\n      return this._st(st);'],
  ['restore is refused in the virgin state',
    'canRestore: function (st) { return !this.isVirgin(st); },',
    'canRestore: function (st) { return true; },'],
  ['a mutator REFUSES, it never clamps',
    'if (!this.canPutAway(st, k)) return null;      /* refusal, never a clamp */',
    'if (!this.canPutAway(st, k)) return this._st(st);'],

  /* ---- law 9: no count anywhere ---- */
  ['⚠ no count may reach a label — not even in the title of a button',
    "en: 'Put it all back'",
    "en: 'Put it all back — 21 left to learn'"],
  ['no count may reach an announcement',
    "en: 'Everything is back. Rows and columns: {list}.'",
    "en: 'Everything is back. 21 to learn. Rows and columns: {list}.'"],

  /* ---- law 10: no operator glyph ---- */
  ['no operator in an authored string',
    "en: 'Our study list'",
    "en: 'Our study list ×'"],
  ['⚠ no operator DRAWN BY CODE (the #46 defect: a literal + in 11 locales)',
    "return '<span class=\"tsh-fnum\">' + k + '</span>'",
    "return '<span class=\"tsh-fnum\">×' + k + '</span>'"],
  ['opGlyph is read in exactly one place — the printed sheet',
    "li.textContent = facts[i].a + ' ' + op + ' ' + facts[i].b + ' = ' + facts[i].p;",
    "li.textContent = facts[i].a + ' ' + api.t('opGlyph') + ' ' + facts[i].b + ' = ' + facts[i].p;"],

  /* ---- structural ---- */
  ['render() takes NO arguments',
    '    render: function () {',
    '    render: function (api) {'],
  ['reset() exists',
    '    reset: function () {',
    '    resetTool: function () {'],
  ['the liveness gate derives its prefix from tsh-wrap',
    "var wrap = api.el('div', 'tsh-wrap');",
    "var wrap = api.el('div', 'shelf-wrap');"],
  ['a free-play instrument declares no tasks',
    '    settings: [',
    '    tasks: [],\n    settings: ['],
  ['nothing persists across reload',
    'this.st = this._startState();\n      this._fetchEntitlement();',
    "try { localStorage.setItem('lcs:tsh', '1'); } catch (e) {}\n      this.st = this._startState();\n      this._fetchEntitlement();"],
  ['reduced motion COMPRESSES, never skips',
    'var RM_F = 0.28;',
    'var RM_F = 0;'],
  ['no vh inside a manipulative',
    "+ '.tsh-svg{display:block;width:100%;height:100%;}'",
    "+ '.tsh-svg{display:block;width:100%;height:90vh;}'"],
  ['⚠ the arena is WIDTH-capped — a height cap letterboxes the SVG (#43)',
    '.tsh-arena{position:relative;width:100%;max-width:560px;aspect-ratio:1/1;margin:0 auto;}',
    '.tsh-arena{position:relative;width:100%;max-height:560px;aspect-ratio:1/1;margin:0 auto;}'],
  ['there is a real @media print block',
    "+ '@media print{'",
    "+ '@media screen and (min-width:99999px){'"],
  ['the print block hides the wrap',
    "+ 'body.tsh-printing .tsh-wrap{display:none !important;}'",
    "+ 'body.tsh-printing .tsh-wrap{opacity:.5;}'"],
  ['⚠ Ctrl+P must not print a blank page — the print block is class-scoped',
    "document.body.classList.add('tsh-printing');",
    "document.body.classList.remove('tsh-printing');"],
  ['⚠ the sheet is a SIBLING of the wrap, never a child (a hidden parent kills the subtree)',
    'api.stage.appendChild(sheet);',
    'this._wrap.appendChild(sheet);'],
  ['the numeral clears the 14px floor at 320px',
    'var NUM_F = 0.60;',
    'var NUM_F = 0.44;'],
  ['three digits are CONDENSED, not shrunk',
    "        attrs.textLength = P * CARD_F * 0.86;\n        attrs.lengthAdjust = 'spacingAndGlyphs';",
    '        attrs["font-size"] = fs * 0.7;'],
  ['the lanes, the shelf and the edge fill the box',
    'var S = VB - LANE - EDGE;',
    'var S = VB - LANE;'],
  ['⚠ the scroll escape is TWO rules — the selector-list form is decorative',
    "+ 'html.tsh-scroll{overflow-y:auto;height:auto;min-height:100%;}'",
    "+ 'html,body.tsh-scroll{overflow-y:auto;height:auto;min-height:100%;}'"],
  ['the scroll escape actually reaches the document element',
    "document.documentElement.classList.add('tsh-scroll');",
    "document.documentElement.classList.remove('tsh-scroll');"],
  ['the short-viewport step is spent as a max-WIDTH',
    "+ '@media (max-height:700px){.tsh-arena{max-width:400px;}}'",
    "+ '@media (max-height:700px){.tsh-arena{max-height:400px;}}'"],
  ['there are two short-viewport steps',
    "+ '@media (max-height:560px){.tsh-arena{max-width:300px;}}'",
    "+ '@media (max-height:560px){.tsh-ledge{max-width:300px;}}'"],
  ['the print chip rides the same ledge — the measured 56px that stops the cut-off',
    "this._btnPrint = this._ledgeBtn(ledge, 'tsh-b-print'",
    "this._btnPrint = this._ledgeBtn(wrap, 'tsh-b-print'"]
];

function runVerify(dir) {
  try {
    execFileSync(process.execPath, [VERIFY], {
      env: Object.assign({}, process.env, { TSH_TOOL_DIR: dir }),
      stdio: 'pipe',
      timeout: 30000
    });
    return true;                    /* the gate passed */
  } catch (e) {
    return false;                   /* failed, threw, or timed out */
  }
}

const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tsh-mut-'));
function writeTool(body) {
  const dir = fs.mkdtempSync(path.join(tmpRoot, 'v-'));
  fs.writeFileSync(path.join(dir, 'times-shelf.js'), body, 'utf8');
  return dir;
}

/* ---- THE CONTROL. Without this the whole run proves nothing. ---- */
const controlDir = writeTool(ORIGINAL);
const controlPass = runVerify(controlDir);
if (!controlPass) {
  console.log('CONTROL FAILED — the gate does not pass on unmutated source.');
  console.log('Everything below would score as "killed" for the wrong reason.');
  process.exit(1);
}
console.log('control: the unmutated tool PASSES\n');

let killed = 0;
const survivors = [];
const faults = [];

MUTATIONS.forEach(([name, find, repl], i) => {
  const n = ORIGINAL.split(find).length - 1;
  if (n !== 1) {
    /* ⚠ THROW, never skip — a dropped needle shrinks the total while
       the run still reports "every mutation killed". */
    faults.push(`#${i + 1} "${name}": needle occurs ${n} times, expected exactly 1`);
    return;
  }
  const dir = writeTool(ORIGINAL.replace(find, repl));
  if (runVerify(dir)) survivors.push(`#${i + 1} ${name}`);
  else killed++;
});

console.log(`mutate-times-shelf: ${killed}/${MUTATIONS.length} killed, ` +
  `${survivors.length} survived, ${faults.length} harness faults`);
faults.forEach(f => console.log('  HARNESS FAULT ' + f));
survivors.forEach(s => console.log('  SURVIVED ' + s));

try { fs.rmSync(tmpRoot, { recursive: true, force: true }); } catch (e) {}

if (survivors.length || faults.length) process.exit(1);
console.log('PASS — every mutation killed, control green, 0 harness faults.');
