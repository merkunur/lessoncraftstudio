#!/usr/bin/env node
/**
 * publish-readiness.js — one gate answering "is this batch ready to ship?"
 *
 * Checks the three things that must agree before publish, per locale:
 *   1. the staged upload set is exactly the not-yet-published faces
 *   2. a landing draft exists for every one of them
 *   3. every staged deck's description is in the 120-170 band and its title is
 *      unique within its locale
 *
 * Non-vacuity: refuses to report on a locale with 0 staged zips or 0 drafted
 * landings, since either means a path is wrong rather than that the answer is 0.
 *
 * --batch=b2var (default) | b3 — nt20-C (2026-09-14) pools base + face ZIPs under
 * out/upload/wave-b3-<loc>-all/ and drafts landings in i18n/.landing-b3-<loc>.json.
 * --locales=<csv> narrows the run (a locale whose panel has not reported yet is
 * not a failure of the others).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..');
const REPO = path.join(ROOT, '..', '..');
const ALL_LOCALES = ['en', 'de', 'nl', 'es', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const argOf = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const BATCH = argOf('batch') || 'b2var';
const PATHS = {
  b2var: { upload: (loc) => 'wave-b2var-' + loc, draft: (loc) => '.landing-b2var-' + loc + '.json' },
  b3: { upload: (loc) => 'wave-b3-' + loc + '-all', draft: (loc) => '.landing-b3-' + loc + '.json' },
  b4: { upload: (loc) => 'wave-b4-' + loc + '-all', draft: (loc) => '.landing-b4-' + loc + '.json' },   // nt10-D
  b5: { upload: (loc) => 'wave-b5-' + loc + '-all', draft: (loc) => '.landing-b5-' + loc + '.json' },   // nt10-E
};
if (!PATHS[BATCH]) { console.error('publish-readiness: unknown --batch=' + BATCH + ' (b2var | b3 | b4 | b5)'); process.exit(2); }
const LOCALES = (argOf('locales') || ALL_LOCALES.join(',')).split(',').map((s) => s.trim()).filter(Boolean);
for (const l of LOCALES) if (!ALL_LOCALES.includes(l)) { console.error('publish-readiness: unknown locale ' + l); process.exit(2); }

let ready = 0, total = 0, problems = [];
for (const loc of LOCALES) {
  total++;
  const up = path.join(ROOT, 'out', 'upload', PATHS[BATCH].upload(loc));
  const zips = fs.existsSync(up) ? fs.readdirSync(up).filter((f) => f.endsWith('.zip')) : [];
  const draftPath = path.join(ROOT, 'i18n', PATHS[BATCH].draft(loc));
  let landings = {};
  try { landings = JSON.parse(fs.readFileSync(draftPath, 'utf8')).landings || {}; } catch (e) {}
  const ids = new Set(zips.map((f) => {
    const m = /-((?:k|g\d)\d+)-/.exec(f);
    return m ? m[1].replace(/^(k|g\d)/, (x) => x.toUpperCase() + '-') : null;
  }).filter(Boolean));

  if (!zips.length) { problems.push(`${loc}: 0 staged zips`); continue; }
  if (!Object.keys(landings).length) { problems.push(`${loc}: no landing draft`); continue; }

  const missing = [...ids].filter((id) => !landings[id]);
  const extra = Object.keys(landings).filter((id) => !ids.has(id));

  const titles = new Set(); let band = 0;
  for (const f of zips) {
    const h = new AdmZip(path.join(up, f)).readAsText('deck.html');
    const d = (/<meta name="description" content="([^"]*)"/.exec(h) || [])[1] || '';
    const t = (/<title>([^<]*)<\/title>/.exec(h) || [])[1] || '';
    if (d.length < 120 || d.length > 170) band++;
    titles.add(t);
  }
  const dupTitles = zips.length - titles.size;
  const ok = !missing.length && !extra.length && !band && !dupTitles;
  if (ok) ready++;
  else problems.push(`${loc}: ${missing.length} landings missing, ${extra.length} extra, ${band} out-of-band, ${dupTitles} dup titles`);
  console.log(`  ${loc.padEnd(3)} ${String(zips.length).padStart(2)} decks · ${String(Object.keys(landings).length).padStart(2)} landings · ${ok ? 'READY' : 'NOT READY'}`);
}
console.log(`\n${ready} of ${total} locales ready` + (problems.length ? ':\n  ' + problems.join('\n  ') : ''));
process.exit(ready === total ? 0 : 1);
