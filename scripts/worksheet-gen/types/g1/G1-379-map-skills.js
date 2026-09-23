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
 *   d2  key 6 (3 x 2) · asked 5 · counts 1..5 (>= 4 distinct; bridge 1..2) · 1 unasked (1..3)
 *       · tree + bush both in the key · cards print the WORD only · 44 px · <= 16 placed ·
 *       0..1 footpath (bridges = 1 + footpaths)                                        (ships)
 *   d3  key 8 (4 x 2) · asked 6 · counts 1..6 (>= 5 distinct) · 2 unasked · 44 px · <= 20
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

const TYPE = {
  id: ID,
  slug: 'map-skills',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    1: { island: 'isle-1', keySize: 4, cols: 2, asked: 4, countMax: 4, minDistinct: 3, unasked: 0, unaskedMax: 0, nearMiss: 'none', rowsShowSymbol: true, symPx: 48, placedMax: 10, footpaths: [[]], northArrow: true },
    2: { island: 'isle-1', keySize: 6, cols: 3, asked: 5, countMax: 5, minDistinct: 4, unasked: 1, unaskedMax: 3, nearMiss: 'both-in-key', rowsShowSymbol: false, symPx: 44, placedMax: 16, footpaths: [[], ['P1'], ['P2']], northArrow: true },
    3: { island: 'isle-1', keySize: 8, cols: 4, asked: 6, countMax: 6, minDistinct: 5, unasked: 2, unaskedMax: 3, nearMiss: 'both-asked', rowsShowSymbol: false, symPx: 44, placedMax: 20, footpaths: [[]], northArrow: true },
  },
  i18n: {
    en: {
      title: 'Read the Map Key',
      instruction: 'Look at the map key. Find each thing on the map. Count them and write how many in the box.',
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
    if (d.layout) throw new Error(`${ID}: layout "${d.layout}" is a Phase-2 face (not built yet)`);
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
    const strip = C5.countStrip({ cards: c.cards.map((id) => ({ id, word: words[id], answer: c.counts[id], symbol: d.rowsShowSymbol || d.forceShowSymbol })) });
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const bodyHtml = `<div data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-key="${c.keyOrder.join(',')}" data-lcs-asked="${c.asked.join(',')}" ` +
      `data-lcs-unasked="${c.unasked.join(',')}" data-lcs-footpaths="${c.footpaths.join(',')}" data-lcs-sym-px="${d.symPx}" data-lcs-show-sym="${d.rowsShowSymbol ? 1 : 0}" ` +
      `data-lcs-min-distinct="${d.minDistinct}" data-lcs-capacity="${c.capacity}" data-lcs-placed='${js(c.symbols.length)}' ` +
      `style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:${BLOCK_GAP}px">` +
      sheet + strip + `</div>`;
    return { bodyHtml, meta: { keyOrder: c.keyOrder, asked: c.asked, unasked: c.unasked, counts: c.counts, cards: c.cards, footpaths: c.footpaths, symbols: c.symbols, capacity: c.capacity } };
  },

  async verify(page) {
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
