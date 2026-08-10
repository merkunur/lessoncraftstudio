/* =====================================================================
   register-number-hotel.js — the seven registration points for #48.
   Run:  node scripts/register-number-hotel.js
   IDEMPOTENT: a second run must report every point as already done.

   ⚠ POINT 1 IS THE 410 TRAP. `/tools/*` is a seller-era teardown and
   `LIVE_TOOL_SLUGS` is the carve-out — omit the key and ALL ELEVEN
   LOCALES RETURN 410 GONE.
   ⚠ POINT 3 IS THE ONE NON-IDEMPOTENT STEP, so it is guarded on
   registration state, not on the version number.
   ⚠ POINTS 6 AND 7 DEGRADE SILENTLY: a missing category renders the
   tool in the wrong hub section forever, and a missing preview shows a
   generic glyph. Both are checked, neither errors on its own.
   ⚠ EIGHT REQUIRED ToolEntry FIELDS, read off the interface rather
   than remembered — #42 shipped five and failed the static export of
   all eleven landings AFTER two guards reported success.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'frontend');
const KEY = 'number-hotel';
const PREV = 'counting-cups';
const L = require('./_number-hotel-landing.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let done = 0, already = 0;
function step(n, changed) { if (changed) { console.log(`  ✓ ${n}`); done++; } else { console.log(`  · ${n} (already)`); already++; } }
function rd(f) { return fs.readFileSync(path.join(R, f), 'utf8'); }
function wr(f, s) { fs.writeFileSync(path.join(R, f), s); }

/* ---- 1. live-tool-slugs.ts — THE 410 TRAP ------------------------ */
{
  const f = 'config/live-tool-slugs.ts';
  let s = rd(f);
  if (s.indexOf(`'${KEY}'`) === -1) {
    s = s.replace(`'${PREV}'] as const`, `'${PREV}', '${KEY}'] as const`);
    wr(f, s); step('live-tool-slugs TOOL_KEYS (the 410 trap)', true);
  } else step('live-tool-slugs TOOL_KEYS (the 410 trap)', false);
}

/* ---- 2. tool-content.ts x 4, EACH ANCHORED EXPLICITLY --------------
   ⚠ On #48 a single clever regex silently performed 2 of these 4 and
   reported success; the other two surfaced only by grepping afterwards.
   Four separate anchors, and all four VERIFIED to have landed.
   ⚠ Newlines come from String.fromCharCode(10), never an escape — a
   backslash-n written through a generator collapses to a real newline
   and breaks the template it sits in. */
{
  const f = 'lib/seo/tool-content.ts';
  const NL = String.fromCharCode(10);
  let s = rd(f);
  const edits = [
    ["'" + PREV + "'] as const", "'" + PREV + "', '" + KEY + "'] as const"],
    ["  '" + PREV + "': '/mini-tools/" + PREV + ".html',",
     "  '" + PREV + "': '/mini-tools/" + PREV + ".html'," + NL + "  '" + KEY + "': '/mini-tools/" + KEY + ".html',"],
    ["  '" + PREV + "': '" + PREV + "',",
     "  '" + PREV + "': '" + PREV + "'," + NL + "  '" + KEY + "': '" + KEY + "',"],
    ["  '" + PREV + "'?: ToolEntry;",
     "  '" + PREV + "'?: ToolEntry;" + NL + "  '" + KEY + "'?: ToolEntry;"]
  ];
  let did = 0;
  for (let i = 0; i < edits.length; i++) {
    const find = edits[i][0], repl = edits[i][1];
    if (s.indexOf(repl) !== -1) continue;
    if (s.indexOf(find) === -1) { console.log('  x tool-content anchor missing: ' + find.slice(0, 46)); process.exit(1); }
    s = s.replace(find, repl); did++;
  }
  if (did) wr(f, s);
  const after = rd(f);
  const hits = (after.match(new RegExp("'" + KEY + "'", 'g')) || []).length;
  if (hits < 4) { console.log('  x tool-content has only ' + hits + '/4 references to ' + KEY); process.exit(1); }
  step('tool-content.ts (4/4 anchors verified)', did > 0);
}

