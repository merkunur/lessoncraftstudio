/* =====================================================================
   audit-font-shorthand.js — the dropped-declaration gate
   ---------------------------------------------------------------------
   Run:  node scripts/audit-font-shorthand.js [--list] [--json]
   Exit 1 = a NEW offender. Wired into deploy.sh.

   ⭐⭐ THE DEFECT THIS EXISTS FOR, MEASURED IN A BROWSER, NOT REASONED:

       #a { font: 700 22px Baloo 2,Nunito,sans-serif; }
       -> computed  size=16px  weight=400  family="Times New Roman"

       #b { font: 700 22px "Baloo 2",Nunito,sans-serif; }
       -> computed  size=22px  weight=700  family="Baloo 2", Nunito, sans-serif

   A font-family identifier MAY NOT BEGIN WITH A DIGIT, so the unquoted
   `Baloo 2` makes the family list invalid, and an invalid component
   invalidates the WHOLE shorthand — the size and the weight go with it.
   The element silently falls back to the inherited 16px/400/serif.

   ⚠ IT IS INVISIBLE THREE WAYS AT ONCE, which is why 40 of them
   accumulated. (1) Nothing errors and nothing logs. (2) The family still
   LOOKS approximately right wherever a parent already sets Nunito or
   Baloo. (3) In SVG the text still SCALES correctly with the viewBox, so
   a numeral reads 15px at 1366 and 38px at 2560 — a perfect ramp off a
   wrong base. `unroll-tape`'s numerals were 27% small and un-bold from
   the day it shipped; the wide-viewport gate is what finally caught it,
   and `build-plan.js:936` had already written the warning down for a
   reader who never came.

   ⚠ RATCHET, NOT AMNESTY. `KNOWN` holds the offenders that existed when
   this gate was written. They are real defects awaiting the activity
   pass, where each activity's own suite runs. THE LIST MAY ONLY SHRINK —
   never add an entry to make a build pass.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'mini tools');
const LIST = process.argv.indexOf('--list') > -1;
const JSONOUT = process.argv.indexOf('--json') > -1;

/* A `font:` shorthand whose value contains a bare identifier that starts
   with a digit. Restricted to the shorthand: `font-family:` longhand has
   the same rule, but only the shorthand takes the SIZE and WEIGHT down
   with it, and the longhand form is the fix this gate steers toward. */
