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
 * path consumes the RNG (the base DOM byte-identical); F5 (`steps:[10,100]`) is
 * dispatched to `_buildBoth` before resolveBase (per-place quotas); F2
 * (`steps:[100]`) IS the base path. Phase 2 record: _work/G2-346-faces.md.
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
/** The chain-rounding trap at the hundred (Level Set 2026-10-14): tens digit 4, ones 5-9 — 449 rounds to 400; a child who rounds the ones first reaches 450 and then 500. */
function isTrap(n) { return n % 100 >= 45 && n % 100 <= 49; }

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
    trapMax: d.trapMax == null ? Infinity : d.trapMax,   // Level Set level 1 of the hundred: no chain-rounding trap at all
    trapMin: d.trapMin || 0,   // Level Set (walk #63): lines whose tens digit is 4 with ones 5-9 (449 -> 400, never the chain 450 -> 500)
  };
  if (cfg.trapMin && cfg.step !== 100) throw new Error(`${ID}: trapMin is a hundreds rule (the chain-rounding trap), step ${cfg.step}`);
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
    if (cfg.trapMin && items.filter(isTrap).length < cfg.trapMin) continue;
    if (Number.isFinite(cfg.trapMax) && items.filter(isTrap).length > cfg.trapMax) continue;
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
  const trapMin = +(D.lcsTrapmin || 0);
  if (D.lcsTrapmax !== undefined && ns.filter((n) => n % 100 >= 45 && n % 100 <= 49).length > +D.lcsTrapmax) fails.push(`${ns.filter((n) => n % 100 >= 45 && n % 100 <= 49).length} chain-rounding traps > trapMax ${D.lcsTrapmax}`);
  if (trapMin && ns.filter((n) => n % 100 >= 45 && n % 100 <= 49).length < trapMin) fails.push(`${ns.filter((n) => n % 100 >= 45 && n % 100 <= 49).length} chain-rounding traps (tens 4, ones 5-9) < trapMin ${trapMin}`);
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

/* ------------------------------------------------------------------ Phase 2: the faces (design §3; record _work/G2-346-faces.md) ------------------------------------------------------------------ */
/*
 * Five G3 faces on the base substrate. F2 (`steps:[100]`) is the base path with
 * another step (nothing here). F5 (`steps:[10,100]`) is dispatched by `_buildWith`
 * BEFORE resolveBase (its quotas are per place) to `_buildBoth`. F1 / F3 / F4 are
 * the additive `mode` knob (`sort` / `estimate` / `inverse`) dispatched to
 * `_buildFace` BEFORE the base path touches the RNG. Every guard keys on the
 * RESOLVED config, never the level index; every face's stack is computed and
 * refused above 677 (the fi four-line chrome); the SPARSE floor (>= 631, i.e.
 * <= 180 px of slack under the 811 one-line chrome, the base's own rule) is the
 * gate's measured assertion — the design's §3 stacks (496 / 600 / 480 / 584)
 * all sat under it, so every face's elements grew to the task (recorded).
 */
const RULE_H = 96, GAP = 12, LANE_PAD = 28, STACK_MAX = 677;   // LANE_PAD: the `.ws-lane` is border-box — padding 12 + border 2 each side (measured: a 24 pad shrank F4's target pill 60 -> 56)

/** All ten strip digits' worth of guard: a face's `steps` is one step. */
function oneStep(d, who) {
  const steps = Array.isArray(d.steps) ? d.steps : null;
  if (!steps || steps.length !== 1 || (steps[0] !== 10 && steps[0] !== 100)) throw new Error(`${ID} ${who}: steps must be [10] or [100] (got ${JSON.stringify(d.steps)})`);
  return steps[0];
}
function literals(bank, steps, loc) {
  for (const s of steps) for (const dir of ['up', 'down']) if (typeof bank[dir][s] !== 'string' || !bank[dir][s].trim()) throw new Error(`${ID}: the ${loc} bank has no ${dir}[${s}] literal — refuse`);
  if (bank.relation !== 'approx' && bank.relation !== 'arrow') throw new Error(`${ID}: the bank's relation must be approx | arrow (got ${bank.relation})`);
}
function stampsOf(pairs) { return pairs.map(([k, v]) => `data-lcs-${k}="${String(v == null ? '' : v).replace(/"/g, '&quot;')}"`).join(' '); }

/* ---- F1 sort */
function resolveSort(d, bank) {
  const step = oneStep(d, 'sort');
  const cfg = {
    mode: 'sort', steps: [step], step, min: d.min, max: d.max, mix: d.mix || null, items: d.items, fiveMin: d.fiveMin,
    splitMin: d.splitMin, splitMax: d.splitMax, cells: d.cells, carryMax: d.carryMax == null ? Infinity : d.carryMax, carryMin: d.carryMin || 0,
    digitCover: d.digitCover !== false, digitMax: d.digitMax == null ? 2 : d.digitMax, rule: d.rule !== false,
    chip: d.chip || 72, chipGap: d.chipGap == null ? 10 : d.chipGap, chipRowGap: d.chipRowGap == null ? 12 : d.chipRowGap, chipCols: d.chipCols || 6, chipPx: d.chipPx || 28,
    cellW: d.cellW || 84, cellH: d.cellH || 44, cellGap: d.cellGap == null ? 10 : d.cellGap, cellCols: d.cellCols || 3, binW: d.binW || 330, pillH: d.pillH || 40, pillPx: d.pillPx || 18,
    worked: G.worked[step], relation: bank.relation,
  };
  if (!Number.isInteger(cfg.min) || !Number.isInteger(cfg.max) || cfg.min < 11 || cfg.max > G.max || cfg.min >= cfg.max) throw new Error(`${ID} sort: range ${cfg.min}..${cfg.max} must sit inside 11..${G.max}`);
  if (!Number.isInteger(cfg.items) || cfg.items < 8 || cfg.items > 16) throw new Error(`${ID} sort: ${cfg.items} items outside the G2-3 window [8, 16]`);
  if (cfg.mix) { const sum = Object.values(cfg.mix).reduce((s, x) => s + x, 0); if (sum !== cfg.items) throw new Error(`${ID} sort: mix sums to ${sum}, items ${cfg.items}`); }
  for (const k of ['fiveMin', 'splitMin', 'splitMax', 'cells']) if (!Number.isInteger(cfg[k]) || cfg[k] < 0) throw new Error(`${ID} sort: ${k} must be a non-negative integer`);
  if (cfg.fiveMin < 2) throw new Error(`${ID} sort: fiveMin ${cfg.fiveMin} < 2 — the 5 case sorts UP at least twice (the lesson)`);
  if (cfg.splitMin < 1 || cfg.splitMax > cfg.items - cfg.splitMin || cfg.splitMin > cfg.splitMax) throw new Error(`${ID} sort: split ${cfg.splitMin}..${cfg.splitMax} impossible for ${cfg.items} chips`);
  if (cfg.cells <= cfg.splitMax) throw new Error(`${ID} sort: cells ${cfg.cells} must EXCEED the largest split ${cfg.splitMax} (cells === a count forces the last decisions: the G1-351 leak rule)`);
  if (cfg.digitCover && (cfg.items < 9 || cfg.items > 9 * cfg.digitMax || cfg.fiveMin > cfg.digitMax)) throw new Error(`${ID} sort: digitCover infeasible for ${cfg.items} items at digitMax ${cfg.digitMax} / fiveMin ${cfg.fiveMin}`);
  // the composer's quotas from the split: both sides within splitMin..splitMax
  cfg.upMin = Math.max(cfg.splitMin, cfg.items - cfg.splitMax); cfg.downMin = cfg.upMin;
  if (cfg.fiveMin > cfg.upMin) cfg.upMin = cfg.fiveMin;
  if (cfg.upMin + cfg.downMin > cfg.items) throw new Error(`${ID} sort: the split quotas exceed ${cfg.items} chips`);
  if (cfg.chip < 52 || cfg.chipPx < 22) throw new Error(`${ID} sort: chip ${cfg.chip} / ${cfg.chipPx}px below the floor`);
  if (cfg.cellW < 84 || cfg.cellH < 44) throw new Error(`${ID} sort: cell ${cfg.cellW} x ${cfg.cellH} below the 84 x 44 floor`);
  if (!Number.isInteger(cfg.worked) || cfg.worked % step === 0) throw new Error(`${ID} sort: the worked example ${cfg.worked} is not roundable at ${step}`);
  const chipRows = Math.ceil(cfg.items / cfg.chipCols);
  cfg.laneH = LANE_PAD + chipRows * cfg.chip + (chipRows - 1) * cfg.chipRowGap;
  const cellRows = Math.ceil(cfg.cells / cfg.cellCols);
  cfg.binH = 12 + cfg.pillH + 12 + cellRows * cfg.cellH + (cellRows - 1) * cfg.cellGap + 16;
  cfg.stack = (cfg.rule ? RULE_H + GAP : 0) + cfg.laneH + GAP + cfg.binH;
  if (cfg.stack > STACK_MAX && !d._screen) throw new Error(`${ID} sort: stack ${cfg.stack} > ${STACK_MAX} (the fi four-line chrome)`);
  return cfg;
}

/* ---- F3 estimate */
function resolveEstimate(d, bank) {
  const step = oneStep(d, 'estimate');
  if (step !== 10) throw new Error(`${ID} estimate: the estimate face rounds to the TEN (steps [10]); [100] is not a face`);
  const cfg = {
    mode: 'estimate', steps: [step], step, addMin: d.addMin, addMax: d.addMax, sumMax: d.sumMax, roundedSumMax: d.roundedSumMax, items: d.items,
    fiveMin: d.fiveMin, upMin: d.upMin || 0, downMin: d.downMin || 0, digitCover: d.digitCover !== false, digitMax: d.digitMax == null ? 3 : d.digitMax,
    rule: d.rule !== false, rowH: d.rowH || 48, rowGap: d.rowGap == null ? 12 : d.rowGap, exprW: d.exprW || 80,
    worked: G.worked.estimate, relation: bank.relation,
  };
  if (!Number.isInteger(cfg.addMin) || !Number.isInteger(cfg.addMax) || cfg.addMin < 11 || cfg.addMax > 899 || cfg.addMin >= cfg.addMax) throw new Error(`${ID} estimate: addends ${cfg.addMin}..${cfg.addMax} must sit inside 11..899`);
  if (!Number.isInteger(cfg.sumMax) || !Number.isInteger(cfg.roundedSumMax) || cfg.sumMax > G.max || cfg.roundedSumMax > G.max) throw new Error(`${ID} estimate: sumMax / roundedSumMax must be <= ${G.max}`);
  if (!Number.isInteger(cfg.items) || cfg.items < 6 || cfg.items > 12) throw new Error(`${ID} estimate: ${cfg.items} lines outside [6, 12]`);
  if (!Number.isInteger(cfg.fiveMin) || cfg.fiveMin < 2) throw new Error(`${ID} estimate: fiveMin ${cfg.fiveMin} < 2 (the 5 case on >= 2 addends)`);
  if (cfg.upMin + cfg.downMin > 2 * cfg.items) throw new Error(`${ID} estimate: up ${cfg.upMin} + down ${cfg.downMin} > ${2 * cfg.items} addends`);
  if (cfg.digitCover && 2 * cfg.items < 9) throw new Error(`${ID} estimate: digitCover needs >= 9 addends`);
  if (cfg.digitCover && 2 * cfg.items > 9 * cfg.digitMax) throw new Error(`${ID} estimate: ${2 * cfg.items} addends cannot spread over 9 digits at most ${cfg.digitMax} each`);
  if (cfg.rowH < 48) throw new Error(`${ID} estimate: rowH ${cfg.rowH} < 48`);
  if (!Array.isArray(cfg.worked) || cfg.worked.length !== 2 || cfg.worked.some((x) => x % step === 0)) throw new Error(`${ID} estimate: the worked pair ${JSON.stringify(cfg.worked)} is not two roundable addends`);
  const exprMax = String(cfg.addMax).length * 2 + 3;   // "88 + 88" = 7 glyph slots
  if (exprMax > 7 && cfg.exprW < 130) throw new Error(`${ID} estimate: three-digit addends need exprW >= 130 (got ${cfg.exprW})`);
  cfg.stack = (cfg.rule ? RULE_H + GAP : 0) + LANE_PAD + cfg.items * cfg.rowH + (cfg.items - 1) * cfg.rowGap;
  if (cfg.stack > STACK_MAX && !d._screen) throw new Error(`${ID} estimate: stack ${cfg.stack} > ${STACK_MAX}`);
  return cfg;
}
/** The pool of unordered pairs a < b under cfg (both roundable, exact and rounded sums under the caps, never the worked pair). */
function pairPool(cfg) {
  const out = [];
  const [w1, w2] = cfg.worked;
  for (let a = cfg.addMin; a <= cfg.addMax; a++) {
    if (a % cfg.step === 0) continue;
    for (let b = a + 1; b <= cfg.addMax; b++) {
      if (b % cfg.step === 0) continue;
      if (a + b > cfg.sumMax) break;
      if (round(a, cfg.step) + round(b, cfg.step) > cfg.roundedSumMax) continue;
      if ((a === w1 && b === w2) || (a === w2 && b === w1)) continue;
      out.push([a, b]);
    }
  }
  return out;
}
/** F3's deal: `items` distinct pairs from the pool whose 2·items addends meet the digit quotas; each pair in a random orientation; null when no deal. */
function samplePairs(rng, cfg) {
  const pool = pairPool(cfg);
  if (pool.length < cfg.items) return null;
  for (let t = 0; t < MAX_TRIES; t++) {
    const pairs = rng.sample(pool, cfg.items);
    const adds = pairs.flat();
    const hist = {};
    adds.forEach((n) => { const dd = decidingDigit(n, cfg.step); hist[dd] = (hist[dd] || 0) + 1; });
    if ((hist[5] || 0) < cfg.fiveMin) continue;
    if (adds.filter((n) => isUp(n, cfg.step)).length < cfg.upMin || adds.filter((n) => !isUp(n, cfg.step)).length < cfg.downMin) continue;
    if (cfg.digitCover && [1, 2, 3, 4, 5, 6, 7, 8, 9].some((dd) => !hist[dd])) continue;
    if (Object.values(hist).some((c) => c > cfg.digitMax)) continue;
    return pairs.map(([a, b]) => (rng.next() < 0.5 ? [a, b] : [b, a]));
  }
  return null;
}

