#!/usr/bin/env node
/**
 * validate-b2var-draft.js <locale>
 *
 * Gates a native panel's nt20-B-VAR draft before it is applied. All checks run,
 * every failure is printed, exit 1 on any.
 *
 * Checks:
 *   - exactly the 64 face ids from tools/gen-b2var-specs.js, no extras/missing
 *   - title: non-empty, <=70 chars, no worksheet-word (the engine appends it),
 *     unique within its GRADE BAND both inside the draft and against the
 *     locale's existing strings.<loc>.json (lint-locale.js fails the build on a
 *     band collision, and there are already 149 K / 96 G1 / 74 G2 / 59 G3)
 *   - instruction: non-empty, <=150 chars, and DISTINCT from its siblings in the
 *     same family. That last one is not cosmetic: the meta description is built
 *     from a family-level skill sentence plus this instruction, so the
 *     instruction is the only per-face sentence in it. Identical instructions
 *     across a family produce near-identical descriptions and no other gate in
 *     the pipeline catches it.
 *   - a title must not be byte-identical to the English (an untranslated leak)
 *
 * Poison-tested by validate-b2var-draft.test.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|ficha|scheda|tehtäv/i;
const TITLE_MAX = 70;
const INSTR_MAX = 150;

function faces() {
  const { ROWS } = require('./gen-b2var-specs.js');
  return ROWS.map((r) => ({ id: r[1], enTitle: r[6], enInstruction: r[7] }));
}
function familyOf(id) {
  const { loadType } = require('../lib/load-types.js');
  return loadType(id).exerciseType;
}
const bandOf = (id) => id.split('-')[0];
const norm = (s) => String(s).trim().toLowerCase().replace(/\s+/g, ' ');

function validate(loc, draft) {
  const errs = [];
  const E = (m) => errs.push(m);
  const F = faces();
  const want = F.map((f) => f.id);

  if (!draft || typeof draft !== 'object') return ['draft is not an object'];
  if (draft.locale && draft.locale !== loc) E(`locale field is "${draft.locale}", expected "${loc}"`);
  const types = draft.types || {};
  const got = Object.keys(types);
  for (const id of want) if (!got.includes(id)) E(`types: missing ${id}`);
  for (const id of got) if (!want.includes(id)) E(`types: unknown id ${id}`);

  // existing titles per band, from the locale's shipped strings file
  const sf = path.join(ROOT, 'i18n', `strings.${loc}.json`);
  const existing = fs.existsSync(sf) ? JSON.parse(fs.readFileSync(sf, 'utf8')) : {};
  const takenByBand = {};
  for (const [id, v] of Object.entries(existing)) {
    if (!v || !v.title) continue;
    (takenByBand[bandOf(id)] = takenByBand[bandOf(id)] || new Map()).set(norm(v.title), id);
  }

  const seenByBand = {};
  const instrByFamily = {};
  for (const f of F) {
    const t = types[f.id];
    if (!t) continue;
    const title = t.title, instr = t.instruction;
    if (!title || !String(title).trim()) { E(`types.${f.id}: empty title`); }
    else {
      if (title.length > TITLE_MAX) E(`types.${f.id}: title ${title.length} > ${TITLE_MAX} chars: "${title}"`);
      if (WORKSHEET_WORD.test(title)) E(`types.${f.id}: title contains a worksheet-word (the engine appends it): "${title}"`);
      if (loc !== 'en' && norm(title) === norm(f.enTitle)) E(`types.${f.id}: title is byte-identical to the English (untranslated leak): "${title}"`);
      const band = bandOf(f.id);
      const taken = takenByBand[band];
      // A face re-issuing its OWN shipped title is not a collision. Once a draft
      // has been applied, strings.<loc>.json carries these very ids, so a
      // self-match made every unchanged title read as a band clash and the gate
      // failed 64/64 on a correct draft. Only a DIFFERENT id is a collision.
      // Poison-tested both ways in validate-b2var-draft.test.js: a clash with
      // another shipped id must still fire, a self-title must stay clean.
      const owner = taken && taken.get(norm(title));
      if (owner && owner !== f.id) E(`types.${f.id}: title collides in band ${band} with the shipped ${owner}: "${title}"`);
      const seen = (seenByBand[band] = seenByBand[band] || new Map());
      if (seen.has(norm(title))) E(`types.${f.id}: title collides in band ${band} with ${seen.get(norm(title))} in this draft: "${title}"`);
      else seen.set(norm(title), f.id);
    }
    if (!instr || !String(instr).trim()) { E(`types.${f.id}: empty instruction`); }
    else {
      if (instr.length > INSTR_MAX) E(`types.${f.id}: instruction ${instr.length} > ${INSTR_MAX} chars`);
      const fam = familyOf(f.id);
      const m = (instrByFamily[fam] = instrByFamily[fam] || new Map());
      if (m.has(norm(instr))) E(`types.${f.id}: instruction is identical to ${m.get(norm(instr))} in family "${fam}" — the instruction is the only per-face sentence in the meta description`);
      else m.set(norm(instr), f.id);
    }
  }
  return errs;
}

module.exports = { validate, faces, TITLE_MAX, INSTR_MAX, WORKSHEET_WORD };

if (require.main === module) {
  const loc = process.argv[2];
  if (!loc) { console.error('usage: validate-b2var-draft.js <locale>'); process.exit(2); }
  const p = path.join(ROOT, 'i18n', `.draft-b2var-${loc}.json`);
  if (!fs.existsSync(p)) { console.error('no draft at ' + p); process.exit(2); }
  const errs = validate(loc, JSON.parse(fs.readFileSync(p, 'utf8')));
  if (errs.length) { errs.forEach((e) => console.error('  ' + e)); console.error(`${errs.length} error(s)`); process.exit(1); }
  console.log('ok');
}
