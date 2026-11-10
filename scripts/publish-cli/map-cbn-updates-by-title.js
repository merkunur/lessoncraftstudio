// Run on the server (env from /opt/lessoncraftstudio/.deploy-env):
//   node scripts/publish-cli/map-cbn-updates-by-title.js <staging-folder> <out.json>
// Output = the --updates-manifest for publish-wave.js. Used 2026-11-10 for the 2,200-deck CBN republish. Maps every Color by Number ZIP in the folder to the
// PUBLISHED deck with the same language and title (the live slugs keep their first copy numbers, so slugs cannot be
// predicted from the wave). Refuses on any ZIP with no match, more than one match, or a live deck matched twice.
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const AdmZip = require('/opt/lessoncraftstudio/node_modules/adm-zip');
const [dir, out] = process.argv.slice(2);
const sql = "select language, title->>language, slug from decks where status='published' and exercise_type='color-by-number'";
const rows = execFileSync('psql', ['-h', 'localhost', '-U', 'lcs_user', '-d', 'lessoncraftstudio_prod', '-At', '-F', '\t', '-c', sql], { encoding: 'utf8', env: { ...process.env, PGPASSWORD: process.env.LCS_DB_PASSWORD } })
  .split('\n').filter(Boolean).map((l) => l.split('\t'));
const byKey = new Map();
for (const [lang, title, slug] of rows) { const k = lang + '\t' + title; byKey.set(k, (byKey.get(k) || []).concat(slug)); }
const map = {}, bad = [], used = new Map();
const zips = fs.readdirSync(dir).filter((f) => f.endsWith('.zip')).sort();
for (const f of zips) {
  const m = JSON.parse(new AdmZip(path.join(dir, f)).readAsText('manifest.json'));
  const lang = m.language, title = m.title && m.title[lang];
  const hit = byKey.get(lang + '\t' + title) || [];
  if (hit.length !== 1) { bad.push(`${f}: ${hit.length} published decks titled "${title}" (${lang})`); continue; }
  if (used.has(lang + '\t' + hit[0])) { bad.push(`${f}: ${lang}/${hit[0]} already taken by ${used.get(lang + '\t' + hit[0])}`); continue; }
  used.set(lang + '\t' + hit[0], f);
  map[f] = hit[0];
}
const perLang = {};
for (const f of Object.keys(map)) { const l = f.match(/-(\w\w)-v\d+/)[1]; perLang[l] = (perLang[l] || 0) + 1; }
console.log(`published color-by-number rows: ${rows.length}; ZIPs: ${zips.length}; mapped: ${Object.keys(map).length}`);
console.log('per language: ' + JSON.stringify(perLang));
for (const b of bad) console.log('FAIL ' + b);
if (bad.length || !zips.length) process.exit(1);
fs.writeFileSync(out, JSON.stringify(map, null, 1));
console.log('wrote ' + out);