/* ---- F4 inverse */
function resolveInverse(d, bank) {
  const step = oneStep(d, 'inverse');
  const cfg = {
    mode: 'inverse', steps: [step], step, target: d.target, pills: d.pills, members: d.members, range: Array.isArray(d.range) ? d.range.slice() : null,
    nearMiss: Array.isArray(d.nearMiss) ? d.nearMiss.slice() : [], fiveIn: d.fiveIn !== false, digitCover: d.digitCover !== false, rule: d.rule !== false,
    pillW: d.pillW || 96, pillH: d.pillH || 52, gap: d.gap == null ? 24 : d.gap, rowGap: d.rowGap == null ? (d.gap == null ? 24 : d.gap) : d.rowGap, stagger: d.stagger == null ? 48 : d.stagger, perRow: d.perRow || 4, px: d.px || 26,
    targetH: d.targetH || 52, targetPx: d.targetPx || 28, fieldGap: d.fieldGap == null ? 16 : d.fieldGap,
    worked: d.worked != null ? d.worked : G.worked.inverse[step], relation: bank.relation,
  };
  if (!Number.isInteger(cfg.target) || cfg.target % step !== 0 || cfg.target < 2 * step || cfg.target > G.max - step) throw new Error(`${ID} inverse: target ${cfg.target} is not a multiple of ${step} inside the range`);
  if (!Number.isInteger(cfg.pills) || cfg.pills < 8 || cfg.pills > 16 || cfg.pills % cfg.perRow !== 0) throw new Error(`${ID} inverse: ${cfg.pills} pills must be 8..16 and fill rows of ${cfg.perRow}`);
  if (!Number.isInteger(cfg.members) || cfg.members < 2 || cfg.members >= cfg.pills) throw new Error(`${ID} inverse: members ${cfg.members} outside 2..${cfg.pills - 1}`);
  if (!cfg.range || cfg.range.length !== 2 || cfg.range[0] < 11 || cfg.range[1] > G.max || cfg.range[0] >= cfg.range[1]) throw new Error(`${ID} inverse: range ${JSON.stringify(cfg.range)} must sit inside 11..${G.max}`);
  const inRange = (v) => v >= cfg.range[0] && v <= cfg.range[1];
  const isMember = (v) => round(v, step) === cfg.target;
  cfg.memberPool = []; cfg.otherPool = [];
  for (let v = cfg.range[0]; v <= cfg.range[1]; v++) { if (v % step === 0 || v === cfg.target) continue; (isMember(v) ? cfg.memberPool : cfg.otherPool).push(v); }
  // Level Set level 1: every non-member at least `farFrom` away from the target (another ten — no near miss to weigh)
  cfg.farFrom = d.farFrom || 0;
  if (cfg.farFrom) cfg.otherPool = cfg.otherPool.filter((v) => Math.abs(v - cfg.target) >= cfg.farFrom);
  cfg.five = cfg.target - step / 2;
  if (cfg.fiveIn && !cfg.memberPool.includes(cfg.five)) throw new Error(`${ID} inverse: the 5 case ${cfg.five} is not in the range`);
  for (const v of cfg.nearMiss) { if (!inRange(v) || v % step === 0 || isMember(v)) throw new Error(`${ID} inverse: near miss ${v} must be a non-member in range`); }
  if (new Set(cfg.nearMiss).size !== cfg.nearMiss.length) throw new Error(`${ID} inverse: a near miss twice`);
  if (cfg.memberPool.length < cfg.members) throw new Error(`${ID} inverse: only ${cfg.memberPool.length} members in range, ${cfg.members} asked`);
  if (cfg.otherPool.length - cfg.nearMiss.length < cfg.pills - cfg.members - cfg.nearMiss.length) throw new Error(`${ID} inverse: not enough non-members in range`);
  if (!Number.isInteger(cfg.worked) || cfg.worked % step === 0 || isMember(cfg.worked)) throw new Error(`${ID} inverse: the worked example ${cfg.worked} must round to another ${step} than the target`);
  if (cfg.pillW < 52 || cfg.pillH < 52 || cfg.px < 22 || cfg.targetH < 44 || cfg.targetPx < 22) throw new Error(`${ID} inverse: pills / target below the 52 / 22 floors`);
  if (cfg.gap < 20 || cfg.rowGap < 20) throw new Error(`${ID} inverse: pill gaps ${cfg.gap} / ${cfg.rowGap} < 20 (the pencil-ring reserve)`);
  const rows = cfg.pills / cfg.perRow;
  cfg.fieldH = rows * cfg.pillH + (rows - 1) * cfg.rowGap;
  cfg.stack = (cfg.rule ? RULE_H + GAP : 0) + LANE_PAD + cfg.targetH + cfg.fieldGap + cfg.fieldH;
  if (cfg.stack > STACK_MAX && !d._screen) throw new Error(`${ID} inverse: stack ${cfg.stack} > ${STACK_MAX}`);
  return cfg;
}
/** F4's deal: exactly `members` members (the 5 case always in when fiveIn), the near misses always in, the rest non-members; every ones digit 1..9 present when digitCover; shuffled. */
function sampleField(rng, cfg) {
  for (let t = 0; t < MAX_TRIES; t++) {
    const members = cfg.fiveIn ? [cfg.five, ...rng.sample(cfg.memberPool.filter((v) => v !== cfg.five), cfg.members - 1)] : rng.sample(cfg.memberPool, cfg.members);
    const others = [...cfg.nearMiss, ...rng.sample(cfg.otherPool.filter((v) => !cfg.nearMiss.includes(v)), cfg.pills - cfg.members - cfg.nearMiss.length)];
    const all = [...members, ...others];
    if (cfg.digitCover) { const seen = new Set(all.map((v) => decidingDigit(v, cfg.step))); if ([1, 2, 3, 4, 5, 6, 7, 8, 9].some((dd) => !seen.has(dd))) continue; }
    return rng.shuffle(all);
  }
  return null;
}

/* ---- F5 both */
function resolveBoth(d, bank) {
  const steps = Array.isArray(d.steps) ? d.steps.slice() : null;
  if (!steps || steps.length !== 2 || steps[0] !== 10 || steps[1] !== 100) throw new Error(`${ID} both: steps must be [10, 100] (got ${JSON.stringify(d.steps)})`);
  const fm = d.fiveMin && typeof d.fiveMin === 'object' ? d.fiveMin : null;
  const cfg = {
    face: 'both', steps, min: d.min, max: d.max, items: d.items, cols: d.cols || 1, fiveMin: fm ? { 10: fm[10], 100: fm[100] } : null,
    upMin: d.upMin || 0, downMin: d.downMin || 0, digitMax: d.digitMax == null ? 2 : d.digitMax, digitDistinct: d.digitDistinct || 0, carryMax: d.carryMax == null ? Infinity : d.carryMax,
    rule: d.rule !== false, rowH: d.rowH || 44, rowGap: d.rowGap == null ? 10 : d.rowGap, worked: G.worked.both, trapMin: d.trapMin || 0, relation: bank.relation, heads: { 10: bank.heads && bank.heads[10], 100: bank.heads && bank.heads[100] },
  };
  if (!Number.isInteger(cfg.min) || !Number.isInteger(cfg.max) || cfg.min < 101 || cfg.max > 949 || cfg.min >= cfg.max) throw new Error(`${ID} both: range ${cfg.min}..${cfg.max} must sit inside 101..949 (round(n, 100) <= 999)`);
  if (!Number.isInteger(cfg.items) || cfg.items < 6 || cfg.items > 12) throw new Error(`${ID} both: ${cfg.items} lines outside [6, 12]`);
  if (cfg.cols !== 1) throw new Error(`${ID} both: the two-box line is 380 wide — one column`);
  if (!cfg.fiveMin || !Number.isInteger(cfg.fiveMin[10]) || !Number.isInteger(cfg.fiveMin[100]) || cfg.fiveMin[10] < 2 || cfg.fiveMin[100] < 2) throw new Error(`${ID} both: fiveMin must be {10: >= 2, 100: >= 2} (the 5 case at BOTH places)`);
  if (cfg.upMin + cfg.downMin > cfg.items) throw new Error(`${ID} both: up ${cfg.upMin} + down ${cfg.downMin} > ${cfg.items}`);
  if (cfg.fiveMin[10] > cfg.digitMax) throw new Error(`${ID} both: fiveMin[10] ${cfg.fiveMin[10]} > digitMax ${cfg.digitMax}`);
  if (cfg.digitDistinct > cfg.items || cfg.digitDistinct > 9) throw new Error(`${ID} both: digitDistinct ${cfg.digitDistinct} impossible for ${cfg.items} lines`);
  if (cfg.rowH < 44) throw new Error(`${ID} both: rowH ${cfg.rowH} < 44`);
  for (const s of steps) if (typeof cfg.heads[s] !== 'string' || !cfg.heads[s].trim()) throw new Error(`${ID}: the bank has no heads[${s}] literal — refuse`);
  if (!Number.isInteger(cfg.worked) || cfg.worked % 10 === 0 || round(cfg.worked, 100) > G.max) throw new Error(`${ID} both: the worked example ${cfg.worked} is not roundable at both places`);
  cfg.stack = (cfg.rule ? RULE_H + GAP : 0) + LANE_PAD + 24 + 6 + cfg.items * cfg.rowH + (cfg.items - 1) * cfg.rowGap;
  if (cfg.stack > STACK_MAX && !d._screen) throw new Error(`${ID} both: stack ${cfg.stack} > ${STACK_MAX}`);
  return cfg;
}
/** F5's pool: in range, ones digit != 0 (both roundings non-trivial), round(n, 100) <= 999, never the worked number. */
function poolBoth(cfg) {
  const out = [];
  for (let n = cfg.min; n <= cfg.max; n++) { if (n % 10 === 0 || n === cfg.worked || round(n, 100) > G.max) continue; out.push(n); }
  return out;
}
/**
 * F5's deal: the ones digits are `fiveMin[10]` fives + `downMin` digits from 1-4 + the rest from 6-9 (no digit
 * over digitMax, >= digitDistinct distinct); `fiveMin[100]` of the lines get tens digit 5; one number per slot
 * from the pool; carries capped; ONE shuffle. Null when no deal.
 */
