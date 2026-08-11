/* =====================================================================
   GATE — scripts/_shp-nofmt.js           TOOL #57 THE SHAPE STRETCHER
   ---------------------------------------------------------------------
   ⭐⭐ REMOVING A CONSUMER CAN CONVERT A LOUD FAILURE INTO A SILENT ONE,
   AND THAT IS THE ONLY REASON THIS GATE IS NOT ABOUT DEAD CODE.

   `_fmt` was the substituter for the `{rot}` placeholder in the shape
   labels. Striking the banned degree numeral took its only consumer with
   it. Deleting the function is the obvious half.

   The half Finnish found is that while `_fmt` EXISTED, a locale still
   shipping `{rot}` rendered a number — visibly wrong, loudly wrong. With
   `_fmt` gone, that same locale renders the LITERAL BRACES to a screen
   reader, and from the locale side "placeholder substituted" and
   "placeholder printed raw" are INDISTINGUISHABLE. Placeholder-parity
   catches only one of them, so parity alone is not enough.

   THE ASSERTION, therefore, is a disjunction over the TOOL, not a check
   over the locales:

       `_fmt` is declared AND called   ...OR...   `_fmt` is absent

   and separately, no string in the file may carry a `{placeholder}` when
   no substituter exists to consume it.

   ⚠ Comments are stripped before any scan (`.lcs-` matched a COMMENT
   twice running on a sibling), and the declaration itself is not counted
   as a call site.

   POISON, BOTH DIRECTIONS (`--poison`): a synthetic source with a
   declared-and-uncalled `_fmt` must FAIL; one with `_fmt` declared AND
   called must PASS; one with no `_fmt` at all must PASS; and one with no
   `_fmt` but a live `{rot}` in a string must FAIL.

   Usage:  node scripts/_shp-nofmt.js [--poison]
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const FILE = path.join(process.cwd(), 'mini tools', 'shape-stretcher.js');

const decomment = s => s
  .replace(/\/\*[\s\S]*?\*\//g, ' ')
  .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');

/* the judgement, over a source string. Returns a list of failures. */
function judge(src, label) {
  const out = [];
  const body = decomment(src);

  /* ⚠ NON-VACUITY FIRST: a scan over text that is not the tool cannot
     fail, and would certify anything. */
  if (body.length < 400) { out.push(label + ': the decommented source is ' + body.length + ' chars — this scan is reading the wrong text'); return out; }

  const declared = /_fmt\s*:\s*function/.test(body);
  /* a call site is `_fmt(` that is NOT the declaration */
  const calls = (body.match(/[.\[]\s*['"]?_fmt['"]?\s*\]?\s*\(/g) || []).length
    + (body.match(/(?<![.\w])_fmt\s*\(/g) || []).length;

  if (declared && calls === 0) {
    out.push(label + ': ⚠⚠ `_fmt` IS DECLARED AND NEVER CALLED — dead code, and worse: a locale still shipping `{rot}` would print the literal braces to a screen reader, which is indistinguishable from a correct substitution when read from the locale side');
  }

  /* the companion condition: with no substituter, no placeholder may
     survive anywhere in the authored strings */
  if (!declared || calls === 0) {
    const strBlock = body.slice(body.indexOf('strings:'), body.indexOf('settings:'));
    const stray = strBlock.match(/\{[a-zA-Z_][\w]*\}/g) || [];
    if (stray.length) {
      out.push(label + ': ⚠⚠ ' + stray.length + ' PLACEHOLDER(S) SURVIVE WITH NO SUBSTITUTER (' + stray.join(', ') + ') — these render as literal braces, silently');
    }
  }
  return out;
}

/* ---------------------------------------------------------------- */
if (process.argv.indexOf('--poison') >= 0) {
  const pad = 'var x = 1; '.repeat(60);
  const CASES = [
    ['declared and uncalled', pad + '\n  _fmt: function (s, v) { return s; },\n  strings: { a: { en: "x" } },\n  settings: []', true],
    ['declared and called', pad + '\n  _fmt: function (s, v) { return s; },\n  go: function () { return this._fmt("a {b}", {b:1}); },\n  strings: { a: { en: "x {b}" } },\n  settings: []', false],
    ['absent entirely', pad + '\n  go: function () { return 1; },\n  strings: { a: { en: "x" } },\n  settings: []', false],
    ['absent but a live placeholder', pad + '\n  go: function () { return 1; },\n  strings: { a: { en: "x {rot} y" } },\n  settings: []', true],
    ['a comment mentioning _fmt(', pad + '\n  /* the old _fmt( call lived here */\n  strings: { a: { en: "x" } },\n  settings: []', false]
  ];
  let bad = 0;
  CASES.forEach(function (c) {
    const fired = judge(c[1], 'poison').length > 0;
    const good = fired === c[2];
    if (!good) bad++;
    console.log((good ? '  ok   ' : '  ⚠⚠ ') + c[0].padEnd(32) + (fired ? 'FIRED' : 'passed') + '   expected ' + (c[2] ? 'FIRED' : 'passed'));
  });
  console.log('\n' + (bad ? 'POISON FAIL' : 'POISON OK') + '  ' + (CASES.length - bad) + '/' + CASES.length);
  process.exit(bad ? 1 : 0);
}

const fails = judge(fs.readFileSync(FILE, 'utf8'), 'shape-stretcher.js');
console.log('\n' + (fails.length ? 'FAIL' : 'PASS') + '  _fmt has a call site or is absent, and no placeholder outlives its substituter');
fails.forEach(f => console.log('  x ' + f));
process.exit(fails.length ? 1 : 0);
