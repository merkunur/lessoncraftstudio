#!/usr/bin/env node
/* =====================================================================
   apply-activity-prose.js — write an activity's page prose into all 11
   frontend/messages/activity-content/<locale>.json files from ONE json.

   The prose file: { "en": { "about": [3 paragraphs], "practices": [...],
   "howToPlay": [...], "learningGoals": [...] }, "de": {...}, … all 11 }.
   Refuses a locale that is missing, a section that is missing or empty,
   a TODO left in, a price claim ("free", "gratis", "kostenlos", …) — the
   verify-activity-prose-claims gate would refuse it later anyway — and an
   fr string with a plain space before ? : ! ; (a U+202F is required).
   Writes JSON with 2-space indent, as the files already are.

   Usage: node scripts/apply-activity-prose.js <activity id> <prose.json> [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path');
const [, , ID, FILE] = process.argv;
const DRY = process.argv.includes('--dry-run');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const SECTIONS = ['about', 'practices', 'howToPlay', 'learningGoals'];
const DIR = path.join(__dirname, '..', 'frontend', 'messages', 'activity-content');
if (!ID || !FILE) { console.error('usage: node scripts/apply-activity-prose.js <activity id> <prose.json> [--dry-run]'); process.exit(1); }
const P = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const errs = [];
for (const l of LOCALES) {
  const p = P[l];
  if (!p) { errs.push(`${l}: missing`); continue; }
  for (const s of SECTIONS) if (!Array.isArray(p[s]) || !p[s].length || p[s].some(x => typeof x !== 'string' || !x.trim())) errs.push(`${l}.${s}: missing or empty`);
  const all = SECTIONS.map(s => (p[s] || []).join(' ')).join(' ');
  if (/TODO/.test(all)) errs.push(`${l}: TODO left in`);
  if (/\b(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmai\w*|kostnadsfri|gratuitement)\b/i.test(all)) errs.push(`${l}: a price claim — plays are metered (frontend/lib/quota.ts)`);
  if (l === 'fr' && / [?:!;]/.test(all)) errs.push('fr: a plain space before ? : ! ; (use U+202F)');
}
if (errs.length) { console.error('apply-activity-prose: refused\n  ' + errs.join('\n  ')); process.exit(1); }
for (const l of LOCALES) {
  const f = path.join(DIR, l + '.json');
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  j.prose = j.prose || {};
  const had = !!j.prose[ID];
  j.prose[ID] = { about: P[l].about, practices: P[l].practices, howToPlay: P[l].howToPlay, learningGoals: P[l].learningGoals };
  if (!DRY) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  console.log(`${l} ${had ? 'replaced' : 'added'}${DRY ? ' (dry run)' : ''}`);
}
