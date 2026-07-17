#!/usr/bin/env node
/* =====================================================================
   build-dossier.js — the review substrate for the Vocabulary
   Correctness Arc (11-locale native audit of image-vocabulary.js).

   WHY THIS EXISTS
   ---------------
   `REFERENCE TRANSLATIONS/image-vocabulary.js` holds 1,263 keys x 11
   locales = 13,893 plural forms, and NOT ONE was authored by a human:
   scripts/build-image-vocabulary.js synthesizes every plural from the
   singular by rule ("literal set -> suffix match -> naive default").
   The naive defaults ARE the bug (de: -el/-er/-en left unchanged; nl:
   gender defaults to 'd'; sv/da/no: blanket zero-plural for neuters;
   fi: agglutination unmodeled). This file assembles what a native
   linguist needs to rule on each word, one word at a time.

   THE LOAD-BEARING FIELD IS `themes`.
   -----------------------------------
   image-vocabulary.js is keyed FLAT with no theme field — the noun's
   subject lives ONLY in the filesystem. Without it a linguist cannot
   rule, and the file's worst bugs are exactly the ambiguous ones:
     · `orange`  — the fruit (pluralizes) or the colour (never)?
     · `bat`     — the animal or the baseball bat?
     · `salt`    — kitchen mass noun, or chemistry's countable `die Salze`?
     · `pepper`  — de currently reads ["Paprika","Pfeffer"]: the bell
                   pepper and the spice. Two different words in one entry.
   So we recover the theme relation by walking the image library, the
   same way scripts/build-pww-index.js does (that walk is proven live).

   `_type` / `_countable` come from scripts/v2-data/image-vocabulary-raw.json,
   which carries this metadata for 1,246 keys and which the BUILD THROWS
   AWAY. 121 keys are _countable:false; 37 adjective / 35 verb-gerund /
   9 proper-noun / 6 noun-concept. It is a free pre-classification layer
   — but it is EVIDENCE FOR THE NATIVE, never a verdict (§A.13.58: audit
   output is a BASELINE, not the list).

   THE 17 ORPHANS: the built file has 1,263 keys, raw has 1,246. The 17
   built-only keys (mother/father/family/... + 9 bare verbs) have no raw
   metadata and get _type:null — they are flagged, not guessed at.

   READ-ONLY. Writes only under docs/audit-results/vocab-audit/.
   Never mutates image-vocabulary.js, the raw JSON, or the DB.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..', '..');
const VOCAB_FILE = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
const RAW_FILE = path.join(REPO, 'scripts', 'v2-data', 'image-vocabulary-raw.json');
const THEMES_DIR = path.join(REPO, 'image-library-webp', 'themes');
const TAXONOMY = path.join(REPO, 'frontend', 'config', 'topics-taxonomy.json');
const OUT_DIR = path.join(REPO, 'docs', 'audit-results', 'vocab-audit');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* The per-locale gender legend — §A.13.58 per-locale gender authority.
   NEVER cross-apply a code: sv/da `n` is COMMON (en-word) while no `n`
   is NEUTER; nl uses d/h, not m/f/n. Cross-applying is the classic
   catastrophic error ("ett katt"). Used for the dossier's legend line
   so each native sees ITS OWN convention, not a generic one. */
const GENDER_LEGEND = {
  de: 'm=maskulin (der) · f=feminin (die) · n=neutrum (das)',
  fr: 'm=masculin (le) · f=féminin (la)',
  it: 'm=maschile (il/lo) · f=femminile (la)',
  es: 'm=masculino (el) · f=femenino (la)',
  pt: 'm=masculino (o) · f=feminino (a)',
  nl: 'd=de-woord (common) · h=het-woord (neuter)  ← NOT m/f/n',
  sv: 'n=en-ord (COMMON/utrum) · t=ett-ord (neutrum)  ← n is COMMON, not neuter',
  da: 'n=en-ord (COMMON/fælleskøn) · t=et-ord (neutrum)  ← n is COMMON, not neuter',
  no: 'm=en-ord (masculine/common) · n=et-ord (NEUTER)  ← n is NEUTER here, unlike sv/da',
  en: '(no grammatical gender)',
  fi: '(no grammatical gender)',
};

/* Theme-wide key alias — the `tree` theme's files are bare species names
   (tree/apple@2x.webp is an apple TREE, whose vocab key is `apple-tree`;
   the naive join hits `apple` -> "der Apfel"). Proven in build-pww-index.js. */
const THEME_KEY_ALIAS = { tree: (k) => k + '-tree' };

function loadVocab() {
  const sb = { window: {} };
  sb.global = sb;
  vm.createContext(sb);
  vm.runInContext(fs.readFileSync(VOCAB_FILE, 'utf8') + '\n;globalThis.__V = IMAGE_VOCABULARY;', sb);
  return sb.__V;
}

