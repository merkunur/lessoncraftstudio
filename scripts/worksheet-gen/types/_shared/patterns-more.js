/**
 * More Patterns templates (the Patterns maker, 2026-11-02):
 *   train-cut  K-465 Pattern Train: Cut and Glue (the old pattern-train app) — a train whose first wagons show the
 *              pattern (always two whole units: the unit is seen to repeat), the rest empty; the pictures for the empty
 *              wagons wait at the bottom to be cut out and glued. One right answer. Level 1 AB (8 wagons), level 2 AAB or
 *              ABB (9), level 3 ABC or AABB (12). The screen version asks, under each empty wagon, which picture goes there.
 *   train-own  K-466 Make Your Own Pattern — an empty train and pictures to cut out (two kinds, three at level 3, enough
 *              of each): the child makes a pattern of their own and glues it on. Classroom material: no key, no screen.
 *   number     G1-483 Number Patterns — rows of numbers following a rule, two boxes to fill in each row. Level 1
 *              repeating patterns (1 2 1 2 …), level 2 counting on by 2, 5 or 10, level 3 counting on or back by 2-5 or
 *              10. At least three numbers of a row are shown before its first box, so the rule can be seen.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');
const slot = require('../../lib/slot.js');

const TEAL = tokens.color.teal, INK = tokens.color.ink, CREAM = tokens.color.cream;
const UNITS = { 1: [['A', 'B']], 2: [['A', 'A', 'B'], ['A', 'B', 'B']], 3: [['A', 'B', 'C'], ['A', 'A', 'B', 'B']] };
const WAGONS = { 1: 8, 2: 9, 3: 12 };

const WW = 120, WH = 104;   // a wagon's body (the page fills its body: 108 × 92 left a third of it empty)
const engineSvg = () => `<svg width="128" height="${WH + 26}" viewBox="0 0 128 ${WH + 26}" data-lcs-engine style="flex:0 0 auto">` +
  `<rect x="14" y="36" width="72" height="${WH - 36}" rx="8" fill="${tokens.color.coralSoft}" stroke="${TEAL}" stroke-width="3"/>` +
  `<rect x="74" y="8" width="46" height="${WH - 8}" rx="8" fill="${tokens.color.coralSoft}" stroke="${TEAL}" stroke-width="3"/>` +
  `<rect x="84" y="18" width="26" height="24" rx="4" fill="#FFFFFF" stroke="${TEAL}" stroke-width="2.5"/>` +
  `<rect x="24" y="14" width="18" height="22" rx="3" fill="${tokens.color.coralSoft}" stroke="${TEAL}" stroke-width="3"/>` +
  `<circle cx="34" cy="${WH + 10}" r="13" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/><circle cx="96" cy="${WH + 10}" r="13" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/></svg>`;
const coupling = `<span style="flex:0 0 auto;width:10px;height:4px;background:${INK};align-self:center;margin-top:-20px"></span>`;
function wagon(inner, k, extra = '') {
  return `<div data-lcs-wagon="${k}"${extra} style="position:relative;flex:0 0 auto;width:${WW}px;height:${WH + 26}px">` +
    `<div style="position:absolute;left:0;top:0;width:${WW}px;height:${WH}px;box-sizing:border-box;border:3px solid ${TEAL};border-radius:10px;background:${CREAM};display:flex;align-items:center;justify-content:center">${inner}</div>` +
    `<span style="position:absolute;left:14px;top:${WH - 4}px;width:24px;height:24px;box-sizing:border-box;border:3px solid ${INK};border-radius:50%;background:#FFFFFF"></span>` +
    `<span style="position:absolute;right:14px;top:${WH - 4}px;width:24px;height:24px;box-sizing:border-box;border:3px solid ${INK};border-radius:50%;background:#FFFFFF"></span></div>`;
}
const glueBox = `<span style="width:88px;height:82px;box-sizing:border-box;border:2.5px dashed ${tokens.color.grid};border-radius:8px;background:#FFFFFF" data-lcs-glue></span>`;
const pic = (theme, n, px, extra = '') => `<img class="ws-icon" src="${fileUri(theme, n.noun)}" alt=""${extra} style="width:${px}px;height:${px}px">`;
/** the train in rows: the engine and four wagons, then rows of five */
function trainRows(wagons) {
  const rows = [[engineSvg()].concat(wagons.slice(0, 4))];
  for (let i = 4; i < wagons.length; i += 5) rows.push(wagons.slice(i, i + 5));
  return rows.map((r) => `<div style="display:flex;align-items:flex-start;justify-content:center" data-lcs-train-row>${r.join(coupling)}</div>`).join('');
}
/** the cut-out cards (dashed: cut on the line) */
const cutCards = (cards) => `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0;border-top:2px dashed ${tokens.color.grid};padding-top:10px" data-lcs-cutouts>` +
  cards.map((c) => `<span style="width:108px;height:100px;box-sizing:border-box;border:2px dashed ${INK};display:flex;align-items:center;justify-content:center;background:#FFFFFF" data-lcs-cutout="${c.sym}">${c.html}</span>`).join('') + `</div>`;

