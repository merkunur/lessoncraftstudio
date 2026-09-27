#!/usr/bin/env node
/**
 * replace-tree.js — one-off (2026-09-28): the `tree` theme labels fruit TREES with the FRUIT word
 * ("apple" under an apple tree), so it is never valid on a word worksheet. Six live Alphabetical
 * Order copies used it. Each is re-assigned a colour theme that builds with its exact seed, keeps
 * a <=70-char title, and is no near-twin (noun overlap >= 30 %) of any theme already in its face or
 * at its level in another face. Writes the waves in place; prints old -> new.
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
const colour = Object.keys(m.themes).filter((t) => TAX.axes.theme[themeAxisKey(t)] && !m.themes[t].bw && t !== 'tree').sort();
const nounsOf = (t) => new Set(Object.values(m.themes[t].nouns).map((n) => n.vocabKey).filter(Boolean));
const base = (t) => String((m.themes[t].bw && m.themes[t].baseTheme) || t).toLowerCase();
const twin = (a, b) => { if (base(a) === base(b)) return true; const A = nounsOf(a), B = nounsOf(b); let n = 0; for (const x of A) if (B.has(x)) n++; return A.size && B.size && n / Math.min(A.size, B.size) >= 0.3; };
const PUBLISHED = { 'G1-245': 'animals', 'G1-262': 'fruits', 'G1-263': 'vehicles', 'G1-264': 'toys' };
const TINY = { dataUri: 'data:,', width: 1, height: 1 };
function ok(spec, t, lv, copy, loc) {
  const strings = resolveStrings(spec.id, loc, spec);
  const man = buildManifest({ spec, cacheTheme: t, difficulty: lv, locale: loc, variant: copy, deckId: 'x', generatedAt: 'x', strings, imagesUsed: [] });
  if (((/<title>([^<]*)<\/title>/.exec(buildDeckHtml({ manifest: man, spec, strings, locale: loc, preview: TINY })) || [])[1] || '').length > 70) return false;
  try {
    for (const extra of [{}, { interactive: true }, { answerKey: true }]) spec.build({ theme: t, difficulty: lv, locale: loc }, { rng: makeRng(instanceSeed({ typeId: spec.id, theme: t, difficulty: lv, seedEpoch: 1, variant: copy, unit: null })), variant: copy, ...extra });
    return true;
  } catch (e) { return false; }
}
for (const f of fs.readdirSync(path.join(__dirname, '..', '..', 'waves')).filter((x) => /^wave-abc-..\.json$/.test(x))) {
  const p = path.join(__dirname, '..', '..', 'waves', f);
  const w = JSON.parse(fs.readFileSync(p, 'utf8'));
  const loc = w.locales[0];
  let changed = false;
  for (const [id, lvls] of Object.entries(w.levels)) {
    for (const [lv, copies] of Object.entries(lvls)) {
      for (const c of copies) {
        if (c.theme !== 'tree') continue;
        const inFace = [PUBLISHED[id], ...Object.values(lvls).flat().map((x) => x.theme).filter((t) => t !== 'tree')];
        const atLevel = Object.entries(w.levels).filter(([o]) => o !== id).flatMap(([, l]) => (l[lv] || []).map((x) => x.theme));
        const pick = colour.find((t) => !inFace.some((u) => twin(u, t)) && !atLevel.some((u) => twin(u, t)) && ok(loadType(id), t, Number(lv), c.copy, loc));
        if (!pick) throw new Error(`no replacement for ${loc} ${id} L${lv} copy ${c.copy}`);
        console.log(`${loc} ${id} L${lv} copy ${c.copy}: tree -> ${pick}`);
        c.theme = pick; changed = true;
      }
    }
  }
  if (changed) fs.writeFileSync(p, JSON.stringify(w, null, 2) + '\n');
}
