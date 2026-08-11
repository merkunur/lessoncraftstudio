/* =====================================================================
   _dbm-fold-landing.js — fold the ten panels' LANDING copy into
   `frontend/messages/tool-content/<loc>.json` and their HUB CARD into
   `frontend/lib/manipulatives.ts`.
   Run: node scripts/_dbm-fold-landing.js [--dry-run]

   ⚠⚠ THE HUB CARD SHIPS THE ENGLISH PRODUCT NAME IN ALL ELEVEN TITLE
   SLOTS and ONE byte-identical English placeholder in all ten non-
   English descriptions, while the tool itself localises correctly
   (de "Das Scharnier", fr "La charnière", fi "Sarana"). Every panel
   found it independently. Whatever gate covers the tool strings does
   not reach the card, which is why this exists.

   ⚠ FROZEN: `slug`, `name` and `metaTitle` are SEO identity under the
   §21.5a churn freeze and are never touched here. Several panels flagged
   that the frozen slugs name a counter noun the tool does not use
   (de Plättchen, sv brickor, fi nappuloilla, pt/es fichas) — that is a
   deliberate operator decision, not something a fold may quietly fix.

   ⚠ PANELS RETURNED TWO SHAPES. A full array (`about: [...]`) replaces;
   an indexed key (`"about[2]": "…"`) patches one row. Both are honoured,
   because refusing the second would silently drop a panel's only change.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.indexOf('--dry-run') >= 0;
const PANELS = process.env.DBM_PANEL_DIR || path.join(
  process.env.TEMP || '/tmp', 'claude', 'C--Users-rkgen-lessoncraftstudio',
  'f666d094-0b99-46ab-acfe-859fd297d219', 'scratchpad', 'dbm-locales');
const TC = path.join(__dirname, '..', 'frontend', 'messages', 'tool-content');
const MAN = path.join(__dirname, '..', 'frontend', 'lib', 'manipulatives.ts');
const LOCALES = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const ARRAYS = ['about', 'howToUse', 'classroomIdeas'];
const SCALARS = ['tagline', 'metaDescription'];

const fails = [];
let landed = 0, carded = 0, rows = 0;

/* ---- 1. the landing pages ---------------------------------------- */
const written = {};
LOCALES.forEach(function (L) {
  const pf = path.join(PANELS, L + '.json');
  if (!fs.existsSync(pf)) { fails.push(L + ': no panel file'); return; }
  const p = JSON.parse(fs.readFileSync(pf, 'utf8'));
  const lg = p.landing || {};
  const tf = path.join(TC, L + '.json');
  const j = JSON.parse(fs.readFileSync(tf, 'utf8'));
  const d = j['doubling-mirror'];
  if (!d) { fails.push(L + ': no doubling-mirror entry in tool-content'); return; }

  SCALARS.forEach(function (k) {
    if (typeof lg[k] === 'string' && lg[k].length) { d[k] = lg[k]; rows++; }
  });
  ARRAYS.forEach(function (k) {
    if (Array.isArray(lg[k]) && lg[k].length) { d[k] = lg[k]; rows += lg[k].length; return; }
    /* indexed patches: "about[2]" */
    Object.keys(lg).forEach(function (key) {
      const m = new RegExp('^' + k + '\\[(\\d+)\\]$').exec(key);
      if (!m) return;
      const i = Number(m[1]);
      if (!Array.isArray(d[k])) { fails.push(L + '.' + k + ' is not an array'); return; }
      if (i >= d[k].length) { fails.push(L + '.' + key + ' is out of range (' + d[k].length + ' rows)'); return; }
      if (typeof lg[key] !== 'string' || !lg[key].length) return;
      /* a panel that sent an ellipsis placeholder meant "unchanged" */
      if (/^\s*…\s*$/.test(lg[key]) || /^…/.test(lg[key]) && lg[key].length < 12) return;
      d[k][i] = lg[key]; rows++;
    });
  });
  ['slug', 'name', 'metaTitle'].forEach(k => {
    if (!d[k]) fails.push(L + ': frozen field `' + k + '` vanished');
  });
  written[L] = { file: tf, json: j };
  landed++;
});

/* ---- 2. the hub card --------------------------------------------- */
let man = fs.readFileSync(MAN, 'utf8');
const manNL = man.indexOf('\r\n') >= 0;
man = man.replace(/\r\n/g, '\n');
const at = man.indexOf('id: "doubling-mirror"');
if (at < 0) fails.push('manipulatives: no doubling-mirror card');

function patchField(src, startAt, field, values) {
  /* find `field: {` after startAt, then replace the whole object */
  const re = new RegExp('(\\n(\\s*)' + field + ': \\{)');
  const m = re.exec(src.slice(startAt));
  if (!m) return null;
  const s0 = startAt + m.index;
  let i = s0 + m[0].length, depth = 1, q = 0;
  for (; i < src.length && depth > 0; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = 0; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++; else if (c === '}') depth--;
  }
  if (depth !== 0) return null;
  const ind = m[2];
  const body = ['en'].concat(LOCALES).map(L =>
    '\n' + ind + '  ' + L + ': ' + JSON.stringify(values[L])).join(',');
  return src.slice(0, s0) + '\n' + ind + field + ': {' + body + '\n' + ind + '}' + src.slice(i);
}

if (at >= 0) {
  const cur = require(path.join(__dirname, '..', 'frontend', 'messages', 'tool-content', 'en.json'))['doubling-mirror'];
  ['title', 'tagline', 'description'].forEach(function (field) {
    const vals = { en: field === 'title' ? cur.name : field === 'tagline' ? cur.tagline : cur.about[1] };
    let missing = 0;
    LOCALES.forEach(function (L) {
      const pf = path.join(PANELS, L + '.json');
      if (!fs.existsSync(pf)) { missing++; return; }
      const p = JSON.parse(fs.readFileSync(pf, 'utf8'));
      const c = p.card || {};
      const v = c[field];
      if (typeof v === 'string' && v.length > 1 && !/^…/.test(v)) vals[L] = v;
      else missing++;
    });
    if (missing) { fails.push('card.' + field + ': ' + missing + ' locales have no value'); return; }
    const next = patchField(man, at, field, vals);
    if (!next) { fails.push('card.' + field + ': could not find the block'); return; }
    man = next; carded++;
  });
}

if (fails.length) {
  console.log('FAULTS (' + fails.length + '):');
  fails.slice(0, 20).forEach(f => console.log('  ✗ ' + f));
  process.exit(1);
}

console.log('landing: ' + landed + ' locales, ' + rows + ' rows folded');
console.log('card: ' + carded + '/3 fields x 11 locales');
if (DRY) { console.log('(dry run — nothing written)'); process.exit(0); }
Object.keys(written).forEach(L => {
  fs.writeFileSync(written[L].file, JSON.stringify(written[L].json, null, 2) + '\n', 'utf8');
});
fs.writeFileSync(MAN, manNL ? man.replace(/\n/g, '\r\n') : man, 'utf8');
console.log('wrote ' + landed + ' tool-content files + manipulatives.ts');
