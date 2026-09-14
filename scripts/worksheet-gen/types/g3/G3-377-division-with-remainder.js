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
 *
 * Phase-2 faces (2026-09-14; design §3): the additive `mode` knob — 'share'
 * (G3-380) · 'practice' (G3-381) · 'exact' (G3-382) · 'error' (G3-383) · 'line'
 * (G3-384) — dispatched by _buildWith BEFORE the base path and by verify() on
 * the `data-lcs-mode` stamp a face alone writes; see the block below.
 */
'use strict';
const { entriesFor, countable, sampleEntries } = require('../../lib/b2-common.js');
const { bank: loadBank } = require('../../lib/b3-common.js');
const { iconRows, iconScatter } = require('../../templates/components.js');
const { divisionLine, dealBoxes } = require('../../templates/components-b3.js');
const { pillChoice } = require('../../templates/components-b2.js');
const numberLine = require('../../primitives/number-line.js');
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

/* ================================================================== Phase-2 faces (the `mode` knob, 2026-09-14)
 * Five CODE faces (design §3), each an additive `mode` on the resolved config, dispatched by
 * _buildWith BEFORE the base path (a config without `mode` is byte-identical — tools/b3-baseline.js)
 * and by verify() on the `data-lcs-mode` stamp a face alone writes. Every face takes `divisors`
 * from the unit (the rows spread the base's d2, `divisors:'unit'`); every sign is divGlyph(loc).
 *
 *   share    G3-380  PARTITIVE: a 2-row strip of n pictures (396 wide, 36 px, gap 4) over a
 *                    dealBoxes row (d homes + one dashed leftover home carrying the bank's
 *                    leftoverLabel); the child tallies one picture into each home in turn, the
 *                    loose ones into the leftover home, writes q (each home) and r. THEMED.
 *   practice G3-381  FLUENCY: 2 × 5 cards, one divisionLine({lines:1}) each; ten items inside
 *                    the tables (q <= qMax), every one with a remainder. THEMELESS.
 *   exact    G3-382  DECISION: 2 × 4 cards, a line (r = 0 allowed) over two pills (exactWord /
 *                    restWord, glyph-free, fixed order); half the items exact; the child circles a
 *                    pill and writes q and r (0 when exact). THEMELESS. Refused where the bank
 *                    carries no exactWord + restWord.
 *   error    G3-383  CHECK r < d: 2 × 4 cards, a WORKED line with a wrong pair printed in coral
 *                    solid boxes (`data-lcs-shown-q/-r`) over a ghost line whose two open boxes sit
 *                    exactly under them; rBig (q − 1, r + d: the remainder too big) and sum (r < d
 *                    but q·d + r off by 1..2); the child crosses the wrong pair out and writes the
 *                    right one. THEMELESS. The wrong pair is the ONLY text allowed to equal q or r.
 *   line     G3-384  MEASUREMENT as motion: 1 × 3 cards, a 0..lineEnd number line (560 wide,
 *                    ticks 1, labels 5, a teal mark at n, NO printed hops) with a 20-px air lane
 *                    above it, over divisionLine({lines:1}); lineEnd = the smallest multiple of 5
 *                    >= n + d (<= lineMax) and d · 560 / lineEnd >= 36 (a hand-drawn hop clears
 *                    the G23 element floor). THEMELESS.
 *
 * `_buildWith(bank, cfg, {theme, locale, unit, items}, ctx)`: `items` (faces only) injects
 * pre-composed items the face DRAWS as asked — the gate's poison seam; verify enforces the rules.
 */
const FACE_MODES = new Set(['share', 'practice', 'exact', 'error', 'line']);
const THEMELESS = new Set(['practice', 'exact', 'error', 'line']);
const FACE_GRID = { share: { cols: 1 }, practice: { cols: 2 }, exact: { cols: 2 }, error: { cols: 2 }, line: { cols: 1 } };
const CARD_INNER_H_DEEP = { 1: 130.75, 2: 130.75, 3: 188.3, 4: 130.75, 5: 96.2 };   // (677 − gaps)/rows − 28 per row count (the DEEP chrome, a 4-line title + 3-line instruction)
const LINE_PAD_X = 26;   // primitives/number-line.js padX (the SVG is width + 52)
const LINE_H = 70;       // its height with marks only (arcH 14 + 56)
const CASITA_OPEN_H = 88;

function faceGuards(N, d, loc, theme) {
  if (!FACE_MODES.has(d.mode)) throw new Error('G3-377: unknown mode ' + d.mode);
  if (THEMELESS.has(d.mode)) { if (theme) throw new Error(`G3-377 ${d.mode}: a themeless face takes no theme (a picture on a numbers row reads as a clue) — refuse "${theme}"`); }
  else {
    if (!theme) throw new Error('G3-377 share: a theme is required (themed face)');
    if (BW_MARK.test(theme)) throw new Error(`G3-377 share: theme "${theme}" is a B&W theme — refused`);
  }
  if (!Array.isArray(d.divisors) || !d.divisors.length) throw new Error('G3-377: no divisors');
  for (const x of d.divisors) if (!(Number.isInteger(x) && x >= 2 && x <= 9)) throw new Error('G3-377: divisor outside 2..9: ' + x);
  if (!(d.cards >= 1)) throw new Error('G3-377: cards must be >= 1');
  const op = divGlyph(loc);
  if (N.op !== null && N.op !== undefined && N.op !== op) throw new Error(`G3-377: the ${loc} bank prints "${N.op}" but the ${loc} division sign is "${op}" (types/_shared/notation.js) — refuse`);
  if (N.boxStyle !== 'inline' && N.boxStyle !== 'casita') throw new Error(`G3-377: boxStyle "${N.boxStyle}" is not inline | casita`);
  const wantMinR = d.mode === 'exact' ? 0 : 1;
  if (!(d.minR >= wantMinR)) throw new Error(`G3-377 ${d.mode}: minR must be >= ${wantMinR}`);
  if (d.mode !== 'exact' && !(d.minR >= 1)) throw new Error('G3-377: minR must be >= 1 (a remainder of 0 is F3\'s decision)');
  const rows = Math.ceil(d.cards / FACE_GRID[d.mode].cols);
  if (!(rows >= 1 && rows <= 5)) throw new Error(`G3-377 ${d.mode}: ${rows} card rows (1..5)`);
  return { op, rows, innerH: CARD_INNER_H_DEEP[rows] };
}

