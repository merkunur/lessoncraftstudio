#!/usr/bin/env node
/**
 * build-waves.js — the Level Set waves for one type, from a config (tools/level-set/<type>.config.js).
 * Generalised from tools/level-set-abc/build-waves.js (Alphabetical Order, 2026-09-27).
 *
 * For each face × level × copy it picks a THEME (a new theme = new words — a genuinely new
 * worksheet, never the same pool reshuffled), verified by building the instance with its EXACT
 * seed for the printed page AND the screen version, and by its real composed <title> (≤ 70):
 *   - never the face's published theme, never a theme twice in one face;
 *   - never a colour theme AND its black-and-white twin in one face (same word pool);
 *   - no theme family in two faces at one level (one set never repeats its words);
 *   - colour and black-and-white alternate copy by copy; only taxonomy-registered themes.
 *
 *   node tools/level-set/build-waves.js <type>      e.g. articles
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { loadType } = require('../../lib/load-types.js');
const { makeRng, instanceSeed } = require('../../lib/rng.js');
const { themeAxisKey, buildManifest } = require('../../emit/manifest.js');
const { buildDeckHtml } = require('../../emit/deck-html.js');
const { resolveStrings } = require('../../i18n/strings.js');
const m = require('../../image-cache/resolve.js').manifest();
const TAX = require('../../../../frontend/config/topics-taxonomy.json');

const cfg = require('./' + process.argv[2] + '.config.js');
const LOCALES = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const family = (t) => String((m.themes[t] && m.themes[t].bw && m.themes[t].baseTheme) || t.replace(/ bw( \d+)?$/i, '')).toLowerCase();
// themes whose pictures do not show what their word says — never on a word worksheet
// (`tree`: fruit TREES labelled with the FRUIT word — "apple" under an apple tree; 2026-09-28)
const NEVER = new Set(['tree', 'tree bw']);
const all = Object.keys(m.themes).filter((t) => TAX.axes.theme[themeAxisKey(t)] && !NEVER.has(t.toLowerCase())).sort();
const colour = all.filter((t) => !m.themes[t].bw), bw = all.filter((t) => m.themes[t].bw);
const TINY = { dataUri: 'data:,', width: 1, height: 1 };
// themes are near-twins when their NOUNS overlap, whatever their names say ("education bw" vs
// "classroom", "farm bw" vs "farm animals") — measured on the vocab keys each theme carries
const nounsOf = new Map(all.map((t) => [t, new Set(Object.values(m.themes[t].nouns).map((n) => n.vocabKey).filter(Boolean))]));
const twin = (a, b) => {
  if (family(a) === family(b)) return true;
  const A = nounsOf.get(a), B = nounsOf.get(b);
  if (!A || !B || !A.size || !B.size) return false;
  let n = 0; for (const x of A) if (B.has(x)) n++;
  return n / Math.min(A.size, B.size) >= 0.3;
};

function titleFits(spec, theme, level, copy, loc) {
  const strings = resolveStrings(spec.id, loc, spec);
  const manifest = buildManifest({ spec, cacheTheme: theme, difficulty: level, locale: loc, variant: copy, deckId: 'x', generatedAt: 'x', strings, imagesUsed: [] });
  const html = buildDeckHtml({ manifest, spec, strings, locale: loc, preview: TINY });
  return ((/<title>([^<]*)<\/title>/.exec(html) || [])[1] || '').length <= (cfg.titleMax || 70);
}
function builds(spec, theme, level, copy, loc) {
  if (!titleFits(spec, theme, level, copy, loc)) return false;
  const seed = instanceSeed({ typeId: spec.id, theme, difficulty: level, seedEpoch: 1, variant: copy, unit: null });
  try {
    for (const extra of [{}, { interactive: true }, { answerKey: true }]) {
      spec.build({ theme, difficulty: level, locale: loc }, { rng: makeRng(seed), variant: copy, ...extra });
    }
    return true;
  } catch (e) { return false; }
}

const report = [];
for (const loc of LOCALES) {
  const levels = {};
  const usedAtLevel = {};
  const faceIds = Object.keys(cfg.faces);
  for (const [id, face] of Object.entries(cfg.faces)) {
    const spec = loadType(id);
    const usedInFace = [face.published];
    let k = 0;
    for (const [lv, copies] of Object.entries(face.levels)) {
      if (!cfg.include(loc, id, Number(lv))) continue;
      usedAtLevel[lv] = usedAtLevel[lv] || [];
      // cfg.faceWideDistinct === false: themes must differ within a LEVEL (what a teacher prints
      // together), may recur between levels of a face (the task differs) — for locales whose
      // buildable, unrelated themes cannot cover 15 copies (fi noun-case tables)
      if (cfg.faceWideDistinct === false) usedInFace.length = 1;
      (levels[id] = levels[id] || {})[lv] = [];
      for (const copy of copies) {
        const pools = k++ % 2 === 0 ? [colour, bw] : [bw, colour];
        let pick = null;
        for (const pool of pools) {
          const off = (faceIds.indexOf(id) * 37 + Number(lv) * 13 + copy * 29 + LOCALES.indexOf(loc) * 3) % pool.length;
          for (const avoidOthers of [true, false]) {
            for (let i = 0; i < pool.length && !pick; i++) {
              const t = pool[(off + i) % pool.length];
              if (usedInFace.some((u) => twin(u, t))) continue;
              // first pass: no near-twin of another face's theme at this level; the fallback still
              // never repeats a theme (family) — it only tolerates a partial noun overlap
              if (usedAtLevel[lv].some((u) => (avoidOthers ? twin(u, t) : family(u) === family(t)))) continue;
              if (builds(spec, t, Number(lv), copy, loc)) pick = t;
            }
            if (pick) break;
          }
          if (pick) break;
        }
        if (!pick) throw new Error(`build-waves: no theme for ${id} level ${lv} copy ${copy} in ${loc}`);
        usedInFace.push(pick);
        usedAtLevel[lv].push(pick);
        levels[id][lv].push({ copy, theme: pick });
      }
    }
  }
  const types = Object.keys(levels);
  const wave = {
    id: 'wave-' + cfg.prefix + '-' + loc, _note: cfg.note,
    indexable: false, interactive: true, seedEpoch: 1, locales: [loc], themes: [], themesPerType: 1, difficulties: [1, 2, 3],
    types, levels,
  };
  fs.writeFileSync(path.join(__dirname, '..', '..', 'waves', wave.id + '.json'), JSON.stringify(wave, null, 2) + '\n');
  const copies = Object.values(levels).flatMap((l) => Object.values(l).flat());
  report.push(`${loc}: ${copies.length} copies, ${copies.filter((c) => m.themes[c.theme].bw).length} black-and-white`);
}
console.log(report.join('\n'));
