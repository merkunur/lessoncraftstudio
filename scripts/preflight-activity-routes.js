#!/usr/bin/env node
/* =====================================================================
   preflight-activity-routes.js — BUILD-FAILING route-resolution gate
   ---------------------------------------------------------------------
   Institutionalization (i), CLAUDE.md §21.5. E3 #1 deployed its iframe fine
   but 404'd EVERY locale because the engine's manifest was never added to
   `frontend/lib/activities.ts MANIFEST_FILES` (the hardcoded loader list).
   That was caught only at deploy and fixed in 54b9a4dc. This gate makes the
   class structurally impossible to ship — it runs BEFORE deploy and FAILS
   the build on the two ways an activity route 404s:

     (A) an engine manifest exists in `mini tools/` but is NOT registered in
         MANIFEST_FILES → ALL its routes 404 (the 54b9a4dc class). ALWAYS on.
     (B) a row's declared slug is empty / non-url-safe / DUPLICATED across the
         merged manifest set (resolveActivitySlug scans all rows and returns
         the FIRST match, so a dup silently 404s the loser). ALWAYS on.

   It deliberately does NOT require all 11 locales per row — many activities
   are locale-scoped BY DESIGN (E7 CVC = EN-only; E8/E9 = facade locales;
   §20.2). Intent isn't in the data, so absent locales are not failures.

   To assert a SPECIFIC activity resolves for all 11 (e.g. a culture-neutral
   geometry coordinate under test), pass:
     --all-locales=<id1,id2,…>
   Those rows MUST carry a unique non-empty slug for every one of the 11.

   Exit 0 = clean; exit 1 = a 404-class defect that would otherwise surface
   only at deploy.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const ACTIVITIES_TS = path.join(REPO, 'frontend', 'lib', 'activities.ts');
/* canonical 11 (CLAUDE.md §6 / lcs-shell LOCALES). */
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const arg = (k, d) => { const m = process.argv.find((a) => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const ALL_LOCALES_IDS = new Set(arg('all-locales', '').split(',').map((s) => s.trim()).filter(Boolean));

const failures = [];
const check = (cond, msg) => { if (!cond) failures.push(msg); };

/* ---- parse the hardcoded MANIFEST_FILES list from activities.ts ---- */
const tsSrc = fs.readFileSync(ACTIVITIES_TS, 'utf8');
const block = tsSrc.match(/MANIFEST_FILES\s*=\s*\[([\s\S]*?)\]/);
if (!block) { console.error('FAIL: could not find MANIFEST_FILES in frontend/lib/activities.ts'); process.exit(1); }
const REGISTERED = new Set(
  Array.from(block[1].matchAll(/['"]([^'"]+-activities\.json)['"]/g)).map((m) => m[1])
);

/* ---- (A) every *-activities.json on disk MUST be registered ---- */
const onDisk = fs.readdirSync(MINI).filter((f) => /-activities\.json$/.test(f));
check(onDisk.length > 0, 'no *-activities.json found in mini tools/');
for (const f of onDisk) {
  check(REGISTERED.has(f),
    `engine manifest "${f}" exists in mini tools/ but is NOT in MANIFEST_FILES (frontend/lib/activities.ts) → its routes 404 for every locale (the 54b9a4dc class)`);
}

/* ---- (B) declared-slug validity + global per-locale uniqueness; plus the
   opt-in all-11 assertion for --all-locales rows ---- */
let rowCount = 0;
const declaredCount = {};   // slug declarations seen
const seenByLocale = {};    // locale -> Map(slug -> owning id) for dup detection
LOCALES.forEach((l) => { seenByLocale[l] = new Map(); });

for (const f of onDisk) {
  if (!REGISTERED.has(f)) continue;   // already failed in (A)
  let rows;
  try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); }
  catch (e) { check(false, `${f}: invalid JSON — ${e.message}`); continue; }
  if (!Array.isArray(rows)) { check(false, `${f}: not a JSON array`); continue; }

  rows.forEach((row) => {
    rowCount++;
    const id = row.id || '(no id)';
    check(!!row.tool, `${f} ${id}: missing "tool"`);
    check(row.slug && typeof row.slug === 'object', `${f} ${id}: missing "slug" map`);
    if (!row.slug) return;

    LOCALES.forEach((loc) => {
      const slug = row.slug[loc];
      const present = typeof slug === 'string' && slug.trim().length > 0;
      if (present) {
        declaredCount[loc] = (declaredCount[loc] || 0) + 1;
        check(/^[a-z0-9-]+$/.test(slug), `${f} ${id} [${loc}]: slug "${slug}" has non-url chars (expect [a-z0-9-])`);
        const owner = seenByLocale[loc].get(slug);
        check(!owner, `duplicate slug "${slug}" in locale "${loc}" (${owner} vs ${id}) → resolveActivitySlug is ambiguous; the second 404s`);
        seenByLocale[loc].set(slug, id);
      } else if (ALL_LOCALES_IDS.has(id)) {
        // opt-in: this row is asserted to ship for ALL 11 locales
        check(false, `${f} ${id}: --all-locales asserts 11/11 but no slug for locale "${loc}" → /${loc}/activities 404`);
      }
    });
  });
}

