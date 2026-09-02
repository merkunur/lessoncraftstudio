#!/usr/bin/env node
/**
 * apply-b2var-locale.js <locale|all> [--dry-run]
 *
 * Merges a validated nt20-B-VAR panel draft into i18n/strings.<locale>.json.
 *
 * Validates FIRST and aborts on any error, so a half-patched strings file is
 * not a reachable state. Only the 64 face ids are touched; every other entry in
 * the file is preserved byte-for-byte by re-serialising the parsed object with
 * the same 2-space indent the existing files use.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const { validate, faces } = require('./validate-b2var-draft.js');

const ALL = ['de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

/**
 * `en` is not a panel draft — its title and instruction are authored inline in
 * each spec module's i18n.en, which is what resolveStrings reads at build time.
 * But lint-locale.js compares every locale's key set against strings.en.json and
 * errors on an id it does not find there, so the English entries have to be
 * mirrored into that file as well. The already-shipped nt20-VAR ids (K-249,
 * K-267, G1-238, G3-369 ...) are all present there, so this follows the house
 * convention rather than inventing one. Idempotent.
 */
function applyEn(dry) {
  const sp = path.join(ROOT, 'i18n', 'strings.en.json');
  const cur = JSON.parse(fs.readFileSync(sp, 'utf8'));
  const { ROWS } = require('./gen-b2var-specs.js');
  let added = 0, replaced = 0;
  for (const r of ROWS) {
    const [, id, , , , , title, instruction] = r;
    if (cur[id]) replaced++; else added++;
    cur[id] = { title, instruction };
  }
  if (!dry) fs.writeFileSync(sp, JSON.stringify(cur, null, 2) + '\n');
  return { loc: 'en', added, replaced, total: Object.keys(cur).length, audit: 0 };
}

function applyOne(loc, dry) {
  const dp = path.join(ROOT, 'i18n', `.draft-b2var-${loc}.json`);
  if (!fs.existsSync(dp)) return { loc, skipped: 'no draft' };
  const draft = JSON.parse(fs.readFileSync(dp, 'utf8'));
  const errs = validate(loc, draft);
  if (errs.length) {
    errs.forEach((e) => console.error(`  [${loc}] ${e}`));
    throw new Error(`${loc}: ${errs.length} validation error(s) — nothing written`);
  }
  const sp = path.join(ROOT, 'i18n', `strings.${loc}.json`);
  const cur = JSON.parse(fs.readFileSync(sp, 'utf8'));
  let added = 0, replaced = 0;
  for (const f of faces()) {
    const t = draft.types[f.id];
    if (cur[f.id]) replaced++; else added++;
    cur[f.id] = { title: t.title, instruction: t.instruction };
  }
  if (!dry) fs.writeFileSync(sp, JSON.stringify(cur, null, 2) + '\n');
  return { loc, added, replaced, total: Object.keys(cur).length, audit: (draft.enAudit || []).length };
}

const arg = process.argv[2];
const dry = process.argv.includes('--dry-run');
if (!arg) { console.error('usage: apply-b2var-locale.js <locale|all> [--dry-run]'); process.exit(2); }
const locs = arg === 'all' ? ['en', ...ALL] : [arg];
let failed = 0;
for (const loc of locs) {
  try {
    const r = loc === 'en' ? applyEn(dry) : applyOne(loc, dry);
    if (r.skipped) console.log(`${loc}: skipped (${r.skipped})`);
    else console.log(`${loc}: +${r.added} added, ${r.replaced} replaced, ${r.total} total${r.audit ? `, ${r.audit} EN-audit note(s)` : ''}${dry ? '  [dry-run]' : ''}`);
  } catch (e) { console.error(String(e.message)); failed++; }
}
process.exit(failed ? 1 : 0);
