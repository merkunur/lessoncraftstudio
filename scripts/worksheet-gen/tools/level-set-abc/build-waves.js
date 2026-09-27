#!/usr/bin/env node
/**
 * build-waves.js — the Alphabetical Order Level Set waves (2026-09-27), one per locale.
 *
 * For each face × level × copy it picks a THEME (a new theme = new words to put in order —
 * a genuinely new worksheet, never the same pool reshuffled), verified by building the
 * instance with its EXACT seed (the render must not have to swap a pinned theme):
 *   - never the face's published theme (that page exists) and never a theme twice in one face;
 *   - never a colour theme AND its black-and-white twin in one face (same word pool);
 *   - colour and black-and-white alternate copy by copy;
 *   - only themes registered in the taxonomy theme axis (slug + topic links).
 *
 *   node tools/level-set-abc/build-waves.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const { themeAxisKey } = require('../../emit/manifest.js');
const m = require('../../image-cache/resolve.js').manifest();
const TAX = require('../../../../frontend/config/topics-taxonomy.json');

const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const FACES = { 'G1-245': 'animals', 'G1-262': 'fruits', 'G1-263': 'vehicles', 'G1-264': 'toys' };   // face → its published theme
const PLAN = { 1: [1, 2, 3, 4, 5], 2: [2, 3, 4, 5, 6], 3: [1, 2, 3, 4, 5] };                         // level → copies (level 2 copy 1 is published)

const family = (t) => String((m.themes[t] && m.themes[t].bw && m.themes[t].baseTheme) || t.replace(/ bw( \d+)?$/i, '')).toLowerCase();
// themes whose pictures do not show what their word says — never on a word worksheet
// (`tree`: fruit TREES labelled with the FRUIT word — "apple" under an apple tree; 2026-09-28)
const NEVER = new Set(['tree', 'tree bw']);
const all = Object.keys(m.themes).filter((t) => TAX.axes.theme[themeAxisKey(t)] && !NEVER.has(t.toLowerCase())).sort();
const colour = all.filter((t) => !m.themes[t].bw), bw = all.filter((t) => m.themes[t].bw);

// the page <title> exactly as emit composes it (a >70-char title fails the publish audit)
const { buildManifest } = require('../../emit/manifest.js');
const { buildDeckHtml } = require('../../emit/deck-html.js');
const { resolveStrings } = require('../../i18n/strings.js');
const TINY = { dataUri: 'data:,', width: 1, height: 1 };
function titleFits(spec, theme, level, copy, loc) {
  const strings = resolveStrings(spec.id, loc, spec);
  const manifest = buildManifest({ spec, cacheTheme: theme, difficulty: level, locale: loc, variant: copy, deckId: 'x', generatedAt: 'x', strings, imagesUsed: [] });
  const html = buildDeckHtml({ manifest, spec, strings, locale: loc, preview: TINY });
  const t = (/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '';
  return t.length <= 70;
}

function builds(spec, theme, level, copy, loc) {
  if (!titleFits(spec, theme, level, copy, loc)) return false;
  try {
    const seed = instanceSeed({ typeId: spec.id, theme, difficulty: level, seedEpoch: 1, variant: copy, unit: null });
    spec.build({ theme, difficulty: level, locale: loc }, { rng: makeRng(seed), variant: copy });
    return true;
  } catch (e) { return false; }
}

const report = [];
for (const loc of LOCALES) {
  const levels = {};
  // theme families already used by ANY face at a level — preferred against, so one set never
  // shows the same words in two faces (measured: sv music at level 3 in both G1-245 and G1-264)
  const usedAtLevel = { 1: new Set(), 2: new Set(), 3: new Set() };
  const faceIds = Object.keys(FACES);
  for (const [id, published] of Object.entries(FACES)) {
    const spec = loadType(id);
    const usedFamilies = new Set([family(published)]);
    levels[id] = {};
    let k = 0;   // copy counter across the face — alternates colour / B&W
    for (const [lv, copies] of Object.entries(PLAN)) {
      levels[id][lv] = [];
      for (const copy of copies) {
        const pools = k++ % 2 === 0 ? [colour, bw] : [bw, colour];
        // deterministic but spread: start each pool at a face/level/copy-dependent offset
        let pick = null;
        for (const pool of pools) {
          const off = (faceIds.indexOf(id) * 37 + Number(lv) * 13 + copy * 29 + LOCALES.indexOf(loc) * 3) % pool.length;
          for (const avoidOthers of [true, false]) {
            for (let i = 0; i < pool.length && !pick; i++) {
              const t = pool[(off + i) % pool.length];
              if (usedFamilies.has(family(t))) continue;
              if (avoidOthers && usedAtLevel[lv].has(family(t))) continue;
              if (builds(spec, t, Number(lv), copy, loc)) pick = t;
            }
            if (pick) break;
          }
          if (pick) break;
        }
        if (!pick) throw new Error(`build-waves: no theme for ${id} level ${lv} copy ${copy} in ${loc}`);
        usedFamilies.add(family(pick));
        usedAtLevel[lv].add(family(pick));
        levels[id][lv].push({ copy, theme: pick });
      }
    }
  }
  const wave = {
    id: 'wave-abc-' + loc,
    _note: 'Level Set 2026-09-27: Alphabetical Order (G1-245 + 3 faces), 3 levels x 5 copies, each copy a different verified theme (tools/level-set-abc/build-waves.js). Visible to teachers, never indexed; PDF + interactive screen version + answer key.',
    indexable: false, interactive: true, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
    types: Object.keys(FACES), levels,
  };
  fs.writeFileSync(path.join(__dirname, '..', '..', 'waves', 'wave-abc-' + loc + '.json'), JSON.stringify(wave, null, 2) + '\n');
  const bwCount = Object.values(levels).flatMap((l) => Object.values(l).flat()).filter((c) => m.themes[c.theme].bw).length;
  report.push(`${loc}: ${Object.values(levels).flatMap((l) => Object.values(l).flat()).length} copies, ${bwCount} black-and-white`);
}
console.log(report.join('\n'));
