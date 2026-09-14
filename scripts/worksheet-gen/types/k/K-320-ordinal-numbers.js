/**
 * K-320 — Ordinal Numbers: Find the Place (nt20-C; `ordinal-numbers`, K,
 * readiness — no K-2 CCSS-M code names ordinals). Design:
 * docs/worksheet-gen/b3-designs/K-320-ordinal-numbers.md §2/§5.
 *
 * Three cream line-up panels. Each: a coral start flag + direction arrow, N
 * white picture tiles (every noun DISTINCT within the strip), a dotted mark
 * band, then TWO cue chips `[ 3rd (ring icon) ] [ 6th (X icon) ]`. The child
 * starts at the flag, counts to the chip's ordinal and makes the mark the icon
 * shows (a ring round the tile / an X across it / a tick in the band at d3).
 * Tiles carry no word, numeral or `alt`; the chips are the only text, so the
 * apparatus is identical in all 11 locales except the notation glyph, which is
 * an explicit per-locale literal table (data/b3/ordinals.js via
 * lib/b3-common.js ordinalFor) — never data/b2/calendar.js ordinal().
 *
 * THEMED (§1): pools = entriesFor(theme, loc) (B2_EXCLUDE applied); the fan
 * set's minimum over 11 locales is pets 19 >= minNouns 10 (measured). A theme
 * that cannot fill N distinct nouns THROWS (refusal). BW themes are excluded
 * (excludeBw) and a BW-marked theme is refused at build (`colour` is a
 * wave-decision mark that no face rides on).
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (n / kMax /
 * distinct / mustInclude / anyOf / maxRepeat / actions / start), never on the
 * level index. `start` ('left' | 'right' | 'mixed') is the base config key F4
 * flips (PARAM face; no new code); F1/F2/F3/F5 are Phase-2 `layout` knobs.
 *
 * Answer hiding: the ground truth is data-lcs-* only (order, start, n, per-chip
 * ordinal/action/target/notation); verify(page) re-derives every target from
 * the stamps (target === start==='left' ? k-1 : n-k), the page rule, the
 * per-strip distinctness and the no-text/no-alt tile contract.
 *
 * Chrome budget (README ruling): body 722 with 3-line title + 3-line
 * instruction. Rows `repeat(3, minmax(<panelMin>px, 1fr))`, gap 12; the slack
 * opens INSIDE each panel between strip and chip row (space-between), never in
 * the tiles. Measured d2 panel min = 24 (arrow) + 4 + 84 + 22 + 44 + 20 + 4 =
 * 202 (the design's 198 assumed a 20 px arrow row; a 20 px pole with a 3 px
 * rule and 12 px head needs 24 — recorded in _work/K-320-build.md).
 */
'use strict';
const { entriesFor, sampleEntries } = require('../../lib/b2-common.js');
const { bank: loadBank, ordinalFor } = require('../../lib/b3-common.js');
const { lineUpPanel, lineUpStrip, ordinalChip } = require('../../templates/components-b3.js');

const BANK = 'ordinals';
const LANE_INNER = 647;   // .ws-lane with the inline padding:10px 12px override (675 − 24 − 4)
const GRID_GAP = 12;
const ARROW_ROW = 24;
const BAND = 22;
const PAD_BORDER = 24;    // 2 × 10 padding + 2 × 2 border
const BW_MARK = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;   // the localized B&W theme marker (§20.5)

/** Panel min height from the resolved config: arrow + gap + tile + band + chip row + padding/border. */
function panelMin(d) { return ARROW_ROW + 4 + d.tile + BAND + d.pillH + PAD_BORDER; }

/**
 * The page's 6 ordinals under the resolved rule, paired per strip so the two
 * chips of a strip differ in k. Bounded rejection sampling on the seeded rng
 * (throws after 500 draws — unreachable for the shipped configs, a guard for
 * a face that tightens the rule).
 */
