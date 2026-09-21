/**
 * G1-351 — Odd and Even Numbers: Odd House, Even House (nt10-D; family key
 * `odd-and-even`; G1 readiness in en, NO CCSS code — 2.OA.C.3 is grade 2; the
 * national framework NAME + band elsewhere). Design:
 * docs/worksheet-gen/b4-designs/G1-351-odd-and-even.md §2/§5 (critic record
 * _work/G1-351-critic.md; build record _work/G1-351-build.md).
 *
 * "Nine numbers on the doorstep, two houses, three numbers already living in
 * them with their pairs drawn." A strip of round numeral chips over two drawn
 * houses side by side (a chimney, a tealSoft roof for even / a coralSoft roof
 * for odd, a white body, the K-016 chip WORD on a sign under the eave) each
 * holding eight dashed coral boxes. Three numbers have already moved in: they
 * sit in a white worked tile inside their house with their pairs drawn beside
 * them column-first, the lone one a hollow coral ring. The child reads a chip,
 * decides, and WRITES the numeral into a box in that house. The cue lives
 * ONLY beside a solved numeral inside its house, never beside an open chip:
 * the open chips are bare, so nothing on the page says where a chip goes.
 *
 * THEMELESS (design §1): numerals only, no picture library art, no unit axis
 * (a range fan would put 1-100 on the base without the F3 scaffold). The seed
 * is locale-neutral: the same numerals in all 11 locales; only the sign words
 * and the house ORDER (the locale's title order, `bank.houseOrder`: odd-left
 * for en sv, even-left for the other nine) come from the bank.
 *
 * THE RULE THAT LOCKS THE TYPE (design §1): every item's answer is `n mod 2`,
 * re-derived by verify() from the stamped `data-lcs-val` (chips) and
 * `data-lcs-given` (worked tiles); NO parity attribute is ever stamped on a
 * chip or a numeral; `pairDots` renders only inside a worked tile (the
 * component's `host:'worked'` token; verify asserts the `[data-lcs-given]`
 * ancestor); every open box is `blankNumeralBox` with `data-lcs-answer=""`;
 * the only words printed are the two K-016 chip literals on the signs (the
 * bank's `chips`, asserted EQUAL to K-016's at validate time); `0` never
 * appears on any page at any level (the fi "nolla" trap is resolved by
 * absence); a house's box count is never the open count of its parity (a
 * leak) and always exceeds it.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (never the
 * level index). `resolveBase(d)`:
 *   range          [lo, hi], lo >= 1 (0 never)
 *   chips          the OPEN chips (the G1 item window [6, 12])
 *   perRow         chips per strip row (d3: two rows of 6; lane 164)
 *   worked         {count, split:[a, b]} — numerals <= GLOBAL.worked.maxN (10)
 *                  already placed, `a` in one house and `b` in the other (the
 *                  side of `a` is a coin flip of the seed); both parities worked
 *   boxes          {cols, rows} per house (> open of that parity, !== it)
 *   splits         the allowed [odd, even] totals over chips + worked (one is
 *                  rng-picked: d1 4+5 or 5+4; d2 6+6; d3 7+7)
 *   gap            strip -> houses, fixed 20..40 (28)
 *   house          {boxes:{w,h,gapX,gapY}, layout:{sign,worked,grid,pad}} — the
 *                  house height is DERIVED (houseHeight); the stack strip + gap
 *                  + house must sit in [600, 677] (the sparse floor / the fi chrome)
 * build() reads ONLY data/b4/odd-and-even.js (lib/b4-common.js bank) — never
 * K-016 (a validate-time source), never labels.js, never a picture, never
 * image-vocabulary.js.
 *
 * Chrome budget (design §2 re-budgeted 2026-09-21 by the reviewer's sparse
 * ruling — the design's 538 stack centred in a 1fr row left a ~130 px blank
 * band between the strip and the roofs; the stage is now TOP-ANCHORED under
 * the instruction with a fixed gap and the houses grew to use the room):
 * strip 92 (64 + 24 + 4) + gap 28 + house 518 = **638** at d1 / d2 (<= 677 the
 * 4-line fi title, slack 39; <= 710 the measured 3+3 chrome, slack 72; the
 * one-line chrome 814 leaves 176 <= 180 under the stage). The house is 518
 * = grid 314 + 2 x 74 + 24 + pad 30 + 2 (boxes 64 x 74, gapX 8 / gapY 24; the
 * WIDTH lever is capped by the 290 body: 4 x 68 + 3 x 12 = 308 > 284, so the
 * height carries the growth). d3 (unpublished, two chip rows): 164 + 28 +
 * the compact 426 house (62 x 60 / 12 / 14, sign 140 / worked 196 / grid
 * 270 / pad 20) = 618. Rows `stripH px houseH px` (NO 1fr), `align-content:
 * start`; the page's slack falls BELOW the stage.
 *
 * Answer hiding + stamps: root `[data-ws-content][data-lcs-oae]` with
 * data-lcs-chips data-lcs-worked data-lcs-boxes data-lcs-split="odd,even"
 * data-lcs-range="lo,hi" data-lcs-order="<left>,<right>" data-lcs-maxn (no
 * data-lcs-mode on the base); chips `.ws-chip[data-lcs-val]`; houses
 * `[data-lcs-house="odd|even"]` with `[data-lcs-sign]`, worked tiles
 * `[data-lcs-given]` holding `[data-lcs-pairdots][data-lcs-n][data-lcs-pairs]
 * [data-lcs-single]`, boxes `.ws-blankbox[data-lcs-answer=""]`.
 *
 * PHASE 2 (2026-09-21; record _work/G1-351-faces.md) — the five faces
 * (design §3) on ONE additive `mode` knob, dispatched in `_buildWith` BEFORE
 * the base path consumes the RNG so the base's output stays byte-identical
 * (tools/b3-baseline.js --check PASS). Rows: tools/b4var-rows/odd-and-even.js.
 *   proof  G2-351  8 numbered cards `n = [a] + [b] + [r]` over n bare dots (r 10,
 *                  pitch 29, rows of 10) the child rings two by two; the caption
 *                  `leftover` under the r box; the card grid fills the body and
 *                  the white dots panel takes the growth (flex:1).
 *   share  G1-369  THEMED: 6 lanes of n (5-12) pictures of ONE countable noun,
 *                  two named plates (SENTENCES names <= nameMaxGraphemes) with an
 *                  `each` box each, the `leftover` box, the K-016 pill pair
 *                  (parityPills, order = houseOrder, one data-lcs-correct).
 *   ones   G2-352  the rule strip, then 12 numbers 10-99 in two columns of
 *                  pvLanes (tens box white / ones box coralSoft + coral border,
 *                  64 px, digits 34) under the placeHeads letters, two 60 px tick
 *                  circles under the chip words (columnHeads once per column);
 *                  every ones digit 0-9 appears, none more than twice.
 *   sums   G3-386  the parity table (chip words only), then 12 sumLanes `a + b`
 *                  of three-digit addends (the ones digits underlined at the
 *                  baseline), the four parity cases 3 each, two tick circles.
 *   count  G1-370  THEMED: 6 lanes of 11-18 pictures in rows of 9, the `pairs`
 *                  box, the pill pair.
 * Resolvers (`resolveProof` / `resolvePics` / `resolveOnes` / `resolveSums`)
 * guard the RESOLVED config and refuse what cannot be honest; `verify()` reads
 * the root's `data-lcs-mode` and re-derives every answer from the stamps
 * (VERIFY_FACE) with a SPARSE floor per face (the stage fills the body, the
 * blank inside a card / lane is bounded, top-anchored).
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { GLOBAL } = require('../../data/b4/odd-and-even.js');
const { chipStrip, houseBin, houseHeight, dotRowCard, shareLane, countLane, pvLane, sumLane, columnHeads, ruleStrip, parityTable, parityPills } = require('../../templates/components-b4.js');
const { entriesFor, countable, fileUri } = require('../../lib/b2-common.js');
const { SENTENCES } = require('../../data/b2/sentences.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const KEY = 'odd-and-even';
const ID = 'G1-351';
const MAX_TRIES = 300;
const MAX_RUN = 4;                 // no run of MORE than 4 consecutive chips ascending, or alternating in parity
const CHIP = 64, CHIP_GAP = 7, ROW_GAP = 8, LANE_PAD = 28;   // .ws-lane padding 12 x 2 + border 2 x 2
const HOUSE = { w: 330, gap: 15 };
const STRIP_GAP = { min: 20, max: 40, default: 28 };   // strip -> houses, fixed (reviewer ruling 2026-09-21: never a 1fr band)
const STACK = { min: 600, max: 677 };                   // the sparse floor (d2 >= 600) and the 4-line fi chrome

/* ------------------------------------------------------------------ pure helpers (the gate imports them) ------------------------------------------------------------------ */

function parity(n) { return n % 2 ? 'odd' : 'even'; }
function pairsOf(n) { return Math.floor(n / 2); }
function other(p) { return p === 'odd' ? 'even' : 'odd'; }
function rangeOf(lo, hi, p) { const out = []; for (let v = lo; v <= hi; v++) if (parity(v) === p) out.push(v); return out; }

/** The longest run of consecutive ascending chips (a run of 1 = no ascent). */
function maxAscRun(order) {
  let best = 1, run = 1;
  for (let i = 1; i < order.length; i++) { run = order[i] > order[i - 1] ? run + 1 : 1; if (run > best) best = run; }
  return best;
}
/** The longest run of consecutive chips alternating in parity. */
function maxAltRun(order) {
  let best = 1, run = 1;
  for (let i = 1; i < order.length; i++) { run = parity(order[i]) !== parity(order[i - 1]) ? run + 1 : 1; if (run > best) best = run; }
  return best;
}
function orderOk(order) { return maxAscRun(order) <= MAX_RUN && maxAltRun(order) <= MAX_RUN; }

/** The strip's outer height for `chips` chips at `perRow` per row (64 px chips, 8 px row gap, the lane's 28 px chrome). */
function stripHeight(chips, perRow) { const rows = Math.ceil(chips / perRow); return rows * CHIP + (rows - 1) * ROW_GAP + LANE_PAD; }

/**
 * The resolved base config for `d` (+ the bank's GLOBAL): every guard runs on the RESULT, never the level index.
 * Throws (a refusal) when the ladder cannot be honest: a 0 in range, a worked pool the range cannot supply, a box
 * count equal to (or under) the open count of a parity, an open count outside the G1 window.
 */
