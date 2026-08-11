/* =====================================================================
   register-the-queue.js — the seven registration points for #57.
   Run:  node scripts/register-the-queue.js
   IDEMPOTENT: a second run must report every point as already done.

   Cloned from register-shape-stretcher.js (#57), itself the #56 clone.
   ⚠⚠ THE #56 CRLF TRAP IS LIVE ON THIS CHECKOUT, NOT HYPOTHETICAL. Measured
   before a byte was written: `mini tools/the-queue.js` is **LF**, while
   `config/live-tool-slugs.ts`, `lib/seo/tool-content.ts`,
   `lib/manipulatives.ts`, `lib/tool-categories.ts` and the tool wrapper are
   all **CRLF**. That is exactly the tree state that, on #56's third run,
   sent three multi-line needles blind and made the script RE-APPLY them —
   shipping duplicate object keys that `tsc` ran straight past. Every
   `eolOf` / `norm` call below is load-bearing on the FIRST run here. Do not
   "simplify" any of it away.
   It encodes the traps this class of script keeps walking into:

   ⚠ POINT 1 IS THE 410 TRAP. `/tools/*` is a seller-era teardown and
   `LIVE_TOOL_SLUGS` is the carve-out — omit the key and ALL ELEVEN
   LOCALES RETURN 410 GONE.
   ⚠ POINT 2 IS FOUR SEPARATE ANCHORS, never one clever regex: on #54 a
   single pattern silently performed 2 of the 4 and reported success.
   All four are re-read from disk and verified individually.
   ⚠⚠ AND THE "ALREADY DONE?" TEST RUNS ON AN EOL-NORMALISED COPY. On
   #56's third run a `git stash pop` restored tool-content.ts through
   core.autocrlf as CRLF, three multi-line needles built with a bare \n
   went blind, and the script RE-APPLIED them — shipping duplicate object
   keys that `tsc` had already run past. Read the EOL off the artefact;
   never decide what it ought to be. Every block below that writes
   multi-line text takes its newline from the file it is writing into.
   ⚠ POINT 3 IS THE ONE NON-IDEMPOTENT STEP, so it is guarded on
   REGISTRATION STATE (is the key in live-tool-slugs yet?) rather than on
   the version number, and the log prints the value ACTUALLY WRITTEN
   (#40's register script logged a category it did not write).
   ⚠ POINTS 6 AND 7 DEGRADE SILENTLY: a missing category renders the tool
   in the wrong hub section forever, and a missing preview shows a
   generic glyph. Tool #38 shipped without both.
   ⚠ POINT 6 PARSES THE ToolCategory UNION OFF SOURCE and refuses a value
   outside it — the #44 lesson ('geometry' is NOT a ToolCategory, and
   every shape-and-space tool sits in 'measurement'). ⚠ 'number' is also
   the silent fallback of toolCategory(), so this row's presence is
   asserted ON DISK, never inferred from behaviour.
   ⚠ EIGHT REQUIRED ToolEntry FIELDS, READ OFF THE INTERFACE rather than
   remembered — #42 shipped five and failed the static export of all
   eleven landing pages AFTER two guards reported success. The field list
   is refused if it parses implausibly few.

   ⭐ THREE CHECKS ADDED HERE, each non-vacuous by construction:
     · the `name` of the en record must equal the TOOL'S OWN
       strings.title.en, read out of `mini tools/the-queue.js` —
       the operator's instruction was to take the title from the tool and
       invent nothing, and this is that instruction made falsifiable.
     · every new slug is checked against the WHOLE shipped slug set
       (tool + maker, all eleven locales), and the check refuses to run
       if that set parses implausibly small — a collision test over an
       empty set passes perfectly and means nothing.
     · the paid-plan name in each locale's prose must be that locale's
       SHIPPED `planTag`, read out of `frontend/messages/<loc>.json`, and
       the literal "Premium" must appear nowhere in the copy. 28 tools
       and 655 occurrences already name a plan that does not exist; this
       one does not join them. ⚠ The ban is scoped to THIS TOOL'S OWN
       PROSE — never to a rendered page, whose body carries every sibling
       tool's strings in the RSC flight data (#40's ban-too-wide defect).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const R = path.join(__dirname, '..', 'frontend');
const KEY = 'the-queue';
const PREV = 'shape-stretcher';
/* ⚠⚠ 'number' IS ALSO `toolCategory()`'s SILENT FALLBACK, so this row's
   presence is asserted ON DISK at point 6, never inferred from behaviour —
   a tool with no row renders in "Numbers & Counting" and looks correct.
   That is how #38 sat in the wrong hub section. The union is parsed off
   source and this value refused if it is not a member (#44 tried to file a
   shape tool under 'geometry', which is not a ToolCategory at all).
   ⚠ PREV's own row is 'measurement', so the anchor below must NOT assume
   the two match — it anchors on PREV's row whatever that row says. */
