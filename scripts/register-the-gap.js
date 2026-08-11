/* =====================================================================
   register-the-gap.js — the seven registration points for #56.
   Run:  node scripts/register-the-gap.js
   IDEMPOTENT: a second run must report every point as already done.

   Cloned from register-missing-question.js (#55), which encodes the
   traps this class of script keeps walking into:

   ⚠ POINT 1 IS THE 410 TRAP. `/tools/*` is a seller-era teardown and
   `LIVE_TOOL_SLUGS` is the carve-out — omit the key and ALL ELEVEN
   LOCALES RETURN 410 GONE.
   ⚠ POINT 2 IS FOUR SEPARATE ANCHORS, never one clever regex: on #54 a
   single pattern silently performed 2 of the 4 and reported success.
   All four are re-read from disk and verified individually.
   ⚠ POINT 3 IS THE ONE NON-IDEMPOTENT STEP, so it is guarded on
   REGISTRATION STATE (is the key in live-tool-slugs yet?) rather than on
   the version number, and the log prints the value ACTUALLY WRITTEN
   (#40's register script logged a category it did not write).
   ⚠ POINTS 6 AND 7 DEGRADE SILENTLY: a missing category renders the tool
   in the wrong hub section forever, and a missing preview shows a
   generic glyph. Tool #38 shipped without both.
   ⚠ POINT 6 PARSES THE ToolCategory UNION OFF SOURCE and refuses a value
   outside it — the #44 lesson ('geometry' is not a category).
   ⚠ EIGHT REQUIRED ToolEntry FIELDS, READ OFF THE INTERFACE rather than
   remembered — #42 shipped five and failed the static export of all
   eleven landing pages AFTER two guards reported success.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'frontend');
const KEY = 'the-gap';
const PREV = 'missing-question';
const CATEGORY = 'number';           /* change-unknown, a number question — 1.OA.D.8 */
const VER_FROM = '7.90', VER_TO = '7.91';
const L = require('./_the-gap-landing.js');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let done = 0, already = 0;
function step(n, changed) { if (changed) { console.log(`  ✓ ${n}`); done++; } else { console.log(`  · ${n} (already)`); already++; } }
function rd(f) { return fs.readFileSync(path.join(R, f), 'utf8'); }
function wr(f, s) { fs.writeFileSync(path.join(R, f), s); }
function die(m) { console.error('  ✗ ' + m); process.exit(1); }

/* ---- 1. live-tool-slugs.ts — THE 410 TRAP ------------------------ */
{
  const f = 'config/live-tool-slugs.ts';
  let s = rd(f);
  if (s.indexOf(`'${KEY}'`) === -1) {
    const find = `'${PREV}'] as const`;
    if (s.indexOf(find) === -1) die(`live-tool-slugs has no '${PREV}'] as const to anchor on`);
    s = s.replace(find, `'${PREV}', '${KEY}'] as const`);
    wr(f, s);
    if (rd(f).indexOf(`'${KEY}'`) === -1) die('live-tool-slugs edit did not land');
    step('live-tool-slugs TOOL_KEYS (the 410 trap)', true);
  } else step('live-tool-slugs TOOL_KEYS (the 410 trap)', false);
}