/** An exact item (r = 0) for the decision face. */
function pickExact(rng, cfg, used) {
  const { divisors, nMin, nMax } = cfg;
  const qMax = cfg.qMax == null ? Infinity : cfg.qMax;
  for (let t = 0; t < ITEM_TRIES; t++) {
    const d = rng.pick(divisors);
    const qLo = Math.max(1, Math.ceil(nMin / d)), qHi = Math.min(qMax, Math.floor(nMax / d));
    if (qHi < qLo) continue;
    const q = rng.int(qLo, qHi);
    const n = q * d;
    const key = n + 'x' + d;
    if (used.has(key)) continue;
    used.add(key);
    return { n, d, q, r: 0 };
  }
  throw new Error(`G3-377 exact: no exact item satisfies ${JSON.stringify({ divisors, nMin, nMax, qMax: cfg.qMax })} (refusal)`);
}

/** Page-level rules shared by the numeric faces (each d at most maxPerD times; the base rules). */
function pageRulesOk(items, cfg) {
  const ds = new Set(items.map((x) => x.d));
  if (ds.size < Math.min(cfg.minDistinctD || 1, cfg.divisors.length)) return false;
  if ((cfg.minQ2Cards || 0) > 0 && items.filter((x) => x.q >= 2).length < cfg.minQ2Cards) return false;
  if (cfg.rVaries && new Set(items.map((x) => x.r)).size < 2) return false;
  if (cfg.distinctN && new Set(items.map((x) => x.n)).size < items.length) return false;
  if (cfg.maxPerD) { const c = {}; for (const x of items) { c[x.d] = (c[x.d] || 0) + 1; if (c[x.d] > cfg.maxPerD) return false; } }
  return true;
}

function composeItems(rng, cfg) {
  const m = cfg.mode;
  for (let attempt = 0; attempt < PAGE_ATTEMPTS; attempt++) {
    const used = new Set();
    let items;
    try {
      if (m === 'exact') {
        const ex = Array.from({ length: cfg.exact }, () => pickExact(rng, cfg, used));
        const rest = Array.from({ length: cfg.cards - cfg.exact }, () => pickItem(rng, { ...cfg, minR: Math.max(1, cfg.minR) }, used));
        items = rng.shuffle([...ex, ...rest]);
      } else items = Array.from({ length: cfg.cards }, () => pickItem(rng, cfg, used));
    } catch (e) { continue; }
    if (!pageRulesOk(items, cfg)) continue;
    if (m === 'exact') {
      const k = cfg.exact;
      const first = items.slice(0, k).every((x) => x.r === 0), last = items.slice(-k).every((x) => x.r === 0);
      if (k > 0 && k < items.length && (first || last)) continue;   // the exact items never all first / all last
    }
    if (m === 'error') {
      const kinds = [];
      for (const [k, c] of Object.entries(cfg.kinds || {})) for (let i = 0; i < c; i++) kinds.push(k);
      for (let i = 0; i < (cfg.clean || 0); i++) kinds.push('clean');
      if (kinds.length !== items.length) continue;
      const order = rng.shuffle(kinds);
      let ok = true;
      items = items.map((it, i) => {
        const kind = order[i];
        if (kind === 'rBig') { if (it.q < 2) { ok = false; return it; } return { ...it, kind, sQ: it.q - 1, sR: it.r + it.d }; }
        if (kind === 'sum') {
          const cands = [];
          for (const sR of [it.r - 2, it.r - 1, it.r + 1, it.r + 2]) if (sR >= 1 && sR < it.d) cands.push(sR);
          if (!cands.length) { ok = false; return it; }
          return { ...it, kind, sQ: it.q, sR: rng.pick(cands) };
        }
        return { ...it, kind: 'clean', sQ: it.q, sR: it.r };
      });
      if (!ok) continue;
    }
    if (m === 'line') {
      let ok = true;
      items = items.map((it) => {
        const lineEnd = Math.ceil((it.n + it.d) / 5) * 5;
        const hopPx = it.d * cfg.lineW / lineEnd;
        if (lineEnd > cfg.lineMax || hopPx < cfg.hopMin) ok = false;
        return { ...it, lineEnd, hopPx: Math.round(hopPx * 100) / 100 };
      });
      if (!ok) continue;
    }
    return items;
  }
  throw new Error(`G3-377 ${m}: no page satisfies the rules ${JSON.stringify({ cards: cfg.cards, divisors: cfg.divisors, nMin: cfg.nMin, nMax: cfg.nMax, qMax: cfg.qMax, minR: cfg.minR, exact: cfg.exact, kinds: cfg.kinds, lineMax: cfg.lineMax })} (refusal)`);
}

function stageOpen(it, i, extraStamps, style) {
  return `<div class="ws-card-stage" data-ws-content data-lcs-item="${i + 1}" data-lcs-n="${it.n}" data-lcs-d="${it.d}" data-lcs-q="${it.q}" data-lcs-r="${it.r}"${extraStamps || ''} style="${style}">`;
}