function composeBoth(rng, cfg) {
  const pool = poolBoth(cfg);
  const byOnes = {}; for (const n of pool) (byOnes[n % 10] = byOnes[n % 10] || []).push(n);
  for (let t = 0; t < MAX_TRIES; t++) {
    const fives = cfg.fiveMin[10];
    const downs = Math.max(cfg.downMin, 0);
    const rest = cfg.items - fives - downs;
    if (rest < 0) return null;
    const ups = Math.max(cfg.upMin - fives, 0);
    if (ups > rest) return null;
    const digits = Array(fives).fill(5);
    let guard = 0;
    while (digits.length < fives + downs && guard++ < 100) { const dd = rng.int(1, 4); if (digits.filter((x) => x === dd).length < cfg.digitMax) digits.push(dd); }
    while (digits.length < fives + downs + ups && guard++ < 100) { const dd = rng.int(6, 9); if (digits.filter((x) => x === dd).length < cfg.digitMax) digits.push(dd); }
    while (digits.length < cfg.items && guard++ < 200) { const dd = rng.int(1, 9); if (dd !== 5 && digits.filter((x) => x === dd).length < cfg.digitMax) digits.push(dd); }
    if (digits.length !== cfg.items) continue;
    if (new Set(digits).size < cfg.digitDistinct) continue;
    const order = rng.shuffle(digits);
    const tensFive = new Set(rng.sample(order.map((_, i) => i), cfg.fiveMin[100]));
    const used = new Set(); const items = []; let ok = true;
    for (let i = 0; i < order.length; i++) {
      const cands = (byOnes[order[i]] || []).filter((n) => !used.has(n) && (tensFive.has(i) ? Math.floor(n / 10) % 10 === 5 : true));
      if (!cands.length) { ok = false; break; }
      const n = rng.pick(cands); used.add(n); items.push(n);
    }
    if (!ok) continue;
    if (items.filter((n) => carries(n, 10)).length > cfg.carryMax) continue;
    if (items.filter((n) => Math.floor(n / 10) % 10 === 5).length < cfg.fiveMin[100]) continue;
    if (cfg.trapMin && items.filter(isTrap).length < cfg.trapMin) continue;
    return rng.shuffle(items);
  }
  return null;
}