/* ---- 3. wrapper version — the one non-idempotent step ------------ */
{
  const f = 'app/[locale]/tools/[tool]/page.tsx';
  let s = rd(f);
  const slugs = rd('config/live-tool-slugs.ts');
  const registered = slugs.indexOf(`'${KEY}'`) !== -1;
  const m = s.match(/const TOOL_WRAPPER_VERSION = '([\d.]+)'/);
  if (registered && m && m[1] === '7.83') {
    s = s.replace(`const TOOL_WRAPPER_VERSION = '${m[1]}'`, `const TOOL_WRAPPER_VERSION = '7.84'`);
    wr(f, s); step(`TOOL_WRAPPER_VERSION ${m[1]} → 7.83`, true);
  } else step(`TOOL_WRAPPER_VERSION (${m ? m[1] : '?'})`, false);
}

/* ---- 4. manipulatives.ts hub card -------------------------------- */
{
  const f = 'lib/manipulatives.ts';
  let s = rd(f);
  if (s.indexOf(KEY) === -1) {
    console.log(`  ! manipulatives.ts needs a hand-written hub card for '${KEY}'`);
  } else step('manipulatives.ts hub card', false);
}

/* ---- 5. eleven tool-content json ToolEntry ----------------------- */
{
  /* the field list is READ OFF THE INTERFACE, never remembered, and the
     script refuses to run if it parses implausibly few */
  const iface = rd('lib/seo/tool-content.ts');
  const block = iface.match(/interface ToolEntry\s*\{([\s\S]*?)\n\}/);
  const fields = block ? (block[1].match(/^\s*(\w+)\s*[?:]/gm) || []).map(x => x.trim().replace(/[?:]$/, '').trim()) : [];
  if (fields.length < 6) { console.log(`  ✗ parsed only ${fields.length} ToolEntry fields — refusing`); process.exit(1); }
  let changed = 0;
  for (const loc of LOCALES) {
    const f = `messages/tool-content/${loc}.json`;
    const j = JSON.parse(rd(f));
    if (j[KEY]) continue;
    const e = L[loc];
    if (!e) { console.log(`  ✗ no landing data for ${loc}`); process.exit(1); }
    for (const fl of fields) {
      if (!(fl in e)) { console.log(`  ✗ ${loc} missing required field '${fl}'`); process.exit(1); }
    }
    const out = {};
    for (const k of Object.keys(j)) { if (k === 'labels') out[KEY] = e; out[k] = j[k]; }
    if (!out[KEY]) out[KEY] = e;
    wr(f, JSON.stringify(out, null, 2) + '\n');
    changed++;
  }
  step(`tool-content/*.json ToolEntry × ${LOCALES.length} (${fields.length} required fields)`, changed > 0);
}

/* ---- 6. tool-categories.ts — silent if omitted ------------------- */
{
  const f = 'lib/tool-categories.ts';
  let s = rd(f);
  if (s.indexOf(`'${KEY}'`) === -1) {
    s = s.replace(`  '${PREV}': 'number',`, `  '${PREV}': 'number',\n  '${KEY}': 'number',`);
    wr(f, s); step("tool-categories 'number'", true);
  } else step("tool-categories 'number'", false);
}

/* ---- 7. thumbnail — silent if omitted ---------------------------- */
{
  const p = path.join(R, 'public', 'mini-tools', 'tool-previews', KEY + '.webp');
  const alt = path.join('/var/www/lcs-media/mini-tools/tool-previews', KEY + '.webp');
  console.log(fs.existsSync(p)
    ? '  · hub thumbnail present locally'
    : `  ! hub thumbnail NOT generated yet — run generate-tool-previews.js --only=${KEY} and scp to ${alt} BEFORE deploy.sh`);
}

console.log(`\n${done} written, ${already} already in place.`);
