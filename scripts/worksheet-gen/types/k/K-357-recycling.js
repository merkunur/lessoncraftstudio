/**
 * K-357 — Recycling Sort (nt10-D; family key `recycling`; K; science;
 * readiness — no CCSS code; en prose names NGSS K-ESS3-3). Design:
 * docs/worksheet-gen/b4-designs/K-357-recycling.md §2/§5 under
 * _BUILD-BRIEF.md + the README cross-type rulings; every ruling in
 * _work/K-357-critic.md.
 *
 * Eight everyday PRODUCTS in one calm row at the head (a tin can, a water
 * bottle, a jam jar, an envelope, an apple, a comb ...); under a tall empty
 * line zone the locale's N bins stand side by side at the foot, each with a
 * coloured lid, a white mono MARK on the lid keyed on its position and its
 * word on a cream pill. The child draws one line from each product to the
 * bin it goes in "when it is empty or finished". Nothing on the page pairs an
 * item with a bin except the stamps.
 *
 * THEMELESS (`themeAxis:{applicable:false}`): the 37 items are fixed
 * `(theme, noun)` pairs over 11 themes in the GLOBAL bank
 * data/b4/recycling.json (the MATERIAL of every picture fixed ONCE, by
 * opening it), resolved by `fileUri(theme, noun)` — never `pictureFor`, which
 * may pick another theme's picture of the same key. No `unitAxis` (RULED: the
 * bin set is locale DATA, not a fan). The locale bank data/b4/recycling.js
 * (via lib/b4-common.js `bank()`) carries the bins, routes, exclusions and
 * every printed literal; an unauthored locale REFUSES (never falls back to en).
 *
 * THE RULE THAT LOCKS THE TYPE: the material is a fact of the PICTURE, stored
 * once; the bin is a fact of the LOCALE, stored per locale; the code JOINS
 * them and never decides —
 *   bin(item, loc) = excludeItems[id] ? null
 *                  : route[id]?.bin
 *                  ?? first bin in loc.bins (page order) whose materials include
 *                     item.material and (item.packaging || !bin.packagingOnly)
 *                  ?? null  (= EXCLUDED for this locale)
 *
 * Boundary (load-bearing): sorts by MATERIAL under the locale's drawn bins;
 * NOT the science-sort family (concept bins, `.sci-bin` word boxes — its
 * factory `makeScienceCategorySort.build()` is NOT called: 52 px items < the
 * K floor 56 and no pill overhang budget), NOT `sorting-categories` (identity
 * sort into icon circles), NOT K-043 odd-one-out; never natural / man-made,
 * wants / needs or living; never prints an item noun.
 *
 * Geometry (design §2, measured; the line zone re-ruled by the reviewer 2026-09-21 to a FIXED 240 px block with the stage at the top of the body and the slack BELOW the bins — the design's 425 was a maximum, and a 430 px blank under the one-line chrome read SPARSE): strip 8 x 72 + 7 x 12 = 660 <= 675; bins
 * `binW = min(210, floor((675 - 34 - (N - 1) * 14) / N))` (N 5 -> 117, 4 ->
 * 146, 3 -> 204, 2 -> 210); binH 270 at d2 (reviewer ruling 2: the bin is the
 * SIZE lever that fills a K page, pill + lid + body ~300); stack d2 = strip 85
 * (4 + 73 + 8) + zone 260 + bins 300 (30 + 270) = 645 <= 677 (d1 664, d3
 * 658), the chrome's slack below. Pill overhang
 * is BUDGETED (pill <= 151, adjacent half-sums <= 125 — the render gate
 * measures every locale's table with the shell fonts).
 *
 * Difficulty is a CONFIG; every guard keys on the resolved config, never on
 * the level index:
 *   items       products on the page (d1 6 · d2 8 · d3 10 = the G1 register,
 *               unpublished)
 *   perBinMin / perBinMax   tiles per bin (es-MX N = 2 lifts perBinMax to
 *               ceil(items / N) by construction)
 *   tile / iconPx           strip tile OUTER size / the picture (K floor 56)
 *   binH        176 on every level
 *   strips      1 (d1, d2) or 2 (d3: two rows of five)
 *   twinsAllowed   false: no two tiles share a vocabKey
 * Refusal (throw, never a filler): an unauthored locale, a bin set outside
 * 2..5, a bin whose resolved pool cannot give it perBinMin items under the
 * family / twin / pale-item fences, a config the strip or the stack cannot
 * hold, a missing config key.
 *
 * PHASE 2 (the faces) ride ONE additive `layout` knob (design §3; the K-355
 * sibling's shape): `d.layout` undefined = this base path, byte-identical;
 * 'which' | 'write' | 'odd' | 'color' | 'open' dispatch to `_buildFace`
 * (built 2026-09-21, _work/K-357-faces.md). `coordinate.mode` on the landing
 * side is the face's mode string (base = 'base'). Every face changes what the
 * child DOES (line-to-bin → circle-one-of-N → write-the-material → circle-the-
 * odd → colour-by-the-locale-legend → draw-and-write); every face root stamps
 * `data-lcs-layout` and verify() hands it to `_verifyFace`. Faces:
 *   which  K-366  keyBins strip + `rows` which-rows (one product, the N mini
 *          bins in the FIXED locale order; circle one); rows minmax(85,1fr)
 *   write  G1-364 wordBank of the locale's material words + `rows` material
 *          rows (tile + a school-line writing row; write the MATERIAL)
 *   odd    G2-348 `rows` cards of four DIFFERENT products, three of one
 *          material class (paper+cardboard / glass / plastic / metal /
 *          organic), circle the one that is not; boxes GROW with the card
 *   color  K-367  legend (colour chip + colour word + bin word, shuffled) over
 *          N WHITE bins (fill:'none', 350 tall) each with a stacked shelf of
 *          two correctly sorted examples; REFUSES without a national
 *          convention (en) — the contingent face
 *   open   G1-365 three draw-and-write lanes (a growing draw box + two ruling
 *          rows); open, no verify beyond structure
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const C4 = require('../../templates/components-b4.js');
const C2 = require('../../templates/components-b2.js');   // wordBank (F2)
const GLOBAL = require('../../data/b4/recycling.json');

const BANK = 'recycling';
const MATERIALS = ['paper', 'cardboard', 'glass', 'plastic', 'metal', 'organic'];
const FACES = ['which', 'write', 'odd', 'color', 'open'];
const STACK_CEILING = 677;     // the fi four-line-title body (README ruling)
const ZONE_MIN = 220, ZONE_MAX = 260;   // the FIXED line zone (reviewer rulings 2026-09-21): 8 lines from a 73 px strip to 5 bins; more reads SPARSE
const BIN_H_MIN = 240, BIN_H_MAX = 300; // the bin is the SIZE lever that fills a K page (reviewer ruling 2): pill + lid + body ~300 at d2 (binH 270 + the 26 px pill overhang)
const PAGE_W = 675, ROW_MARGINS = 34, BIN_GAP = 14, BIN_W_CAP = 210, BIN_W_MIN = 40;
const STRIP_GAP = 12, STRIP_PAD_TOP = 4, STRIP_PAD_BOTTOM = 8, STRIP_ROW_GAP = 12, BINS_PAD_TOP = 30;
const K_ICON_FLOOR = 56;
const G1_ICON_FLOOR = 44;               // the G1 faces (write / open) — tokens.density.G1.minElement
const STAGE_MIN = 630;                  // the reviewer's d2 stage floor (the apparatus fills a K page): the base's strip -> bins-bottom, the colour face's legend -> shelf-bottom
const TRIES = 400;

/** binW for N bins on the 675 body (design §2 arithmetic). */
function binWidth(n) { return Math.min(BIN_W_CAP, Math.floor((PAGE_W - ROW_MARGINS - (n - 1) * BIN_GAP) / n)); }

