#!/usr/bin/env node
/* =====================================================================
   build-activity-picture-index.js — the library picture door for ACTIVITIES.
   ---------------------------------------------------------------------
   Writes one small JSON per COLOUR theme directory of the image library:
     mini tools/pictures/<dir>.json
       { dir, nouns: { <noun>: { key, src, labels: { en:[sg,pl], de:[sg,pl,g], … } } } }
   consumed at runtime by `mini tools/lcs-pictures.js`. The activity law
   (docs/activities-rebuild/LAW.md rule 4): pictures come ONLY from the
   library, colour themes only, labelled from image-vocabulary.js in the
   page locale, refusals honoured. Every activity that shows a picture
   reads one of these files; none hard-codes a URL or a label.

   Rules (shared with scripts/worksheet-gen/lib/b3-picture-index.js):
     • a directory whose name ends in `bw` or `bw <n>` is black-and-white
       art and is skipped (memory: BW test `bw(\s+\d+)?$`); BACKGROUNDS /
       BORDERS / decoration dirs are skipped;
     • a noun is the file stem with a trailing number stripped (`cat 2` →
       `cat`), and ships only when image-vocabulary.js knows the key —
       a picture without a word is not a picture an activity may show;
     • (dir|noun) pairs in lib/picture-refusals.js are dropped (the
       operator's "this picture is not what its name says" list);
     • the @2x.webp must exist on disk (it is the size activities use).

   Usage: node scripts/build-activity-picture-index.js [--verify]
     --verify  rebuilds in memory and FAILS if the files on disk differ,
               if any index names a file that is missing, or if any BW dir
               slipped in (poison: LCS_PICTURE_POISON=bw adds "animals bw").
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..');
const THEMES = path.join(REPO, 'image-library-webp', 'themes');
const OUT = path.join(REPO, 'mini tools', 'pictures');
const VOCAB_SRC = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
const { PICTURE_REFUSALS } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'lib', 'picture-refusals.js'));
const VERIFY = process.argv.includes('--verify');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW_RE = /\bbw(\s+\d+)?$/i;
const SKIP_DIRS = new Set(['BACKGROUNDS', 'BORDERS']);

function loadVocab() {
  const src = fs.readFileSync(VOCAB_SRC, 'utf8');
  const m = src.match(/const IMAGE_VOCABULARY = (\{[\s\S]*?\n\});/);
  if (!m) throw new Error('image-vocabulary.js: IMAGE_VOCABULARY block not found');
  // eslint-disable-next-line no-new-func
  return new Function('return (' + m[1] + ');')();
}
const nounOf = (stem) => stem.replace(/\s*\d+$/, '').trim().toLowerCase();
/* A file stem that names a DIFFERENT vocab entry than its own spelling: tools/nail is a metal nail, but
   vocab `nail` is the fingernail (fr Ongle, es Uña, da Negl …) — the metal one is `metal-nail` (fr Clou, da Søm). */
const KEY_ALIAS = { 'tools|nail': 'metal-nail' };

function build() {
  const vocab = loadVocab();
  let dirs = fs.readdirSync(THEMES).filter((d) => fs.statSync(path.join(THEMES, d)).isDirectory());
  /* poison: force a B&W dir PAST the builder's own skip, so --verify must be
     the one that catches it (a poison the builder quietly skips tests nothing) */
  const poison = process.env.LCS_PICTURE_POISON === 'bw' ? 'animals bw' : null;
  if (poison) dirs = dirs.concat([poison]);
  const index = {};
  const stats = { dirs: 0, nouns: 0, skippedBw: 0, noVocab: 0, refused: 0 };
  for (const dir of dirs) {
    if (SKIP_DIRS.has(dir)) continue;
    if (BW_RE.test(dir) && dir !== poison) { stats.skippedBw++; continue; }
    const files = fs.existsSync(path.join(THEMES, dir)) ? fs.readdirSync(path.join(THEMES, dir)) : [];
    const nouns = {};
    for (const f of files) {
      if (!/@2x\.webp$/i.test(f)) continue;
      const stem = f.replace(/@2x\.webp$/i, '');
      const key = nounOf(stem);
      const labelKey = KEY_ALIAS[dir + '|' + key] || key;   /* the noun keeps its file name; its WORDS come from the alias */
      if (!vocab[key]) { stats.noVocab++; continue; }
      if (PICTURE_REFUSALS.has(dir + '|' + key) || PICTURE_REFUSALS.has(dir + '|' + stem)) { stats.refused++; continue; }
      if (nouns[key]) continue;              // first variant wins (cat before "cat 2")
      const labels = {};
      for (const l of LOCALES) labels[l] = vocab[labelKey][l];
      nouns[key] = { key, src: '/image-library-webp/themes/' + dir + '/' + stem + '@2x.webp', labels };
      stats.nouns++;
    }
    if (Object.keys(nouns).length === 0) continue;
    index[dir] = { dir, nouns };
    stats.dirs++;
  }
  return { index, stats };
}
const fileNameFor = (dir) => dir.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.json';

const { index, stats } = build();
if (!VERIFY) {
  fs.mkdirSync(OUT, { recursive: true });
  const manifest = {};
  for (const dir of Object.keys(index).sort()) {
    const file = fileNameFor(dir);
    fs.writeFileSync(path.join(OUT, file), JSON.stringify(index[dir]));
    manifest[dir] = { file, count: Object.keys(index[dir].nouns).length };
  }
  fs.writeFileSync(path.join(OUT, '_themes.json'), JSON.stringify(manifest, null, 1));
  console.log('picture index written:', stats);
} else {
  let fail = 0;
  for (const dir of Object.keys(index)) {
    if (BW_RE.test(dir)) { console.error('FAIL bw dir in index: ' + dir); fail++; }
    const file = path.join(OUT, fileNameFor(dir));
    if (!fs.existsSync(file)) { console.error('FAIL missing on disk: ' + file); fail++; continue; }
    const disk = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (JSON.stringify(disk) !== JSON.stringify(index[dir])) { console.error('FAIL stale index: ' + file + ' (re-run the builder)'); fail++; }
    for (const n of Object.values(index[dir].nouns)) {
      const p = path.join(REPO, decodeURIComponent(n.src.replace(/^\//, '')));
      if (!fs.existsSync(p)) { console.error('FAIL picture missing: ' + n.src); fail++; }
    }
  }
  if (Object.keys(index).length < 40) { console.error('FAIL implausibly few theme dirs: ' + Object.keys(index).length); fail++; }
  console.log((fail ? 'FAIL ' : 'PASS ') + 'picture index: ' + Object.keys(index).length + ' dirs, ' + stats.nouns + ' nouns, ' + fail + ' defects');
  process.exit(fail ? 1 : 0);
}
