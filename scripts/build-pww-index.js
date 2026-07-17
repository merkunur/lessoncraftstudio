#!/usr/bin/env node
/* =====================================================================
   build-pww-index.js — generates the Picture Word Wall's card index.

   THE ENABLING ARTIFACT. The vocabulary (REFERENCE TRANSLATIONS/
   image-vocabulary.js) is keyed FLAT by noun with NO theme field; the
   theme→noun relation lives ONLY in the filesystem directory structure.
   Shipped tools hand-author 10-20 nouns each; PWW needs ~1,422 across
   47 themes, so the index is generated at build time and committed.

   Emits ONE FILE PER LOCALE (~59 KB raw / ~15 KB gzip for all themes —
   the entire word index gzips smaller than one card image). Words are
   BAKED here, so the client never loads the 492 KB vocab file (which
   isn't window-exported anyway) and never re-authors data (§10.4
   read-from-SoT; scripts/verify-picture-word-wall.js enforces
   byte-equality back to the vocabulary).

   The five landmines this script defuses (all recon-verified):
     1. B&W themes — the documented §20.5 localized-marker rule LEAKS 7
        of 50 ("B&W" / "S/H" / "(B/N)" punctuation variants + a medial
        number in classroom_bw_2). The axis KEY suffix /_bw(_\d+)?$/ is
        50/50 with zero false positives. We filter on the key.
     2. The `tree` theme silently joins to the FRUIT — tree/apple@2x.webp
        is an apple TREE but naively hits vocab `apple` ("der Apfel").
        A theme-wide `-tree` suffix alias is applied FIRST for that
        theme; unresolved species are dropped (they have no vocab entry).
     3. Vocab keys are hyphenated, filenames underscored
        (french-fries ↔ french_fries@2x.webp) → `_`→`-` + trailing
        number strip (§20.5 `cat 2` → `cat`).
     4. 67 cards in colors/emotions/activities are adjectives/gerunds
        carrying FABRICATED genders (red→["Rot","Rot","m"]). They are
        marked `noArticle:true` so the wall renders them frameless in
        EVERY locale and never speaks "der Rot".
     5. sv/da gender `n` = COMMON (en-word), NOT neuter (§A.13.58) —
        the gender code is passed through verbatim; the article table
        in the tool owns the interpretation.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const REPO = path.join(__dirname, '..');
const THEMES_DIR = path.join(REPO, 'image-library-webp', 'themes');
const VOCAB_FILE = path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js');
const TAXONOMY = path.join(REPO, 'frontend', 'config', 'topics-taxonomy.json');
/* "mini tools/" is the SOURCE OF TRUTH in git (see .gitignore:100-106):
   frontend/public/mini-tools/* is only a dev mirror and is ignored, and
   /var/www/lcs-media/mini-tools/ is the served copy. Every sibling data
   file (array-activities.json, …) lives here, so the indexes do too —
   emitting them to the mirror left 11 untracked files that would have
   404'd in production and rendered every wall empty. */
const OUT_DIR = path.join(REPO, 'mini tools');

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* Themes whose entries are NOT article-bearing nouns: the vocabulary
   holds adjectives/gerunds with genders invented for Find-and-Count
   (red→["Rot","Rot","m"]). The wall renders these frameless — real K-3
   vocabulary, zero fabricated grammar. */
const NO_ARTICLE_THEMES = ['colors', 'emotions', 'activities'];

/* …and the per-(THEME, KEY) leaks. A theme list alone is not enough:
   five native ensembles independently found the same defect — weather
   is a MIXED theme (cloud/sun/umbrella are nouns; sunny/cloudy are
   ADJECTIVES carrying fabricated genders), so the wall said "der
   Sonnig", "el Soleado", "o Ensolarado", "en Overskyet". Planets are
   proper names ("un Jupiter"), and three gerunds leak in from non-na
   themes ("der Schwimmen", "der Skifahren").
   It must be per-KEY, not per-key-anywhere: 13 of the 16 dual-theme
   keys are correct POLYSEMY and must keep their articles —
   at_the_supermarket/orange is the fruit, music/guitar is une guitare,
   while colors/orange and activities/guitar are rightly frameless.
   `earth`/`moon`/`sun`/`santa`/`uncle-sam`/`usa` are NOT listed: their
   article varies by locale (fr la Terre, le Père Noël, les États-Unis),
   so they stay article-bearing and each native's `over` rules them. */
const NO_ARTICLE_KEYS = {
  weather: ['cloudy', 'cold', 'hot', 'partly-cloudy', 'rainy', 'stormy', 'sunny'],
  space: ['jupiter', 'mars', 'mercury', 'neptune', 'saturn', 'uranus', 'venus'],
  summer: ['swimming'],
  winter: ['skating', 'skiing'],
};

/* Theme-wide key aliases: the filename is not the vocab key. */
const THEME_KEY_ALIAS = {
  tree: (k) => k + '-tree',
};