/* ---- 2. tool-content.ts x 4, EACH ANCHORED EXPLICITLY --------------
   ⚠ Newlines come from String.fromCharCode(10), never an escape — a
   backslash-n written through a generator collapses to a real newline
   and breaks the template it sits in.
   ⚠⚠ AND THE NEWLINE IS TAKEN FROM THE FILE, NOT ASSUMED. This bit on
   #56's third run: a `git stash pop` restored tool-content.ts through
   core.autocrlf as CRLF, every multi-line "already done?" needle (built
   with a bare \n) went blind, and the script re-applied three of these
   four edits — shipping DUPLICATE object keys that `tsc` had already run
   past. The single-line needles were unaffected, which is why only three
   of four doubled. Same class as the recorded #43 mutation-needle
   defect; the remedy is the same — fix it in the harness, and read the
   EOL off the artefact rather than deciding what it ought to be. */
{
  const f = 'lib/seo/tool-content.ts';
  let s = rd(f);
  const NL = /\r\n/.test(s) ? String.fromCharCode(13, 10) : String.fromCharCode(10);
  const edits = [
    ["'" + PREV + "'] as const", "'" + PREV + "', '" + KEY + "'] as const"],
    ["  '" + PREV + "': '/mini-tools/" + PREV + ".html',",
     "  '" + PREV + "': '/mini-tools/" + PREV + ".html'," + NL + "  '" + KEY + "': '/mini-tools/" + KEY + ".html',"],
    ["  '" + PREV + "': '" + PREV + "',",
     "  '" + PREV + "': '" + PREV + "'," + NL + "  '" + KEY + "': '" + KEY + "',"],
    ["  '" + PREV + "'?: ToolEntry;",
     "  '" + PREV + "'?: ToolEntry;" + NL + "  '" + KEY + "'?: ToolEntry;"]
  ];
  /* ⚠ the "already done?" test runs on an EOL-NORMALISED copy, so a file
     with MIXED endings (which is exactly what the duplicate-key incident
     left behind) cannot make a present edit read as absent. */
  const norm = (x) => x.split(String.fromCharCode(13, 10)).join(String.fromCharCode(10));
  let did = 0;
  for (let i = 0; i < edits.length; i++) {
    const find = edits[i][0], repl = edits[i][1];
    if (norm(s).indexOf(norm(repl)) !== -1) continue;
    if (s.indexOf(find) === -1) die('tool-content anchor missing: ' + find.slice(0, 46));
    s = s.replace(find, repl); did++;
  }
  if (did) wr(f, s);
  const after = rd(f);
  const hits = (after.match(new RegExp("'" + KEY + "'", 'g')) || []).length;
  if (hits < 4) die('tool-content has only ' + hits + '/4 references to ' + KEY);
  /* each of the four named surfaces individually, not just the count */
  if (after.indexOf("'" + KEY + "'] as const") === -1) die('tool-content TOOL_KEYS did not land');
  if (after.indexOf("'" + KEY + "': '/mini-tools/" + KEY + ".html'") === -1) die('tool-content TOOL_MINI_URL did not land');
  if (after.indexOf("'" + KEY + "': '" + KEY + "'") === -1) die('tool-content TOOL_ACTIVITY_PREFIX did not land');
  if (after.indexOf("'" + KEY + "'?: ToolEntry;") === -1) die('tool-content ToolContentFile member did not land');
  step('tool-content.ts (4/4 anchors verified individually)', did > 0);
}

/* ---- 3. wrapper version — the one non-idempotent step ------------
   Guarded on REGISTRATION STATE: the bump fires only on the run that
   first put KEY into live-tool-slugs, i.e. only while the version is
   still VER_FROM. A second run sees VER_TO and reports "already". */
{
  const f = 'app/[locale]/tools/[tool]/page.tsx';
  let s = rd(f);
  const registered = rd('config/live-tool-slugs.ts').indexOf(`'${KEY}'`) !== -1;
  const m = s.match(/const TOOL_WRAPPER_VERSION = '([\d.]+)'/);
  if (!m) die('TOOL_WRAPPER_VERSION not found in the tool wrapper');
  if (registered && m[1] === VER_FROM) {
    s = s.replace(`const TOOL_WRAPPER_VERSION = '${m[1]}'`, `const TOOL_WRAPPER_VERSION = '${VER_TO}'`);
    wr(f, s);
    /* ⚠ the log reports the value ACTUALLY WRITTEN, re-read from disk */
    const now = rd(f).match(/const TOOL_WRAPPER_VERSION = '([\d.]+)'/)[1];
    if (now !== VER_TO) die(`wrapper version is '${now}', expected '${VER_TO}'`);
    step(`TOOL_WRAPPER_VERSION ${VER_FROM} → ${now}`, true);
  } else step(`TOOL_WRAPPER_VERSION (${m[1]})`, false);
}