/* ---- the face verifies (page side; self-contained, own copies of the rule) */
function VERIFY_FACE(face) {
  const fails = [];
  const root = document.querySelector('[data-lcs-round]');
  if (!root) return ['no rounding root'];
  const D = root.dataset;
  const round = (n, step) => Math.floor(n / step + 0.5) * step;
  const deciding = (n, step) => Math.floor(n / (step / 10)) % 10;
  const carries = (n, step) => Math.floor(round(n, step) / (step * 10)) !== Math.floor(n / (step * 10));
  const body = document.querySelector('.ws-body');
  const CORAL = 'rgb(242,120,75)';
  const rect = (el) => el.getBoundingClientRect();
  const fontOf = (el) => parseFloat(getComputedStyle(el).fontSize);
  const textNodes = (el) => { const out = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = tw.nextNode())) if (n.textContent.trim()) out.push(n); return out; };
  const nextGlyph = (el) => { let n = el.nextSibling; while (n && ((n.nodeType === 3 && !n.textContent.trim()) || (n.nodeType === 1 && n.tagName === 'SPAN' && !n.textContent.trim() && !n.querySelector('svg')))) n = n.nextSibling; return n && n.nodeType === 1 && n.tagName.toLowerCase() === 'svg' && n.hasAttribute('data-lcs-rel') ? n : null; };
  const step = +D.lcsStep, worked = D.lcsExample;
  const rule = D.lcsRule === '1';
  const box = root.querySelector('[data-lcs-rulebox]');
  if (rule && !box) fails.push('no rule box (config says rule)');
  if (!rule && box) fails.push('a rule box on a page whose config withdraws it');
  /** The shared rule-box contract: the strip 0..9 under the right arrows, the ring on `ringDigit`, the captions = the bank literals. */
  function checkStrip(ringDigit) {
    const digits = [...box.querySelectorAll('[data-lcs-strip-digit]')];
    if (digits.map((d) => d.dataset.lcsStripDigit).join('') !== '0123456789') fails.push(`strip digits in order ${digits.map((d) => d.dataset.lcsStripDigit).join('')}`);
    digits.forEach((d) => { if (d.textContent.trim() !== d.dataset.lcsStripDigit) fails.push(`strip digit ${d.dataset.lcsStripDigit} prints "${d.textContent.trim()}"`); });
    for (const dir of ['down', 'up']) {
      const blk = box.querySelector(`[data-lcs-strip-block="${dir}"]`);
      if (!blk) { fails.push(`no ${dir} strip block`); continue; }
      const ds = [...blk.querySelectorAll('[data-lcs-strip-digit]')].map((d) => d.dataset.lcsStripDigit).join('');
      if (ds !== (dir === 'down' ? '01234' : '56789')) fails.push(`${dir} block holds ${ds}`);
      const arrow = blk.querySelector('[data-lcs-arrow]');
      if (!arrow || arrow.dataset.lcsArrow !== dir || arrow.textContent.trim() !== (dir === 'down' ? '↓' : '↑')) fails.push(`${dir} block arrow ${arrow ? '"' + arrow.textContent.trim() + '"' : 'missing'}`);
      const cap = blk.querySelector('[data-lcs-caption]');
      const want = dir === 'down' ? D.lcsDown : D.lcsUp;
      if (!cap || cap.textContent.trim() !== want) fails.push(`${dir} caption "${cap ? cap.textContent.trim() : ''}" != the bank literal "${want}"`);
      if (cap && cap.scrollWidth > cap.clientWidth + 0.6) fails.push(`${dir} caption overflows its block`);
    }
    const ringed = digits.filter((d) => d.hasAttribute('data-lcs-rule-digit'));
    if (ringed.length !== 1) fails.push(`${ringed.length} ringed strip digits (want 1)`);
    else if (ringed[0].dataset.lcsStripDigit !== String(ringDigit)) fails.push(`the ring sits on ${ringed[0].dataset.lcsStripDigit}, the example's deciding digit is ${ringDigit}`);
    if (ringed[0] && getComputedStyle(ringed[0]).borderTopColor.replace(/\s/g, '') !== CORAL) fails.push('the strip ring is not coral');
    if (D.lcsDown === D.lcsUp) fails.push('down and up captions are the same literal');
    if (box.querySelectorAll('svg').length !== box.querySelectorAll('svg[data-lcs-rel]').length) fails.push('an SVG other than the relation glyph inside the rule box');
  }
  function checkWorked(w, n, to, digitText) {
    if (+w.dataset.lcsWorked !== n) fails.push(`worked line ${w.dataset.lcsWorked} != ${n}`);
    if (+w.dataset.lcsWorkedTo !== to) fails.push(`worked ${n} -> ${w.dataset.lcsWorkedTo} != ${to}`);
    const rd = w.querySelector('[data-lcs-rule-digit]');
    if (!rd) fails.push(`no coral deciding digit in the worked line ${n}`);
    else {
      if (rd.textContent.trim() !== String(digitText)) fails.push(`the worked line ${n} marks "${rd.textContent.trim()}", want ${digitText}`);
      if (getComputedStyle(rd).color.replace(/\s/g, '') !== CORAL) fails.push('the deciding digit is not coral');
    }
    if (!w.querySelector('svg[data-lcs-rel]')) fails.push(`the worked line ${n} has no SVG relation glyph`);
  }
  /* ---- per face */
  if (face === 'sort') {
    const items = +D.lcsItems, min = +D.lcsMin, max = +D.lcsMax, cells = +D.lcsCells, splitMin = +D.lcsSplitmin, splitMax = +D.lcsSplitmax, fiveMin = +D.lcsFivemin;
    const carryMax = D.lcsCarrymax === '' ? Infinity : +D.lcsCarrymax, digitCover = D.lcsDigitcover === '1', digitMax = +(D.lcsDigitmax || 99);
    const mix = D.lcsMix ? Object.fromEntries(D.lcsMix.split(';').map((p) => p.split(':').map(Number))) : null;
    const lane = root.querySelector('[data-lcs-chips]');
    const chips = lane ? [...lane.querySelectorAll('.ws-chip[data-lcs-val]')] : [];
    if (!lane) fails.push('no chip lane');
    if (chips.length !== items) fails.push(`${chips.length} chips, config says ${items}`);
    const vs = []; const seen = new Set();
    chips.forEach((c, i) => {
      const v = +c.dataset.lcsVal; const L = `chip ${i + 1}`;
      if (!Number.isInteger(v) || v < min || v > max) fails.push(`${L}: ${v} outside ${min}..${max}`);
      if (v % step === 0) fails.push(`${L}: ${v} is a multiple of ${step} — not a chip`);
      if (deciding(v, step) === 0) fails.push(`${L}: ${v} has deciding digit 0`);
      if (seen.has(v)) fails.push(`${L}: ${v} twice`); seen.add(v); vs.push(v);
      if (String(v) === worked) fails.push(`${L}: the worked number ${worked} is a chip`);
      if (c.textContent.trim() !== String(v)) fails.push(`${L}: prints "${c.textContent.trim()}"`);
      if (fontOf(c) < 22) fails.push(`${L}: numeral ${fontOf(c)}px < 22`);
      const r = rect(c); if (r.width < 52 - 0.6 || r.height < 52 - 0.6) fails.push(`${L}: chip ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < 52`);
      if (c.scrollWidth > c.clientWidth + 0.6) fails.push(`${L}: numeral overflows its disc`);
      for (const a of c.getAttributeNames()) if (/correct|member|dir|bin|answer/.test(a)) fails.push(`${L}: a ${a} stamp (the direction rides on nothing but the value)`);
    });
    const fives = vs.filter((v) => deciding(v, step) === 5).length, ups = vs.filter((v) => deciding(v, step) >= 5).length, downs = vs.length - ups, carry = vs.filter((v) => carries(v, step)).length;
    if (fives < fiveMin) fails.push(`${fives} chips with deciding digit 5 < fiveMin ${fiveMin}`);
    if (ups < splitMin || ups > splitMax || downs < splitMin || downs > splitMax) fails.push(`split up ${ups} / down ${downs} outside ${splitMin}..${splitMax}`);
    if (!(cells > Math.max(ups, downs))) fails.push(`cells ${cells} <= the larger split ${Math.max(ups, downs)} (the empty cells force the last decisions)`);
    if (cells === ups || cells === downs) fails.push(`cells ${cells} equals a bin's count (a full bin leaks the split)`);
    if (carry > carryMax) fails.push(`${carry} carry cases > carryMax ${carryMax}`);
    if (mix) for (const [k, c] of Object.entries(mix)) { const have = vs.filter((v) => String(v).length === +k).length; if (have !== c) fails.push(`${have} ${k}-digit chips, mix says ${c}`); }
    const hist = {}; vs.forEach((v) => { const dd = deciding(v, step); hist[dd] = (hist[dd] || 0) + 1; });
    if (digitCover) for (let dd = 1; dd <= 9; dd++) if (!hist[dd]) fails.push(`deciding digit ${dd} never appears (digitCover)`);
    for (const [dd, c] of Object.entries(hist)) if (c > digitMax) fails.push(`deciding digit ${dd} appears ${c} > digitMax ${digitMax}`);
    // the chips sit in rows (every chip's top is one of ceil(items / cols) values)
    const tops = new Set(chips.map((c) => Math.round(rect(c).top)));
    const wantRows = Math.ceil(items / +(D.lcsChipcols || 6));
    if (chips.length && tops.size !== wantRows) fails.push(`chips sit on ${tops.size} rows, want ${wantRows}`);
    // the bins
    const bins = [...root.querySelectorAll('[data-lcs-bin]')];
    if (bins.map((b) => b.dataset.lcsBin).join(',') !== 'down,up') fails.push(`bins ${bins.map((b) => b.dataset.lcsBin).join(',')} (want down, up in DOM order)`);
    if (bins.length === 2 && !(rect(bins[0]).right <= rect(bins[1]).left + 0.6)) fails.push('the down bin is not LEFT of the up bin');
    bins.forEach((b) => {
      const dir = b.dataset.lcsBin;
      if (+b.dataset.lcsCells !== cells) fails.push(`${dir} bin stamps ${b.dataset.lcsCells} cells, config ${cells}`);
      const boxes = [...b.querySelectorAll('.ws-blankbox')];
      if (boxes.length !== cells) fails.push(`${dir} bin holds ${boxes.length} boxes, want ${cells}`);
      boxes.forEach((x, i) => {
        if (x.textContent.trim() || x.childNodes.length) fails.push(`${dir} cell ${i + 1} is not empty`);
        if (x.getAttribute('data-lcs-answer')) fails.push(`${dir} cell ${i + 1} carries an answer (the truth rides on the chips)`);
        const r = rect(x); if (r.width < 84 - 0.6 || r.height < 44 - 0.6) fails.push(`${dir} cell ${i + 1} ${r.width.toFixed(1)} x ${r.height.toFixed(1)} below 84 x 44`);
        if (r.right > rect(b).right + 0.6 || r.bottom > rect(b).bottom + 0.6) fails.push(`${dir} cell ${i + 1} spills out of its bin`);
      });
      const pill = b.querySelector('[data-lcs-bin-label]');
      if (!pill) { fails.push(`${dir} bin has no label pill`); return; }
      const arrow = pill.querySelector('[data-lcs-arrow]');
      if (!arrow || arrow.dataset.lcsArrow !== dir || arrow.textContent.trim() !== (dir === 'down' ? '↓' : '↑')) fails.push(`${dir} pill arrow ${arrow ? '"' + arrow.textContent.trim() + '"' : 'missing'}`);
      const text = pill.querySelector('[data-lcs-bin-text]');
      const want = dir === 'down' ? D.lcsDown : D.lcsUp;
      if (!text || text.textContent.trim() !== want) fails.push(`${dir} pill "${text ? text.textContent.trim() : ''}" != the bank literal "${want}"`);
      if (pill.scrollWidth > pill.clientWidth + 0.6) fails.push(`${dir} pill overflows (refuse the literal, never the font)`);
      if (rect(pill).height < 40 - 0.6) fails.push(`${dir} pill ${rect(pill).height.toFixed(1)} high < 40`);
      if (fontOf(text) < 16) fails.push(`${dir} pill font ${fontOf(text)} < 16`);
      if (rect(pill).width > rect(b).width + 0.6) fails.push(`${dir} pill wider than its bin`);
    });
    // answer hiding: outside the rule box, no text node equals any chip's rounded value; no line rows
    const rounded = new Set(vs.map((v) => String(round(v, step))));
    for (const tn of textNodes(root)) { if (box && box.contains(tn)) continue; if (rounded.has(tn.textContent.trim())) fails.push(`the rounded value ${tn.textContent.trim()} is printed on the sort face`); }
    if (root.querySelector('[data-lcs-row]')) fails.push('a write line on the sort face (nothing is written but the sorting)');
    if (box) { const ws = [...box.querySelectorAll('[data-lcs-worked]')]; if (ws.length !== 1) fails.push(`${ws.length} worked lines`); else { checkWorked(ws[0], +worked, round(+worked, step), deciding(+worked, step)); if (vs.includes(+worked)) fails.push('the worked number is a chip'); } checkStrip(deciding(+worked, step)); }
    if (!chips.length) fails.push('non-vacuity: 0 chips');
  } else if (face === 'estimate') {
    const items = +D.lcsItems, addMin = +D.lcsAddmin, addMax = +D.lcsAddmax, sumMax = +D.lcsSummax, roundedSumMax = +D.lcsRoundedsummax, fiveMin = +D.lcsFivemin;
    const upMin = +(D.lcsUpmin || 0), downMin = +(D.lcsDownmin || 0), digitCover = D.lcsDigitcover === '1', digitMax = +(D.lcsDigitmax || 99);
    const [w1, w2] = worked.split('+').map(Number);
    const rows = [...root.querySelectorAll('[data-lcs-row]')];
    if (rows.length !== items) fails.push(`${rows.length} lines, config says ${items}`);
    const adds = []; const sets = new Set();
    rows.forEach((row, i) => {
      const L = `line ${i + 1}`;
      const a = +row.dataset.lcsA, b = +row.dataset.lcsB;
      if (+row.dataset.lcsStep !== step) fails.push(`${L}: step ${row.dataset.lcsStep}`);
      for (const x of [a, b]) { if (!Number.isInteger(x) || x < addMin || x > addMax) fails.push(`${L}: addend ${x} outside ${addMin}..${addMax}`); if (x % step === 0) fails.push(`${L}: addend ${x} is a multiple of ${step}`); adds.push(x); }
      if (a === b) fails.push(`${L}: the two addends are the same number`);
      if (a + b > sumMax) fails.push(`${L}: ${a} + ${b} = ${a + b} > sumMax ${sumMax}`);
      const ra = round(a, step), rb = round(b, step), sum = ra + rb;
      if (sum > roundedSumMax) fails.push(`${L}: rounded sum ${sum} > ${roundedSumMax}`);
      const key = [a, b].sort((x, y) => x - y).join('+');
      if (sets.has(key)) fails.push(`${L}: the pair ${key} twice`); sets.add(key);
      if (key === [w1, w2].sort((x, y) => x - y).join('+')) fails.push(`${L}: the worked pair is a line`);
      const expr = row.querySelector('[data-lcs-expr]');
      if (!expr) { fails.push(`${L}: no expression`); return; }
      if (expr.textContent.replace(/\s+/g, ' ').trim() !== `${a} + ${b}`) fails.push(`${L}: prints "${expr.textContent.trim()}" for ${a} + ${b}`);
      if (fontOf(expr) < 22) fails.push(`${L}: expression ${fontOf(expr)}px < 22`);
      if (expr.scrollWidth > expr.clientWidth + 0.6) fails.push(`${L}: expression overflows its zone`);
      if (!nextGlyph(expr)) fails.push(`${L}: the node after the expression is not the SVG relation glyph`);
      const boxes = [...row.querySelectorAll('.ws-blankbox')];
      const wantAns = [String(ra), String(rb), String(sum)], roles = ['a', 'b', 'sum'];
      if (boxes.length !== 3) fails.push(`${L}: ${boxes.length} boxes (want 3)`);
      boxes.forEach((x, j) => {
        if (x.getAttribute('data-lcs-answer') !== wantAns[j]) fails.push(`${L}: box ${j + 1} answer ${x.getAttribute('data-lcs-answer')} != ${wantAns[j]}`);
        if (x.dataset.lcsRole !== roles[j]) fails.push(`${L}: box ${j + 1} role ${x.dataset.lcsRole}`);
        if (x.textContent.trim() || x.childNodes.length) fails.push(`${L}: box ${j + 1} is not empty`);
        const r = rect(x); const need = wantAns[j].length >= 3 ? 76 : 68;
        if (r.height < 44 - 0.6 || r.width < need - 0.6) fails.push(`${L}: box ${j + 1} ${r.width.toFixed(1)} x ${r.height.toFixed(1)} below ${need} x 44`);
      });
      // the row's text: the badge, the expression, the + and the = signs — never the exact sum, never a rounded value
      const extra = textNodes(row).filter((tn) => !tn.parentElement.closest('[data-lcs-idx], [data-lcs-expr]')).map((tn) => tn.textContent.trim());
      const bad = extra.filter((t) => t !== '+' && t !== '=');
      if (bad.length) fails.push(`${L}: text beyond the badge / expression / signs ("${bad.join(' ')}")` + (bad.includes(String(a + b)) ? ` — the exact sum ${a + b} is printed` : ''));
      if (extra.filter((t) => t === '=').length !== 1) fails.push(`${L}: ${extra.filter((t) => t === '=').length} = signs (want exactly one, after the second box)`);
      const eq = textNodes(row).find((tn) => tn.textContent.trim() === '=');
      if (eq) { let p = eq.parentElement; let prev = p.previousSibling; while (prev && prev.nodeType === 1 && !prev.classList.contains('ws-blankbox') && !prev.textContent.trim()) prev = prev.previousSibling; if (!prev || prev.nodeType !== 1 || !prev.classList.contains('ws-blankbox')) fails.push(`${L}: the = does not follow a box`); }
      const badge = row.querySelector('[data-lcs-idx]');
      if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${L}: badge "${badge ? badge.textContent.trim() : ''}" != ${i + 1}`);
      if (rect(row).width > 639 + 0.6) fails.push(`${L}: row ${rect(row).width.toFixed(1)} > 639`);
      if (i && rect(row).top <= rect(rows[i - 1]).bottom - 0.6) fails.push(`${L}: not below line ${i}`);
    });
    const hist = {}; adds.forEach((n) => { const dd = deciding(n, step); hist[dd] = (hist[dd] || 0) + 1; });
    if ((hist[5] || 0) < fiveMin) fails.push(`${hist[5] || 0} addends with the 5 case < fiveMin ${fiveMin}`);
    const ups = adds.filter((n) => deciding(n, step) >= 5).length;
    if (ups < upMin || adds.length - ups < downMin) fails.push(`addends up ${ups} / down ${adds.length - ups} under the quotas ${upMin} / ${downMin}`);
    if (digitCover) for (let dd = 1; dd <= 9; dd++) if (!hist[dd]) fails.push(`deciding digit ${dd} never appears among the addends (digitCover)`);
    for (const [dd, c] of Object.entries(hist)) if (c > digitMax) fails.push(`deciding digit ${dd} appears ${c} > digitMax ${digitMax}`);
    const re = [...root.querySelectorAll('[data-lcs-rounded-expr]')];
    if (re.some((x) => !box || !box.contains(x))) fails.push('a rounded expression outside the rule box');
    if (box) {
      const ws = [...box.querySelectorAll('[data-lcs-worked]')];
      if (ws.length !== 1) fails.push(`${ws.length} worked lines`);
      else {
        const w = ws[0]; const rw1 = round(w1, step), rw2 = round(w2, step);
        if (w.dataset.lcsWorked !== `${w1}+${w2}` || +w.dataset.lcsWorkedTo !== rw1 + rw2) fails.push(`worked ${w.dataset.lcsWorked} -> ${w.dataset.lcsWorkedTo} != ${w1}+${w2} -> ${rw1 + rw2}`);
        const rd = w.querySelector('[data-lcs-rule-digit]');
        if (!rd || rd.textContent.trim() !== String(deciding(w2, step))) fails.push(`the worked line marks "${rd ? rd.textContent.trim() : ''}", the second addend's deciding digit is ${deciding(w2, step)}`);
        if (rd && getComputedStyle(rd).color.replace(/\s/g, '') !== CORAL) fails.push('the deciding digit is not coral');
        const rx = w.querySelector('[data-lcs-rounded-expr]');
        if (!rx || rx.textContent.replace(/\s+/g, ' ').trim() !== `${rw1} + ${rw2} = ${rw1 + rw2}`) fails.push(`the rounded expression prints "${rx ? rx.textContent.trim() : ''}"`);
        if (!w.querySelector('svg[data-lcs-rel]')) fails.push('the worked line has no SVG relation glyph');
      }
      checkStrip(deciding(w2, step));
    }
    if (!rows.length) fails.push('non-vacuity: 0 lines');
  } else if (face === 'inverse') {
    const target = +D.lcsTarget, pills = +D.lcsPills, members = +D.lcsMembers, lo = +D.lcsRangeLo, hi = +D.lcsRangeHi, fiveIn = D.lcsFivein === '1', digitCover = D.lcsDigitcover === '1';
    const nearMiss = D.lcsNearmiss ? D.lcsNearmiss.split(',').map(Number) : [];
    const field = root.querySelector('[data-lcs-field]');
    const tp = root.querySelector('[data-lcs-target-pill]');
    if (!field) fails.push('no number field');
    if (!tp) fails.push('no target pill');
    if (target % step !== 0) fails.push(`target ${target} is not a multiple of ${step}`);
    if (tp && tp.textContent.trim() !== String(target)) fails.push(`the target pill prints "${tp.textContent.trim()}", the field's target is ${target}`);
    if (tp && !tp.querySelector('svg[data-lcs-rel]')) fails.push('the target pill has no relation glyph');
    if (tp && fontOf(tp) < 22) fails.push(`target pill font ${fontOf(tp)} < 22`);
    if (field && (+field.dataset.lcsTarget !== target || +field.dataset.lcsStep !== step)) fails.push(`the field stamps target ${field.dataset.lcsTarget} / step ${field.dataset.lcsStep}`);
    if (tp && field && rect(tp).bottom > rect(field).top + 0.6) fails.push('the target pill is not above the field');
    const ps = field ? [...field.querySelectorAll('[data-lcs-val]')] : [];
    if (ps.length !== pills) fails.push(`${ps.length} pills, config says ${pills}`);
    const vs = []; const seen = new Set();
    ps.forEach((p, i) => {
      const v = +p.dataset.lcsVal; const L = `pill ${i + 1}`;
      if (!Number.isInteger(v) || v < lo || v > hi) fails.push(`${L}: ${v} outside ${lo}..${hi}`);
      if (v % step === 0) fails.push(`${L}: ${v} is a multiple of ${step}`);
      if (v === target) fails.push(`${L}: the target itself is a pill`);
      if (String(v) === worked) fails.push(`${L}: the worked number is a pill`);
      if (seen.has(v)) fails.push(`${L}: ${v} twice`); seen.add(v); vs.push(v);
      if (p.textContent.trim() !== String(v)) fails.push(`${L}: prints "${p.textContent.trim()}"`);
      if (fontOf(p) < 22) fails.push(`${L}: numeral ${fontOf(p)}px < 22`);
      const r = rect(p); if (r.width < 52 - 0.6 || r.height < 52 - 0.6) fails.push(`${L}: ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < 52`);
      for (const a of p.getAttributeNames()) if (/correct|member|answer|in\b|out\b|dir/.test(a)) fails.push(`${L}: a membership stamp "${a}" (the DOM must not separate members from distractors)`);
      for (const s of ['borderTopColor', 'backgroundColor', 'borderTopWidth', 'fontWeight']) if (i && getComputedStyle(p)[s] !== getComputedStyle(ps[0])[s]) fails.push(`${L}: ${s} differs from pill 1 (a visual member cue)`);
    });
    const mem = vs.filter((v) => round(v, step) === target).length;
    if (mem !== members) fails.push(`${mem} members re-derived, config says ${members}`);
    for (const v of nearMiss) if (!vs.includes(v)) fails.push(`near miss ${v} is missing from the field`);
    if (D.lcsFarfrom) for (const v of vs) if (round(v, step) !== target && Math.abs(v - target) < +D.lcsFarfrom) fails.push(`non-member ${v} is closer than ${D.lcsFarfrom} to the target ${target} (level 1: only clearly-far numbers)`);
    if (fiveIn && !vs.includes(target - step / 2)) fails.push(`the 5 case ${target - step / 2} is missing from the field`);
    if (digitCover) { const seenD = new Set(vs.map((v) => deciding(v, step))); for (let dd = 1; dd <= 9; dd++) if (!seenD.has(dd)) fails.push(`deciding digit ${dd} never appears (digitCover)`); }
    // ring room: neighbours >= 20 px apart in x (within a row) and y (between rows)
    const rowsEl = field ? [...field.querySelectorAll('[data-lcs-field-row]')] : [];
    rowsEl.forEach((row, ri) => {
      const cs = [...row.querySelectorAll('[data-lcs-val]')];
      for (let j = 1; j < cs.length; j++) { const g = rect(cs[j]).left - rect(cs[j - 1]).right; if (g < 20 - 0.6) fails.push(`row ${ri + 1}: pills ${g.toFixed(1)} px apart < 20 (ring room)`); }
      if (ri) { const g = rect(row).top - rect(rowsEl[ri - 1]).bottom; if (g < 20 - 0.6) fails.push(`rows ${ri} / ${ri + 1} ${g.toFixed(1)} px apart < 20 (ring room)`); }
      if (rect(row).width > 639 + 0.6) fails.push(`row ${ri + 1} ${rect(row).width.toFixed(1)} > 639`);
    });
    if (rowsEl.length >= 2 && Math.abs(rect(rowsEl[0]).left - rect(rowsEl[1]).left) < 20) fails.push('the rows do not stagger (a table, not a field)');
    if (root.querySelector('.ws-blankbox')) fails.push('a write box on the inverse face (the child circles)');
    if (root.querySelector('[data-lcs-row]')) fails.push('a write line on the inverse face');
    if (box) { const ws = [...box.querySelectorAll('[data-lcs-worked]')]; if (ws.length !== 1) fails.push(`${ws.length} worked lines`); else { checkWorked(ws[0], +worked, round(+worked, step), deciding(+worked, step)); if (+ws[0].dataset.lcsWorkedTo === target) fails.push(`the worked example rounds to the target ${target} (it leaks a member)`); } checkStrip(deciding(+worked, step)); }
    if (!ps.length) fails.push('non-vacuity: 0 pills');
  } else if (face === 'both') {
    const items = +D.lcsItems, min = +D.lcsMin, max = +D.lcsMax, five10 = +D.lcsFivemin10, five100 = +D.lcsFivemin100, upMin = +(D.lcsUpmin || 0), downMin = +(D.lcsDownmin || 0);
    const digitMax = +(D.lcsDigitmax || 99), digitDistinct = +(D.lcsDigitdistinct || 0), carryMax = D.lcsCarrymax === '' ? Infinity : +D.lcsCarrymax;
    if (D.lcsSteps !== '10,100') fails.push(`root steps "${D.lcsSteps}" != 10,100`);
    const rows = [...root.querySelectorAll('[data-lcs-row]')];
    if (rows.length !== items) fails.push(`${rows.length} lines, config says ${items}`);
    const ns = []; const seen = new Set(); const boxCentres = [];
    rows.forEach((row, i) => {
      const L = `line ${i + 1}`;
      const n = +row.dataset.lcsN;
      if (row.dataset.lcsSteps !== '10,100') fails.push(`${L}: steps "${row.dataset.lcsSteps}"`);
      if (!Number.isInteger(n) || n < min || n > max) fails.push(`${L}: ${n} outside ${min}..${max}`);
      if (n % 10 === 0) fails.push(`${L}: ${n} is a multiple of 10 — one rounding would be trivial`);
      if (seen.has(n)) fails.push(`${L}: ${n} twice`); seen.add(n); ns.push(n);
      if (String(n) === worked) fails.push(`${L}: the worked number is a line`);
      const num = row.querySelector('[data-lcs-num]');
      if (!num) { fails.push(`${L}: no numeral`); return; }
      if (num.textContent.trim() !== String(n)) fails.push(`${L}: prints "${num.textContent.trim()}"`);
      if (fontOf(num) < 22) fails.push(`${L}: numeral ${fontOf(num)}px < 22`);
      if (!nextGlyph(num)) fails.push(`${L}: the node after the numeral is not the SVG relation glyph`);
      const boxes = [...row.querySelectorAll('.ws-blankbox')];
      if (boxes.length !== 2) fails.push(`${L}: ${boxes.length} boxes (want 2)`);
      const wants = [round(n, 10), round(n, 100)];
      boxes.forEach((x, j) => {
        if (+x.dataset.lcsStep !== [10, 100][j]) fails.push(`${L}: box ${j + 1} is for step ${x.dataset.lcsStep}`);
        if (x.getAttribute('data-lcs-answer') !== String(wants[j])) fails.push(`${L}: box ${j + 1} answer ${x.getAttribute('data-lcs-answer')} != ${wants[j]}`);
        if (wants[j] > 999) fails.push(`${L}: an answer ${wants[j]} >= 1000`);
        if (x.textContent.trim() || x.childNodes.length) fails.push(`${L}: box ${j + 1} is not empty`);
        const r = rect(x); if (r.width < 84 - 0.6 || r.height < 44 - 0.6) fails.push(`${L}: box ${j + 1} ${r.width.toFixed(1)} x ${r.height.toFixed(1)} below 84 x 44`);
        if (i === 0) boxCentres.push(r.left + r.width / 2);
      });
      if (row.querySelectorAll('svg[data-lcs-rel]').length !== 2) fails.push(`${L}: ${row.querySelectorAll('svg[data-lcs-rel]').length} glyphs (want 2)`);
      const extra = textNodes(row).filter((tn) => !tn.parentElement.closest('[data-lcs-idx], [data-lcs-num]')).map((tn) => tn.textContent.trim());
      if (extra.length) fails.push(`${L}: text beyond the badge and the numeral ("${extra.join(' ')}")`);
      const badge = row.querySelector('[data-lcs-idx]');
      if (!badge || badge.textContent.trim() !== String(i + 1)) fails.push(`${L}: badge "${badge ? badge.textContent.trim() : ''}" != ${i + 1}`);
      if (i && rect(row).top <= rect(rows[i - 1]).bottom - 0.6) fails.push(`${L}: not below line ${i}`);
    });
    const onesFives = ns.filter((n) => n % 10 === 5).length, tensFives = ns.filter((n) => Math.floor(n / 10) % 10 === 5).length;
    if (onesFives < five10) fails.push(`${onesFives} lines with ones digit 5 < fiveMin[10] ${five10}`);
    if (tensFives < five100) fails.push(`${tensFives} lines with tens digit 5 < fiveMin[100] ${five100}`);
    const ups = ns.filter((n) => n % 10 >= 5).length;
    if (ups < upMin || ns.length - ups < downMin) fails.push(`ones up ${ups} / down ${ns.length - ups} under the quotas ${upMin} / ${downMin}`);
    const hist = {}; ns.forEach((n) => { hist[n % 10] = (hist[n % 10] || 0) + 1; });
    for (const [dd, c] of Object.entries(hist)) if (c > digitMax) fails.push(`ones digit ${dd} appears ${c} > digitMax ${digitMax}`);
    if (Object.keys(hist).length < digitDistinct) fails.push(`${Object.keys(hist).length} distinct ones digits < ${digitDistinct}`);
    const carry = ns.filter((n) => carries(n, 10)).length;
    if (carry > carryMax) fails.push(`${carry} carry cases at the ten > carryMax ${carryMax}`);
    { const tm = +(D.lcsTrapmin || 0); const tr = ns.filter((n) => n % 100 >= 45 && n % 100 <= 49).length; if (tm && tr < tm) fails.push(`${tr} chain-rounding traps (tens 4, ones 5-9) < trapMin ${tm}`); }
    // the header: exactly two cells, the bank heads, centred on the boxes
    const heads = [...root.querySelectorAll('[data-lcs-head]')];
    if (heads.map((h) => h.dataset.lcsHead).join(',') !== '10,100') fails.push(`header cells ${heads.map((h) => h.dataset.lcsHead).join(',')} (want 10, 100)`);
    heads.forEach((h, j) => {
      const want = j === 0 ? D.lcsHead10 : D.lcsHead100;
      if (h.textContent.trim() !== want) fails.push(`head ${j + 1} "${h.textContent.trim()}" != the bank literal "${want}"`);
      if (h.scrollWidth > h.clientWidth + 0.6) fails.push(`head ${j + 1} overflows its cell (refuse the literal, never the font)`);
      if (fontOf(h) < 12) fails.push(`head ${j + 1} font ${fontOf(h)} < 12`);
      const cx = rect(h).left + rect(h).width / 2;
      if (boxCentres[j] != null && Math.abs(cx - boxCentres[j]) > 1) fails.push(`head ${j + 1} centre ${cx.toFixed(1)} is ${Math.abs(cx - boxCentres[j]).toFixed(1)} px off its box centre ${boxCentres[j].toFixed(1)}`);
      if (rows[0] && rect(h).bottom > rect(rows[0]).top + 0.6) fails.push(`head ${j + 1} is not above the first line`);
    });
    if (heads.length === 2 && rect(heads[0]).right > rect(heads[1]).left + 0.6) fails.push('the header cells overlap');
    if (D.lcsHead10 === D.lcsHead100) fails.push('the two heads are the same literal');
    if (box) {
      const ws = [...box.querySelectorAll('[data-lcs-worked]')];
      if (ws.length !== 2) fails.push(`${ws.length} worked lines (want 2: the ten, then the hundred)`);
      else {
        checkWorked(ws[0], +worked, round(+worked, 10), deciding(+worked, 10));
        checkWorked(ws[1], +worked, round(+worked, 100), deciding(+worked, 100));
        const pp = ws.map((w) => w.querySelector('[data-lcs-place]'));
        if (!pp[0] || pp[0].dataset.lcsPlace !== '10' || pp[0].textContent.trim() !== '10') fails.push('the first worked line is not led by the 10 place pill');
        if (!pp[1] || pp[1].dataset.lcsPlace !== '100' || pp[1].textContent.trim() !== '100') fails.push('the second worked line is not led by the 100 place pill');
        if (ns.includes(+worked)) fails.push('the worked number is a line');
      }
      checkStrip(deciding(+worked, 10));
    }
    if (!rows.length) fails.push('non-vacuity: 0 lines');
  } else fails.push(`unknown face "${face}"`);
  // page-wide bans (every face)
  for (const tn of textNodes(body)) {
    const t = tn.textContent;
    if (/[≈→]/.test(t)) fails.push(`text node carries U+2248 / U+2192 ("${t.trim()}") — outside every font range, must be the SVG glyph`);
    if (/[<>]/.test(t)) fails.push(`text node carries < or > ("${t.trim()}")`);
    if (/(?<!\d)\d{4,}/.test(t)) fails.push(`a number >= 1000 in a text node ("${t.trim()}")`);
    if (/\d[ .,]\d{3}(?!\d)/.test(t)) fails.push(`a thousands separator in a text node ("${t.trim()}")`);
  }
  // `=` never directly after a numeral / expression (the glyph is the relation); F3's = follows a box
  for (const num of body.querySelectorAll('[data-lcs-num], [data-lcs-expr]')) { let n = num.nextSibling; while (n && ((n.nodeType === 3 && !n.textContent.trim()) || (n.nodeType === 1 && n.tagName === 'SPAN' && !n.textContent.trim() && !n.querySelector('svg')))) n = n.nextSibling; if (n && n.textContent && n.textContent.trim() === '=') fails.push('a = follows a numeral (the relation must be the glyph)'); }
  if (body.querySelector('[data-lcs-prim="number-line"]')) fails.push('a number line is drawn (G2-221 / G3-323 own it)');
  if (body.querySelector('.ws-pattern-slot, .ws-pattern-chip')) fails.push('a pattern slot on the page');
  if (face !== 'sort' && body.querySelector('.ws-chip')) fails.push('a chip on a face that has no chips');
  if (body.querySelector('img')) fails.push('an <img> on a numeral-only page');
  if (body.querySelector('[data-lcs-correct], [data-lcs-member], [data-lcs-dir]')) fails.push('an answer / membership / direction stamp on an item');
  if (body.querySelectorAll('svg').length !== body.querySelectorAll('svg[data-lcs-rel]').length) fails.push('an SVG other than the relation glyph on the page');
  return fails;
}

