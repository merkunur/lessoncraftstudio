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
 * 'which' | 'write' | 'odd' | 'color' | 'open' dispatch to `_buildFace` (NOT
 * built in this commission — it refuses by name). `coordinate.mode` on the
 * landing side is the face's mode string (base = 'base').
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { fileUri } = require('../../lib/b2-common.js');
const C4 = require('../../templates/components-b4.js');
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

  /* ------------------------------------------------------------ Phase 2 faces (NOT built in this commission) */
  _buildFace(bankData, d) {
    if (!FACES.includes(d.layout)) throw new Error(`K-357: unknown layout "${d.layout}"`);
    throw new Error(`K-357: face layout "${d.layout}" is Phase 2 — not built (the base carries the knob; see design §3)`);
  },

  /** Re-derives the whole base from the stamps + geometry (runs in page.evaluate: no require). */
  async verify(page) {
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
