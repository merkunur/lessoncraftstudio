#!/usr/bin/env node
/* =====================================================================
   audit-css-font-shorthand.js — browser-free lint, BUILD-FAILING.

   A CSS `font:` shorthand whose family list contains an UNQUOTED name with a
   space and a digit -- `Baloo 2` -- is INVALID. A family identifier may not
   begin with a digit, so the family list is invalid, so the browser drops the
   WHOLE declaration: the clamp() size floor, the weight and the line-height all
   silently vanish and the element falls back to inherited styling.

   This shipped live in 15 activity files. Measured on skipcount before the fix:
   the answer buttons rendered at the INHERITED 16px at 768/1024 while a separate
   longhand rule kept them at 20px below 380px -- so the text was SMALLER on a
   desktop than on a phone, and grew smaller as the button grew larger.

   ⚠ Why this needs its own gate rather than a visual one: visual-qa's SPARSE
   check is calibrated for picture answer cards (content should fill the card).
   A numeral centred in a wide pill legitimately does not, so that check cannot
   be the detector for this class without either false-accusing correct layouts
   or having its threshold softened -- and softening a threshold to pass is
   forbidden. The invalid declaration itself is exactly checkable, so it is
   checked exactly, at the source.

   ⚠ Comments are stripped before scanning. Four files DOCUMENT this trap in a
   comment quoting the old broken declaration; a scanner that reads prose instead
   of code would rewrite the documentation and report a defect that is not there.

   Exit 0 = clean.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'mini tools');
const DQ = String.fromCharCode(34);
const SQ = String.fromCharCode(39);
const BS = String.fromCharCode(92);

/* Families that are invalid unquoted inside a `font:` shorthand: they contain a
   space AND a digit-initial token. Extend the list, never loosen the rule. */
const RISKY = ['Baloo 2'];

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + ' '.repeat(m.length - p1.length));
}

function scan(src) {
  const masked = stripComments(src);
  const out = [];
  for (const fam of RISKY) {
    const re = new RegExp('font:[^;' + SQ + DQ + '`]*?' + fam.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    for (const m of masked.matchAll(re)) {
      const i = m.index + m[0].lastIndexOf(fam);
      const prev = src[i - 1];
      if (prev === DQ || prev === SQ || prev === BS) continue;   // quoted -> valid
      const line = src.slice(0, i).split('\n').length;
      out.push({ line, fam, snippet: m[0].slice(-64) });
    }
  }
  return out;
}

function main() {
  if (process.argv.includes('--self-test')) return selfTest();
  let bad = 0; const files = [];
  for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith('.js'))) {
    const hits = scan(fs.readFileSync(path.join(DIR, f), 'utf8'));
    if (!hits.length) continue;
    files.push(f);
    for (const h of hits) { bad++; console.error(`  ${f}:${h.line}  unquoted ${DQ}${h.fam}${DQ} in a font: shorthand -> declaration DROPPED\n      ...${h.snippet}`); }
  }
  if (bad) {
    console.error(`\nFONT-SHORTHAND AUDIT FAILED — ${bad} invalid declaration(s) across ${files.length} file(s).`);
    console.error(`Fix: quote the family (font: 800 clamp(...)/1 ${DQ}Baloo 2${DQ}, sans-serif), or use longhand.`);
    process.exit(1);
  }
  console.log('FONT-SHORTHAND AUDIT PASSED — 0 invalid font: shorthands; every risky family is quoted (comments excluded).');
  process.exit(0);
}

/* Poison-test in BOTH directions: it must fire on an unquoted family and stay
   silent on a quoted one AND on the same text sitting inside a comment. */
function selfTest() {
  const fails = [];
  const mustFire = `s+='.x{font:800 clamp(1rem,6vw,2rem)/1 Baloo 2,sans-serif;}';`;
  const mustPass = `s+='.x{font:800 clamp(1rem,6vw,2rem)/1 ${DQ}Baloo 2${DQ},sans-serif;}';`;
  const mustPassComment = `/* used to read \`font:700 22px Baloo 2,...\` which was invalid */`;
  const mustPassLonghand = `s+='.x{font-family:Baloo 2,sans-serif;font-size:2rem;}';`;
  if (scan(mustFire).length !== 1) fails.push('did NOT fire on an unquoted family');
  if (scan(mustPass).length !== 0) fails.push('fired on a correctly QUOTED family');
  if (scan(mustPassComment).length !== 0) fails.push('fired on a COMMENT describing the trap');
  if (scan(mustPassLonghand).length !== 0) fails.push('fired on font-family LONGHAND (valid, not this class)');
  if (fails.length) { console.error('SELF-TEST FAILED:\n  ' + fails.join('\n  ')); process.exit(1); }
  console.log('SELF-TEST PASSED — fires on unquoted; silent on quoted, on comments, and on longhand.');
  process.exit(0);
}

main();