/* ------------------------------------------------------------------ Level Set (walk #63, 2026-10-14): levels, screens, keys ------------------------------------------------------------------ */
/*
 * Level 2 of every face is its published config, untouched (the 66 published pages are byte-identical: built HEAD vs
 * tree, every knob below is read only when present). Levels 1 / 3 per face are config only — every knob is stamped and
 * re-checked by VERIFY_BASE / VERIFY_FACE from the stamps. The base keeps its own d1 / d3 (YES-NOW in the ladder).
 * ⚠ The face files are generated by tools/gen-b4var-specs.js; they now call levelsFor / interactiveFor — a re-run of the
 * generator would flatten them back to {1: D, 2: D, 3: D}.
 */
const FACE_LEVELS = {
  // sort: two-digit numbers only, no x95 bridge, ten chips / three-digit only, two bridges (x95 -> next hundred), fifteen chips, twelve cells a bin, no rule box
  'G3-387': {
    1: { min: 11, max: 99, mix: null, items: 10, carryMax: 0, splitMin: 4, splitMax: 6, chip: 80, chipPx: 30, chipCols: 5, cellH: 80 },
    3: { min: 101, max: 994, mix: null, items: 15, carryMin: 2, carryMax: 3, splitMin: 6, splitMax: 9, cells: 12, cellH: 60, cellGap: 12, chip: 76, chipCols: 5, rule: false },
  },
  // hundred: twelve lines, the deciding (tens) digit tinted / sixteen lines, no rule box, two chain-rounding traps (449 -> 400)
  'G3-388': {
    1: { items: 12, max: 899, onesTint: true, trapMax: 0 },
    3: { items: 16, rule: false, trapMin: 2 },
  },
  // estimate: small addends (sums up to 80), six roomy rows / three-digit addends, sums up to 999, no rule box
  'G3-389': {
    1: { addMin: 11, addMax: 49, sumMax: 80, roundedSumMax: 100, items: 6, upMin: 4, downMin: 4, rowH: 64, rowGap: 26 },
    3: { addMin: 26, addMax: 489, sumMax: 999, roundedSumMax: 999, items: 8, exprW: 140, boxW: 84, rule: false, rowH: 60, rowGap: 16 },
  },
  // inverse: twelve pills from the two tens beside the target / sixteen pills around a HUNDREDS ten (345 in, 344 / 355 out), no rule box
  'G3-390': {
    all: { targets: [50, 30, 70, 40, 60, 20, 80], band: 20 },
    1: { pills: 12, members: 5, band: 20, farFrom: 10, pillW: 120, pillH: 96, px: 36, gap: 30, rowGap: 60, stagger: 30 },
    3: { targets: [350, 150, 650, 250, 450, 750, 550, 850], band: 30, pills: 16, members: 6, pillW: 120, pillH: 96, px: 34, gap: 30, rowGap: 50, stagger: 30, rule: false },
  },
  // both: six lines, no ones-digit bridge / ten lines, three fives at each place, two chain-rounding traps, no rule box
  'G3-391': {
    1: { items: 6, digitDistinct: 5, carryMax: 0, rowH: 64, rowGap: 24 },
    3: { items: 10, fiveMin: { 10: 3, 100: 3 }, digitMax: 3, digitDistinct: 7, carryMax: 3, trapMin: 2, rule: false, rowH: 48, rowGap: 12 },
  },
};
/** the three levels of a face: level 2 = D (the published config) + the `all` knobs, which a published page never reads */
function levelsFor(id, D) {
  const L = FACE_LEVELS[id];
  if (!L) throw new Error(`${ID}: no Level Set levels for ${id}`);
  const all = L.all || {};
  return { 1: { ...D, ...all, ...L[1] }, 2: { ...D, ...all }, 3: { ...D, ...all, ...L[3] } };
}