/* filename -> vocab key (proven in build-pww-index.js:102) */
function normalizeKey(base) {
  return base.toLowerCase().replace(/@\dx$/, '').replace(/_/g, '-').replace(/\s+/g, '-').replace(/-\d+$/, '');
}
function folderForKey(key, dirs) {
  const want = key.replace(/_/g, ' ').toLowerCase();
  for (const d of dirs) if (d.toLowerCase() === want) return d;
  return null;
}

/* ---- recover key -> themes[] from the filesystem (the disambiguator) ---- */
function buildThemeMap() {
  const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
  const themeAxis = (taxonomy.axes && taxonomy.axes.theme) || {};
  const dirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  const map = {};   /* key -> Set(themeKey) */
  /* B&W themes are the SAME nouns as their colour twins — for the
     disambiguator we want the semantic theme, so fold `_bw` onto its
     base rather than carrying 50 duplicate labels. */
  for (const tkey of Object.keys(themeAxis)) {
    const folder = folderForKey(tkey, dirs);
    if (!folder) continue;
    const base = tkey.replace(/_bw(_\d+)?$/, '');
    const alias = THEME_KEY_ALIAS[base];
    let files;
    try { files = fs.readdirSync(path.join(THEMES_DIR, folder)).filter((f) => /@2x\.webp$/.test(f)); }
    catch (e) { continue; }
    for (const f of files) {
      let vkey = normalizeKey(f.replace(/@2x\.webp$/, ''));
      if (alias) vkey = alias(vkey);
      (map[vkey] || (map[vkey] = new Set())).add(base);
    }
  }
  return map;
}

function main() {
  const vocab = loadVocab();
  const raw = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8'));
  const themeMap = buildThemeMap();
  const keys = Object.keys(vocab).sort();

  const rows = keys.map((k) => {
    const r = raw[k] || null;
    const themes = themeMap[k] ? Array.from(themeMap[k]).sort() : [];
    const row = {
      key: k,
      themes: themes,
      orphan: !r,                       /* built-file-only; no raw metadata */
      type: r ? (r._type || null) : null,
      countable: r ? (r._countable !== undefined ? r._countable : null) : null,
      loc: {},
    };
    for (const l of LOCALES) {
      const e = vocab[k][l];
      row.loc[l] = { s: e[0], p: e[1], g: e.length > 2 ? e[2] : null, same: e[0] === e[1] };
    }
    return row;
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'dossier.json'),
    JSON.stringify({ v: 1, built: keys.length, rawKeys: Object.keys(raw).length, locales: LOCALES, genderLegend: GENDER_LEGEND, rows: rows }, null, 0) + '\n');

  /* ---- report ---- */
  const orphans = rows.filter((r) => r.orphan);
  const noImage = rows.filter((r) => !r.themes.length);
  const byType = {};
  for (const r of rows) byType[r.type === null ? '(orphan/none)' : r.type] = (byType[r.type === null ? '(orphan/none)' : r.type] || 0) + 1;

  console.log('dossier: ' + rows.length + ' keys  (raw ' + Object.keys(raw).length + ', orphans ' + orphans.length + ')');
  console.log('  _type:      ' + JSON.stringify(byType));
  console.log('  _countable:false: ' + rows.filter((r) => r.countable === false).length);
  console.log('  themes recovered: ' + rows.filter((r) => r.themes.length).length + '/' + rows.length +
              '   (multi-theme: ' + rows.filter((r) => r.themes.length > 1).length + ')');
  if (noImage.length) {
    /* themes=[] means NO FILE in the image library resolves to this key —
       i.e. DEAD DATA: no app can ever render it (every consumer picks
       from image themes). Verified: the key drifted from the filename
       (`t-rex` vs the file `tyrannosaurus_rex`; `light-bulb` vs `bulb`)
       or the art was never drawn (`salad`, `octagon`, `yogurt`).
       They still get native review per the operator's directive, but
       they are the lowest-value corrections in the arc — flag, don't
       silently spend an expert's attention on them. */
    console.log('  ⚠ NO IMAGE resolves to these keys — DEAD DATA, never rendered: ' + noImage.length +
                ' (' + (100 * noImage.length / rows.length).toFixed(1) + '%)');
    console.log('     ' + noImage.map((r) => r.key).join(', '));
  }
  console.log('  ⚠ orphans (no raw _type/_countable): ' + orphans.map((r) => r.key).join(', '));

  /* the ambiguity cases the theme field exists to resolve */
  console.log('\n  the disambiguator at work:');
  for (const k of ['orange', 'bat', 'salt', 'pepper', 'lime', 'violet', 'guitar']) {
    const r = rows.find((x) => x.key === k);
    if (r) console.log('    ' + k.padEnd(8) + ' themes=[' + r.themes.join(', ') + ']  type=' + r.type + '  de=' + JSON.stringify([r.loc.de.s, r.loc.de.p]));
  }
  console.log('\n→ ' + path.relative(REPO, path.join(OUT_DIR, 'dossier.json')));
}

main();