const DRY = process.argv.includes('--dry-run');

/* ---- load the vocabulary (script-global const, no module.exports) ---- */
function loadVocab() {
  const src = fs.readFileSync(VOCAB_FILE, 'utf8');
  const sandbox = { window: {} };
  sandbox.global = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src + '\n;globalThis.__VOCAB = IMAGE_VOCABULARY;', sandbox);
  return sandbox.__VOCAB;
}

/* ---- filename → vocab key ---- */
function normalizeKey(base) {
  return base
    .toLowerCase()
    .replace(/@\dx$/, '')
    .replace(/_/g, '-')      /* french_fries → french-fries */
    .replace(/\s+/g, '-')
    .replace(/-\d+$/, '');   /* §20.5: "cat 2" → cat */
}

/* ---- theme key ↔ folder name (8 need case-insensitive matching) ---- */
function folderForKey(key, dirs) {
  const want = key.replace(/_/g, ' ').toLowerCase();
  for (const d of dirs) if (d.toLowerCase() === want) return d;
  return null;
}

function main() {
  const vocab = loadVocab();
  const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
  const themeAxis = taxonomy.axes && taxonomy.axes.theme;
  if (!themeAxis) { console.error('FAIL: axes.theme not found in topics-taxonomy.json'); process.exit(1); }

  const dirs = fs.readdirSync(THEMES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory()).map((d) => d.name);

  const allKeys = Object.keys(themeAxis);
  /* LANDMINE 1: filter B&W on the KEY, never the localized name */
  const colorKeys = allKeys.filter((k) => !/_bw(_\d+)?$/.test(k));

  const themes = [];
  const unresolved = [];
  let cardCount = 0;

  for (const key of colorKeys) {
    const folder = folderForKey(key, dirs);
    if (!folder) { unresolved.push(`THEME ${key}: no folder`); continue; }
    const files = fs.readdirSync(path.join(THEMES_DIR, folder)).filter((f) => /@2x\.webp$/.test(f));
    const alias = THEME_KEY_ALIAS[key];
    const themeNoArticle = NO_ARTICLE_THEMES.indexOf(key) >= 0;
    const keyNoArticle = NO_ARTICLE_KEYS[key] || [];
    const cards = [];
    for (const f of files) {
      const fileBase = f.replace(/@2x\.webp$/, '');
      let vkey = normalizeKey(fileBase);
      /* LANDMINE 2: the tree theme's files are bare species names */
      if (alias) vkey = alias(vkey);
      const entry = vocab[vkey];
      if (!entry) { unresolved.push(`${key}/${fileBase} → ${vkey}`); continue; }
      const noArticle = themeNoArticle || keyNoArticle.indexOf(vkey) >= 0;
      cards.push({ key: vkey, file: fileBase, noArticle: noArticle });
      cardCount++;
    }
    if (!cards.length) { unresolved.push(`THEME ${key}: 0 resolvable cards`); continue; }
    cards.sort((a, b) => a.key.localeCompare(b.key));
    themes.push({ key: key, folder: folder, cards: cards });
  }

  console.log(`themes: ${themes.length} (of ${colorKeys.length} color keys; ${allKeys.length - colorKeys.length} B&W excluded by key)`);
  console.log(`cards:  ${cardCount}`);
  console.log(`unresolved: ${unresolved.length}`);
  for (const u of unresolved.slice(0, 45)) console.log('   · ' + u);
  if (unresolved.length > 45) console.log(`   … +${unresolved.length - 45} more`);

  /* ---- per-locale emit ---- */
  for (const loc of LOCALES) {
    const out = { v: 1, locale: loc, themes: [] };
    for (const t of themes) {
      const name = themeAxis[t.key].name && themeAxis[t.key].name[loc];
      const cards = t.cards.map((c) => {
        const e = vocab[c.key][loc];
        const card = { k: c.key, f: c.file, s: e[0], p: e[1] };
        /* LANDMINE 5: the gender CODE is passed through verbatim; the
           tool's article table owns its per-locale interpretation
           (sv/da n = COMMON, not neuter). */
        if (e.length > 2 && !c.noArticle) card.g = e[2];
        /* LANDMINE 4: adjectives/gerunds never take an article */
        if (c.noArticle) card.na = 1;
        /* the identical-plural cards are THE LESSON, flagged for the UI */
        if (e[0] === e[1]) card.sp = 1;
        return card;
      });
      out.themes.push({ k: t.key, d: t.folder, n: name || t.key, c: cards });
    }
    const json = JSON.stringify(out);
    const file = path.join(OUT_DIR, `pww-index-${loc}.json`);
    if (!DRY) fs.writeFileSync(file, json + '\n');
    console.log(`${loc}: ${(json.length / 1024).toFixed(1)} KB${DRY ? ' (dry)' : ' → ' + path.basename(file)}`);
  }
  if (DRY) console.log('\nDRY-RUN — no files written');
}

main();