/** the inverse face's target for a copy: seed variant 1 (the published page and every level's first copy) = targets[0] */
function targetOf(d, sv) {
  if (!Array.isArray(d.targets) || !d.targets.length) return d.target;
  return d.targets[((Number(sv) || 1) - 1) % d.targets.length];
}
/** the config of one copy of the inverse face: its target, the band of numbers around it, the near misses and a worked example far from it */
function targetConfig(d, sv) {
  if (!Array.isArray(d.targets) || !d.band) return d;
  const t = targetOf(d, sv);
  const range = [Math.max(11, t - d.band), t + d.band - 1];
  const inR = (v) => v >= range[0] && v <= range[1];
  // the worked example: never in the field's range, never rounding to the target (83 = the published one)
  const worked = [G.worked.inverse[10], 23, 97, 14].find((w) => !inR(w) && round(w, 10) !== t);
  return { ...d, target: t, range, nearMiss: d.farFrom ? [] : [t - 6, t + 5], worked };
}

/** which drawing a build is asked for: the printed page, the screen version (ctx.interactive) or the answer key (ctx.answerKey) */
function viewOf(ctx) { return ctx && ctx.interactive ? 'screen' : ctx && ctx.answerKey ? 'key' : 'page'; }
/** the screen page is as tall as its content (the screen shell is much taller than a sheet — a 1fr lane would spread the lines over it) */
function screenify(html) {
  return html.replace('style="flex:1;display:grid;', 'style="flex:0 0 auto;display:grid;').replace(/minmax\((\d+)px, 1fr\)/g, '$1px');
}
/** the screen sizes: every write box >= 104 page px tall (the screen draws at 0.467: >= 44 px on a 360 phone, measured by the robot); the numbers >= 40 px */
const SCREEN = {
  row: { rowH: 112, rowGap: 18, px: 44, numeralW: 96, glyph: 32, boxW: 124, boxH: 104 },
  sort: { cellW: 100, cellH: 104, cellGap: 8, cellCols: 3, binW: 330, pillH: 44, pillPx: 20 },
  estimate: { rowH: 170, rowGap: 22, px: 38, exprW: 210, boxW: 118, boxH: 104 },
  inverse: { pillW: 126, pillH: 104, px: 36, gap: 24, rowGap: 30, stagger: 28, perRow: 4 },
  both: { rowH: 112, rowGap: 16, px: 44, numeralW: 96, glyph: 32, boxW: 124, boxH: 104, mid: 24, width: 500, centres: [246, 434] },
};

/* the screen sentences (i18n/interactive-instructions.json rounding.<key>) */
const TAP = require('../../i18n/interactive-instructions.json').rounding || {};
function modeOf(d) { return d.mode || (Array.isArray(d.steps) && d.steps.length > 1 ? 'both' : 'write'); }
/**
 * The robot's INDEPENDENT oracles: every answer recomputed from the numbers the screen stamps on its boxes / pills
 * (n, step, a, b, the page's chip values, the target) with its own half-up rule — never from the page's answer marks.
 */