function buildFace(bankLoc, d0, { theme, locale, unit, items }, ctx) {
  const rng = ctx.rng;
  const loc = (locale || 'en').slice(0, 2);
  if (!bankLoc || !bankLoc.notation) throw new Error(`G3-377: the ${loc} bank block has no notation (refuse)`);
  const N = bankLoc.notation;
  const u = unit || bankLoc.exemplar;
  const unitDivisors = divisorsOf(u);
  const d = Object.assign({}, d0, { divisors: d0.divisors === 'unit' ? unitDivisors : d0.divisors });
  if (d.nMax == null) { const mx = Math.max(...d.divisors); d.nMax = (d.qMax == null ? 10 : d.qMax) * mx + mx - 1; }   // "inside the tables": n <= qMax·d + d − 1
  const { op, rows, innerH } = faceGuards(N, d, loc, theme);
  if (d.nMin < Math.min(...d.divisors) + (d.mode === 'exact' ? 0 : 1)) throw new Error(`G3-377 ${d.mode}: nMin ${d.nMin} leaves no legal item for d = ${Math.min(...d.divisors)}`);
  const cols = FACE_GRID[d.mode].cols;
  const line1 = (it, extra) => divisionLine({ template: N.template, n: it.n, d: it.d, locale: loc, boxStyle: N.boxStyle, remWord: N.remWord || '', lines: 1, casitaW: CASITA_W, ...(extra || {}) });
  let nouns = null;
  let pileW = 0, zoneW = 0, slotW = 0;
  const meta = { mode: d.mode, unit: u, divisors: d.divisors, op, boxStyle: N.boxStyle, theme: theme || null };
  const stamps = [`data-lcs-mode="${d.mode}"`, `data-lcs-cards="${d.cards}"`, `data-lcs-divisors="${d.divisors.join(',')}"`, `data-lcs-nmin="${d.nMin}"`, `data-lcs-nmax="${d.nMax}"`,
    `data-lcs-minr="${d.minR}"`, `data-lcs-op="${op}"`, `data-lcs-style="${N.boxStyle}"`, `data-lcs-distinctn="${d.distinctN ? 1 : 0}"`, `data-lcs-unit="${u}"`, `data-lcs-locale="${loc}"`, `data-lcs-theme="${theme || ''}"`];
  if (d.qMax != null) stamps.push(`data-lcs-qmax="${d.qMax}"`);
  if (d.maxPerD) stamps.push(`data-lcs-maxperd="${d.maxPerD}"`);
  if (d.rVaries) stamps.push('data-lcs-rvaries="1"');

  // --- per-mode geometry guards (measured against the DEEP chrome's card inner)
  if (d.mode === 'share') {
    if (d.iconPx < ELEMENT_FLOOR) throw new Error(`G3-377 share: iconPx ${d.iconPx} < the G23 element floor ${ELEMENT_FLOOR}`);
    if (d.nMax > d.perRow * 2) throw new Error(`G3-377 share: nMax ${d.nMax} needs more than 2 rows of ${d.perRow}`);
    pileW = d.perRow * d.iconPx + (d.perRow - 1) * d.gapX;
    // the deal row is the strip's width: d homes >= 36 px + 10-px gaps + the leftover home. 396 holds at most 7 homes
    // ((396 - 64 - 10 - 6 * 10) / 7 = 37.4; 8 -> 31.5 < 36), so a unit with a divisor above that is REFUSED, never squeezed.
    const maxHomes = Math.floor((pileW - d.leftoverW - 10 + 10) / (ELEMENT_FLOOR + 10));
    const tooBig = d.divisors.filter((x) => x > maxHomes);
    if (tooBig.length) throw new Error(`G3-377 share: unit "${u}" carries divisor${tooBig.length > 1 ? 's' : ''} ${tooBig.join(', ')} — a ${pileW}-px deal row holds at most ${maxHomes} homes at the 36-px floor (F1 refuses this unit)`);
    const pileH = 2 * d.iconPx + d.gapY;
    const colH = pileH + d.colGap + d.slotH;
    if (colH > innerH) throw new Error(`G3-377 share: strip + homes ${colH} > the card inner ${innerH} under the deepest legal chrome`);
    zoneW = CARD_INNER_W - d.inset - pileW - GAP;
    if (zoneW < ZONE_MIN[N.boxStyle]) throw new Error(`G3-377 share: notation zone ${zoneW} < ${ZONE_MIN[N.boxStyle]}`);
    if (!N.leftoverLabel) throw new Error(`G3-377 share: the ${loc} bank has no leftoverLabel — F1 is REFUSED in ${loc}`);
    const longest = Math.max(...String(N.leftoverLabel).split(/\s+/).map((w) => [...w].length));
    if (longest * 7.4 > d.leftoverW - 12) throw new Error(`G3-377 share: leftoverLabel "${N.leftoverLabel}" has a ${longest}-char word that cannot fit a ${d.leftoverW}-px home at 14 px — F1 refused in ${loc} (author a shorter label)`);
    const pool = entriesFor(theme, loc).filter(countable);
    if (pool.length < module.exports.themeAxis.minNouns) throw new Error(`G3-377 share: theme "${theme}" has ${pool.length} countable nouns in ${loc}, need ${this.themeAxis.minNouns} (refused)`);
    nouns = sampleEntries(rng, pool, d.cards, 'G3-377');
    stamps.push(`data-lcs-iconpx="${d.iconPx}"`, `data-lcs-pilew="${pileW}"`, `data-lcs-zonew="${zoneW}"`, `data-lcs-leftover-label="${String(N.leftoverLabel).replace(/"/g, '&quot;')}"`);
  }
  if (d.mode === 'exact') {
    if (!(N.exactWord && N.restWord)) throw new Error(`G3-377 exact: the ${loc} bank has no exactWord + restWord — F3 is REFUSED in ${loc}`);
    if (!(d.exact >= 1 && d.exact < d.cards)) throw new Error(`G3-377 exact: exact ${d.exact} must be 1..cards−1`);
    const chars = [...String(N.exactWord)].length + [...String(N.restWord)].length;
    // Baloo 2 700 measures 0.49-0.52 em/char (en); 0.55 is the conservative estimate + pill padding 24·2 + border 2·2 + gap 14.
    // The size steps down by 2 px to pillPxMin (18, still above the G23 floor) before a locale's words refuse F3.
    const pillMin = d.pillPxMin || 18;
    let px = d.pillPx;
    while (px >= pillMin && chars * px * 0.55 + 2 * 52 + 14 > 302) px -= 2;
    if (px < pillMin) throw new Error(`G3-377 exact: pills "${N.exactWord}" / "${N.restWord}" estimate ${Math.round(chars * pillMin * 0.55 + 118)} px > the 302-px card even at ${pillMin} px — F3 refused in ${loc} (author shorter words)`);
    d.pillPx = px;
    d.pillH = Math.ceil(px * d.pillLh) + 16;   // line box + padding 6·2 + border 2·2
    const casH = d.casitaH || CASITA_OPEN_H;
    const lineH = N.boxStyle === 'casita' ? casH : 40;
    if (lineH + d.rowGap + d.pillH > innerH) throw new Error(`G3-377 exact: line ${lineH} + gap ${d.rowGap} + pills ${d.pillH} > the card inner ${innerH} under the deepest legal chrome`);
    stamps.push(`data-lcs-exact-n="${d.exact}"`, `data-lcs-pillpx="${d.pillPx}"`, `data-lcs-pillpxmin="${pillMin}"`);
  }
  if (d.mode === 'error') {
    const kinds = d.kinds || {};
    const total = Object.values(kinds).reduce((a, b) => a + b, 0) + (d.clean || 0);
    if (total !== d.cards) throw new Error(`G3-377 error: kinds ${JSON.stringify(kinds)} + clean ${d.clean || 0} = ${total}, cards ${d.cards}`);
    for (const k of Object.keys(kinds)) if (k !== 'rBig' && k !== 'sum') throw new Error('G3-377 error: unknown kind ' + k);
    const shownH = N.boxStyle === 'casita' ? 80 : 40, ghostH = N.boxStyle === 'casita' ? 44 : 40;
    if (shownH + d.rowGap + ghostH > innerH) throw new Error(`G3-377 error: shown ${shownH} + gap + ghost ${ghostH} > the card inner ${innerH} under the deepest legal chrome`);
    stamps.push(`data-lcs-kinds="${Object.entries(kinds).map(([k, v]) => k + ':' + v).join(',')}"`, `data-lcs-clean="${d.clean || 0}"`);
  }
  if (d.mode === 'line') {
    if (!(d.lineW >= 200 && d.lineW + 2 * LINE_PAD_X <= CARD_INNER_W)) throw new Error(`G3-377 line: lineW ${d.lineW} (the SVG is lineW + 52, must fit ${CARD_INNER_W})`);
    if (!(d.hopMin >= ELEMENT_FLOOR)) throw new Error(`G3-377 line: hopMin ${d.hopMin} < the G23 element floor ${ELEMENT_FLOOR}`);
    if (d.lineMax % 5 !== 0) throw new Error('G3-377 line: lineMax must be a multiple of 5');
    const zoneH = N.boxStyle === 'casita' ? CASITA_OPEN_H : 40;
    if (d.hopAir + LINE_H + d.rowGap + zoneH > innerH) throw new Error(`G3-377 line: air ${d.hopAir} + line ${LINE_H} + gap + zone ${zoneH} > the card inner ${innerH} under the deepest legal chrome`);
    stamps.push(`data-lcs-linemax="${d.lineMax}"`, `data-lcs-linew="${d.lineW}"`, `data-lcs-hopmin="${d.hopMin}"`);
  }

  // --- items: composed, or injected (the gate's seam; verify enforces the rules)
  let its = items ? items.map((x) => ({ ...x })) : composeItems(rng, d);
  if (items) {
    its = its.map((x) => {
      const q = x.q != null ? x.q : Math.floor(x.n / x.d), r = x.r != null ? x.r : x.n - Math.floor(x.n / x.d) * x.d;
      const y = { ...x, q, r };
      if (d.mode === 'error' && (y.sQ == null || y.sR == null)) { y.kind = y.kind || 'rBig'; y.sQ = y.kind === 'rBig' ? q - 1 : q; y.sR = y.kind === 'rBig' ? r + x.d : (r + 1 < x.d ? r + 1 : r - 1); }
      if (d.mode === 'line') { y.lineEnd = y.lineEnd || Math.ceil((x.n + x.d) / 5) * 5; y.hopPx = Math.round(x.d * d.lineW / y.lineEnd * 100) / 100; }
      return y;
    });
    if (its.length !== d.cards) throw new Error(`G3-377 ${d.mode}: ${its.length} injected items, cards ${d.cards}`);
  }

  const cards = its.map((it, i) => {
    if (d.mode === 'share') {
      const noun = nouns[i];
      const pile = pileHtml({ layout: 'rows', theme, noun: noun.noun, n: it.n, iconPx: d.iconPx, perRow: d.perRow, gapX: d.gapX, gapY: d.gapY, w: pileW, h: 0, rng });
      slotW = Math.floor((pileW - d.leftoverW - 10 - (it.d - 1) * 10) / it.d);
      const homes = dealBoxes({ d: it.d, slotW, slotH: d.slotH, leftoverW: d.leftoverW, leftoverLabel: N.leftoverLabel, gap: 10 });
      const zone = divisionLine({ template: N.template, n: it.n, d: it.d, locale: loc, boxStyle: N.boxStyle, remWord: N.remWord || '', lines: N.boxStyle === 'inline' ? 2 : 1, w: zoneW, casitaW: Math.min(CASITA_W, zoneW) });
      return stageOpen(it, i, ` data-lcs-noun="${noun.vocabKey}"`, `padding:0 0 0 ${d.inset}px;display:flex;align-items:center;justify-content:space-between;gap:${GAP}px;min-width:0`) +
        `<div data-lcs-share style="display:flex;flex-direction:column;gap:${d.colGap}px;width:${pileW}px;flex:0 0 ${pileW}px"><div style="display:flex">${pile}</div>${homes}</div>${zone}</div>`;   // the strip sits in a ROW flex so pileHtml's flex-basis is a width (in the column it would be a height)
    }
    if (d.mode === 'practice') {
      return stageOpen(it, i, '', 'padding:0;display:flex;align-items:center;justify-content:center;min-width:0') + line1(it) + `</div>`;
    }
    if (d.mode === 'exact') {
      // pillChoice's .ws-pill has no line-height (Baloo 2 'normal' ~1.6 -> a 48-px pill at 20 px, measured); a string edit pins 1.1
      // (38 px) so a casita line + the pills fit the deepest legal chrome (84 + 6 + 38 <= 130.75). The needle is asserted.
      const needle = `style="font-size:${d.pillPx}px"`;
      const raw = pillChoice({ items: [{ key: 'exact', label: N.exactWord }, { key: 'rest', label: N.restWord }], fontPx: d.pillPx });
      if (raw.split(needle).length !== 3) throw new Error('G3-377 exact: pillChoice output changed shape (the font-size needle is not there twice)');
      const pills = raw.split(needle).join(`style="font-size:${d.pillPx}px;line-height:${d.pillLh}"`);
      return stageOpen(it, i, ` data-lcs-exact="${it.r === 0 ? 1 : 0}"`, `padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${d.rowGap}px;min-width:0`) +
        line1(it, N.boxStyle === 'casita' ? { casitaH: d.casitaH || CASITA_OPEN_H } : {}) + `<div data-lcs-pills>${pills}</div></div>`;
    }
    if (d.mode === 'error') {
      const shown = line1(it, { shown: { q: it.sQ, r: it.sR } });
      const ghost = line1(it, { ghost: true });
      return stageOpen(it, i, ` data-lcs-kind="${it.kind}"`, `padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${d.rowGap}px;min-width:0`) + shown + ghost + `</div>`;
    }
    if (d.mode === 'line') {
      const nl = numberLine({ min: 0, max: it.lineEnd, tickStep: 1, labelEvery: 5, width: d.lineW, marks: [it.n] });
      return stageOpen(it, i, ` data-lcs-lineend="${it.lineEnd}" data-lcs-hoppx="${it.hopPx}"`, `padding:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:${d.rowGap}px;min-width:0`) +
        `<div data-lcs-linewrap style="padding-top:${d.hopAir}px;line-height:0">${nl.svg}</div>` + line1(it) + `</div>`;
    }
    throw new Error('G3-377: unknown mode ' + d.mode);
  });
  const bodyHtml = `<div data-ws-content data-lcs-dwr ${stamps.join(' ')} style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">` +
    cardGrid({ cards, cols, rows, numbered: true }) + `</div>`;
  meta.items = its.map((it, i) => ({ ...it, ...(nouns ? { noun: nouns[i].vocabKey } : {}) }));
  return { bodyHtml, meta };
}