const FONT_SHORTHAND = /(^|[;{'"\s])font\s*:\s*([^;}'"]+)/g;

/* the family list is everything after the size (and optional /line-height).
   Rather than parse CSS, look for a token of the shape <letters><space><digits>
   that is NOT inside quotes — that is exactly the failing shape. */
function offendingFamilies(value) {
  /* strip anything quoted: those are legal however they are spelled */
  const bare = value.replace(/"[^"]*"/g, '""').replace(/'[^']*'/g, "''");
  /* a family token is comma-separated; a bare one beginning a word and
     containing a space-then-digit run is the failure */
  const out = [];
  bare.split(',').forEach((tok) => {
    const t = tok.trim();
    /* skip the first chunk: it holds style/weight/size/line-height, whose
       digits are legitimate (`700 22px`, `clamp(1rem,5vw,2.5rem)/1`). The
       family always follows a comma OR ends the first chunk, so test the
       TAIL of the first chunk after the last size-ish token. */
    if (!t) return;
    /* a bare identifier sequence where some identifier starts with a digit */
    const m = /(?:^|\s)([A-Za-z][A-Za-z-]*(?:\s+\d[\w-]*)+)\s*$/.exec(t);
    if (m) out.push(m[1]);
  });
  return out;
}

function scan() {
  const hits = [];
  fs.readdirSync(ROOT).filter((f) => /\.js$/.test(f)).sort().forEach((f) => {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    src.split('\n').forEach((line, i) => {
      /* ⚠ SKIP COMMENT LINES. The fix for unroll-tape QUOTES the broken
         declaration in the comment that explains it, and a gate that
         condemns its own documentation teaches the next reader to delete
         the documentation. */
      const trimmed = line.trim();
      if (trimmed.indexOf('*') === 0 || trimmed.indexOf('//') === 0) return;
      let m;
      FONT_SHORTHAND.lastIndex = 0;
      while ((m = FONT_SHORTHAND.exec(line)) !== null) {
        const bad = offendingFamilies(m[2]);
        if (bad.length) hits.push({ file: f, line: i + 1, family: bad[0], text: trimmed.slice(0, 110) });
      }
    });
  });
  return hits;
}

/* ---------------------------------------------------------------------
   POISON — BOTH DIRECTIONS, because a ban that is too wide is the failure
   mode this repo keeps buying. MUST_FIRE strings are genuinely broken;
   MUST_PASS strings are legal CSS that a careless widening would condemn.
   Note `Baloo2` (no space) and `"Baloo 2"` (quoted) are both LEGAL, and
   `clamp(1.45rem,5vw,2.5rem)/1` is full of digits that mean nothing here.
   --------------------------------------------------------------------- */
const MUST_FIRE = [
  "font:700 22px Baloo 2,Nunito,sans-serif;",
  "font:800 clamp(1.45rem,5vw,2.5rem)/1 Baloo 2,Nunito,sans-serif;",
  "font: 600 1rem/1.2 Open Sans 2, sans-serif;",
  "font:800 1.3rem/1 Baloo 2,sans-serif;"
];
const MUST_PASS = [
  'font:700 22px "Baloo 2",Nunito,sans-serif;',
  "font:700 22px 'Baloo 2',Nunito,sans-serif;",
  "font:600 clamp(.9rem,3.2vw,1.02rem)/1.1 Nunito,sans-serif;",
  "font:800 clamp(1.05rem,3.6vw,1.5rem)/1 Nunito,system-ui,sans-serif;",
  "font:italic 700 14px/1.4 Georgia,serif;",
  'font:800 clamp(1rem,4vw,2rem)/1 "Baloo 2",Nunito,sans-serif;'
];

function poison() {
  let bad = 0;
  MUST_FIRE.forEach((s) => {
    if (!offendingFamilies(/font\s*:\s*([^;]+)/.exec(s)[1]).length) {
      console.error('  POISON FAIL — did not fire on a genuinely broken rule: ' + s); bad++;
    }
  });
  MUST_PASS.forEach((s) => {
    if (offendingFamilies(/font\s*:\s*([^;]+)/.exec(s)[1]).length) {
      console.error('  POISON FAIL — fired on LEGAL css: ' + s); bad++;
    }
  });
  if (!bad) console.log('  poison ok — ' + MUST_FIRE.length + ' must-fire and ' + MUST_PASS.length + ' must-pass, both directions');
  return bad;
}

/* ---------------------------------------------------------------------
   THE RATCHET. Baselined 2026-08-03 at 37 declarations in 17 activity
   files, all found by this gate's first run. Each is a live defect: the
   element renders 16px/400/serif instead of the size and weight the rule
   asks for. They are fixed in the activity pass, where each activity's
   own local-test and locale-layout gates can confirm the change.
   --------------------------------------------------------------------- */
const KNOWN = new Set([
  'affix-activity.js:144', 'bramble-activity.js:235',
  'compound-meaning-activity.js:139', 'compound-meaning-activity.js:144',
  'compound-meaning-activity.js:145', 'compound-meaning-activity.js:153',
  'compound-meaning-activity.js:157', 'compound-meaning-activity.js:167',
  'field-guide-activity.js:142', 'field-guide-activity.js:147',
  'graph-it-activity.js:252', 'graph-it-activity.js:256',
  'halfway-harbors-activity.js:169', 'halfway-harbors-activity.js:174',
  'line-plot-activity.js:126', 'maple-bakery-activity.js:159',
  'mending-fences-activity.js:296', 'mending-fences-activity.js:314',
  'mending-fences-activity.js:322',
  'opposites-activity.js:279', 'opposites-activity.js:280',
  'opposites-activity.js:298', 'opposites-activity.js:299',
  'opposites-activity.js:302', 'opposites-activity.js:310',
  'opposites-activity.js:313',
  'patchwork-meadow-activity.js:210', 'patchwork-meadow-activity.js:216',
  'point-of-view-activity.js:145',
  'rhyme-shop-activity.js:135', 'rhyme-shop-activity.js:136',
  'rhyme-shop-activity.js:155', 'rhyme-shop-activity.js:159',
  'shades-activity.js:113', 'shades-activity.js:117', 'shades-activity.js:121',
  'skipcount-activity.js:157'
]);

const hits = scan();
if (JSONOUT) { console.log(JSON.stringify(hits, null, 1)); process.exit(0); }

console.log('audit-font-shorthand — an unquoted family with a digit drops the WHOLE declaration\n');
const pbad = poison();

/* ⚠ THE RATCHET MUST NOT BE ABLE TO GROW SILENTLY. Line numbers move when
   a file is edited, so a KNOWN entry that no longer matches is reported
   too — as a prompt to re-baseline deliberately, never as a pass. */
const seen = new Set();
const fresh = [];
hits.forEach((h) => {
  const key = h.file + ':' + h.line;
  seen.add(key);
  if (!KNOWN.has(key)) fresh.push(h);
});
const stale = [...KNOWN].filter((k) => !seen.has(k));

if (LIST || fresh.length) {
  (fresh.length ? fresh : hits).forEach((h) => {
    console.log('  ' + (KNOWN.has(h.file + ':' + h.line) ? 'known ' : 'NEW   ') +
      (h.file + ':' + h.line).padEnd(38) + 'family "' + h.family + '"');
  });
}

console.log('\n  ' + hits.length + ' dropped declaration(s) on disk; ' + KNOWN.size + ' baselined; ' +
  fresh.length + ' new; ' + stale.length + ' baseline entries no longer match');

if (pbad) { console.error('\nFAIL — the gate itself did not survive its poison'); process.exit(1); }
if (fresh.length) {
  console.error('\nFAIL — ' + fresh.length + ' NEW dropped `font:` shorthand(s).');
  console.error('  Fix: write it longhand — font-weight / font-size / font-family with the family QUOTED.');
  process.exit(1);
}
if (stale.length) {
  console.error('\nFAIL — ' + stale.length + ' baseline entry(ies) no longer match a real offender:');
  stale.forEach((k) => console.error('    ' + k));
  console.error('  If they were FIXED, delete them from KNOWN (the ratchet may only shrink).');
  console.error('  If a file merely MOVED lines, re-baseline deliberately with --list.');
  process.exit(1);
}
console.log('\nPASS — no new dropped `font:` shorthand');