const rnd = (n, s) => Math.floor(n / s + 0.5) * s;
const ints = (v) => String(v || '').split(',').filter(Boolean).map(Number);
const ORACLE = {
  write(items) {
    return items.map((it) => {
      const m = it.meta || {};
      if (m['data-lcs-role']) {
        const a = +m['data-lcs-a'], b = +m['data-lcs-b'];
        if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('rounding oracle: no addends on an estimate box');
        return m['data-lcs-role'] === 'a' ? rnd(a, 10) : m['data-lcs-role'] === 'b' ? rnd(b, 10) : rnd(a, 10) + rnd(b, 10);
      }
      const n = +m['data-lcs-n'], s = +m['data-lcs-step'];
      if (!Number.isInteger(n) || (s !== 10 && s !== 100)) throw new Error('rounding oracle: no number / step on a box');
      return rnd(n, s);
    });
  },
  sort(items) {
    const pool = ints((items[0] && items[0].meta || {})['data-lcs-pool']);
    if (!pool.length) throw new Error('rounding oracle: no chip numbers');
    return { boxes: items.map(() => null), sets: { down: pool.filter((v) => v % 10 < 5), up: pool.filter((v) => v % 10 >= 5) } };
  },
  circle(items) {
    return items.map((it) => {
      const v = +(it.meta || {})['data-lcs-val'], t = +(it.meta || {})['data-lcs-target'];
      if (!Number.isInteger(v) || !Number.isInteger(t)) throw new Error('rounding oracle: no value / target on a pill');
      return rnd(v, 10) === t;
    });
  },
};
/** the interactive declaration of one face (base / hundred / both / estimate write; sort sorts into the bins; inverse taps) */
function interactiveFor(mode) {
  if (mode === 'write' || mode === 'both' || mode === 'estimate') {
    return { kind: 'type-number', item: '[data-lcs-round] .ws-blankbox', answerAttr: 'data-lcs-answer', labelAttr: mode === 'estimate' ? 'data-lcs-role' : 'data-lcs-n',
      metaAttrs: ['data-lcs-n', 'data-lcs-step', 'data-lcs-role', 'data-lcs-a', 'data-lcs-b'], instructionKey: 'write', screenHeight: mode === 'estimate' ? 2400 : 2000,
      maxDigits: () => 3, oracle: (items) => ORACLE.write(items) };
  }
  if (mode === 'sort') {
    return { kind: 'type-number', item: '[data-lcs-bins] .ws-blankbox', answerAttr: 'data-lcs-answer', labelAttr: 'data-lcs-set',
      metaAttrs: ['data-lcs-set', 'data-lcs-pool', 'data-lcs-members'], instructionKey: 'sort', screenHeight: 2000, maxDigits: () => 3,
      screenCtx: (items) => { const sets = {}; for (const it of items) { const p = it.meta['data-lcs-set']; if (!sets[p]) sets[p] = ints(it.meta['data-lcs-members']); } return { sortSets: sets }; },
      oracle: (items) => ORACLE.sort(items) };
  }
  if (mode === 'inverse') {
    return { kind: 'tap-select', item: '[data-lcs-field] .ws-nchip', answerAttr: 'data-lcs-in', labelAttr: 'data-lcs-val',
      metaAttrs: ['data-lcs-val', 'data-lcs-target'], instructionKey: 'circle', screenHeight: 2000, oracle: (items) => ORACLE.circle(items) };
  }
  throw new Error(`${ID}: no interactive declaration for mode ${mode}`);
}
/**
 * The strings of one copy: the inverse face's title names ITS target (the "50" of the title swapped — present exactly
 * once in every locale, asserted); the screen sentence = the printed instruction + how to answer on a screen (the
 * inverse face: its own full sentence, since the child taps instead of circling).
 */