function resolveBase(d, G) {
  if (!d) throw new Error(`${ID}: no difficulty config`);
  const maxN = (G && G.worked && G.worked.maxN) || 10;
  const cfg = {
    range: d.range, chips: d.chips, perRow: d.perRow || d.chips, worked: { count: d.worked.count, split: d.worked.split.slice() },
    boxes: { cols: d.boxes.cols, rows: d.boxes.rows }, splits: d.splits.map((s) => s.slice()), maxN,
  };
  const [lo, hi] = cfg.range;
  if (!Number.isInteger(lo) || !Number.isInteger(hi) || lo < 1 || hi <= lo) throw new Error(`${ID}: range [${lo}, ${hi}] must be integers with 1 <= lo < hi (0 never appears on a page)`);
  if (cfg.chips < 6 || cfg.chips > 12) throw new Error(`${ID}: ${cfg.chips} open chips outside the G1 window [6, 12]`);
  if (cfg.perRow < 1 || cfg.perRow > cfg.chips) throw new Error(`${ID}: perRow ${cfg.perRow}`);
  const ws = cfg.worked.split;
  if (ws.length !== 2 || ws.some((x) => !Number.isInteger(x) || x < 1) || ws[0] + ws[1] !== cfg.worked.count) throw new Error(`${ID}: worked.split [${ws}] must be two positive counts summing to worked.count ${cfg.worked.count} (both parities worked)`);
  if (ws[0] < ws[1]) throw new Error(`${ID}: worked.split [${ws}] must list the larger house first`);
  const per = cfg.boxes.cols * cfg.boxes.rows;
  if (!cfg.splits.length) throw new Error(`${ID}: splits is empty`);
  for (const s of cfg.splits) {
    if (s.length !== 2 || s[0] + s[1] !== cfg.chips + cfg.worked.count) throw new Error(`${ID}: split [${s}] != chips ${cfg.chips} + worked ${cfg.worked.count}`);
    // the worked pool: numerals <= maxN of each parity inside the range; the larger worked count may land on either parity
    for (const p of ['odd', 'even']) {
      const pool = rangeOf(lo, Math.min(hi, maxN), p).length;
      if (pool < ws[0]) throw new Error(`${ID}: only ${pool} ${p} numerals <= ${maxN} in [${lo}, ${hi}] for ${ws[0]} worked`);
      const total = s[p === 'odd' ? 0 : 1];
      if (rangeOf(lo, hi, p).length < total) throw new Error(`${ID}: the range holds ${rangeOf(lo, hi, p).length} ${p} numerals, the split wants ${total}`);
      // the leak guard on EVERY possible open count of this parity (worked ws[0] or ws[1] in this house)
      for (const w of ws) {
        const open = total - w;
        if (open < 1) throw new Error(`${ID}: a ${p} house with ${open} open chips`);
        if (per === open) throw new Error(`${ID}: ${per} boxes in a house with ${open} open chips (a box count equal to the answer count is a leak)`);
        if (per < open) throw new Error(`${ID}: ${per} boxes < ${open} open ${p} chips`);
      }
    }
  }
  cfg.stripH = stripHeight(cfg.chips, cfg.perRow);
  cfg.gap = d.gap == null ? STRIP_GAP.default : d.gap;
  if (!Number.isInteger(cfg.gap) || cfg.gap < STRIP_GAP.min || cfg.gap > STRIP_GAP.max) throw new Error(`${ID}: gap ${cfg.gap} outside ${STRIP_GAP.min}..${STRIP_GAP.max}`);
  cfg.house = { boxes: { ...((d.house && d.house.boxes) || {}) }, layout: { ...((d.house && d.house.layout) || {}) } };
  cfg.houseH = houseHeight(cfg.house.boxes, cfg.house.layout);
  cfg.stack = cfg.stripH + cfg.gap + cfg.houseH;
  if (cfg.stack < STACK.min) throw new Error(`${ID}: stack ${cfg.stripH} + ${cfg.gap} + ${cfg.houseH} = ${cfg.stack} < ${STACK.min} (sparse: the stage must use the page)`);
  if (cfg.stack > STACK.max) throw new Error(`${ID}: stack ${cfg.stripH} + ${cfg.gap} + ${cfg.houseH} = ${cfg.stack} > ${STACK.max} (the 4-line fi chrome)`);
  return cfg;
}

/**
 * The deal (RNG order: the split -> the side of the larger worked count -> the worked numerals (larger house first)
 * -> the open numerals (odd then even) -> the chip order, re-shuffled until it is neither ascending nor alternating
 * for more than 4 consecutive chips). Locale-neutral: no locale input. Returns null when no order satisfies the rule.
 */
function compose(rng, cfg) {
  const [lo, hi] = cfg.range;
  const split = rng.pick(cfg.splits);                                   // [odd, even]
  const total = { odd: split[0], even: split[1] };
  const big = rng.int(0, 1) ? 'odd' : 'even';                           // the house that takes worked.split[0]
  const workedCount = { [big]: cfg.worked.split[0], [other(big)]: cfg.worked.split[1] };
  const worked = {};
  for (const p of [big, other(big)]) worked[p] = rng.sample(rangeOf(lo, Math.min(hi, cfg.maxN), p), workedCount[p]);
  const open = [];
  for (const p of ['odd', 'even']) {
    const pool = rangeOf(lo, hi, p).filter((v) => !worked[p].includes(v));
    const n = total[p] - workedCount[p];
    if (pool.length < n) return null;
    open.push(...rng.sample(pool, n));
  }
  let order = null;
  for (let t = 0; t < MAX_TRIES; t++) { const o = rng.shuffle(open); if (orderOk(o)) { order = o; break; } }
  if (!order) return null;
  return { split: total, worked, order };
}

/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */

function VERIFY_BASE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-oae]');
  if (!root) return ['no odd-and-even root'];
  if (root.dataset.lcsMode) return [`mode "${root.dataset.lcsMode}" has no verify branch (Phase 2)`];
  const nChips = +root.dataset.lcsChips, nWorked = +root.dataset.lcsWorked, nBoxes = +root.dataset.lcsBoxes, maxN = +root.dataset.lcsMaxn;
  const gap = +root.dataset.lcsGap, stack = +root.dataset.lcsStack;
  const split = root.dataset.lcsSplit.split(',').map(Number);           // [odd, even]
  const [lo, hi] = root.dataset.lcsRange.split(',').map(Number);
  const order = root.dataset.lcsOrder.split(',');
  const FLOOR = 44, NUMERAL = 26;
  const par = (n) => (n % 2 ? 'odd' : 'even');
  const isZeroText = (t) => /(?<![\d.,])0(?![\d.,])/.test(t);
  const content = (el) => !!el.closest('[data-ws-content]');
  // chips
  const chips = [...root.querySelectorAll('[data-lcs-val]')];
  if (chips.length !== nChips) fails.push(`${chips.length} chips, config says ${nChips}`);
  if (nChips < 6 || nChips > 12) fails.push(`${nChips} open chips outside [6, 12]`);
  const vals = chips.map((c) => +c.dataset.lcsVal);
  if (new Set(vals).size !== vals.length) fails.push('a chip value twice');
  const seen = { odd: 0, even: 0 };
  chips.forEach((c, i) => {
    const v = vals[i], L = `chip ${i + 1}`;
    if (!Number.isInteger(v) || v < lo || v > hi) fails.push(`${L}: ${v} outside [${lo}, ${hi}]`);
    if (v === 0) fails.push(`${L}: a 0 chip`);
    if (c.textContent.trim() !== String(v)) fails.push(`${L}: prints "${c.textContent.trim()}" not ${v}`);
    if (c.closest('[data-lcs-house]')) fails.push(`${L}: an open chip inside a house`);
    if (!content(c)) fails.push(`${L}: outside [data-ws-content]`);
    for (const a of c.getAttributeNames()) if (/parity|odd|even|correct|answer/i.test(a) || /^(odd|even)$/i.test(c.getAttribute(a))) fails.push(`${L}: carries a parity stamp ${a}="${c.getAttribute(a)}"`);
    if (c.querySelector('[data-lcs-pairdots]') || (c.parentElement && c.parentElement.querySelector(':scope > [data-lcs-pairdots]'))) fails.push(`${L}: a pair cue beside an open chip`);
    const r = c.getBoundingClientRect();
    if (r.width < FLOOR - 0.6 || r.height < FLOOR - 0.6) fails.push(`${L}: ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < ${FLOOR}`);
    if (parseFloat(getComputedStyle(c).fontSize) < NUMERAL) fails.push(`${L}: numeral ${getComputedStyle(c).fontSize} < ${NUMERAL}`);
    seen[par(v)]++;
  });
  // the chip order: neither ascending nor alternating for more than 4 consecutive chips
  let asc = 1, alt = 1, ascMax = 1, altMax = 1;
  for (let i = 1; i < vals.length; i++) { asc = vals[i] > vals[i - 1] ? asc + 1 : 1; alt = par(vals[i]) !== par(vals[i - 1]) ? alt + 1 : 1; ascMax = Math.max(ascMax, asc); altMax = Math.max(altMax, alt); }
  if (ascMax > 4) fails.push(`chip order ascends for ${ascMax} consecutive chips`);
  if (altMax > 4) fails.push(`chip order alternates parity for ${altMax} consecutive chips`);
  // houses
  const houses = [...root.querySelectorAll('[data-lcs-house]')];
  if (houses.length !== 2) fails.push(`${houses.length} houses`);
  const hp = houses.map((h) => h.dataset.lcsHouse);
  if (hp.join(',') !== order.join(',') || new Set(hp).size !== 2 || hp.some((p) => p !== 'odd' && p !== 'even')) fails.push(`houses ${hp.join(',')} != the bank order ${order.join(',')}`);
  const signs = houses.map((h) => (h.querySelector('[data-lcs-sign]') || { textContent: '' }).textContent.trim());
  if (signs.some((s) => !s)) fails.push('a house without a sign');
  if (signs[0] && signs[0].toLowerCase() === (signs[1] || '').toLowerCase()) fails.push('both signs read the same word');
  if (signs.some((s) => /\d/.test(s))) fails.push('a sign carries a digit');
  houses.forEach((h) => {
    const s = h.querySelector('[data-lcs-sign]');
    if (s && s.scrollWidth > s.clientWidth + 0.6) fails.push(`the ${h.dataset.lcsHouse} sign "${s.textContent.trim()}" overflows its pill (refuse the literal, never shrink the font)`);
    if (s && s.getBoundingClientRect().width > 260.6) fails.push(`the ${h.dataset.lcsHouse} sign is ${s.getBoundingClientRect().width.toFixed(1)} px > 260`);
    if (!content(h)) fails.push(`the ${h.dataset.lcsHouse} house is outside [data-ws-content]`);
  });
  // worked tiles + pair cues
  const givens = [...root.querySelectorAll('[data-lcs-given]')];
  if (givens.length !== nWorked) fails.push(`${givens.length} worked tiles, config says ${nWorked}`);
  const wVals = givens.map((g) => +g.dataset.lcsGiven);
  if (new Set([...wVals, ...vals]).size !== wVals.length + vals.length) fails.push('a worked numeral repeats a chip (or itself)');
  const workedIn = { odd: 0, even: 0 };
  givens.forEach((g, i) => {
    const n = wVals[i], L = `worked ${i + 1} (${n})`;
    const house = g.closest('[data-lcs-house]');
    if (!house) { fails.push(`${L}: not inside a house`); return; }
    if (par(n) !== house.dataset.lcsHouse) fails.push(`${L}: sits in the ${house.dataset.lcsHouse} house`);
    if (!Number.isInteger(n) || n < 1 || n > maxN) fails.push(`${L}: outside 1..${maxN}`);
    if (n < lo || n > hi) fails.push(`${L}: outside the range [${lo}, ${hi}]`);
    const dots = g.querySelectorAll('[data-lcs-pairdots]');
    if (dots.length !== 1) fails.push(`${L}: ${dots.length} pair cues`);
    const numeralEl = [...g.querySelectorAll('span')].find((e) => e.textContent.trim() === String(n));
    if (!numeralEl) fails.push(`${L}: the numeral is not printed`);
    else if (parseFloat(getComputedStyle(numeralEl).fontSize) < NUMERAL) fails.push(`${L}: numeral font < ${NUMERAL}`);
    workedIn[par(n)]++;
  });
  if (workedIn.odd < 1 || workedIn.even < 1) fails.push(`worked parities odd ${workedIn.odd} / even ${workedIn.even} (both must be worked)`);
  const cues = [...root.querySelectorAll('[data-lcs-pairdots]')];
  if (cues.length !== nWorked) fails.push(`${cues.length} pair cues, want ${nWorked}`);
  cues.forEach((d, i) => {
    const L = `cue ${i + 1}`;
    const g = d.closest('[data-lcs-given]');
    if (!g) { fails.push(`${L}: a pair cue with no worked-tile ancestor`); return; }
    const n = +g.dataset.lcsGiven;
    if (+d.dataset.lcsN !== n) fails.push(`${L}: stamps n ${d.dataset.lcsN} under a worked ${n}`);
    if (+d.dataset.lcsPairs !== Math.floor(n / 2)) fails.push(`${L}: pairs ${d.dataset.lcsPairs} != floor(${n}/2)`);
    if (+d.dataset.lcsSingle !== n % 2) fails.push(`${L}: single ${d.dataset.lcsSingle} != ${n} % 2`);
    const pair = d.querySelectorAll('[data-lcs-dot="pair"]').length, single = d.querySelectorAll('[data-lcs-dot="single"]').length;
    if (pair !== 2 * Math.floor(n / 2) || single !== n % 2) fails.push(`${L}: ${pair} pair dots + ${single} single for ${n}`);
    const sd = d.querySelector('[data-lcs-dot="single"]');
    if (sd && (sd.getAttribute('fill') !== 'none' || !sd.getAttribute('stroke'))) fails.push(`${L}: the single is not a hollow ring`);
  });
  // the split (chips + worked) === the config's
  const tot = { odd: seen.odd + workedIn.odd, even: seen.even + workedIn.even };
  if (tot.odd !== split[0] || tot.even !== split[1]) fails.push(`parity split odd ${tot.odd} / even ${tot.even} != ${split[0]} / ${split[1]}`);
  // boxes: per house === nBoxes, every one empty, > open of that parity, !== it
  houses.forEach((h) => {
    const p = h.dataset.lcsHouse;
    const boxes = [...h.querySelectorAll('.ws-blankbox')];
    if (boxes.length !== nBoxes) fails.push(`${p} house: ${boxes.length} boxes, config says ${nBoxes}`);
    const open = seen[p];
    if (boxes.length === open) fails.push(`${p} house: ${boxes.length} boxes = its ${open} open chips (leak)`);
    if (boxes.length < open) fails.push(`${p} house: ${boxes.length} boxes < ${open} open chips`);
    boxes.forEach((b, i) => {
      if (b.textContent.trim()) fails.push(`${p} house box ${i + 1}: pre-filled "${b.textContent.trim()}"`);
      if (b.getAttribute('data-lcs-answer') !== '') fails.push(`${p} house box ${i + 1}: data-lcs-answer "${b.getAttribute('data-lcs-answer')}"`);
      const r = b.getBoundingClientRect();
      if (r.height < FLOOR - 0.6 || r.width < FLOOR - 0.6) fails.push(`${p} house box ${i + 1}: ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < ${FLOOR}`);
      const hb = h.getBoundingClientRect();
      if (r.right > hb.right + 0.6 || r.bottom > hb.bottom + 0.6 || r.left < hb.left - 0.6) fails.push(`${p} house box ${i + 1}: outside the house`);
    });
  });
  // the stage is top-anchored with a fixed gap: no blank band inside it, the slack falls below (sparse floor)
  const stripEl = root.querySelector('[data-lcs-strip]');
  if (stripEl && houses.length === 2) {
    const sb = stripEl.getBoundingClientRect(), hb = houses.map((h) => h.getBoundingClientRect());
    const band = Math.min(...hb.map((b) => b.top)) - sb.bottom;
    if (Math.abs(band - gap) > 1) fails.push(`the strip -> houses band is ${band.toFixed(1)} px, config gap ${gap}`);
    if (band > 40) fails.push(`a ${band.toFixed(1)} px blank band inside the stage (sparse)`);
    const stageH = Math.max(...hb.map((b) => b.bottom)) - sb.top;
    if (Math.abs(stageH - stack) > 1.5) fails.push(`stage ${stageH.toFixed(1)} px, config stack ${stack}`);
    if (stageH < 600) fails.push(`stage ${stageH.toFixed(1)} px < 600 (sparse)`);
    if (Math.abs(sb.top - root.getBoundingClientRect().top) > 1) fails.push('the strip is not top-anchored');
  }
  // fences
  if (root.querySelector('img')) fails.push('an <img> on a numeral face');
  if (root.querySelector('[data-lcs-prim="ten-frame"]')) fails.push('a ten-frame on the page');
  if (root.querySelector('[data-lcs-correct]')) fails.push('a data-lcs-correct stamp on the base');
  if ([...root.querySelectorAll('[data-lcs-answer]')].some((b) => b.getAttribute('data-lcs-answer') !== '')) fails.push('a stamped answer');
  // no text node anywhere in the body equals / contains a standalone 0; no stray text outside chips, signs, numerals
  const walker = document.createTreeWalker(document.querySelector('.ws-body') || root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const t = node.textContent.trim();
    if (!t) continue;
    if (isZeroText(t)) fails.push(`a 0 on the page ("${t}")`);
    if (/[÷:=+]/.test(t)) fails.push(`a glyph on the base ("${t}")`);
    const p = node.parentElement;
    if (root.contains(node) && !p.closest('[data-lcs-val], [data-lcs-sign], [data-lcs-given]')) fails.push(`stray text "${t}"`);
  }
  if (!chips.length || !houses.length) fails.push('non-vacuity: no chips or no houses');
  return fails;
}

