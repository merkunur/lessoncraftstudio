/**
 * G2-346 — Rounding to the Nearest 10 (nt10-D; family key `rounding`; G3
 * content under the locked G2 id, the G2-221 precedent: gradeBand 'G23',
 * en 3.NBT.A.1 / de 3-klasse, the national framework NAME + band elsewhere).
 * Design: docs/worksheet-gen/b4-designs/G2-346-rounding.md §2/§5 (critic record
 * _work/G2-346-critic.md; build record _work/G2-346-build.md).
 *
 * "One rule box, fourteen lines." At the top a dashed coral banner: on the left
 * the worked example `47 [≈] 50` in big numerals with the 7 in coral; on the
 * right the WORDLESS rule, two digit groups `0 1 2 3 4` over `↓` and the
 * `down` caption, `5 6 7 8 9` over `↑` and the `up` caption, the 7 in the strip
 * ringed in coral so the child sees the example's digit sitting in the up
 * group. Below, in one cream lane, numbered lines in two columns:
 * `47 [≈] [   ]` — the numeral in Baloo 2 700 28, the wave glyph drawn in teal
 * (an SVG: `≈` U+2248 and `→` U+2192 are OUTSIDE every font unicode-range, the
 * lock of §1), an 84 x 44 dashed coral box. The child reads the ones digit,
 * finds its group, writes the ten. Seven two-digit and seven three-digit
 * numbers. No line, no chip, no sentence on the lines; the only words on the
 * page are the two captions and the chrome. The rounding HILL primitive of the
 * design was ruled OUT (critic #1).
 *
 * THEMELESS (design §1): numerals only; `themeAxis:{applicable:false}`; no
 * unit axis (the target place is the face set F2 / F5, never a unit fan).
 *
 * THE RULE THAT LOCKS THE TYPE: every answer is `round(n, step) =
 * floor(n / step + 0.5) * step` (half-up), re-derived by verify() from the
 * stamped `data-lcs-n` + `data-lcs-step`; no rounded value, direction or
 * membership is ever stamped on an item; the only words the code prints are
 * whole literals from the bank (`down[step]` / `up[step]`); the relation glyph
 * is an SVG `[data-lcs-rel]` (both codepoints banned as text nodes page-wide);
 * `=` never sits between a number and its rounded value; no number on the page
 * is >= 1000 before or after rounding.
 *
 * Difficulty is a CONFIG; every guard keys on the RESOLVED keys (never the
 * level index): `steps` (an ARRAY from day one — [10] base, [100] F2, [10,100]
 * F5 are PARAM faces), `min` / `max` / `mix {2: k, 3: k}` (null = any), `items`
 * / `cols`, the quotas `fiveMin` / `upMin` / `downMin` / `carryMax` /
 * `carryMin`, the deciding-digit spread `digitCover` (every deciding digit 1..9
 * on the page) + `digitMax` (no deciding digit more than N times), `onesTint`
 * (d1 only), `rule` (the box; withdrawn at d3), `rowH`. F1 / F3 / F4 are CODE
 * faces on ONE additive `mode` knob, dispatched in `_buildWith` BEFORE the base
 * path consumes the RNG (the base DOM byte-identical); NOT BUILT in this phase —
 * a `mode` config throws "Phase 2".
 *
 * build() reads ONLY data/b4/rounding.js (lib/b4-common.js bank; GLOBAL for the
 * rule + the worked examples); never image-vocabulary.js, never the picture
 * index, never approved-words, never G2-221 / G3-323 at render.
 *
 * Chrome budget (README ruling; MEASURED by the gate): body 722 with a 3-line
 * title + 3-line instruction (measures 710 on this shell, the G1-352 finding),
 * 677 under a 4-line fi title, 814 with one-line chrome. Stack d2 = rule box
 * 96 + gap 12 + lane (24 + 7 x 60 + 6 x 14 = 528) = 636 <= 677 (slack 41) <= 710
 * (74) <= 814 (178). DEVIATION from the design's 12 lines x 48 (stack 490):
 * the brief's sparse-page rule (> 180 px of slack under the one-line chrome is
 * a defect) — 14 lines in 60 px rows, mix 7 + 7, quotas raised to match
 * (recorded with the numbers in _work/G2-346-build.md). Root rows
 * `auto minmax(528px, 1fr)`; the lane's rows spread `align-content:space-evenly`
 * so the slack opens between the lines, never inside the rule box.
 *
 * Answer hiding + stamps: root `[data-ws-content][data-lcs-round]` carries the
 * RESOLVED config (data-lcs-step / -items / -cols / -mix / -fivemin / -upmin /
 * -downmin / -carrymax / -carrymin / -digitcover / -digitmax / -min / -max /
 * -example (the worked number; NOT data-lcs-worked, which is the worked LINE's own
 * stamp — one name per surface, the G1-351 lesson) / -rule / -down / -up); per line `[data-lcs-row][data-lcs-n]
 * [data-lcs-step]` with ONE numeral text node `[data-lcs-num]`, the SVG glyph
 * and a `.ws-blankbox[data-lcs-answer]`; the rule box `[data-lcs-rulebox]` with
 * `[data-lcs-worked][data-lcs-worked-to]`, `[data-lcs-rule-digit]` (coral) in
 * the worked line AND on the ringed strip digit, ten `[data-lcs-strip-digit]`,
 * `[data-lcs-arrow]`, `[data-lcs-caption]`. verify(page) re-derives every
 * answer and every quota from the stamps and bans the font-trap codepoints,
 * `=` after a numeral, `<` `>`, numbers >= 1000, a number line, a chip, a mode.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b4-common.js');
const { GLOBAL: G } = require('../../data/b4/rounding.js');
const C4 = require('../../templates/components-b4.js');

const KEY = 'rounding';
const ID = 'G2-346';
const MAX_TRIES = 600;
const LANE_INNER = 639;
const ROW_W = 222;


/* ------------------------------------------------------------------ pure helpers (the gate imports them) ------------------------------------------------------------------ */

