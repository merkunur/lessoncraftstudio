#!/usr/bin/env node
/**
 * validate-b5-draft.js <locale> [path] [--no-probe] — the refuse-don't-guess gate for
 * a nt10-E native-panel draft (default path i18n/.draft-b5-<locale>.json).
 *
 * Draft shape (docs/worksheet-gen/b5-panel-brief.md):
 *   { locale,
 *     types:     { <60 ids>: {title, instruction} }      — omitted for a REFUSED face
 *     families:  { <10 keys>: {slug, name} }
 *     skills:    { <10 keys>: {full, short} }
 *     topicMeta: { <10 keys>: string }
 *     banks:     { <10 bank names>: <locale block> }      — the per-family §5 shape
 *     refusals:  { <id>: reason }                         — faces this locale will NOT ship
 *     strandNames?: { <en strand>: <locale strand> }
 *     enAudit:   [ ... ]                                   — the EN source is a source to AUDIT
 *   }
 *
 * Checks (ALL run, every error listed, exit 1 on any):
 *   shape      every key set exact; refusals carry a reason; enAudit is an array
 *   types      title ≤ 70 (no worksheet-word, no free-claim, no soft hyphen),
 *              instruction ≤ 150 ending in a mark; per-BAND title uniqueness against the
 *              locale's EXISTING strings AND within the draft
 *   families   slug ASCII-kebab, unique across the locale's taxonomy; name visible → no
 *              free-claim / soft hyphen
 *   skills     full 60-180, short 15-90   (metadata — free-claim exempt by ruling)
 *   topicMeta  ≥ 50 chars               (metadata — exempt)
 *   banks      every family validator that exports cleanly runs on its block; then the
 *              BUILD PROBE: every one of the 60 specs is built (pure build(), d2, the
 *              theme candidates of tools/gen-b5-waves.js) against the draft's blocks in a
 *              temp locales dir (B5_LOCALES_DIR) — a spec that refuses must be DECLARED in
 *              `refusals` (a refusal is legitimate; an undeclared one is an error, so the
 *              hub-gate expectation is lowered knowingly, never discovered at generate).
 *
 * Poison-tested by tools/validate-b5-draft.test.js (an EN-derived draft PASSES; one
 * corruption per rule FAILS).
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const WG = path.join(__dirname, '..');
const ROOT = path.join(WG, '..', '..');
const freeClaim = require(path.join(ROOT, 'scripts', 'lib', 'free-claim.js'));
const alloc = require(path.join(ROOT, 'docs', 'worksheet-gen', 'b5-designs', '_records', 'b5var-id-allocation.json'));
const { FAMILIES } = require('./gen-b5var-specs.js');

const LOCALES = ['de', 'es', 'fr', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const KEYS = FAMILIES.map(([, k]) => k);
const BASE_IDS = FAMILIES.map(([id]) => id);
const ALL_IDS = [...BASE_IDS, ...alloc.faces.map((f) => f.id)];
const BAND_OF = (id) => id.split('-')[0];
// bank module name per family key (nt10-E: none renamed; the map stays for parity with validate-b3-draft)
const BANK_OF = {}; // nt10-E: every bank is named after its family key (data/b5/<key>.js)
const bankName = (key) => BANK_OF[key] || key;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;

function famOfId(id) {
  if (BASE_IDS.includes(id)) return FAMILIES.find(([b]) => b === id)[1];
  const f = alloc.faces.find((x) => x.id === id);
  return f ? FAMILIES.find(([b]) => b === f.family)[1] : null;
}

function validate(loc, draft, opts = {}) {
  const errs = [];
  const E = (m) => errs.push(m);
  if (!LOCALES.includes(loc)) E(`locale ${loc} is not a panel locale`);
  if (draft.locale !== loc) E(`draft.locale "${draft.locale}" ≠ ${loc}`);
  if (!Array.isArray(draft.enAudit)) E('enAudit must be an array (the EN source is a source to audit — an empty array is a claim it was clean)');
  const refusals = draft.refusals || {};
  for (const [id, why] of Object.entries(refusals)) {
    if (!ALL_IDS.includes(id)) E(`refusals: unknown id ${id}`);
    if (typeof why !== 'string' || why.trim().length < 12) E(`refusals.${id}: a refusal needs a reason (≥ 12 chars)`);
  }
  // families / skills / topicMeta
  for (const sec of ['families', 'skills', 'topicMeta']) {
    const have = Object.keys(draft[sec] || {});
    const miss = KEYS.filter((k) => !have.includes(k)), extra = have.filter((k) => !KEYS.includes(k));
    if (miss.length) E(`${sec}: missing ${miss.join(', ')}`);
    if (extra.length) E(`${sec}: unknown ${extra.join(', ')}`);
  }
  const taxPath = path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json');
  const tax = opts.taxonomy || JSON.parse(fs.readFileSync(taxPath, 'utf8'));
  const slugsInUse = new Map();
  for (const [k, v] of Object.entries(tax.axes['exercise-type'])) if (v.slug && v.slug[loc] && !KEYS.includes(k)) slugsInUse.set(v.slug[loc], k);
  const draftSlugs = new Set();
  for (const k of KEYS) {
    const f = (draft.families || {})[k];
    if (!f) continue;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(f.slug || '')) E(`families.${k}.slug "${f.slug}" is not ASCII kebab`);
    if (slugsInUse.has(f.slug)) E(`families.${k}.slug "${f.slug}" already belongs to ${slugsInUse.get(f.slug)} in ${loc}`);
    if (draftSlugs.has(f.slug)) E(`families.${k}.slug "${f.slug}" repeats within the draft`);
    draftSlugs.add(f.slug);
    if (!f.name || f.name.trim().length < 3) E(`families.${k}.name missing`);
    if (f.name && freeClaim.hit(f.name)) E(`families.${k}.name claims free ("${freeClaim.hit(f.name)}") — the rail is visible copy`);
    if (/­/.test(f.name || '')) E(`families.${k}.name carries a soft hyphen`);
    const s = (draft.skills || {})[k];
    if (s) {
      const fl = [...String(s.full || '')].length, sl = [...String(s.short || '')].length;
      if (fl < 60 || fl > 180) E(`skills.${k}.full is ${fl} chars (60-180)`);
      if (sl < 15 || sl > 90) E(`skills.${k}.short is ${sl} chars (15-90)`);
    }
    const tm = (draft.topicMeta || {})[k];
    if (tm != null && [...String(tm)].length < 50) E(`topicMeta.${k} is ${[...String(tm)].length} chars (≥ 50)`);
  }
  // types
  const existing = opts.existingStrings || (() => { try { return JSON.parse(fs.readFileSync(path.join(WG, 'i18n', `strings.${loc}.json`), 'utf8')); } catch (e) { return {}; } })();
  const bandTitles = new Map();   // band -> Map(title -> id)
  for (const [id, t] of Object.entries(existing)) { if (ALL_IDS.includes(id)) continue; const b = BAND_OF(id); if (!bandTitles.has(b)) bandTitles.set(b, new Map()); if (t && t.title) bandTitles.get(b).set(String(t.title).trim().toLowerCase(), id); }
  const types = draft.types || {};
  for (const id of ALL_IDS) {
    const t = types[id];
    if (!t) { if (!refusals[id]) E(`types.${id} missing and not declared under refusals`); continue; }
    if (refusals[id]) E(`types.${id} present but ${id} is declared refused — one or the other`);
    const title = String(t.title || '').trim(), ins = String(t.instruction || '').trim();
    if (!title) E(`types.${id}.title empty`);
    if ([...title].length > 70) E(`types.${id}.title is ${[...title].length} chars (≤ 70)`);
    if (WORKSHEET_WORD.test(title)) E(`types.${id}.title carries a worksheet-word (the engine appends it)`);
    if (freeClaim.hit(title)) E(`types.${id}.title claims free ("${freeClaim.hit(title)}")`);
    if (!ins) E(`types.${id}.instruction empty`);
    if ([...ins].length > 150) E(`types.${id}.instruction is ${[...ins].length} chars (≤ 150)`);
    if (ins && !/[.!?…]$/u.test(ins)) E(`types.${id}.instruction does not end in a mark`);
    if (freeClaim.hit(ins)) E(`types.${id}.instruction claims free ("${freeClaim.hit(ins)}")`);
    if (/­/.test(title + ins)) E(`types.${id} carries a soft hyphen (U+00AD)`);
    const b = BAND_OF(id), key = title.toLowerCase();
    if (!bandTitles.has(b)) bandTitles.set(b, new Map());
    const clash = bandTitles.get(b).get(key);
    if (clash) E(`types.${id}.title "${title}" repeats ${clash}'s title within band ${b} (publish collides on titleHash)`);
    else bandTitles.get(b).set(key, id);
  }
  for (const id of Object.keys(types)) if (!ALL_IDS.includes(id)) E(`types: unknown id ${id}`);
  // banks
  const banks = draft.banks || {};
  const wantBanks = new Set(KEYS.map(bankName));
  for (const b of wantBanks) if (!banks[b]) {
    const key = KEYS.find((k) => bankName(k) === b);
    const famIds = ALL_IDS.filter((id) => famOfId(id) === key);
    if (!famIds.every((id) => refusals[id])) E(`banks.${b} missing (the ${key} family is not fully refused)`);
  }
  for (const b of Object.keys(banks)) if (!wantBanks.has(b)) E(`banks: unknown bank "${b}" (names: ${[...wantBanks].join(', ')})`);
  // title parity: the deck title (types) and the page title (the bank's strings) are the same string.
  for (const key of KEYS) {
    const tTitles = Object.entries(types).filter(([id]) => famOfId(id) === key).map(([, t]) => String((t && t.title) || '')).filter(Boolean).sort();
    const block = banks[bankName(key)];
    if (!block) continue;                       // a fully-refused family is reported above
    const sTitles = Object.values((block && block.strings) || {}).map((x) => String((x && x.title) || '')).filter(Boolean).sort();
    if (JSON.stringify(tTitles) === JSON.stringify(sTitles)) continue;
    const only = (a, b2) => a.filter((v) => !b2.includes(v));
    const tOnly = only(tTitles, sTitles), sOnly = only(sTitles, tTitles);
    if (tOnly.length || sOnly.length) E(`${key}: the deck titles and the page titles disagree — types only: ${JSON.stringify(tOnly)}; bank strings only: ${JSON.stringify(sOnly)} (a deck whose title is not its page's)`);
    else E(`${key}: ${tTitles.length} type title(s) against ${sTitles.length} bank string title(s)`);
  }
  if (freeClaim.selfTest) freeClaim.selfTest();
  // family validators (those exporting cleanly), then the build probe
  if (!opts.noProbe && errs.length === 0) {
    const probe = buildProbe(loc, draft);
    for (const [id, msg] of Object.entries(probe.refused)) if (!refusals[id]) E(`build probe: ${id} REFUSES in ${loc} and is not declared under refusals — ${msg}`);
    for (const id of Object.keys(refusals)) if (probe.built.includes(id)) E(`refusals.${id} declared but ${id} BUILDS in ${loc} — drop the refusal or say why it must not ship`);
    for (const m of probe.validator) E('validator: ' + m);
  }
  return errs;
}

/** Writes the draft's blocks to a temp locales dir and runs tools/b5-probe-child.js there. */
function buildProbe(loc, draft) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'b5draft-'));
  for (const [b, block] of Object.entries(draft.banks || {})) fs.writeFileSync(path.join(dir, `${b}.${loc}.json`), JSON.stringify(block));
  const out = execFileSync(process.execPath, [path.join(__dirname, 'b5-probe-child.js'), loc], {
    env: { ...process.env, B5_LOCALES_DIR: dir, B5_DRAFT_SLUGS: JSON.stringify(Object.fromEntries(Object.entries(draft.families || {}).map(([k, f]) => [k, f && f.slug]))) }, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, cwd: WG,
  });
  fs.rmSync(dir, { recursive: true, force: true });
  return JSON.parse(out.slice(out.lastIndexOf('\n{') + 1));
}

if (require.main === module) {
  const loc = process.argv[2];
  const p = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : path.join(WG, 'i18n', `.draft-b5-${loc}.json`);
  if (!loc) { console.error('usage: validate-b5-draft.js <locale> [path] [--no-probe]'); process.exit(2); }
  const draft = JSON.parse(fs.readFileSync(p, 'utf8'));
  const errs = validate(loc, draft, { noProbe: process.argv.includes('--no-probe') });
  errs.forEach((e) => console.error(' - ' + e));
  const refused = Object.keys(draft.refusals || {}).length;
  console.log(`${loc}: ${errs.length} error(s); ${Object.keys(draft.types || {}).length} types, ${refused} declared refusal(s)`);
  process.exit(errs.length ? 1 : 0);
}
module.exports = { validate, ALL_IDS, KEYS, bankName, LOCALES };