function pageOrdinals(rng, d) {
  const total = d.strips * d.chips;
  const vals = [];
  for (let k = 1; k <= d.kMax; k++) vals.push(k);
  for (let attempt = 0; attempt < 500; attempt++) {
    let ks;
    if (d.distinct) {
      if (total > d.kMax) throw new Error(`K-320: ${total} distinct ordinals cannot come from 1..${d.kMax}`);
      const must = (d.mustInclude || []).slice();
      const rest = vals.filter((k) => !must.includes(k));
      ks = rng.shuffle(must.concat(rng.sample(rest, total - must.length)));
    } else {
      ks = [];
      for (let i = 0; i < total; i++) ks.push(rng.int(1, d.kMax));
    }
    // rule checks (also the ones distinct sampling already guarantees — one predicate, no trust)
    const count = {};
    for (const k of ks) count[k] = (count[k] || 0) + 1;
    if (d.distinct && Object.values(count).some((c) => c > 1)) continue;
    if (d.maxRepeat && Object.values(count).some((c) => c > d.maxRepeat)) continue;
    if ((d.mustInclude || []).some((k) => !count[k])) continue;
    if (d.anyOf && !d.anyOf.some((k) => count[k])) continue;
    // pair per strip: the two chips of a strip differ in k
    const strips = [];
    let ok = true;
    for (let s = 0; s < d.strips; s++) {
      const pair = ks.slice(s * d.chips, (s + 1) * d.chips).sort((a, b) => a - b);
      if (new Set(pair).size !== pair.length) { ok = false; break; }
      strips.push(pair);
    }
    if (!ok) continue;
    return strips;
  }
  throw new Error('K-320: no page ordinal set satisfies the rule ' + JSON.stringify({ kMax: d.kMax, distinct: d.distinct, mustInclude: d.mustInclude, anyOf: d.anyOf, maxRepeat: d.maxRepeat }));
}

/** Per-strip start side under the `start` config: left | right | mixed (>= 1 of each per page). */
function startSides(rng, d) {
  if (d.start === 'left' || d.start === 'right') return Array.from({ length: d.strips }, () => d.start);
  if (d.start !== 'mixed') throw new Error('K-320: unknown start ' + d.start);
  if (d.strips < 2) throw new Error('K-320: start:mixed needs >= 2 strips');
  for (let attempt = 0; attempt < 200; attempt++) {
    const sides = Array.from({ length: d.strips }, () => (rng.next() < 0.5 ? 'left' : 'right'));
    if (sides.includes('left') && sides.includes('right')) return sides;
  }
  throw new Error('K-320: start:mixed could not seat both sides');
}