// ---------- number patterns ----------
const NUM_LEVELS = {
  1: { rows: 6, len: 8, blanks: 2 },
  2: { rows: 6, len: 7, blanks: 2, steps: [2, 5, 10], dir: [1] },
  3: { rows: 6, len: 7, blanks: 2, steps: [2, 3, 4, 5, 10], dir: [1, -1] },
};
const REPEATS = [['a', 'b'], ['a', 'b', 'c'], ['a', 'a', 'b'], ['a', 'b', 'b']];
function numberRow(lv, rng) {
  const d = NUM_LEVELS[lv];
  let seq;
  if (lv === 1) {
    const unit = rng.pick(REPEATS), vals = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), map = { a: vals[0], b: vals[1], c: vals[2] };
    seq = Array.from({ length: d.len }, (_, k) => map[unit[k % unit.length]]);
    // the rule must be seen: two whole units before the first box
    const first = Math.max(2 * unit.length, 4);
    const blanks = rng.sample(Array.from({ length: d.len - first }, (_, k) => first + k), d.blanks).sort((x, y) => x - y);
    return { seq, blanks, rule: unit.join('') };
  }
  const step = rng.pick(d.steps), dir = rng.pick(d.dir), len = d.len;
  const hi = 100 - (dir > 0 ? step * (len - 1) : 0), lo = dir < 0 ? step * (len - 1) + 1 : 1;
  // starts that are not a multiple of the step at level 3 (counting by 5 from 3: 3, 8, 13 …); level 2 from a multiple
  let start;
  for (let t = 0; t < 50; t++) { start = rng.int(lo, hi); if (lv === 2 ? start % step === 0 : true) break; }
  if (lv === 2 && start % step) start = Math.max(step, start - (start % step));
  seq = Array.from({ length: len }, (_, k) => start + dir * step * k);
  const blanks = rng.sample([3, 4, 5, 6], d.blanks).sort((x, y) => x - y);
  return { seq, blanks, rule: (dir > 0 ? '+' : '-') + step };
}