/* ---- 4. manipulatives.ts hub card -------------------------------- */
{
  /* ⚠ WRITTEN, not warned about. #49's script printed a note here and
     left the card to a hand edit; a note is not a registration step, and
     `folding-wall` still carries a stale hub-card name in all eleven
     locales because of exactly that. The card was generated from the
     tool's own strings + the panel file by _mk-the-gap-card.js. */
  const f = 'lib/manipulatives.ts';
  let s = rd(f);
  if (s.indexOf(`id: "${KEY}"`) === -1) {
    const cardFile = path.join(__dirname, `_${KEY}-card.txt`);
    if (!fs.existsSync(cardFile)) die(`${path.basename(cardFile)} missing — run _mk-${KEY}-card.js first`);
    const card = fs.readFileSync(cardFile, 'utf8');
    const at = s.indexOf(`id: "${PREV}"`);
    if (at === -1) die(`manipulatives.ts has no '${PREV}' card to anchor on`);
    /* the end of PREV's object: the first "<EOL>  },<EOL>" after its id.
       ⚠ THE EOL IS READ OFF THE FILE (see the point-2 note): a bare \n
       here finds nothing in a CRLF checkout and the step dies on a
       perfectly registerable tree. */
    const EOL = /\r\n/.test(s) ? String.fromCharCode(13, 10) : String.fromCharCode(10);
    const marker = EOL + '  },' + EOL;
    const end = s.indexOf(marker, at);
    if (end === -1) die('could not find the end of the anchor card');
    s = s.slice(0, end + marker.length) + card + s.slice(end + marker.length);
    wr(f, s);
    const after = rd(f);
    if (after.indexOf(`id: "${KEY}"`) === -1) die('hub card did not land');
    /* non-vacuity: the card must carry all eleven locales, not just an id */
    const seg = after.slice(after.indexOf(`id: "${KEY}"`), after.indexOf(`id: "${KEY}"`) + 6000);
    const missing = LOCALES.filter((l) => !new RegExp('(^|[\\s{])' + l + ':\\s').test(seg.slice(0, seg.indexOf('\n  },'))));
    if (missing.length) die('hub card missing locales: ' + missing.join(','));
    step('manipulatives.ts hub card (11 locales)', true);
  } else step('manipulatives.ts hub card (11 locales)', false);
}

/* ---- 5. eleven tool-content json ToolEntry ----------------------- */
{
  /* the field list is READ OFF THE INTERFACE, never remembered, and the
     script refuses to run if it parses implausibly few (#42: five of
     eight shipped, and two guards said fine) */
  const iface = rd('lib/seo/tool-content.ts');
  const block = iface.match(/interface ToolEntry\s*\{([\s\S]*?)\n\}/);
  const fields = block ? (block[1].match(/^\s*(\w+)\s*[?:]/gm) || []).map((x) => x.trim().replace(/[?:]$/, '').trim()) : [];
  if (fields.length < 6) die(`parsed only ${fields.length} ToolEntry fields — refusing`);
  let changed = 0;
  for (const loc of LOCALES) {
    const f = `messages/tool-content/${loc}.json`;
    const j = JSON.parse(rd(f));
    if (j[KEY]) continue;
    const e = L[loc];
    if (!e) die(`no landing data for ${loc}`);
    for (const fl of fields) if (!(fl in e)) die(`${loc} missing required field '${fl}'`);
    if (!/^[a-z0-9-]+$/.test(e.slug)) die(`${loc} slug is not url-safe: ${e.slug}`);
    const out = {};
    for (const k of Object.keys(j)) { if (k === 'labels') out[KEY] = e; out[k] = j[k]; }
    if (!out[KEY]) out[KEY] = e;
    wr(f, JSON.stringify(out, null, 2) + '\n');
    changed++;
  }
  /* verify after the fact, on disk, in every locale — including the ones
     an earlier run wrote */
  const bad = [];
  for (const loc of LOCALES) {
    const j = JSON.parse(rd(`messages/tool-content/${loc}.json`));
    const e = j[KEY];
    if (!e) { bad.push(loc + ':absent'); continue; }
    const miss = fields.filter((fl) => !(fl in e));
    if (miss.length) bad.push(loc + ':' + miss.join('+'));
  }
  if (bad.length) die('tool-content json incomplete — ' + bad.join(' '));
  step(`tool-content/*.json ToolEntry × ${LOCALES.length} (${fields.length}/${fields.length} required fields)`, changed > 0);
}

