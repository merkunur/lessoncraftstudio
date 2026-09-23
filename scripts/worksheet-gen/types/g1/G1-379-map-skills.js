/**
 * G1-379 — Read the Map Key (nt10-E, b5; family key `maps`, G1, spatial-reasoning, no
 * CCSS — `teaches` "Map skills (social studies readiness)"; en prose names the C3 Framework
 * D2.Geo.1.K-2). Design: docs/worksheet-gen/b5-designs/G1-379-maps.md §2/§5; every ruling in
 * _work/G1-379-critic.md; build record _work/G1-379-build.md.
 *
 * "The island on the wall": the upper part of the page is ONE framed map sheet — a wordless
 * island in a tealSoft sea drawn strictly FROM ABOVE (a road coast to coast, a river from its
 * spring to the sea with its bridge, 0 or 1 dashed footpath, 10..20 plan symbols), a north
 * arrow carrying the locale's own N letter in the top-right sea, and the map KEY docked INSIDE
 * the same frame under the island. Under the sheet a strip of word cards, each a key WORD over
 * an empty numeral box. The child reads a word, finds it in the key, sees its symbol, hunts the
 * symbol on the island, counts, writes. The key is the only bridge (at d2 the cards never print
 * the symbol), and the tree / bush near-miss forces the key to be READ, not guessed.
 *
 * THEME axis OFF, no unitAxis, no library picture. build() reads ONLY its bank
 * (lib/b5-common.js bank('maps', loc) — a missing locale block THROWS, never an en fallback);
 * every printed word is a whole panel literal (keyTitle, symbolWords[id], dirLetters.n).
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  key 4 (2 x 2) · asked 4 · counts 1..4 (>= 3 distinct) · no unasked · bush NOT in the key
 *       · the cards SHOW the symbol (a plain counting scaffold) · symbols 48 px · <= 10 placed
 *   d2  key 5 (3 + 2) · asked 5 · counts 1..5 (>= 4 distinct; bridge 1..2) · no unasked (landing round 1:
 *       every key symbol has its count box)
 *       · tree + bush both in the key · cards print the WORD only · 44 px · <= 16 placed ·
 *       0..1 footpath (bridges = 1 + footpaths)                                        (ships)
 *   d3  key 6 (3 x 2) · asked 6 · counts 1..6 (>= 5 distinct) · no unasked · 44 px · <= 20
 *       placed · no footpath (a scaffold level, never shipped; no copy describes it)
 *
 * COMPOSER (locale-neutral: the same island, symbols, key order, counts and card order in all
 * 11 locales; only the words change): footpath config; key ids; key ORDER shuffled with the
 * unasked entries never in the last cell; counts re-drawn until the distinct floor holds, the
 * placed sum <= placedMax and the slot capacity >= placed + 4; symbols on seeded slots of
 * ISLE_1.slots[s<px>w615][config]; card order re-drawn until it is NOT the key order, NOT
 * ascending or descending by count, and has no two adjacent equal answers.
 *
 * Layout (§2; README: body 722, 677 at the 4-line fi title): TOP-ANCHORED column — the sheet
 * (639 x 524: border 3 + pad 9 + field 615 x 346 + 8 + legend 146 + 9 + 3), a fixed 20 px gap,
 * the strip (d2 5 x 119 + 4 x 11 = 639). Slack falls BELOW the strip, never between blocks
 * (the nt10-D SPARSE ruling; the gate asserts the band <= 40 px).
 * FILL (base review 2026-09-23): the strip is a size container growing from its minimum (d2 120,
 * d1 172) to stripMax (d1 212 / d2 d3 184) with the body; its numeral boxes grow 4:3 (capped at
 * the card width) and the word bands take the rest — ~91 % of the 799 body at the en chrome
 * instead of ~83 %, the 120 minimum at the 667 fi body.
 *
 * Stamps: root [data-ws-content][data-lcs-type="maps"] data-lcs-locale data-lcs-key (ids, key
 * order) data-lcs-asked data-lcs-unasked data-lcs-footpaths data-lcs-sym-px data-lcs-show-sym
 * data-lcs-min-distinct; the island's symbols data-lcs-sym=<id> data-lcs-x/-y (units); bridges
 * data-lcs-sym="bridge" data-lcs-slot; key cells data-lcs-key=<id>; cards data-lcs-row=<id> with
 * the hidden count on their blankNumeralBox (data-lcs-answer). No data-lcs-layout on the base.
 * verify(page) re-derives every count from the rendered map.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b5-common.js');
const C5 = require('../../templates/components-b5.js');
const IM = require('../../primitives/island-map.js');
const { MAPS } = require('../../data/b5/maps.js');

const ID = 'G1-379';
const ANSWER_CAP = 2;   // F5 (landing review 2026-09-23): a place answers at most 2 of the 6 rows
const KEY = 'maps';
const BANK = 'maps';
const FIELD_W = 615, SHEET_W = 639, BLOCK_GAP = 20;
const G1_FLOOR = 44;
const TRIES = 400;
const COUNT_TRIES = 6000;   // d3 (6 asked, >= 5 distinct, <= capacity - 4) is a rare draw: measured ~1-2 % per try

function literal(obj, key, what, loc) {
  const v = obj && obj[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} is missing (refuse)`);
  if (v !== v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" is not trimmed`);
  if (/[{}]/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a slot`);
  if (/\d/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a digit`);
  return v;
}

/* ------------------------------------------------------------ face helpers (Phase E) */
const TSV = require('../../primitives/top-side-view.js');
const CR = require('../../primitives/compass-rose.js');
const WM = require('../../primitives/world-map.js');
const MS = require('../../primitives/map-symbol.js');
const { WORLD_MAP: WM_DATA } = require('../../data/b5/world-map.js');
/** F1 d1 scaffold pool leaves out the two hardest reads (chair, bucket) */
const TOPVIEW_HARD = ['chair', 'bucket'];
const DIR_VEC = { n: [0, -1], e: [1, 0], s: [0, 1], w: [-1, 0] };
const PLACES = ['house', 'tree', 'bush', 'pond', 'bench', 'tent', 'flowerBed'];
const WORLD_W = 635;          // the map inside its 2 px card frame: 635 + 2 x 2 = 639
const TARGET_STACK = 700;     // FILL: the stack with every band at its 36 px cap reaches >= 85 % of an 814 body
const GAP_CAP = 36;

const countBy = (arr, f) => arr.reduce((o, x) => { const k = f(x); o[k] = (o[k] || 0) + 1; return o; }, {});
/** b is a cyclic shift of a by k (1..n-1) — a constant-offset order is a position tell */
function isRotation(a, b) { const n = a.length; for (let k = 1; k < n; k++) if (a.every((x, i) => b[(i + k) % n] === x)) return true; return false; }
/** seq repeats with some period p < n (a periodic sequence is a tell) */
function isPeriodic(seq) { const n = seq.length; for (let p = 1; p <= Math.floor(n / 2); p++) if (seq.every((x, i) => i + p >= n || seq[i + p] === x)) return true; return false; }
/** the angle (deg, 0..180) between the bearing a -> b and direction d (y DOWN, north = up) */
function bearingOff(a, b, d) {
  const v = [b[0] - a[0], b[1] - a[1]], u = DIR_VEC[d];
  const c = (v[0] * u[0] + v[1] * u[1]) / Math.hypot(v[0], v[1]);
  return Math.acos(Math.max(-1, Math.min(1, c))) * 180 / Math.PI;
}
/** F1 family limits (pedagogy): <= 2 per class; never cup + bucket, never rectTable + bed */
function topViewLimits(models) {
  const f = [];
  const c = countBy(models, (k) => MAPS.TOPSIDE[k].cls);
  for (const [k, n] of Object.entries(c)) if (n > 2) f.push(`${n} ${k}-class models on one page (<= 2)`);
  for (const [a, b] of MAPS.TOPSIDE_NEVER_TOGETHER) if (models.includes(a) && models.includes(b)) f.push(`${a} and ${b} on one page (never together)`);
  return f;
}
/** F4: numbering kinds must interleave (never every continent before every ocean or the reverse) */
function blockyKinds(kinds) { const i = kinds.indexOf('sea'), j = kinds.lastIndexOf('land'), k = kinds.indexOf('land'), l = kinds.lastIndexOf('sea'); return j < i || l < k; }
/** F3: the word bank's row count, estimated from the names (Nunito 800 17: ~8.9 px a grapheme + 30 px chip
 *  padding / border, 10 px gaps, 610 px inside the bank; measured on the en chips: Asia 67, Antarctica 115.5, North America 150.7) — 1 row = 59 px, 2 rows = 108 px */
function bankHeightEst(names) {
  let rows = 1, x = 0;
  for (const n of names) { const w = 8.9 * [...n].length + 30; if (x && x + 10 + w > 610) { rows++; x = w; } else x = x ? x + 10 + w : w; }
  return 59 + (rows - 1) * 49;
}
function maxRun(kinds) { let m = 0, r = 0; kinds.forEach((x, i) => { r = i && x === kinds[i - 1] ? r + 1 : 1; m = Math.max(m, r); }); return m; }