/** In-page verify for the five faces (self-contained: page.evaluate(verifyFaceInPage)); stamps only, own derivation. */
function verifyFaceInPage() {
  const fails = [];
  const root = document.querySelector('[data-lcs-dwr]');
  if (!root) return ['no division-with-remainder root'];
  const R = root.dataset;
  const mode = R.lcsMode;
  const MODES = ['share', 'practice', 'exact', 'error', 'line'];
  if (!MODES.includes(mode)) return ['unknown face mode ' + mode];
  const cards = +R.lcsCards, nMin = +R.lcsNmin, nMax = +R.lcsNmax, minR = +R.lcsMinr, qMax = R.lcsQmax == null ? Infinity : +R.lcsQmax, maxPerD = R.lcsMaxperd ? +R.lcsMaxperd : 0;
  const divisors = (R.lcsDivisors || '').split(',').map(Number).filter((x) => x > 0);
  const op = R.lcsOp, style = R.lcsStyle, loc = R.lcsLocale, distinctN = R.lcsDistinctn === '1';
  const themeless = mode !== 'share';
  if (!divisors.length) fails.push('no divisor set stamped');
  if (!['÷', ':', '/'].includes(op)) fails.push('op stamp ' + op);
  if (loc === 'sv' && op !== '/') fails.push('sv division sign is "' + op + '", must be "/"');
  const wantMinR = mode === 'exact' ? 0 : 1;
  if (!(minR >= wantMinR)) fails.push(`minR ${minR} < ${wantMinR} on ${mode}`);
  if (themeless && R.lcsTheme) fails.push(`${mode}: a theme "${R.lcsTheme}" on a themeless face`);
  if (themeless && root.querySelector('img')) fails.push(`${mode}: a picture on a numbers face (reads as a clue)`);
  const bwDir = /(^|\/)[^/]*\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)\/[^/]+$/i;
  const items = [...root.querySelectorAll('[data-lcs-item]')];
  if (items.length !== cards) fails.push(`items: ${items.length}, want ${cards}`);
  if (!items.length) fails.push('non-vacuity: 0 items');
  const seen = new Map(), seenN = new Map(), dCount = {};
  const rs = new Set(), exactFlags = [], kindCount = {};
  items.forEach((it, i) => {
    const P = `item ${i + 1}`;
    const n = +it.dataset.lcsN, d = +it.dataset.lcsD, q = +it.dataset.lcsQ, r = +it.dataset.lcsR;
    if (![n, d, q, r].every(Number.isInteger)) { fails.push(`${P}: non-integer stamps`); return; }
    const wantQ = Math.floor(n / d), wantR = n - wantQ * d;
    if (q !== wantQ) fails.push(`${P}: q ${q} != floor(${n}/${d}) = ${wantQ}`);
    if (r !== wantR) fails.push(`${P}: r ${r} != ${n} - ${wantQ}*${d} = ${wantR}`);
    if (q * d + r !== n) fails.push(`${P}: q*d + r = ${q * d + r} != n ${n}`);
    if (mode !== 'exact' && !(r >= 1)) fails.push(`${P}: remainder ${r} < 1 (exact division)`);
    if (!(r < d)) fails.push(`${P}: remainder ${r} >= divisor ${d} (remainder too big)`);
    if (r < minR) fails.push(`${P}: r ${r} < minR ${minR}`);
    if (!divisors.includes(d)) fails.push(`${P}: divisor ${d} not in the unit set [${divisors.join(',')}]`);
    if (n > nMax) fails.push(`${P}: n ${n} above nMax ${nMax}`);
    if (n < nMin) fails.push(`${P}: n ${n} below nMin ${nMin}`);
    if (q > qMax) fails.push(`${P}: q ${q} above qMax ${qMax} (outside the tables)`);
    const key = n + 'x' + d;
    if (seen.has(key)) fails.push(`${P}: (${n}, ${d}) repeats item ${seen.get(key)} (duplicate item)`); else seen.set(key, i + 1);
    if (distinctN) { if (seenN.has(n)) fails.push(`${P}: n ${n} repeats item ${seenN.get(n)} (distinct-n rule)`); else seenN.set(n, i + 1); }
    dCount[d] = (dCount[d] || 0) + 1;
    if (maxPerD && dCount[d] > maxPerD) fails.push(`${P}: divisor ${d} appears more than ${maxPerD} times`);
    rs.add(r);
    const card = it.closest('.ws-card');
    const cb = card ? card.getBoundingClientRect() : null;
    const inside = (b, what) => { if (cb && (b.right > cb.right - 13.4 || b.left < cb.left + 13.4 || b.top < cb.top + 13.4 || b.bottom > cb.bottom - 13.4)) fails.push(`${P}: ${what} outside the card inner box`); };
    // zones
    const zones = [...it.querySelectorAll('[data-lcs-notation]')];
    const wantZones = mode === 'error' ? 2 : 1;
    if (zones.length !== wantZones) fails.push(`${P}: ${zones.length} notation zones, want ${wantZones}`);
    zones.forEach((z) => {
      if (z.dataset.lcsStyle !== style) fails.push(`${P}: zone style ${z.dataset.lcsStyle} != page ${style}`);
      if (z.scrollWidth > z.clientWidth + 0.6) fails.push(`${P}: notation zone overflows (${z.scrollWidth} > ${z.clientWidth})`);
      inside(z.getBoundingClientRect(), 'notation zone');
    });
    if (mode === 'error') {
      const ghosts = zones.filter((z) => z.dataset.lcsGhost === '1');
      if (ghosts.length !== 1) fails.push(`${P}: ${ghosts.length} ghost lines, want 1`);
      if (zones[0] && zones[0].dataset.lcsGhost === '1') fails.push(`${P}: the ghost line sits above the shown line`);
    } else if (zones.some((z) => z.dataset.lcsGhost === '1')) fails.push(`${P}: a ghost line on ${mode}`);
    // numerals: n and d only (a ghost token carries no stamp)
    const nums = [...it.querySelectorAll('[data-lcs-num]')];
    if (nums.length !== 2) fails.push(`${P}: ${nums.length} printed numerals, want n and d only`);
    const numVals = nums.map((e) => +e.dataset.lcsNum).sort((a, b) => a - b);
    if (numVals.join(',') !== [n, d].sort((a, b) => a - b).join(',')) fails.push(`${P}: printed numerals [${numVals}] != [${[n, d].sort((a, b) => a - b)}]`);
    nums.forEach((e) => { if (e.textContent.trim() !== e.dataset.lcsNum) fails.push(`${P}: numeral prints "${e.textContent.trim()}", stamps ${e.dataset.lcsNum}`); });
    it.querySelectorAll('[data-lcs-op]').forEach((e) => { const g = e.textContent.trim(); if (['÷', ':', '/'].includes(g) && g !== op) fails.push(`${P}: prints the sign "${g}", the page sign is "${op}"`); });
    // the two open boxes: q then r, EMPTY
    const boxes = [...it.querySelectorAll('[data-lcs-answer]')];
    if (boxes.length !== 2) fails.push(`${P}: ${boxes.length} answer boxes, want q then r`);
    else if (boxes[0].dataset.lcsRole !== 'q' || boxes[1].dataset.lcsRole !== 'r') fails.push(`${P}: boxes are ${boxes[0].dataset.lcsRole}, ${boxes[1].dataset.lcsRole}; want q then r`);
    boxes.forEach((b) => {
      if ((b.textContent || '').trim()) fails.push(`${P}: an answer box carries text "${b.textContent.trim()}" (answer printed)`);
      if (b.dataset.lcsAnswer) fails.push(`${P}: an answer box stamps a value "${b.dataset.lcsAnswer}"`);
      const bb = b.getBoundingClientRect();
      if (bb.width < 36 - 0.6 || bb.height < 30 - 0.6) fails.push(`${P}: answer box ${bb.width.toFixed(0)}x${bb.height.toFixed(0)} too small`);
      if (mode === 'error' && !b.closest('[data-lcs-ghost]')) fails.push(`${P}: an open box outside the ghost line`);
    });
    const shownEls = [...it.querySelectorAll('[data-lcs-shown-q],[data-lcs-shown-r]')];
    if (mode !== 'error' && shownEls.length) fails.push(`${P}: a shown pair on ${mode} (F4 only)`);
    // no text equals q or r unless it is also n or d — the error face's SHOWN (wrong) pair excepted
    const walker = document.createTreeWalker(it, NodeFilter.SHOW_TEXT);
    const okNums = new Set([String(n), String(d)]);
    let node;
    while ((node = walker.nextNode())) {
      const t = node.textContent.trim();
      if (!t) continue;
      const inShown = mode === 'error' && node.parentElement && node.parentElement.closest('[data-lcs-shown-q],[data-lcs-shown-r]');
      const tickLabel = mode === 'line' && node.parentElement && node.parentElement.closest('[data-lcs-ticklabel]');   // every multiple of 5 is labelled whatever q / r are
      if ((t === String(q) || t === String(r)) && !okNums.has(t) && !inShown && !tickLabel) fails.push(`${P}: text "${t}" equals the ${t === String(q) ? 'quotient' : 'remainder'} (answer printed)`);
      if (loc === 'sv' && t.includes('÷')) fails.push(`${P}: sv text "${t}" contains ÷ (historic minus)`);
    }
    // ---- per mode
    if (mode === 'share') {
      const iconPx = +R.lcsIconpx;
      const piles = it.querySelectorAll('[data-lcs-pile]');
      if (piles.length !== 1) fails.push(`${P}: ${piles.length} piles`);
      const imgs = [...it.querySelectorAll('[data-lcs-pile] img')];
      if (imgs.length !== n) fails.push(`${P}: strip shows ${imgs.length} pictures, n is ${n}`);
      imgs.forEach((img, k) => {
        if (!img.complete || img.naturalWidth === 0) fails.push(`${P}: picture ${k + 1} not loaded`);
        const b = img.getBoundingClientRect();
        if (b.width < 36 - 0.6 || b.height < 36 - 0.6) fails.push(`${P}: picture ${k + 1} ${b.width.toFixed(1)}x${b.height.toFixed(1)} < 36 (G23 floor)`);
        if (iconPx && parseFloat(img.style.width) < iconPx - 0.6) fails.push(`${P}: picture ${k + 1} styled ${img.style.width}, config ${iconPx}`);
        let src = img.getAttribute('src') || '';
        try { src = decodeURIComponent(src); } catch (e) { /* raw */ }
        if (bwDir.test(src)) fails.push(`${P}: picture ${k + 1} comes from a B&W theme directory`);
        if (img.getAttribute('alt')) fails.push(`${P}: a strip picture carries alt text`);
      });
      if (imgs.length !== it.querySelectorAll('img').length) fails.push(`${P}: a picture outside the strip (dealt by the machine)`);
      if (it.querySelector('[data-lcs-group],[data-lcs-ring]')) fails.push(`${P}: a group / ring on the strip (pre-boxed pile)`);
      const slots = [...it.querySelectorAll('[data-lcs-slot]')];
      if (slots.length !== d) fails.push(`${P}: ${slots.length} homes, divisor is ${d}`);
      slots.forEach((s, k) => {
        if (s.querySelector('img')) fails.push(`${P}: home ${k + 1} contains a picture (dealt by the machine)`);
        if ((s.textContent || '').trim()) fails.push(`${P}: home ${k + 1} carries text "${s.textContent.trim()}"`);
        const b = s.getBoundingClientRect();
        if (b.width < 36 - 0.6 || b.height < 44 - 0.6) fails.push(`${P}: home ${k + 1} ${b.width.toFixed(0)}x${b.height.toFixed(0)} below 36 x 44`);
        inside(b, `home ${k + 1}`);
      });
      const lefts = [...it.querySelectorAll('[data-lcs-leftover]')];
      if (lefts.length !== 1) fails.push(`${P}: ${lefts.length} leftover homes, want 1`);
      lefts.forEach((l) => {
        if (l.querySelector('img')) fails.push(`${P}: the leftover home contains a picture`);
        const t = (l.textContent || '').trim();
        if (t !== (R.lcsLeftoverLabel || '').trim()) fails.push(`${P}: leftover label "${t}" != the bank's "${R.lcsLeftoverLabel}"`);
        if (/\d/.test(t)) fails.push(`${P}: the leftover label carries a digit`);
        if (l.scrollWidth > l.clientWidth + 0.6 || l.scrollHeight > l.clientHeight + 0.6) fails.push(`${P}: the leftover label overflows its home (${l.scrollWidth}x${l.scrollHeight} in ${l.clientWidth}x${l.clientHeight})`);
        inside(l.getBoundingClientRect(), 'the leftover home');
      });
      const deal = it.querySelector('[data-lcs-deal]');
      const pile = it.querySelector('[data-lcs-pile]');
      if (deal && pile) { const db = deal.getBoundingClientRect(), pb = pile.getBoundingClientRect(); if (db.top < pb.bottom - 0.6) fails.push(`${P}: the homes overlap the strip`); if (db.width > pb.width + 0.6) fails.push(`${P}: the deal row (${db.width.toFixed(0)}) is wider than the strip (${pb.width.toFixed(0)})`); }
    }
    if (mode === 'exact') {
      const flag = it.dataset.lcsExact;
      if (flag !== '0' && flag !== '1') fails.push(`${P}: exact stamp "${flag}"`);
      if ((flag === '1') !== (r === 0)) fails.push(`${P}: data-lcs-exact=${flag} but r = ${r}`);
      exactFlags.push(r === 0);
      const pills = [...it.querySelectorAll('[data-lcs-pill]')];
      if (pills.length !== 2) fails.push(`${P}: ${pills.length} pills, want exact then rest`);
      else {
        if (pills[0].dataset.lcsPill !== 'exact' || pills[1].dataset.lcsPill !== 'rest') fails.push(`${P}: pills are ${pills[0].dataset.lcsPill}, ${pills[1].dataset.lcsPill}; want exact then rest`);
        const a = pills[0].getBoundingClientRect(), b = pills[1].getBoundingClientRect();
        if (Math.abs(a.top - b.top) > 1) fails.push(`${P}: the pills wrap to two rows`);
        if (pills[0].textContent.trim() === pills[1].textContent.trim()) fails.push(`${P}: the two pills read the same`);
      }
      pills.forEach((p, k) => {
        const t = p.textContent.trim();
        if (!t) fails.push(`${P}: pill ${k + 1} is empty`);
        if (/[÷:/×·\d]/.test(t)) fails.push(`${P}: pill "${t}" carries a glyph or digit (pills are words)`);
        if (p.hasAttribute('data-lcs-marked') || p.getAttribute('aria-checked') === 'true' || /marked|chosen|selected/.test(p.className)) fails.push(`${P}: pill "${t}" is pre-marked (answer printed)`);
        const b = p.getBoundingClientRect();
        if (b.height < 30 - 0.6) fails.push(`${P}: pill "${t}" ${b.height.toFixed(0)} px tall < 30`);
        const fs = parseFloat(getComputedStyle(p).fontSize);
        if (fs < (+R.lcsPillpxmin || 18) - 0.1) fails.push(`${P}: pill font ${fs} < ${+R.lcsPillpxmin || 18}`);
        if (Math.abs(fs - +R.lcsPillpx) > 0.1) fails.push(`${P}: pill font ${fs} != the stamped ${R.lcsPillpx}`);
        inside(b, `pill "${t}"`);
      });
      const pillRow = it.querySelector('[data-lcs-pills]');
      if (pillRow && zones[0]) { const zb = zones[0].getBoundingClientRect(), pb = pillRow.getBoundingClientRect(); if (pb.top < zb.bottom - 0.6) fails.push(`${P}: the pills overlap the notation`); }
    }
    if (mode === 'error') {
      const kind = it.dataset.lcsKind;
      if (!['rBig', 'sum', 'clean'].includes(kind)) fails.push(`${P}: kind stamp "${kind}"`);
      kindCount[kind] = (kindCount[kind] || 0) + 1;
      const sq = it.querySelectorAll('[data-lcs-shown-q]'), sr = it.querySelectorAll('[data-lcs-shown-r]');
      if (sq.length !== 1 || sr.length !== 1) fails.push(`${P}: shown boxes q ${sq.length} r ${sr.length}, want one each`);
      else {
        const sQ = +sq[0].dataset.lcsShownQ, sR = +sr[0].dataset.lcsShownR;
        const tq = (sq[0].textContent || '').trim(), tr = (sr[0].textContent || '').trim();
        if (tq !== String(sQ) || tr !== String(sR)) fails.push(`${P}: shown boxes print "${tq}" "${tr}", stamp ${sQ} ${sR}`);
        if (kind !== 'clean' && sQ === q && sR === r) fails.push(`${P}: the shown pair (${sQ}, ${sR}) IS the true pair (nothing to find)`);
        if (kind === 'rBig' && !(sR >= d)) fails.push(`${P}: rBig but the shown remainder ${sR} < divisor ${d}`);
        if (kind === 'rBig' && sQ * d + sR !== n) fails.push(`${P}: rBig but ${sQ}*${d} + ${sR} = ${sQ * d + sR} != ${n} (a rBig item keeps the sum)`);
        if (kind === 'sum' && !(sR < d && sR >= 1)) fails.push(`${P}: sum but the shown remainder ${sR} is not in 1..${d - 1}`);
        if (kind === 'sum' && sQ * d + sR === n) fails.push(`${P}: sum but ${sQ}*${d} + ${sR} = ${n} (the sum is right)`);
        if (kind === 'sum' && Math.abs(sQ * d + sR - n) > 2) fails.push(`${P}: sum off by ${Math.abs(sQ * d + sR - n)}, want 1..2`);
        if (kind === 'clean' && !(sQ === q && sR === r)) fails.push(`${P}: clean but the shown pair is wrong`);
        if (sq[0].closest('[data-lcs-ghost]') || sr[0].closest('[data-lcs-ghost]')) fails.push(`${P}: a shown box inside the ghost line`);
        if (zones[0] && !zones[0].contains(sq[0])) fails.push(`${P}: the shown pair is not in the first line`);
        if (zones[0] && zones[0].querySelector('[data-lcs-answer]')) fails.push(`${P}: an open box on the shown line`);
        // the ghost boxes sit exactly under the shown boxes
        const bq = it.querySelector('[data-lcs-ghost] [data-lcs-role="q"]'), br = it.querySelector('[data-lcs-ghost] [data-lcs-role="r"]');
        if (bq && br) {
          const a = sq[0].getBoundingClientRect(), b = bq.getBoundingClientRect(), c = sr[0].getBoundingClientRect(), e = br.getBoundingClientRect();
          if (Math.abs(a.left - b.left) > 1 || Math.abs(a.width - b.width) > 1) fails.push(`${P}: the open q box (x ${b.left.toFixed(1)}) is not under the shown q (x ${a.left.toFixed(1)})`);
          if (Math.abs(c.left - e.left) > 1 || Math.abs(c.width - e.width) > 1) fails.push(`${P}: the open r box (x ${e.left.toFixed(1)}) is not under the shown r (x ${c.left.toFixed(1)})`);
          if (b.top < a.bottom - 0.6) fails.push(`${P}: the open boxes are not below the shown pair`);
        }
      }
    }
    if (mode === 'line') {
      const lineEnd = +it.dataset.lcsLineend, lineMax = +R.lcsLinemax, hopMin = +R.lcsHopmin;
      const prims = it.querySelectorAll('[data-lcs-prim="number-line"]');
      if (prims.length !== 1) fails.push(`${P}: ${prims.length} number lines`);
      const nl = prims[0];
      if (nl) {
        if (+nl.dataset.lcsMin !== 0) fails.push(`${P}: line starts at ${nl.dataset.lcsMin}, not 0`);
        if (+nl.dataset.lcsMax !== lineEnd) fails.push(`${P}: line ends at ${nl.dataset.lcsMax}, stamp ${lineEnd}`);
        inside(nl.getBoundingClientRect(), 'the number line');
      }
      if (!Number.isInteger(lineEnd) || lineEnd % 5 !== 0) fails.push(`${P}: lineEnd ${lineEnd} is not a multiple of 5`);
      if (lineEnd < n + d) fails.push(`${P}: lineEnd ${lineEnd} < n + d = ${n + d} (no room to see the last whole hop fail)`);
      if (lineEnd > lineMax) fails.push(`${P}: lineEnd ${lineEnd} > lineMax ${lineMax}`);
      const marks = [...it.querySelectorAll('[data-lcs-mark]')];
      if (marks.length !== 1) fails.push(`${P}: ${marks.length} marks, want one at n`);
      else if (+marks[0].dataset.lcsMark !== n) fails.push(`${P}: the mark sits at ${marks[0].dataset.lcsMark}, n is ${n}`);
      const hops = it.querySelectorAll('[data-lcs-hop]');
      if (hops.length) fails.push(`${P}: ${hops.length} printed hops (the child draws them)`);
      const labels = [...it.querySelectorAll('[data-lcs-ticklabel]')];
      if (labels.length !== lineEnd / 5 + 1) fails.push(`${P}: ${labels.length} tick labels, want ${lineEnd / 5 + 1} (every 5)`);
      labels.forEach((l) => { if (+l.dataset.lcsTicklabel % 5 !== 0) fails.push(`${P}: a label at ${l.dataset.lcsTicklabel} (not a multiple of 5)`); const fs = parseFloat(getComputedStyle(l).fontSize); if (fs < 17 - 0.1) fails.push(`${P}: tick label ${fs}px < 17`); });
      const tN = it.querySelector(`[data-lcs-tick="${n}"]`), tB = it.querySelector(`[data-lcs-tick="${n - d}"]`), t0 = it.querySelector('[data-lcs-tick="0"]');
      if (!tN || !tB || !t0) fails.push(`${P}: ticks at ${n} / ${n - d} / 0 not all present`);
      else {
        const hop = tN.getBoundingClientRect().left - tB.getBoundingClientRect().left;
        if (hop < hopMin - 0.6) fails.push(`${P}: a hop of ${d} spans ${hop.toFixed(1)} px < ${hopMin} (too small to draw)`);
        if (marks[0] && Math.abs(marks[0].getBoundingClientRect().left + marks[0].getBoundingClientRect().width / 2 - tN.getBoundingClientRect().left) > 1.5) fails.push(`${P}: the mark is not on the tick at ${n}`);
        const rTick = it.querySelector(`[data-lcs-tick="${r}"]`);
        if (!rTick) fails.push(`${P}: no tick at the landing ${r}`);
      }
      const wrap = it.querySelector('[data-lcs-linewrap]');
      if (wrap && nl) { const wb = wrap.getBoundingClientRect(), nb = nl.getBoundingClientRect(); if (nb.top - wb.top < 20 - 0.6) fails.push(`${P}: air above the line ${(nb.top - wb.top).toFixed(1)} px < 20 (no lane to draw hops)`); }
    }
  });
  // page rules
  if (R.lcsRvaries === '1' && items.length > 1 && rs.size < 2) fails.push(`${mode}: the remainder is constant across the page`);
  if (mode === 'exact') {
    const k = +R.lcsExactN;
    const c = exactFlags.filter(Boolean).length;
    if (c !== k) fails.push(`exact: ${c} exact items, config says ${k}`);
    if (k > 0 && k < exactFlags.length) {
      if (exactFlags.slice(0, k).every(Boolean)) fails.push('exact: the exact items are all first');
      if (exactFlags.slice(-k).every(Boolean)) fails.push('exact: the exact items are all last');
    }
  }
  if (mode === 'error') {
    const want = {};
    (R.lcsKinds || '').split(',').filter(Boolean).forEach((s) => { const [k, v] = s.split(':'); want[k] = +v; });
    want.clean = +(R.lcsClean || 0);
    for (const k of Object.keys(want)) if ((kindCount[k] || 0) !== want[k]) fails.push(`error: ${kindCount[k] || 0} ${k} items, config says ${want[k]}`);
    for (const k of Object.keys(kindCount)) if (!(k in want)) fails.push(`error: an item of unconfigured kind ${k}`);
  }
  if (loc === 'sv' && (document.body.textContent || '').includes('÷')) fails.push('sv page contains ÷ (historic minus)');
  root.querySelectorAll('[data-lcs-answer],[data-lcs-num],[data-lcs-shown-q],[data-lcs-shown-r]').forEach((el) => { if (!el.closest('[data-lcs-item]')) fails.push('ground truth outside an item'); });
  return fails;
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

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones.
   *  `items` (faces only) injects pre-composed items a face DRAWS as asked — verify enforces the rules. */
  _buildWith(bankLoc, d0, { theme, locale, unit, items: injected }, ctx) {
    if (!d0) throw new Error('G3-377: no difficulty config');
    if (d0.mode != null) return buildFace(bankLoc, d0, { theme, locale, unit, items: injected }, ctx);   // Phase-2 faces; the base path below is untouched
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
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-dwr]'); return r ? (r.dataset.lcsMode || null) : null; });
    if (mode) return page.evaluate(verifyFaceInPage);   // Phase-2 faces (stamped only by a face)
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
