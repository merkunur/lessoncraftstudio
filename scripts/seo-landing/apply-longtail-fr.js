#!/usr/bin/env node
/* =====================================================================
   apply-longtail-fr.js — apply the 500-longtail keyword map to fr landings.
   French sibling of apply-longtail-de.js (operator commission 2026-07-12):
   reads docs/SEO/longtail-map-fr.json and, for every row with
   target === "landing", patches that entry in
   frontend/content/seo-landing/fr.json:
     - title           ← row.title
     - metaDescription ← row.metaDescription
     - p1 weave: if neither h1 nor p1 carries any content word of the BASE
       keyword, the metaDescription's first sentence is prepended to p1.
       h1 is NEVER touched (feeds JSON-LD name/og).
   Data-only, in-place, --dry-run, .bak backup, corpus-wide duplicate-title
   report (empty titles ignored — they fall back to the unique h1).
   After a real run: gate.js + render-landing-html.js at deploy.
   Usage: node scripts/seo-landing/apply-longtail-fr.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const FR_JSON = path.join(REPO, 'frontend', 'content', 'seo-landing', 'fr.json');
const MAP = path.join(REPO, 'docs', 'SEO', 'longtail-map-fr.json');
const DRY = process.argv.includes('--dry-run');

const STOP = new Set(['fiche', 'fiches', 'exercice', 'exercices', 'activité', 'activités', 'imprimer',
  'gratuit', 'gratuits', 'gratuite', 'gratuites', 'gratuitement', 'maternelle', 'grande', 'moyenne',
  'petite', 'section', 'primaire', 'cycle', 'pour', 'avec', 'dans', 'les', 'des', 'une', 'aux',
  'pdf', 'ligne', 'enfant', 'enfants', 'télécharger', 'jeux', 'jeu']);

function contentWords(base) {
  return base.toLowerCase().split(/[\s']+/).filter(w => w.length >= 4 && !STOP.has(w));
}
function firstSentence(s) {
  const m = s.match(/^[^.!?]{15,}?[.!?]/);
  return m ? m[0].trim() : s.trim();
}

const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
const data = JSON.parse(fs.readFileSync(FR_JSON, 'utf8'));
const bySlug = new Map(data.landings.map(l => [l.slug, l]));

let patched = 0, woven = 0, missing = 0;
for (const row of map.rows) {
  if (row.target !== 'landing') continue;
  const l = bySlug.get(row.slug);
  if (!l) { console.log('  MISSING slug ' + row.slug); missing++; continue; }
  l.title = row.title;
  l.metaDescription = row.metaDescription;
  const hay = ((l.h1 || '') + ' ' + (l.p1 || '')).toLowerCase();
  const words = contentWords(row.base);
  if (words.length && !words.some(w => hay.includes(w))) {
    const lead = firstSentence(row.metaDescription);
    if (!l.p1.startsWith(lead)) { l.p1 = lead + ' ' + l.p1; woven++; }
  }
  patched++;
}

const counts = {};
for (const l of data.landings) {
  const t = (l.title || '').toLowerCase();
  if (!t) continue;
  counts[t] = (counts[t] || 0) + 1;
}
const dups = Object.entries(counts).filter(([, n]) => n > 1);

console.log(`landings patched: ${patched} (p1 woven: ${woven}, missing slugs: ${missing})`);
console.log(`duplicate titles in corpus after apply: ${dups.length}`);
if (dups.length) dups.slice(0, 10).forEach(([t, n]) => console.log(`  ${n}x ${t.slice(0, 70)}`));

if (DRY) { console.log('DRY RUN — nothing written.'); process.exit(dups.length ? 1 : 0); }
if (dups.length) { console.log('ABORT: duplicate titles — fix the map first.'); process.exit(1); }
fs.copyFileSync(FR_JSON, FR_JSON + '.bak-longtail');
fs.writeFileSync(FR_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('fr.json written (backup at fr.json.bak-longtail).');
