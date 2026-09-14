/**
 * G3-377 — Division with Remainders: Ring the Groups (nt20-C;
 * `division-with-remainder`, G3, 4.NBT.B.6 begun in Grade 3 / 3.OA.A.2 in
 * prose). Design: docs/worksheet-gen/b3-designs/G3-377-division-with-remainder.md
 * §2/§5.
 *
 * QUOTATIVE division with a LEFTOVER: four wide numbered cards (1 × 4). Each
 * holds a pile of n themed pictures in ROWS OF TEN (ten is neutral — the row
 * count never restates q; the six-px gaps are the pencil lane) and, right of
 * it, the locale's notation with n and d PRINTED and two dashed coral boxes
 * for q and r. The child rings groups of d, counts rings and loose pictures,
 * writes q and r. Every item is n = q·d + r with 0 < r < d — never exact by
 * construction (G3-309 = exact sharing, G2-217 = exact rings, G3-310 =
 * printed hops to zero, G3-370 = stories: the boundary of §0). The pile shows
 * n only: no pre-boxed groups, no rings, no count badge (each would print q).
 *
 * THEMED (§1): nouns = entriesFor(theme, loc) filtered `countable`, minNouns 4,
 * one noun per card; a BW-marked theme and a theme below the floor THROW
 * (refusal). The DIVISOR SET is the unit (`unitAxis`, the README's ONE fan
 * mechanism): '2-5' (exemplar) · '6-9' · '2-9'; it resolves d2's divisors
 * (d1 = [2,3] and d3 = [2..9] are the ladder's own, as designed). build()
 * reads ONLY data/b3/division-with-remainder.js (`exemplar`, `unitLabels`,
 * `notation`, strings); the numbers are code, locale-neutral.
 *
 * Every sign on the sheet is resolved through types/_shared/notation.js
 * (README item 11): the bank's `notation.op` / template glyph is DATA and the
 * build REFUSES when it disagrees with divGlyph(locale) / mulGlyph(locale) —
 * so an sv block carrying `÷` (a historic Swedish minus) can never render.
 *
 * Chrome budget (README ruling): body 722 with a 3-line title + 3-line
 * instruction (the measured worst legal chromes are 733 / 710 / 700 — the
 * gate renders all three). cardGrid rows `minmax(0,1fr)`, gap 14 → card
 * (722 − 42) / 4 = 170 → inner 647 × 142 (padding 12 + border 2); every
 * `.ws-card-stage` carries inline `padding:0` plus a LEFT INSET: 20 px at d2/d3
 * so the 120-px pile's ±4° / ±8° rotated pictures (bounding rects +1.3 / +2.3
 * px) clear the 30-px card badge, which intrudes 15 px into the inner box; 4 px
 * at d1 (the 86-px pile is centred 25+ px below the badge; the 4 px keeps the
 * first rotated picture inside the inner box). d2: pile 10 × 36 + 9 × 6 = 414
 * wide, 3 rows = 120 tall; zone = 647 − 20 − 414 − 14 = 199 (design 219: the
 * fr `(4 × [ ]) + [ ]` line measures 173, the casita draws at min(200, zone) —
 * both measured in the gate). d1: 40-px pictures at gap 5 (design 6), pile 445
 * × 86, zone 184. d3: `iconScatter` in a 414 × 120 stage, 36-px pictures.
 *
 * Answer hiding: ground truth rides on data-lcs-* only (root: cards / layout /
 * divisors / nmin / nmax / minr / op / style / unit; item root: n d q r; the
 * boxes are EMPTY `data-lcs-answer=""` with a role). verify(page) re-derives
 * q = floor(n/d), r = n − q·d from the stamps, asserts 1 ≤ r < d, d in the
 * divisor set, nMin ≤ n ≤ nMax, pile img count === n (every img loaded,
 * ≥ 36 px, never a BW directory), no group/ring stamps, the two boxes q then r
 * empty, no text node equal to q or r (unless it is also n or d), data-lcs-num
 * = {n, d} only, the division sign === the root stamp, sv: no ÷ anywhere in
 * the body text, (n, d) distinct across cards, items === cards, the notation
 * zone not overflowing. Guards key on the RESOLVED config (`d.layout /
 * d.divisors / d.nMax / d.iconPx …`), never on the level index.
 */