/** The ONE rule: half-up. */
function round(n, step) { return Math.floor(n / step + 0.5) * step; }
/** The digit one place below `step` (ones for 10, tens for 100). */
function decidingDigit(n, step) { return Math.floor(n / (step / 10)) % 10; }
/** Does rounding n to step change the digit ABOVE the step (95..99 -> 100)? */
function carries(n, step) { return Math.floor(round(n, step) / (step * 10)) !== Math.floor(n / (step * 10)); }
function isUp(n, step) { return decidingDigit(n, step) >= 5; }

/**
 * The resolved base config for d (+ the bank): every guard on the RESULT.
 * Throws (a refusal) when the config cannot be honoured by construction.
 */
function resolveBase(d, bank) {
  if (!d) throw new Error(`${ID}: no difficulty config`);
  const steps = Array.isArray(d.steps) ? d.steps.slice() : null;
  if (!steps || !steps.length || steps.some((s) => s !== 10 && s !== 100)) throw new Error(`${ID}: steps must be a non-empty array of 10 | 100 (got ${JSON.stringify(d.steps)})`);
  if (new Set(steps).size !== steps.length) throw new Error(`${ID}: steps repeat a step`);
  const cfg = {
    steps, step: steps[0], min: d.min, max: d.max, mix: d.mix || null, items: d.items, cols: d.cols,
    fiveMin: d.fiveMin, upMin: d.upMin, downMin: d.downMin, carryMax: d.carryMax == null ? Infinity : d.carryMax, carryMin: d.carryMin || 0,
    digitCover: d.digitCover !== false, digitMax: d.digitMax == null ? 2 : d.digitMax,
    onesTint: !!d.onesTint, rule: d.rule !== false, rowH: d.rowH || 60, rowGap: d.rowGap == null ? 14 : d.rowGap,
    worked: G.worked[steps.length > 1 ? 'both' : steps[0]],
    relation: bank.relation,
  };
  if (!Number.isInteger(cfg.min) || !Number.isInteger(cfg.max) || cfg.min < 11 || cfg.max > G.max || cfg.min >= cfg.max) throw new Error(`${ID}: range ${cfg.min}..${cfg.max} must sit inside 11..${G.max}`);
  if (!Number.isInteger(cfg.items) || cfg.items < 8 || cfg.items > 16) throw new Error(`${ID}: ${cfg.items} items outside the G2-3 window [8, 16]`);
  if (cfg.cols !== 1 && cfg.cols !== 2) throw new Error(`${ID}: cols ${cfg.cols} must be 1 or 2`);
  if (cfg.items % cfg.cols !== 0) throw new Error(`${ID}: ${cfg.items} items do not fill ${cfg.cols} columns evenly`);
  cfg.rows = cfg.items / cfg.cols;
  if (cfg.mix) {
    const sum = Object.values(cfg.mix).reduce((s, x) => s + x, 0);
    if (sum !== cfg.items) throw new Error(`${ID}: mix ${JSON.stringify(cfg.mix)} sums to ${sum}, items ${cfg.items}`);
    for (const k of Object.keys(cfg.mix)) if (k !== '2' && k !== '3') throw new Error(`${ID}: mix keys must be digit counts 2 | 3 (got ${k})`);
  }
  for (const k of ['fiveMin', 'upMin', 'downMin']) if (!Number.isInteger(cfg[k]) || cfg[k] < 0) throw new Error(`${ID}: ${k} must be a non-negative integer`);
  if (cfg.fiveMin < 2 && cfg.rule) throw new Error(`${ID}: fiveMin ${cfg.fiveMin} < 2 — the 5 case must be on the page at least twice (the lock)`);
  if (cfg.upMin + cfg.downMin > cfg.items) throw new Error(`${ID}: upMin ${cfg.upMin} + downMin ${cfg.downMin} > items ${cfg.items}`);
  if (cfg.fiveMin > cfg.upMin) throw new Error(`${ID}: fiveMin ${cfg.fiveMin} > upMin ${cfg.upMin} (the 5 case counts as up)`);
  if (cfg.carryMin > cfg.carryMax) throw new Error(`${ID}: carryMin ${cfg.carryMin} > carryMax ${cfg.carryMax}`);
  if (cfg.digitCover && cfg.items < 9) throw new Error(`${ID}: digitCover needs >= 9 items (got ${cfg.items})`);
  if (cfg.digitCover && cfg.items > 9 * cfg.digitMax) throw new Error(`${ID}: ${cfg.items} items cannot spread over 9 deciding digits at most ${cfg.digitMax} each`);
  if (cfg.digitCover && cfg.fiveMin > cfg.digitMax) throw new Error(`${ID}: fiveMin ${cfg.fiveMin} > digitMax ${cfg.digitMax}`);
  if (cfg.rowH < 44) throw new Error(`${ID}: rowH ${cfg.rowH} < 44 (the box floor)`);
  if (!Number.isInteger(cfg.worked) || cfg.worked % cfg.step === 0) throw new Error(`${ID}: the worked example ${cfg.worked} is not a roundable number at step ${cfg.step}`);
  if (cfg.relation !== 'approx' && cfg.relation !== 'arrow') throw new Error(`${ID}: the bank's relation must be approx | arrow (got ${cfg.relation})`);
  if (cfg.cols === 2 && ROW_W * 2 > LANE_INNER) throw new Error(`${ID}: two 222 px rows do not fit the ${LANE_INNER} lane`);
  return cfg;
}