/* ------------------------------------------------------------------ Phase 2: the five faces (design §3; record _work/G1-351-faces.md) ------------------------------------------------------------------ */
/*
 * ONE additive `mode` knob (`proof` / `share` / `ones` / `sums` / `count`),
 * dispatched in `_buildWith` BEFORE the base path touches the RNG. Every guard
 * keys on the RESOLVED config (`resolve<Face>(d)`), never the level index; a
 * config that cannot be honest REFUSES (throw), never a filler. Face keys are
 * named so the base's own d2 keys (chips / perRow(9) / worked / boxes / splits)
 * ride along in the emitted D without being read: proof reads `dotsPerRow` /
 * `dotPx` / `dotGap`, the picture faces override `perRow` explicitly.
 *
 * SPARSE (the nt10-D ruling): every face stage is top-anchored under the
 * instruction and FILLS the body — F1 a `.ws-cardgrid` whose cards grow (the
 * white dots panel takes the growth: the pencil-ring zone), F2 / F5 a lane grid
 * `minmax(106px, 1fr)` whose lanes own their band, F3 / F4 a two-column lane
 * grid under the rule strip / parity table. The elements are sized to the
 * task (F3 boxes 64 with 34 px digits, F3 / F4 tick circles 60, F1 dots r 10 at
 * pitch 29) so nothing floats: verify() measures the fill and bounds the blank
 * inside a card / lane; the gate poisons each face's sparse layout.
 */
