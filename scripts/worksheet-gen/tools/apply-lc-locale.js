#!/usr/bin/env node
/**
 * apply-lc-locale.js <locale|all> [--dry-run]
 *
 * Merges the K-278..K-283 lowercase letter-tracing draft
 * (i18n/.draft-lc-all.json) into the four non-EN surfaces a new type family
 * needs, in the shape apply-nt20-locale.js / apply-var-locale.js established:
 *
 *   i18n/strings.<loc>.json                  6 x {title, instruction}
 *   i18n/skill-sentences.<loc>.json          the family {full, short}
 *   frontend/config/topics-taxonomy.json     axes['exercise-type'].<fam>.slug/name.<loc>
 *   frontend/messages/<loc>.json             topicMeta.<fam>
 *
 * Refuse-don't-guess: every check runs across every requested locale BEFORE the
 * first write, so a bad draft cannot leave half the locales patched. Idempotent.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '..');
const WG = path.join(__dirname, '..');
const FAM = 'lowercase-letter-tracing';
const IDS = ['K-278', 'K-279', 'K-280', 'K-281', 'K-282', 'K-283'];
const ALL = ['de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const [, , which, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!which) { console.error('usage: apply-lc-locale.js <locale|all> [--dry-run]'); process.exit(1); }
const LOCALES = which === 'all' ? ALL : [which];

const draft = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', '.draft-lc-all.json'), 'utf8'));
const taxPath = path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json');
const tax = JSON.parse(fs.readFileSync(taxPath, 'utf8'));
if (!tax.axes['exercise-type'][FAM]) { console.error(`ABORT: taxonomy has no family ${FAM} — register it first`); process.exit(1); }

const errs = [];
// the engine appends its own worksheet-word to deck titles; a title that
// already contains one reads "Arbeitsblatt ... Arbeitsblatt" downstream
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|ficha|scheda|tehtäv/i;

for (const loc of LOCALES) {
  const d = draft[loc];
  if (!d) { errs.push(`${loc}: no draft entry`); continue; }
  for (const f of ['taxo', 'instruction', 'titles', 'skill', 'topicMeta']) {
    if (!d[f]) errs.push(`${loc}.${f} missing`);
  }
  if (!d.taxo || !d.titles || !d.skill) continue;

  if (!/^[a-z0-9-]+$/.test(d.taxo.slug)) errs.push(`${loc}: taxo slug not ascii-kebab "${d.taxo.slug}"`);
  // a family slug must be unique WITHIN the locale, or two families collide on
  // the same /topic/ URL (the check that forced de einmaleins -> kleines-einmaleins)
  for (const [k, v] of Object.entries(tax.axes['exercise-type'])) {
    if (k === FAM) continue;
    if (v.slug && v.slug[loc] === d.taxo.slug) errs.push(`${loc}: slug "${d.taxo.slug}" already used by family ${k}`);
  }

  const strings = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', `strings.${loc}.json`), 'utf8'));
  const seen = new Map();
  for (const [id, t] of Object.entries(strings)) {
    if (IDS.includes(id)) continue;                       // our own, re-applying
    if (id.split('-')[0] !== 'K') continue;               // per-BAND uniqueness
    seen.set(String(t.title).trim().toLowerCase(), id);
  }
  for (const id of IDS) {
    const title = d.titles[id];
    if (!title) { errs.push(`${loc}.titles.${id} missing`); continue; }
    if (WORKSHEET_WORD.test(title)) errs.push(`${loc}.${id}: title contains a worksheet-word (the engine adds it)`);
    const key = title.trim().toLowerCase();
    if (seen.has(key)) errs.push(`${loc}.${id}: title collides with ${seen.get(key)} ("${title}")`);
    seen.set(key, id);
  }
  const f = d.skill.full || '', s = d.skill.short || '';
  if (f.length < 60 || f.length > 180) errs.push(`${loc}: skill.full ${f.length} chars (want 60-180)`);
  if (s.length < 15 || s.length > 90) errs.push(`${loc}: skill.short ${s.length} chars (want 15-90)`);
  if ((d.topicMeta || '').length < 50) errs.push(`${loc}: topicMeta ${(d.topicMeta || '').length} chars (want >= 50)`);
}
if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); console.error(`ABORT: ${errs.length} validation error(s)`); process.exit(1); }

if (DRY) { console.log(`dry-run ok: ${LOCALES.length} locale(s), ${IDS.length} types each`); process.exit(0); }

/* -------- write -------- */
const writeJson = (p, o, indent) => fs.writeFileSync(p, JSON.stringify(o, null, indent) + '\n');
for (const loc of LOCALES) {
  const d = draft[loc];

  const sp = path.join(WG, 'i18n', `strings.${loc}.json`);
  const strings = JSON.parse(fs.readFileSync(sp, 'utf8'));
  for (const id of IDS) strings[id] = { title: d.titles[id], instruction: d.instruction };
  writeJson(sp, strings, 2);

  const kp = path.join(WG, 'i18n', `skill-sentences.${loc}.json`);
  const skills = JSON.parse(fs.readFileSync(kp, 'utf8'));
  skills[FAM] = { full: d.skill.full, short: d.skill.short };
  writeJson(kp, skills, 2);

  const mp = path.join(ROOT, 'frontend', 'messages', `${loc}.json`);
  const msgs = JSON.parse(fs.readFileSync(mp, 'utf8'));
  msgs.topicMeta[FAM] = d.topicMeta;
  writeJson(mp, msgs, 2);

  tax.axes['exercise-type'][FAM].slug[loc] = d.taxo.slug;
  tax.axes['exercise-type'][FAM].name[loc] = d.taxo.name;
  console.log(`${loc}: 6 types, skill sentence, topicMeta, taxonomy ${d.taxo.slug}`);
}
writeJson(taxPath, tax, 2);
console.log(`applied ${LOCALES.length} locale(s)`);
