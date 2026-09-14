#!/usr/bin/env node
/**
 * apply-b3-locale.js <locale|all> [--dry-run]
 *
 * Merges a validated nt20-C native-panel draft (i18n/.draft-b3-<loc>.json) into every
 * surface the batch needs:
 *
 *   i18n/strings.<loc>.json                   {title, instruction} per shipped id (≤ 120)
 *   i18n/skill-sentences.<loc>.json           20 × {full, short}
 *   frontend/config/topics-taxonomy.json      axes['exercise-type'].<key>.slug/name.<loc>
 *   frontend/messages/<loc>.json              topicMeta.<key> × 20
 *   data/b3/locales/<bank>.<loc>.json         the locale block per bank (GENERATED; merged
 *                                             by lib/b3-common.js bankModule — the module keeps
 *                                             its en block + gate exports untouched)
 *   frontend/lib/seo/strand-names.ts          additive <loc> rows for strandNames the draft
 *                                             carries (only where the row is absent)
 *   docs/worksheet-gen/b3-designs/_records/refusals.<loc>.json
 *                                             the declared refusals (consumed by gen-b3-landings
 *                                             + export-hub-expectations)
 *
 * Runs tools/validate-b3-draft.js FIRST (with the build probe) and aborts on any error,
 * so a bad draft cannot leave half the surfaces patched. Validates ALL requested locales
 * before writing ANY. Idempotent. Then run: node tools/gen-b3-waves.js --locales=<loc>.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { validate, ALL_IDS, KEYS, bankName, LOCALES } = require('./validate-b3-draft.js');

const WG = path.join(__dirname, '..');
const ROOT = path.join(WG, '..', '..');
const [, , which, flag] = process.argv;
const DRY = flag === '--dry-run';
if (!which) { console.error('usage: apply-b3-locale.js <locale|all> [--dry-run]'); process.exit(2); }
const WANT = which === 'all' ? LOCALES : [which];
const writeJson = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n');

const drafts = {};
for (const loc of WANT) {
  const file = path.join(WG, 'i18n', `.draft-b3-${loc}.json`);
  if (!fs.existsSync(file)) { console.error(`ABORT: no draft ${file}`); process.exit(1); }
  const draft = JSON.parse(fs.readFileSync(file, 'utf8'));
  const errs = validate(loc, draft);
  if (errs.length) { errs.forEach((e) => console.error(` - [${loc}] ${e}`)); console.error(`ABORT: ${errs.length} validation error(s) in ${loc} — nothing written`); process.exit(1); }
  drafts[loc] = draft;
}
if (DRY) { console.log(`dry-run ok: ${WANT.join(',')} validated (probe included) — nothing written`); process.exit(0); }

const taxPath = path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json');
const tax = JSON.parse(fs.readFileSync(taxPath, 'utf8'));
const strandPath = path.join(ROOT, 'frontend', 'lib', 'seo', 'strand-names.ts');
let strandSrc = fs.readFileSync(strandPath, 'utf8');
let strandAdded = 0;

for (const loc of WANT) {
  const d = drafts[loc];
  const refusals = d.refusals || {};
  // strings
  const sp = path.join(WG, 'i18n', `strings.${loc}.json`);
  const strings = fs.existsSync(sp) ? JSON.parse(fs.readFileSync(sp, 'utf8')) : {};
  let n = 0;
  for (const id of ALL_IDS) {
    if (refusals[id]) { delete strings[id]; continue; }
    strings[id] = { title: d.types[id].title, instruction: d.types[id].instruction }; n++;
  }
  writeJson(sp, strings);
  // skills
  const kp = path.join(WG, 'i18n', `skill-sentences.${loc}.json`);
  const skills = fs.existsSync(kp) ? JSON.parse(fs.readFileSync(kp, 'utf8')) : {};
  for (const k of KEYS) skills[k] = { full: d.skills[k].full, short: d.skills[k].short };
  writeJson(kp, skills);
  // topicMeta
  const mp = path.join(ROOT, 'frontend', 'messages', `${loc}.json`);
  const msgs = JSON.parse(fs.readFileSync(mp, 'utf8'));
  msgs.topicMeta = msgs.topicMeta || {};
  for (const k of KEYS) msgs.topicMeta[k] = d.topicMeta[k];
  writeJson(mp, msgs);
  // taxonomy
  for (const k of KEYS) {
    const e = tax.axes['exercise-type'][k];
    if (!e) throw new Error(`taxonomy has no exercise-type ${k} — run tools/register-b3-taxonomy.js first`);
    e.slug[loc] = d.families[k].slug; e.name[loc] = d.families[k].name;
  }
  // bank locale blocks
  const dir = path.join(WG, 'data', 'b3', 'locales'); fs.mkdirSync(dir, { recursive: true });
  let nb = 0;
  for (const k of KEYS) {
    const b = bankName(k);
    const p = path.join(dir, `${b}.${loc}.json`);
    if (d.banks && d.banks[b]) { writeJson(p, d.banks[b]); nb++; }
    else if (fs.existsSync(p)) fs.unlinkSync(p);   // the family is fully refused in this locale
  }
  // strand names (additive)
  for (const [strand, text] of Object.entries(d.strandNames || {})) {
    const re = new RegExp("^(\\s*)'" + strand.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "': \\{\\n((?:.*\\n)*?)(\\s*)\\},", 'm');
    const m = re.exec(strandSrc);
    if (!m) { console.warn(`  [${loc}] strandNames: no row for "${strand}" in strand-names.ts — skipped`); continue; }
    if (new RegExp('^\\s*' + loc + ':', 'm').test(m[2])) continue;   // already authored — never overwrite
    const insert = `${m[1]}  ${loc}: ${JSON.stringify(text).replace(/^"|"$/g, "'")}, // nt20-C panel (tools/apply-b3-locale.js)\n`;
    strandSrc = strandSrc.slice(0, m.index + m[0].length - (m[3] + '},').length) + insert + strandSrc.slice(m.index + m[0].length - (m[3] + '},').length);
    strandAdded++;
  }
  // refusals record
  const recDir = path.join(ROOT, 'docs', 'worksheet-gen', 'b3-designs', '_records'); fs.mkdirSync(recDir, { recursive: true });
  writeJson(path.join(recDir, `refusals.${loc}.json`), { locale: loc, refusals });
  console.log(`${loc}: ${n} type strings (${Object.keys(refusals).length} refused), 20 skills, 20 topicMeta, 20 taxonomy slug/name, ${nb} bank blocks`);
}
writeJson(taxPath, tax);
if (strandAdded) fs.writeFileSync(strandPath, strandSrc);
console.log(`applied ${WANT.length} locale(s)${strandAdded ? `, ${strandAdded} strand-name row(s) added` : ''} — next: node tools/gen-b3-waves.js --locales=${WANT.join(',')} && node i18n/lint-locale.js <loc>`);