/** The candidate numbers of a class (digit count) under cfg: in range, roundable at every step, never the worked number, every rounding <= 999. */
function pool(cfg, digits) {
  const out = [];
  const lo = Math.max(cfg.min, digits === 2 ? 10 : 100), hi = Math.min(cfg.max, digits === 2 ? 99 : 999);
  for (let n = lo; n <= hi; n++) {
    if (n === cfg.worked) continue;
    if (cfg.steps.some((s) => n % s === 0 || round(n, s) > G.max)) continue;
    if (decidingDigit(n, cfg.step) === 0) continue;
    out.push(n);
  }
  return out;
}

/**
 * The base deal (also F2 / F5 by `steps`): the deciding-digit multiset first
 * (1..9 once each when digitCover, extras drawn with digitMax; the 5 case at
 * least fiveMin times), split over the digit classes per `mix`, one number per
 * (class, digit) from the pool, the quotas checked on the RESULT, then ONE
 * shuffle of the line order. Locale-neutral: the same numbers in all 11
 * locales. Returns null when no deal exists under this config (the caller
 * refuses).
 */
function compose(rng, cfg) {
  const pools = { 2: pool(cfg, 2), 3: pool(cfg, 3) };
  const classes = cfg.mix ? Object.entries(cfg.mix).flatMap(([k, c]) => Array.from({ length: c }, () => +k)) : null;
  const byDigit = (list) => { const m = {}; for (const n of list) (m[decidingDigit(n, cfg.step)] = m[decidingDigit(n, cfg.step)] || []).push(n); return m; };
  const poolsByDigit = { 2: byDigit(pools[2]), 3: byDigit(pools[3]) };
  for (let t = 0; t < MAX_TRIES; t++) {
    // 1. the deciding digits
    const digits = cfg.digitCover ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
    let guard = 0;
    while (digits.length < cfg.items && guard++ < 200) {
      const d = rng.int(1, 9);
      if (digits.filter((x) => x === d).length < cfg.digitMax) digits.push(d);
    }
    if (digits.length !== cfg.items) continue;
    if (digits.filter((d) => d === 5).length < cfg.fiveMin) continue;
    if (digits.filter((d) => d >= 5).length < cfg.upMin || digits.filter((d) => d < 5).length < cfg.downMin) continue;
    // 2. the classes (shuffled digits, the first mix[2] are two-digit)
    const order = rng.shuffle(digits);
    const cls = classes ? rng.shuffle(classes) : null;
    // 3. one number per (class, digit)
    const used = new Set();
    const items = [];
    let ok = true;
    for (let i = 0; i < order.length; i++) {
      const d = order[i];
      const c = cls ? cls[i] : null;
      const cands = (c ? (poolsByDigit[c][d] || []) : [...(poolsByDigit[2][d] || []), ...(poolsByDigit[3][d] || [])]).filter((n) => !used.has(n));
      if (!cands.length) { ok = false; break; }
      const n = rng.pick(cands);
      used.add(n);
      items.push(n);
    }
    if (!ok) continue;
    // 4. the quotas on the RESULT
    const carry = items.filter((n) => carries(n, cfg.step)).length;
    if (carry > cfg.carryMax || carry < cfg.carryMin) continue;
    if (cfg.mix) for (const [k, c] of Object.entries(cfg.mix)) if (items.filter((n) => String(n).length === +k).length !== c) { ok = false; break; }
    if (!ok) continue;
    // 5. the line order
    return rng.shuffle(items);
  }
  return null;
}

