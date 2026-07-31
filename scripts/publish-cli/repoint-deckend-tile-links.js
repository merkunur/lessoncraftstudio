#!/usr/bin/env node
/* =====================================================================
   repoint-deckend-tile-links.js — point suggestion-strip tiles at landings
   ---------------------------------------------------------------------
   Every deck.html carries a "Try one of these next" strip whose six tiles
   linked to `/<locale>/decks/<slug>/`. Where that deck HAS a tier-3 landing,
   the URL is canonicalized away and served X-Robots-Tag:noindex — so across
   the catalog that is on the order of 270k internal links pointing into
   non-indexable space, which is where the crawl budget went.

   WHY NOT `inject-deck-end-strip.js --rewrite`
   --------------------------------------------
   That path removes and REBUILDS the strip, which (a) re-rolls the six
   suggestions, thumbnails and localized titles for no reason, and (b) cannot
   touch the ~11% of decks emitted by scripts/worksheet-gen — they have a strip
   but no `<div class="lcs-celebration"` anchor, so re-insertion fails and the
   deck is skipped (measured: 675 of 6093 EN version dirs). Those decks would
   have kept their bad links.

   This script instead REWRITES ONLY THE HREF of existing tiles. It is shape-
   agnostic, so it covers both emitters, and it changes nothing else.

   THE RULE (§22.1 conditional repoint)
   ------------------------------------
   A tile points to `/<locale>/worksheets/<landing>` IFF that deck has a
   landing; otherwise it KEEPS `/decks/`. Landing-less decks are self-canonical
   and indexable — linking to them is correct, not a defect. The landing lookup
   is the shared resolver in landing-map.js, i.e. the same map the canonical
   repointer uses, so a tile target and that deck's canonical cannot disagree.

   Also normalizes apex-host thumbnail `src` to www (§A.10): those came from DB
   columns written by publish.js, which used the apex host until this same
   commission fixed it.

   Idempotent (a second run reports 0 changes), atomic (.tmp + rename), and
   walks VERSION DIRS not symlinks (soft-consolidation leaves two symlinks per
   deck, so symlink-walking double-processes — see inject-deck-end-strip.js:58).

   Usage:
     node scripts/publish-cli/repoint-deckend-tile-links.js --locales=en [--apply]
   Default is DRY-RUN. --locales=all for every locale.
   ===================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const landingMap = require('./landing-map');

const DECKS_ROOT = '/var/www/lcs-media/decks';
const ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];

const argv = process.argv.slice(2);
const arg = (k, d) => {
  const a = argv.find((s) => s.startsWith('--' + k + '='));
  return a ? a.slice(k.length + 3) : d;
};
const APPLY = argv.includes('--apply');
const LIMIT = parseInt(arg('limit', '0'), 10) || 0;
const localesArg = arg('locales', 'en');
const LOCALES = localesArg === 'all' ? ALL_LOCALES : localesArg.split(',').map((s) => s.trim()).filter(Boolean);

// <a href="https://www.lessoncraftstudio.com/<loc>/decks/<slug>/" class="lcs-deckend-tile">
// Anchored on the class so ONLY suggestion tiles are touched — never the deck's
// own canonical, its og-image/thumbnail/PDF asset URLs, or share links.
const TILE_RE =
  /(<a href=")https:\/\/www\.lessoncraftstudio\.com\/([a-z]{2})\/decks\/([^"/]+)\/(" class="lcs-deckend-tile">)/g;

const APEX_SRC = 'src="https://lessoncraftstudio.com/';
const WWW_SRC = 'src="https://www.lessoncraftstudio.com/';

function atomicWrite(file, content) {
  const tmp = file + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, file);
}

function versionDirs(localeDir) {
  let entries = [];
  try {
    entries = fs.readdirSync(localeDir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => e.isDirectory() && /-v\d+$/.test(e.name))
    .map((e) => path.join(localeDir, e.name));
}

const stats = {};
let grandTiles = 0;
let grandRepointed = 0;

for (const locale of LOCALES) {
  const dirs = versionDirs(path.join(DECKS_ROOT, locale));
  const s = { dirs: dirs.length, files: 0, changed: 0, tiles: 0, repointed: 0, kept: 0, apexFixed: 0 };

  let n = 0;
  for (const dir of dirs) {
    if (LIMIT && n >= LIMIT) break;
    const file = path.join(dir, 'deck.html');
    let html;
    try {
      html = fs.readFileSync(file, 'utf8');
    } catch {
      continue;
    }
    s.files++;
    n++;

    let repointed = 0;
    let kept = 0;
    const next = html.replace(TILE_RE, (m, pre, loc, slug, post) => {
      s.tiles++;
      const landing = landingMap.landingURLForDeck(loc, slug);
      if (!landing) {
        kept++;
        return m; // landing-less deck: /decks/ is the correct target
      }
      repointed++;
      return pre + landing + post;
    });

    let out = next;
    let apexFixed = 0;
    if (out.indexOf(APEX_SRC) !== -1) {
      apexFixed = out.split(APEX_SRC).length - 1;
      out = out.split(APEX_SRC).join(WWW_SRC);
    }

    s.repointed += repointed;
    s.kept += kept;
    s.apexFixed += apexFixed;

    if (out !== html) {
      s.changed++;
      if (APPLY) atomicWrite(file, out);
    }
  }

  stats[locale] = s;
  grandTiles += s.tiles;
  grandRepointed += s.repointed;

  console.log(
    `[${locale}] dirs=${s.dirs} files=${s.files} changed=${s.changed} ` +
      `tiles=${s.tiles} repointed=${s.repointed} kept-as-decks=${s.kept} apex-src-fixed=${s.apexFixed}`
  );
}

console.log('');
console.log(`mode: ${APPLY ? 'APPLY' : 'DRY-RUN'}`);
console.log(
  `total tiles=${grandTiles} repointed=${grandRepointed} kept-as-decks=${grandTiles - grandRepointed}` +
    (grandTiles ? ` (${((grandRepointed / grandTiles) * 100).toFixed(1)}% now point at a landing)` : '')
);
