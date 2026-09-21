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
 * PHASE 2 — the five faces (design §3): ONE additive `mode` knob (`proof` /
 * `share` / `ones` / `sums` / `count`), dispatched in `_buildWith` BEFORE the
 * base path consumes the RNG so the base's output stays byte-identical
 * (tools/b3-baseline.js). NOT BUILT in this phase: a `mode` config throws
 * "Phase 2" so no face can ship half-built.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { GLOBAL } = require('../../data/b4/odd-and-even.js');
const { chipStrip, houseBin, houseHeight } = require('../../templates/components-b4.js');

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
  _buildWith(bank, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    if (!bank || !bank.chips || typeof bank.chips.odd !== 'string' || typeof bank.chips.even !== 'string' || !bank.chips.odd.trim() || !bank.chips.even.trim()) throw new Error(`${ID}: the ${loc} bank has no chips {odd, even}`);
    if (!Array.isArray(bank.houseOrder) || bank.houseOrder.slice().sort().join(',') !== 'even,odd') throw new Error(`${ID}: the ${loc} bank houseOrder must be a permutation of [odd, even]`);
    // Phase 2 faces — additive `mode` knob, dispatched BEFORE the base path touches the RNG
    if (d.mode) return this._buildFace(bank, d, { locale: loc }, ctx);
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

  /** Phase 2 seam: the five faces (`proof` / `share` / `ones` / `sums` / `count`) are NOT built yet — refuse loudly. */
  _buildFace(bank, d) {
    throw new Error(`${ID}: mode "${d.mode}" is a Phase 2 face and is not built yet — the base renders only when d.mode is undefined`);
  },

  async verify(page) {
    return page.evaluate(VERIFY_BASE);
  },
};