/* ------------------------------------------------------------------ verify (page side; self-contained) ------------------------------------------------------------------ */

function VERIFY_BASE() {
  const fails = [];
  const root = document.querySelector('[data-lcs-round]');
  if (!root) return ['no rounding root'];
  if (root.dataset.lcsMode || document.querySelector('.ws-body [data-lcs-mode]')) return ['a data-lcs-mode is stamped (a face; no verify branch in this phase)'];
  const D = root.dataset;
  const round = (n, step) => Math.floor(n / step + 0.5) * step;
  const deciding = (n, step) => Math.floor(n / (step / 10)) % 10;
  const carries = (n, step) => Math.floor(round(n, step) / (step * 10)) !== Math.floor(n / (step * 10));
  const step = +D.lcsStep, items = +D.lcsItems, cols = +D.lcsCols, min = +D.lcsMin, max = +D.lcsMax, worked = +D.lcsExample;
  const fiveMin = +D.lcsFivemin, upMin = +D.lcsUpmin, downMin = +D.lcsDownmin, carryMax = D.lcsCarrymax === '' ? Infinity : +D.lcsCarrymax, carryMin = +(D.lcsCarrymin || 0);
  const digitCover = D.lcsDigitcover === '1', digitMax = +(D.lcsDigitmax || 99);
  const mix = D.lcsMix ? Object.fromEntries(D.lcsMix.split(';').map((p) => p.split(':').map(Number))) : null;
  if (step !== 10 && step !== 100) fails.push(`step ${step} is not 10 | 100`);
  const rows = [...root.querySelectorAll('[data-lcs-row]')];
  if (rows.length !== items) fails.push(`${rows.length} lines, config says ${items}`);
  if (rows.length < 8 || rows.length > 16) fails.push(`${rows.length} lines outside [8, 16]`);
  const seen = new Set();
  const ns = [];
  const badges = [];
  rows.forEach((row, i) => {
    const L = `line ${i + 1}`;
    const n = +row.dataset.lcsN;
    const rs = +row.dataset.lcsStep;
    if (rs !== step) fails.push(`${L}: step ${rs} != ${step}`);
    if (!Number.isInteger(n) || n < min || n > max) fails.push(`${L}: ${n} outside ${min}..${max}`);
    if (n % step === 0) fails.push(`${L}: ${n} is a multiple of ${step} — not an item`);
    if (deciding(n, step) === 0) fails.push(`${L}: ${n} has deciding digit 0`);
    if (seen.has(n)) fails.push(`${L}: ${n} twice`);
    seen.add(n);
    if (n === worked) fails.push(`${L}: the worked number ${worked} is an item`);
    ns.push(n);
    const num = row.querySelector('[data-lcs-num]');
    if (!num) { fails.push(`${L}: no numeral`); return; }
    if (num.textContent.trim() !== String(n)) fails.push(`${L}: numeral prints "${num.textContent.trim()}" not ${n}`);
    const fs = parseFloat(getComputedStyle(num).fontSize);
    if (fs < 22) fails.push(`${L}: numeral ${fs}px < 22`);
    if (num.scrollWidth > num.clientWidth + 0.6) fails.push(`${L}: numeral overflows its ${num.clientWidth}px zone`);
    if (row.querySelectorAll('[data-lcs-num] span').length > (root.dataset.lcsOnestint === '1' ? 1 : 0)) fails.push(`${L}: per-digit spans inside the numeral`);
    // the relation: the next element after the numeral (skipping spacers) is the SVG glyph; never a text `=`
    let next = num.nextSibling;
    while (next && ((next.nodeType === 3 && !next.textContent.trim()) || (next.nodeType === 1 && next.tagName === 'SPAN' && !next.textContent.trim() && !next.querySelector('svg')))) next = next.nextSibling;
    if (!next || next.nodeType !== 1 || next.tagName.toLowerCase() !== 'svg' || !next.hasAttribute('data-lcs-rel')) fails.push(`${L}: the node after the numeral is not the SVG relation glyph (${next ? (next.nodeType === 3 ? 'text "' + next.textContent.trim() + '"' : next.tagName) : 'nothing'})`);
    const boxes = [...row.querySelectorAll('.ws-blankbox')];
    if (boxes.length !== 1) fails.push(`${L}: ${boxes.length} boxes`);
    const box = boxes[0];
    if (box) {
      const want = round(n, step);
      if (box.getAttribute('data-lcs-answer') !== String(want)) fails.push(`${L}: box answer ${box.getAttribute('data-lcs-answer')} != round(${n}, ${step}) = ${want}`);
      if (want > 999) fails.push(`${L}: the answer ${want} >= 1000`);
      if (box.textContent.trim() || box.childNodes.length) fails.push(`${L}: the box is not empty ("${box.textContent.trim()}")`);
      const r = box.getBoundingClientRect();
      if (r.height < 44 - 0.6) fails.push(`${L}: box ${r.height.toFixed(1)} high < 44`);
      if (r.width < (String(want).length >= 3 ? 84 : 68) - 0.6) fails.push(`${L}: box ${r.width.toFixed(1)} wide < ${String(want).length >= 3 ? 84 : 68}`);
      if (box.nextSibling && box.nextSibling.nodeType === 3 && box.nextSibling.textContent.trim()) fails.push(`${L}: text after the box`);
    }
    // the line's only text is the badge and the numeral: the answer is never printed inside its own line
    const extra = [];
    const tw = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
    let tn;
    while ((tn = tw.nextNode())) { if (!tn.textContent.trim()) continue; const pe = tn.parentElement; if (pe && (pe.closest('[data-lcs-idx]') || pe.closest('[data-lcs-num]'))) continue; extra.push(tn.textContent.trim()); }
    if (extra.length) fails.push(`${L}: text beyond the badge and the numeral ("${extra.join(' ')}")` + (extra.includes(String(round(n, step))) ? ` — the rounded value ${round(n, step)} is printed in the line` : ''));
    const badge = row.querySelector('[data-lcs-idx]');
    if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${L}: badge "${badge ? badge.textContent.trim() : ''}" != ${i + 1}`);
    if (badge) { const b = badge.getBoundingClientRect(); badges.push({ idx: +badge.dataset.lcsIdx, x: b.left + b.width / 2, y: b.top + b.height / 2 }); }
  });
  // quotas re-derived
  const fives = ns.filter((n) => deciding(n, step) === 5).length;
  const ups = ns.filter((n) => deciding(n, step) >= 5).length, downs = ns.length - ups;
  const carry = ns.filter((n) => carries(n, step)).length;
  if (fives < fiveMin) fails.push(`${fives} lines with deciding digit 5 < fiveMin ${fiveMin}`);
  if (ups < upMin) fails.push(`${ups} round up < upMin ${upMin}`);
  if (downs < downMin) fails.push(`${downs} round down < downMin ${downMin}`);
  if (carry > carryMax) fails.push(`${carry} carry cases > carryMax ${carryMax}`);
  if (carry < carryMin) fails.push(`${carry} carry cases < carryMin ${carryMin}`);
  if (mix) for (const [k, c] of Object.entries(mix)) { const have = ns.filter((n) => String(n).length === +k).length; if (have !== c) fails.push(`${have} ${k}-digit numbers, mix says ${c}`); }
  const hist = {};
  ns.forEach((n) => { const d = deciding(n, step); hist[d] = (hist[d] || 0) + 1; });
  if (digitCover) for (let d = 1; d <= 9; d++) if (!hist[d]) fails.push(`deciding digit ${d} never appears (digitCover)`);
  for (const [d, c] of Object.entries(hist)) if (c > digitMax) fails.push(`deciding digit ${d} appears ${c} > digitMax ${digitMax}`);
  // badges column-major: 1..rows down the left column, rows+1..items down the right
  const rowsPer = items / cols;
  if (badges.length === items) {
    const byIdx = badges.slice().sort((a, b) => a.idx - b.idx);
    for (let i = 1; i < byIdx.length; i++) {
      const a = byIdx[i - 1], b = byIdx[i];
      const sameCol = Math.floor((a.idx - 1) / rowsPer) === Math.floor((b.idx - 1) / rowsPer);
      if (sameCol && !(b.y > a.y + 10 && Math.abs(b.x - a.x) < 4)) fails.push(`badges ${a.idx} -> ${b.idx} are not stacked down one column (column-major)`);
      if (!sameCol && !(b.x > a.x + 100 && b.y < a.y)) fails.push(`badge ${b.idx} does not start the next column at the top`);
    }
  }
  // the rule box
  const box = root.querySelector('[data-lcs-rulebox]');
  const wantRule = D.lcsRule === '1';
  if (wantRule && !box) fails.push('no rule box (config says rule)');
  if (!wantRule && box) fails.push('a rule box on a page whose config withdraws it');
  if (box) {
    if (+box.dataset.lcsStep !== step) fails.push(`rule box step ${box.dataset.lcsStep} != ${step}`);
    const workedEls = [...box.querySelectorAll('[data-lcs-worked]')];
    if (workedEls.length !== 1) fails.push(`${workedEls.length} worked lines (want 1)`);
    const w = workedEls[0];
    if (w) {
      const wn = +w.dataset.lcsWorked, wto = +w.dataset.lcsWorkedTo;
      if (wn !== worked) fails.push(`worked line ${wn} != the stamped worked ${worked}`);
      if (wto !== round(wn, step)) fails.push(`worked ${wn} -> ${wto} != ${round(wn, step)}`);
      if (ns.includes(wn)) fails.push(`the worked number ${wn} is also an item`);
      const rd = w.querySelector('[data-lcs-rule-digit]');
      if (!rd) fails.push('no coral deciding digit in the worked line');
      else {
        if (rd.textContent.trim() !== String(deciding(wn, step))) fails.push(`the worked line marks "${rd.textContent.trim()}", the deciding digit of ${wn} is ${deciding(wn, step)}`);
        const c = getComputedStyle(rd).color.replace(/\s/g, '');
        if (c !== 'rgb(242,120,75)') fails.push(`the deciding digit is ${c}, not coral`);
      }
      const numText = w.querySelector('[data-lcs-worked-n]');
      if (numText && numText.textContent.trim() !== String(wn)) fails.push(`the worked numeral prints "${numText.textContent.trim()}"`);
      if (/=/.test(w.textContent)) fails.push('a = inside the worked line');
      if (!w.querySelector('svg[data-lcs-rel]')) fails.push('the worked line has no SVG relation glyph');
    }
    const digits = [...box.querySelectorAll('[data-lcs-strip-digit]')];
    if (digits.map((d) => d.dataset.lcsStripDigit).join('') !== '0123456789') fails.push(`strip digits in order ${digits.map((d) => d.dataset.lcsStripDigit).join('')} (want 0123456789)`);
    digits.forEach((d) => { if (d.textContent.trim() !== d.dataset.lcsStripDigit) fails.push(`strip digit ${d.dataset.lcsStripDigit} prints "${d.textContent.trim()}"`); });
    for (const dir of ['down', 'up']) {
      const blk = box.querySelector(`[data-lcs-strip-block="${dir}"]`);
      if (!blk) { fails.push(`no ${dir} strip block`); continue; }
      const ds = [...blk.querySelectorAll('[data-lcs-strip-digit]')].map((d) => d.dataset.lcsStripDigit).join('');
      if (ds !== (dir === 'down' ? '01234' : '56789')) fails.push(`${dir} block holds ${ds}`);
      const arrow = blk.querySelector('[data-lcs-arrow]');
      if (!arrow || arrow.dataset.lcsArrow !== dir) fails.push(`${dir} block arrow is ${arrow ? arrow.dataset.lcsArrow : 'missing'}`);
      if (arrow && arrow.textContent.trim() !== (dir === 'down' ? '↓' : '↑')) fails.push(`${dir} arrow prints "${arrow.textContent.trim()}"`);
      if (arrow && arrow.getBoundingClientRect().top < (blk.querySelector('[data-lcs-strip-digit]') || arrow).getBoundingClientRect().bottom - 1) fails.push(`${dir} arrow is not under its digits`);
      const cap = blk.querySelector('[data-lcs-caption]');
      const want = dir === 'down' ? D.lcsDown : D.lcsUp;
      if (!cap || cap.textContent.trim() !== want) fails.push(`${dir} caption "${cap ? cap.textContent.trim() : ''}" != the bank literal "${want}"`);
      if (cap && cap.scrollWidth > cap.clientWidth + 0.6) fails.push(`${dir} caption overflows its block`);
      if (cap && parseFloat(getComputedStyle(cap).fontSize) < 12) fails.push(`${dir} caption font < 12`);
    }
    const ringed = digits.filter((d) => d.hasAttribute('data-lcs-rule-digit'));
    if (ringed.length !== 1) fails.push(`${ringed.length} ringed strip digits (want 1)`);
    else if (ringed[0].dataset.lcsStripDigit !== String(deciding(worked, step))) fails.push(`the ring sits on ${ringed[0].dataset.lcsStripDigit}, the example's deciding digit is ${deciding(worked, step)}`);
    if (ringed[0] && getComputedStyle(ringed[0]).borderTopColor.replace(/\s/g, '') !== 'rgb(242,120,75)') fails.push('the strip ring is not coral');
    if (box.querySelectorAll('svg').length !== box.querySelectorAll('svg[data-lcs-rel]').length) fails.push('an SVG other than the relation glyph inside the rule box');
    if (D.lcsDown === D.lcsUp) fails.push('down and up captions are the same literal');
  }
  // page-wide bans
  const body = document.querySelector('.ws-body');
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const t = node.textContent;
    if (/[≈→]/.test(t)) fails.push(`text node carries U+2248 / U+2192 ("${t.trim()}") — outside every font range, must be the SVG glyph`);
    if (/[<>]/.test(t)) fails.push(`text node carries < or > ("${t.trim()}")`);
    if (/(?<!\d)\d{4,}/.test(t)) fails.push(`a number >= 1000 in a text node ("${t.trim()}")`);
    if (/\d[ .,]\d{3}(?!\d)/.test(t)) fails.push(`a thousands separator in a text node ("${t.trim()}")`);
  }
  if (body.querySelector('[data-lcs-prim="number-line"]')) fails.push('a number line is drawn (G2-221 / G3-323 own it)');
  if (body.querySelector('.ws-chip, .ws-pattern-slot, .ws-pattern-chip')) fails.push('a chip / pattern slot on the base');
  if (body.querySelector('img')) fails.push('an <img> on a numeral-only page');
  if (body.querySelector('[data-lcs-correct], [data-lcs-member], [data-lcs-dir]')) fails.push('an answer / membership / direction stamp on an item');
  if (body.querySelectorAll('svg').length !== body.querySelectorAll('svg[data-lcs-rel]').length) fails.push('an SVG other than the relation glyph on the page');
  if (!rows.length) fails.push('non-vacuity: 0 lines');
  return fails;
}