function copyStrings(s, o) {
  const d = this.difficulty[o.difficulty] || {};
  const mode = modeOf(d);
  const loc = String(o.locale || 'en').slice(0, 2);
  let out = { ...s };
  if (mode === 'inverse') {
    const t = targetOf(d, o.seedVariant);
    for (const k of ['title', 'printTitle']) {
      if (out[k] == null) continue;
      if ((String(out[k]).match(/(?<!\d)50(?!\d)/g) || []).length !== 1) throw new Error(`${ID}: the ${loc} ${k} of the inverse face must name 50 exactly once ("${out[k]}")`);
      out[k] = String(out[k]).replace(/(?<!\d)50(?!\d)/, String(t));
    }
  }
  const key = mode === 'inverse' ? 'circle' : mode === 'sort' ? 'sort' : 'write';
  const tap = TAP[key] && TAP[key][loc];
  if (tap) out.screenInstruction = key === 'circle' ? tap : out.instruction + ' ' + tap;
  return out;
}
/** what makes a Level Set copy different: the numbers it asks about */
function levelSetWords(m) {
  if (m.pairs) return m.pairs.map((p) => p.slice().sort((x, y) => x - y).join('+'));
  return (m.items || m.values || []).map(String);
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
  resolveSort, resolveEstimate, pairPool, samplePairs, resolveInverse, sampleField, resolveBoth, poolBoth, composeBoth, STACK_MAX,
  isTrap, levelsFor, interactiveFor, targetOf, targetConfig, FACE_LEVELS, SCREEN, copyStrings, levelSetWords,
  interactive: interactiveFor('write'),

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
    if (Array.isArray(d.steps) && d.steps.length > 1) return this._buildBoth(bank, d, { locale: loc }, ctx);
    const view = viewOf(ctx);
    const cfg = resolveBase(d, bank);
    const step = cfg.step;
    for (const s of cfg.steps) for (const dir of ['up', 'down']) if (typeof bank[dir][s] !== 'string' || !bank[dir][s].trim()) throw new Error(`${ID}: the ${loc} bank has no ${dir}[${s}] literal — refuse`);
    const items = compose(rng, cfg);
    if (!items) throw new Error(`${ID}: no deal for ${cfg.items} items in ${cfg.min}..${cfg.max} at step ${step} under the quotas (fiveMin ${cfg.fiveMin}, up ${cfg.upMin}, down ${cfg.downMin}, carry ${cfg.carryMin}..${cfg.carryMax}, digitMax ${cfg.digitMax}) — REFUSED`);
    const rel = cfg.relation;
    // Level Set (walk #63): the SCREEN draws the same lines bigger (a box a finger can hit on a phone); page + key keep
    // the printed sizes; the key writes each answer in its box
    const sc = view === 'screen' ? SCREEN.row : null;
    const rowH = sc ? sc.rowH : cfg.rowH, rowGap = sc ? sc.rowGap : cfg.rowGap;
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
    const rowsHtml = items.map((n, i) => C4.roundRow({
      idx: i + 1, n, step, answer: round(n, step), rel, onesTint: cfg.onesTint, rowH,
      ...(sc ? { px: sc.px, numeralW: sc.numeralW, glyph: sc.glyph, boxW: sc.boxW, boxH: sc.boxH, boxAttrs: `data-lcs-n="${n}" data-lcs-step="${step}"` } : {}),
      ...(view === 'key' ? { key: true } : {}),
    })).join('');
    const laneMin = 24 + cfg.rows * rowH + (cfg.rows - 1) * rowGap;
    const lane = `<div class="ws-lane" data-lcs-lines data-ws-content style="display:grid;grid-template-rows:repeat(${cfg.rows},${rowH}px);grid-auto-flow:column;grid-template-columns:repeat(${cfg.cols},1fr);row-gap:${rowGap}px;justify-items:center;align-content:space-evenly;min-height:${laneMin}px">${rowsHtml}</div>`;
    const stamps = [
      ['step', step], ['items', cfg.items], ['cols', cfg.cols], ['mix', cfg.mix ? Object.entries(cfg.mix).map(([k, c]) => `${k}:${c}`).join(';') : ''],
      ['fivemin', cfg.fiveMin], ['upmin', cfg.upMin], ['downmin', cfg.downMin], ['carrymax', Number.isFinite(cfg.carryMax) ? cfg.carryMax : ''], ['carrymin', cfg.carryMin],
      ['digitcover', cfg.digitCover ? 1 : 0], ['digitmax', cfg.digitMax], ['min', cfg.min], ['max', cfg.max], ['example', cfg.worked], ['rule', cfg.rule ? 1 : 0],
      ['onestint', cfg.onesTint ? 1 : 0], ['down', bank.down[step]], ['up', bank.up[step]], ['rel', rel],
      ...(cfg.trapMin ? [['trapmin', cfg.trapMin]] : []),   // Level Set only: a published page carries no new stamp
      ...(Number.isFinite(cfg.trapMax) ? [['trapmax', cfg.trapMax]] : []),
    ].map(([k, v]) => `data-lcs-${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');
    const rows = cfg.rule ? `auto minmax(${laneMin}px, 1fr)` : `minmax(${laneMin}px, 1fr)`;
    const bodyHtml = `<div data-ws-content data-lcs-round ${stamps} style="flex:1;display:grid;grid-template-rows:${rows};row-gap:12px;min-height:0">${ruleHtml}${lane}</div>`;
    return {
      bodyHtml: view === 'screen' ? screenify(bodyHtml) : bodyHtml,
      meta: { face: 'base', step, items, answers: items.map((n) => round(n, step)), worked: cfg.worked, stack: (cfg.rule ? 96 + 12 : 0) + 24 + cfg.rows * cfg.rowH + (cfg.rows - 1) * cfg.rowGap },
    };
  },

  /** The CODE faces on the additive `mode` knob (`sort` / `estimate` / `inverse`); every other mode REFUSES. */
  _buildFace(bank, d, { locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    if (d.mode === 'sort') return this._buildSort(bank, d, { locale: loc }, ctx);
    if (d.mode === 'estimate') return this._buildEstimate(bank, d, { locale: loc }, ctx);
    if (d.mode === 'inverse') return this._buildInverse(bank, d, { locale: loc }, ctx);
    throw new Error(`${ID}: mode "${d.mode}" is not a face (sort | estimate | inverse; the hundred and the two-box faces are the steps array)`);
  },

  /** The face root: the resolved config stamped (the gate re-derives everything from these), the rule box first, top-anchored or lane-spread per `rows`. */
  _faceRoot({ stamps, ruleHtml, content, rows, topAnchored }) {
    return `<div data-ws-content data-lcs-round ${stampsOf(stamps)} style="flex:1;display:grid;grid-template-rows:${rows};row-gap:${GAP}px;min-height:0${topAnchored ? ';align-content:start' : ''}">${ruleHtml}${content}</div>`;
  },
  _ruleBox(bank, cfg, lines, ring) {
    return C4.roundRuleBox({ step: cfg.step || cfg.steps[0], lines, strip: C4.digitStrip({ step: cfg.step || cfg.steps[0], ring, captions: { down: bank.down[cfg.step || cfg.steps[0]], up: bank.up[cfg.step || cfg.steps[0]] } }) });
  },

  /* ---- F1 sort: the rule box, the chip lane, the two arrow bins (nothing written but the sorting) */
  _buildSort(bank, d, { locale }, ctx) {
    const view = viewOf(ctx);
    const cfg = resolveSort(d, bank);
    literals(bank, cfg.steps, locale);
    const items = compose(ctx.rng, cfg);
    if (!items) throw new Error(`${ID} sort: no deal for ${cfg.items} chips in ${cfg.min}..${cfg.max} under the quotas — REFUSED`);
    const step = cfg.step, rel = cfg.relation;
    // the screen draws the bins' cells big enough to tap (the content and its order are the page's)
    const g = view === 'screen' ? resolveSort({ ...d, ...SCREEN.sort, _screen: true }, bank) : cfg;
    const ups = items.filter((n) => isUp(n, step)), downs = items.filter((n) => !isUp(n, step));
    const ruleHtml = cfg.rule ? this._ruleBox(bank, cfg, [C4.workedLine({ n: cfg.worked, step, px: 30, rel })], decidingDigit(cfg.worked, step)) : '';
    const lane = C4.roundChipLane({ values: items, step, chip: cfg.chip, gap: cfg.chipGap, rowGap: cfg.chipRowGap, cols: cfg.chipCols, px: cfg.chipPx });
    const binOpts = {
      down: { label: bank.down[step] }, up: { label: bank.up[step] }, cells: cfg.cells, cellW: g.cellW, cellH: g.cellH, cellGap: g.cellGap, cols: g.cellCols, w: g.binW, h: g.binH, pillH: g.pillH, pillPx: g.pillPx,
    };
    // screen: every cell knows its bin + the page's numbers (the robot's oracle sorts them itself); key: each bin's numbers written in
    if (view === 'screen') binOpts.cellAttrs = (dir) => `data-lcs-set="${dir}" data-lcs-pool="${items.join(',')}" data-lcs-members="${(dir === 'up' ? ups : downs).join(',')}"`;
    if (view === 'key') binOpts.keyVals = { down: downs, up: ups };
    const bins = C4.updownBins(binOpts);
    const stamps = [
      ['mode', 'sort'], ['step', step], ['items', cfg.items], ['mix', cfg.mix ? Object.entries(cfg.mix).map(([k, c]) => `${k}:${c}`).join(';') : ''], ['fivemin', cfg.fiveMin],
      ['splitmin', cfg.splitMin], ['splitmax', cfg.splitMax], ['cells', cfg.cells], ['carrymax', Number.isFinite(cfg.carryMax) ? cfg.carryMax : ''], ['digitcover', cfg.digitCover ? 1 : 0], ['digitmax', cfg.digitMax],
      ['min', cfg.min], ['max', cfg.max], ['example', cfg.worked], ['rule', cfg.rule ? 1 : 0], ['chip', cfg.chip], ['chipcols', cfg.chipCols], ['cellw', cfg.cellW], ['cellh', cfg.cellH], ['laneh', cfg.laneH], ['binh', cfg.binH], ['stack', cfg.stack],
      ['down', bank.down[step]], ['up', bank.up[step]], ['rel', rel],
      ...(cfg.carryMin ? [['carrymin', cfg.carryMin]] : []),
    ];
    const rows = (cfg.rule ? 'auto ' : '') + `${cfg.laneH}px ${g.binH}px`;
    const body = this._faceRoot({ stamps, ruleHtml, content: lane + bins, rows, topAnchored: true });
    return {
      bodyHtml: view === 'screen' ? screenify(body) : body,
      meta: { face: 'sort', step, items, split: { up: ups.length, down: downs.length }, worked: cfg.worked, stack: cfg.stack },
    };
  },

  /* ---- F3 estimate: `a + b [glyph] [ ] + [ ] = [ ]`, one column */
  _buildEstimate(bank, d, { locale }, ctx) {
    const view = viewOf(ctx);
    const cfg = resolveEstimate(d, bank);
    literals(bank, cfg.steps, locale);
    const pairs = samplePairs(ctx.rng, cfg);
    if (!pairs) throw new Error(`${ID} estimate: no deal for ${cfg.items} pairs in ${cfg.addMin}..${cfg.addMax} under the quotas — REFUSED`);
    const step = cfg.step, rel = cfg.relation;
    const [w1, w2] = cfg.worked;
    const ruleHtml = cfg.rule ? this._ruleBox(bank, cfg, [C4.workedLine({ expr: `${w1} + ${w2}`, a: w1, b: w2, step, px: 26, rel })], decidingDigit(w2, step)) : '';
    const sc = view === 'screen' ? SCREEN.estimate : null;
    const rowH = sc ? sc.rowH : cfg.rowH, rowGap = sc ? sc.rowGap : cfg.rowGap;
    const rowsHtml = pairs.map(([a, b], i) => {
      const o = { idx: i + 1, a, b, step, rel, exprW: sc ? sc.exprW : cfg.exprW, rowH };
      if (d.boxW) o.boxW = d.boxW;   // Level Set: three-digit answers need 84-wide boxes
      if (sc) Object.assign(o, { split: true, px: sc.px, boxW: sc.boxW, boxH: sc.boxH, boxAttrs: `data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-step="${step}"` });
      if (view === 'key') o.key = true;
      return C4.estimateRow(o);
    }).join('');
    const laneMin = LANE_PAD + cfg.items * rowH + (cfg.items - 1) * rowGap;
    const lane = `<div class="ws-lane" data-lcs-lines data-ws-content style="display:grid;grid-auto-rows:${rowH}px;row-gap:${rowGap}px;justify-items:center;align-content:space-evenly;min-height:${laneMin}px">${rowsHtml}</div>`;
    const stamps = [
      ['mode', 'estimate'], ['step', step], ['items', cfg.items], ['addmin', cfg.addMin], ['addmax', cfg.addMax], ['summax', cfg.sumMax], ['roundedsummax', cfg.roundedSumMax],
      ['fivemin', cfg.fiveMin], ['upmin', cfg.upMin], ['downmin', cfg.downMin], ['digitcover', cfg.digitCover ? 1 : 0], ['digitmax', cfg.digitMax], ['example', `${w1}+${w2}`], ['rule', cfg.rule ? 1 : 0],
      ['rowh', cfg.rowH], ['rowgap', cfg.rowGap], ['stack', cfg.stack], ['down', bank.down[step]], ['up', bank.up[step]], ['rel', rel],
    ];
    const rows = (cfg.rule ? 'auto ' : '') + `minmax(${laneMin}px, 1fr)`;
    const body = this._faceRoot({ stamps, ruleHtml, content: lane, rows, topAnchored: false });
    return {
      bodyHtml: view === 'screen' ? screenify(body) : body,
      meta: { face: 'estimate', step, pairs, answers: pairs.map(([a, b]) => [round(a, step), round(b, step), round(a, step) + round(b, step)]), worked: cfg.worked, stack: cfg.stack },
    };
  },

  /* ---- F4 inverse: the target pill over a staggered field of numeral pills; the child circles every member */
  _buildInverse(bank, d0, { locale }, ctx) {
    const view = viewOf(ctx);
    const d = targetConfig(d0, ctx && ctx.seedVariant);   // Level Set: each copy rounds to its own ten (the published copy keeps 50)
    const cfg = resolveInverse(d, bank);
    literals(bank, cfg.steps, locale);
    const values = sampleField(ctx.rng, cfg);
    if (!values) throw new Error(`${ID} inverse: no deal for ${cfg.pills} pills around ${cfg.target} under the quotas — REFUSED`);
    const step = cfg.step, rel = cfg.relation;
    const g = view === 'screen' ? { ...cfg, ...SCREEN.inverse } : cfg;
    const ruleHtml = cfg.rule ? this._ruleBox(bank, cfg, [C4.workedLine({ n: cfg.worked, step, px: 30, rel })], decidingDigit(cfg.worked, step)) : '';
    const pill = C4.targetPill({ target: cfg.target, step, rel, h: cfg.targetH, px: cfg.targetPx });
    const fo = { target: cfg.target, step, values, pillW: g.pillW, pillH: g.pillH, gap: g.gap, rowGap: g.rowGap, stagger: g.stagger, perRow: g.perRow, px: g.px };
    if (view !== 'page') fo.mark = view;
    let field = C4.numberField(fo);
    if (view === 'screen') field = field.replace(/class="ws-nchip" data-lcs-val=/g, `class="ws-nchip" data-lcs-target="${cfg.target}" data-lcs-val=`);
    const rowsN = cfg.pills / cfg.perRow;
    const laneH = LANE_PAD + cfg.targetH + cfg.fieldGap + rowsN * g.pillH + (rowsN - 1) * g.rowGap;
    const lane = `<div class="ws-lane" data-lcs-inverse-lane data-ws-content style="display:flex;flex-direction:column;align-items:center;gap:${cfg.fieldGap}px;height:${laneH}px;box-sizing:border-box">${pill}${field}</div>`;
    const stamps = [
      ['mode', 'inverse'], ['step', step], ['target', cfg.target], ['pills', cfg.pills], ['members', cfg.members], ['range-lo', cfg.range[0]], ['range-hi', cfg.range[1]], ['nearmiss', cfg.nearMiss.join(',')],
      ['fivein', cfg.fiveIn ? 1 : 0], ['digitcover', cfg.digitCover ? 1 : 0], ['example', cfg.worked], ['rule', cfg.rule ? 1 : 0], ['pillw', cfg.pillW], ['pillh', cfg.pillH], ['laneh', LANE_PAD + cfg.targetH + cfg.fieldGap + cfg.fieldH], ['stack', cfg.stack],
      ['down', bank.down[step]], ['up', bank.up[step]], ['rel', rel],
      ...(cfg.farFrom ? [['farfrom', cfg.farFrom]] : []),
    ];
    const rows = (cfg.rule ? 'auto ' : '') + `${laneH}px`;
    const body = this._faceRoot({ stamps, ruleHtml, content: lane, rows, topAnchored: true });
    return {
      bodyHtml: view === 'screen' ? screenify(body) : body,
      meta: { face: 'inverse', step, target: cfg.target, values, members: values.filter((v) => round(v, step) === cfg.target), worked: cfg.worked, stack: cfg.stack },
    };
  },

  /* ---- F5 both (`steps:[10, 100]`, the PARAM face whose quotas are per place): a header of the two place words, two boxes per line */
  _buildBoth(bank, d, { locale }, ctx) {
    const view = viewOf(ctx);
    const cfg = resolveBoth(d, bank);
    literals(bank, [10], locale);
    const items = composeBoth(ctx.rng, cfg);
    if (!items) throw new Error(`${ID} both: no deal for ${cfg.items} lines in ${cfg.min}..${cfg.max} under the per-place quotas — REFUSED`);
    const rel = cfg.relation;
    const sc = view === 'screen' ? SCREEN.both : null;
    const rowH = sc ? sc.rowH : cfg.rowH, rowGap = sc ? sc.rowGap : cfg.rowGap;
    const ruleHtml = cfg.rule ? C4.roundRuleBox({
      step: 10,
      lines: [C4.workedLine({ n: cfg.worked, step: 10, px: 26, rel, placePill: true }), C4.workedLine({ n: cfg.worked, step: 100, px: 26, rel, placePill: true })],
      strip: C4.digitStrip({ step: 10, ring: decidingDigit(cfg.worked, 10), captions: { down: bank.down[10], up: bank.up[10] } }),
    }) : '';
    const header = sc ? C4.placeHeader({ heads: [cfg.heads[10], cfg.heads[100]], centres: sc.centres, w: sc.width }) : C4.placeHeader({ heads: [cfg.heads[10], cfg.heads[100]] });
    const rowsHtml = items.map((n, i) => {
      const o = { idx: i + 1, n, steps: [10, 100], answers: [round(n, 10), round(n, 100)], rel, rowH };
      if (sc) Object.assign(o, { numeralW: sc.numeralW, px: sc.px, glyph: sc.glyph, boxW: sc.boxW, boxH: sc.boxH, mid: sc.mid, width: sc.width, boxAttrs: `data-lcs-n="${n}"` });
      if (view === 'key') o.key = true;
      return C4.twoTargetRow(o);
    }).join('');
    const laneMin = LANE_PAD + 24 + 6 + cfg.items * rowH + (cfg.items - 1) * rowGap;
    const lane = `<div class="ws-lane" data-lcs-lines data-ws-content style="display:flex;flex-direction:column;align-items:center;min-height:${laneMin}px">${header}` +
      `<div data-lcs-two-rows style="flex:1;display:grid;grid-auto-rows:${rowH}px;row-gap:${rowGap}px;justify-items:center;align-content:space-evenly;padding-top:6px;min-height:${cfg.items * rowH + (cfg.items - 1) * rowGap + 6}px">${rowsHtml}</div></div>`;
    const stamps = [
      ['face', 'both'], ['steps', '10,100'], ['items', cfg.items], ['min', cfg.min], ['max', cfg.max], ['fivemin10', cfg.fiveMin[10]], ['fivemin100', cfg.fiveMin[100]], ['upmin', cfg.upMin], ['downmin', cfg.downMin],
      ['digitmax', cfg.digitMax], ['digitdistinct', cfg.digitDistinct], ['carrymax', Number.isFinite(cfg.carryMax) ? cfg.carryMax : ''], ['example', cfg.worked], ['rule', cfg.rule ? 1 : 0], ['rowh', cfg.rowH], ['rowgap', cfg.rowGap], ['stack', cfg.stack],
      ['head10', cfg.heads[10]], ['head100', cfg.heads[100]], ['down', bank.down[10]], ['up', bank.up[10]], ['rel', rel],
      ...(cfg.trapMin ? [['trapmin', cfg.trapMin]] : []),
    ];
    const rows = (cfg.rule ? 'auto ' : '') + `minmax(${laneMin}px, 1fr)`;
    const body = this._faceRoot({ stamps, ruleHtml, content: lane, rows, topAnchored: false });
    return {
      bodyHtml: view === 'screen' ? screenify(body) : body,
      meta: { face: 'both', steps: [10, 100], items, answers: items.map((n) => [round(n, 10), round(n, 100)]), worked: cfg.worked, stack: cfg.stack },
    };
  },

  async verify(page) {
    const face = await page.evaluate(() => { const r = document.querySelector('[data-lcs-round]'); return r ? (r.dataset.lcsMode || r.dataset.lcsFace || '') : ''; });
    if (!face) return page.evaluate(VERIFY_BASE);
    return page.evaluate(VERIFY_FACE, face);
  },
};