const CATEGORY = 'number';
const VER_FROM = '7.92', VER_TO = '7.93';
const L = require(`./_${KEY}-landing.js`);
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let done = 0, already = 0;
function step(n, changed) { if (changed) { console.log(`  ✓ ${n}`); done++; } else { console.log(`  · ${n} (already)`); already++; } }
function rd(f) { return fs.readFileSync(path.join(R, f), 'utf8'); }
function wr(f, s) { fs.writeFileSync(path.join(R, f), s); }
function die(m) { console.error('  ✗ ' + m); process.exit(1); }
const LF = String.fromCharCode(10), CRLF = String.fromCharCode(13, 10);
const eolOf = (s) => (/\r\n/.test(s) ? CRLF : LF);
const norm = (x) => x.split(CRLF).join(LF);

/* ---- 0. PRE-FLIGHT, before a single byte is written --------------- */
{
  /* 0a. the tool exists at all */
  for (const ext of ['js', 'html']) {
    const p = path.join(__dirname, '..', 'mini tools', `${KEY}.${ext}`);
    if (!fs.existsSync(p)) die(`mini tools/${KEY}.${ext} does not exist — nothing to register`);
  }

  /* 0b. ⭐ the en name is the TOOL'S OWN title, not an invented one.
     Parsed out of the source rather than remembered. */
  /* ⚠ READ THE OBJECT, NOT THE TEXT. This was a regex keyed on a
     single-quoted `title: { en: '...' }`, and the eleven-locale fold
     rewrote every entry double-quoted with ten more locales on the line —
     so the check died on a tool whose title had not changed at all. A
     parser that carries its own copy of the file's FORMATTING is the
     same defect as one that carries its own copy of the field list. The
     module is what the shell will actually read. */
  const src = fs.readFileSync(path.join(__dirname, '..', 'mini tools', `${KEY}.js`), 'utf8');
  const toolMod = require(path.join(__dirname, '..', 'mini tools', `${KEY}.js`));
  const enTitle = toolMod && toolMod.strings && toolMod.strings.title && toolMod.strings.title.en;
  if (typeof enTitle !== 'string' || !enTitle.trim()) die(`could not read strings.title.en out of mini tools/${KEY}.js`);
  if (L.en.name !== enTitle) die(`en name '${L.en.name}' is not the tool's own title '${enTitle}'`);
  console.log(`  · pre-flight: en name is the tool's own strings.title ("${enTitle}")`);

  /* 0b2. ⭐⭐ AND THE OTHER TEN COME FROM THE PANELS, NOT FROM ME. This
     check exists because the first version of the landing file INVENTED
     all ten — "Der Formendehner", Scheibe/Marken — on the reasoning that
     the tool source ships EN-only strings so the panel pass had not run.
     Eight panel files were already on disk, unfolded into the tool, and
     the German panel had named it DER FORMENZIEHER with Platte/Etiketten.
     Reading one artefact and inferring the state of another is the whole
     defect, so the agreement is now MEASURED against every panel file
     that exists, per locale, with exact string equality.
     ⚠ It caught a second, quieter divergence on its first run: fr's name
     matched to the eye but not to the byte — the panel writes
     `L’Étire-forme` with U+2019 and the landing carried an ASCII
     apostrophe. A human comparison would have passed it.
     ⚠ A locale with NO panel file is REPORTED, never silently skipped —
     a placeholder that nobody is told about is how a placeholder ships. */
  const panelDir = __dirname;
  const withPanel = [], withoutPanel = [];
  for (const loc of LOCALES) {
    if (loc === 'en') continue;
    const pf = path.join(panelDir, `_${KEY}-locale-${loc}.js`);
    if (!fs.existsSync(pf)) { withoutPanel.push(loc); continue; }
    const panel = require(pf);
    if (!panel || typeof panel.title !== 'string' || !panel.title) die(`${loc} panel file has no usable title`);
    if (L[loc].name !== panel.title) {
      die(`${loc} name ${JSON.stringify(L[loc].name)} != panel title ${JSON.stringify(panel.title)}`);
    }
    withPanel.push(loc);
  }
  if (withPanel.length === 0) die('no panel files parsed at all — refusing to certify name agreement');
  console.log(`  · pre-flight: ${withPanel.length}/10 names match their panel file byte-for-byte (${withPanel.join(',')})`);
  if (withoutPanel.length) {
    console.log(`  ! pre-flight: ${withoutPanel.join(',')} have NO panel file yet — those landing records are PLACEHOLDERS and must be rewritten when the panels land`);
  }

  /* 0c. ⭐⭐ SLUG COLLISION, MEASURED PER LOCALE — AND THE SCOPE IS THE FIX,
     NOT A LOOSENED THRESHOLD.

     The inherited version built ONE global set across all eleven locales and
     also refused any slug this tool repeated across locales. Both are wider
     than the thing that can actually break, and #58 is where that surfaced:
     the Swedish and Norwegian panels INDEPENDENTLY arrived at `perrong`,
     because it is the word in both languages.

     Measured before changing anything (the "verify the measurement before the
     defect" rule):
       · `resolveToolSlug` (lib/seo/tool-content.ts:358) calls `loadLocale(locale)`
         and scans ONLY that locale's file. A slug shared across locales is
         therefore unreachable as an ambiguity — /sv/tools/perrongen and
         /no/tools/perrongen resolve in different files.
       · The shelf ALREADY ships 13 cross-locale shared slugs, and every one is
         the SAME TOOL in sibling locales: `tallinje` (sv+da+no number-line),
         `linjal` (sv+no ruler), `magnetbokstaver` (sv+no letter-tiles),
         `tom-tallinje` (sv+no open-number-line), `diktat` (de+da+no), and more.
         The inherited check would condemn every one of them.
     So the real invariant is: WITHIN ONE LOCALE FILE, no two tools share a
     slug. That is what is asserted here, and it is strictly stronger where it
     matters — the global set could not see a same-locale clash against a
     maker slug of a different tool any better than this does, and this does
     not condemn two languages for agreeing.
     ⚠ The non-vacuity control is KEPT and widened: the per-locale sets must
     between them parse ≥500 slugs, or a collision test over an empty set
     passes perfectly and means nothing. */
  const perLocale = {};        /* locale -> Map(slug -> owning tool key) */
  let totalSlugs = 0;
  for (const d of ['messages/tool-content', 'messages/maker-content']) {
    const abs = path.join(R, d);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter((x) => x.endsWith('.json'))) {
      const loc = f.replace(/\.json$/, '');
      const j = JSON.parse(rd(`${d}/${f}`));
      perLocale[loc] = perLocale[loc] || new Map();
      for (const k of Object.keys(j)) {
        const e = j[k];
        if (e && typeof e === 'object' && typeof e.slug === 'string' && e.slug) {
          perLocale[loc].set(e.slug, k);
          totalSlugs++;
        }
      }
    }
  }
  if (totalSlugs < 500) die(`shipped slug set parsed implausibly small (${totalSlugs}) — refusing to certify no collision`);
  const clash = [];
  for (const loc of LOCALES) {
    const e = L[loc];
    if (!e) die(`no landing data for ${loc}`);
    if (!/^[a-z0-9-]+$/.test(e.slug)) die(`${loc} slug is not url-safe: ${e.slug}`);
    /* ⚠ a slug already OURS from an earlier run is not a collision — but the
       test is EQUALITY with what we previously wrote, not merely "something is
       there": a run that CHANGED the slug would otherwise be waved through
       against a stale entry. */
    const owner = (perLocale[loc] || new Map()).get(e.slug);
    if (owner && owner !== KEY) clash.push(`${loc}:${e.slug} is already ${owner}'s slug in that locale`);
  }
  if (clash.length) die('slug collision — ' + clash.join(' '));
  const shared = LOCALES.filter((l) => LOCALES.some((o) => o !== l && L[o] && L[o].slug === L[l].slug));
  console.log(`  · pre-flight: 11 slugs url-safe, none taken by another tool in its own locale (${totalSlugs} shipped slugs scanned)`);
  if (shared.length) {
    console.log(`  · pre-flight: ${shared.join('+')} share a slug — precedented (tallinje/linjal/magnetbokstaver are sv+no today) and unreachable as an ambiguity, since resolveToolSlug is per-locale`);
  }

  /* 0d. ⭐ the paid plan is named as SHIPPED, per locale, and "Premium"
     appears nowhere. Case-insensitive, because "L'abonnement Enseignant"
     is the sentence form of the tag "Abonnement Enseignant". */
  const prose = (e) => [e.name, e.tagline, e.metaTitle, e.metaDescription]
    .concat(e.about, e.howToUse, e.classroomIdeas).join(' ');
  const cardText = fs.readFileSync(path.join(__dirname, `_${KEY}-card.txt`), 'utf8');
  if (/Premium/.test(cardText)) die('the hub card names "Premium" — use each locale\'s shipped planTag');
  for (const loc of LOCALES) {
    const body = prose(L[loc]);
    if (/Premium/.test(body)) die(`${loc} copy names "Premium" — use the shipped planTag`);
    const msgs = JSON.parse(rd(`messages/${loc}.json`));
    let tag = null;
    (function walk(o) { for (const k of Object.keys(o || {})) { const v = o[k]; if (k === 'planTag' && typeof v === 'string') { tag = tag || v; } else if (v && typeof v === 'object') walk(v); } })(msgs);
    if (!tag) die(`no planTag found in messages/${loc}.json — cannot verify the plan name`);
    if (body.toLowerCase().indexOf(tag.toLowerCase()) === -1) die(`${loc} copy does not name the shipped plan '${tag}'`);
  }
  console.log('  · pre-flight: 11/11 name the shipped planTag, 0 say "Premium"');
}

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
   and breaks the template it sits in. And the newline is READ OFF THE
   FILE (see the header note on the duplicate-key incident). */
{
  const f = 'lib/seo/tool-content.ts';
  let s = rd(f);
  const NL = eolOf(s);
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
    if (norm(s).indexOf(norm(repl)) !== -1) continue;   /* ⚠ EOL-normalised */
    if (s.indexOf(find) === -1) die('tool-content anchor missing: ' + find.slice(0, 46));
    s = s.replace(find, repl); did++;
  }
  if (did) wr(f, s);
  const after = rd(f);
  /* ⚠⚠ EACH OF THE FOUR SURFACES IS ASSERTED TO OCCUR EXACTLY ONCE, and
     that is BOTH halves of the check: absent = the edit did not land,
     twice = the #56 duplicate-key shape a CRLF checkout produces.
     ⚠ A BARE OCCURRENCE COUNT CANNOT DO THIS AND MUST NOT BE TRIED. The
     first version of this guard asserted `count === 4` and FAILED A
     CORRECT FILE, because TOOL_ACTIVITY_PREFIX's row is
     `'key': 'key',` — two occurrences of the quoted key on one line, so
     the true total is FIVE. Measured against `the-gap`, which is also 5
     and is known-good: the threshold was invented, the control refuted
     it. Count what each surface contains, never the file. */
  const occurrences = (needle) => after.split(needle).length - 1;
  const surfaces = [
    ['TOOL_KEYS', "'" + KEY + "'] as const"],
    ['TOOL_MINI_URL', "  '" + KEY + "': '/mini-tools/" + KEY + ".html',"],
    ['TOOL_ACTIVITY_PREFIX', "  '" + KEY + "': '" + KEY + "',"],
    ['ToolContentFile member', "  '" + KEY + "'?: ToolEntry;"]
  ];
  for (const [label, needle] of surfaces) {
    const n = occurrences(needle);
    if (n === 0) die(`tool-content ${label} did not land`);
    if (n > 1) die(`tool-content ${label} occurs ${n}× — duplicate keys, the #56 CRLF defect`);
  }
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
     locales because of exactly that. */
  const f = 'lib/manipulatives.ts';
  let s = rd(f);
  if (s.indexOf(`id: "${KEY}"`) === -1) {
    const cardFile = path.join(__dirname, `_${KEY}-card.txt`);
    if (!fs.existsSync(cardFile)) die(`${path.basename(cardFile)} missing`);
    const EOL = eolOf(s);
    /* ⚠ the card is re-lined to the TARGET FILE'S EOL before insertion,
       so a CRLF checkout does not end up with a mixed-ending card. */
    const card = norm(fs.readFileSync(cardFile, 'utf8')).split(LF).join(EOL);
    const at = s.indexOf(`id: "${PREV}"`);
    if (at === -1) die(`manipulatives.ts has no '${PREV}' card to anchor on`);
    /* the end of PREV's object: the first "<EOL>  },<EOL>" after its id.
       ⚠ THE EOL IS READ OFF THE FILE: a bare \n here finds nothing in a
       CRLF checkout and the step dies on a perfectly registerable tree. */
    const marker = EOL + '  },' + EOL;
    const end = s.indexOf(marker, at);
    if (end === -1) die('could not find the end of the anchor card');
    s = s.slice(0, end + marker.length) + card + s.slice(end + marker.length);
    wr(f, s);
    const after = rd(f);
    if (after.indexOf(`id: "${KEY}"`) === -1) die('hub card did not land');
    /* non-vacuity: the card must carry all eleven locales in all three
       blocks, not just an id */
    const start = after.indexOf(`id: "${KEY}"`);
    /* ⚠ indices are taken on the NORMALISED string and the slice is taken
       on the same string — mixing a normalised index into a CRLF slice
       cuts the body short by one byte per line. */
    const nseg = norm(after.slice(start, start + 24000));
    const cut = nseg.indexOf(LF + '  },');
    if (cut === -1) die('could not find the end of the inserted card');
    const body = nseg.slice(0, cut);
    /* line-anchored at the card's own six-space indent, so a locale
       cannot be credited by the letters appearing inside prose */
    const missing = LOCALES.filter((l) => (body.match(new RegExp('^ {6}' + l + ': ', 'gm')) || []).length < 3);
    if (missing.length) die('hub card locales missing from title/tagline/description: ' + missing.join(','));
    step('manipulatives.ts hub card (11 locales × title+tagline+description)', true);
  } else step('manipulatives.ts hub card (11 locales × title+tagline+description)', false);
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
   it forever. */
{
  const f = 'lib/tool-categories.ts';
  let s = rd(f);
  const um = s.match(/export type ToolCategory = ([^;]+);/);
  if (!um) die('could not parse the ToolCategory union');
  const union = [...um[1].matchAll(/'([a-z]+)'/g)].map((x) => x[1]);
  if (union.length < 2) die('ToolCategory union parsed implausibly small: ' + union.join('|'));
  if (union.indexOf(CATEGORY) === -1) die(`'${CATEGORY}' is not a ToolCategory (${union.join('|')})`);
  if (s.indexOf(`'${KEY}'`) === -1) {
    /* ⚠ PREV's row carries a DIFFERENT category ('number'), so the anchor
       must not assume they match — anchor on PREV's row whatever it says. */
    const am = s.match(new RegExp("^[ \\t]*'" + PREV + "':\\s*'[a-z]+',", 'm'));
    if (!am) die(`tool-categories has no '${PREV}' row to anchor on`);
    const EOL = eolOf(s);
    s = s.replace(am[0], am[0] + EOL + `  '${KEY}': '${CATEGORY}',`);
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