/* ---- (C) ⚠⚠ EVERY ACTIVITY MUST HAVE ITS CARD THUMBNAIL. ----------------
   This has now enraged the operator TWICE — activity cards in June 2026, and
   tool #38's card in July — both times because a generated preview webp was
   never rendered and the card silently fell back to `ActivityGlyph`. A memory
   note did not stop the second one. The operator asked for measures that are
   UNIGNORABLE, so this is a build failure, not a checklist line.

   `frontend/app/[locale]/activities/page.tsx: loadPreviewIds()` gates purely
   on file existence, so a missing webp NEVER errors — it just ships a worse
   card. That silence is the whole defect.

   ⚠ SELF-DISABLING, because the webps are gitignored (§A.3) and are scp'd to
   /var/www/lcs-media/mini-tools/previews/ rather than committed: the check
   activates only where previews already exist (≥1 on disk), then requires one
   for every EN-visible row. No-op on a clean checkout; bites everywhere real.
   Render with: node scripts/generate-activity-previews.js --only=<id>        */
const PREVIEW_DIR = path.join(REPO, 'frontend', 'public', 'mini-tools', 'previews');
let havePreview = new Set();
if (fs.existsSync(PREVIEW_DIR)) {
  for (const f of fs.readdirSync(PREVIEW_DIR)) if (f.endsWith('.webp')) havePreview.add(f.slice(0, -5));
}
if (havePreview.size > 0) {
  const missing = [];
  for (const f of onDisk) {
    if (!REGISTERED.has(f)) continue;
    let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(rows)) continue;
    rows.forEach((row) => {
      /* the hub lists a row only where it has an EN slug, so only those get a card */
      if (!row.id || !row.slug || !row.slug.en) return;
      if (!havePreview.has(row.id)) missing.push(row.id);
    });
  }
  check(missing.length === 0,
    `${missing.length} activity card(s) would ship with NO THUMBNAIL and fall back to a generic glyph: ` +
    missing.slice(0, 12).join(', ') + (missing.length > 12 ? `, +${missing.length - 12} more` : '') +
    ` → render with: node scripts/generate-activity-previews.js --only=<id>, then scp into /var/www/lcs-media/mini-tools/previews/`);
} else {
  console.log('note: no activity previews on disk — the thumbnail check is a no-op here (they are gitignored).');
}

if (failures.length) {
  console.error(`PREFLIGHT FAILED — ${failures.length} route-resolution defect(s):`);
  failures.forEach((m) => console.error('  • ' + m));
  process.exit(1);
}
const allTag = ALL_LOCALES_IDS.size ? ` (11/11 asserted for: ${Array.from(ALL_LOCALES_IDS).join(', ')})` : '';
console.log(`PREFLIGHT PASS — ${onDisk.length} engine manifest(s) all registered; ${rowCount} coordinate(s) with valid, unique declared slugs${allTag}.`);
process.exit(0);
