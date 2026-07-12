#!/usr/bin/env node
/* =====================================================================
   apply-longtail-de.js — apply the 500-longtail keyword map to de landings.

   Operator commission 2026-07-12 (goal: demand-aligned German pages):
   reads docs/SEO/longtail-map-de.json (built by native-SEO mapping agents
   over docs/SEO/keywords-de-k3-500.json) and, for every row with
   target === "landing", patches that landing entry in
   frontend/content/seo-landing/de.json:

     - title            ← row.title           (SERP title tag)
     - metaDescription  ← row.metaDescription (SERP snippet)
     - p1 weave: if neither h1 nor p1 carries any content word of the
       BASE keyword, the metaDescription's first sentence (unique per
       row by construction) is prepended to p1 so the visible
       description carries the keyword. h1 is NEVER touched (feeds
       JSON-LD name/og; already keyword-bearing by construction).

   Data-only, in-place (rekey-de-titles.js convention), --dry-run
   supported, .bak backup, duplicate-title report across the whole file.
   After a real run: gate.js + render-landing-html.js at deploy (§22).
   Single sanctioned pass per §21.5a operator sign-off.

   Usage: node scripts/seo-landing/apply-longtail-de.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..', '..');
const DE_JSON = path.join(REPO, 'frontend', 'content', 'seo-landing', 'de.json');
const MAP = path.join(REPO, 'docs', 'SEO', 'longtail-map-de.json');
const DRY = process.argv.includes('--dry-run');

const STOP = new Set(['arbeitsblatt', 'arbeitsblätter', 'arbeitsblaetter', 'übungen', 'uebungen', 'übungsblätter',
  'kostenlos', 'ausdrucken', 'grundschule', 'kindergarten', 'vorschule', 'klasse', 'kinder', 'für', 'zum', 'die',
  'der', 'das', 'mit', 'und', 'pdf', 'online', 'gratis', 'vorlage', 'vorlagen']);

function contentWords(base) {
  return base.toLowerCase().split(/\s+/).filter(w => w.length >= 4 && !STOP.has(w));
}

function firstSentence(s) {
  const m = s.match(/^[^.!?]{15,}?[.!?]/);
  return m ? m[0].trim() : s.trim();
}

const map = JSON.parse(fs.readFileSync(MAP, 'utf8'));
const data = JSON.parse(fs.readFileSync(DE_JSON, 'utf8'));
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

// duplicate-title report across the whole corpus
const counts = {};
for (const l of data.landings) {
  const t = (l.title || '').toLowerCase();
  if (!t) continue; // empty titles fall back to the unique h1 — not a dup surface
  counts[t] = (counts[t] || 0) + 1;
}
const dups = Object.entries(counts).filter(([, n]) => n > 1);

console.log(`landings patched: ${patched} (p1 woven: ${woven}, missing slugs: ${missing})`);
console.log(`duplicate titles in corpus after apply: ${dups.length}`);
if (dups.length) dups.slice(0, 10).forEach(([t, n]) => console.log(`  ${n}x ${t.slice(0, 70)}`));

if (DRY) { console.log('DRY RUN — nothing written.'); process.exit(dups.length ? 1 : 0); }
if (dups.length) { console.log('ABORT: duplicate titles — fix the map first.'); process.exit(1); }
fs.copyFileSync(DE_JSON, DE_JSON + '.bak-longtail');
fs.writeFileSync(DE_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('de.json written (backup at de.json.bak-longtail).');