module.exports = {
  id: 'K-357',
  slug: 'recycling',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'recycling',
  themeAxis: { applicable: false },
  difficulty: {
    1: { items: 6, perBinMin: 1, perBinMax: 2, tile: 92, iconPx: 78, binH: 270, strips: 1, zone: 260, twinsAllowed: false },   // 104 + 260 + 300 = 664
    2: { items: 8, perBinMin: 1, perBinMax: 2, tile: 73, iconPx: 61, binH: 270, strips: 1, zone: 260, twinsAllowed: false },   // 85 + 260 + 300 = 645 (ships)
    3: { items: 10, perBinMin: 2, perBinMax: 2, tile: 72, iconPx: 60, binH: 240, strips: 2, zone: 220, twinsAllowed: false },  // 168 + 220 + 270 = 658
  },
  i18n: {
    en: {
      title: 'Recycling Sort',
      instruction: 'Each thing is empty or finished. Draw a line from it to the bin it goes in.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith({ global: GLOBAL, block: loadBank(BANK, loc) }, { difficulty, locale: loc }, ctx);
  },

  /* ------------------------------------------------------------ helper contract (design §5; the gate's node cross-checks read these too) */
  binWidth,
  MATERIALS,
  /** The bin key of an item in a locale block, or null = excluded for this locale (pure; route > first match in page order). */
  _bin(item, block) {
    if (!block || !Array.isArray(block.bins)) throw new Error('K-357: no bins in the locale block (refuse)');
    const ex = block.excludeItems || {};
    if (Object.prototype.hasOwnProperty.call(ex, item.id)) return null;
    const r = block.route && block.route[item.id];
    if (r && r.bin) return r.bin;
    const hit = block.bins.find((b) => Array.isArray(b.materials) && b.materials.includes(item.material) && (item.packaging || !b.packagingOnly));
    return hit ? hit.key : null;
  },
  /** The items of the global bank that resolve to `binKey` in this locale. */
  _poolFor(binKey, block, global) {
    return ((global || GLOBAL).items || []).filter((it) => this._bin(it, block) === binKey);
  },
  /** The F2 pool: items whose material has a materialWords literal (locale-free otherwise). */
  _materialPool(block, global) {
    const mw = (block && block.materialWords) || {};
    return ((global || GLOBAL).items || []).filter((it) => typeof mw[it.material] === 'string' && mw[it.material].trim());
  },
  /** The F3 trio classes (locale-free): paper+cardboard, glass, plastic, metal, organic. */
  _trioClasses(global) {
    const items = (global || GLOBAL).items || [];
    const cls = { paper: ['paper', 'cardboard'], glass: ['glass'], plastic: ['plastic'], metal: ['metal'], organic: ['organic'] };
    return Object.fromEntries(Object.entries(cls).map(([k, mats]) => [k, items.filter((it) => mats.includes(it.material))]));
  },

  /** The whole build over an INJECTED bank {global, block} (the gate's poison seam). */
  _buildWith(bankData, { difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    if (!d) throw new Error('K-357: no difficulty ' + difficulty);
    const loc = (locale || 'en').slice(0, 2);
    if (d.layout) return this._buildFace(bankData, d, loc, ctx);      // Phase 2 faces; the base path below is untouched
    const rng = ctx.rng;
    const { global, block } = bankData;
    if (!global || !Array.isArray(global.items) || !global.items.length) throw new Error('K-357: the global bank has no items');
    if (!Array.isArray(global.materials) || global.materials.join() !== MATERIALS.join()) throw new Error('K-357: the global bank must list the six materials in order');
    if (!block) throw new Error(`K-357 ${loc}: no locale block (refuse)`);
    const bins = block.bins;
    if (!Array.isArray(bins) || bins.length < 2 || bins.length > 5) throw new Error(`K-357 ${loc}: ${Array.isArray(bins) ? bins.length : 'no'} bins — a locale has 2..5 (refuse)`);
    const N = bins.length;
    const keys = bins.map((b) => b.key);
    if (new Set(keys).size !== N) throw new Error(`K-357 ${loc}: bin keys repeat`);
    for (const b of bins) if (typeof b.label !== 'string' || !b.label.trim()) throw new Error(`K-357 ${loc}: bin ${b.key} has no label (refuse)`);

    // guards on the RESOLVED config (never on the level index)
    for (const k of ['items', 'perBinMin', 'perBinMax', 'tile', 'iconPx', 'binH', 'strips', 'zone']) {
      if (!Number.isInteger(d[k]) || d[k] < 0) throw new Error(`K-357: config ${k} is ${d[k]} — the guard needs the resolved config, never the level index`);
    }
    if (d.twinsAllowed !== false) throw new Error('K-357: twinsAllowed must be false on the base (twins across themes never share a page)');
    if (!(d.items >= 4)) throw new Error(`K-357: items ${d.items} < 4 (K items [4, 8]; d3 is the G1 register)`);
    if (!(d.iconPx >= K_ICON_FLOOR)) throw new Error(`K-357: iconPx ${d.iconPx} < the K floor ${K_ICON_FLOOR}`);
    if (!(d.iconPx <= d.tile - 4)) throw new Error(`K-357: iconPx ${d.iconPx} > tile ${d.tile} - 4 (border)`);
    if (!(d.strips >= 1 && d.strips <= 2)) throw new Error(`K-357: strips ${d.strips} outside 1..2`);
    const perStrip = Math.ceil(d.items / d.strips);
    const stripW = perStrip * d.tile + (perStrip - 1) * STRIP_GAP;
    if (stripW > PAGE_W) throw new Error(`K-357: strip ${perStrip} x ${d.tile} + ${perStrip - 1} x ${STRIP_GAP} = ${stripW} > ${PAGE_W}`);
    const binW = binWidth(N);
    if (!(binW >= BIN_W_MIN)) throw new Error(`K-357: binW ${binW} < ${BIN_W_MIN} for ${N} bins`);
    const perBinMax = Math.max(d.perBinMax, Math.ceil(d.items / N));
    if (!(d.perBinMin >= 1)) throw new Error('K-357: perBinMin < 1 (every bin receives a line)');
    if (d.perBinMin * N > d.items) throw new Error(`K-357 ${loc}: perBinMin ${d.perBinMin} x ${N} bins > items ${d.items}`);
    if (perBinMax * N < d.items) throw new Error(`K-357 ${loc}: perBinMax ${perBinMax} x ${N} bins < items ${d.items}`);
    const stripBlock = STRIP_PAD_TOP + d.strips * d.tile + (d.strips - 1) * STRIP_ROW_GAP + STRIP_PAD_BOTTOM;
    const binsBlock = BINS_PAD_TOP + d.binH;
    if (!(d.zone >= ZONE_MIN && d.zone <= ZONE_MAX)) throw new Error(`K-357: zone ${d.zone} outside ${ZONE_MIN}..${ZONE_MAX} (a taller zone reads SPARSE, a shorter one cannot hold eight lines)`);
    if (!(d.binH >= BIN_H_MIN && d.binH <= BIN_H_MAX)) throw new Error(`K-357: binH ${d.binH} outside ${BIN_H_MIN}..${BIN_H_MAX} (a short bin leaves the page sparse, a taller one breaks the 677 budget)`);
    if (stripBlock + d.zone + binsBlock > STACK_CEILING) throw new Error(`K-357: strip ${stripBlock} + zone ${d.zone} + bins ${binsBlock} = ${stripBlock + d.zone + binsBlock} > the ${STACK_CEILING} fi budget`);

    // composer: one locale-neutral permutation of the bank; each bin takes its FIRST admissible item in that order,
    // then the remaining slots go round-robin over the bins in a shuffled order (skipping a bin at perBinMax or with
    // an empty pool). A locale that EXCLUDES a drawn item simply skips it in the same order (the sv page differs from
    // the de page only in the excluded slot).
    const rules = global.pageRules || {};
    const neverBoth = (rules.neverBoth || []).map((p) => new Set(p));
    const neverAdjacent = (rules.neverAdjacent || []);
    const order = rng.shuffle(global.items);
    const used = new Set(), usedFam = new Set(), usedVocab = new Set(), usedIds = new Set();
    const chosen = [];
    const conflicts = (it) => usedFam.has(it.family) || (!d.twinsAllowed && usedVocab.has(it.vocabKey)) ||
      neverBoth.some((pair) => pair.has(it.id) && [...pair].some((x) => x !== it.id && usedIds.has(x)));
    const take = (binKey) => {
      const it = order.find((x) => !used.has(x) && this._bin(x, block) === binKey && !conflicts(x));
      if (!it) return null;
      used.add(it); usedFam.add(it.family); usedVocab.add(it.vocabKey); usedIds.add(it.id);
      chosen.push(Object.assign({ bin: binKey }, it));
      return it;
    };
    const count = Object.fromEntries(keys.map((k) => [k, 0]));
    for (const b of bins) {
      if (!take(b.key)) throw new Error(`K-357 ${loc}: bin ${b.key} has no admissible item (pool ${this._poolFor(b.key, block, global).length}; refuse, never a filler)`);
      count[b.key] = 1;
    }
    let remaining = d.items - N;
    const binOrder = rng.shuffle(bins);
    while (remaining > 0) {
      let progressed = false;
      for (const b of binOrder) {
        if (remaining === 0) break;
        if (count[b.key] >= perBinMax) continue;
        if (!take(b.key)) continue;
        count[b.key]++; remaining--; progressed = true;
      }
      if (!progressed) throw new Error(`K-357 ${loc}: the pools cannot fill ${d.items} items under the fences (${JSON.stringify(count)}; refuse)`);
    }
    for (const b of bins) {
      if (count[b.key] < d.perBinMin) throw new Error(`K-357 ${loc}: bin ${b.key} received ${count[b.key]} < perBinMin ${d.perBinMin}`);
      if (count[b.key] > perBinMax) throw new Error(`K-357 ${loc}: bin ${b.key} received ${count[b.key]} > perBinMax ${perBinMax}`);
    }

    // strip order: re-drawn while any bin's items are ALL adjacent (position leak) or a pale item touches the package
    const okStrip = (s) => {
      for (const k of keys) {
        const pos = s.map((it, i) => (it.bin === k ? i : -1)).filter((i) => i >= 0);
        if (pos.length >= 2 && pos[pos.length - 1] - pos[0] === pos.length - 1) return false;
      }
      for (let i = 0; i + 1 < s.length; i++) {
        const a = s[i].id, b = s[i + 1].id;
        if (neverAdjacent.some(([x, y]) => (a === x && b === y) || (a === y && b === x))) return false;
      }
      return true;
    };
    let strip = null;
    for (let t = 0; t < TRIES; t++) { const s = rng.shuffle(chosen); if (okStrip(s)) { strip = s; break; } }
    if (!strip) throw new Error(`K-357 ${loc}: no strip order without a position leak in ${TRIES} tries (refuse)`);
    const rows = [];
    for (let i = 0; i < d.strips; i++) rows.push(strip.slice(i * perStrip, (i + 1) * perStrip));

    const tiles = strip.map((it) => ({ id: it.id, theme: it.theme, noun: it.noun, vocabKey: it.vocabKey, family: it.family, material: it.material, bin: it.bin, src: fileUri(it.theme, it.noun) }));
    const stripsHtml = rows.map((r) => C4.sortStrip({ items: tiles.filter((t) => r.some((x) => x.id === t.id)).sort((a, b) => r.findIndex((x) => x.id === a.id) - r.findIndex((x) => x.id === b.id)), tile: d.tile, iconPx: d.iconPx, gap: STRIP_GAP })).join('');
    const bodyHtml = `<style>${C4.RC_CSS}</style>` +
      `<div class="rc-sort" data-ws-content data-lcs-recycling data-lcs-bins="${keys.join(',')}" data-lcs-n="${N}" data-lcs-items="${d.items}" ` +
      `data-lcs-per-bin-min="${d.perBinMin}" data-lcs-per-bin-max="${perBinMax}" data-lcs-tile="${d.tile}" data-lcs-icon-px="${d.iconPx}" data-lcs-strips="${d.strips}" data-lcs-twins="0" data-lcs-bin-w="${binW}" data-lcs-zone="${d.zone}" data-lcs-bin-h="${d.binH}">` +
      `<div class="rc-strips" data-lcs-strips-block>${stripsHtml}</div>` +
      `<div class="rc-zone" data-lcs-line-zone style="height:${d.zone}px"></div>` +
      C4.binRow({ bins, binW, binH: d.binH, pillPx: 17, gap: BIN_GAP, fill: 'lid' }) +
      `</div>`;
    return {
      bodyHtml,
      meta: {
        items: tiles.map((t) => t.id),
        pairs: tiles.map((t) => t.theme + '/' + t.noun + '→' + t.bin),
        bins: keys, perBin: count, strips: rows.map((r) => r.map((x) => x.id)), binW, n: N, zone: d.zone, stack: stripBlock + d.zone + binsBlock,
      },
    };
  },

  /* ------------------------------------------------------------ Phase 2 faces (design §3; ONE additive `layout` knob) */
  /**
   * `d.layout` dispatches here; every guard keys on the RESOLVED config (never
   * the level index). Every face reads the same bank (global items + the
   * locale block) through the same `_bin` helper; a face the locale REFUSES
   * (`block.refuse`), a pool that cannot fill under the page fences, or a
   * config the 677 fi budget cannot hold THROWS — never a filler.
   */
  _buildFace(bankData, d, loc, ctx) {
    if (!FACES.includes(d.layout)) throw new Error(`K-357: unknown layout "${d.layout}"`);
    const { global, block } = bankData;
    if (!global || !Array.isArray(global.items) || !global.items.length) throw new Error('K-357: the global bank has no items');
    if (!Array.isArray(global.materials) || global.materials.join() !== MATERIALS.join()) throw new Error('K-357: the global bank must list the six materials in order');
    if (!block) throw new Error(`K-357 ${loc}: no locale block (refuse)`);
    if (!ctx || !ctx.rng) throw new Error('K-357: no rng in ctx');
    if (Array.isArray(block.refuse) && block.refuse.includes(d.layout)) throw new Error(`K-357 ${loc}: the ${loc} panel REFUSES the "${d.layout}" face (refuse: ${block.refuse.join(',')})`);
    const fn = { which: '_buildWhich', write: '_buildWrite', odd: '_buildOdd', color: '_buildColor', open: '_buildOpen' }[d.layout];
    return this[fn](global, block, d, loc, ctx.rng);
  },

  /** The bins of a locale block, checked (2..5, keys unique, labels present). */
  _binsOf(block, loc) {
    const bins = block.bins;
    if (!Array.isArray(bins) || bins.length < 2 || bins.length > 5) throw new Error(`K-357 ${loc}: ${Array.isArray(bins) ? bins.length : 'no'} bins — a locale has 2..5 (refuse)`);
    if (new Set(bins.map((b) => b.key)).size !== bins.length) throw new Error(`K-357 ${loc}: bin keys repeat`);
    for (const b of bins) if (typeof b.label !== 'string' || !b.label.trim()) throw new Error(`K-357 ${loc}: bin ${b.key} has no label (refuse)`);
    return bins;
  },
  /** Page-wide sampling state: families, vocab keys and ids used so far (no family twice, no twin, the pale-item pair never both). */
  _fence(global) {
    const rules = global.pageRules || {};
    return { fams: new Set(), vocab: new Set(), ids: new Set(), neverBoth: (rules.neverBoth || []).map((p) => new Set(p)), neverAdjacent: rules.neverAdjacent || [] };
  },
  _admits(st, it) {
    return !st.fams.has(it.family) && !st.vocab.has(it.vocabKey) && !st.ids.has(it.id) &&
      !st.neverBoth.some((pair) => pair.has(it.id) && [...pair].some((x) => x !== it.id && st.ids.has(x)));
  },
  /** The first admitted item of `pool` in `order` (an rng permutation of the bank); null = none left. */
  _take(st, order, pool) {
    const poolIds = new Set(pool.map((x) => x.id));
    const it = order.find((x) => poolIds.has(x.id) && this._admits(st, x));
    if (!it) return null;
    st.fams.add(it.family); st.vocab.add(it.vocabKey); st.ids.add(it.id);
    return it;
  },
  _tile(it, extra) { return Object.assign({ id: it.id, theme: it.theme, noun: it.noun, vocabKey: it.vocabKey, family: it.family, material: it.material, src: fileUri(it.theme, it.noun) }, extra || {}); },
  _guardInt(d, keys, who) {
    for (const k of keys) if (!Number.isInteger(d[k]) || d[k] < 0) throw new Error(`K-357 ${who}: config ${k} is ${d[k]} — the guard needs the resolved config, never the level index`);
  },

  /* ---------------- F1 which (K-366) ---------------- */
  _buildWhich(global, block, d, loc, rng) {
    this._guardInt(d, ['rows', 'tile', 'iconPx', 'chipTile', 'chipBin', 'keyPx'], 'which');
    if (typeof d.shuffleChips !== 'boolean') throw new Error('K-357 which: shuffleChips must be a boolean (the guard needs the resolved config)');
    if (!(d.rows >= 4 && d.rows <= 8)) throw new Error(`K-357 which: rows ${d.rows} outside 4..8`);
    if (!(d.iconPx >= K_ICON_FLOOR)) throw new Error(`K-357 which: iconPx ${d.iconPx} < the K floor ${K_ICON_FLOOR}`);
    if (!(d.iconPx <= d.tile - 4)) throw new Error(`K-357 which: iconPx ${d.iconPx} > tile ${d.tile} - 4`);
    if (!(d.chipBin >= 40 && d.chipTile >= d.chipBin + 12)) throw new Error(`K-357 which: chip bin ${d.chipBin} / tile ${d.chipTile} (never a bin under 40 wide; the tile holds it with 6 px each side)`);
    if (!(d.keyPx >= 15)) throw new Error(`K-357 which: keyPx ${d.keyPx} < 15 (the smallest text on the family)`);
    const bins = this._binsOf(block, loc);
    const N = bins.length, keys = bins.map((b) => b.key);
    const chipTileH = d.chipTile + 16;                        // 64 -> 80 (the design's chip tile)
    const rowMin = Math.max(85, chipTileH + 4 + 1, d.tile + 4);   // the chip tile + the card border + 1, never under the design's 85
    const KEY_H = 112, KEY_GAP = 10, GAP = 8;
    const stack = KEY_H + KEY_GAP + d.rows * rowMin + (d.rows - 1) * GAP;
    if (stack > STACK_CEILING) throw new Error(`K-357 which: key ${KEY_H} + ${d.rows} rows of ${rowMin} = ${stack} > the ${STACK_CEILING} fi budget`);
    const chipsW = N * d.chipTile + (N - 1) * 10;   // the design's 330 was a miscount: 5 x 64 + 4 x 10 = 360
    if (30 + 12 + d.tile + 12 + chipsW + 24 > PAGE_W) throw new Error(`K-357 which: badge + tile ${d.tile} + ${N} chips of ${d.chipTile} = ${30 + 12 + d.tile + 12 + chipsW + 24} > ${PAGE_W}`);
    // counts: every bin one row, the extra rows round-robin over the bins in a shuffled order (N 5 -> 2,1,1,1,1 · 4 -> 2,2,1,1 ·
    // 3 -> 2,2,2 · 2 -> 3,3): >= min(N, 4) distinct answer bins by construction; a bin takes an extra only while its pool can
    // carry it (sv metall = 1 item), else the extra moves on; no bin able to take it = refuse
    const binOrder = rng.shuffle(bins);
    const count = Object.fromEntries(keys.map((k) => [k, 1]));
    const poolN = Object.fromEntries(keys.map((k) => [k, this._poolFor(k, block, global).length]));
    for (let i = 0, extra = d.rows - N, guard = 0; extra > 0; i++, guard++) {
      if (guard > 10 * d.rows) throw new Error(`K-357 ${loc} which: no bin can take the extra rows (pools ${JSON.stringify(poolN)}; refuse)`);
      const k = binOrder[i % N].key;
      if (count[k] + 1 <= poolN[k]) { count[k]++; extra--; }
    }
    const st = this._fence(global);
    const order = rng.shuffle(global.items);
    const picked = [];
    for (const b of bins) {
      const pool = this._poolFor(b.key, block, global);
      for (let i = 0; i < count[b.key]; i++) {
        const it = this._take(st, order, pool);
        if (!it) throw new Error(`K-357 ${loc} which: bin ${b.key} cannot give ${count[b.key]} items under the fences (pool ${pool.length}; refuse, never a filler)`);
        picked.push(this._tile(it, { bin: b.key }));
      }
    }
    // row order: no two consecutive rows answer the same bin (N = 2: strict alternation, the design's contract)
    let rowsItems = null;
    for (let t = 0; t < TRIES; t++) { const s = rng.shuffle(picked); if (s.every((it, i) => i === 0 || it.bin !== s[i - 1].bin)) { rowsItems = s; break; } }
    if (!rowsItems) throw new Error(`K-357 ${loc} which: no row order without two consecutive rows on one bin in ${TRIES} tries (refuse)`);
    const chipBins = d.shuffleChips ? null : bins;
    const rows = rowsItems.map((it, i) => {
      const order = chipBins || rng.shuffle(bins);
      const chips = C4.binChips({ bins: order, tile: d.chipTile, tileH: chipTileH, binW: d.chipBin, gap: 10 });
      return C4.whichBinRow({ n: i + 1, item: it, chips, tile: d.tile, iconPx: d.iconPx, chipsW });
    });
    const inner = C4.keyBins({ bins, slotW: binWidth(N), binW: 56, binH: 84, pillPx: d.keyPx, gap: BIN_GAP }) +
      `<div style="height:${KEY_GAP}px;flex:0 0 auto"></div>` +
      C4.faceRows({ rows, rowMin, gap: GAP, cls: 'rc-which-rows' });
    const bodyHtml = C4.faceRoot({ layout: 'which', fill: true, inner, stamps: { bins: keys.join(','), n: N, rows: d.rows, tile: d.tile, 'icon-px': d.iconPx, 'chip-tile': d.chipTile, 'chip-bin': d.chipBin, 'key-px': d.keyPx, 'shuffle-chips': d.shuffleChips ? 1 : 0, 'row-min': rowMin, 'bin-w': binWidth(N) } });
    return { bodyHtml, meta: { layout: 'which', items: rowsItems.map((t) => t.id), answers: rowsItems.map((t) => t.bin), bins: keys, count, rowMin, stack } };
  },

  /* ---------------- F2 write (G1-364) ---------------- */
  _buildWrite(global, block, d, loc, rng) {
    this._guardInt(d, ['rows', 'tile', 'iconPx', 'rulingW', 'glyphH', 'bankPx'], 'write');
    if (typeof d.bank !== 'boolean') throw new Error('K-357 write: bank must be a boolean (the guard needs the resolved config)');
    if (!(d.rows >= 6 && d.rows <= 8)) throw new Error(`K-357 write: rows ${d.rows} outside 6..8`);
    if (!(d.iconPx >= G1_ICON_FLOOR)) throw new Error(`K-357 write: iconPx ${d.iconPx} < the G1 floor ${G1_ICON_FLOOR}`);
    if (!(d.iconPx <= d.tile - 4)) throw new Error(`K-357 write: iconPx ${d.iconPx} > tile ${d.tile} - 4`);
    if (!(d.glyphH >= 26 && d.rulingW >= 300 && d.rulingW <= 480)) throw new Error(`K-357 write: glyphH ${d.glyphH} / rulingW ${d.rulingW} outside the row (glyphH >= 26, ruling 300..480)`);
    if (!(d.bankPx >= 16)) throw new Error(`K-357 write: bankPx ${d.bankPx} < 16`);
    const ROW_H = 58, GAP = 8, BANK_H = 59 + 10;
    const rowMin = Math.max(62, ROW_H + 4, d.tile + 4);
    if (30 + 12 + d.tile + 12 + d.rulingW + 24 > PAGE_W) throw new Error(`K-357 write: the row (tile ${d.tile} + ruling ${d.rulingW}) does not fit ${PAGE_W}`);
    const stack = (d.bank ? BANK_H : 0) + d.rows * rowMin + (d.rows - 1) * GAP;
    if (stack > STACK_CEILING) throw new Error(`K-357 write: bank + ${d.rows} rows of ${rowMin} = ${stack} > the ${STACK_CEILING} fi budget`);
    const mw = block.materialWords || {};
    const words = [...new Set(Object.values(mw).filter((v) => typeof v === 'string' && v.trim()))];
    if (words.length < 2) throw new Error(`K-357 ${loc} write: materialWords has ${words.length} distinct value(s) < 2 (refuse)`);
    for (const w of words) if (!/^\p{L}[\p{L}'’-]*$/u.test(w) || [...w].length > 12) throw new Error(`K-357 ${loc} write: material word "${w}" is not a single word of <= 12 graphemes (refuse)`);
    const pool = this._materialPool(block, global);
    // each distinct word >= 1 and <= perWordMax times (3, lifted to ceil(rows / words) for a 2-word bank: es)
    const perWordMax = Math.max(3, Math.ceil(d.rows / words.length));
    if (words.length > d.rows) throw new Error(`K-357 ${loc} write: ${words.length} bank words > ${d.rows} rows (every word must be used)`);
    const wordOrder = rng.shuffle(words);
    const count = Object.fromEntries(words.map((w) => [w, 1]));
    let remaining = d.rows - words.length;
    for (let i = 0; remaining > 0; i++) { const w = wordOrder[i % words.length]; if (count[w] < perWordMax) { count[w]++; remaining--; } if (i > 10 * d.rows) throw new Error('K-357 write: the words cannot fill the rows'); }
    const st = this._fence(global);
    const order = rng.shuffle(global.items);
    const picked = [];
    for (const w of words) {
      const of = pool.filter((it) => mw[it.material] === w);
      for (let i = 0; i < count[w]; i++) {
        const it = this._take(st, order, of);
        if (!it) throw new Error(`K-357 ${loc} write: word "${w}" cannot give ${count[w]} items under the fences (${of.length} items; refuse, never a filler)`);
        picked.push(this._tile(it, { word: w }));
      }
    }
    const rowsItems = rng.shuffle(picked);
    // the bank: never the order the words first appear down the page (nor its reverse, with >= 3 words)
    let bank = null;
    if (d.bank) {
      const first = [];
      for (const it of rowsItems) if (!first.includes(it.word)) first.push(it.word);
      const rev = first.slice().reverse();
      for (let t = 0; t < TRIES; t++) { const b = rng.shuffle(words); if (b.join('\u0001') !== first.join('\u0001') && (words.length < 3 || b.join('\u0001') !== rev.join('\u0001'))) { bank = b; break; } }
      if (!bank) throw new Error(`K-357 ${loc} write: no bank order off the row order in ${TRIES} tries (refuse)`);
    }
    const rows = rowsItems.map((it, i) => C4.materialRow({ n: i + 1, item: it, rulingW: d.rulingW, tile: d.tile, iconPx: d.iconPx, glyphH: d.glyphH, rowH: ROW_H }));
    const inner = (bank ? C2.wordBank({ words: bank.map((w) => ({ word: w })), wordPx: d.bankPx }) : '') + C4.faceRows({ rows, rowMin, gap: GAP, cls: 'rc-write-rows' });
    const bodyHtml = C4.faceRoot({ layout: 'write', fill: true, inner, stamps: { rows: d.rows, tile: d.tile, 'icon-px': d.iconPx, 'ruling-w': d.rulingW, 'glyph-h': d.glyphH, 'bank-px': d.bankPx, bank: d.bank ? 1 : 0, words: words.length, 'per-word-max': perWordMax, 'row-min': rowMin } });
    return { bodyHtml, meta: { layout: 'write', items: rowsItems.map((t) => t.id), words: rowsItems.map((t) => t.word), bank, count, rowMin, stack } };
  },

  /* ---------------- F3 odd (G2-348) ---------------- */
  _buildOdd(global, block, d, loc, rng) {
    this._guardInt(d, ['rows', 'items', 'box', 'iconPx', 'boxMax'], 'odd');
    if (typeof d.organicOdd !== 'boolean') throw new Error('K-357 odd: organicOdd must be a boolean (the guard needs the resolved config)');
    if (!(d.rows >= 3 && d.rows <= 5)) throw new Error(`K-357 odd: rows ${d.rows} outside 3..5`);
    if (d.items !== 4) throw new Error(`K-357 odd: items ${d.items} ≠ 4 (three of one material + one)`);
    if (!(d.iconPx >= 84 && d.box >= d.iconPx && d.boxMax >= d.box)) throw new Error(`K-357 odd: icon ${d.iconPx} / box ${d.box} / boxMax ${d.boxMax} (icons >= 84 in a box that holds them)`);
    const rowMin = d.box + 12 + 24;   // stage padding 6 + card padding 12, each side
    const GAP = 14;
    const stack = d.rows * rowMin + (d.rows - 1) * GAP;
    if (stack > STACK_CEILING) throw new Error(`K-357 odd: ${d.rows} rows of ${rowMin} = ${stack} > the ${STACK_CEILING} fi budget`);
    if (4 * d.boxMax > PAGE_W - 24 - 12) throw new Error(`K-357 odd: four boxes of ${d.boxMax} do not fit the card`);
    const classes = this._trioClasses(global);
    const clsOf = (m) => (m === 'cardboard' ? 'paper' : m);
    const names = Object.keys(classes);
    for (const c of names) if (new Set(classes[c].map((it) => it.family)).size < 3) throw new Error(`K-357 odd: class ${c} has < 3 families (the trio floor)`);
    if (d.rows > names.length) throw new Error(`K-357 odd: ${d.rows} rows > ${names.length} trio classes`);
    // compose under a bounded retry: the odd of an early row must not starve a LATER trio class (metal = 4 items over 4
    // families: two metal odds leave 2 for a metal trio — the 20-seed sweep found it), so an odd class that is still to
    // come as a trio must keep >= 4 admissible items; a composition that dead-ends re-rolls the trio order
    let cards = null, trio = null, lastErr = null;
    for (let attempt = 0; attempt < 40 && !cards; attempt++) {
      try {
        trio = rng.shuffle(names).slice(0, d.rows);
        const st = this._fence(global);
        const order = rng.shuffle(global.items);
        const out = [];
        let prevOdd = -1;
        const spare = (x) => classes[x].filter((it) => this._admits(st, it)).length;
        for (let r = 0; r < d.rows; r++) {
          const c = trio[r];
          const three = [];
          for (let i = 0; i < 3; i++) {
            const it = this._take(st, order, classes[c]);
            if (!it) throw new Error(`K-357 odd: class ${c} cannot give 3 items under the page fences (refuse)`);
            three.push(this._tile(it, { cls: c }));
          }
          const later = new Set(trio.slice(r + 1));
          const oddClasses = rng.shuffle(names.filter((x) => x !== c && (d.organicOdd || x !== 'organic') && (!later.has(x) || spare(x) >= 4)));
          let odd = null;
          for (const x of oddClasses) { const it = this._take(st, order, classes[x]); if (it) { odd = this._tile(it, { cls: x }); break; } }
          if (!odd) throw new Error(`K-357 odd: no odd item left for a ${c} row under the page fences (refuse)`);
          let oddIdx = -1;
          for (let t = 0; t < TRIES; t++) { const k = rng.int(0, 3); if (k !== prevOdd) { oddIdx = k; break; } }
          if (oddIdx < 0) throw new Error('K-357 odd: no odd index off the previous row (refuse)');
          prevOdd = oddIdx;
          let items = null;
          for (let t = 0; t < TRIES; t++) {
            const s = rng.shuffle(three); s.splice(oddIdx, 0, odd);
            const adj = st.neverAdjacent.some(([a, b]) => s.some((it, i) => i + 1 < s.length && ((it.id === a && s[i + 1].id === b) || (it.id === b && s[i + 1].id === a))));
            if (!adj) { items = s; break; }
          }
          if (!items) throw new Error('K-357 odd: no row order without the pale pair adjacent (refuse)');
          out.push({ cls: c, oddIdx, items, html: C4.oddRow({ items, oddIdx, box: d.box, iconPx: d.iconPx, boxMax: d.boxMax }) });
        }
        cards = out;
      } catch (e) { lastErr = e; if (!/refuse/.test(e.message)) throw e; }
    }
    if (!cards) throw new Error(`K-357 odd: no composition in 40 attempts — ${lastErr && lastErr.message}`);
    const inner = C4.oddGrid({ cards, rowMin, gap: GAP });
    const bodyHtml = C4.faceRoot({ layout: 'odd', fill: true, inner, stamps: { rows: d.rows, items: d.items, box: d.box, 'icon-px': d.iconPx, 'box-max': d.boxMax, 'organic-odd': d.organicOdd ? 1 : 0, 'row-min': rowMin, trio: trio.join(',') } });
    return { bodyHtml, meta: { layout: 'odd', trio, odds: cards.map((c) => c.items[c.oddIdx].id), oddIdx: cards.map((c) => c.oddIdx), items: cards.map((c) => c.items.map((it) => it.id)), rowMin, stack } };
  },

  /* ---------------- F4 color (K-367; the CONTINGENT face) ---------------- */
  _buildColor(global, block, d, loc, rng) {
    this._guardInt(d, ['binH', 'examples', 'pic', 'legendPx'], 'color');
    if (d.bins !== 'locale') throw new Error(`K-357 color: bins "${d.bins}" ≠ locale (the bin set is locale DATA)`);
    if (!['shuffled', 'fixed'].includes(d.legendOrder)) throw new Error(`K-357 color: legendOrder "${d.legendOrder}" must be shuffled | fixed`);
    if (!(d.binH >= 300 && d.binH <= 400)) throw new Error(`K-357 color: binH ${d.binH} outside 300..400 (the crayon area is the stack lever; under 300 the page reads sparse, over 400 breaks the 677 budget)`);
    if (!(d.examples >= 1 && d.examples <= 2)) throw new Error(`K-357 color: examples ${d.examples} outside 1..2`);
    if (!(d.pic >= K_ICON_FLOOR)) throw new Error(`K-357 color: pic ${d.pic} < the K floor ${K_ICON_FLOOR}`);
    if (!(d.legendPx >= 17)) throw new Error(`K-357 color: legendPx ${d.legendPx} < 17`);
    // the contingency: a national convention with a colour token AND a colour word on EVERY bin, distinct tokens
    if (block.colorConvention !== 'national') throw new Error(`K-357 ${loc}: the colour face needs colorConvention 'national' (got ${JSON.stringify(block.colorConvention)}); a classroom key is K-241's move — REFUSED`);
    const bins = this._binsOf(block, loc);
    const N = bins.length, keys = bins.map((b) => b.key);
    for (const b of bins) if (!b.color || typeof b.colorWord !== 'string' || !b.colorWord.trim()) throw new Error(`K-357 ${loc}: bin ${b.key} has no national colour token / colour word — the colour face is REFUSED`);
    if (new Set(bins.map((b) => b.color)).size !== N) throw new Error(`K-357 ${loc}: two bins share a colour token — the colour face is REFUSED (never a nearest-hue fudge)`);
    const binW = binWidth(N);
    if (!(d.pic + 12 <= binW)) throw new Error(`K-357 color: pic ${d.pic} does not fit a ${binW} shelf`);
    const legendRows = 2;                                    // ALWAYS two balanced rows (five de entries measure ~745 px, past the 663 px banner; one rule for every N keeps the stack identical in every locale)
    const LEGEND_H = 90 + 10, SHELF_GAP = 8;                 // the two-row banner measured 90 (de fixture); verify() measures the rendered stack against 630..677
    const shelfH = 12 + d.examples * d.pic + (d.examples - 1) * 8;
    const stack = LEGEND_H + BINS_PAD_TOP + d.binH + SHELF_GAP + shelfH;
    if (stack > STACK_CEILING) throw new Error(`K-357 color: legend ${LEGEND_H} + bins ${BINS_PAD_TOP + d.binH} + shelf ${SHELF_GAP + shelfH} = ${stack} > the ${STACK_CEILING} fi budget`);
    if (stack < STAGE_MIN) throw new Error(`K-357 color: stack ${stack} < ${STAGE_MIN}: the page reads SPARSE (grow the bin / the examples)`);
    // legend order ≠ bin order in >= min(3, N) positions (N = 2: swapped)
    const need = Math.min(3, N);
    let legend = null;
    for (let t = 0; t < TRIES; t++) { const s = rng.shuffle(bins); if (s.filter((b, i) => b.key !== keys[i]).length >= need) { legend = s; break; } }
    if (!legend) throw new Error(`K-357 ${loc} color: no legend order off the bin order in ${TRIES} tries (refuse)`);
    // examples: per bin `examples` pictures of its pool, distinct families page-wide, nothing twice
    const st = this._fence(global);
    const order = rng.shuffle(global.items);
    const shelves = bins.map((b) => {
      const pool = this._poolFor(b.key, block, global);
      const items = [];
      for (let i = 0; i < d.examples; i++) {
        const it = this._take(st, order, pool);
        if (!it) throw new Error(`K-357 ${loc} color: bin ${b.key} cannot give ${d.examples} example(s) from distinct families (pool ${pool.length}; refuse)`);
        items.push(this._tile(it, { bin: b.key }));
      }
      return { key: b.key, items, html: C4.exampleShelf({ items, pic: d.pic, w: binW, dir: 'column' }) };
    });
    const inner = C4.legendChips({ entries: legend.map((b) => ({ key: b.key, color: b.color, colorWord: b.colorWord, label: b.label })), wordPx: d.legendPx, rows: legendRows }) +
      C4.binRow({ bins, binW, binH: d.binH, pillPx: 17, gap: BIN_GAP, fill: 'none' }) +
      C4.shelfRow({ shelves: shelves.map((s) => s.html), binW, gap: BIN_GAP, marginTop: SHELF_GAP });
    const bodyHtml = C4.faceRoot({ layout: 'color', fill: false, inner, stamps: { bins: keys.join(','), n: N, 'bin-w': binW, 'bin-h': d.binH, examples: d.examples, pic: d.pic, 'legend-px': d.legendPx, 'legend-order': d.legendOrder, 'legend-rows': legendRows, legend: legend.map((b) => b.key).join(','), stack } });
    return { bodyHtml, meta: { layout: 'color', bins: keys, legend: legend.map((b) => b.key), examples: shelves.map((s) => s.items.map((it) => it.id)), stack } };
  },

  /* ---------------- F5 open (G1-365; open-ended) ---------------- */
  _buildOpen(global, block, d, loc, rng) {
    void rng; void global;   // nothing is sampled: three empty lanes
    this._guardInt(d, ['lanes', 'rows', 'rulingW', 'glyphH'], 'open');
    if (!d.draw || !Number.isInteger(d.draw.w) || !Number.isInteger(d.draw.h)) throw new Error('K-357 open: draw {w, h} missing (the guard needs the resolved config)');
    if (typeof d.starters !== 'boolean') throw new Error('K-357 open: starters must be a boolean');
    if (!(d.lanes >= 2 && d.lanes <= 4)) throw new Error(`K-357 open: lanes ${d.lanes} outside 2..4`);
    if (!(d.rows >= 1 && d.rows <= 3)) throw new Error(`K-357 open: rows ${d.rows} outside 1..3`);
    if (!(d.glyphH >= 26)) throw new Error(`K-357 open: glyphH ${d.glyphH} < 26`);
    if (!(d.draw.h >= 120 && d.draw.w >= 120)) throw new Error(`K-357 open: draw box ${d.draw.w} x ${d.draw.h} under 120`);
    if (30 + 12 + d.draw.w + 12 + d.rulingW > 651) throw new Error(`K-357 open: badge + draw ${d.draw.w} + ruling ${d.rulingW} > the 651 lane`);
    const ROW_H = 56, GAP = 12;
    const rulingH = d.rows * ROW_H + (d.rows - 1) * 8;
    const laneMin = Math.max(196, d.draw.h + 20, rulingH + 20);
    const stack = d.lanes * laneMin + (d.lanes - 1) * GAP;
    if (stack > STACK_CEILING) throw new Error(`K-357 open: ${d.lanes} lanes of ${laneMin} = ${stack} > the ${STACK_CEILING} fi budget`);
    let starter = null;
    if (d.starters) {
      const s = Array.isArray(block.starters) ? block.starters[0] : null;
      if (typeof s !== 'string' || !s.trim()) throw new Error(`K-357 ${loc} open: starters:true but the panel authored no starter literal (refuse)`);
      starter = s;
    }
    const lanes = [];
    for (let i = 0; i < d.lanes; i++) lanes.push(C4.recycleLane({ n: i + 1, draw: d.draw, rows: d.rows, starter, rulingW: d.rulingW, h: ROW_H, glyphH: d.glyphH, grow: true }));
    const inner = C4.faceRows({ rows: lanes, rowMin: laneMin, gap: GAP, cls: 'rc-open-lanes' });
    const bodyHtml = C4.faceRoot({ layout: 'open', fill: true, inner, stamps: { lanes: d.lanes, rows: d.rows, 'draw-w': d.draw.w, 'draw-h': d.draw.h, 'ruling-w': d.rulingW, 'glyph-h': d.glyphH, starters: d.starters ? 1 : 0, 'row-min': laneMin } });
    return { bodyHtml, meta: { layout: 'open', lanes: d.lanes, rows: d.rows, starter, laneMin, stack } };
  },

  /**
   * verify() for the five faces — re-derives everything from the stamps +
   * geometry (page.evaluate: no require, no bank; the node cross-checks that
   * need the bank — every picture === fileUri of the stamped bank item, the
   * row's bin === _bin(item, block), the F2 word === materialWords, the F4
   * examples' bins, the fences — live in qa/verify-b4-recycling.js). Every
   * face asserts: the root under the body top (top-anchored, never a floating
   * stage), the content above the footer, no [data-lcs-answer], every picture
   * complete and from a colour dir with no alt, the band floor on every
   * picture, no text but the words the face may print, and a SPARSE measure of
   * its own: which / write — the rows grid FILLS the body and the row's content
   * (chip tile / writing row) >= 0.7 of the row; odd — the boxes GROW to
   * min(boxMax, the stage) and the grid fills the body; color — the fixed
   * stack legend -> shelf bottom >= 630; open — the draw box grows to >= 0.8
   * of the lane and the grid fills the body.
   */
  async _verifyFace(page) {
    return page.evaluate(() => {
      const fails = [];
      const MATERIALS = ['paper', 'cardboard', 'glass', 'plastic', 'metal', 'organic'];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const WORD = /^\p{L}[\p{L}'’-]*$/u;
      const root = document.querySelector('[data-ws-content][data-lcs-recycling]');
      if (!root) return ['no recycling root'];
      const layout = root.dataset.lcsLayout;
      const D = root.dataset;
      const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
      const foot = document.querySelector('.ws-foot').getBoundingClientRect().top;
      const rr = root.getBoundingClientRect();
      const rect = (el) => el.getBoundingClientRect();
      const px = (im) => Math.min(rect(im).width, rect(im).height);
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp prints an answer');
      if (rr.left < body.left - 0.6 || rr.right > body.right + 0.6) fails.push('stage outside the body column');
      if (rr.top > body.top + 8) fails.push(`the stage floats ${Math.round(rr.top - body.top)} px below the body top (top-anchor it; slack falls below)`);
      const lowest = [...root.querySelectorAll('*')].reduce((y, el) => { const r = rect(el); return r.width && r.height ? Math.max(y, r.bottom) : y; }, 0);
      if (lowest > foot + 0.6) fails.push(`content reaches ${Math.round(lowest)} into the footer band at ${Math.round(foot)}`);
      const imgs = [...root.querySelectorAll('img')];
      imgs.forEach((im, i) => {
        if (!im.complete || im.naturalWidth === 0) fails.push(`picture ${i + 1} broken`);
        if (im.getAttribute('alt')) fails.push(`picture ${i + 1} alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        if (BW.test(parts[parts.length - 2] || '')) fails.push(`picture ${i + 1} from a B&W directory`);
      });
      const textNodes = (allow) => {
        const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let n;
        while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; if (!(n.parentElement && n.parentElement.closest(allow))) fails.push(`text "${n.textContent.trim().slice(0, 24)}" printed outside ${allow}`); }
      };
      const fills = (grid, what) => {
        if (rr.bottom < body.bottom - 1) fails.push(`${what}: the stage ends ${Math.round(body.bottom - rr.bottom)} px above the body bottom (the grid must fill the body; slack reads SPARSE)`);
        if (grid && rect(grid).bottom < rr.bottom - 1) fails.push(`${what}: the rows grid ends ${Math.round(rr.bottom - rect(grid).bottom)} px above the stage bottom`);
        const last = grid && grid.lastElementChild;
        if (last && rect(last).bottom < rect(grid).bottom - 1) fails.push(`${what}: the last row ends ${Math.round(rect(grid).bottom - rect(last).bottom)} px above the grid bottom (the rows do not open with the body; the slack reads SPARSE)`);
      };
      const badges = (els) => els.forEach((el, i) => { const b = el.querySelector('.rc-badge, .ws-card-badge'); if (!b || b.textContent.trim() !== String(i + 1)) fails.push(`row ${i + 1}: badge "${b && b.textContent.trim()}"`); });

      if (layout === 'which') {
        const keys = (D.lcsBins || '').split(',').filter(Boolean), N = +D.lcsN, rows = +D.lcsRows, tile = +D.lcsTile, iconPx = +D.lcsIconPx, chipTile = +D.lcsChipTile, chipBin = +D.lcsChipBin, keyPx = +D.lcsKeyPx, shuffle = D.lcsShuffleChips === '1', rowMin = +D.lcsRowMin;
        if (!(N >= 2 && N <= 5) || keys.length !== N || new Set(keys).size !== N) fails.push(`bins ${keys.join(',')} ≠ ${N} distinct keys in 2..5`);
        if (!(rows >= 4 && rows <= 8)) fails.push(`rows ${rows} outside 4..8`);
        const minIcon = Math.max(56, iconPx || 0);
        // the key strip: N slots in the bin order, a pill = the label, a 56-wide lid-filled bin with the position mark
        const key = root.querySelector('[data-lcs-key]');
        const kslots = key ? [...key.querySelectorAll('[data-lcs-key-bin]')] : [];
        if (!key || rect(key).top > rr.top + 1) fails.push('the key strip is not at the top of the stage');
        if (kslots.length !== N) fails.push(`${kslots.length} key slots ≠ ${N}`);
        const pillRects = [];
        kslots.forEach((el, i) => {
          const what = `key ${i + 1} (${el.dataset.lcsKeyBin})`;
          if (el.dataset.lcsKeyBin !== keys[i]) fails.push(`${what}: not in the bin order (${keys[i]})`);
          if (+el.dataset.lcsMark !== i) fails.push(`${what}: mark ${el.dataset.lcsMark} ≠ position ${i}`);
          const p = el.querySelectorAll('.rc-pill');
          if (p.length !== 1) fails.push(`${what}: ${p.length} pills`);
          else {
            if (p[0].textContent.trim() !== (el.dataset.lcsLabel || '').trim() || !p[0].textContent.trim()) fails.push(`${what}: pill "${p[0].textContent.trim()}" ≠ label "${el.dataset.lcsLabel}"`);
            if (p[0].getClientRects().length !== 1) fails.push(`${what}: the pill wraps`);
            if (parseFloat(getComputedStyle(p[0]).fontSize) < keyPx) fails.push(`${what}: pill font < ${keyPx}`);
            pillRects.push(rect(p[0]));
          }
          const svg = el.querySelector('svg[data-lcs-bin-svg]');
          if (!svg) { fails.push(`${what}: no bin drawing`); return; }
          if (Math.abs(rect(svg).width - 56) > 0.6 || Math.abs(rect(svg).height - 84) > 0.6) fails.push(`${what}: key bin ${Math.round(rect(svg).width)} x ${Math.round(rect(svg).height)} ≠ 56 x 84`);
          const grp = svg.querySelector('[data-lcs-bin-fillgroup]');
          if (!grp || grp.dataset.lcsFillMode !== 'lid') fails.push(`${what}: fill mode ≠ lid`);
          const mk = svg.querySelector('[data-lcs-bin-mark]');
          if (i === 0 ? !!mk : !(mk && +mk.dataset.lcsBinMark === i)) fails.push(`${what}: lid mark ${mk ? mk.dataset.lcsBinMark : 'absent'} ≠ position ${i}`);
        });
        for (let i = 0; i + 1 < pillRects.length; i++) if (pillRects[i].right > pillRects[i + 1].left - 2) fails.push(`key pills ${i + 1} and ${i + 2} touch`);
        // the rows
        const rowEls = [...root.querySelectorAll('[data-lcs-row]')];
        if (rowEls.length !== rows) fails.push(`${rowEls.length} rows ≠ ${rows}`);
        badges(rowEls);
        let prev = null;
        rowEls.forEach((el, i) => {
          const what = `row ${i + 1} (${el.dataset.lcsItem})`;
          const bin = el.dataset.lcsBin;
          if (!keys.includes(bin)) fails.push(`${what}: bin "${bin}" is not on the page`);
          if (!MATERIALS.includes(el.dataset.lcsMaterial)) fails.push(`${what}: material "${el.dataset.lcsMaterial}"`);
          if (prev === bin) fails.push(`${what}: answers ${bin} like the row above (a run of 2)`);
          prev = bin;
          const chips = [...el.querySelectorAll('[data-lcs-chip]')];
          if (chips.length !== N) fails.push(`${what}: ${chips.length} chips ≠ ${N}`);
          const order = chips.map((c) => c.dataset.lcsChip);
          if (order.join(',') !== (el.dataset.lcsChipOrder || '')) fails.push(`${what}: chip order stamp ≠ the rendered order`);
          if (!shuffle && order.join(',') !== keys.join(',')) fails.push(`${what}: chips ${order.join(',')} not in the fixed bin order`);
          if (new Set(order).size !== order.length || order.some((k) => !keys.includes(k))) fails.push(`${what}: chip keys ${order.join(',')}`);
          if (chips.filter((c) => c.dataset.lcsChip === bin).length !== 1) fails.push(`${what}: ${chips.filter((c) => c.dataset.lcsChip === bin).length} chips answer ${bin}`);
          const sig = chips.map((c) => { const s = getComputedStyle(c); return [s.borderColor, s.borderWidth, s.backgroundColor, s.outlineStyle, s.boxShadow, s.borderRadius, c.children.length, s.opacity].join('|'); });
          if (new Set(sig).size !== 1) fails.push(`${what}: a chip is pre-marked (chip styles differ)`);
          chips.forEach((c, k) => {
            const r = rect(c);
            if (Math.min(r.width, r.height) < chipTile - 0.6) fails.push(`${what}: chip ${k + 1} ${Math.round(Math.min(r.width, r.height))} < ${chipTile}`);
            const svg = c.querySelector('svg[data-lcs-bin-svg]');
            if (!svg || rect(svg).width < chipBin - 0.6) fails.push(`${what}: chip ${k + 1} bin ${svg ? Math.round(rect(svg).width) : 'absent'} < ${chipBin}`);
            const pos = keys.indexOf(c.dataset.lcsChip);
            if (svg && +svg.dataset.lcsBinMarkIndex !== pos) fails.push(`${what}: chip ${k + 1} mark ${svg.dataset.lcsBinMarkIndex} ≠ the bin's position ${pos}`);
            if (svg && +c.dataset.lcsMark !== pos) fails.push(`${what}: chip ${k + 1} mark stamp ≠ position`);
            const grp = svg && svg.querySelector('[data-lcs-bin-fillgroup]');
            if (!grp || grp.dataset.lcsFillMode !== 'lid') fails.push(`${what}: chip ${k + 1} fill mode ≠ lid`);
          });
          const prod = el.querySelector('.rc-product');
          const im = prod && prod.querySelector('img');
          if (!im) fails.push(`${what}: no product picture`);
          else {
            if (px(im) < minIcon - 0.6) fails.push(`${what}: picture ${Math.round(px(im))} < ${minIcon}`);
            if (Math.abs(rect(prod).width - tile) > 0.6 || Math.abs(rect(prod).height - tile) > 0.6) fails.push(`${what}: product tile ≠ ${tile}`);
          }
          const rh = rect(el).height;
          if (rh < rowMin - 0.6) fails.push(`${what}: row ${Math.round(rh)} < ${rowMin}`);
          const ch = chips.length ? rect(chips[0]).height : 0;
          if (ch < 0.7 * rh) fails.push(`${what}: chip tile ${Math.round(ch)} < 0.7 of the row ${Math.round(rh)} (a small chip floating in a tall row reads SPARSE)`);
        });
        fills(root.querySelector('[data-lcs-rows-grid]'), 'which');
        textNodes('.rc-pill, .rc-badge');
      } else if (layout === 'write') {
        const rows = +D.lcsRows, tile = +D.lcsTile, iconPx = +D.lcsIconPx, rulingW = +D.lcsRulingW, bankPx = +D.lcsBankPx, bank = D.lcsBank === '1', nWords = +D.lcsWords, perWordMax = +D.lcsPerWordMax, rowMin = +D.lcsRowMin;
        if (!(rows >= 6 && rows <= 8)) fails.push(`rows ${rows} outside 6..8`);
        const minIcon = Math.max(44, iconPx || 0);
        const rowEls = [...root.querySelectorAll('[data-lcs-row]')];
        if (rowEls.length !== rows) fails.push(`${rowEls.length} rows ≠ ${rows}`);
        badges(rowEls);
        const used = {};
        rowEls.forEach((el, i) => {
          const what = `row ${i + 1} (${el.dataset.lcsItem})`;
          const w = el.dataset.lcsWord || '';
          if (!WORD.test(w) || [...w].length > 12) fails.push(`${what}: word "${w}" is not a single word of <= 12 graphemes`);
          used[w] = (used[w] || 0) + 1;
          if (!MATERIALS.includes(el.dataset.lcsMaterial)) fails.push(`${what}: material "${el.dataset.lcsMaterial}"`);
          const txt = el.textContent.replace(/\s+/g, '');
          if (txt !== String(i + 1)) fails.push(`${what}: text "${txt}" printed in the row (the word must never be printed)`);
          const wr = el.querySelectorAll('[data-lcs-prim="writing-row"]');
          if (wr.length !== 1) fails.push(`${what}: ${wr.length} writing rows`);
          else {
            if (Math.abs(rect(wr[0]).width - rulingW) > 0.6) fails.push(`${what}: writing row ${Math.round(rect(wr[0]).width)} ≠ ${rulingW}`);
            if (wr[0].querySelectorAll('line, path').length < 3) fails.push(`${what}: the writing row has no school lines`);
            const rh = rect(el).height, ch = rect(wr[0]).height + 4;
            if (rh < rowMin - 0.6) fails.push(`${what}: row ${Math.round(rh)} < ${rowMin}`);
            if (ch < 0.7 * rh) fails.push(`${what}: writing row ${Math.round(ch)} < 0.7 of the row ${Math.round(rh)} (a short ruling floating in a tall row reads SPARSE)`);
          }
          const prod = el.querySelector('.rc-product');
          const im = prod && prod.querySelector('img');
          if (!im) fails.push(`${what}: no product picture`);
          else {
            if (px(im) < minIcon - 0.6) fails.push(`${what}: picture ${Math.round(px(im))} < ${minIcon}`);
            if (Math.abs(rect(prod).width - tile) > 0.6) fails.push(`${what}: product tile ≠ ${tile}`);
          }
        });
        for (const [w, n] of Object.entries(used)) if (n > perWordMax) fails.push(`word "${w}" used ${n} > ${perWordMax} times`);
        const words = [...root.querySelectorAll('[data-lcs-bank-word]')].map((el) => ({ el, w: el.dataset.lcsBankWord, t: el.textContent.trim() }));
        const banner = root.querySelector('[data-lcs-bank-banner]');
        if (bank) {
          if (!banner || rect(banner).top > rr.top + 1) fails.push('the word bank is not at the top of the stage');
          if (words.length !== nWords || new Set(words.map((x) => x.w)).size !== words.length) fails.push(`${words.length} bank words ≠ ${nWords} distinct`);
          words.forEach((x, i) => { if (x.t !== x.w || !WORD.test(x.w)) fails.push(`bank word ${i + 1} "${x.t}" ≠ stamp "${x.w}" / not a word`); if (parseFloat(getComputedStyle(x.el).fontSize) < bankPx) fails.push(`bank word "${x.w}" under ${bankPx} px`); });
          if (new Set(words.map((x) => Math.round(rect(x.el).top))).size > 1) fails.push('the word bank wraps to a second row');
          const rowWords = rowEls.map((el) => el.dataset.lcsWord);
          const bankSet = new Set(words.map((x) => x.w)), rowSet = new Set(rowWords);
          if (bankSet.size !== rowSet.size || [...bankSet].some((w) => !rowSet.has(w))) fails.push(`bank {${[...bankSet].join(',')}} ≠ the row words {${[...rowSet].join(',')}}`);
          for (const w of bankSet) if (!(used[w] >= 1)) fails.push(`bank word "${w}" is used by no row`);
          const first = []; for (const w of rowWords) if (!first.includes(w)) first.push(w);
          const b = words.map((x) => x.w);
          if (b.join('\u0001') === first.join('\u0001')) fails.push('the bank lists the words in the order they appear down the rows (order leak)');
          if (b.length >= 3 && b.join('\u0001') === first.slice().reverse().join('\u0001')) fails.push('the bank lists the words in the reverse row order (order leak)');
        } else if (banner || words.length) fails.push('a bank is rendered on a bank-less config');
        fills(root.querySelector('[data-lcs-rows-grid]'), 'write');
        textNodes('[data-lcs-bank-word], .rc-badge');
      } else if (layout === 'odd') {
        const rows = +D.lcsRows, items = +D.lcsItems, box = +D.lcsBox, iconPx = +D.lcsIconPx, boxMax = +D.lcsBoxMax, organicOdd = D.lcsOrganicOdd === '1', rowMin = +D.lcsRowMin, trio = (D.lcsTrio || '').split(',');
        const CLS = (m) => (m === 'cardboard' ? 'paper' : m);
        if (!(rows >= 3 && rows <= 5) || items !== 4) fails.push(`rows ${rows} / items ${items} outside the face (3..5 rows of 4)`);
        if (trio.length !== rows || new Set(trio).size !== rows) fails.push(`trio stamp ${trio.join(',')} ≠ ${rows} distinct classes`);
        const cards = [...root.querySelectorAll('[data-lcs-card]')];
        if (cards.length !== rows) fails.push(`${cards.length} cards ≠ ${rows}`);
        badges(cards);
        let prevOdd = -1;
        cards.forEach((card, i) => {
          const what = `card ${i + 1} (${card.dataset.lcsTrio})`;
          if (card.dataset.lcsTrio !== trio[i]) fails.push(`${what}: trio stamp ≠ ${trio[i]}`);
          const boxes = [...card.querySelectorAll('[data-lcs-item]')];
          if (boxes.length !== items) { fails.push(`${what}: ${boxes.length} boxes ≠ ${items}`); return; }
          const cls = boxes.map((b) => b.dataset.lcsClass);
          boxes.forEach((b, k) => { if (CLS(b.dataset.lcsMaterial) !== b.dataset.lcsClass) fails.push(`${what}: box ${k + 1} class ${b.dataset.lcsClass} ≠ its material ${b.dataset.lcsMaterial}`); });
          const same = boxes.filter((b) => b.dataset.lcsClass === card.dataset.lcsTrio);
          const diff = boxes.filter((b) => b.dataset.lcsClass !== card.dataset.lcsTrio);
          if (same.length !== 3 || diff.length !== 1) fails.push(`${what}: ${same.length} of the trio class + ${diff.length} other — not 3 + 1 (${cls.join(',')})`);
          const odd = boxes.filter((b) => b.dataset.lcsOdd === '1');
          if (odd.length !== 1 || (diff.length === 1 && odd[0] !== diff[0])) fails.push(`${what}: the odd stamp is not on the one different box`);
          if (!organicOdd && diff.length === 1 && diff[0].dataset.lcsClass === 'organic') fails.push(`${what}: the odd one is organic on an organicOdd:false config`);
          const oi = boxes.indexOf(odd[0]);
          if (oi === prevOdd) fails.push(`${what}: the odd one sits in column ${oi + 1} like the row above`);
          prevOdd = oi;
          if (new Set(boxes.map((b) => b.dataset.lcsVocab)).size !== items) fails.push(`${what}: a vocab key twice in the row`);
          const sizes = boxes.map((b) => { const im = b.querySelector('img'); return im ? px(im) : 0; });
          if (Math.max(...sizes) - Math.min(...sizes) > 0.6) fails.push(`${what}: pictures ${sizes.map(Math.round).join('/')} are not one size (the odd one must never be the odd SIZE)`);
          if (Math.min(...sizes) < iconPx - 0.6) fails.push(`${what}: picture ${Math.round(Math.min(...sizes))} < ${iconPx}`);
          const stage = card.querySelector('.ws-card-stage');
          const inner = stage ? rect(stage).height - 12 : 0;
          boxes.forEach((b, k) => {
            const r = rect(b);
            if (Math.abs(r.width - r.height) > 0.6) fails.push(`${what}: box ${k + 1} not square`);
            if (r.height < box - 0.6 || r.height > boxMax + 0.6) fails.push(`${what}: box ${k + 1} ${Math.round(r.height)} outside ${box}..${boxMax}`);
            if (r.height < Math.min(boxMax, inner) - 0.6 || r.height < 0.85 * inner) fails.push(`${what}: box ${k + 1} is ${Math.round(r.height)} in a ${Math.round(inner)} px stage — it does not grow to min(${boxMax}, the stage) / 0.85 of it (a small picture floating in a big card reads SPARSE)`);
          });
          if (stage && stage.textContent.trim()) fails.push(`${what}: text inside the stage`);
          if (rect(card).height < rowMin - 0.6) fails.push(`${what}: card ${Math.round(rect(card).height)} < ${rowMin}`);
        });
        fills(root.querySelector('[data-lcs-rows-grid]'), 'odd');
        textNodes('.ws-card-badge');
      } else if (layout === 'color') {
        const keys = (D.lcsBins || '').split(',').filter(Boolean), N = +D.lcsN, binW = +D.lcsBinW, binH = +D.lcsBinH, examples = +D.lcsExamples, pic = +D.lcsPic, legendPx = +D.lcsLegendPx, legend = (D.lcsLegend || '').split(',').filter(Boolean);
        if (!(N >= 2 && N <= 5) || keys.length !== N || new Set(keys).size !== N) fails.push(`bins ${keys.join(',')} ≠ ${N} distinct keys in 2..5`);
        if (!(binH >= 300 && binH <= 400)) fails.push(`binH ${binH} outside 300..400`);
        const minPic = Math.max(56, pic || 0);
        // the legend
        const banner = root.querySelector('[data-lcs-legend-banner]');
        const entries = banner ? [...banner.querySelectorAll('[data-lcs-legend]')] : [];
        if (!banner || rect(banner).top > rr.top + 1) fails.push('the legend is not at the top of the stage');
        if (entries.length !== N) fails.push(`${entries.length} legend entries ≠ ${N}`);
        const lkeys = entries.map((e) => e.dataset.lcsLegend);
        if (lkeys.join(',') !== legend.join(',')) fails.push(`legend order ${lkeys.join(',')} ≠ the stamp ${legend.join(',')}`);
        if (new Set(lkeys).size !== lkeys.length || lkeys.some((k) => !keys.includes(k)) || lkeys.length !== keys.length) fails.push(`legend keys ${lkeys.join(',')} ≠ the bin set`);
        const legendRows = +D.lcsLegendRows;
        const tops = new Set(entries.map((e) => Math.round(rect(e).top)));
        if (tops.size !== legendRows) fails.push(`the legend sits on ${tops.size} row(s), not the stamped ${legendRows} (an unplanned wrap moves the stack)`);
        const differ = lkeys.filter((k, i) => k !== keys[i]).length;
        if (differ < Math.min(3, N)) fails.push(`the legend follows the bin order (${differ} positions differ; the child must READ the word, not count along)`);
        const swatches = [];
        entries.forEach((e, i) => {
          const what = `legend ${i + 1} (${e.dataset.lcsLegend})`;
          const sw = e.querySelector('svg rect');
          const fill = sw ? (sw.getAttribute('fill') || '').toUpperCase() : '';
          if (!/^#[0-9A-F]{6}$/.test(fill) || fill === '#FFFFFF') fails.push(`${what}: swatch fill "${fill}"`);
          if (swatches.includes(fill)) fails.push(`${what}: swatch colour ${fill} repeats`);
          swatches.push(fill);
          const spans = [...e.querySelectorAll('span')].filter((s) => s.textContent.trim());
          if (spans.length !== 2) fails.push(`${what}: ${spans.length} words (colour word + bin word)`);
          spans.forEach((s) => { if (parseFloat(getComputedStyle(s).fontSize) < legendPx) fails.push(`${what}: a legend word under ${legendPx} px`); });
        });
        // the bins: white, no mark, the intended colour on the fill group, the word on the pill
        const slots = [...root.querySelectorAll('.rc-binslot[data-lcs-bin]')];
        if (slots.length !== N) fails.push(`${slots.length} bin slots ≠ ${N}`);
        const pillRects = [];
        slots.forEach((el, i) => {
          const what = `bin ${i + 1} (${el.dataset.lcsBin})`;
          if (el.dataset.lcsBin !== keys[i]) fails.push(`${what}: not in the stamped order`);
          if (+el.dataset.lcsMark !== i) fails.push(`${what}: mark stamp ${el.dataset.lcsMark} ≠ position ${i}`);
          const p = el.querySelectorAll('.rc-pill');
          if (p.length !== 1) fails.push(`${what}: ${p.length} pills`);
          else {
            if (p[0].textContent.trim() !== (el.dataset.lcsLabel || '').trim() || !p[0].textContent.trim()) fails.push(`${what}: pill "${p[0].textContent.trim()}" ≠ label "${el.dataset.lcsLabel}"`);
            if (p[0].getClientRects().length !== 1) fails.push(`${what}: the pill wraps`);
            if (parseFloat(getComputedStyle(p[0]).fontSize) < 17) fails.push(`${what}: pill font < 17`);
            pillRects.push(rect(p[0]));
          }
          const svg = el.querySelector('svg[data-lcs-bin-svg]');
          if (!svg) { fails.push(`${what}: no bin drawing`); return; }
          if (Math.abs(rect(svg).width - binW) > 0.6 || Math.abs(rect(svg).height - binH) > 0.6) fails.push(`${what}: bin ${Math.round(rect(svg).width)} x ${Math.round(rect(svg).height)} ≠ ${binW} x ${binH}`);
          const grp = svg.querySelector('[data-lcs-bin-fillgroup]');
          if (!grp || grp.dataset.lcsFillMode !== 'none') fails.push(`${what}: fill mode ${grp && grp.dataset.lcsFillMode} ≠ none`);
          if (!grp || grp.dataset.lcsFill !== el.dataset.lcsColor || el.dataset.lcsColor === 'none') fails.push(`${what}: the fill group names "${grp && grp.dataset.lcsFill}" but the slot's colour is "${el.dataset.lcsColor}"`);
          if (!legend.includes(el.dataset.lcsBin)) fails.push(`${what}: not in the legend`);
          for (const part of ['handle', 'lid', 'collar', 'body']) {
            const shape = svg.querySelector(`[data-lcs-bin-part="${part}"] rect, [data-lcs-bin-part="${part}"] path`);
            if (!shape) fails.push(`${what}: no ${part}`);
            else if ((shape.getAttribute('fill') || '').toUpperCase() !== '#FFFFFF') fails.push(`${what}: the ${part} is ${shape.getAttribute('fill')}, not white (a pre-filled part on the colour face)`);
          }
          if (svg.querySelector('[data-lcs-bin-mark]')) fails.push(`${what}: a lid mark is drawn on the colour face`);
        });
        for (let i = 0; i + 1 < pillRects.length; i++) if (pillRects[i].right > pillRects[i + 1].left - 2) fails.push(`pills ${i + 1} and ${i + 2} touch`);
        // the shelves under the bins
        const shelves = [...root.querySelectorAll('[data-lcs-shelf]')];
        if (shelves.length !== N) fails.push(`${shelves.length} shelves ≠ ${N}`);
        const seen = new Set();
        shelves.forEach((sh, i) => {
          const what = `shelf ${i + 1}`;
          const slot = slots[i];
          if (slot && Math.abs(rect(sh).left - rect(slot).left) > 1) fails.push(`${what}: not under bin ${i + 1} (${Math.round(rect(sh).left)} vs ${Math.round(rect(slot).left)})`);
          if (slot && rect(sh).top < rect(slot).bottom - 0.6) fails.push(`${what}: overlaps the bin`);
          const ex = [...sh.querySelectorAll('[data-lcs-example]')];
          if (ex.length !== examples) fails.push(`${what}: ${ex.length} examples ≠ ${examples}`);
          ex.forEach((e, k) => {
            if (slot && e.dataset.lcsBin !== slot.dataset.lcsBin) fails.push(`${what}: example ${k + 1} is stamped for bin ${e.dataset.lcsBin}`);
            if (seen.has(e.dataset.lcsExample)) fails.push(`${what}: example ${e.dataset.lcsExample} repeats on the page`);
            seen.add(e.dataset.lcsExample);
            const im = e.querySelector('img');
            if (!im || px(im) < minPic - 0.6) fails.push(`${what}: example ${k + 1} picture ${im ? Math.round(px(im)) : 'absent'} < ${minPic}`);
          });
        });
        // the fixed stack: legend top -> shelf bottom
        const stackH = shelves.length && banner ? Math.max(...shelves.map((s) => rect(s).bottom)) - rect(banner).top : 0;
        if (stackH < 630 - 0.6) fails.push(`stack ${Math.round(stackH)} px < 630: the apparatus does not fill the page (sparse)`);
        if (stackH > 677 + 0.6) fails.push(`stack ${Math.round(stackH)} px > the 677 fi budget`);
        textNodes('.rc-pill, [data-lcs-legend]');
      } else if (layout === 'open') {
        const lanes = +D.lcsLanes, rows = +D.lcsRows, drawW = +D.lcsDrawW, drawH = +D.lcsDrawH, rulingW = +D.lcsRulingW, starters = D.lcsStarters === '1', rowMin = +D.lcsRowMin;
        const laneEls = [...root.querySelectorAll('[data-lcs-lane]')];
        if (laneEls.length !== lanes || !(lanes >= 2 && lanes <= 4)) fails.push(`${laneEls.length} lanes ≠ ${lanes} (2..4)`);
        badges(laneEls);
        laneEls.forEach((el, i) => {
          const what = `lane ${i + 1}`;
          const boxes = el.querySelectorAll('[data-lcs-drawbox]');
          if (boxes.length !== 1) fails.push(`${what}: ${boxes.length} draw boxes`);
          else {
            const b = boxes[0], r = rect(b);
            if (b.children.length || b.textContent.trim()) fails.push(`${what}: the draw box is not empty`);
            if (Math.abs(r.width - drawW) > 0.6) fails.push(`${what}: draw box ${Math.round(r.width)} wide ≠ ${drawW}`);
            if (r.height < drawH - 0.6) fails.push(`${what}: draw box ${Math.round(r.height)} < ${drawH}`);
            const inner = rect(el).height - 20;
            if (r.height < 0.8 * inner) fails.push(`${what}: draw box ${Math.round(r.height)} < 0.8 of the lane's ${Math.round(inner)} (a small box floating in a tall lane reads SPARSE — it must grow)`);
          }
          const rr2 = [...el.querySelectorAll('[data-lcs-ruling-row]')];
          if (rr2.length !== rows) fails.push(`${what}: ${rr2.length} ruling rows ≠ ${rows}`);
          rr2.forEach((row, k) => {
            const wr = row.querySelectorAll('[data-lcs-prim="writing-row"]');
            if (wr.length !== 1 || Math.abs(rect(wr[0]).width - rulingW) > 0.6) fails.push(`${what}: ruling row ${k + 1} ≠ one ${rulingW}-wide writing row`);
          });
          const st = [...el.querySelectorAll('[data-lcs-starter]')];
          if (!starters && st.length) fails.push(`${what}: a starter is printed on a starters:false config`);
          if (starters) {
            if (st.length !== 1 || !rr2[0] || !rr2[0].contains(st[0])) fails.push(`${what}: ${st.length} starters (one, on the first row)`);
            st.forEach((s) => { const w = s.getBBox ? s.getBBox().width : rect(s).width; if (!s.dataset.lcsStarterPx) fails.push(`${what}: the starter carries no metric size`); if (w > 0.35 * rulingW) fails.push(`${what}: starter "${s.textContent}" ${Math.round(w)} px > 0.35 x ${rulingW} (the writing space is the child's)`); });
          }
          if (rect(el).height < rowMin - 0.6) fails.push(`${what}: lane ${Math.round(rect(el).height)} < ${rowMin}`);
        });
        fills(root.querySelector('[data-lcs-rows-grid]'), 'open');
        textNodes(starters ? '.rc-badge, [data-lcs-starter]' : '.rc-badge');
      } else {
        return [`unknown layout "${layout}"`];
      }
      return fails;
    });
  },

  /** Re-derives the whole base from the stamps + geometry (runs in page.evaluate: no require); a face root (data-lcs-layout present) is handed to _verifyFace. */
  async verify(page) {
    const layout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-recycling]'); return r ? (r.dataset.lcsLayout === undefined ? null : r.dataset.lcsLayout) : null; });
    if (layout !== null) return this._verifyFace(page);
    return page.evaluate(() => {
      const fails = [];
      const MATERIALS = ['paper', 'cardboard', 'glass', 'plastic', 'metal', 'organic'];
      // the global bank's pageRules (data/b4/recycling.json) — the gate asserts these two copies agree
      const NEVER_BOTH = [['paper', 'letter']];
      const NEVER_ADJACENT = [['paper', 'package'], ['letter', 'package']];
      const BW = /\b(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
      const root = document.querySelector('[data-ws-content][data-lcs-recycling]');
      if (!root) return ['no recycling root'];
      if (root.dataset.lcsLayout !== undefined) return [`layout "${root.dataset.lcsLayout}" is not the base (the faces verify in Phase 2)`];
      if (document.querySelector('[data-lcs-answer]')) fails.push('a [data-lcs-answer] stamp prints an answer');
      const keys = (root.dataset.lcsBins || '').split(',').filter(Boolean);
      const N = +root.dataset.lcsN, items = +root.dataset.lcsItems, perMin = +root.dataset.lcsPerBinMin, perMax = +root.dataset.lcsPerBinMax;
      const tilePx = +root.dataset.lcsTile, iconPx = +root.dataset.lcsIconPx, binW = +root.dataset.lcsBinW, twins = root.dataset.lcsTwins === '1';
      const minIcon = Math.max(56, iconPx || 0);
      if (!(N >= 2 && N <= 5)) fails.push(`${N} bins outside 2..5`);
      if (keys.length !== N || new Set(keys).size !== N) fails.push(`data-lcs-bins ${keys.join(',')} ≠ ${N} distinct keys`);
      // bins: N slots in the stamped order, one pill each = the stamped label, a lid-filled bin with the position mark
      const slots = [...root.querySelectorAll('.rc-binslot[data-lcs-bin]')];
      if (slots.length !== N) fails.push(`${slots.length} bin slots ≠ ${N}`);
      const pillRects = [];
      slots.forEach((el, i) => {
        const what = `bin ${i + 1} (${el.dataset.lcsBin})`;
        if (el.dataset.lcsBin !== keys[i]) fails.push(`${what}: not in the stamped order (${keys[i]})`);
        if (+el.dataset.lcsMark !== i) fails.push(`${what}: mark ${el.dataset.lcsMark} ≠ position ${i}`);
        const mats = (el.dataset.lcsMaterials || '').split(',').filter(Boolean);
        if (!mats.length || mats.some((m) => !MATERIALS.includes(m))) fails.push(`${what}: materials "${el.dataset.lcsMaterials}"`);
        const pills = el.querySelectorAll('.rc-pill');
        if (pills.length !== 1) fails.push(`${what}: ${pills.length} pills`);
        else {
          const p = pills[0];
          if (p.textContent.trim() !== (el.dataset.lcsLabel || '').trim() || !p.textContent.trim()) fails.push(`${what}: pill "${p.textContent.trim()}" ≠ label "${el.dataset.lcsLabel}"`);
          if (p.getClientRects().length !== 1) fails.push(`${what}: the pill wraps`);
          if (parseFloat(getComputedStyle(p).fontSize) < 17) fails.push(`${what}: pill font ${getComputedStyle(p).fontSize} < 17`);
          pillRects.push(p.getBoundingClientRect());
        }
        const svg = el.querySelector('svg[data-lcs-bin-svg]');
        if (!svg) { fails.push(`${what}: no bin drawing`); return; }
        const r = svg.getBoundingClientRect();
        if (Math.abs(r.width - binW) > 0.6) fails.push(`${what}: bin ${Math.round(r.width)} wide ≠ ${binW}`);
        if (+svg.dataset.lcsBinMarkIndex !== i) fails.push(`${what}: drawn mark index ${svg.dataset.lcsBinMarkIndex} ≠ ${i}`);
        const grp = svg.querySelector('[data-lcs-bin-fillgroup]');
        if (!grp || grp.dataset.lcsFillMode !== 'lid') fails.push(`${what}: fill mode ${grp && grp.dataset.lcsFillMode} ≠ lid`);
        for (const part of ['handle', 'lid', 'collar', 'body']) if (!svg.querySelector(`[data-lcs-bin-part="${part}"]`)) fails.push(`${what}: no ${part}`);
        const mk = svg.querySelector('[data-lcs-bin-mark]');
        if (i === 0 ? !!mk : !(mk && +mk.dataset.lcsBinMark === i)) fails.push(`${what}: lid mark ${mk ? mk.dataset.lcsBinMark : 'absent'} ≠ position ${i}`);
        const body = svg.querySelector('[data-lcs-bin-part="body"] path');
        if (body && body.getAttribute('fill').toUpperCase() !== '#FFFFFF') fails.push(`${what}: the body is not white on the base`);
      });
      for (let i = 0; i + 1 < pillRects.length; i++) if (pillRects[i].right > pillRects[i + 1].left - 2) fails.push(`pills ${i + 1} and ${i + 2} touch (${Math.round(pillRects[i].right)} vs ${Math.round(pillRects[i + 1].left)})`);
      // tiles: `items` of them, one complete picture each = fileUri(theme, noun) of the stamps, icon >= 60, stamped bin + material consistent
      const tiles = [...root.querySelectorAll('.rc-tile[data-lcs-item]')];
      if (tiles.length !== items) fails.push(`${tiles.length} tiles ≠ items ${items}`);
      if (tiles.length < 4) fails.push(`${tiles.length} tiles < 4`);
      const per = {}, fams = new Set(), vocabs = new Set(), ids = [];
      const matsOf = Object.fromEntries(slots.map((el) => [el.dataset.lcsBin, (el.dataset.lcsMaterials || '').split(',')]));
      tiles.forEach((el, i) => {
        const what = `tile ${i + 1} (${el.dataset.lcsItem})`;
        ids.push(el.dataset.lcsItem);
        const bin = el.dataset.lcsBin, mat = el.dataset.lcsMaterial;
        if (!keys.includes(bin)) fails.push(`${what}: bin "${bin}" is not on the page`);
        if (!MATERIALS.includes(mat)) fails.push(`${what}: material "${mat}"`);
        if (matsOf[bin] && !matsOf[bin].includes(mat)) fails.push(`${what}: ${mat} is not a material of bin ${bin}`);
        per[bin] = (per[bin] || 0) + 1;
        if (fams.has(el.dataset.lcsFamily)) fails.push(`${what}: family "${el.dataset.lcsFamily}" twice on the page`);
        fams.add(el.dataset.lcsFamily);
        if (!twins && vocabs.has(el.dataset.lcsVocab)) fails.push(`${what}: vocab key "${el.dataset.lcsVocab}" twice on the page (twins)`);
        vocabs.add(el.dataset.lcsVocab);
        const imgs = el.querySelectorAll('img');
        if (imgs.length !== 1) { fails.push(`${what}: ${imgs.length} pictures`); return; }
        const im = imgs[0];
        if (!im.complete || im.naturalWidth === 0) fails.push(`${what}: picture broken`);
        if (im.getAttribute('alt')) fails.push(`${what}: alt names the picture`);
        const parts = decodeURIComponent(im.src).split('/');
        const dir = parts[parts.length - 2] || '', file = parts[parts.length - 1].replace(/@\dx\.webp$/, '').replace(/\.\w+$/, '');
        if (BW.test(dir)) fails.push(`${what}: picture from a B&W directory "${dir}"`);
        if (dir !== el.dataset.lcsTheme || file !== el.dataset.lcsNoun) fails.push(`${what}: picture ${dir}/${file} ≠ the stamped ${el.dataset.lcsTheme}/${el.dataset.lcsNoun} (src is not the opened picture)`);
        const r = im.getBoundingClientRect();
        if (Math.min(r.width, r.height) < minIcon - 0.6) fails.push(`${what}: icon ${Math.round(Math.min(r.width, r.height))} px < ${minIcon}`);
        const tr = el.getBoundingClientRect();
        if (Math.abs(tr.width - tilePx) > 0.6 || Math.abs(tr.height - tilePx) > 0.6) fails.push(`${what}: tile ${Math.round(tr.width)} x ${Math.round(tr.height)} ≠ ${tilePx}`);
        if (!el.querySelector('.rc-dot')) fails.push(`${what}: no dot`);
      });
      for (const k of keys) {
        const c = per[k] || 0;
        if (c < perMin) fails.push(`bin ${k} receives ${c} < perBinMin ${perMin}`);
        if (c > perMax) fails.push(`bin ${k} receives ${c} > perBinMax ${perMax}`);
        const pos = tiles.map((el, i) => (el.dataset.lcsBin === k ? i : -1)).filter((i) => i >= 0);
        if (pos.length >= 2 && pos[pos.length - 1] - pos[0] === pos.length - 1) fails.push(`bin ${k}: its ${pos.length} tiles sit side by side (position leak)`);
      }
      for (const [a, b] of NEVER_BOTH) if (ids.includes(a) && ids.includes(b)) fails.push(`${a} and ${b} on one page (both pale in mono)`);
      for (let i = 0; i + 1 < ids.length; i++) for (const [a, b] of NEVER_ADJACENT) if ((ids[i] === a && ids[i + 1] === b) || (ids[i] === b && ids[i + 1] === a)) fails.push(`${a} next to ${b} in the strip`);
      // text: nothing inside the root but the pills
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.trim()) continue;
        if (!(node.parentElement && node.parentElement.closest('.rc-pill'))) fails.push(`text "${node.textContent.trim().slice(0, 24)}" printed outside a pill`);
      }
      // geometry: strip above, bins at the foot, a line zone between, everything inside the body and above the footer
      const body = document.querySelector('[data-lcs-body]');
      const foot = document.querySelector('.ws-foot');
      const rr = root.getBoundingClientRect();
      if (body) { const b = body.getBoundingClientRect(); if (rr.left < b.left - 0.6 || rr.right > b.right + 0.6) fails.push('stage outside the body column'); }
      const all = [...tiles, ...slots, ...pillRects.map((r) => ({ getBoundingClientRect: () => r }))];
      if (foot) { const ft = foot.getBoundingClientRect().top; all.forEach((el) => { if (el.getBoundingClientRect().bottom > ft + 0.6) fails.push('an element reaches into the footer band'); }); }
      const stripBottom = tiles.reduce((y, el) => Math.max(y, el.getBoundingClientRect().bottom), 0) + 7;
      const pillTop = pillRects.reduce((y, r) => Math.min(y, r.top), Infinity);
      const zoneEl = root.querySelector('.rc-zone[data-lcs-line-zone]');
      const zone = +root.dataset.lcsZone;
      if (!zoneEl || Math.abs(zoneEl.getBoundingClientRect().height - zone) > 0.6) fails.push(`the line zone block is ${zoneEl ? Math.round(zoneEl.getBoundingClientRect().height) : 'absent'}, not the stamped ${zone}`);
      if (!(zone >= 220 && zone <= 260)) fails.push(`line zone ${zone} outside 220..260 (sparse or cramped)`);
      const binH = +root.dataset.lcsBinH;
      if (!(binH >= 240 && binH <= 300)) fails.push(`binH ${binH} outside 240..300 (a short bin leaves the page sparse)`);
      slots.forEach((el, i) => { const svg = el.querySelector('svg[data-lcs-bin-svg]'); if (svg && Math.abs(svg.getBoundingClientRect().height - binH) > 0.6) fails.push(`bin ${i + 1} drawn ${Math.round(svg.getBoundingClientRect().height)} tall, not the stamped ${binH}`); });
      if (tiles.length && pillRects.length) { const z = pillTop - stripBottom; if (z < 200 || z > 300) fails.push(`measured line zone ${Math.round(z)} px outside 200..300 (dot to pill)`); }
      if (body && rr.top - body.getBoundingClientRect().top > 8) fails.push(`the stage floats ${Math.round(rr.top - body.getBoundingClientRect().top)} px below the body top (slack must fall below the bins)`);
      return fails;
    });
  },
};