function makePatternsMoreType({ id, slug, mode, gradeBand, i18n }) {
  const themed = mode !== 'number';
  return {
    id, slug, gradeBand, assetClass: themed ? 'icon-placement' : 'number-sense', exerciseType: 'patterns',
    themeAxis: themed ? { applicable: true, minNouns: 4 } : { applicable: false },
    difficulty: mode === 'number' ? NUM_LEVELS : { 1: { level: 1 }, 2: { level: 2 }, 3: { level: 3 } },
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, rng = ctx.rng, theme = args.theme;
      const key = !!(ctx && ctx.answerKey), screen = !!(ctx && ctx.screen);
      if (mode === 'number') {
        const rows = [], items = [];
        const seen = new Set();
        for (let i = 0; i < NUM_LEVELS[lv].rows; i++) {
          let r; for (let t = 0; t < 30; t++) { r = numberRow(lv, rng); if (!seen.has(r.seq.join(','))) break; }
          seen.add(r.seq.join(','));
          items.push(r.rule + ':' + r.seq.join(','));
          const cells = r.seq.map((v, k) => (r.blanks.includes(k) ? answerBox({ w: 66, h: 56, answer: v })
            : `<span style="display:inline-flex;align-items:center;justify-content:center;width:66px;height:56px;border-radius:28px;background:${tokens.color.tealSoft};font-family:'Baloo 2';font-weight:700;font-size:28px;color:${INK}" data-lcs-num="${v}">${v}</span>`));
          rows.push(`<div class="ws-card-stage" style="justify-content:center;gap:10px;padding:4px 8px 4px 34px" data-lcs-numpattern="${r.seq.join(',')}" data-lcs-blanks="${r.blanks.join(',')}">${cells.join('')}</div>`);
        }
        const { cardGrid } = require('../../templates/layouts/card-grid.js');
        return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0">${cardGrid({ cards: rows, cols: 1, rows: rows.length })}</div>`, meta: { items } };
      }

      const pool = labelSafeNouns(theme);
      if (mode === 'train-cut') {
        const unit = rng.pick(UNITS[lv]);
        const syms = [...new Set(unit)];
        // the unit's pictures: one slot role, a picture each (A, B, C); a teacher's picture replaces one everywhere
        const nouns = slot.pictures(ctx, rng.sample(pool, syms.length), pool, theme, 'unit');
        const of = Object.fromEntries(syms.map((s, k) => [s, nouns[k]]));
        const tap = Object.fromEntries(syms.map((s, k) => [s, slot.attr(ctx, 'unit', k)]));
        const n = WAGONS[lv], clue = 2 * unit.length;
        const seq = Array.from({ length: n }, (_, k) => unit[k % unit.length]);
        const wagons = seq.map((s, k) => {
          if (k < clue) return wagon(pic(theme, of[s], 80, tap[s]), k, ` data-lcs-sym="${s}"`);
          if (key) return wagon(pic(theme, of[s], 80), k, ` data-lcs-sym="${s}" data-lcs-blank="${s}" data-lcs-key-sample="1"`);
          if (screen) {
            // the screen: under the empty wagon, the unit's pictures to choose from (the right one marked)
            const opts = rng.shuffle(syms.slice());
            return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px" data-lcs-blank="${s}">${wagon(glueBox, k)}<span style="display:flex;gap:4px">${opts.map((o) => `<span class="ws-pattern-chip" style="width:46px;height:46px"${o === s ? ' data-lcs-correct="1"' : ''} data-lcs-sym="${o}">${pic(theme, of[o], 36)}</span>`).join('')}</span></div>`;
          }
          return wagon(glueBox, k, ` data-lcs-blank="${s}"`);
        });
        const cards = rng.shuffle(seq.slice(clue).map((s) => ({ sym: s, html: pic(theme, of[s], 80) })));
        return {
          bodyHtml: `<div data-ws-content data-lcs-train="${unit.join('')}" data-lcs-clue="${clue}" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">` +
            `<div style="display:flex;flex-direction:column;gap:${screen ? 6 : 14}px">${trainRows(wagons)}</div>` + (screen ? '' : cutCards(cards)) + `</div>`,
          meta: { items: [unit.join('') + ':' + nouns.map((x) => x.noun).join('|')] },
        };
      }
      // train-own: an empty train and the pictures to make a pattern with
      const kinds = lv === 3 ? 3 : 2, n = WAGONS[lv];
      const nouns = slot.pictures(ctx, rng.sample(pool, kinds), pool, theme, 'unit');
      const per = Math.ceil(n / kinds) + (lv === 1 ? 0 : 1);   // enough of each for any pattern the child chooses
      const cards = [];
      nouns.forEach((x, k) => { for (let j = 0; j < per; j++) cards.push({ sym: 'ABC'[k], html: pic(theme, x, 66, j === 0 ? slot.attr(ctx, 'unit', k) : '') }); });
      const wagons = Array.from({ length: n }, (_, k) => wagon(glueBox, k, ' data-lcs-blank="own"'));
      return {
        bodyHtml: `<div data-ws-content data-lcs-train="own" style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;gap:12px;min-height:0">` +
          `<div style="display:flex;flex-direction:column;gap:14px">${trainRows(wagons)}</div>` + cutCards(cards) + `</div>`,
        meta: { items: [nouns.map((x) => x.noun).join('|')] },
      };
    },

    async verify(page) {
      return page.evaluate((m) => {
        const fails = [];
        if (m === 'number') {
          document.querySelectorAll('[data-lcs-numpattern]').forEach((r, i) => {
            const seq = r.dataset.lcsNumpattern.split(',').map(Number), blanks = r.dataset.lcsBlanks.split(',').map(Number);
            const boxes = [...r.querySelectorAll('[data-lcs-answer]')];
            if (boxes.length !== blanks.length) fails.push(`row ${i + 1}: ${boxes.length} boxes`);
            boxes.forEach((b, j) => { if (+b.dataset.lcsAnswer !== seq[blanks[j]]) fails.push(`row ${i + 1}: box ${j + 1} is not ${seq[blanks[j]]}`); });
            if (Math.min(...blanks) < 3) fails.push(`row ${i + 1}: fewer than three numbers before the first box`);
            if (seq.some((v) => v < 1 || v > 100)) fails.push(`row ${i + 1}: a number outside 1-100`);
            // the rule is the same all along: a constant step, or a repeating unit seen twice before the boxes
            const diffs = seq.slice(1).map((v, k) => v - seq[k]);
            const constant = diffs.every((x) => x === diffs[0]) && diffs[0] !== 0;
            if (!constant) { const p = [2, 3].find((q) => seq.every((v, k) => k < q || v === seq[k - q])); if (!p) fails.push(`row ${i + 1}: no rule`); else if (Math.min(...blanks) < 2 * p) fails.push(`row ${i + 1}: the unit is not shown twice before the first box`); }
            const shown = [...r.querySelectorAll('[data-lcs-num]')].map((e) => +e.textContent);
            if (shown.length + boxes.length !== seq.length) fails.push(`row ${i + 1}: cells do not add up`);
          });
          if (!document.querySelector('[data-lcs-numpattern]')) fails.push('no rows');
          return fails;
        }
        const train = document.querySelector('[data-lcs-train]');
        if (!train) return ['no train'];
        if (m === 'train-cut') {
          const unit = train.dataset.lcsTrain, clue = +train.dataset.lcsClue;
          const syms = [...train.querySelectorAll('[data-lcs-wagon][data-lcs-sym]')].map((w) => w.dataset.lcsSym);
          const blanks = [...train.querySelectorAll('[data-lcs-blank]')];
          if (clue < 2 * unit.length) fails.push('the clue shows less than two whole units');
          // every wagon follows the unit (the shown and the expected)
          [...train.querySelectorAll('[data-lcs-wagon]')].forEach((w, k) => { const s = w.dataset.lcsSym || (w.closest('[data-lcs-blank]') || {}).dataset?.lcsBlank; if (s && s !== unit[k % unit.length]) fails.push(`wagon ${k + 1} breaks the pattern`); });
          const cut = [...train.querySelectorAll('[data-lcs-cutout]')].map((c) => c.dataset.lcsCutout).sort().join('');
          const need = blanks.map((b) => b.dataset.lcsBlank).sort().join('');
          if (train.querySelector('[data-lcs-cutouts]') && cut !== need) fails.push(`the cut-out pictures (${cut}) are not the ones the empty wagons need (${need})`);
          if (syms.length < clue) fails.push('a clue wagon has no picture');
        } else {
          const n = train.querySelectorAll('[data-lcs-wagon]').length, cards = train.querySelectorAll('[data-lcs-cutout]').length;
          if (cards < n) fails.push(`${cards} pictures to cut for ${n} wagons`);
        }
        const pb = document.querySelector('[data-lcs-page]').getBoundingClientRect();
        train.querySelectorAll('[data-lcs-train-row]').forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.left < pb.left - 1 || b.right > pb.right + 1) fails.push(`train row ${i + 1} leaves the page`); });
        return fails;
      }, mode);
    },
  };
}

module.exports = { makePatternsMoreType, numberRow, NUM_LEVELS, UNITS, WAGONS };
