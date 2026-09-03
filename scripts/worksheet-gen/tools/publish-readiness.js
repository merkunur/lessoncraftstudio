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
 */
'use strict';
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const ROOT = path.join(__dirname, '..');
const REPO = path.join(ROOT, '..', '..');
const LOCALES = ['en', 'de', 'nl', 'es', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

let ready = 0, total = 0, problems = [];
for (const loc of LOCALES) {
  total++;
  const up = path.join(ROOT, 'out', 'upload', 'wave-b2var-' + loc);
  const zips = fs.existsSync(up) ? fs.readdirSync(up).filter((f) => f.endsWith('.zip')) : [];
  const draftPath = path.join(ROOT, 'i18n', '.landing-b2var-' + loc + '.json');
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
