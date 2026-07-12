#!/usr/bin/env node
/* =====================================================================
   apply-longtail-fr-content.js — apply the 500-longtail keyword map to
   French ACTIVITY pages and MAKER/TOOL pages (sibling of the de script;
   companion to scripts/seo-landing/apply-longtail-fr.js).

   Reads docs/SEO/longtail-map-fr.json:
   target "activity": `mini tools/<engine>-activities.json` row —
     page_title.fr ← row.title · page_intro.fr ← row.metaDescription;
     activity-content/fr.json prose[id].about[0] keyword weave.
   target "maker"|"tool": maker-content/fr.json / tool-content/fr.json —
     metaTitle, metaDescription, about[0] weave.
   Data-only, --dry-run, .bak backups. No "Common Core"/CCSS may enter
   fr prose (verify-activity-content-fr.js enforces).
   Usage: node scripts/apply-longtail-fr-content.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MAP = path.join(REPO, 'docs', 'SEO', 'longtail-map-fr.json');
const MINI = path.join(REPO, 'mini tools');
const ACT_CONTENT = path.join(REPO, 'frontend', 'messages', 'activity-content', 'fr.json');
const MAKER = path.join(REPO, 'frontend', 'messages', 'maker-content', 'fr.json');
const TOOL = path.join(REPO, 'frontend', 'messages', 'tool-content', 'fr.json');
const DRY = process.argv.includes('--dry-run');

const STOP = new Set(['fiche', 'fiches', 'exercice', 'exercices', 'imprimer', 'gratuit', 'maternelle',
  'grande', 'section', 'pour', 'avec', 'les', 'des', 'pdf', 'ligne', 'enfant', 'enfants', 'jeux']);
const words = b => b.toLowerCase().split(/[\s']+/).filter(w => w.length >= 4 && !STOP.has(w));
const firstSentence = s => { const m = s.match(/^[^.!?]{15,}?[.!?]/); return m ? m[0].trim() : s.trim(); };

const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
const actRows = map.rows.filter(r => r.target === 'activity');
const makerRows = map.rows.filter(r => r.target === 'maker');
const toolRows = map.rows.filter(r => r.target === 'tool');

const manifests = fs.readdirSync(MINI).filter(f => /-activities\.json$/.test(f));
const fileCache = {}, idToFile = {};
for (const f of manifests) {
  try {
    const rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8'));
    fileCache[f] = rows;
    for (const r of rows) idToFile[r.id] = f;
  } catch (e) { /* skip */ }
}
let actPatched = 0;
const touchedFiles = new Set();
for (const row of actRows) {
  const f = idToFile[row.id];
  if (!f) { console.log('  MISSING activity ' + row.id); continue; }
  const r = fileCache[f].find(x => x.id === row.id);
  r.page_title = r.page_title || {}; r.page_intro = r.page_intro || {};
  r.page_title.fr = row.title;
  r.page_intro.fr = row.metaDescription;
  touchedFiles.add(f); actPatched++;
}

const actContent = JSON.parse(fs.readFileSync(ACT_CONTENT, 'utf8'));
let woven = 0;
for (const row of actRows) {
  const p = actContent.prose && actContent.prose[row.id];
  if (!p || !Array.isArray(p.about) || !p.about.length) continue;
  const hay = (row.title + ' ' + p.about[0]).toLowerCase();
  const ws = words(row.base);
  if (ws.length && !ws.some(w => hay.includes(w))) {
    const lead = firstSentence(row.metaDescription);
    if (!p.about[0].startsWith(lead)) { p.about[0] = lead + ' ' + p.about[0]; woven++; }
  }
}

function patchContent(file, rows, label) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let n = 0;
  for (const row of rows) {
    const e = data[row.key];
    if (!e) { console.log(`  MISSING ${label} ${row.key}`); continue; }
    e.metaTitle = row.title;
    e.metaDescription = row.metaDescription;
    if (Array.isArray(e.about) && e.about.length) {
      const hay = (row.title + ' ' + e.about[0]).toLowerCase();
      const ws = words(row.base);
      if (ws.length && !ws.some(w => hay.includes(w))) e.about[0] = firstSentence(row.metaDescription) + ' ' + e.about[0];
    }
    n++;
  }
  return { data, n };
}
const mk = patchContent(MAKER, makerRows, 'maker');
const tl = patchContent(TOOL, toolRows, 'tool');

console.log(`activities patched: ${actPatched}/${actRows.length} across ${touchedFiles.size} manifests (about[0] woven: ${woven})`);
console.log(`makers patched: ${mk.n}/${makerRows.length} · tools patched: ${tl.n}/${toolRows.length}`);

if (DRY) { console.log('DRY RUN — nothing written.'); process.exit(0); }
for (const f of touchedFiles) {
  const fp = path.join(MINI, f);
  fs.copyFileSync(fp, fp + '.bak-longtail-fr');
  fs.writeFileSync(fp, JSON.stringify(fileCache[f], null, 2) + '\n', 'utf8');
}
fs.copyFileSync(ACT_CONTENT, ACT_CONTENT + '.bak-longtail-fr');
fs.writeFileSync(ACT_CONTENT, JSON.stringify(actContent, null, 2) + '\n', 'utf8');
fs.copyFileSync(MAKER, MAKER + '.bak-longtail-fr');
fs.writeFileSync(MAKER, JSON.stringify(mk.data, null, 2) + '\n', 'utf8');
fs.copyFileSync(TOOL, TOOL + '.bak-longtail-fr');
fs.writeFileSync(TOOL, JSON.stringify(tl.data, null, 2) + '\n', 'utf8');
console.log('written (backups *.bak-longtail-fr).');