const TYPE = {
  id: ID,
  slug: 'map-skills',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    1: { island: 'isle-1', keySize: 4, cols: 2, asked: 4, countMax: 4, minDistinct: 3, unasked: 0, unaskedMax: 0, nearMiss: 'none', rowsShowSymbol: true, symPx: 48, placedMax: 10, footpaths: [[]], northArrow: true, stripMax: 212 },
    // landing round 1 (2026-09-23, en/de/es/fr panels): the key listed SIX symbols but printed FIVE count boxes (the
    // bench "unasked" read as a missing box under "find EACH thing from the map key"). Every key symbol now has its box.
    2: { island: 'isle-1', keySize: 5, cols: 3, asked: 5, countMax: 5, minDistinct: 4, unasked: 0, unaskedMax: 0, nearMiss: 'both-in-key', rowsShowSymbol: false, symPx: 44, placedMax: 16, footpaths: [[], ['P1'], ['P2']], northArrow: true, stripMax: 184 },
    3: { island: 'isle-1', keySize: 6, cols: 3, asked: 6, countMax: 6, minDistinct: 5, unasked: 0, unaskedMax: 0, nearMiss: 'both-asked', rowsShowSymbol: false, symPx: 44, placedMax: 20, footpaths: [[]], northArrow: true, stripMax: 184 },
  },
  i18n: {
    en: {
      title: 'Read the Map Key',
      instruction: 'Find each thing from the map key on the map, then write how many there are in its box.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc }, ctx);
  },

  /** Pure composition over the resolved config (no bank): the locale-neutral draw. */
  _compose(d, rng) {
    const isle = IM.ISLE_1;
    const fpCfg = d.footpaths[rng.int(0, d.footpaths.length - 1)];
    const config = fpCfg.length ? fpCfg.join('') : 'none';
    const slots = isle.slots[IM.slotKey(d.symPx, FIELD_W)] && isle.slots[IM.slotKey(d.symPx, FIELD_W)][config];
    if (!slots) throw new Error(`${ID}: no committed slots for ${IM.slotKey(d.symPx, FIELD_W)}/${config} (run tools/build-island-slots.js)`);
    const bridges = 1 + fpCfg.length;
    // key ids
    let keyIds;
    if (d.nearMiss === 'none') keyIds = ['tree', ...rng.sample(MAPS.KEY_POOL, d.keySize - 1)];
    else keyIds = ['tree', 'bush', ...rng.sample(MAPS.KEY_POOL, d.keySize - 2)];
    if (d.keySize === MAPS.SYMBOLS.length) keyIds = MAPS.SYMBOLS.slice();
    // unasked (never tree / bush)
    const unaskedPool = keyIds.filter((k) => k !== 'tree' && k !== 'bush');
    const unasked = rng.sample(unaskedPool, d.unasked);
    const asked = keyIds.filter((k) => !unasked.includes(k));
    // key order: shuffled, the unasked never in the last cell
    let keyOrder = null;
    for (let t = 0; t < TRIES && !keyOrder; t++) { const o = rng.shuffle(keyIds); if (!unasked.includes(o[o.length - 1])) keyOrder = o; }
    if (!keyOrder) throw new Error(`${ID}: no key order with the unasked off the last cell`);
    // counts
    let counts = null;
    for (let t = 0; t < COUNT_TRIES && !counts; t++) {
      const c = {};
      for (const k of keyIds) c[k] = k === 'bridge' ? bridges : (asked.includes(k) ? rng.int(1, d.countMax) : rng.int(1, d.unaskedMax));
      const vals = asked.map((k) => c[k]);
      const placed = keyIds.filter((k) => k !== 'bridge').reduce((s, k) => s + c[k], 0);
      if (new Set(vals).size < d.minDistinct) continue;
      if (placed > d.placedMax) continue;
      if (slots.length < placed + 4) continue;
      counts = c;
    }
    if (!counts) throw new Error(`${ID}: no count draw meets the distinct floor / placedMax / slot capacity in ${COUNT_TRIES}`);
    // symbols on seeded slots
    const ids = [];
    for (const k of keyIds) if (k !== 'bridge') for (let i = 0; i < counts[k]; i++) ids.push(k);
    const where = rng.sample(slots, ids.length);
    const order = rng.shuffle(ids);
    const symbols = order.map((id, i) => ({ id, x: where[i][0], y: where[i][1] }));
    // card order
    const keyAsked = keyOrder.filter((k) => asked.includes(k)).join();
    let cards = null;
    for (let t = 0; t < TRIES && !cards; t++) {
      const o = rng.shuffle(asked);
      const vals = o.map((k) => counts[k]);
      if (o.join() === keyAsked) continue;
      if (vals.every((v, i) => i === 0 || v >= vals[i - 1]) || vals.every((v, i) => i === 0 || v <= vals[i - 1])) continue;
      if (vals.some((v, i) => i > 0 && v === vals[i - 1])) continue;
      cards = o;
    }
    if (!cards) throw new Error(`${ID}: no card order clears the order rules in ${TRIES}`);
    return { footpaths: fpCfg, config, bridges, keyIds, keyOrder, asked, unasked, counts, symbols, cards, capacity: slots.length };
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam). */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (d.layout) return this._buildFace(bankLoc, d, loc, rng);   // the five faces (Phase E); the base path below is untouched
    // guards on the RESOLVED config
    if (d.island !== IM.ISLE_1.id) throw new Error(`${ID}: unknown island "${d.island}"`);
    if (!(d.symPx >= G1_FLOOR)) throw new Error(`${ID}: symPx ${d.symPx} < the G1 floor ${G1_FLOOR}`);
    if (d.keySize < 2 || d.keySize > MAPS.SYMBOLS.length) throw new Error(`${ID}: keySize ${d.keySize} out of range`);
    if (d.asked + d.unasked !== d.keySize) throw new Error(`${ID}: asked ${d.asked} + unasked ${d.unasked} ≠ keySize ${d.keySize}`);
    if (d.nearMiss !== 'none' && d.keySize < 3) throw new Error(`${ID}: a near-miss key needs >= 3 entries`);
    if (d.minDistinct > d.asked || d.minDistinct > d.countMax) throw new Error(`${ID}: minDistinct ${d.minDistinct} unreachable`);
    if (Math.ceil(d.keySize / d.cols) > 2) throw new Error(`${ID}: the legend holds 2 rows (keySize ${d.keySize} / cols ${d.cols})`);
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes('base')) throw new Error(`${ID}: ${loc} refuses the base (bank.refuse)`);
    const SW = bankLoc && bankLoc.symbolWords;
    if (!SW) throw new Error(`${ID}: ${loc} bank has no symbolWords block (refuse)`);
    const keyTitle = literal(bankLoc, 'keyTitle', 'bank', loc);
    const northLetter = literal(bankLoc.dirLetters, 'n', 'dirLetters', loc);

    const c = this._compose(d, rng);
    if (d.forceCards) c.cards = d.forceCards.slice();   // the GATE's poison seam — never a shipped config
    const words = {};
    for (const k of c.keyIds) words[k] = literal(SW, k, 'symbolWords', loc);
    const seen = new Set();
    for (const k of c.keyIds) { const w = words[k].normalize('NFC').toLocaleLowerCase(loc); if (seen.has(w)) throw new Error(`${ID}: two symbols print the same word "${words[k]}" in ${loc}`); seen.add(w); }

    const island = IM.islandMap({ w: FIELD_W, symbols: c.symbols, footpaths: c.footpaths, northArrow: d.northArrow ? { letter: northLetter } : null, symPx: d.symPx });
    const legend = C5.legendBand({ title: keyTitle, rows: c.keyOrder.map((id) => ({ id, word: words[id] })), cols: d.cols, symPx: d.symPx });
    const sheet = C5.mapSheet({ field: island.svg, legend });
    // FILL (base review 2026-09-23): the strip grows from its content minimum to stripMax with the body (the
    // numeral boxes and word bands grow), so the page never ends high at the 814 chrome; at the 667 fi body it
    // stays at its minimum. stripMax undefined = the fixed strip.
    const strip = C5.countStrip({ cards: c.cards.map((id) => ({ id, word: words[id], answer: c.counts[id], symbol: d.rowsShowSymbol || d.forceShowSymbol })), grow: d.stripMax !== undefined ? { maxH: d.stripMax } : undefined });
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-key="${c.keyOrder.join(',')}" data-lcs-asked="${c.asked.join(',')}" ` +
      `data-lcs-unasked="${c.unasked.join(',')}" data-lcs-footpaths="${c.footpaths.join(',')}" data-lcs-sym-px="${d.symPx}" data-lcs-show-sym="${d.rowsShowSymbol ? 1 : 0}" ` +
      `data-lcs-min-distinct="${d.minDistinct}" data-lcs-capacity="${c.capacity}" data-lcs-placed='${js(c.symbols.length)}' ` +
      `style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:${BLOCK_GAP}px">` +
      sheet + strip + `</div>`;
    return { bodyHtml, meta: { keyOrder: c.keyOrder, asked: c.asked, unasked: c.unasked, counts: c.counts, cards: c.cards, footpaths: c.footpaths, symbols: c.symbols, capacity: c.capacity } };
  },

  /* ================================================================== FACES (Phase E)
   * Five CODE faces on ONE additive knob `layout` (design §3; record _work/G1-379-faces.md).
   * Every composer is LOCALE-NEUTRAL (it never reads a word), so a face draws the same page in
   * all 11 locales — except F3 / F4, whose member SET is locale data (a merged America, no
   * Antarctica), and whose bank / index order re-draws against the locale's OWN alphabetical
   * order (the only locale-dependent re-draw; recorded). Guards key on the resolved config. */

  /** F1 — the models and the right column's order. */
  _composeTopView(d, rng) {
    const pool = Object.keys(MAPS.TOPSIDE).filter((k) => d.pool !== 'easy' || !TOPVIEW_HARD.includes(k));
    const want = (d.classMix || []).slice().sort((a, b) => b - a).join();
    let left = null;
    for (let t = 0; t < TRIES && !left; t++) {
      const m = rng.sample(pool, d.pairs);
      if (topViewLimits(m).length) continue;
      if (want && Object.values(countBy(m, (k) => MAPS.TOPSIDE[k].cls)).sort((a, b) => b - a).join() !== want) continue;
      left = m;
    }
    if (!left) throw new Error(`${ID}: no F1 model draw meets the class mix ${want}`);
    let right = null;
    for (let t = 0; t < TRIES && !right; t++) {
      const o = rng.shuffle(left);
      if (o.some((x, i) => x === left[i])) continue;                    // a derangement: no partner level with its own
      if (o.join() === left.slice().reverse().join()) continue;         // not reversed
      if (isRotation(left, o)) continue;                                // no constant offset
      right = o;
    }
    if (!right) throw new Error(`${ID}: no F1 right order clears the order rules`);
    return { left, right };
  },

  /** F2 — rose rotations by card position and the one given letter per rose. */
  _composeRoses(d, rng) {
    const n = d.roses, cols = d.cols;
    for (let t = 0; t < TRIES; t++) {
      const rots = rng.shuffle(d.rotations);
      const up = rots.map((r, i) => (r === 0 ? i : -1)).filter((i) => i >= 0);
      if (up.length > 1 && new Set(up.map((i) => i % cols)).size < 2) continue;              // never one column
      if (up.length > 1 && new Set(up.map((i) => Math.floor(i / cols))).size < 2) continue;  // never one row
      const upGiven = rng.shuffle(d.givenUpright);
      const turned = n - up.length;
      // every rose now carries its coral N marker (landing round 1), so N is never the given letter: the marker shows north
      const nonN = MAPS.DIRS.filter((x) => x !== 'n');
      const turnedGiven = rng.shuffle(turned <= nonN.length ? rng.sample(nonN, turned) : Array.from({ length: turned }, (_, i) => nonN[i % nonN.length]));
      let a = 0, b = 0;
      const given = rots.map((r) => (r === 0 ? upGiven[a++] : turnedGiven[b++]));
      if (isPeriodic(given)) continue;
      if (new Set(given).size < 3) continue;          // E, S and W all given somewhere (N never: the marker shows it)
      // the given box's POSITION on the card (up/right/down/left) is never one place on every rose
      const pos = given.map((g, i) => [0, 1, 2, 3].find((p) => CR.posToDir(p, rots[i]) === g));
      if (new Set(pos).size < 2) continue;
      return { rots, given, pos };
    }
    throw new Error(`${ID}: no F2 rose layout clears the order rules`);
  },

  /** F3 / F4 — the seed's ONE permutation of the ids; a member's rank = its FIRST region's rank. */
  _numbering(set, oceans, rng) {
    const perm = rng.shuffle(oceans.length ? [...MAPS.REGIONS, ...MAPS.OCEAN_IDS] : MAPS.REGIONS);
    const items = [...set.map((m) => ({ id: m.id, kind: 'land', rank: perm.indexOf(m.regions[0]) })), ...oceans.map((o) => ({ id: o, kind: 'sea', rank: perm.indexOf(o) }))];
    items.sort((a, b) => a.rank - b.rank);
    const numbers = {};
    items.forEach((x, i) => { numbers[x.id] = i + 1; });
    return { numbers, byNumber: items.map((x) => x.id), kinds: items.map((x) => x.kind) };
  },

  _composeContinents(d, rng, set, alpha) {
    const num = this._numbering(set, [], rng);
    const fwd = num.byNumber.join(), rev = num.byNumber.slice().reverse().join();
    for (let t = 0; t < TRIES; t++) {
      const o = rng.shuffle(num.byNumber);
      if (o.join() === fwd || o.join() === rev || o.join() === alpha.join()) continue;
      return { ...num, bank: d.forceBank ? d.forceBank.slice() : o };
    }
    throw new Error(`${ID}: no F3 bank order clears the order rules`);
  },

  _composeAtlas(d, rng, set, oceans, alpha) {
    let num = null;
    for (let t = 0; t < TRIES && !num; t++) { const x = this._numbering(set, oceans, rng); if (!blockyKinds(x.kinds)) num = x; }
    if (!num) throw new Error(`${ID}: no F4 numbering interleaves land and sea`);
    const kindOf = Object.fromEntries(num.byNumber.map((id, i) => [id, num.kinds[i]]));
    for (let t = 0; t < TRIES; t++) {
      const o = rng.shuffle(num.byNumber);
      if (maxRun(o.map((id) => kindOf[id])) > d.runMax) continue;
      if (o.join() === num.byNumber.join() || o.join() === alpha.join()) continue;
      return { ...num, kindOf, index: d.forceIndex ? d.forceIndex.slice() : o };
    }
    throw new Error(`${ID}: no F4 index order clears the order rules`);
  },

  /** F5 — 7 places on island slots (answer cap + no mirror pair: see ANSWER_CAP) >= minApartPx pairwise, then 6 rows (6 distinct starts, all 4 directions). */
  _composeDirections(d, rng) {
    const key = IM.slotKey(d.symPx, d.islandW);
    const slots = IM.ISLE_1.slots[key] && IM.ISLE_1.slots[key].none;
    if (!slots) throw new Error(`${ID}: no committed slots ${key}/none`);
    const minU = d.minApartPx / (d.islandW / IM.ISLE_1.view.w);
    for (let t = 0; t < 4000; t++) {
      const picked = [];
      for (const s of rng.shuffle(slots)) { if (picked.every((p) => Math.hypot(p[0] - s[0], p[1] - s[1]) >= minU)) picked.push(s); if (picked.length === d.places) break; }
      if (picked.length < d.places) continue;
      const ids = rng.shuffle(PLACES).slice(0, d.places);
      const at = Object.fromEntries(ids.map((id, i) => [id, picked[i]]));
      // every legal (direction, correct place, wrong places) per start
      const opts = {};
      for (const X of ids) {
        opts[X] = [];
        for (const dir of MAPS.DIRS) {
          const others = ids.filter((y) => y !== X);
          const ins = others.filter((y) => bearingOff(at[X], at[y], dir) <= d.inDeg);
          const outs = others.filter((y) => bearingOff(at[X], at[y], dir) >= d.outDeg);
          if (ins.length && outs.length >= d.chips - 1) opts[X].push({ dir, ins, outs });
        }
      }
      const starts = rng.shuffle(ids.filter((X) => opts[X].length));
      if (starts.length < d.rows) continue;
      const use = starts.slice(0, d.rows);
      // directions: every start one of its legal directions, all four covered (seeded backtracking)
      const choice = [];
      const pickDirs = (i, seen) => {
        if (i === use.length) return seen.size === 4;
        for (const o of rng.shuffle(opts[use[i]])) { choice[i] = o; const s2 = new Set(seen); s2.add(o.dir); if (s2.size + (use.length - i - 1) >= 4 && pickDirs(i + 1, s2)) return true; }
        return false;
      };
      if (!pickDirs(0, new Set())) continue;
      // chips: the correct place + (chips-1) wrong ones (one of them opposite-ish when the layout allows); never tree + bush together
      const rows = [];
      let bad = false;
      for (let i = 0; i < use.length && !bad; i++) {
        const { dir, ins, outs } = choice[i];
        let row = null;
        for (let k = 0; k < 60 && !row; k++) {
          const y = rng.pick(ins);
          // landing review 2026-09-23: one place answers at most ANSWER_CAP rows; no MIRROR pair (a row whose start and
          // answer are another row's answer and start swapped — reading one row answers the other)
          if (rows.filter((q) => q.answer === y).length >= ANSWER_CAP) continue;
          if (rows.some((q) => q.start === y && q.answer === use[i])) continue;
          const far = outs.filter((z) => bearingOff(at[use[i]], at[z], dir) >= 135);
          const first = far.length ? [rng.pick(far)] : [];
          const wrong = [...first, ...rng.sample(outs.filter((z) => !first.includes(z)), d.chips - 1 - first.length)];
          const chips = [y, ...wrong];
          if (chips.includes('tree') && chips.includes('bush')) continue;
          row = { start: use[i], dir, answer: y, wrong };
        }
        if (!row) bad = true; else rows.push(row);
      }
      if (bad) continue;
      // the correct chip's position: every position used, the sequence not periodic
      let pos = null;
      for (let k = 0; k < 200 && !pos; k++) { const p = rows.map(() => rng.int(0, d.chips - 1)); if (new Set(p).size === d.chips && !isPeriodic(p)) pos = p; }
      if (!pos) continue;
      for (let i = 0; i < rows.length; i++) { const w = rng.shuffle(rows[i].wrong); w.splice(pos[i], 0, rows[i].answer); rows[i].chips = w; }
      return { places: ids.map((id) => ({ id, x: at[id][0], y: at[id][1] })), at, rows, pos };
    }
    throw new Error(`${ID}: no F5 island draw meets the single-answer construction`);
  },

  /** A face over an injected bank + resolved config. */
  _buildFace(bankLoc, d, loc, rng) {
    const L = d.layout;
    if (!MAPS.LAYOUTS.includes(L)) throw new Error(`${ID}: unknown layout "${L}"`);
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes(L)) throw new Error(`${ID}: ${loc} refuses the ${L} face (bank.refuse)`);
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const letters = () => Object.fromEntries(MAPS.DIRS.map((x) => [x, literal(bankLoc.dirLetters, x, 'dirLetters', loc)]));
    const blocks = [];
    let stamps = {}, meta = {}, gapMin = 8;
    if (L === 'top-view') {
      if (!(d.box >= 84)) throw new Error(`${ID}: F1 box ${d.box} < 84 (the K floor puts every view's larger side >= 56)`);
      const c = d.forceModels ? { left: d.forceModels.slice(), right: d.forceRight.slice() } : this._composeTopView(d, rng);
      blocks.push(C5.viewHeads({ w: d.rowW, itemW: d.itemW, tileW: d.tileW }));
      c.left.forEach((m, i) => {
        const s = TSV.topSideView({ model: m, view: 'side', box: d.box });
        const tp = TSV.topSideView({ model: c.right[i], view: 'top', box: d.box });
        blocks.push(C5.viewPair({ leftModel: m, rightModel: c.right[i], side: { svg: s.svg, x0: s.meta.x0, w: s.meta.w }, top: tp.svg, box: d.box, itemW: d.itemW, tileW: d.tileW, rowH: d.rowH, w: d.rowW }));
      });
      stamps = { left: c.left, right: c.right, box: d.box };
      meta = c;
    } else if (L === 'compass-rose') {
      if (!(d.px >= 180)) throw new Error(`${ID}: F2 rose px ${d.px} < 180`);
      const c = d.forceRoses ? JSON.parse(JSON.stringify(d.forceRoses)) : this._composeRoses(d, rng);   // forceRoses: the GATE's poison seam
      const lt = letters();
      const cards = c.rots.map((r, i) => C5.roseCard({ i, w: d.cardW, h: d.cardH, rose: CR.compassRose({ px: d.px, rotation: r, given: c.given[i], letters: lt }).svg }));
      for (let i = 0; i < cards.length; i += d.cols) blocks.push(C5.roseRow({ cards: cards.slice(i, i + d.cols) }));
      stamps = { rots: c.rots, given: c.given, 'rot-set': d.rotations, cols: d.cols };
      meta = c;
    } else if (L === 'continents' || L === 'continents-oceans') {
      const set = bankLoc.continentSet;
      if (!Array.isArray(set) || set.length < 5 || set.length > 7) throw new Error(`${ID}: ${loc} has no continentSet of 5..7 (refuse)`);
      const names = Object.fromEntries(set.map((m) => [m.id, literal(bankLoc.continentNames, m.id, 'continentNames', loc)]));
      const oceans = L === 'continents-oceans' ? (bankLoc.oceanSet || []) : [];
      if (L === 'continents-oceans') {
        if (oceans.length < 3 || oceans.length > 5 || !oceans.includes('pacific')) throw new Error(`${ID}: ${loc} oceanSet [${oceans}] is not 3..5 with the Pacific (refuse)`);
        for (const o of oceans) names[o] = literal(bankLoc.oceanNames, o, 'oceanNames', loc);
      }
      const coll = new Intl.Collator(loc);
      const ids = [...set.map((m) => m.id), ...oceans];
      const alpha = ids.slice().sort((a, b) => coll.compare(names[a], names[b]));
      const c = L === 'continents' ? this._composeContinents(d, rng, set, alpha) : this._composeAtlas(d, rng, set, oceans, alpha);
      const map = WM.worldMap({ w: WORLD_W, set, oceans, numbers: c.numbers });
      const mapH = map.height + 4;
      blocks.push(C5.worldMapCard({ map: map.svg }));
      if (L === 'continents') {
        const rows = Math.ceil(set.length / d.perRow);
        const bankH = bankHeightEst(set.map((m) => names[m.id]));
        const laneH = Math.max(d.laneH, Math.ceil((TARGET_STACK - mapH - bankH - GAP_CAP * (rows + 1)) / rows));
        const glyphH = Math.round(d.glyphH * laneH / d.laneH);
        blocks.push(C5.nameBank({ names: c.bank.map((id) => ({ id, name: names[id] })) }));
        const lanes = c.byNumber.map((id, i) => C5.nameLane({ n: i + 1, answer: id, laneW: d.laneW, laneH, glyphH }));
        for (let i = 0; i < lanes.length; i += d.perRow) blocks.push(C5.laneRow({ lanes: lanes.slice(i, i + d.perRow) }));
        stamps = { numbers: c.numbers, bank: c.bank, alpha, 'lane-h': laneH, 'glyph-h': glyphH, regions: Object.fromEntries(set.map((m) => [m.id, m.regions])) };
      } else {
        // a small locale set (<= narrowMax entries: 5 continents + 3 oceans) takes 2 wider columns, so its rows stay
        // near the 56 px entry instead of stretching to ~104 px to FILL the page (measured on the 8-entry shape)
        const cols = ids.length <= d.index.narrowMax ? 2 : d.index.cols;
        const nameW = cols === 2 ? d.index.nameW2 : d.index.nameW;
        const rows = Math.ceil(ids.length / cols);
        const rowH = Math.max(d.index.rowH, Math.ceil((TARGET_STACK - mapH - GAP_CAP * rows) / rows));
        const entries = c.index.map((id) => ({ id, name: names[id], n: c.numbers[id], kind: c.kindOf[id] }));
        for (let i = 0; i < entries.length; i += cols) blocks.push(C5.atlasRow({ entries: entries.slice(i, i + cols), nameW, box: d.index.box, rowH, gap: cols === 2 ? 31 : 13.5 }));
        stamps = { numbers: c.numbers, index: c.index, alpha, kinds: c.kindOf, 'row-h': rowH, regions: Object.fromEntries(set.map((m) => [m.id, m.regions])), oceans };
      }
      meta = { ...c, names, alpha, antarctica: set.some((m) => m.regions.includes('antarctica')) };
    } else if (L === 'directions-on-map') {
      const words = Object.fromEntries(MAPS.DIRS.map((x) => [x, literal(bankLoc.dirWords, x, 'dirWords', loc)]));
      const lt = letters();
      const c = this._composeDirections(d, rng);
      if (d.forceRows) c.rows = d.forceRows.map((r) => ({ ...r }));   // the GATE's poison seam
      const island = IM.islandMap({ w: d.islandW, symbols: c.places, footpaths: [], northArrow: null, symPx: d.symPx });
      const rose = CR.compassRose({ px: d.rosePx, reference: true, letters: lt });
      blocks.push(`<div data-lcs-dir-plate style="display:flex;align-items:flex-start;gap:10px;width:639px;flex:0 0 auto">` +
        `<div class="mp-field" style="line-height:0;outline:2px solid ${require('../../primitives/_tokens.js').color.teal};outline-offset:-2px;border-radius:2px">${island.svg}</div>` +
        `<div data-lcs-ref-rose style="line-height:0">${rose.svg}</div></div>`);
      const rowsHtml = c.rows.map((r, i) => C5.directionRow({ n: i + 1, start: r.start, dir: r.dir, answer: r.answer, word: words[r.dir],
        startSvg: MS.mapSymbol({ id: r.start, px: d.symPx }).svg, chips: r.chips.map((id) => ({ id, svg: MS.mapSymbol({ id, px: d.symPx }).svg })) }));
      if (d.legend) {
        // landing round 1: a legend naming every symbol DRAWN on the island, beside the rows (the rows keep their gaps)
        const SW = bankLoc && bankLoc.symbolWords;
        if (!SW) throw new Error(`${ID}: ${loc} bank has no symbolWords block (refuse)`);
        const keyTitle = literal(bankLoc, 'keyTitle', 'bank', loc);
        const drawn = PLACES.filter((id) => c.places.some((p) => p.id === id));
        const legend = C5.dirLegend({ title: keyTitle, rows: drawn.map((id) => ({ id, word: literal(SW, id, 'symbolWords', loc) })) });
        blocks.push(`<div data-lcs-dir-body style="display:flex;align-items:stretch;gap:12px;width:639px;flex:1 1 auto;min-height:0">` +
          `<div data-lcs-dir-rows style="display:flex;flex-direction:column;flex:1 1 auto;min-width:0">${rowsHtml.join(C5.mpGap({ min: d.gapMin != null ? d.gapMin : 6 }))}</div>${legend}</div>`);
      } else rowsHtml.forEach((h) => blocks.push(h));
      stamps = { 'in-deg': d.inDeg, 'out-deg': d.outDeg, chips: d.chips, pos: c.pos, legend: !!d.legend };
      gapMin = 6;
      meta = c;
    }
    if (d.gapMin != null) gapMin = d.gapMin;
    const st = Object.entries(stamps).map(([k, v]) => ` data-lcs-${k}='${js(v)}'`).join('');
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-layout="${L}"${st} ` +
      `style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start">` +
      blocks.join(C5.mpGap({ min: gapMin })) + `</div>`;
    return { bodyHtml, meta: { layout: L, ...meta } };
  },

  /** verify() for a face: DOM facts in the page, the rules in node (against the neutral MAPS + the bank). */
  async _verifyFace(page, layout) {
    const got = await page.evaluate(async () => {
      const fails = [], facts = {};
      /** the INK x/y extents of an svg's own markup, rasterised at 4x (a stroke is ink; a geometry bbox is not) */
      const rasterInk = async (svg) => {
        const W = +svg.getAttribute('width'), H = +svg.getAttribute('height'), S = 4;
        const img = new Image();
        await new Promise((ok, bad) => { img.onload = ok; img.onerror = bad; img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg)); });
        const c = document.createElement('canvas'); c.width = W * S; c.height = H * S;
        const g = c.getContext('2d'); g.drawImage(img, 0, 0, W * S, H * S);
        const d = g.getImageData(0, 0, c.width, c.height).data;
        let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
        for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3] > 64) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
        const vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width;
        const k = svg.getScreenCTM().a * (vb ? vb / W : 1);   // rendered px per svg px (a NESTED svg's bounding rect is its ink, not its box)
        return { w: (x1 - x0 + 1) / S * k, h: (y1 - y0 + 1) / S * k, x0: x0 / S * k, x1: (x1 + 1) / S * k };
      };
      const root = document.querySelector('[data-ws-content][data-lcs-type="maps"]');
      const R = (el) => el.getBoundingClientRect();
      const J = (k) => { const v = root.getAttribute('data-lcs-' + k); try { return v == null ? null : JSON.parse(v); } catch (e) { return null; } };
      const L = root.dataset.lcsLayout;
      facts.loc = root.dataset.lcsLocale; facts.layout = L;
      if (root.querySelector('img')) fails.push('an <img> on the face (no library picture)');
      // SPARSE + OVERLAP between consecutive blocks; nothing under the footer
      const blocks = [...root.children].filter((c) => !c.hasAttribute('data-lcs-gap'));
      const body = document.querySelector('.ws-body') || root;
      const bands = [];
      if (blocks.length) bands.push(R(blocks[0]).top - R(root).top);
      for (let i = 1; i < blocks.length; i++) {
        const g = R(blocks[i]).top - R(blocks[i - 1]).bottom;
        bands.push(g);
        if (g < -0.5) fails.push(`OVERLAP — block ${i} rides ${(-g).toFixed(1)} px into block ${i - 1}`);
      }
      bands.forEach((g, i) => { if (g > 40) fails.push(`SPARSE — ${g.toFixed(0)} px blank band before block ${i} (> 40)`); });
      facts.bands = bands;
      const last = blocks[blocks.length - 1];
      facts.fill = last ? (R(last).bottom - R(body).top) / R(body).height : 0;
      const foot = document.querySelector('.ws-foot');
      if (foot && last && R(last).bottom > R(foot).top + 0.6) fails.push('the face reaches the footer');
      if (last && R(last).bottom > R(body).bottom + 0.6) fails.push('the face overflows the body');
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');

      if (L === 'top-view') {
        const side = [...root.querySelectorAll('[data-lcs-item="side"]')], top = [...root.querySelectorAll('[data-lcs-item="top"]')];
        facts.left = side.map((e) => e.dataset.lcsModel); facts.right = top.map((e) => e.dataset.lcsModel);
        const sl = J('left'), sr = J('right');
        if (!sl || facts.left.join() !== sl.join() || !sr || facts.right.join() !== sr.join()) fails.push('the drawn columns ≠ the stamped left / right orders');
        facts.ext = {};
        for (const [items, view] of [[side, 'side'], [top, 'top']]) for (const it of items) {
          const svg = it.querySelector('svg[data-lcs-prim="top-side-view"]');
          if (!svg) { fails.push(`${view} item ${it.dataset.lcsModel} has no view`); continue; }
          if (svg.dataset.lcsModel !== it.dataset.lcsModel || svg.dataset.lcsView !== view) fails.push(`${view} item ${it.dataset.lcsModel} draws ${svg.dataset.lcsModel}/${svg.dataset.lcsView}`);
          if (svg.querySelector('text')) fails.push(`a <text> in the ${view} view of ${it.dataset.lcsModel}`);
          const ib = await rasterInk(svg), px = +svg.getAttribute('width');
          const k = svg.getScreenCTM().a;   // px per unit (the primitive's viewBox is its own px box)
          (facts.ext[it.dataset.lcsModel] = facts.ext[it.dataset.lcsModel] || {})[view] = { w: ib.w, h: ib.h, x0: ib.x0, x1: ib.x1, scale: +svg.dataset.lcsScale * k };
          if (Math.max(ib.w, ib.h) < 56) fails.push(`the ${view} view of ${it.dataset.lcsModel} is ${Math.max(ib.w, ib.h).toFixed(0)} px (< the K floor 56)`);
          const ir = R(it); if (ir.width < 99.5 || ir.height < 99.5) fails.push(`${view} item ${it.dataset.lcsModel} is ${ir.width.toFixed(0)} x ${ir.height.toFixed(0)} (< 100)`);
          if (view === 'side' && !it.querySelector('[data-lcs-ground]')) fails.push(`the side view of ${it.dataset.lcsModel} has no ground line`);
        }
        const stray = [...root.querySelectorAll('line, polyline')].filter((x) => !x.closest('[data-lcs-item], [data-lcs-view-glyph]'));
        if (stray.length) fails.push(`${stray.length} line(s) drawn between the columns (the child draws them)`);
        if (root.querySelectorAll('[data-lcs-view-glyph]').length !== 2) fails.push('the two view heads are missing');
      } else if (L === 'compass-rose') {
        const cards = [...root.querySelectorAll('[data-lcs-rose-card]')];
        facts.cards = [];
        for (const c of cards) {
          const svg = c.querySelector('svg[data-lcs-prim="compass-rose"]');
          if (!svg) { fails.push(`rose card ${c.dataset.lcsRoseCard} has no rose`); continue; }
          const rot = +svg.dataset.lcsRot, sr = R(svg), cx = (sr.left + sr.right) / 2, cy = (sr.top + sr.bottom) / 2, k = sr.width / 200;
          const card = { rot, pairs: [], given: null, givenPos: null, marker: !!svg.querySelector('[data-lcs-marker]') };
          // every rose marks north (landing round 1): the coral kite must sit at the position that points NORTH
          if (!card.marker) fails.push(`rose ${c.dataset.lcsRoseCard} (rot ${rot}) lacks the coral N marker`);
          else {
            const mk = R(svg.querySelector('[data-lcs-marker]'));
            const ma = Math.atan2((mk.left + mk.right) / 2 - cx, cy - (mk.top + mk.bottom) / 2) * 180 / Math.PI;
            const mpos = ((Math.round(ma / 90) % 4) + 4) % 4;
            if (['n', 'e', 's', 'w'][((mpos - rot / 90) % 4 + 4) % 4] !== 'n') fails.push(`rose ${c.dataset.lcsRoseCard} (rot ${rot}): the coral marker points to position ${mpos}, which is not north`);
          }
          let nGiven = 0;
          for (const g of svg.querySelectorAll('g[data-lcs-pos]')) {
            const box = g.querySelector('[data-lcs-box]'); const b = R(box);
            const a = Math.atan2((b.left + b.right) / 2 - cx, cy - (b.top + b.bottom) / 2) * 180 / Math.PI;
            const pos = ((Math.round(a / 90) % 4) + 4) % 4;
            const dir = ['n', 'e', 's', 'w'][((pos - rot / 90) % 4 + 4) % 4];
            if (dir !== g.dataset.lcsDir) fails.push(`rose ${c.dataset.lcsRoseCard}: the box drawn at position ${pos} is stamped ${g.dataset.lcsDir}, its position says ${dir}`);
            if (b.width < 36 || b.height < 36) fails.push(`rose ${c.dataset.lcsRoseCard}: a letter box is ${b.width.toFixed(0)} px (< 36)`);
            const txt = g.querySelector('text');
            if (g.hasAttribute('data-lcs-given')) {
              nGiven++;
              const letter = txt ? txt.textContent : '';
              if (letter !== g.dataset.lcsGiven) fails.push(`rose ${c.dataset.lcsRoseCard}: the given box prints "${letter}" ≠ its stamp`);
              if (+txt.getAttribute('font-size') * k < 22) fails.push(`rose ${c.dataset.lcsRoseCard}: the letter renders ${(+txt.getAttribute('font-size') * k).toFixed(1)} px (< 22)`);
              card.pairs.push([dir, letter]); card.given = dir; card.givenPos = pos;
            } else {
              if (txt && txt.textContent.trim()) fails.push(`rose ${c.dataset.lcsRoseCard}: a blank box prints "${txt.textContent}"`);
              card.pairs.push([dir, g.dataset.lcsAnswer]);
            }
          }
          if (nGiven !== 1) fails.push(`rose ${c.dataset.lcsRoseCard} shows ${nGiven} given letters (exactly 1)`);
          facts.cards.push(card);
        }
        facts.rotSet = J('rot-set'); facts.cols = J('cols');
      } else if (L === 'continents' || L === 'continents-oceans') {
        const svg = root.querySelector('svg[data-lcs-prim="world-map"]');
        if (!svg) { fails.push('no world map'); return { fails, facts }; }
        const lands = svg.querySelectorAll('[data-lcs-land]');
        if (lands.length !== 1 || (lands[0].getAttribute('fill') || '').toUpperCase() !== '#FFFFFF') fails.push('the land is not ONE white fill (a colour-coded map prints the grouping)');
        const land = lands[0], sea = svg.querySelector('[data-lcs-sea]');
        const pt = (x, y) => { const p = svg.createSVGPoint(); p.x = x; p.y = y; return p; };
        const k = R(svg).width / +svg.viewBox.baseVal.width;   // px per unit
        facts.crop = +svg.dataset.lcsCrop;
        facts.markers = [];
        for (const m of svg.querySelectorAll('g[data-lcs-marker]')) {
          const cs = m.querySelectorAll('circle'), disc = cs[1] || cs[0], txt = m.querySelector('text');
          const x = +disc.getAttribute('cx'), y = +disc.getAttribute('cy');
          const f = { id: m.dataset.lcsMarker, n: +m.dataset.lcsN, x, y, text: txt ? txt.textContent : '', region: m.dataset.lcsRegion || null, ocean: m.dataset.lcsOcean || null, leader: m.hasAttribute('data-lcs-via-leader') };
          if (String(f.n) !== f.text) fails.push(`marker ${f.id} prints "${f.text}" ≠ its stamp ${f.n}`);
          if (+cs[0].getAttribute('r') * 2 * k < 35.5) fails.push(`marker ${f.id}: the halo is ${(+cs[0].getAttribute('r') * 2 * k).toFixed(1)} px (< 36)`);
          if (txt && +txt.getAttribute('font-size') * k < 19.5) fails.push(`marker ${f.id}: the numeral is ${(+txt.getAttribute('font-size') * k).toFixed(1)} px (< 20)`);
          if (f.region) {
            if (!land.isPointInFill(pt(x, y))) fails.push(`anchor rule — continent disc ${f.id} sits on water`);
          } else if (f.ocean) {
            const rr = 21 / k; let wet = !land.isPointInFill(pt(x, y));
            for (let a = 0; a < 24 && wet; a++) if (land.isPointInFill(pt(x + rr * Math.cos(a * Math.PI / 12), y + rr * Math.sin(a * Math.PI / 12)))) wet = false;
            if (!wet) fails.push(`ocean disc ${f.id} is on land or within 6 px of the coast`);
          }
          facts.markers.push(f);
        }
        facts.leaders = {};
        for (const dEl of svg.querySelectorAll('[data-lcs-leader-dot]')) {
          const id = dEl.dataset.lcsLeaderDot, x = +dEl.getAttribute('cx'), y = +dEl.getAttribute('cy');
          const okDot = id === 'antarctica' ? land.isPointInFill(pt(x, y)) : (!land.isPointInFill(pt(x, y)) && sea.isPointInFill(pt(x, y)));
          if (!okDot) fails.push(`the ${id} leader dot is off its target`);
          facts.leaders[id] = [x, y];
        }
        facts.numbers = J('numbers'); facts.regions = J('regions'); facts.alpha = J('alpha');
        if (L === 'continents') {
          facts.bank = [...root.querySelectorAll('[data-lcs-bank-word]')].map((b) => [b.dataset.lcsBankWord, b.textContent.trim()]);
          for (const b of root.querySelectorAll('.ws-bankword')) if (parseFloat(getComputedStyle(b).fontSize) < 17) fails.push('a bank name under 17 px');
          facts.lanes = [...root.querySelectorAll('[data-lcs-lane]')].map((l) => {
            const box = l.querySelector('.ws-blankbox'), num = l.querySelector('[data-lcs-lane-n]');
            if (box.textContent.trim()) fails.push(`lane ${l.dataset.lcsLane} prints "${box.textContent.trim()}"`);
            if (R(box).height < 43.5) fails.push(`lane ${l.dataset.lcsLane} is ${R(box).height.toFixed(0)} px tall (< 44)`);
            if (num.textContent !== l.dataset.lcsLane) fails.push(`lane ${l.dataset.lcsLane} shows the number "${num.textContent}"`);
            return [+l.dataset.lcsLane, box.getAttribute('data-lcs-answer')];
          });
        } else {
          facts.index = [...root.querySelectorAll('[data-lcs-index]')].map((e) => {
            const box = e.querySelector('[data-lcs-answer]'), nm = e.querySelector('[data-lcs-index-name]');
            if (box.textContent.trim()) fails.push(`index box ${e.dataset.lcsIndex} prints "${box.textContent.trim()}"`);
            const br = R(box); if (br.width < 43.5 || br.height < 39.5) fails.push(`index box ${e.dataset.lcsIndex} is ${br.width.toFixed(0)} x ${br.height.toFixed(0)} (< 44 x 40)`);
            if (parseFloat(getComputedStyle(nm).fontSize) < 17) fails.push(`index name ${e.dataset.lcsIndex} under 17 px`);
            const rg = document.createRange(); rg.selectNodeContents(nm);
            const rects = [...rg.getClientRects()];
            if (new Set(rects.map((q) => Math.round(q.top))).size > 2) fails.push(`index name "${nm.textContent}" runs past 2 lines`);
            if (rects.some((q) => q.right > R(nm).right + 1)) fails.push(`index name "${nm.textContent}" is wider than its column`);
            if (rects.some((q) => q.bottom > R(e).bottom + 1 || q.top < R(e).top - 1)) fails.push(`index name "${nm.textContent}" spills out of its row`);
            return { id: e.dataset.lcsIndex, kind: e.dataset.lcsKind, name: nm.textContent, answer: box.getAttribute('data-lcs-answer') };
          });
          facts.kinds = J('kinds'); facts.oceans = J('oceans');
        }
      } else if (L === 'directions-on-map') {
        const field = root.querySelector('.mp-field svg[data-lcs-prim="island-map"]');
        if (!field) { fails.push('no island map'); return { fails, facts }; }
        if (field.querySelector('[data-lcs-north]')) fails.push('a north arrow on the F5 island (the reference rose is the tool)');
        if (field.querySelector('text')) fails.push('a letter / number on the plate (the G2-279 fence)');
        const ctm = field.getScreenCTM();
        facts.at = {};
        const placed = [...field.querySelectorAll('svg[data-lcs-sym]')].filter((s) => s.dataset.lcsSym !== 'bridge');
        for (const s of placed) {
          const x = +s.getAttribute('x'), y = +s.getAttribute('y'), w = +s.getAttribute('width');
          const id = s.dataset.lcsSym;
          if (facts.at[id]) fails.push(`${id} is drawn twice on the island`);
          facts.at[id] = [ctm.a * (x + w / 2) + ctm.e, ctm.d * (y + w / 2) + ctm.f];
          if (Math.abs(ctm.a * w - 40) > 0.6) fails.push(`${id} renders ${(ctm.a * w).toFixed(1)} px on the island (≠ 40)`);
        }
        const ids = Object.keys(facts.at);
        // NO UNNAMED SYMBOL (landing round 1, 2026-09-23): every symbol drawn on the island is named in a legend on the page
        const named = new Map([...root.querySelectorAll('[data-lcs-dir-legend] [data-lcs-dir-key]')].map((k) => [k.dataset.lcsDirKey, k]));
        for (const id of ids) {
          const k = named.get(id);
          if (!k) { fails.push(`unnamed symbol — ${id} is drawn on the island but no legend names it`); continue; }
          const sym = k.querySelector('svg[data-lcs-symbol]'), w = k.querySelector('[data-lcs-dir-key-word]');
          if (!sym || sym.dataset.lcsSymbol !== id) fails.push(`legend entry ${id} draws ${sym && sym.dataset.lcsSymbol}`);
          if (!w || !w.textContent.trim()) fails.push(`legend entry ${id} has no word`);
          else {
            if (parseFloat(getComputedStyle(w).fontSize) < 16) fails.push(`legend word ${id} under 16 px`);
            const rg = document.createRange(); rg.selectNodeContents(w);
            const rects = [...rg.getClientRects()];
            if (rects.some((q) => q.right > R(w).right + 1)) fails.push(`legend word "${w.textContent}" is wider than its column`);
            if (new Set(rects.map((q) => Math.round(q.top))).size > 2) fails.push(`legend word "${w.textContent}" runs past 2 lines`);
          }
        }
        for (const id of named.keys()) if (!facts.at[id]) fails.push(`the legend names ${id}, which is not on the island`);
        // SPARSE inside the rows column (the rows are no longer root blocks when the legend sits beside them)
        const drows = [...root.querySelectorAll('[data-lcs-dir-rows] > [data-lcs-dir-row]')];
        for (let i = 1; i < drows.length; i++) { const g = R(drows[i]).top - R(drows[i - 1]).bottom; if (g > 40) fails.push(`SPARSE — ${g.toFixed(0)} px blank band before row ${i + 1} (> 40)`); if (g < -0.5) fails.push(`OVERLAP — row ${i + 1} rides into row ${i}`); }
        if (drows.length) {
          const lastB = Math.max(R(drows[drows.length - 1]).bottom, ...[...root.querySelectorAll('[data-lcs-dir-legend]')].map((x) => R(x).bottom));
          facts.fill = (lastB - R(body).top) / R(body).height;
          if (R(body).bottom - lastB > 40.5) fails.push(`SPARSE — ${(R(body).bottom - lastB).toFixed(0)} px blank band under the last row (> 40)`);
          const lg = root.querySelector('[data-lcs-dir-legend]');
          if (lg && (R(lg).top < R(drows[0]).top - 0.5 - 40 || R(lg).bottom > R(body).bottom + 0.6)) fails.push('the legend leaves the rows band');
        }
        for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) { const a = facts.at[ids[i]], b = facts.at[ids[j]]; if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 71.5) fails.push(`${ids[i]} and ${ids[j]} are ${Math.hypot(a[0] - b[0], a[1] - b[1]).toFixed(0)} px apart (< 72)`); }
        facts.rows = [...root.querySelectorAll('[data-lcs-dir-row]')].map((r) => {
          const chips = [...r.querySelectorAll('[data-lcs-chip]')];
          for (const ch of chips) {
            const sym = ch.querySelector('svg[data-lcs-symbol]');
            if (!sym || sym.dataset.lcsSymbol !== ch.dataset.lcsChip) fails.push(`row ${r.dataset.lcsDirRow}: chip ${ch.dataset.lcsChip} draws ${sym && sym.dataset.lcsSymbol}`);
            if (R(ch).width < 51.5) fails.push(`row ${r.dataset.lcsDirRow}: a chip is ${R(ch).width.toFixed(0)} px (< 52)`);
            if (sym && R(sym).width < 39.5) fails.push(`row ${r.dataset.lcsDirRow}: a chip symbol is ${R(sym).width.toFixed(0)} px (< 40)`);
            if (ch.querySelector('[data-lcs-circled], ellipse')) fails.push(`row ${r.dataset.lcsDirRow}: a chip is circled`);
          }
          const st = r.querySelector('[data-lcs-start-frame] svg[data-lcs-symbol]');
          if (!st || st.dataset.lcsSymbol !== r.dataset.lcsStart) fails.push(`row ${r.dataset.lcsDirRow}: the start frame draws ${st && st.dataset.lcsSymbol} ≠ ${r.dataset.lcsStart}`);
          const w = r.querySelector('[data-lcs-dir-word]');
          if (parseFloat(getComputedStyle(w).fontSize) < 17) fails.push(`row ${r.dataset.lcsDirRow}: the direction word under 17 px`);
          const rg = document.createRange(); rg.selectNodeContents(w); if (rg.getBoundingClientRect().width > R(w).width - 4) fails.push(`row ${r.dataset.lcsDirRow}: the word "${w.textContent}" is wider than its chip`);
          return { n: +r.dataset.lcsDirRow, start: r.dataset.lcsStart, dir: r.dataset.lcsDir, answer: r.dataset.lcsAnswer, chips: chips.map((c) => c.dataset.lcsChip), word: w.textContent };
        });
        const rose = root.querySelector('[data-lcs-ref-rose] svg[data-lcs-prim="compass-rose"][data-lcs-reference]');
        if (!rose) fails.push('no reference rose');
        else {
          const k = R(rose).width / 200;
          facts.rose = [...rose.querySelectorAll('[data-lcs-ref]')].map((g) => { const t = g.querySelector('text'); if (+t.getAttribute('font-size') * k < 14) fails.push(`the reference rose letter renders ${(+t.getAttribute('font-size') * k).toFixed(1)} px (< 14)`); return [g.dataset.lcsDir, t.textContent]; });
          if (+rose.dataset.lcsRot !== 0) fails.push('the reference rose is turned');
        }
        facts.inDeg = J('in-deg'); facts.outDeg = J('out-deg'); facts.nChips = J('chips');
      }
      return { fails, facts };
    });
    const fails = got.fails, F = got.facts;
    let b = null;
    try { b = loadBank(BANK, F.loc); } catch (e) { fails.push(`no ${F.loc} bank for the cross-check: ${e.message}`); }
    if (layout === 'top-view') {
      const { left, right, ext } = F;
      if (new Set(left).size !== left.length || left.slice().sort().join() !== right.slice().sort().join()) fails.push(`the columns [${left}] / [${right}] are not one set of models`);
      for (const m of left) if (!MAPS.TOPSIDE[m]) fails.push(`unknown model ${m}`);
      topViewLimits(left).forEach((x) => fails.push(`class limit — ${x}`));
      if (left.some((m, i) => right[i] === m)) fails.push('a model sits level with its own top view (not a derangement)');
      if (right.join() === left.slice().reverse().join()) fails.push('the right column is the left reversed (tell)');
      if (isRotation(left, right)) fails.push('the right column is the left shifted by a constant (tell)');
      for (const m of left) {
        const e = ext[m]; if (!e || !e.side || !e.top) continue;
        // per EDGE, in each view's own box (both centre the model's x-extent): the design's +-1 px ink rule (the tree's scalloped crown +-6 units)
        const tol = m === 'tree' ? 6 * e.side.scale : 1;
        const dx = Math.max(Math.abs(e.side.x0 - e.top.x0), Math.abs(e.side.x1 - e.top.x1));
        if (dx > tol) fails.push(`${m}: the side and top ink edges differ by ${dx.toFixed(2)} px (> ${tol.toFixed(1)}; one model, one scale)`);
      }
    } else if (layout === 'compass-rose') {
      for (const c of F.cards) for (const [dir, letter] of c.pairs) if (b && b.dirLetters[dir] !== letter) fails.push(`letter from position — the ${dir} box carries "${letter}" ≠ dirLetters.${dir} "${b.dirLetters[dir]}"`);
      if (F.rotSet && F.cards.map((c) => c.rot).sort().join() !== F.rotSet.slice().sort().join()) fails.push(`the rotations [${F.cards.map((c) => c.rot)}] ≠ the configured multiset`);
      const given = F.cards.map((c) => c.given);
      if (given.includes('n')) fails.push(`a rose gives N [${given}] (the coral marker already shows north)`);
      if (new Set(given).size < 3) fails.push(`the given letters [${given}] do not cover E, S and W`);
      if (isPeriodic(given)) fails.push(`the given letters [${given}] repeat periodically (tell)`);
      if (new Set(F.cards.map((c) => c.givenPos)).size < 2) fails.push('every given letter sits in the same box position (tell)');
      const up = F.cards.map((c, i) => (c.rot === 0 ? i : -1)).filter((i) => i >= 0);
      if (up.length > 1 && F.cols && (new Set(up.map((i) => i % F.cols)).size < 2 || new Set(up.map((i) => Math.floor(i / F.cols))).size < 2)) fails.push('the upright roses form one line (tell)');
    } else if (layout === 'continents' || layout === 'continents-oceans') {
      const nums = F.numbers || {}, regs = F.regions || {};
      const ant = Object.values(regs).some((r) => r.includes('antarctica'));
      if ((F.crop === -90) !== ant) fails.push(`Antarctica ${F.crop === -90 ? 'drawn' : 'cropped'} but ${ant ? 'in' : 'not in'} the set`);
      for (const [id, rs] of Object.entries(regs)) {
        const ms = F.markers.filter((m) => m.id === id);
        if (ms.length !== rs.length) fails.push(`member ${id} shows ${ms.length} numerals for ${rs.length} region(s)`);
        for (const r of rs) if (r !== 'antarctica' && !ms.some((m) => m.region === r)) fails.push(`member ${id} has no numeral on ${r}`);
        if (rs.includes('antarctica') && !ms.some((m) => m.leader)) fails.push(`member ${id} (Antarctica) has no leader`);
        if (ms.some((m) => m.n !== nums[id])) fails.push(`member ${id}: a numeral ≠ its number ${nums[id]}`);
        for (const m of ms) if (m.region) { const A = WM_DATA.anchors[m.region]; if (!A || Math.hypot(A.x - m.x, A.y - m.y) > 0.5) fails.push(`anchor rule — the ${id} disc on ${m.region} is not at the gated anchor`); }
      }
      const allIds = Object.keys(nums);
      if (allIds.map((id) => nums[id]).sort((a, c) => a - c).join() !== allIds.map((_, i) => i + 1).join()) fails.push('the numbers are not 1..N once each');
      const byNumber = allIds.slice().sort((a, c) => nums[a] - nums[c]);
      if (layout === 'continents') {
        if (F.markers.some((m) => m.ocean)) fails.push('an ocean marker on the continents face');
        const bankIds = F.bank.map((x) => x[0]);
        if (bankIds.slice().sort().join() !== Object.keys(regs).sort().join()) fails.push(`the bank [${bankIds}] ≠ the set`);
        if (b) for (const [id, t] of F.bank) if (b.continentNames[id] !== t) fails.push(`the bank prints "${t}" ≠ continentNames.${id}`);
        if (bankIds.join() === byNumber.join()) fails.push('the bank order equals the numeral order (tell)');
        if (bankIds.join() === byNumber.slice().reverse().join()) fails.push('the bank order is the numeral order reversed (tell)');
        if (F.alpha && bankIds.join() === F.alpha.join()) fails.push('the bank order is alphabetical (tell)');
        F.lanes.forEach(([n, a], i) => { if (n !== i + 1) fails.push(`lane ${i + 1} is numbered ${n}`); if (a !== byNumber[n - 1]) fails.push(`lane ${n}: the hidden answer "${a}" ≠ member ${byNumber[n - 1]}`); });
        if (F.lanes.length !== byNumber.length) fails.push(`${F.lanes.length} lanes for ${byNumber.length} continents`);
      } else {
        const kinds = F.kinds || {};
        const idx = F.index.map((e) => e.id);
        if (idx.slice().sort().join() !== allIds.slice().sort().join()) fails.push(`the index [${idx}] ≠ continents ∪ oceans once each`);
        for (const e of F.index) {
          if (+e.answer !== nums[e.id]) fails.push(`index ${e.id}: the hidden answer ${e.answer} ≠ its number ${nums[e.id]}`);
          if (b) { const want = kinds[e.id] === 'sea' ? b.oceanNames[e.id] : b.continentNames[e.id]; if (want !== e.name) fails.push(`index ${e.id} prints "${e.name}" ≠ the bank "${want}"`); }
        }
        for (const oc of F.oceans || []) {
          const ms = F.markers.filter((m) => m.id === oc);
          const want = oc === 'pacific' ? 2 : 1;
          if (ms.length !== want) fails.push(`ocean ${oc} shows ${ms.length} numerals (≠ ${want})`);
          if (['arctic', 'southern'].includes(oc) && !(ms.length && ms[0].leader)) fails.push(`ocean ${oc} has no corner leader`);
        }
        const kseq = idx.map((id) => kinds[id]);
        let run = 0, mx = 0; kseq.forEach((x, i) => { run = i && x === kseq[i - 1] ? run + 1 : 1; mx = Math.max(mx, run); });
        if (mx > 2) fails.push(`the index runs ${mx} of one kind in a row (tell)`);
        if (idx.join() === byNumber.join()) fails.push('the index order equals the numeral order (tell)');
        if (F.alpha && idx.join() === F.alpha.join()) fails.push('the index order is alphabetical (tell)');
        const nk = byNumber.map((id) => kinds[id]);
        if (blockyKinds(nk)) fails.push('the numbering runs land-then-sea (tell)');
      }
    } else if (layout === 'directions-on-map') {
      const at = F.at;
      if (Object.keys(at).length !== PLACES.length) fails.push(`${Object.keys(at).length} places on the island (≠ ${PLACES.length})`);
      const starts = F.rows.map((r) => r.start);
      if (new Set(starts).size !== F.rows.length) fails.push(`the rows reuse a start [${starts}] (6 distinct starts)`);
      if (new Set(F.rows.map((r) => r.dir)).size < 4) fails.push('the rows do not ask all four directions');
      const posSeq = [];
      for (const r of F.rows) {
        if (!at[r.start]) { fails.push(`row ${r.n}: the start ${r.start} is not on the island`); continue; }
        if (r.chips.length !== F.nChips) fails.push(`row ${r.n} offers ${r.chips.length} chips`);
        if (r.chips.includes(r.start)) fails.push(`row ${r.n}: the start is one of its own chips`);
        if (r.chips.includes('tree') && r.chips.includes('bush')) fails.push(`row ${r.n}: tree and bush are both chips`);
        const offs = r.chips.map((c) => (at[c] ? bearingOff(at[r.start], at[c], r.dir) : NaN));
        const inside = r.chips.filter((c, i) => offs[i] <= F.inDeg);
        if (inside.length !== 1) fails.push(`bearing rule — row ${r.n}: ${inside.length} chips lie within ${F.inDeg}° of ${r.dir} [${offs.map((o) => o.toFixed(0))}]`);
        else if (inside[0] !== r.answer) fails.push(`row ${r.n}: the chip within ${F.inDeg}° is ${inside[0]}, the stamp says ${r.answer}`);
        r.chips.forEach((c, i) => { if (c !== inside[0] && !(offs[i] >= F.outDeg)) fails.push(`bearing rule — row ${r.n}: chip ${c} lies ${offs[i].toFixed(0)}° off ${r.dir} (< ${F.outDeg})`); });
        posSeq.push(r.chips.indexOf(r.answer));
        if (b && r.word !== b.dirWords[r.dir]) fails.push(`row ${r.n} prints "${r.word}" ≠ dirWords.${r.dir}`);
      }
      // landing review 2026-09-23 — re-derived from the bearings (the one chip inside inDeg), never from the answer stamp
      const derivedAns = F.rows.map((r) => { const inside = at[r.start] ? r.chips.filter((c) => at[c] && bearingOff(at[r.start], at[c], r.dir) <= F.inDeg) : []; return inside.length === 1 ? inside[0] : null; });
      const cnt = {}; derivedAns.forEach((a) => { if (a) cnt[a] = (cnt[a] || 0) + 1; });
      for (const [a, n] of Object.entries(cnt)) if (n > ANSWER_CAP) fails.push(`answer cap — ${a} is the answer in ${n} of ${F.rows.length} rows (<= ${ANSWER_CAP})`);
      for (let i = 0; i < F.rows.length; i++) for (let j = i + 1; j < F.rows.length; j++) if (derivedAns[i] && derivedAns[j] && F.rows[i].start === derivedAns[j] && F.rows[j].start === derivedAns[i]) fails.push(`mirror pair — rows ${F.rows[i].n} and ${F.rows[j].n} swap start and answer (${F.rows[i].start} <-> ${F.rows[j].start})`);
      if (new Set(posSeq).size < 2 || isPeriodic(posSeq)) fails.push(`the correct chip positions [${posSeq}] are constant or periodic (tell)`);
      if (b && F.rose) for (const [dir, t] of F.rose) if (b.dirLetters[dir] !== t) fails.push(`the reference rose prints "${t}" at ${dir} ≠ dirLetters.${dir}`);
    }
    return fails;
  },

  async verify(page) {
    const faceLayout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-type="maps"]'); return r ? (r.getAttribute('data-lcs-layout') || '') : ''; });
    if (faceLayout && MAPS.LAYOUTS.includes(faceLayout)) return this._verifyFace(page, faceLayout);
    const fails = await page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="maps"]');
      if (!root) return ['no maps root'];
      const R = (el) => el.getBoundingClientRect();
      if (root.hasAttribute('data-lcs-layout')) fails.push('data-lcs-layout is stamped on the base');
      if (root.querySelector('img')) fails.push('an <img> on the base (no library picture; the map is the art)');
      const keyIds = (root.dataset.lcsKey || '').split(',').filter(Boolean);
      const asked = (root.dataset.lcsAsked || '').split(',').filter(Boolean);
      const unasked = (root.dataset.lcsUnasked || '').split(',').filter(Boolean);
      const symPx = +root.dataset.lcsSymPx, showSym = root.dataset.lcsShowSym === '1', minDistinct = +root.dataset.lcsMinDistinct;
      const nFoot = (root.dataset.lcsFootpaths || '').split(',').filter(Boolean).length;
      const field = root.querySelector('.mp-field svg[data-lcs-prim="island-map"]');
      if (!field) { fails.push('no island map in .mp-field'); return fails; }
      const land = field.querySelector('[data-lcs-land]');
      const ctm = field.getScreenCTM();
      const toUnits = (x, y) => { const p = field.createSVGPoint(); p.x = x; p.y = y; return p.matrixTransform(ctm.inverse()); };
      const onLand = (x, y) => { const u = toUnits(x, y); const p = field.createSVGPoint(); p.x = u.x; p.y = u.y; return land.isPointInFill(p); };
      // placed symbols
      const syms = [...field.querySelectorAll('[data-lcs-sym]')];
      const placed = syms.filter((s) => s.dataset.lcsSym !== 'bridge');
      const bridges = syms.filter((s) => s.dataset.lcsSym === 'bridge');
      const count = (id) => field.querySelectorAll(`[data-lcs-sym="${id}"]`).length;
      // a placed symbol is a nested <svg>: its BOX is its x/y/width/height through the field's CTM (not the ink bbox)
      const R0 = R;
      const boxOf = (s) => { if (s.tagName.toLowerCase() !== 'svg') return R0(s); const x = +s.getAttribute('x'), y = +s.getAttribute('y'), w = +s.getAttribute('width'), h = +s.getAttribute('height');
        return { left: ctm.a * x + ctm.e, top: ctm.d * y + ctm.f, right: ctm.a * (x + w) + ctm.e, bottom: ctm.d * (y + h) + ctm.f, width: ctm.a * w, height: ctm.d * h }; };
      if (bridges.length !== 1 + nFoot) fails.push(`${bridges.length} bridges ≠ 1 + ${nFoot} footpaths`);
      for (const s of placed) {
        if (!keyIds.includes(s.dataset.lcsSym)) fails.push(`a ${s.dataset.lcsSym} on the map is not in the key`);
        const r = boxOf(s);
        if (Math.abs(r.width - symPx) > 0.6 || Math.abs(r.height - symPx) > 0.6) fails.push(`${s.dataset.lcsSym} renders ${r.width.toFixed(1)} px ≠ ${symPx}`);
        for (const [x, y] of [[r.left + 1, r.top + 1], [r.right - 1, r.top + 1], [r.left + 1, r.bottom - 1], [r.right - 1, r.bottom - 1]]) if (!onLand(x, y)) { fails.push(`${s.dataset.lcsSym} at (${s.dataset.lcsX},${s.dataset.lcsY}): a box corner is on the sea`); break; }
      }
      // pairwise gaps >= 8 px (placed symbols; a bridge counted by its drawn box)
      const boxes = syms.map((s) => ({ id: s.dataset.lcsSym, r: boxOf(s) }));
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i].r, b = boxes[j].r;
        const gap = Math.max(b.left - a.right, a.left - b.right, b.top - a.bottom, a.top - b.bottom);
        if (gap < 8) fails.push(`${boxes[i].id} and ${boxes[j].id} are ${gap.toFixed(1)} px apart (< 8)`);
      }
      // bands: no placed symbol within 6 px of the river / road band
      const bandPts = (sel) => { const p = field.querySelector(sel); if (!p) return []; const m = p.getScreenCTM(); const L = p.getTotalLength(); const out = []; for (let k = 0; k <= 400; k++) { const q = p.getPointAtLength(L * k / 400); out.push([m.a * q.x + m.c * q.y + m.e, m.b * q.x + m.d * q.y + m.f]); } return { pts: out, half: parseFloat(p.getAttribute('stroke-width')) / 2 * m.a }; };
      const river = bandPts('[data-lcs-river]'), road = bandPts('[data-lcs-road]');
      const boxDist = (r, [x, y]) => Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom));
      for (const s of placed) {
        const r = boxOf(s);
        for (const [nm, b] of [['river', river], ['road', road]]) {
          const d = Math.min(...b.pts.map((p) => boxDist(r, p))) - b.half;
          if (d < 6) fails.push(`${s.dataset.lcsSym} sits ${d.toFixed(1)} px from the ${nm} band (< 6)`);
        }
      }
      for (const b of bridges) {
        const r = R(b), cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2;
        const d = Math.min(...river.pts.map(([x, y]) => Math.hypot(x - cx, y - cy)));
        if (d > 3) fails.push(`bridge ${b.dataset.lcsSlot} is ${d.toFixed(1)} px off the river`);
      }
      // the north arrow: in the sea, never on land
      const arrow = field.querySelector('[data-lcs-north]');
      if (!arrow) fails.push('no north arrow');
      else {
        const r = R(arrow);
        for (let k = 0; k <= 8; k++) for (let m = 0; m <= 8; m++) if (onLand(r.left + (r.width * k) / 8, r.top + (r.height * m) / 8)) { fails.push('the north arrow touches the land'); k = m = 9; }
        const letter = arrow.querySelector('[data-lcs-north-letter]');
        if (!letter || letter.textContent !== arrow.dataset.lcsNorth) fails.push('the north-arrow letter ≠ its stamp');
      }
      // the key
      const keyCells = [...root.querySelectorAll('[data-lcs-legend] [data-lcs-key]')];
      if (keyCells.map((k) => k.dataset.lcsKey).join() !== keyIds.join()) fails.push('the key cells ≠ the stamped key order');
      if (keyCells.length && unasked.includes(keyCells[keyCells.length - 1].dataset.lcsKey)) fails.push('the unasked entry is the last key cell');
      // a count box for EVERY key symbol (landing round 1): the instruction asks for each thing in the key
      const boxed = new Set([...root.querySelectorAll('[data-lcs-row]')].map((c) => c.dataset.lcsRow));
      for (const k of keyCells) if (!boxed.has(k.dataset.lcsKey)) fails.push(`key symbol ${k.dataset.lcsKey} has no count box (every symbol in the key is counted)`);
      if (!keyIds.includes('tree')) fails.push('the key has no tree');
      keyCells.forEach((k) => {
        const svg = k.querySelector('svg[data-lcs-symbol]');
        if (!svg || svg.dataset.lcsSymbol !== k.dataset.lcsKey) fails.push(`key cell ${k.dataset.lcsKey}: its symbol is ${svg && svg.dataset.lcsSymbol}`);
        else if (Math.abs(R(svg).width - symPx) > 0.6) fails.push(`key symbol ${k.dataset.lcsKey} is ${R(svg).width.toFixed(1)} px ≠ the map's ${symPx}`);
        const w = k.querySelector('[data-lcs-key-word]');
        if (!w || !w.textContent.trim()) fails.push(`key cell ${k.dataset.lcsKey} has no word`);
        else {
          if (parseFloat(getComputedStyle(w).fontSize) < 17) fails.push(`key word ${k.dataset.lcsKey} under 17 px`);
          const range = document.createRange(); range.selectNodeContents(w);
          const rects = [...range.getClientRects()], wr = R(w);
          const cell = R(k);
          if (rects.some((q) => q.right > wr.right + 1 || q.left < wr.left - 1)) fails.push(`key word "${w.textContent}" is wider than its column`);
          if (rects.some((q) => q.bottom > cell.bottom + 1 || q.top < cell.top - 1)) fails.push(`key word "${w.textContent}" spills out of its key row`);
          const lines = new Set(rects.map((q) => Math.round(q.top))).size;
          if (lines > 2) fails.push(`key word "${w.textContent}" runs to ${lines} lines`);
        }
      });
      const title = root.querySelector('[data-lcs-key-title]');
      if (!title || !title.textContent.trim()) fails.push('the key has no title');
      // the cards
      const cards = [...root.querySelectorAll('[data-lcs-count-strip] [data-lcs-row]')];
      const cardIds = cards.map((c) => c.dataset.lcsRow);
      if (cardIds.slice().sort().join() !== asked.slice().sort().join()) fails.push(`card ids [${cardIds}] ≠ asked [${asked}]`);
      const answers = [];
      cards.forEach((c) => {
        const id = c.dataset.lcsRow;
        if (!keyIds.includes(id)) fails.push(`card ${id} is not in the key`);
        if (!showSym && c.querySelector('svg[data-lcs-symbol], [data-lcs-row-sym]')) fails.push(`card ${id} prints its symbol (rowsShowSymbol is false)`);
        if (showSym && !c.querySelector('svg[data-lcs-symbol]')) fails.push(`card ${id} has no symbol (the d1 scaffold)`);
        const box = c.querySelector('[data-lcs-answer]');
        if (!box) { fails.push(`card ${id} has no answer box`); return; }
        if (box.textContent.trim()) fails.push(`card ${id}: the box prints "${box.textContent.trim()}"`);
        const a = box.getAttribute('data-lcs-answer');
        if (!/^\d+$/.test(a)) fails.push(`card ${id}: answer stamp "${a}" is not a count`);
        const want = count(id);
        if (+a !== want) fails.push(`card ${id}: the stamp says ${a}, the map shows ${want}`);
        answers.push(+a);
        const br = R(box);
        if (br.width < 63.4 || br.height < 47.4) fails.push(`card ${id}: box ${br.width.toFixed(0)} x ${br.height.toFixed(0)} < 64 x 48`);
        const w = c.querySelector('[data-lcs-row-word]');
        if (!w || !w.textContent.trim()) fails.push(`card ${id} has no word`);
        else {
          if (parseFloat(getComputedStyle(w).fontSize) < 17) fails.push(`card word ${id} under 17 px`);
          const range = document.createRange(); range.selectNodeContents(w); const rr = range.getBoundingClientRect();
          if (rr.width > R(w).width + 1) fails.push(`card word "${w.textContent}" is wider than its card`);
          if (rr.height > R(w).height + 2) fails.push(`card word "${w.textContent}" spills out of its word band`);
          const lines = new Set([...range.getClientRects()].map((q) => Math.round(q.top))).size;
          if (lines > 2) fails.push(`card word "${w.textContent}" runs to ${lines} lines`);
        }
      });
      if (new Set(answers).size < minDistinct) fails.push(`${new Set(answers).size} distinct answers < ${minDistinct}`);
      const keyAsked = keyIds.filter((k) => asked.includes(k));
      if (cardIds.join() === keyAsked.join()) fails.push('the card order equals the key order (position leak)');
      if (answers.length > 2 && (answers.every((v, i) => i === 0 || v >= answers[i - 1]) || answers.every((v, i) => i === 0 || v <= answers[i - 1]))) fails.push('the card answers run in count order (tell)');
      if (answers.some((v, i) => i > 0 && v === answers[i - 1])) fails.push('two adjacent cards have the same answer');
      // SPARSE: the band between the sheet and the strip
      const sheet = root.querySelector('[data-lcs-map-sheet]'), strip = root.querySelector('[data-lcs-count-strip]');
      if (sheet && strip) { const g = R(strip).top - R(sheet).bottom; if (g > 40) fails.push(`SPARSE — ${g.toFixed(0)} px blank band between the map sheet and the cards (> 40)`); if (g < 8) fails.push(`the cards crowd the sheet (${g.toFixed(0)} px)`); }
      else fails.push('no sheet or no card strip');
      if (sheet && R(sheet).top - R(root).top > 40) fails.push(`SPARSE — ${(R(sheet).top - R(root).top).toFixed(0)} px blank band above the sheet`);
      const foot = document.querySelector('.ws-foot');
      if (foot && strip && R(strip).bottom > R(foot).top + 0.6) fails.push('the cards reach the footer');
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');
      // no digit printed anywhere on the base (every count is an OPEN box)
      if (/\d/.test(root.textContent)) fails.push('a digit is printed on the base');
      return fails;
    });
    // node cross-check: every printed word === the bank literal
    const got = await page.evaluate(() => { const r = document.querySelector('[data-lcs-type="maps"]'); return r ? {
      loc: r.dataset.lcsLocale,
      key: [...r.querySelectorAll('[data-lcs-key]')].filter((k) => k.hasAttribute('data-lcs-key') && k.querySelector('[data-lcs-key-word]')).map((k) => [k.dataset.lcsKey, k.querySelector('[data-lcs-key-word]').textContent]),
      cards: [...r.querySelectorAll('[data-lcs-row]')].map((c) => [c.dataset.lcsRow, (c.querySelector('[data-lcs-row-word]') || {}).textContent]),
      title: (r.querySelector('[data-lcs-key-title]') || {}).textContent, north: (r.querySelector('[data-lcs-north-letter]') || {}).textContent,
    } : null; });
    if (got) {
      let b = null;
      try { b = loadBank(BANK, got.loc); } catch (e) { fails.push(`no ${got.loc} bank for the cross-check: ${e.message}`); }
      if (b) {
        for (const [id, t] of [...got.key, ...got.cards]) if (b.symbolWords[id] !== t) fails.push(`${id} prints "${t}" ≠ symbolWords.${id} "${b.symbolWords[id]}"`);
        if (got.title !== b.keyTitle) fails.push(`the key title "${got.title}" ≠ keyTitle "${b.keyTitle}"`);
        if (got.north !== b.dirLetters.n) fails.push(`the north arrow prints "${got.north}" ≠ dirLetters.n "${b.dirLetters.n}"`);
      }
    }
    return fails;
  },
};

module.exports = TYPE;