module.exports = {
  id: 'K-320',
  slug: 'ordinal-numbers',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'ordinal-numbers',
  themeAxis: { applicable: true, minNouns: 10, excludeBw: true },
  difficulty: {
    1: { strips: 3, n: 5, tile: 100, pic: 84, gap: 12, chips: 2, kMax: 5, distinct: false, maxRepeat: 2, mustInclude: [1, 5], anyOf: null, actions: ['circle', 'cross'], chipPx: 30, pillH: 48, start: 'left', flagScale: 1.5 },
    2: { strips: 3, n: 7, tile: 84, pic: 72, gap: 8, chips: 2, kMax: 7, distinct: true, maxRepeat: 1, mustInclude: [1], anyOf: [6, 7], actions: ['circle', 'cross'], chipPx: 30, pillH: 44, start: 'left', flagScale: 1.5 },
    3: { strips: 3, n: 8, tile: 76, pic: 64, gap: 5, chips: 2, kMax: 8, distinct: true, maxRepeat: 1, mustInclude: [1, 8], anyOf: null, actions: ['circle', 'cross', 'tick'], chipPx: 28, pillH: 44, start: 'left', flagScale: 1.5 },
  },
  i18n: {
    en: {
      title: 'Ordinal Numbers: Find the Place',
      instruction: 'Start at the flag. Count to the number of each chip and make the mark it shows.',
    },
  },

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d, { theme, locale }, ctx) {
    if (!d) throw new Error('K-320: no difficulty config');
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!theme) throw new Error('K-320: a theme is required (themed type)');
    if (BW_MARK.test(theme)) throw new Error(`K-320: theme "${theme}" is a B&W theme — the base excludes BW art (refused)`);
    if (d.kMax > d.n) throw new Error(`K-320: kMax ${d.kMax} > n ${d.n}`);
    const stripW = d.n * d.tile + (d.n - 1) * d.gap;
    if (stripW > LANE_INNER) throw new Error(`K-320: strip ${stripW} > lane inner ${LANE_INNER}`);
    if (d.actions.length < d.chips) throw new Error('K-320: fewer actions than chips per strip');
    const notation = (k) => {
      const s = ordinalFor(loc, k);   // throws outside 1..10 / missing locale (refusal)
      if (bankLoc.notation[k] !== s) throw new Error('K-320: bank/ordinalFor disagree at ' + k);
      return s;
    };

    const pool = entriesFor(theme, loc);
    const ks = pageOrdinals(rng, d);
    const sides = startSides(rng, d);
    const minH = panelMin(d);
    const panels = [];
    const meta = { strips: [] };
    for (let s = 0; s < d.strips; s++) {
      const items = sampleEntries(rng, pool, d.n, `K-320 ${theme}/${loc} strip ${s + 1}`);
      const seen = new Set();
      for (const it of items) { if (seen.has(it.noun)) throw new Error('K-320: duplicate noun in a strip: ' + it.noun); seen.add(it.noun); }
      const start = sides[s];
      const actions = rng.sample(d.actions, d.chips);
      const chips = ks[s].map((k, i) => {
        if (!(k >= 1 && k <= d.n)) throw new Error(`K-320: ordinal ${k} outside 1..${d.n}`);
        const target = start === 'left' ? k - 1 : d.n - k;
        return { k, action: actions[i], target, notation: notation(k) };
      });
      const targets = new Set(chips.map((c) => c.target));
      if (targets.size !== chips.length) throw new Error('K-320: two chips on one tile');
      const strip = lineUpStrip({ theme, items, tile: d.tile, pic: d.pic, gap: d.gap, start, flagScale: d.flagScale || 1.5, under: 'band' });
      const chipRow = `<div data-lcs-chips style="display:flex;gap:24px;align-items:center;justify-content:center;height:${d.pillH}px">` +
        chips.map((c) => ordinalChip({
          k: c.k, notation: c.notation, px: d.chipPx, icon: c.action, h: d.pillH,
          attrs: `data-lcs-chip data-lcs-ordinal="${c.k}" data-lcs-action="${c.action}" data-lcs-target="${c.target}" data-lcs-notation="${c.notation}"`,
        })).join('') + `</div>`;
      panels.push(lineUpPanel({
        strip: strip.html, below: chipRow, minH,
        attrs: `data-lcs-strip data-lcs-order="${items.map((it) => it.noun).join(',')}" data-lcs-start="${start}" data-lcs-n="${d.n}" data-lcs-chips-n="${d.chips}"`,
      }));
      meta.strips.push({ order: items.map((it) => it.noun), start, chips: chips.map((c) => [c.k, c.action, c.target]) });
    }
    const bodyHtml = `<div data-lcs-ordinal-page data-lcs-theme="${theme}" data-lcs-locale="${loc}" data-lcs-kmax="${d.kMax}" ` +
      `data-lcs-distinct="${d.distinct ? 1 : 0}" data-lcs-maxrep="${d.maxRepeat || 0}" data-lcs-must="${(d.mustInclude || []).join(',')}" ` +
      `data-lcs-anyof="${(d.anyOf || []).join(',')}" data-lcs-actions="${d.actions.join(',')}" data-lcs-startmode="${d.start}" ` +
      `data-lcs-pic="${d.pic}" data-lcs-pillh="${d.pillH}" ` +
      `style="flex:1;display:grid;grid-template-rows:repeat(${d.strips},minmax(${minH}px,1fr));gap:${GRID_GAP}px;min-height:0">` +
      panels.join('') + `</div>`;
    return { bodyHtml, meta };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-ordinal-page]');
      if (!root) return ['no ordinal-numbers root'];
      const kMax = +root.dataset.lcsKmax, distinct = root.dataset.lcsDistinct === '1', maxRep = +root.dataset.lcsMaxrep;
      const must = (root.dataset.lcsMust || '').split(',').filter(Boolean).map(Number);
      const anyOf = (root.dataset.lcsAnyof || '').split(',').filter(Boolean).map(Number);
      const actions = (root.dataset.lcsActions || '').split(',').filter(Boolean);
      const startMode = root.dataset.lcsStartmode;
      const theme = root.dataset.lcsTheme || '';
      const bw = root.dataset.lcsBw === '1';
      if (/(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i.test(theme) && !bw) fails.push(`theme "${theme}" carries a B&W marker without data-lcs-bw`);
      if (!['left', 'right', 'mixed'].includes(startMode)) fails.push('startmode stamp ' + startMode);

      const lanes = [...root.querySelectorAll('[data-ws-content][data-lcs-strip]')];
      if (!lanes.length) fails.push('no line-up strips');
      const allKs = [];
      const sides = new Set();
      lanes.forEach((lane, si) => {
        const S = `strip ${si + 1}`;
        const order = (lane.dataset.lcsOrder || '').split(',').filter(Boolean);
        const n = +lane.dataset.lcsN, start = lane.dataset.lcsStart, chipsN = +lane.dataset.lcsChipsN;
        sides.add(start);
        if (!['left', 'right'].includes(start)) fails.push(`${S}: start stamp "${start}"`);
        if (!(n >= 2) || order.length !== n) fails.push(`${S}: order has ${order.length} nouns, n=${n}`);
        if (new Set(order).size !== order.length) fails.push(`${S}: a noun repeats in the line-up`);
        const arrow = lane.querySelector('[data-lcs-arrow]');
        if (!arrow) fails.push(`${S}: no start arrow`);
        else if (arrow.dataset.lcsArrow !== start) fails.push(`${S}: arrow drawn ${arrow.dataset.lcsArrow}, strip stamped ${start}`);
        if (!lane.querySelector('[data-lcs-flag]')) fails.push(`${S}: no flag`);
        // tiles: n of them, idx 0..n-1, noun === order[idx], no text / numeral / alt, picture loaded
        const tiles = [...lane.querySelectorAll('[data-lcs-idx]')];
        if (tiles.length !== n) fails.push(`${S}: ${tiles.length} tiles, n=${n}`);
        tiles.forEach((t) => {
          const idx = +t.dataset.lcsIdx;
          if (order[idx] !== t.dataset.lcsNoun) fails.push(`${S}: tile ${idx} noun "${t.dataset.lcsNoun}" != order "${order[idx]}"`);
          if (t.textContent.trim()) fails.push(`${S}: tile ${idx} carries text "${t.textContent.trim().slice(0, 12)}"`);
          if (t.querySelector('text')) fails.push(`${S}: tile ${idx} carries SVG text`);
          const imgs = t.querySelectorAll('img');
          if (imgs.length !== 1) fails.push(`${S}: tile ${idx} has ${imgs.length} pictures`);
          imgs.forEach((img) => {
            if (img.hasAttribute('alt')) fails.push(`${S}: tile ${idx} img carries alt`);
            if (!img.complete || img.naturalWidth === 0) fails.push(`${S}: tile ${idx} picture broken`);
          });
        });
        const ordered = [...tiles].sort((a, b) => +a.dataset.lcsIdx - +b.dataset.lcsIdx);
        for (let i = 1; i < ordered.length; i++) {
          if (ordered[i].getBoundingClientRect().left <= ordered[i - 1].getBoundingClientRect().left) fails.push(`${S}: tile ${i} is not to the right of tile ${i - 1}`);
        }
        // chips: chipsN, each 1<=k<=n, target re-derived, distinct k + action, targets disjoint, ascending k
        const chips = [...lane.querySelectorAll('[data-lcs-chip]')];
        if (chips.length !== chipsN) fails.push(`${S}: ${chips.length} chips, want ${chipsN}`);
        const ksHere = [], acts = new Set(), tg = new Set();
        chips.forEach((c, ci) => {
          const k = +c.dataset.lcsOrdinal, target = +c.dataset.lcsTarget, act = c.dataset.lcsAction, txt = c.dataset.lcsNotation;
          if (!(k >= 1 && k <= n)) fails.push(`${S} chip ${ci + 1}: ordinal ${k} outside 1..${n}`);
          const want = start === 'left' ? k - 1 : n - k;
          if (target !== want) fails.push(`${S} chip ${ci + 1}: target ${target}, formula says ${want} (start ${start}, n ${n}, k ${k})`);
          if (!actions.includes(act)) fails.push(`${S} chip ${ci + 1}: action "${act}" not in the pool ${actions.join('/')}`);
          if (act === 'colour' && !bw) fails.push(`${S} chip ${ci + 1}: colour mark on colour art`);
          if (acts.has(act)) fails.push(`${S}: two chips ask the same mark "${act}"`); acts.add(act);
          if (tg.has(target)) fails.push(`${S}: two chips point at tile ${target}`); tg.add(target);
          if (!txt || !txt.includes(String(k))) fails.push(`${S} chip ${ci + 1}: notation "${txt}" does not carry ${k}`);
          const vis = (c.querySelector('[data-lcs-chip-text]') || {}).textContent || '';
          if (vis.trim() !== txt) fails.push(`${S} chip ${ci + 1}: prints "${vis.trim()}", stamped "${txt}"`);
          if (!c.querySelector('[data-lcs-mark]') || c.querySelector('[data-lcs-mark]').dataset.lcsMark !== act) fails.push(`${S} chip ${ci + 1}: icon != action`);
          if (c.closest('[data-lcs-idx]')) fails.push(`${S} chip ${ci + 1}: a chip inside a tile`);
          ksHere.push(k);
        });
        for (let i = 1; i < ksHere.length; i++) if (ksHere[i] <= ksHere[i - 1]) fails.push(`${S}: chips not ascending (${ksHere.join(',')})`);
        allKs.push(...ksHere);
        // no other text in the lane: the chips are the only text
        const walker = document.createTreeWalker(lane, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          const t = node.textContent.trim();
          if (t && !node.parentElement.closest('[data-lcs-chip]')) fails.push(`${S}: stray text "${t.slice(0, 16)}"`);
        }
      });
      // the page rule, re-derived from the stamps
      const count = {};
      for (const k of allKs) count[k] = (count[k] || 0) + 1;
      if (allKs.some((k) => k > kMax)) fails.push(`an ordinal above kMax ${kMax}: ${allKs.join(',')}`);
      if (distinct && Object.values(count).some((c) => c > 1)) fails.push(`page rule: ordinals repeat (${allKs.join(',')})`);
      if (maxRep && Object.values(count).some((c) => c > maxRep)) fails.push(`page rule: an ordinal appears more than ${maxRep}x (${allKs.join(',')})`);
      for (const k of must) if (!count[k]) fails.push(`page rule: ${k} is not asked`);
      if (anyOf.length && !anyOf.some((k) => count[k])) fails.push(`page rule: none of ${anyOf.join('/')} is asked`);
      if (startMode === 'mixed' && !(sides.has('left') && sides.has('right'))) fails.push('start:mixed but not both sides present');
      if ((startMode === 'left' || startMode === 'right') && [...sides].some((s) => s !== startMode)) fails.push(`start:${startMode} but a strip starts elsewhere`);
      return fails;
    });
  },
};
