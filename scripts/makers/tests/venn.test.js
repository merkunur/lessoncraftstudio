#!/usr/bin/env node
/**
 * Two-Circle Sort (G3-353, scripts/worksheet-gen/types/g3/G3-353-venn-sort.js, pedagogy rebuild 2026-11-01): ONE right
 * answer on every page.
 *   - every theme the template builds × 11 languages × 3 levels × 4 copies: the kind (the left circle's word) and every
 *     "other" picture are unrelated — not one look-alike group (data/graph-lookalikes.js, read here directly), not an IS_A
 *     pair, not one word inside the other in that language, never a generic word (a clownfish IS a fish)
 *   - every thing on the page is drawn big AND small; each region holds 1 … ⌈n/4⌉+1 pictures; numbers run 1 … n
 *   - poisons: fish/clownfish, angelfish/pufferfish, es bus/truck ("Camiones" / "Camiones de carga"), de fish/goldfish are
 *     related; apple/banana are not (a check that calls everything related would pass the sweep and must fail here)
 *   node scripts/makers/tests/venn.test.js
 */
'use strict';
const path = require('path');
const fs = require('fs');
const REPO = path.join(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const runtime = require('../runtime.js');
const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
const type = require(path.join(WG, 'types', 'g3', 'G3-353-venn-sort.js'));
const LOOK = require(path.join(WG, 'data', 'graph-lookalikes.js'));
const { labelsForKey, themeEntry } = require(path.join(WG, 'image-cache', 'resolve.js'));
const { related, poolOf, GENERIC, IS_A } = type.testHooks;
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; if (!ok || process.argv.includes('--verbose')) console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };

// the test's own reading of "related" — from the data, not through the template's function
const base = (t) => t.replace(/\s+bw(\s+\d+)?$/i, '');
const words = (theme, n, L) => (labelsForKey((themeEntry(theme).nouns[n] || {}).vocabKey || n, L) || []).slice(0, 2).map((w) => String(w).toLowerCase());
function relatedHere(theme, a, b, L) {
  if (GENERIC.has(a) || GENERIC.has(b)) return true;
  if ((LOOK[base(theme)] || []).some((g) => g.includes(a) && g.includes(b))) return true;
  if (IS_A.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return true;
  const A = words(theme, a, L), B = words(theme, b, L);
  return A.some((x) => B.some((y) => x === y || y.includes(x) || x.includes(y)));
}

// 1. every page
const man = JSON.parse(fs.readFileSync(path.join(WG, 'cache', 'manifest.json'), 'utf8')).themes;
let pages = 0, themes = 0;
for (const theme of Object.keys(man)) {
  try { if (poolOf(theme).length < 4) continue; } catch (e) { continue; }   // a theme not read for look-alikes is refused
  themes++;
  for (const L of LOCALES) for (const d of [1, 2, 3]) for (const v of [1, 2, 3, 4]) {
    let r;
    try { r = runtime.makePage({ type, strings: withLevelInstruction(resolveStrings('G3-353', L, type), 'G3-353', d, L), locale: L, difficulty: d, theme, variant: v }); }
    catch (e) { if (!/REFUSED/.test(e.message)) check(`${theme} ${L} L${d} v${v}: builds`, false, e.message); continue; }
    pages++;
    const kindNoun = (r.html.match(/data-lcs-kind="1" data-lcs-big="[01]" data-lcs-noun="([^"]+)"/) || [])[1];
    const others = [...new Set([...r.html.matchAll(/data-lcs-kind="0" data-lcs-big="[01]" data-lcs-noun="([^"]+)"/g)].map((m) => m[1]))];
    for (const o of others) if (relatedHere(theme, kindNoun, o, L)) check(`${theme} ${L} L${d} v${v}: ${o} could be read as ${kindNoun}`, false);
    if (GENERIC.has(kindNoun)) check(`${theme} ${L}: the circle is named by a generic word (${kindNoun})`, false);
    // both sizes, region caps, numbers
    const items = [...r.html.matchAll(/data-lcs-region="(\w+)"[\s\S]*?data-lcs-big="([01])" data-lcs-noun="([^"]+)"[\s\S]*?data-lcs-number="(\d+)"/g)];
    const sizes = {}; const count = {};
    items.forEach((m, i) => { (sizes[m[3]] = sizes[m[3]] || new Set()).add(m[2]); count[m[1]] = (count[m[1]] || 0) + 1; if (+m[4] !== i + 1) check(`${theme} ${L} L${d}: picture ${i + 1} is numbered ${m[4]}`, false); });
    if (items.length !== type.difficulty[d].items) check(`${theme} ${L} L${d}: ${items.length} pictures`, false);
    for (const [n, s] of Object.entries(sizes)) if (s.size < 2) check(`${theme} ${L} L${d} v${v}: ${n} drawn at one size`, false);
    const cap = Math.ceil(items.length / 4) + 1;
    for (const reg of ['left', 'both', 'right', 'out']) if (!(count[reg] >= 1 && count[reg] <= cap)) check(`${theme} ${L} L${d} v${v}: ${count[reg] || 0} pictures in ${reg}`, false);
  }
}
check(`${pages} pages over ${themes} themes: one right answer, both sizes, balanced regions`, pages >= 11 * 3 * 4 * 2 && themes >= 2);
check('the live themes build (animals, shapes)', poolOf('animals').length >= 4 && poolOf('shapes').length >= 4);

// 2. poisons, both directions — through the template's own relation AND the test's
for (const [th, a, b, L] of [['ocean life', 'angelfish', 'pufferfish', 'en'], ['vehicles', 'bus', 'truck', 'es'], ['pets', 'fish', 'goldfish', 'de'], ['zoo animals', 'bear', 'panda', 'en'], ['shapes', 'square', 'parallelogram', 'fi']]) {
  check(`poison: ${a} / ${b} (${L}) are related`, related(th, a, b, L) && relatedHere(th, a, b, L));
}
check('poison: a generic word never enters the pool (ocean life: fish)', !poolOf('ocean life').some((n) => n.noun === 'fish'));
check('control: apple / banana are not related', !related('fruits', 'apple', 'banana', 'en') && !relatedHere('fruits', 'apple', 'banana', 'en'));
let threw = false; try { poolOf('dinosaurs'); } catch (e) { threw = /not been read/.test(e.message); }
check('a theme not read for look-alikes is refused', threw);

console.log(fails ? `venn: ${fails} FAILED` : 'venn: all checks pass');
process.exit(fails ? 1 : 0);