const PROOF = { dot: 20, gap: 9, perRow: 10, boxW: 44, remW: 36, eqH: 56, cardChrome: 28, gridGap: 14 };   // card = padding 12 x 2 + border 2 x 2
const PICS = { lanePad: 4, rowGap: 6, plateW: 64, plateGap: 8, leftW: 84, pillsW: 106, pairsW: 56, lanePadX: 16, tileGapY: 6, pileGap: { share: 4, count: 7 } };
const COLS = { headH: 28, laneGap: 8, colGap: 14, colW: 330, under: 12, cell: 76, tickGap: 8, lanePadY: 4, lanePadX: 8, laneInner: 310 };
const ONES = { box: 64, digitPx: 34, circle: 60, ruleH: { one: 40, two: 60 } };
const SUMS = { px: 30, circle: 60, tableH: 92 };
const LANE_INNER = 639;
const BW_THEME = /(?:^|[\s_-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;    // the cache theme name ('animals bw') or a library dir with the localized marker
const FACE_BUILD = { proof: '_buildProof', share: '_buildShare', ones: '_buildOnes', sums: '_buildSums', count: '_buildCount' };

function must(cond, msg) { if (!cond) throw new Error(`${ID}: ${msg}`); }
function isAsc(a) { return a.length > 1 && a.every((v, i) => !i || v > a[i - 1]); }
function shuffledNotAsc(rng, arr) { let o = arr; for (let t = 0; t < MAX_TRIES; t++) { o = rng.shuffle(arr); if (!isAsc(o) && !isAsc(o.slice().reverse())) return o; } return null; }
/** k distinct numerals of the range with exactly `split` = [odd, even] (throws when the pools are short). */
function splitSample(rng, [lo, hi], split) {
  const odds = rangeOf(lo, hi, 'odd'), evens = rangeOf(lo, hi, 'even');
  must(odds.length >= split[0] && evens.length >= split[1], `[${lo}, ${hi}] holds ${odds.length} odd / ${evens.length} even numerals, the split wants ${split[0]} / ${split[1]}`);
  return [...rng.sample(odds, split[0]), ...rng.sample(evens, split[1])];
}
function rangeGuard(range, minLo, maxHi, what) {
  must(Array.isArray(range) && range.length === 2 && range.every(Number.isInteger), `${what}: range must be [lo, hi]`);
  must(range[0] >= minLo && range[1] <= maxHi && range[1] > range[0], `${what}: range [${range}] outside ${minLo}..${maxHi}`);
}

/** F1 — the resolved proof config: cards in [6, 16] (2 columns), range 2..20, the split, minTwoRow reachable, the stack under 677. */
function resolveProof(d) {
  must(d.mode === 'proof', 'resolveProof on a non-proof config');
  rangeGuard(d.range, 2, 20, 'proof');
  const cards = d.cards, split = (d.split || [Math.ceil(cards / 2), Math.floor(cards / 2)]).slice();
  must(Number.isInteger(cards) && cards >= 6 && cards <= 16 && cards % 2 === 0, `proof: cards ${cards} must be even in [6, 16]`);
  must(split.length === 2 && split.every((x) => Number.isInteger(x) && x >= 1) && split[0] + split[1] === cards, `proof: split [${split}] != cards ${cards}`);
  const perRow = d.dotsPerRow || PROOF.perRow, dot = d.dotPx || PROOF.dot, gap = d.dotGap || PROOF.gap, minTwoRow = d.minTwoRow || 0;
  must(Number.isInteger(minTwoRow) && minTwoRow >= 0 && minTwoRow <= cards, `proof: minTwoRow ${minTwoRow}`);
  const twoRowPool = rangeOf(d.range[0], d.range[1], 'odd').concat(rangeOf(d.range[0], d.range[1], 'even')).filter((n) => n > perRow).length;
  must(twoRowPool >= minTwoRow, `proof: only ${twoRowPool} numerals > ${perRow} in [${d.range}] for minTwoRow ${minTwoRow}`);
  must(Math.ceil(d.range[1] / perRow) <= 2, `proof: ${d.range[1]} needs ${Math.ceil(d.range[1] / perRow)} dot rows (max 2)`);
  const pitch = dot + gap, panelMin = 2 * pitch - gap + 12, cardMin = PROOF.eqH + 10 + panelMin, rows = cards / 2;
  const stack = rows * (cardMin + PROOF.cardChrome) + (rows - 1) * PROOF.gridGap;
  must(stack <= STACK.max, `proof: ${rows} cards of ${cardMin + PROOF.cardChrome} = ${stack} > ${STACK.max} (the 4-line fi chrome)`);
  return { mode: 'proof', range: d.range.slice(), cards, rows, cols: 2, split, minTwoRow, perRow, dot, gap, pitch, panelMin, cardMin, stack, boxW: PROOF.boxW, remW: PROOF.remW };
}
function composeProof(rng, cfg) {
  let ns = null;
  for (let t = 0; t < MAX_TRIES; t++) { const s = splitSample(rng, cfg.range, cfg.split); if (s.filter((n) => n > cfg.perRow).length >= cfg.minTwoRow) { ns = s; break; } }
  if (!ns) return null;
  const order = shuffledNotAsc(rng, ns);
  return order ? { order } : null;
}

/** F2 / F5 — the picture lanes: 6 lanes, pictures >= 44, the pile + columns <= 639, the lane 106, the stack <= 677. */
function resolvePics(d, kind) {
  must(d.mode === kind, `resolvePics: mode ${d.mode} != ${kind}`);
  const hiMax = kind === 'share' ? 12 : 18, loMin = kind === 'share' ? 3 : 8;
  rangeGuard(d.range, loMin, hiMax, kind);
  const lanes = d.lanes, iconPx = d.iconPx, perRow = d.perRow, split = (d.split || [Math.ceil(lanes / 2), Math.floor(lanes / 2)]).slice();
  must(Number.isInteger(lanes) && lanes >= 6 && lanes <= 12, `${kind}: lanes ${lanes} outside the G1 window [6, 12]`);
  must(Number.isInteger(iconPx) && iconPx >= 44, `${kind}: iconPx ${iconPx} < the G1 floor 44`);
  must(Number.isInteger(perRow) && perRow >= 1, `${kind}: perRow ${perRow}`);
  must(split.length === 2 && split.every((x) => Number.isInteger(x) && x >= 1) && split[0] + split[1] === lanes, `${kind}: split [${split}] != lanes ${lanes}`);
  const pileGap = PICS.pileGap[kind], pileW = perRow * iconPx + (perRow - 1) * pileGap;
  const picRows = Math.ceil(d.range[1] / perRow);
  must(picRows <= 2, `${kind}: ${d.range[1]} pictures at ${perRow} per row = ${picRows} rows (max 2)`);
  const pills = d.pills !== false;
  const cols = kind === 'share' ? PICS.plateW + PICS.plateGap + PICS.plateW + PICS.plateGap + PICS.leftW : PICS.pairsW;
  const rowW = pileW + 12 + cols + (pills ? (kind === 'share' ? 8 : 12) + PICS.pillsW : 0);
  must(rowW <= LANE_INNER, `${kind}: the lane row ${pileW} + 12 + ${cols}${pills ? ' + pills ' + PICS.pillsW : ''} = ${rowW} > ${LANE_INNER}`);
  const pileH = picRows * iconPx + (picRows - 1) * PICS.tileGapY;
  const laneH = Math.max(pileH, pills ? 94 : 66) + 2 * PICS.lanePad + 4;
  const stack = lanes * laneH + (lanes - 1) * PICS.rowGap;
  must(stack <= STACK.max, `${kind}: ${lanes} lanes of ${laneH} = ${stack} > ${STACK.max} (the 4-line fi chrome)`);
  return { mode: kind, range: d.range.slice(), lanes, iconPx, perRow, split, pills, pileW, rowW, laneH, stack, nameMax: null };
}
function composePics(rng, cfg, pool, namePool) {
  if (pool.length < cfg.lanes) return null;
  const nouns = rng.sample(pool, cfg.lanes);
  const ns = splitSample(rng, cfg.range, cfg.split);
  const order = shuffledNotAsc(rng, ns);
  if (!order) return null;
  const names = cfg.mode === 'share' ? order.map(() => rng.sample(namePool, 2)) : null;
  return { order, nouns, names };
}

/** F3 — the ones face: 10..99, an even item count in [8, 16] over 2 columns, every ones digit covered at most `maxOnesRepeat` times, the parities and the high half, the stack under 677 with a two-line rule. */
function resolveOnes(d) {
  must(d.mode === 'ones', 'resolveOnes on a non-ones config');
  rangeGuard(d.range, 10, 99, 'ones');
  const items = d.items, rule = d.rule !== false, cover = d.onesCover !== false, maxRep = d.maxOnesRepeat == null ? 2 : d.maxOnesRepeat;
  const minEachParity = d.minEachParity || 0, minHigh = d.minHigh || 0;
  must(Number.isInteger(items) && items >= 8 && items <= 16 && items % 2 === 0, `ones: items ${items} must be even in [8, 16]`);
  must(Number.isInteger(maxRep) && maxRep >= 1, `ones: maxOnesRepeat ${maxRep}`);
  if (cover) must(items >= 10 && items <= 10 * maxRep, `ones: ${items} items cannot cover every ones digit 0-9 at most ${maxRep} times (10..${10 * maxRep})`);
  must(!cover || d.distinctOnes !== true || items <= 10, `ones: distinctOnes with ${items} items is impossible (ten ones digits) — use maxOnesRepeat`);
  must(minEachParity * 2 <= items, `ones: minEachParity ${minEachParity} x 2 > ${items}`);
  must(minHigh <= items && (minHigh === 0 || d.range[1] >= 50), `ones: minHigh ${minHigh} needs numbers in 50..${d.range[1]}`);
  const box = d.box || ONES.box, digitPx = d.digitPx || ONES.digitPx, circle = d.circle || ONES.circle, rows = items / 2;
  must(box >= 48 && circle >= 44 && digitPx >= 22, `ones: box ${box} / circle ${circle} / digit ${digitPx} below the floors 48 / 44 / 22`);
  must(box + 4 + box + 12 + COLS.cell + COLS.tickGap + COLS.cell <= COLS.laneInner, `ones: the lane row ${box + 4 + box + 12 + 2 * COLS.cell + COLS.tickGap} > ${COLS.laneInner}`);
  const laneMin = Math.max(box, circle) + 2 * COLS.lanePadY + 4;
  const stack = (rule ? ONES.ruleH.two : 0) + (rule ? COLS.under : 0) + COLS.headH + COLS.laneGap + rows * laneMin + (rows - 1) * COLS.laneGap;
  must(stack <= STACK.max, `ones: ${rows} lanes of ${laneMin} under a two-line rule = ${stack} > ${STACK.max}`);
  return { mode: 'ones', range: d.range.slice(), items, rows, cols: 2, rule, cover, maxRep, minEachParity, minHigh, box, digitPx, circle, laneMin, stack };
}
function composeOnes(rng, cfg) {
  const [lo, hi] = cfg.range;
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let t = 0; t < MAX_TRIES; t++) {
    let ones;
    if (cfg.cover) { ones = digits.slice(); while (ones.length < cfg.items) ones.push(rng.pick(digits)); }
    else ones = Array.from({ length: cfg.items }, () => rng.pick(digits));
    const counts = {}; ones.forEach((o) => { counts[o] = (counts[o] || 0) + 1; });
    if (Object.values(counts).some((c) => c > cfg.maxRep)) continue;
    const highIdx = new Set(rng.sample(ones.map((_, i) => i), cfg.minHigh));
    const vals = [], seen = new Set();
    let okAll = true;
    for (let i = 0; i < ones.length; i++) {
      const tensPool = [];
      for (let tn = 1; tn <= 9; tn++) { const v = tn * 10 + ones[i]; if (v >= lo && v <= hi && !seen.has(v) && (!highIdx.has(i) || v >= 50)) tensPool.push(tn); }
      if (!tensPool.length) { okAll = false; break; }
      const v = rng.pick(tensPool) * 10 + ones[i]; vals.push(v); seen.add(v);
    }
    if (!okAll) continue;
    const par = { odd: vals.filter((v) => v % 2).length, even: vals.filter((v) => !(v % 2)).length };
    if (par.odd < cfg.minEachParity || par.even < cfg.minEachParity) continue;
    if (vals.filter((v) => v >= 50).length < cfg.minHigh) continue;
    const order = shuffledNotAsc(rng, vals);
    if (order) return { order };
  }
  return null;
}

/** F4 — the sums face: two addends per row (terms 3 = d3, unbuilt), the four parity cases each at least `cases[k]`, every addend distinct, the table, the stack. */
function resolveSums(d) {
  must(d.mode === 'sums', 'resolveSums on a non-sums config');
  rangeGuard(d.range, 10, 999, 'sums');
  must((d.terms || 2) === 2, `sums: terms ${d.terms} is the unpublished d3 shape (not built)`);
  const items = d.items, table = d.table !== false, cases = d.cases || { ee: 0, oo: 0, eo: 0, oe: 0 };
  must(Number.isInteger(items) && items >= 8 && items <= 16 && items % 2 === 0, `sums: items ${items} must be even in [8, 16]`);
  const keys = ['ee', 'oo', 'eo', 'oe'];
  must(Object.keys(cases).every((k) => keys.includes(k)) && keys.every((k) => Number.isInteger(cases[k] || 0) && (cases[k] || 0) >= 0), `sums: cases ${JSON.stringify(cases)}`);
  const need = keys.reduce((s, k) => s + (cases[k] || 0), 0);
  must(need <= items, `sums: cases sum ${need} > items ${items}`);
  const pool = { odd: rangeOf(d.range[0], d.range[1], 'odd').length, even: rangeOf(d.range[0], d.range[1], 'even').length };
  must(pool.odd >= items && pool.even >= items, `sums: [${d.range}] holds ${pool.odd} odd / ${pool.even} even addends for ${items} rows`);
  const circle = d.circle || SUMS.circle, px = d.px || SUMS.px, rows = items / 2;
  must(circle >= 44 && px >= 22, `sums: circle ${circle} / px ${px} below the floors 44 / 22`);
  const laneMin = circle + 2 * COLS.lanePadY + 4;
  const stack = (table ? SUMS.tableH + COLS.under : 0) + COLS.headH + COLS.laneGap + rows * laneMin + (rows - 1) * COLS.laneGap;
  must(stack <= STACK.max, `sums: ${rows} lanes of ${laneMin} under the table = ${stack} > ${STACK.max}`);
  return { mode: 'sums', range: d.range.slice(), items, rows, cols: 2, terms: 2, table, cases: { ee: cases.ee || 0, oo: cases.oo || 0, eo: cases.eo || 0, oe: cases.oe || 0 }, circle, px, laneMin, stack };
}
function composeSums(rng, cfg) {
  const [lo, hi] = cfg.range;
  const keys = ['ee', 'oo', 'eo', 'oe'];
  const list = [];
  for (const k of keys) for (let i = 0; i < cfg.cases[k]; i++) list.push(k);
  while (list.length < cfg.items) list.push(rng.pick(keys));
  const caseOrder = rng.shuffle(list);
  const used = new Set();
  const pick = (p) => { const pool = rangeOf(lo, hi, p).filter((v) => !used.has(v)); if (!pool.length) return null; const v = rng.pick(pool); used.add(v); return v; };
  const rows = [];
  for (const k of caseOrder) {
    const a = pick(k[0] === 'e' ? 'even' : 'odd'), b = pick(k[1] === 'e' ? 'even' : 'odd');
    if (a == null || b == null) return null;
    rows.push({ a, b, k });
  }
  return { rows };
}

/* ------------------------------------------------------------------ verify (page side) — the faces ------------------------------------------------------------------ */

function VERIFY_FACE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-oae]');
  if (!root) return ['no odd-and-even root'];
  const mode = root.dataset.lcsMode;
  const D = root.dataset;
  const R = (el) => el.getBoundingClientRect();
  const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
  const bodyR = R(body), footTop = R(foot).top;
  const par = (n) => (n % 2 ? 'odd' : 'even');
  const isZeroText = (t) => /(?<![\d.,])0(?![\d.,])/.test(t);
  const BW = /(?:^|[\s_-])(bw|sw|bn|nb|zw|sh|pb|mv|sv)$/i;
  const G1 = 44;
  const fs = (el) => parseFloat(getComputedStyle(el).fontSize);
  // ---- common: stamps, answer hiding, fences, top-anchoring
  if (!root.closest('[data-ws-content]')) fails.push('the face root is outside [data-ws-content]');
  if (Math.abs(R(root).top - bodyR.top) > 1) fails.push(`the stage sits ${(R(root).top - bodyR.top).toFixed(1)} px under the body top (not top-anchored)`);
  if (root.querySelector('[data-lcs-prim="ten-frame"]')) fails.push('a ten-frame on the page');
  [...root.querySelectorAll('[data-lcs-answer]')].forEach((b) => { if (b.getAttribute('data-lcs-answer') !== '') fails.push(`a stamped answer "${b.getAttribute('data-lcs-answer')}"`); });
  [...root.querySelectorAll('.ws-blankbox')].forEach((b, i) => { if (b.textContent.trim()) fails.push(`box ${i + 1}: pre-filled "${b.textContent.trim()}"`); if (b.getAttribute('data-lcs-answer') !== '') fails.push(`box ${i + 1}: data-lcs-answer "${b.getAttribute('data-lcs-answer')}"`); });
  [...root.querySelectorAll('[data-lcs-correct]')].forEach((c) => { if (/\d/.test(c.textContent)) fails.push(`a data-lcs-correct stamp on an element printing a numeral ("${c.textContent.trim()}")`); });
  [...root.querySelectorAll('[data-lcs-val], [data-lcs-given], [data-lcs-num], [data-lcs-pv], [data-lcs-sum]')].forEach((c) => { for (const a of c.getAttributeNames()) if (/parity|odd|even|correct|answer/i.test(a)) fails.push(`a parity stamp ${a} on a numeral element`); });
  if (root.querySelector('[data-lcs-pairdots]')) fails.push('a pair cue on a face');
  [...root.querySelectorAll('.ws-blankbox, [data-lcs-pile], [data-lcs-dots]')].forEach((c) => { for (const at of c.getAttributeNames()) if (/parity|odd|even|correct/i.test(at)) fails.push(`a parity stamp ${at} on an answer surface`); });
  const lowest = Math.max(...[...root.querySelectorAll('*')].filter((el) => R(el).width && R(el).height).map((el) => R(el).bottom));
  if (lowest > footTop + 0.6) fails.push(`the lowest ink ${lowest.toFixed(0)} is under the footer band at ${footTop.toFixed(0)}`);
  // the text scan: no standalone 0 outside the rule strip / the place-value boxes / the sum expressions; no ÷; no ':' between digits
  const zeroOk = (el) => !!el.closest('[data-lcs-rule], [data-lcs-pv], [data-lcs-sum]');
  const textNodes = [];
  { const w = document.createTreeWalker(body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const t = n.textContent.trim(); if (t) textNodes.push({ t, p: n.parentElement }); } }
  for (const { t, p } of textNodes) {
    if (isZeroText(t) && !zeroOk(p)) fails.push(`a 0 on the page ("${t}")`);
    if (/÷/.test(t) || /\d\s*:\s*\d/.test(t)) fails.push(`a division glyph ("${t}")`);
  }
  const fillsBody = (el, what) => { const r = R(el); if (Math.abs(r.bottom - bodyR.bottom) > 3) fails.push(`${what} ends ${(bodyR.bottom - r.bottom).toFixed(1)} px above the body bottom (sparse: the stage must fill the body)`); };
  const pillsCheck = (lane, n, L) => {
    const pills = [...lane.querySelectorAll('[data-lcs-pill]')];
    if (pills.length !== 2) { fails.push(`${L}: ${pills.length} pills`); return; }
    const words = pills.map((p) => p.textContent.trim());
    if (!words[0] || !words[1] || words[0].toLowerCase() === words[1].toLowerCase()) fails.push(`${L}: pill words ${JSON.stringify(words)}`);
    if (words.some((w) => /\d/.test(w))) fails.push(`${L}: a pill prints a digit`);
    const keys = pills.map((p) => p.dataset.lcsPill);
    if (keys.slice().sort().join(',') !== 'even,odd') fails.push(`${L}: pill keys ${keys}`);
    const correct = pills.filter((p) => p.dataset.lcsCorrect === '1');
    if (correct.length !== 1) fails.push(`${L}: ${correct.length} correct pills`);
    else if (correct[0].dataset.lcsPill !== par(n)) fails.push(`${L}: the correct pill is ${correct[0].dataset.lcsPill} for ${n}`);
    pills.forEach((p) => { const r = R(p); if (r.height < G1 - 0.6) fails.push(`${L}: pill ${r.height.toFixed(1)} < ${G1} high`); if (r.width > 106.6) fails.push(`${L}: pill "${p.textContent.trim()}" ${r.width.toFixed(1)} > 106 wide (refuse the literal, never shrink the font)`); if (p.scrollWidth > p.clientWidth + 0.6) fails.push(`${L}: pill "${p.textContent.trim()}" overflows`); if (fs(p) < 17) fails.push(`${L}: pill font ${fs(p)} < 17`); });
  };
  // the blank INSIDE a lane = its content-box height minus the tallest span of its children (the lane's own 4 px padding + 2 px border are its frame, not blank)
  const laneBlank = (lane) => { const cs = getComputedStyle(lane); const inner = lane.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom); let top = Infinity, bottom = -Infinity; [...lane.children].forEach((c) => { const r = R(c); if (!r.height) return; top = Math.min(top, r.top); bottom = Math.max(bottom, r.bottom); }); return inner - (bottom - top); };
  const laneGrid = (lanes, what, gapMax, blankMax) => {
    if (!lanes.length) return;
    for (let i = 1; i < lanes.length; i++) { const g = R(lanes[i]).top - R(lanes[i - 1]).bottom; if (g > gapMax + 1) fails.push(`${what} ${i} -> ${i + 1}: a ${g.toFixed(1)} px band between lanes (sparse)`); }
    lanes.forEach((l, i) => { const b = laneBlank(l); if (b > blankMax) fails.push(`${what} ${i + 1}: ${b.toFixed(1)} px of blank inside the lane > ${blankMax} (sparse)`); const r = R(l); if (r.right - r.left > 675.6) fails.push(`${what} ${i + 1}: ${(r.right - r.left).toFixed(1)} wide`); });
  };
  const imgsOf = (pile, n, L, minPx) => {
    const imgs = [...pile.querySelectorAll('img')];
    if (imgs.length !== n) fails.push(`${L}: ${imgs.length} pictures for n ${n}`);
    const srcs = new Set(imgs.map((i) => i.getAttribute('src')));
    if (srcs.size !== 1) fails.push(`${L}: ${srcs.size} distinct pictures in one pile`);
    imgs.forEach((im, j) => { if (!im.complete || im.naturalWidth === 0) fails.push(`${L}: picture ${j + 1} broken`); const r = R(im); if (r.width < minPx - 0.6 || r.height < minPx - 0.6) fails.push(`${L}: picture ${j + 1} ${r.width.toFixed(1)} < ${minPx}`); if (im.getAttribute('alt')) fails.push(`${L}: alt names the picture`); });
    const src = decodeURIComponent(imgs[0] ? imgs[0].getAttribute('src') : '');
    const parts = src.split('/'); const dir = parts[parts.length - 2] || '';
    if (BW.test(dir)) fails.push(`${L}: a B&W theme picture (${dir})`);
    return src;
  };

  if (mode === 'proof') {
    const cards = [...root.querySelectorAll('[data-lcs-proof]')];
    const nCards = +D.lcsCards, [lo, hi] = D.lcsRange.split(',').map(Number), split = D.lcsSplit.split(',').map(Number), minTwoRow = +D.lcsMinTwoRow, dot = +D.lcsDot, pitch = +D.lcsPitch, perRow = +D.lcsPerRow;
    if (cards.length !== nCards) fails.push(`${cards.length} cards, config says ${nCards}`);
    if (nCards < 8 || nCards > 16) fails.push(`${nCards} items outside the G2 window [8, 16]`);
    const ns = cards.map((c) => +c.dataset.lcsN);
    if (new Set(ns).size !== ns.length) fails.push('a numeral twice');
    if (isAscOrder(ns)) fails.push('the cards ascend');
    let twoRow = 0;
    const seen = { odd: 0, even: 0 };
    cards.forEach((c, i) => {
      const n = ns[i], L = `card ${i + 1} (${n})`;
      if (!Number.isInteger(n) || n < lo || n > hi) fails.push(`${L}: outside [${lo}, ${hi}]`);
      seen[par(n)]++;
      const panel = c.querySelector('[data-lcs-dots]');
      if (!panel) { fails.push(`${L}: no dots panel`); return; }
      if (+panel.dataset.lcsN !== n) fails.push(`${L}: panel stamps ${panel.dataset.lcsN}`);
      const circles = [...panel.querySelectorAll('circle')];
      if (circles.length !== n) fails.push(`${L}: ${circles.length} dots for ${n}`);
      circles.forEach((k) => { if (+k.getAttribute('r') < 8) fails.push(`${L}: a dot r ${k.getAttribute('r')} < 8`); if (k.getAttribute('fill') === 'none' || k.getAttribute('stroke')) fails.push(`${L}: a pre-paired / hollow dot (the child draws the rings)`); });
      if (panel.textContent.trim()) fails.push(`${L}: text inside the dots panel ("${panel.textContent.trim()}")`);
      if (/[=+]/.test(panel.textContent)) fails.push(`${L}: an = or + inside the dots panel`);
      const svg = panel.querySelector('svg');
      if (svg && R(svg).height > pitch + 1) twoRow++;
      if (svg && Math.abs(R(svg).height - (Math.ceil(n / perRow) * pitch - (pitch - dot))) > 1) fails.push(`${L}: the dots svg is ${R(svg).height.toFixed(1)} high for ${Math.ceil(n / perRow)} rows`);
      const num = c.querySelector('[data-lcs-num]');
      if (!num || num.textContent.trim() !== String(n) || +num.dataset.lcsNum !== n) fails.push(`${L}: the numeral is not printed`);
      else if (fs(num) < 22) fails.push(`${L}: numeral ${fs(num)} < 22`);
      const boxes = [...c.querySelectorAll('.ws-blankbox')];
      if (boxes.map((b) => b.dataset.lcsRole).join(',') !== 'a,b,r') fails.push(`${L}: boxes ${boxes.map((b) => b.dataset.lcsRole)} != a,b,r`);
      boxes.forEach((b) => { const r = R(b); if (r.height < 36 || r.width < 36) fails.push(`${L}: box ${b.dataset.lcsRole} ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < 36`); });
      const eqs = [...c.querySelectorAll('[data-lcs-eq]')].map((e) => e.textContent.trim());
      if (eqs.join('') !== '=++') fails.push(`${L}: equation glyphs ${JSON.stringify(eqs)}`);
      const cap = c.querySelector('[data-lcs-caption]');
      if (!cap || !cap.textContent.trim() || /\d/.test(cap.textContent)) fails.push(`${L}: the leftover caption is missing / carries a digit`);
      else if (fs(cap) < 12 || cap.scrollWidth > cap.clientWidth + 0.6) fails.push(`${L}: the caption is ${fs(cap)} px / overflows`);
      const eqRow = c.querySelector('[data-lcs-eqrow]');
      const kids = [...eqRow.children]; const eqW = R(kids[kids.length - 1]).right - R(kids[0]).left;
      if (eqW > 302.6) fails.push(`${L}: the equation row is ${eqW.toFixed(1)} > 302`);
      // sparse: the card's content fills the card (the panel takes the growth) and the panel's blank around the dots is bounded
      const card = c.closest('.ws-card'); const cr = R(card), cs = getComputedStyle(card);
      const innerTop = cr.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop), innerBottom = cr.bottom - parseFloat(cs.borderBottomWidth) - parseFloat(cs.paddingBottom);
      const first = R(eqRow.compareDocumentPosition(panel) & Node.DOCUMENT_POSITION_FOLLOWING ? eqRow : panel), last = R(eqRow.compareDocumentPosition(panel) & Node.DOCUMENT_POSITION_FOLLOWING ? panel : eqRow);
      if (first.top - innerTop > 2 || innerBottom - last.bottom > 2) fails.push(`${L}: ${(first.top - innerTop).toFixed(1)} + ${(innerBottom - last.bottom).toFixed(1)} px of blank inside the card outside its content (sparse)`);
      const pr = R(panel), sr = svg ? R(svg) : pr;
      const side = Math.max(sr.top - pr.top, pr.bottom - sr.bottom);
      if (side > 40) fails.push(`${L}: ${side.toFixed(1)} px of blank above / below the dots inside the panel > 40 (sparse)`);
      if (pr.left < cr.left || pr.right > cr.right) fails.push(`${L}: the panel leaves the card`);
    });
    if (seen.odd !== split[0] || seen.even !== split[1]) fails.push(`split odd ${seen.odd} / even ${seen.even} != ${split}`);
    if (twoRow < minTwoRow) fails.push(`${twoRow} two-row cards < minTwoRow ${minTwoRow}`);
    const lastCard = root.querySelector('.ws-cardgrid') && [...root.querySelectorAll('.ws-card')].pop();
    if (lastCard) fillsBody(lastCard, 'the last card'); else fails.push('no card grid');
    if (root.querySelector('img')) fails.push('an <img> on a numeral face');
    if (root.querySelector('[data-lcs-pill]')) fails.push('pills on the proof face (the equation is the conclusion)');
    if (!cards.length) fails.push('non-vacuity: no cards');
  } else if (mode === 'share' || mode === 'count') {
    const lanes = [...root.querySelectorAll(mode === 'share' ? '[data-lcs-share]' : '[data-lcs-count]')];
    const nLanes = +D.lcsLanes, [lo, hi] = D.lcsRange.split(',').map(Number), split = D.lcsSplit.split(',').map(Number), iconPx = +D.lcsIconPx, perRow = +D.lcsPerRow, pills = D.lcsPills === '1';
    if (lanes.length !== nLanes) fails.push(`${lanes.length} lanes, config says ${nLanes}`);
    if (nLanes < 6 || nLanes > 12) fails.push(`${nLanes} items outside the G1 window [6, 12]`);
    const ns = lanes.map((l) => +l.dataset.lcsN);
    if (new Set(ns).size !== ns.length) fails.push('a count twice');
    if (isAscOrder(ns)) fails.push('the lanes ascend');
    const seen = { odd: 0, even: 0 }, srcs = new Set();
    lanes.forEach((lane, i) => {
      const n = ns[i], L = `lane ${i + 1} (${n})`;
      if (!Number.isInteger(n) || n < lo || n > hi) fails.push(`${L}: outside [${lo}, ${hi}]`);
      seen[par(n)]++;
      const pile = lane.querySelector('[data-lcs-pile]');
      if (!pile) { fails.push(`${L}: no pile`); return; }
      if (+pile.dataset.lcsN !== n) fails.push(`${L}: the pile stamps ${pile.dataset.lcsN}`);
      srcs.add(imgsOf(pile, n, L, Math.max(G1, iconPx)));
      const imgs = [...pile.querySelectorAll('img')];
      // row-first: the first row holds perRow pictures when n > perRow (the second row shows "some more", never the parity)
      if (n > perRow && imgs.length >= perRow + 1 && Math.abs(R(imgs[perRow - 1]).top - R(imgs[0]).top) > 1) fails.push(`${L}: the first row holds fewer than ${perRow} pictures`);
      if (n > perRow && imgs.length >= perRow + 1 && R(imgs[perRow]).top - R(imgs[0]).top < iconPx) fails.push(`${L}: picture ${perRow + 1} is not on a second row`);
      if (pile.textContent.trim()) fails.push(`${L}: text in the pile`);
      // no numeral anywhere on the lane
      const w = document.createTreeWalker(lane, NodeFilter.SHOW_TEXT); let t;
      while ((t = w.nextNode())) if (/\d/.test(t.textContent)) fails.push(`${L}: a numeral printed on the lane ("${t.textContent.trim()}")`);
      const boxes = [...lane.querySelectorAll('.ws-blankbox')];
      const roles = boxes.map((b) => b.dataset.lcsRole).join(',');
      if (mode === 'share') {
        if (roles !== 'each,each,r') fails.push(`${L}: boxes ${roles} != each,each,r`);
        const plates = [...lane.querySelectorAll('[data-lcs-plate]')];
        if (plates.length !== 2) fails.push(`${L}: ${plates.length} plates`);
        const names = plates.map((p) => p.dataset.lcsName);
        if (names.length === 2 && (!names[0] || !names[1] || names[0] === names[1])) fails.push(`${L}: plate names ${JSON.stringify(names)}`);
        plates.forEach((p) => { const nm = p.firstElementChild; if (nm.textContent.trim() !== p.dataset.lcsName) fails.push(`${L}: the plate prints "${nm.textContent.trim()}" not its name`); if (nm.scrollWidth > nm.clientWidth + 0.6 || R(nm).width > 64.6) fails.push(`${L}: the name "${p.dataset.lcsName}" is ${R(nm).width.toFixed(1)} wide / clipped (> 64)`); if (fs(nm) < 14) fails.push(`${L}: name font ${fs(nm)} < 14`); });
        const cap = lane.querySelector('[data-lcs-caption]');
        if (!cap || !cap.textContent.trim()) fails.push(`${L}: no leftover caption`); else if (R(cap).width > 84.6 || cap.scrollWidth > cap.clientWidth + 0.6) fails.push(`${L}: the caption is ${R(cap).width.toFixed(1)} > 84`);
      } else {
        if (roles !== 'pairs') fails.push(`${L}: boxes ${roles} != pairs`);
        if (lane.querySelector('[data-lcs-plate]')) fails.push(`${L}: a plate on the count face`);
        const cap = lane.querySelector('[data-lcs-caption]');
        if (!cap || !cap.textContent.trim()) fails.push(`${L}: no pairs caption`); else if (R(cap).width > 56.6 || cap.scrollWidth > cap.clientWidth + 0.6) fails.push(`${L}: the caption is ${R(cap).width.toFixed(1)} > 56`);
      }
      boxes.forEach((b) => { const r = R(b); if (r.height < G1 - 0.6 || r.width < G1 - 0.6) fails.push(`${L}: box ${b.dataset.lcsRole} ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < ${G1}`); });
      if (pills) pillsCheck(lane, n, L); else if (lane.querySelector('[data-lcs-pill]')) fails.push(`${L}: pills present with pills:false`);
      // the lane row inside the lane's inner width
      const kids = [...lane.children]; const rowW = R(kids[kids.length - 1]).right - R(kids[0]).left;
      if (rowW > 639.6) fails.push(`${L}: the lane row is ${rowW.toFixed(1)} > 639`);
      const lr = R(lane); if (R(kids[kids.length - 1]).right > lr.right - 1) fails.push(`${L}: the row runs into the lane's padding`);
    });
    if (srcs.size !== lanes.length) fails.push(`${srcs.size} distinct pictures over ${lanes.length} lanes`);
    if (seen.odd !== split[0] || seen.even !== split[1]) fails.push(`split odd ${seen.odd} / even ${seen.even} != ${split}`);
    laneGrid(lanes, 'lane', 6, 40);
    lanes.forEach((l, i) => { if (R(l).height < 106 - 0.6) fails.push(`lane ${i + 1}: ${R(l).height.toFixed(1)} < 106`); });
    if (lanes.length) fillsBody(lanes[lanes.length - 1], 'the last lane');   // CONTENT, never the root box (a flex child always fills)
    if (root.querySelector('[data-lcs-val], [data-lcs-house]')) fails.push('base chips / houses on a picture face');
    if (!lanes.length) fails.push('non-vacuity: no lanes');
  } else if (mode === 'ones' || mode === 'sums') {
    const isOnes = mode === 'ones';
    const lanes = [...root.querySelectorAll(isOnes ? '[data-lcs-pvlane]' : '[data-lcs-sumlane]')];
    const items = +D.lcsItems, rows = +D.lcsRows, [lo, hi] = D.lcsRange.split(',').map(Number), keys = D.lcsKeys.split(','), circleMin = +D.lcsCircle;
    if (lanes.length !== items) fails.push(`${lanes.length} lanes, config says ${items}`);
    if (items < 8 || items > 16) fails.push(`${items} items outside the G23 window [8, 16]`);
    const heads = [...root.querySelectorAll('[data-lcs-heads]')];
    if (heads.length !== 2) fails.push(`${heads.length} header rows (once per column)`);
    const headWords = heads.map((h) => keys.map((k) => { const c = h.querySelector(`[data-lcs-head="${k}"]`); return c ? c.textContent.trim() : ''; }));
    if (headWords.some((w) => w.some((x) => !x || /\d/.test(x))) || headWords[0] && headWords[1] && headWords[0].join('|') !== headWords[1].join('|')) fails.push(`head words ${JSON.stringify(headWords)}`);
    if (headWords[0] && headWords[0][0].toLowerCase() === headWords[0][1].toLowerCase()) fails.push('both head words read the same');
    heads.forEach((h, ci) => { keys.forEach((k) => { const c = h.querySelector(`[data-lcs-head="${k}"] > span`); if (c && (c.scrollWidth > c.clientWidth + 0.6 || R(c).width > 76.6)) fails.push(`column ${ci + 1}: the head "${c.textContent.trim()}" is ${R(c).width.toFixed(1)} wide (> 76)`); if (c && fs(c) < 16) fails.push(`column ${ci + 1}: head font ${fs(c)} < 16`); }); });
    if (isOnes) {
      heads.forEach((h, ci) => { const l = ['tens', 'ones'].map((k) => { const c = h.querySelector(`[data-lcs-head="${k}"]`); return c ? c.textContent.trim() : ''; }); if (l.some((x) => !/^\p{L}{1,2}$/u.test(x)) || l[0].toLowerCase() === l[1].toLowerCase()) fails.push(`column ${ci + 1}: letter heads ${JSON.stringify(l)}`); });
      const rule = root.querySelector('[data-lcs-rule]');
      if (D.lcsHasRule === '1') { if (!rule) fails.push('the rule strip is missing'); else { const t = rule.textContent.trim(); if (!t) fails.push('the rule strip is empty'); for (let d = 0; d <= 9; d++) if ((t.match(new RegExp('(?<!\\d)' + d + '(?!\\d)', 'g')) || []).length !== 1) fails.push(`the rule strip names the digit ${d} ${(t.match(new RegExp('(?<!\\d)' + d + '(?!\\d)', 'g')) || []).length} times`); if (R(rule).height > 60.6) fails.push(`the rule strip is ${R(rule).height.toFixed(1)} high (> 2 lines)`); if (Math.abs(R(rule).top - bodyR.top) > 1) fails.push('the rule strip is not at the top'); } }
      else if (rule) fails.push('a rule strip with rule:false');
      if (root.querySelector('.ws-blankbox')) fails.push('a blank box on the ones face (the child ticks)');
    } else {
      const table = root.querySelector('[data-lcs-table]');
      if (D.lcsHasTable === '1') {
        if (!table) fails.push('the parity table is missing');
        else {
          const trows = [...table.querySelectorAll('[data-lcs-trow]')];
          if (trows.map((r) => r.dataset.lcsTrow).join(',') !== 'ee,oo,eo') fails.push(`table rows ${trows.map((r) => r.dataset.lcsTrow)}`);
          const W = headWords[0] || [];
          const E = W[keys.indexOf('even')], O = W[keys.indexOf('odd')];
          const want = { ee: `${E} + ${E} = ${E}`, oo: `${O} + ${O} = ${E}`, eo: `${E} + ${O} = ${O}` };
          trows.forEach((r) => { const t = r.textContent.replace(/\s+/g, ' ').trim(); if (t !== want[r.dataset.lcsTrow]) fails.push(`table row ${r.dataset.lcsTrow} reads "${t}" not "${want[r.dataset.lcsTrow]}"`); if (/\d/.test(t)) fails.push('a digit in the table'); });
          if (Math.abs(R(table).top - bodyR.top) > 1) fails.push('the table is not at the top');
          if (R(table).width > 675.6) fails.push(`the table is ${R(table).width.toFixed(1)} wide (> the 675 page inner)`);
          if (trows.some((r) => R(r).height > 25)) fails.push('a table row wraps');
        }
      } else if (table) fails.push('a table with table:false');
      if (root.querySelector('.ws-blankbox')) fails.push('a blank box on the sums face');
      if ([...root.querySelectorAll('[data-lcs-sumlane]')].some((l) => /=/.test(l.textContent))) fails.push('an = on a sum lane');
    }
    const vals = [], addends = [], caseCount = { ee: 0, oo: 0, eo: 0, oe: 0 }, seen = { odd: 0, even: 0 }, onesCount = {};
    lanes.forEach((lane, i) => {
      const L = `lane ${i + 1}`;
      let correctPar;
      if (isOnes) {
        const pv = lane.querySelector('[data-lcs-pv]');
        if (!pv) { fails.push(`${L}: no place-value row`); return; }
        const v = +pv.dataset.lcsVal; vals.push(v);
        if (!Number.isInteger(v) || v < 10 || v > 99 || v < lo || v > hi) fails.push(`${L}: ${v} outside [${lo}, ${hi}] / 10..99`);
        const boxes = [...pv.querySelectorAll('[data-lcs-digit]')];
        if (boxes.length !== 2 || boxes[0].dataset.lcsDigit !== 'tens' || boxes[1].dataset.lcsDigit !== 'ones') fails.push(`${L}: boxes ${boxes.map((b) => b.dataset.lcsDigit)}`);
        else {
          if (boxes[0].textContent.trim() !== String(Math.floor(v / 10))) fails.push(`${L}: the tens box prints "${boxes[0].textContent.trim()}" for ${v}`);
          if (boxes[1].textContent.trim() !== String(v % 10)) fails.push(`${L}: the ones box prints "${boxes[1].textContent.trim()}" for ${v}`);
          const hi2 = [...pv.querySelectorAll('[data-lcs-highlight]')];
          if (hi2.length !== 1 || hi2[0] !== boxes[1]) fails.push(`${L}: the highlight is not on the ones box`);
          const bgO = getComputedStyle(boxes[1]).backgroundColor, bgT = getComputedStyle(boxes[0]).backgroundColor;
          if (!/251, 227, 216/.test(bgO)) fails.push(`${L}: the ones box background ${bgO} is not coralSoft`);
          if (!/255, 255, 255/.test(bgT)) fails.push(`${L}: the tens box background ${bgT} is not white`);
          boxes.forEach((b) => { const r = R(b); if (r.width < 48 - 0.6 || r.height < 48 - 0.6) fails.push(`${L}: box ${r.width.toFixed(1)} < 48`); if (fs(b) < 22) fails.push(`${L}: digit ${fs(b)} < 22`); });
        }
        onesCount[v % 10] = (onesCount[v % 10] || 0) + 1; seen[par(v)]++;
        correctPar = par(v);
        // the boxes sit under the letter heads of their column
        const head = heads[Math.floor(i / rows)];
        if (head && boxes.length === 2) ['tens', 'ones'].forEach((k, j) => { const c = head.querySelector(`[data-lcs-head="${k}"]`); if (c) { const dx = (R(c).left + R(c).right) / 2 - (R(boxes[j]).left + R(boxes[j]).right) / 2; if (Math.abs(dx) > 2) fails.push(`${L}: the ${k} head sits ${dx.toFixed(1)} px off its box`); } });
      } else {
        const s = lane.querySelector('[data-lcs-sum]');
        if (!s) { fails.push(`${L}: no expression`); return; }
        const a = +s.dataset.lcsA, b = +s.dataset.lcsB; addends.push(a, b);
        if (![a, b].every((x) => Number.isInteger(x) && x >= lo && x <= hi)) fails.push(`${L}: ${a} + ${b} outside [${lo}, ${hi}]`);
        const t = s.textContent.replace(/\s+/g, ' ').trim();
        if (t !== `${a} + ${b}`) fails.push(`${L}: prints "${t}" not "${a} + ${b}"`);
        if (fs(s) < 22) fails.push(`${L}: expression font ${fs(s)} < 22`);
        const ones = [...s.querySelectorAll('[data-lcs-ones]')];
        if (ones.length !== 2 || ones[0].textContent !== String(a % 10) || ones[1].textContent !== String(b % 10)) fails.push(`${L}: the ones spans ${ones.map((o) => o.textContent)} != ${a % 10} / ${b % 10}`);
        ones.forEach((o) => { if (parseFloat(getComputedStyle(o).borderBottomWidth) < 2) fails.push(`${L}: the ones digit is not underlined`); });
        const w = document.createTreeWalker(lane, NodeFilter.SHOW_TEXT); let tn;
        while ((tn = w.nextNode())) { const x = tn.textContent.trim(); if (x === String(a + b)) fails.push(`${L}: the sum ${a + b} is printed`); }
        if (lane.textContent.includes(String(a + b)) && !String(a).includes(String(a + b)) && !String(b).includes(String(a + b))) fails.push(`${L}: the sum ${a + b} appears in the lane text`);
        caseCount[(a % 2 ? 'o' : 'e') + (b % 2 ? 'o' : 'e')]++; seen[par(a + b)]++;
        correctPar = par(a + b);
      }
      const ticks = [...lane.querySelectorAll('[data-lcs-tick]')];
      if (ticks.map((k) => k.dataset.lcsTick).join(',') !== keys.join(',')) fails.push(`${L}: ticks ${ticks.map((k) => k.dataset.lcsTick)} != ${keys}`);
      const correct = ticks.filter((k) => k.dataset.lcsCorrect === '1');
      if (correct.length !== 1) fails.push(`${L}: ${correct.length} correct ticks`);
      else if (correct[0].dataset.lcsTick !== correctPar) fails.push(`${L}: the correct tick is ${correct[0].dataset.lcsTick}, the answer is ${correctPar}`);
      ticks.forEach((k) => { if (k.textContent.trim()) fails.push(`${L}: a tick prints "${k.textContent.trim()}"`); const r = R(k); if (r.width < Math.max(44, circleMin) - 0.6 || r.height < Math.max(44, circleMin) - 0.6) fails.push(`${L}: tick ${r.width.toFixed(1)} < ${Math.max(44, circleMin)}`); });
      // each tick under its word head
      const head = heads[Math.floor(i / rows)];
      if (head) ticks.forEach((k) => { const c = head.querySelector(`[data-lcs-head="${k.dataset.lcsTick}"]`); if (c) { const dx = (R(c).left + R(c).right) / 2 - (R(k).left + R(k).right) / 2; if (Math.abs(dx) > 2) fails.push(`${L}: the ${k.dataset.lcsTick} head sits ${dx.toFixed(1)} px off its circle`); } });
      const kids = [...lane.children]; const lr = R(lane);
      if (R(kids[kids.length - 1]).right > lr.right - 1 || R(kids[0]).left < lr.left + 1) fails.push(`${L}: the row runs into the lane's padding`);
    });
    if (isOnes) {
      if (new Set(vals).size !== vals.length) fails.push('a number twice');
      if (isAscOrder(vals)) fails.push('the numbers ascend');
      const maxRep = +D.lcsMaxRepeat, cover = D.lcsCover === '1', minEach = +D.lcsMinParity, minHigh = +D.lcsMinHigh;
      if (cover) for (let d = 0; d <= 9; d++) if (!onesCount[d]) fails.push(`the ones digit ${d} never appears`);
      for (const [d, c] of Object.entries(onesCount)) if (c > maxRep) fails.push(`the ones digit ${d} appears ${c} times (max ${maxRep})`);
      if (seen.odd < minEach || seen.even < minEach) fails.push(`odd ${seen.odd} / even ${seen.even} < minEachParity ${minEach}`);
      if (vals.filter((v) => v >= 50).length < minHigh) fails.push(`${vals.filter((v) => v >= 50).length} numbers >= 50 < minHigh ${minHigh}`);
      // no numeral text outside the boxes and the rule strip
      for (const { t, p } of textNodes) if (/\d/.test(t) && root.contains(p) && !p.closest('[data-lcs-pv], [data-lcs-rule]')) fails.push(`a numeral outside the boxes ("${t}")`);
    } else {
      if (new Set(addends).size !== addends.length) fails.push('an addend twice');
      const cases = Object.fromEntries(D.lcsCases.split(',').map((x) => x.split(':')).map(([k, v]) => [k, +v]));
      for (const k of ['ee', 'oo', 'eo', 'oe']) if (caseCount[k] < cases[k]) fails.push(`case ${k} appears ${caseCount[k]} times (want >= ${cases[k]})`);
      for (const { t, p } of textNodes) if (/\d/.test(t) && root.contains(p) && !p.closest('[data-lcs-sum]')) fails.push(`a numeral outside the expressions ("${t}")`);
    }
    laneGrid(lanes.slice(0, rows), 'column 1 lane', 8, 44); laneGrid(lanes.slice(rows), 'column 2 lane', 8, 44);
    if (!root.querySelector('[data-lcs-cols]')) fails.push('no column grid');
    if (lanes.length) fillsBody(lanes[rows - 1], 'the last lane of column 1'); if (lanes.length === 2 * rows) fillsBody(lanes[lanes.length - 1], 'the last lane of column 2');
    lanes.forEach((l, i) => { if (R(l).height < +D.lcsLaneMin - 0.6) fails.push(`lane ${i + 1}: ${R(l).height.toFixed(1)} < ${D.lcsLaneMin}`); });
    if (root.querySelector('img')) fails.push('an <img> on a numeral face');
    if (root.querySelector('[data-lcs-pill]')) fails.push('pills on a tick face');
    if (!lanes.length) fails.push('non-vacuity: no lanes');
  } else fails.push(`unknown mode "${mode}"`);
  return fails;
  function isAscOrder(a) { return a.length > 1 && a.every((v, i) => !i || v > a[i - 1]); }
}