module.exports = {
  id: ID,
  slug: 'rounding-numbers',
  gradeBand: 'G23',
  assetClass: 'numeral-charts',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  unitAxis: { applicable: false },
  difficulty: {
    // DEVIATION (measured, _work/G2-346-build.md): rows are 60 px and the counts 12 / 14 / 16 (design 10 / 12 / 12 at 48)
    // so no level leaves > 180 px of slack under the one-line chrome (the brief's sparse-page rule); d2 stack 636.
    1: { steps: [10], min: 11, max: 99, mix: null, items: 12, cols: 2, fiveMin: 2, upMin: 5, downMin: 5, carryMax: 0, onesTint: true, rule: true },
    2: { steps: [10], min: 11, max: 994, mix: { 2: 7, 3: 7 }, items: 14, cols: 2, fiveMin: 2, upMin: 5, downMin: 5, carryMax: 2, onesTint: false, rule: true },
    3: { steps: [10], min: 101, max: 994, mix: null, items: 16, cols: 2, fiveMin: 2, upMin: 5, downMin: 5, carryMax: 2, carryMin: 2, onesTint: false, rule: false },
  },
  i18n: {
    en: {
      title: 'Rounding to the Nearest 10',
      instruction: 'Round each number to the nearest ten and write it in the box. If the ones digit is 5 or more, round up.',
    },
  },
  round, decidingDigit, carries, isUp, resolveBase, pool, compose,

  build({ theme, difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(KEY, loc), this.difficulty[difficulty], { theme, locale: loc }, ctx);
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam); build() passes the real ones. */
  _buildWith(bank, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    if (!bank || !bank.up || !bank.down || !bank.heads) throw new Error(`${ID}: the ${loc} bank has no up / down / heads literals`);
    // Phase 2 faces — the additive `mode` knob, dispatched BEFORE the base path touches the RNG
    if (d.mode) return this._buildFace(bank, d, { locale: loc }, ctx);
    const cfg = resolveBase(d, bank);
    const step = cfg.step;
    for (const s of cfg.steps) for (const dir of ['up', 'down']) if (typeof bank[dir][s] !== 'string' || !bank[dir][s].trim()) throw new Error(`${ID}: the ${loc} bank has no ${dir}[${s}] literal — refuse`);
    if (cfg.steps.length > 1) throw new Error(`${ID}: steps ${JSON.stringify(cfg.steps)} — the two-box (F5) path is a Phase 2 face`);
    const items = compose(rng, cfg);
    if (!items) throw new Error(`${ID}: no deal for ${cfg.items} items in ${cfg.min}..${cfg.max} at step ${step} under the quotas (fiveMin ${cfg.fiveMin}, up ${cfg.upMin}, down ${cfg.downMin}, carry ${cfg.carryMin}..${cfg.carryMax}, digitMax ${cfg.digitMax}) — REFUSED`);
    const rel = cfg.relation;
    // the rule box
    let ruleHtml = '';
    if (cfg.rule) {
      ruleHtml = C4.roundRuleBox({
        step,
        lines: [C4.workedLine({ n: cfg.worked, step, px: 30, rel })],
        strip: C4.digitStrip({ step, ring: decidingDigit(cfg.worked, step), captions: { down: bank.down[step], up: bank.up[step] } }),
      });
    }
    // the lines, column-major (1..rows down the left column, then the right)
    const rowsHtml = items.map((n, i) => C4.roundRow({ idx: i + 1, n, step, answer: round(n, step), rel, onesTint: cfg.onesTint, rowH: cfg.rowH })).join('');
    const laneMin = 24 + cfg.rows * cfg.rowH + (cfg.rows - 1) * cfg.rowGap;
    const lane = `<div class="ws-lane" data-lcs-lines data-ws-content style="display:grid;grid-template-rows:repeat(${cfg.rows},${cfg.rowH}px);grid-auto-flow:column;grid-template-columns:repeat(${cfg.cols},1fr);row-gap:${cfg.rowGap}px;justify-items:center;align-content:space-evenly;min-height:${laneMin}px">${rowsHtml}</div>`;
    const stamps = [
      ['step', step], ['items', cfg.items], ['cols', cfg.cols], ['mix', cfg.mix ? Object.entries(cfg.mix).map(([k, c]) => `${k}:${c}`).join(';') : ''],
      ['fivemin', cfg.fiveMin], ['upmin', cfg.upMin], ['downmin', cfg.downMin], ['carrymax', Number.isFinite(cfg.carryMax) ? cfg.carryMax : ''], ['carrymin', cfg.carryMin],
      ['digitcover', cfg.digitCover ? 1 : 0], ['digitmax', cfg.digitMax], ['min', cfg.min], ['max', cfg.max], ['example', cfg.worked], ['rule', cfg.rule ? 1 : 0],
      ['onestint', cfg.onesTint ? 1 : 0], ['down', bank.down[step]], ['up', bank.up[step]], ['rel', rel],
    ].map(([k, v]) => `data-lcs-${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');
    const rows = cfg.rule ? `auto minmax(${laneMin}px, 1fr)` : `minmax(${laneMin}px, 1fr)`;
    const bodyHtml = `<div data-ws-content data-lcs-round ${stamps} style="flex:1;display:grid;grid-template-rows:${rows};row-gap:12px;min-height:0">${ruleHtml}${lane}</div>`;
    return {
      bodyHtml,
      meta: { face: 'base', step, items, answers: items.map((n) => round(n, step)), worked: cfg.worked, stack: (cfg.rule ? 96 + 12 : 0) + laneMin },
    };
  },

  /** Phase 2 seam: the CODE faces (`sort` / `estimate` / `inverse`) and the PARAM faces (`steps` [100] / [10, 100]) are NOT built yet — refuse loudly. */
  _buildFace(bank, d) {
    throw new Error(`${ID}: mode "${d.mode}" is a Phase 2 face and is not built yet — the base renders only when d.mode is undefined`);
  },

  async verify(page) {
    return page.evaluate(VERIFY_BASE);
  },
};