'use strict';
const { entriesFor, countable, sampleEntries } = require('../../lib/b2-common.js');
const { bank: loadBank } = require('../../lib/b3-common.js');
const { iconRows, iconScatter } = require('../../templates/components.js');
const { divisionLine } = require('../../templates/components-b3.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { divGlyph } = require('../_shared/notation.js');

const BANK = 'division-with-remainder';
const CARD_INNER_W = 647;      // 675 − 2 × (12 + 2)
const CARD_INNER_H_700 = 136;  // (700 − 42) / 4 − 28: the deepest legal chrome (a 4-line title)
const GAP = 14;                // pile ↔ zone
const ZONE_H = 88;
const ZONE_MIN = { inline: 176, casita: 170 };   // inline: the widest measured line-2 (fr `(4 × [ ]) + [ ]` = 173) + 3; casita: the narrowest frame casitaFrame draws
const CASITA_W = 200;                             // the design's casita width; a narrower zone draws a proportionally narrower frame (>= 170)
const ELEMENT_FLOOR = 36;      // G23 minElement (_tokens.js density.G23)
const PAGE_ATTEMPTS = 300;
const ITEM_TRIES = 200;
const UNITS = ['2-5', '6-9', '2-9'];   // the divisor sets (design §1); anything else is refused
const UNIT_RE = /^([2-9])-([2-9])$/;
const BW_MARK = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;   // the localized B&W theme marker (§20.5)

/** '2-5' → [2,3,4,5]; throws on anything outside UNITS (refusal, never a default). */
function divisorsOf(unit) {
  const m = UNIT_RE.exec(String(unit));
  if (!UNITS.includes(String(unit)) || !m || +m[1] >= +m[2]) throw new Error(`G3-377: unknown unit "${unit}" (one of ${UNITS.join(' | ')})`);
  const out = [];
  for (let d = +m[1]; d <= +m[2]; d++) out.push(d);
  return out;
}

/**
 * One item under the resolved rule (design §5 pickItem): draw d, then q in
 * max(1, ceil((nMin − d + 1)/d)) .. min(qMax, floor((nMax − 1)/d)), then r in
 * minR .. min(d − 1, nMax − q·d), n = q·d + r; a duplicate (n, d) is rejected;
 * 200 tries then THROW (refusal, never padding).
 */
function pickItem(rng, cfg, used) {
  const { divisors, nMin, nMax, minR } = cfg;
  const qMax = cfg.qMax == null ? Infinity : cfg.qMax;
  for (let t = 0; t < ITEM_TRIES; t++) {
    const d = rng.pick(divisors);
    const qLo = Math.max(1, Math.ceil((nMin - d + 1) / d));
    const qHi = Math.min(qMax, Math.floor((nMax - 1) / d));
    if (qHi < qLo) continue;
    const q = rng.int(qLo, qHi);
    const rHi = Math.min(d - 1, nMax - q * d);
    if (rHi < minR) continue;
    const r = rng.int(minR, rHi);
    const n = q * d + r;
    if (n < nMin || n > nMax) continue;
    const key = n + 'x' + d;
    if (used.has(key)) continue;
    used.add(key);
    return { n, d, q, r };
  }
  throw new Error(`G3-377: no item satisfies ${JSON.stringify({ divisors, nMin, nMax, qMax: cfg.qMax, minR })} after ${ITEM_TRIES} tries (refusal)`);
}

/** A page of `cards` items under the page rules; retried whole, thrown after PAGE_ATTEMPTS. */
function pickPage(rng, cfg) {
  for (let attempt = 0; attempt < PAGE_ATTEMPTS; attempt++) {
    const used = new Set();
    let items;
    try { items = Array.from({ length: cfg.cards }, () => pickItem(rng, cfg, used)); } catch (e) { continue; }
    const ds = new Set(items.map((x) => x.d));
    if (ds.size < Math.min(cfg.minDistinctD, cfg.divisors.length)) continue;
    if (items.filter((x) => x.q >= 2).length < cfg.minQ2Cards) continue;
    if (cfg.rVaries && new Set(items.map((x) => x.r)).size < 2) continue;
    if (cfg.distinctN && new Set(items.map((x) => x.n)).size < items.length) continue;
    return items;
  }
  throw new Error(`G3-377: no page satisfies the rules ${JSON.stringify({ cards: cfg.cards, divisors: cfg.divisors, nMin: cfg.nMin, nMax: cfg.nMax, minDistinctD: cfg.minDistinctD, minQ2Cards: cfg.minQ2Cards, rVaries: cfg.rVaries, distinctN: cfg.distinctN })} (refusal)`);
}

/** The pile: rows of ten (left-aligned, so a partial last row starts at the left like a real pile) or a scatter stage. */
function pileHtml({ layout, theme, noun, n, iconPx, perRow, gapX, gapY, w, h, rng }) {
  if (layout === 'rows') {
    const needle = `class="ws-icon-rows" style="gap:${gapY}px"`;
    const rows = iconRows({ theme, noun, n, iconPx, perRow, rng, gapX, gapY });
    if (!rows.includes(needle)) throw new Error('G3-377: iconRows output changed shape (the rows container needle is absent)');
    return `<div data-lcs-pile style="width:${w}px;flex:0 0 ${w}px;display:flex;justify-content:flex-start">` +
      rows.replace(needle, `class="ws-icon-rows" style="gap:${gapY}px;align-items:flex-start"`) + `</div>`;
  }
  if (layout === 'scatter') {
    return `<div data-lcs-pile style="width:${w}px;height:${h}px;flex:0 0 ${w}px">` + iconScatter({ theme, noun, n, w, h, iconPx, rng }) + `</div>`;
  }
  throw new Error('G3-377: unknown layout ' + layout);
}

module.exports = {
  id: 'G3-377',
  UNITS,
  divisorsOf,
  slug: 'division-with-remainder',
  gradeBand: 'G3',
  assetClass: 'icon-placement',
  exerciseType: 'division-with-remainder',
  themeAxis: { applicable: true, minNouns: 4, excludeBw: true },
  unitAxis: {
    applicable: true,
    units: () => UNITS.slice(),
    exemplar: (loc) => loadBank(BANK, loc).exemplar,
    tokens: (unit, loc) => {
      const labels = loadBank(BANK, loc).unitLabels || {};
      const u = labels[unit] || String(unit);
      return { U: u.charAt(0).toLocaleUpperCase(loc) + u.slice(1), L: u.toLocaleLowerCase(loc), UNIT: String(unit) };
    },
  },
  difficulty: {
    // divisors:'unit' resolves to the wave unit (exemplar 2-5); d1 / d3 carry the ladder's own sets (design §2).
    1: { layout: 'rows', cards: 4, divisors: [2, 3], nMin: 5, nMax: 15, qMax: null, minR: 1, iconPx: 40, perRow: 10, gapX: 5, gapY: 6, inset: 4, minDistinctD: 2, minQ2Cards: 0, rVaries: false, distinctN: true },
    2: { layout: 'rows', cards: 4, divisors: 'unit', nMin: 7, nMax: 30, qMax: null, minR: 1, iconPx: 36, perRow: 10, gapX: 6, gapY: 6, inset: 20, minDistinctD: 3, minQ2Cards: 3, rVaries: true, distinctN: true },
    3: { layout: 'scatter', cards: 4, divisors: [2, 3, 4, 5, 6, 7, 8, 9], nMin: 11, nMax: 30, qMax: null, minR: 1, iconPx: 36, perRow: 10, gapX: 6, gapY: 6, inset: 20, minDistinctD: 3, minQ2Cards: 3, rVaries: true, distinctN: true },
  },
  i18n: {
    en: {
      title: 'Division with Remainders: Ring the Groups',
      instruction: 'Ring groups of the second number in each pile. Write how many groups you made and how many pictures are left over.',
    },
  },

  build({ theme, difficulty, locale, unit }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { theme, locale: loc, unit }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bankLoc, d0, { theme, locale, unit }, ctx) {
    if (!d0) throw new Error('G3-377: no difficulty config');
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!bankLoc || !bankLoc.notation) throw new Error(`G3-377: the ${loc} bank block has no notation (refuse)`);
    const N = bankLoc.notation;
    const u = unit || bankLoc.exemplar;
    const unitDivisors = divisorsOf(u);
    const d = Object.assign({}, d0, { divisors: d0.divisors === 'unit' ? unitDivisors : d0.divisors });
    // --- guards on the RESOLVED config
    if (!theme) throw new Error('G3-377: a theme is required (themed type)');
    if (BW_MARK.test(theme)) throw new Error(`G3-377: theme "${theme}" is a B&W theme — the base excludes BW art (refused)`);
    if (!Array.isArray(d.divisors) || !d.divisors.length) throw new Error('G3-377: no divisors');
    for (const x of d.divisors) if (!(Number.isInteger(x) && x >= 2 && x <= 9)) throw new Error('G3-377: divisor outside 2..9: ' + x);
    if (!(d.minR >= 1)) throw new Error('G3-377: minR must be >= 1 on this type (a remainder of 0 is F3\'s decision, never the base)');
    if (d.nMin < Math.min(...d.divisors) + 1) throw new Error(`G3-377: nMin ${d.nMin} leaves no remainder for d = ${Math.min(...d.divisors)}`);
    if (d.iconPx < ELEMENT_FLOOR) throw new Error(`G3-377: iconPx ${d.iconPx} < the G23 element floor ${ELEMENT_FLOOR}`);
    if (!(d.cards >= 1)) throw new Error('G3-377: cards must be >= 1');
    const op = divGlyph(loc);
    if (N.op !== null && N.op !== undefined && N.op !== op) throw new Error(`G3-377: the ${loc} bank prints "${N.op}" but the ${loc} division sign is "${op}" (types/_shared/notation.js) — refuse`);
    if (N.boxStyle !== 'inline' && N.boxStyle !== 'casita') throw new Error(`G3-377: boxStyle "${N.boxStyle}" is not inline | casita`);
    // pile geometry
    const maxRows = Math.ceil(d.nMax / d.perRow);
    if (d.nMax > d.perRow * 3) throw new Error(`G3-377: nMax ${d.nMax} needs more than 3 rows of ${d.perRow}`);
    const pileW = d.perRow * d.iconPx + (d.perRow - 1) * d.gapX;
    const pileH = maxRows * d.iconPx + (maxRows - 1) * d.gapY;
    if (pileH > CARD_INNER_H_700) throw new Error(`G3-377: pile ${pileH} tall > the card inner ${CARD_INNER_H_700} under the deepest legal chrome`);
    const zoneW = CARD_INNER_W - d.inset - pileW - GAP;
    if (zoneW < ZONE_MIN[N.boxStyle]) throw new Error(`G3-377: notation zone ${zoneW} < ${ZONE_MIN[N.boxStyle]} (${N.boxStyle}) — the pile leaves no room for the notation`);

    // --- nouns: one countable noun per card, distinct, from the wave theme (refuse below the floor)
    const pool = entriesFor(theme, loc).filter(countable);
    if (pool.length < this.themeAxis.minNouns) throw new Error(`G3-377: theme "${theme}" has ${pool.length} countable nouns in ${loc}, need ${this.themeAxis.minNouns} (refused)`);
    const nouns = sampleEntries(rng, pool, d.cards, 'G3-377');

    // --- numbers
    const items = pickPage(rng, d);

    const cards = items.map((it, i) => {
      const noun = nouns[i];
      const pile = pileHtml({ layout: d.layout, theme, noun: noun.noun, n: it.n, iconPx: d.iconPx, perRow: d.perRow, gapX: d.gapX, gapY: d.gapY, w: pileW, h: pileH, rng });
      const zone = divisionLine({ template: N.template, n: it.n, d: it.d, locale: loc, boxStyle: N.boxStyle, remWord: N.remWord || '', lines: N.boxStyle === 'inline' ? 2 : 1, w: zoneW, casitaW: Math.min(CASITA_W, zoneW) });
      return `<div class="ws-card-stage" data-ws-content data-lcs-item="${i + 1}" data-lcs-n="${it.n}" data-lcs-d="${it.d}" data-lcs-q="${it.q}" data-lcs-r="${it.r}" data-lcs-noun="${noun.vocabKey}" ` +
        `style="padding:0 0 0 ${d.inset}px;display:flex;align-items:center;justify-content:space-between;gap:${GAP}px;min-width:0">${pile}${zone}</div>`;
    });
    const bodyHtml = `<div data-ws-content data-lcs-dwr data-lcs-cards="${d.cards}" data-lcs-layout="${d.layout}" data-lcs-divisors="${d.divisors.join(',')}" ` +
      `data-lcs-nmin="${d.nMin}" data-lcs-nmax="${d.nMax}" data-lcs-minr="${d.minR}" data-lcs-iconpx="${d.iconPx}" data-lcs-op="${op}" data-lcs-style="${N.boxStyle}" ` +
      `data-lcs-distinctn="${d.distinctN ? 1 : 0}" data-lcs-unit="${u}" data-lcs-locale="${loc}" data-lcs-theme="${theme}" data-lcs-zonew="${zoneW}" data-lcs-pilew="${pileW}" ` +
      `style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">` +
      cardGrid({ cards, cols: 1, rows: d.cards, numbered: true }) +
      `</div>`;
    const meta = { theme, unit: u, divisors: d.divisors, layout: d.layout, op, boxStyle: N.boxStyle, items: items.map((it, i) => ({ ...it, noun: nouns[i].vocabKey })) };
    return { bodyHtml, meta };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-dwr]');
      if (!root) return ['no division-with-remainder root'];
      const cards = +root.dataset.lcsCards, layout = root.dataset.lcsLayout, nMin = +root.dataset.lcsNmin, nMax = +root.dataset.lcsNmax, minR = +root.dataset.lcsMinr;
      const divisors = (root.dataset.lcsDivisors || '').split(',').map(Number).filter((x) => x > 0);
      const op = root.dataset.lcsOp, style = root.dataset.lcsStyle, loc = root.dataset.lcsLocale, iconPx = +root.dataset.lcsIconpx;
      if (!divisors.length) fails.push('no divisor set stamped');
      if (!(minR >= 1)) fails.push(`minR ${minR} < 1: a remainder of 0 is possible (exact division is not this type)`);
      if (!['rows', 'scatter'].includes(layout)) fails.push('layout stamp ' + layout);
      if (!['÷', ':', '/'].includes(op)) fails.push('op stamp ' + op);
      if (loc === 'sv' && op !== '/') fails.push('sv division sign is "' + op + '", must be "/"');
      const bwDir = /(^|\/)[^/]*\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)\/[^/]+$/i;
      const items = [...root.querySelectorAll('[data-lcs-item]')];
      if (items.length !== cards) fails.push(`items: ${items.length}, want ${cards}`);
      if (!items.length) fails.push('non-vacuity: 0 items');
      const seen = new Map();
      const seenN = new Map();
      const distinctN = root.dataset.lcsDistinctn === '1';
      items.forEach((it, i) => {
        const P = `item ${i + 1}`;
        const n = +it.dataset.lcsN, d = +it.dataset.lcsD, q = +it.dataset.lcsQ, r = +it.dataset.lcsR;
        if (![n, d, q, r].every(Number.isInteger)) { fails.push(`${P}: non-integer stamps`); return; }
        const wantQ = Math.floor(n / d), wantR = n - wantQ * d;
        if (q !== wantQ) fails.push(`${P}: q ${q} != floor(${n}/${d}) = ${wantQ}`);
        if (r !== wantR) fails.push(`${P}: r ${r} != ${n} - ${wantQ}*${d} = ${wantR}`);
        if (q * d + r !== n) fails.push(`${P}: q*d + r = ${q * d + r} != n ${n}`);
        if (!(r >= 1)) fails.push(`${P}: remainder ${r} < 1 (exact division)`);
        if (!(r < d)) fails.push(`${P}: remainder ${r} >= divisor ${d} (remainder too big)`);
        if (r < minR) fails.push(`${P}: r ${r} < minR ${minR}`);
        if (!divisors.includes(d)) fails.push(`${P}: divisor ${d} not in the unit set [${divisors.join(',')}]`);
        if (n > nMax) fails.push(`${P}: n ${n} above nMax ${nMax}`);
        if (n < nMin) fails.push(`${P}: n ${n} below nMin ${nMin}`);
        const key = n + 'x' + d;
        if (seen.has(key)) fails.push(`${P}: (${n}, ${d}) repeats item ${seen.get(key)} (duplicate item)`);
        else seen.set(key, i + 1);
        if (distinctN) { if (seenN.has(n)) fails.push(`${P}: n ${n} repeats item ${seenN.get(n)} (distinct-n rule)`); else seenN.set(n, i + 1); }
        // pile
        const piles = it.querySelectorAll('[data-lcs-pile]');
        if (piles.length !== 1) fails.push(`${P}: ${piles.length} piles`);
        const imgs = [...it.querySelectorAll('[data-lcs-pile] img')];
        if (imgs.length !== n) fails.push(`${P}: pile shows ${imgs.length} pictures, n is ${n}`);
        imgs.forEach((img, k) => {
          if (!img.complete || img.naturalWidth === 0) fails.push(`${P}: picture ${k + 1} not loaded`);
          const b = img.getBoundingClientRect();
          if (b.width < 36 - 0.6 || b.height < 36 - 0.6) fails.push(`${P}: picture ${k + 1} ${b.width.toFixed(1)}x${b.height.toFixed(1)} < 36 (G23 floor)`);
          if (iconPx && parseFloat(img.style.width) < iconPx - 0.6) fails.push(`${P}: picture ${k + 1} styled ${img.style.width}, config ${iconPx}`);
          let src = img.getAttribute('src') || '';
          try { src = decodeURIComponent(src); } catch (e) { /* keep raw */ }
          if (bwDir.test(src)) fails.push(`${P}: picture ${k + 1} comes from a B&W theme directory`);
          if (img.getAttribute('alt')) fails.push(`${P}: a pile picture carries alt text`);
        });
        if (imgs.length !== it.querySelectorAll('img').length) fails.push(`${P}: a picture outside the pile`);
        if ((layout === 'rows' || layout === 'scatter') && it.querySelector('[data-lcs-group],[data-lcs-ring],[data-lcs-slot],[data-lcs-leftover]')) fails.push(`${P}: a group / ring / slot on a ${layout} pile (pre-boxed pile)`);
        // notation zone
        const zones = it.querySelectorAll('[data-lcs-notation]');
        if (zones.length !== 1) fails.push(`${P}: ${zones.length} notation zones`);
        zones.forEach((z) => {
          if (z.dataset.lcsStyle !== style) fails.push(`${P}: zone style ${z.dataset.lcsStyle} != page ${style}`);
          if (z.scrollWidth > z.clientWidth + 0.6) fails.push(`${P}: notation zone overflows (${z.scrollWidth} > ${z.clientWidth})`);
          const zb = z.getBoundingClientRect();
          const card = it.closest('.ws-card');
          if (card) { const cb = card.getBoundingClientRect(); if (zb.right > cb.right - 13.4 || zb.left < cb.left + 13.4 || zb.top < cb.top + 13.4 || zb.bottom > cb.bottom - 13.4) fails.push(`${P}: notation zone outside the card inner box`); }
        });
        const nums = [...it.querySelectorAll('[data-lcs-num]')];
        if (nums.length !== 2) fails.push(`${P}: ${nums.length} printed numerals, want n and d only`);
        const numVals = nums.map((e) => +e.dataset.lcsNum).sort((a, b) => a - b);
        const want = [n, d].sort((a, b) => a - b);
        if (numVals.join(',') !== want.join(',')) fails.push(`${P}: printed numerals [${numVals}] != [${want}] (n and d only)`);
        nums.forEach((e) => { if (e.textContent.trim() !== e.dataset.lcsNum) fails.push(`${P}: numeral prints "${e.textContent.trim()}", stamps ${e.dataset.lcsNum}`); });
        // the division sign on the page === the root stamp; sv never ÷
        it.querySelectorAll('[data-lcs-op]').forEach((e) => {
          const g = e.textContent.trim();
          if (['÷', ':', '/'].includes(g) && g !== op) fails.push(`${P}: prints the sign "${g}", the page sign is "${op}"`);
        });
        // boxes: exactly two, q then r, EMPTY
        const boxes = [...it.querySelectorAll('[data-lcs-answer]')];
        if (boxes.length !== 2) fails.push(`${P}: ${boxes.length} answer boxes, want q then r`);
        else {
          if (boxes[0].dataset.lcsRole !== 'q' || boxes[1].dataset.lcsRole !== 'r') fails.push(`${P}: boxes are ${boxes[0].dataset.lcsRole}, ${boxes[1].dataset.lcsRole}; want q then r`);
        }
        boxes.forEach((b) => {
          if ((b.textContent || '').trim()) fails.push(`${P}: an answer box carries text "${b.textContent.trim()}" (answer printed)`);
          if (b.dataset.lcsAnswer) fails.push(`${P}: an answer box stamps a value "${b.dataset.lcsAnswer}" (the truth lives on the item root)`);
          const bb = b.getBoundingClientRect();
          if (bb.width < 36 - 0.6 || bb.height < 30 - 0.6) fails.push(`${P}: answer box ${bb.width.toFixed(0)}x${bb.height.toFixed(0)} too small`);
        });
        if (it.querySelector('[data-lcs-shown-q],[data-lcs-shown-r]')) fails.push(`${P}: a shown pair on the base (F4 only)`);
        // no text node equals q or r unless it is also n or d
        const walker = document.createTreeWalker(it, NodeFilter.SHOW_TEXT);
        const okNums = new Set([String(n), String(d)]);
        let node;
        while ((node = walker.nextNode())) {
          const t = node.textContent.trim();
          if (!t) continue;
          if ((t === String(q) || t === String(r)) && !okNums.has(t)) fails.push(`${P}: text "${t}" equals the ${t === String(q) ? 'quotient' : 'remainder'} (answer printed)`);
          if (loc === 'sv' && t.includes('÷')) fails.push(`${P}: sv text "${t}" contains ÷ (historic minus)`);
        }
      });
      // sv: nowhere on the body
      if (loc === 'sv' && (document.body.textContent || '').includes('÷')) fails.push('sv page contains ÷ (historic minus)');
      // no ground truth outside an item
      root.querySelectorAll('[data-lcs-answer],[data-lcs-num]').forEach((el) => { if (!el.closest('[data-lcs-item]')) fails.push('ground truth outside an item'); });
      return fails;
    });
  },
};
