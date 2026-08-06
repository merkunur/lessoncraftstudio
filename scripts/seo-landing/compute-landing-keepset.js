#!/usr/bin/env node
/**
 * compute-landing-keepset.js — the worksheet-landing PRUNE keep-set computer (2026-07-22).
 *
 * WHY: 30K templated /worksheets landings are a site-level scaled-content liability suppressing the
 * whole domain (3-expert verdict, plan `analyze-thoroughly-and-find-elegant-allen.md`). We KEEP a
 * curated core (indexable + in sitemap) and `noindex,follow` + de-sitemap the thin tail. This script
 * decides keep-vs-prune per landing by a TUNABLE criterion and REPORTS the counts BEFORE anything flips.
 *
 * It reads (per locale): the committed landing JSON `frontend/content/seo-landing/<loc>.json` and the
 * server-only augment `/var/www/lcs-media/landings-augment/<loc>.json` (unique-content extraction:
 * realWords / imageNouns / sampleProblems). Run on Hetzner (cwd=/opt/lessoncraftstudio).
 *
 * REPORT mode (default): prints total + per-locale + per-type keep/prune counts. Writes NOTHING.
 * --write: also writes the keepset map `/var/www/lcs-media/landings-keepset/<loc>.json`
 *          = { "<slug>": "keep" | "prune", ... } for the render / sitemap / route consumers to read.
 *
 * Criteria (--criterion=):
 *   v1  (default) KEEP iff  hasStandard && hasContent   — CCSS-aligned AND genuine unique text
 *   std           KEEP iff  hasStandard                 — tighter (standard alone)
 *   content       KEEP iff  hasContent                  — looser (unique text alone)
 * where hasContent = realWords.length>0 || imageNouns.length>=3 || sampleProblems.length>=2
 *       (mirrors the renderer's wordsHtml/problemsHtml presence test in render-landing-html.js).
 *
 * Usage:
 *   node scripts/seo-landing/compute-landing-keepset.js --locales=all
 *   node scripts/seo-landing/compute-landing-keepset.js --locales=en,de --criterion=std
 *   node scripts/seo-landing/compute-landing-keepset.js --locales=all --write   # after count approval
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ALL_LOCALES = ['en', 'de', 'es', 'sv', 'nl', 'da', 'it', 'no', 'fr', 'pt', 'fi'];

// --- args ---
const args = { locales: ALL_LOCALES.slice(), write: false, criterion: 'v1', augmentDir: '/var/www/lcs-media/landings-augment', keepsetDir: '/var/www/lcs-media/landings-keepset' };
for (const a of process.argv.slice(2)) {
  if (a.startsWith('--locales=')) { const v = a.slice(10).trim(); args.locales = v === 'all' ? ALL_LOCALES.slice() : v.split(',').map(s => s.trim()).filter(Boolean); }
  else if (a === '--write') args.write = true;
  else if (a.startsWith('--criterion=')) args.criterion = a.slice(12).trim();
  else if (a.startsWith('--augment=')) args.augmentDir = a.slice(10).trim();
  else if (a.startsWith('--keepset-dir=')) args.keepsetDir = a.slice(14).trim();
  else { console.error('Unknown arg:', a); process.exit(2); }
}

const LANDING_DIRS = [
  path.join(process.cwd(), 'frontend', 'content', 'seo-landing'),
  path.join(process.cwd(), 'content', 'seo-landing'),
  '/opt/lessoncraftstudio/frontend/content/seo-landing',
];
function loadLandings(locale) {
  for (const d of LANDING_DIRS) {
    const p = path.join(d, `${locale}.json`);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')).landings || [];
  }
  return null;
}
function loadAugment(locale) {
  const p = path.join(args.augmentDir, `${locale}.json`);
  try { if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { /* tolerate */ }
  return {};
}

function hasContent(a) {
  if (!a) return false;
  if (Array.isArray(a.realWords) && a.realWords.length > 0) return true;
  if (Array.isArray(a.imageNouns) && a.imageNouns.length >= 3) return true;
  if (Array.isArray(a.sampleProblems) && a.sampleProblems.length >= 2) return true;
  return false;
}
function keepDecision(landing, aug, criterion) {
  const hasStandard = !!landing.standard;
  const content = hasContent(aug);
  switch (criterion) {
    case 'std': return hasStandard;
    case 'content': return content;
    case 'v1':
    default: return hasStandard && content;
  }
}

// --- run ---
console.log(`\n=== landing keepset — criterion=${args.criterion} — ${args.write ? 'WRITE' : 'REPORT ONLY'} ===\n`);
let gKeep = 0, gPrune = 0;
const typeAgg = {}; // type -> {keep,prune}
const perLocale = [];

for (const loc of args.locales) {
  const landings = loadLandings(loc);
  if (!landings) { console.log(`${loc}: (no landing file — skipped)`); continue; }
  const aug = loadAugment(loc);
  let keep = 0, prune = 0, mono = 0, xlang = 0;
  const map = {};
  for (const l of landings) {
    const decision = keepDecision(l, aug[l.slug], args.criterion) ? 'keep' : 'prune';
    map[l.slug] = decision;
    if (decision === 'keep') keep++; else prune++;
    if (l.coordinate && l.coordinate.target) xlang++; else mono++;
    const t = (l.coordinate && l.coordinate.type) || '?';
    (typeAgg[t] = typeAgg[t] || { keep: 0, prune: 0 })[decision]++;
  }
  gKeep += keep; gPrune += prune;
  perLocale.push({ loc, total: landings.length, keep, prune, mono, xlang });
  if (args.write) {
    fs.mkdirSync(args.keepsetDir, { recursive: true });
    fs.writeFileSync(path.join(args.keepsetDir, `${loc}.json`), JSON.stringify(map));
  }
}

console.log('--- per locale ---');
console.log('loc   total   KEEP   prune   keep%');
for (const r of perLocale) {
  console.log(
    `${r.loc.padEnd(4)}  ${String(r.total).padStart(6)}  ${String(r.keep).padStart(5)}  ${String(r.prune).padStart(6)}   ${((r.keep / Math.max(1, r.total)) * 100).toFixed(1)}%`,
  );
}
console.log('\n--- per exercise-type (all locales combined) — sorted by prune count ---');
console.log('type                          KEEP    prune');
for (const [t, c] of Object.entries(typeAgg).sort((a, b) => b[1].prune - a[1].prune)) {
  console.log(`${t.padEnd(28)}  ${String(c.keep).padStart(5)}  ${String(c.prune).padStart(6)}`);
}
console.log('\n=== TOTAL ===');
console.log(`KEEP (stay indexable + in sitemap): ${gKeep}`);
console.log(`PRUNE (noindex,follow + de-sitemap): ${gPrune}`);
console.log(`keep share: ${((gKeep / Math.max(1, gKeep + gPrune)) * 100).toFixed(1)}%`);
if (args.write) console.log(`\nkeepset maps written to ${args.keepsetDir}/<loc>.json`);
else console.log('\n(REPORT ONLY — nothing written. Re-run with --write after count approval.)');