module.exports = {
  id: ID,
  slug: 'odd-house-even-house',
  gradeBand: 'G1',
  assetClass: 'numeral-charts',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    1: { range: [1, 10], chips: 6, perRow: 6, worked: { count: 3, split: [2, 1] }, boxes: { cols: 3, rows: 2 }, splits: [[4, 5], [5, 4]] },
    2: { range: [1, 20], chips: 9, perRow: 9, worked: { count: 3, split: [2, 1] }, boxes: { cols: 4, rows: 2 }, splits: [[6, 6]] },
    // d3 is UNPUBLISHED (README: d2 is the only shipped level): 1..30, two chip rows of 6 (lane 164; 610 <= 677); 0 NEVER (critic ruling 3)
    3: { range: [1, 30], chips: 12, perRow: 6, worked: { count: 2, split: [1, 1] }, boxes: { cols: 4, rows: 2 }, splits: [[7, 7]],
      house: { boxes: { w: 62, h: 60, gapX: 12, gapY: 14 }, layout: { sign: 140, worked: 196, grid: 270, pad: 20 } } },   // the compact 426 house under the 164 strip: 618
  },
  i18n: {
    en: {
      title: 'Odd and Even Numbers: Odd House, Even House',
      instruction: 'Write each number in the house where it belongs, the odd house or the even house. Three numbers have moved in already and show their pairs.',
    },
  },
  parity, pairsOf, resolveBase, compose, maxAscRun, maxAltRun, orderOk, stripHeight, MAX_RUN,

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(KEY, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bank, d, { theme, locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    if (!bank || !bank.chips || typeof bank.chips.odd !== 'string' || typeof bank.chips.even !== 'string' || !bank.chips.odd.trim() || !bank.chips.even.trim()) throw new Error(`${ID}: the ${loc} bank has no chips {odd, even}`);
    if (!Array.isArray(bank.houseOrder) || bank.houseOrder.slice().sort().join(',') !== 'even,odd') throw new Error(`${ID}: the ${loc} bank houseOrder must be a permutation of [odd, even]`);
    // Phase 2 faces — additive `mode` knob, dispatched BEFORE the base path touches the RNG
    if (d.mode) return this._buildFace(bank, d, { theme, locale: loc }, ctx);
    const cfg = resolveBase(d, GLOBAL);
    const deal = compose(ctx.rng, cfg);
    if (!deal) throw new Error(`${ID}: no deal for chips ${cfg.chips} + worked ${cfg.worked.count} in [${cfg.range}] under the order rule — REFUSED`);
    const houses = bank.houseOrder.map((p) => houseBin({
      parity: p, label: bank.chips[p], w: HOUSE.w, h: HOUSE.h,
      worked: deal.worked[p].map((n) => ({ n })), boxes: { ...cfg.house.boxes, cols: cfg.boxes.cols, rows: cfg.boxes.rows }, layout: cfg.house.layout,
    })).join('');
    const strip = chipStrip({ values: deal.order, chip: CHIP, gap: CHIP_GAP, perRow: cfg.perRow });
    const bodyHtml = `<div data-ws-content data-lcs-oae data-lcs-chips="${cfg.chips}" data-lcs-worked="${cfg.worked.count}" data-lcs-boxes="${cfg.boxes.cols * cfg.boxes.rows}" ` +
      `data-lcs-split="${deal.split.odd},${deal.split.even}" data-lcs-range="${cfg.range[0]},${cfg.range[1]}" data-lcs-order="${bank.houseOrder.join(',')}" data-lcs-maxn="${cfg.maxN}" ` +
      `data-lcs-gap="${cfg.gap}" data-lcs-stack="${cfg.stack}" ` +
      `style="flex:1;display:grid;grid-template-rows:${cfg.stripH}px ${cfg.houseH}px;row-gap:${cfg.gap}px;align-content:start;min-height:0">` +
      strip +
      `<div data-lcs-houses style="display:flex;gap:${HOUSE.gap}px;align-items:flex-start;justify-content:center;min-height:0">${houses}</div></div>`;
    return {
      bodyHtml,
      meta: { face: 'base', order: deal.order, worked: deal.worked, split: deal.split, houseOrder: bank.houseOrder.slice(), stack: cfg.stack, houseH: cfg.houseH, gap: cfg.gap },
    };
  },

  /** Phase 2: the five faces on the additive `mode` knob (design §3). Every builder resolves its config first (a refusal throws). */
  _buildFace(bank, d, { theme, locale }, ctx) {
    const fn = FACE_BUILD[d.mode];
    if (!fn) throw new Error(`${ID}: unknown mode "${d.mode}" (proof | share | ones | sums | count)`);
    if (!ctx || !ctx.rng) throw new Error(`${ID}: no rng in ctx`);
    return this[fn](bank, d, { theme, locale }, ctx.rng);
  },
  _faceRoot(mode, stamps, style, inner) {
    const attrs = Object.entries(stamps).map(([k, v]) => `data-lcs-${k}="${v}"`).join(' ');
    return `<div data-ws-content data-lcs-oae data-lcs-mode="${mode}" ${attrs} style="${style}">${inner}</div>`;
  },

  /** F1 `proof` (G2): 8 numbered cards, `n = [a] + [b] + [r]` over a panel of n bare dots the child rings two by two. */
  _buildProof(bank, d, { locale }, rng) {
    const cfg = resolveProof(d);
    if (typeof bank.leftover !== 'string' || !bank.leftover.trim()) throw new Error(`${ID}: the ${locale} bank has no leftover caption`);
    const deal = composeProof(rng, cfg);
    if (!deal) throw new Error(`${ID}: no proof deal for ${cfg.cards} cards in [${cfg.range}] (minTwoRow ${cfg.minTwoRow}) — REFUSED`);
    const cards = deal.order.map((n) => `<div style="display:flex;flex-direction:column;flex:1 1 auto;min-height:0">` +
      dotRowCard({ n, dot: cfg.dot, gap: cfg.gap, perRow: cfg.perRow, boxW: cfg.boxW, remW: cfg.remW, remLabel: bank.leftover, eqFirst: true, fill: true }) + `</div>`);
    const bodyHtml = this._faceRoot('proof',
      { cards: cfg.cards, rows: cfg.rows, range: cfg.range.join(','), split: cfg.split.join(','), 'min-two-row': cfg.minTwoRow, dot: cfg.dot, pitch: cfg.pitch, 'per-row': cfg.perRow, stack: cfg.stack },
      'flex:1 1 auto;display:flex;flex-direction:column;min-height:0', cardGrid({ cards, cols: cfg.cols, rows: cfg.rows, numbered: true }));
    return { bodyHtml, meta: { face: 'proof', order: deal.order, expected: deal.order.map((n) => ({ n, a: pairsOf(n), b: pairsOf(n), r: n % 2 })), stack: cfg.stack, cfg } };
  },

  /** The picture pool of a theme for a locale: countable entries, distinct by noun, never a B&W theme, never themeless. */
  _picturePool(theme, locale) {
    if (!theme || typeof theme !== 'string') throw new Error(`${ID}: the picture faces need a theme (the wave pins one; the numeral faces are themeless)`);
    if (BW_THEME.test(theme)) throw new Error(`${ID}: theme "${theme}" is a B&W theme (the picture faces take colour art only)`);
    const seen = new Set();
    return entriesFor(theme, locale).filter(countable).filter((e) => { if (seen.has(e.noun)) return false; seen.add(e.noun); return true; });
  },
  _names(bank, locale) {
    const max = bank.nameMaxGraphemes;
    const all = (SENTENCES[locale] && SENTENCES[locale].names) || [];
    const pool = all.filter((n) => Array.from(n).length <= (Number.isInteger(max) ? max : 6));
    if (pool.length < 2) throw new Error(`${ID}: fewer than 2 names of <= ${max} graphemes in SENTENCES.${locale}`);
    return pool;
  },
  _pics(bank, d, { theme, locale }, rng, kind) {
    const cfg = resolvePics(d, kind);
    const capKey = kind === 'share' ? 'leftover' : 'pairs';
    if (typeof bank[capKey] !== 'string' || !bank[capKey].trim()) throw new Error(`${ID}: the ${locale} bank has no ${capKey} caption`);
    const pool = this._picturePool(theme, locale);
    if (pool.length < cfg.lanes) throw new Error(`${ID}: theme "${theme}" holds ${pool.length} countable nouns in ${locale}, the face needs ${cfg.lanes} — REFUSED (never a filler)`);
    const names = kind === 'share' ? this._names(bank, locale) : null;
    const deal = composePics(rng, cfg, pool, names);
    if (!deal) throw new Error(`${ID}: no ${kind} deal for ${cfg.lanes} lanes in [${cfg.range}] — REFUSED`);
    const srcs = deal.nouns.map((e) => fileUri(theme, e.noun));
    const pills = (n) => (cfg.pills ? parityPills({ chips: bank.chips, order: bank.houseOrder, correct: parity(n) }) : '');
    const lanes = deal.order.map((n, i) => (kind === 'share'
      ? shareLane({ n, src: srcs[i], names: deal.names[i], leftoverLabel: bank.leftover, pills: pills(n), iconPx: cfg.iconPx, perRow: cfg.perRow })
      : countLane({ n, src: srcs[i], pairsLabel: bank.pairs, pills: pills(n), iconPx: cfg.iconPx, perRow: cfg.perRow })));
    const bodyHtml = this._faceRoot(kind,
      { lanes: cfg.lanes, range: cfg.range.join(','), split: cfg.split.join(','), 'icon-px': cfg.iconPx, 'per-row': cfg.perRow, pills: cfg.pills ? 1 : 0, theme, stack: cfg.stack },
      `flex:1 1 auto;display:grid;grid-template-rows:repeat(${cfg.lanes},minmax(${cfg.laneH}px,1fr));row-gap:${PICS.rowGap}px;align-content:stretch;min-height:0`, lanes.join(''));
    const expected = deal.order.map((n, i) => ({ n, noun: deal.nouns[i].noun, src: srcs[i], names: deal.names ? deal.names[i] : null, each: pairsOf(n), r: n % 2, pairs: pairsOf(n), parity: parity(n) }));
    return { bodyHtml, meta: { face: kind, theme, order: deal.order, nouns: deal.nouns.map((e) => e.noun), expected, stack: cfg.stack, cfg } };
  },
  /** F2 `share` (G1, THEMED): n pictures dealt between two named plates, "each" x2 + "left over" boxes, the parity pill. */
  _buildShare(bank, d, o, rng) { return this._pics(bank, d, o, rng, 'share'); },
  /** F5 `count` (G1, THEMED): 11-18 pictures in rows of 9, the PAIRS box, the parity pill. */
  _buildCount(bank, d, o, rng) { return this._pics(bank, d, o, rng, 'count'); },

  /** The two-column tick grid shared by F3 / F4: a header row per column then `rows` lanes, column-major, filling the body. */
  _columns(cfg, headsHtml, lanesHtml) {
    const col = (i) => headsHtml + lanesHtml.slice(i * cfg.rows, (i + 1) * cfg.rows).join('');
    return `<div data-lcs-cols style="flex:1 1 auto;display:grid;grid-template-columns:repeat(${cfg.cols},${COLS.colW}px);grid-template-rows:${COLS.headH}px repeat(${cfg.rows},minmax(${cfg.laneMin}px,1fr));grid-auto-flow:column;gap:${COLS.laneGap}px ${COLS.colGap}px;justify-content:center;align-content:stretch;min-height:0">` +
      col(0) + col(1) + `</div>`;
  },
  /** F3 `ones` (G2): the rule strip, then 12 numbers 10-99 in tens / ones boxes (the ones box highlighted) with two tick circles each. */
  _buildOnes(bank, d, { locale }, rng) {
    const cfg = resolveOnes(d);
    if (cfg.rule && (typeof bank.rule !== 'string' || !bank.rule.trim())) throw new Error(`${ID}: the ${locale} bank has no rule sentence`);
    if (!Array.isArray(bank.placeHeads) || bank.placeHeads.length !== 2) throw new Error(`${ID}: the ${locale} bank has no placeHeads`);
    const deal = composeOnes(rng, cfg);
    if (!deal) throw new Error(`${ID}: no ones deal for ${cfg.items} items in [${cfg.range}] — REFUSED`);
    const keys = bank.houseOrder.slice();
    const heads = columnHeads({ left: bank.placeHeads, leftW: cfg.box, leftGap: 4, right: keys.map((k) => bank.chips[k]), rightKeys: keys, rightW: COLS.cell, rightGap: COLS.tickGap, padX: COLS.lanePadX + 2, h: COLS.headH });
    const lanes = deal.order.map((v) => pvLane({ digits: [Math.floor(v / 10), v % 10], correct: parity(v), keys, boxW: cfg.box, digitPx: cfg.digitPx, circle: cfg.circle, cell: COLS.cell, gap: COLS.tickGap, padY: COLS.lanePadY, padX: COLS.lanePadX }));
    const top = cfg.rule ? ruleStrip({ text: bank.rule, px: locale === 'fi' ? 14 : 15 }) + `<div style="flex:0 0 ${COLS.under}px"></div>` : '';
    const bodyHtml = this._faceRoot('ones',
      { items: cfg.items, rows: cfg.rows, range: cfg.range.join(','), 'has-rule': cfg.rule ? 1 : 0, cover: cfg.cover ? 1 : 0, 'max-repeat': cfg.maxRep, 'min-parity': cfg.minEachParity, 'min-high': cfg.minHigh, box: cfg.box, circle: cfg.circle, keys: keys.join(','), 'lane-min': cfg.laneMin, stack: cfg.stack },
      'flex:1 1 auto;display:flex;flex-direction:column;min-height:0', top + this._columns(cfg, heads, lanes));
    return { bodyHtml, meta: { face: 'ones', order: deal.order, expected: deal.order.map((v) => ({ v, tens: Math.floor(v / 10), ones: v % 10, parity: parity(v) })), keys, stack: cfg.stack, cfg } };
  },
  /** F4 `sums` (G3): the parity table, then 12 rows `a + b` (three-digit addends, the ones digits underlined) with two tick circles each; never a sum. */
  _buildSums(bank, d, { locale }, rng) {
    const cfg = resolveSums(d);
    const deal = composeSums(rng, cfg);
    if (!deal) throw new Error(`${ID}: no sums deal for ${cfg.items} rows in [${cfg.range}] — REFUSED`);
    const keys = bank.houseOrder.slice();
    const heads = columnHeads({ left: null, right: keys.map((k) => bank.chips[k]), rightKeys: keys, rightW: COLS.cell, rightGap: COLS.tickGap, padX: COLS.lanePadX + 2, h: COLS.headH });
    const lanes = deal.rows.map((r) => sumLane({ a: r.a, b: r.b, correct: parity(r.a + r.b), keys, px: cfg.px, circle: cfg.circle, cell: COLS.cell, gap: COLS.tickGap, padY: COLS.lanePadY, padX: COLS.lanePadX }));
    const top = cfg.table ? parityTable({ chips: bank.chips, order: GLOBAL.tableOrder }) + `<div style="flex:0 0 ${COLS.under}px"></div>` : '';
    const casesStamp = ['ee', 'oo', 'eo', 'oe'].map((k) => `${k}:${cfg.cases[k]}`).join(',');
    const bodyHtml = this._faceRoot('sums',
      { items: cfg.items, rows: cfg.rows, range: cfg.range.join(','), 'has-table': cfg.table ? 1 : 0, cases: casesStamp, circle: cfg.circle, keys: keys.join(','), 'lane-min': cfg.laneMin, stack: cfg.stack },
      'flex:1 1 auto;display:flex;flex-direction:column;min-height:0', top + this._columns(cfg, heads, lanes));
    return { bodyHtml, meta: { face: 'sums', rows: deal.rows, expected: deal.rows.map((r) => ({ a: r.a, b: r.b, k: r.k, parity: parity(r.a + r.b) })), keys, stack: cfg.stack, cfg } };
  },

  resolveProof, resolvePics, resolveOnes, resolveSums, composeProof, composePics, composeOnes, composeSums,

  async verify(page) {
    const mode = await page.evaluate(() => { const r = document.querySelector('[data-lcs-oae]'); return r ? (r.dataset.lcsMode || null) : null; });
    return page.evaluate(mode ? VERIFY_FACE : VERIFY_BASE);
  },
};