/* ---- 6. tool-categories.ts — silent if omitted -------------------
   ⚠ the union is PARSED OFF SOURCE and CATEGORY refused if it is not a
   member: #44 tried to file a shape tool under 'geometry', which is not
   a ToolCategory, and toolCategory()'s `?? 'number'` would have hidden
   it forever. ⚠ 'number' is ALSO the silent fallback, so for this tool
   the row's presence is asserted on disk, not inferred from behaviour. */
{
  const f = 'lib/tool-categories.ts';
  let s = rd(f);
  const um = s.match(/export type ToolCategory = ([^;]+);/);
  if (!um) die('could not parse the ToolCategory union');
  const union = [...um[1].matchAll(/'([a-z]+)'/g)].map((x) => x[1]);
  if (union.length < 2) die('ToolCategory union parsed implausibly small: ' + union.join('|'));
  if (union.indexOf(CATEGORY) === -1) die(`'${CATEGORY}' is not a ToolCategory (${union.join('|')})`);
  if (s.indexOf(`'${KEY}'`) === -1) {
    const find = `  '${PREV}': '${CATEGORY}',`;
    if (s.indexOf(find) === -1) die(`tool-categories has no "${PREV}: ${CATEGORY}" row to anchor on`);
    s = s.replace(find, `${find}\n  '${KEY}': '${CATEGORY}',`);
    wr(f, s);
    /* ⚠ the log reports what is ON DISK, re-read, not what was intended */
    const w = rd(f).match(new RegExp("'" + KEY + "':\\s*'([a-z]+)'"));
    if (!w) die('tool-categories edit did not land');
    if (w[1] !== CATEGORY) die(`tool-categories wrote '${w[1]}', expected '${CATEGORY}'`);
    step(`tool-categories '${w[1]}'`, true);
  } else {
    const w = rd(f).match(new RegExp("'" + KEY + "':\\s*'([a-z]+)'"));
    if (!w || w[1] !== CATEGORY) die(`tool-categories holds '${w ? w[1] : '?'}', expected '${CATEGORY}'`);
    step(`tool-categories '${w[1]}'`, false);
  }
}

/* ---- 7. thumbnail — silent if omitted ---------------------------- */
{
  /* ⚠ #44: this check pointed one directory too high and could never
     confirm. The path is the one generate-tool-previews.js writes. */
  const dir = path.join(R, 'public', 'mini-tools', 'tool-previews');
  const p = path.join(dir, KEY + '.webp');
  const alt = '/var/www/lcs-media/mini-tools/tool-previews/' + KEY + '.webp';
  if (!fs.existsSync(dir)) die('tool-previews directory not found at ' + dir);
  console.log(fs.existsSync(p)
    ? '  · hub thumbnail present locally (' + fs.statSync(p).size + ' bytes)'
    : `  ! hub thumbnail NOT generated yet — run generate-tool-previews.js --only=${KEY} (AFTER this script) and scp to ${alt} BEFORE deploy.sh`);
}

console.log(`\n${done} written, ${already} already in place.`);
