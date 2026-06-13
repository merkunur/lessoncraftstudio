/**
 * Factory for the fraction family (class 7):
 *  - 'shade':         fraction → child shades a blank partitioned shape (G2-228/229, G3-316)
 *  - 'which-shows':   3 shaded shapes → circle the one showing n/d (G2-230, G3-320 set variant)
 *  - 'equal-unequal': circle the shapes with EQUAL parts (G2-232, G3-343)
 *  - 'name':          shaded shape → write n and d in a fraction frame (G3-315)
 *  - 'set-circle':    n icons → circle n/d of them (G2-233)
 *  - 'compare':       two shaded fractions → circle the bigger (G3-319)
 *  - 'line':          fraction number line 0-1, dot at n/d → circle the fraction (G3-317)
 *  - 'whole':         this bar is 1/d → circle the bar that is the whole (G3-321)
 *  - 'match-equiv':   shaded shapes ↔ equivalent fraction labels (G2-231, G3-318/322)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const fractionShape = require('../../primitives/fraction.js');
const numberLine = require('../../primitives/number-line.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const { answerBox } = require('../../templates/components.js');

const FRAC = (n, d, size) =>
  `<span style="display:inline-flex;flex-direction:column;align-items:center;font-family:'Baloo 2';font-weight:700;color:#3A3530" data-lcs-frac="${n}/${d}">` +
  `<span style="font-size:${size || 26}px;line-height:1">${n}</span>` +
  `<span style="width:${(size || 26) + 6}px;height:3px;background:#3A3530;border-radius:2px;margin:2px 0"></span>` +
  `<span style="font-size:${size || 26}px;line-height:1">${d}</span></span>`;

function makeFractionType(cfg) {
  const { id, slug, mode, ds, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G23',
    assetClass: 'fractions',
    exerciseType: 'fractions',
    themeAxis: { applicable: mode === 'set-circle', minNouns: 2 },
    difficulty: cfg.difficulty || {
      1: { ds: ds || [2, 3, 4], cards: 4 },
      2: { ds: ds || [3, 4, 6], cards: 4 },
      3: { ds: ds || [4, 6, 8], cards: 4 },
    },
    i18n,

    build({ theme, difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];
      const used = new Set();
      const pickFrac = () => {
        let den, num, guard = 0;
        do { den = rng.pick(d.ds); num = rng.int(1, den - 1); guard++; }
        while (used.has(num + '/' + den) && guard < 30);
        used.add(num + '/' + den);
        return { num, den };
      };

      if (mode === 'match-equiv') {
        // shaded shapes ↔ fraction labels (labels may be the equivalent simple form)
        const items = [];
        const seen = new Set();
        while (items.length < 4) {
          const den = rng.pick(d.ds);
          const num = rng.int(1, den - 1);
          const key = num / den;
          if (seen.has(key)) continue;   // distinct VALUES so matching is unambiguous
          seen.add(key);
          items.push({ num, den });
        }
        let order;
        do { order = rng.shuffle(items.map((_, i) => i)); }
        while (order.some((v, i) => v === i));
        const itemH = Math.floor((760 - 3 * 14) / 4);
        const left = items.map((f) =>
          `<div class="ws-match-item" style="width:240px;height:${itemH}px" data-lcs-left="${f.num}/${f.den}">` +
          fractionShape({ shape: rng.pick(['circle', 'bar']), d: f.den, shaded: f.num, size: Math.min(120, itemH - 26) }).svg +
          `<span class="ws-match-dot ws-match-dot--right"></span></div>`).join('');
        const right = order.map((idx) =>
          `<div class="ws-match-item ws-match-item--plain" style="width:130px;height:${itemH}px" data-lcs-right="${items[idx].num}/${items[idx].den}">` +
          FRAC(items[idx].num, items[idx].den, 30) +
          `<span class="ws-match-dot ws-match-dot--left"></span></div>`).join('');
        return {
          bodyHtml: `<div class="ws-match" style="padding:6px 60px">` +
            `<div class="ws-match-col">${left}</div><div class="ws-match-col">${right}</div></div>`,
          meta: {},
        };
      }

      for (let i = 0; i < d.cards; i++) {
        let stage;
        if (mode === 'shade') {
          const { num, den } = pickFrac();
          const shape = rng.pick(['circle', 'bar', 'square']);
          stage = `<div class="ws-card-stage" style="gap:30px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            FRAC(num, den, 30) +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#F2784B">→</span>` +
            fractionShape({ shape, d: den, shaded: 0, size: shape === 'bar' ? 150 : 130 }).svg + `</div>`;
        } else if (mode === 'which-shows') {
          const { num, den } = pickFrac();
          const opts = [{ n: num, d: den, ok: true }];
          const w1 = num + 1 <= den ? { n: Math.min(num + 1, den), d: den, ok: false } : { n: num - 1, d: den, ok: false };
          if (w1.n !== num) opts.push(w1);
          if (num - 1 >= 0 && num - 1 !== w1.n) opts.push({ n: num - 1, d: den, ok: false });
          while (opts.length < 3) opts.push({ n: num, d: den + 2, ok: false });
          const chips = rng.shuffle(opts).map((o) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:8px"${o.ok ? ' data-lcs-correct="1"' : ''}>` +
            fractionShape({ shape: 'circle', d: o.d, shaded: o.n, size: 96 }).svg + `</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:6px 12px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            FRAC(num, den, 32) + `<span class="ws-pattern-choices">${chips}</span></div>`;
        } else if (mode === 'equal-unequal') {
          const den = rng.pick(d.ds);
          const equalCount = rng.int(1, 2);
          const shapes = rng.shuffle([
            ...Array.from({ length: equalCount }, () => ({ equal: true })),
            ...Array.from({ length: 3 - equalCount }, () => ({ equal: false })),
          ]);
          const boxes = shapes.map((s) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:8px"${s.equal ? ' data-lcs-correct="1"' : ''}>` +
            fractionShape({ shape: rng.pick(['circle', 'bar']), d: den, shaded: 0, size: 100, equal: s.equal }).svg + `</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-evenly" data-lcs-equalcount="${equalCount}">${boxes}</div>`;
        } else if (mode === 'name') {
          const { num, den } = pickFrac();
          stage = `<div class="ws-card-stage" style="gap:34px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            fractionShape({ shape: rng.pick(['circle', 'bar', 'square']), d: den, shaded: num, size: 130 }).svg +
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">` +
            answerBox({ w: 56, h: 48, answer: num }) +
            `<span style="width:56px;height:3.5px;background:#3A3530;border-radius:2px"></span>` +
            answerBox({ w: 56, h: 48, answer: den }) + `</span></div>`;
        } else if (mode === 'set-circle') {
          const den = rng.pick([2, 3, 4].filter((x) => d.ds.includes(x) || x === 2));
          const groups = rng.int(2, 3);
          const total = den * groups;
          const num = 1;
          const noun = rng.pick(labelSafeNouns(theme));
          const px = Math.min(54, Math.floor(420 / total));
          const icons = Array.from({ length: total }, () =>
            `<img class="ws-icon" src="${fileUri(theme, noun.noun)}" alt="" style="width:${px}px;height:${px}px">`).join('');
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:6px 14px" data-lcs-settotal="${total}" data-lcs-setden="${den}">` +
            FRAC(num, den, 28) +
            `<span style="flex:1 1 auto;display:flex;flex-wrap:wrap;gap:8px;justify-content:center">${icons}</span>` +
            answerBox({ w: 60, h: 50, answer: total / den }) + `</div>`;
        } else if (mode === 'compare') {
          let a, b;
          do { a = pickFrac(); b = pickFrac(); } while (a.num / a.den === b.num / b.den);
          const bigger = a.num / a.den > b.num / b.den ? 'a' : 'b';
          const box = (f, key) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:10px;flex-direction:column;gap:6px;display:inline-flex;align-items:center" ` +
            `data-lcs-side="${key}" data-lcs-val="${f.num}/${f.den}"${key === bigger ? ' data-lcs-correct="1"' : ''}>` +
            fractionShape({ shape: 'bar', d: f.den, shaded: f.num, size: 140 }).svg + FRAC(f.num, f.den, 20) + `</span>`;
          stage = `<div class="ws-card-stage" style="gap:40px;justify-content:center">${box(a, 'a')}${box(b, 'b')}</div>`;
        } else if (mode === 'line') {
          const { num, den } = pickFrac();
          const nl = numberLine({ min: 0, max: den, tickStep: 1, labelEvery: den, width: 480, marks: [num] });
          // relabel: ticks are den-ths; show 0 and 1 at the ends via fraction context
          const opts = new Set([num + '/' + den]);
          if (num + 1 < den) opts.add((num + 1) + '/' + den);
          if (num - 1 >= 1) opts.add((num - 1) + '/' + den);
          while (opts.size < 3) opts.add(rng.int(1, den - 1) + '/' + (den + 2));
          const chips = rng.shuffle([...opts]).map((v) => {
            const [n2, d2] = v.split('/');
            return `<span class="ws-pattern-chip" style="width:64px;height:64px"${v === num + '/' + den ? ' data-lcs-correct="1"' : ''} data-lcs-opt="${v}">` +
              FRAC(n2, d2, 17) + `</span>`;
          }).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:10px" data-lcs-num="${num}" data-lcs-den="${den}">` +
            `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:#8A8276">0 → 1 in ${den} steps</span>` +
            nl.svg + `<span class="ws-pattern-choices">${chips}</span></div>`;
        } else if (mode === 'whole') {
          const den = rng.pick(d.ds.filter((x) => x <= 6));
          const unitW = 36;
          const bar = (parts, mark) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:12px;padding:8px"${mark ? ' data-lcs-correct="1"' : ''} data-lcs-len="${parts}">` +
            fractionShape({ shape: 'bar', d: parts, shaded: 0, size: (unitW * parts) / 1.5 }).svg + `</span>`;
          const wrongs = [den - 1, den + 1].filter((x) => x >= 2);
          const chips = rng.shuffle([{ p: den, ok: true }, ...wrongs.map((p) => ({ p, ok: false }))]).map((o) => bar(o.p, o.ok)).join('');
          stage = `<div class="ws-card-stage" style="gap:20px;justify-content:space-between;padding:6px 12px" data-lcs-den="${den}">` +
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:8px">` +
            // reference = exactly ONE part: size/1.5 so its single cell width
            // (size*1.5/d) equals an answer-bar cell (the bars below use size
            // unitW*parts/1.5 → 36px cells); was unitW*1.5 → an 81px mismatched part.
            fractionShape({ shape: 'bar', d: 1, shaded: 1, size: unitW / 1.5 }).svg + FRAC(1, den, 20) + `</span>` +
            `<span class="ws-pattern-choices" style="flex-direction:column;gap:10px;align-items:flex-end">${chips}</span></div>`;
        }
        cards.push(stage);
      }
      const cols = (mode === 'shade' || mode === 'name') ? 2 : 1;
      return { bodyHtml: cardGrid({ cards, cols, rows: Math.ceil(d.cards / cols) }), meta: {} };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const fracOf = (svg) => ({
          d: svg.querySelectorAll('[data-lcs-part]').length,
          n: svg.querySelectorAll('[data-lcs-shaded="1"]').length,
          equal: svg.dataset.lcsEqual === '1',
        });
        if (mode === 'match-equiv') {
          const left = [...document.querySelectorAll('[data-lcs-left]')];
          const right = [...document.querySelectorAll('[data-lcs-right]')].map((e) => e.dataset.lcsRight);
          left.forEach((item, i) => {
            const f = fracOf(item.querySelector('[data-lcs-prim="fraction"]'));
            const [n, dd] = item.dataset.lcsLeft.split('/').map(Number);
            if (f.d !== dd || f.n !== n) fails.push(`row ${i + 1}: picture != ${n}/${dd}`);
            if (right[i] === item.dataset.lcsLeft) fails.push(`row ${i + 1}: straight-across`);
          });
          const vals = left.map((e) => { const [n, dd] = e.dataset.lcsLeft.split('/').map(Number); return n / dd; });
          if (new Set(vals).size !== vals.length) fails.push('two pictures share a value — ambiguous');
          return fails;
        }
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (mode === 'shade') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const f = fracOf(card.querySelector('[data-lcs-prim="fraction"]'));
            if (f.d !== den) fails.push(`card ${i + 1}: parts != ${den}`);
            if (f.n !== 0) fails.push(`card ${i + 1}: must start unshaded`);
            if (!f.equal) fails.push(`card ${i + 1}: parts must be equal`);
            if (num < 1 || num >= den) fails.push(`card ${i + 1}: bad fraction`);
          } else if (mode === 'which-shows') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`card ${i + 1}: ${correct.length} correct`); return; }
            const f = fracOf(correct[0].querySelector('[data-lcs-prim="fraction"]'));
            if (f.n !== num || f.d !== den) fails.push(`card ${i + 1}: correct chip shows ${f.n}/${f.d}`);
            card.querySelectorAll('.ws-pattern-chip:not([data-lcs-correct])').forEach((chip) => {
              const w = fracOf(chip.querySelector('[data-lcs-prim="fraction"]'));
              if (w.n / w.d === num / den) fails.push(`card ${i + 1}: distractor equals the target value`);
            });
          } else if (mode === 'equal-unequal') {
            const want = +card.querySelector('[data-lcs-equalcount]').dataset.lcsEqualcount;
            const chips = [...card.querySelectorAll('.ws-pattern-chip')];
            const marked = chips.filter((c) => c.dataset.lcsCorrect);
            if (marked.length !== want) fails.push(`card ${i + 1}: ${marked.length} marked != ${want}`);
            chips.forEach((c) => {
              const f = fracOf(c.querySelector('[data-lcs-prim="fraction"]'));
              if (!!c.dataset.lcsCorrect !== f.equal) fails.push(`card ${i + 1}: equality mark wrong`);
            });
          } else if (mode === 'name') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const f = fracOf(card.querySelector('[data-lcs-prim="fraction"]'));
            if (f.n !== num || f.d !== den) fails.push(`card ${i + 1}: shape shows ${f.n}/${f.d} != ${num}/${den}`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== num || boxes[1] !== den) fails.push(`card ${i + 1}: answer frame mismatch`);
          } else if (mode === 'set-circle') {
            const total = +card.querySelector('[data-lcs-settotal]').dataset.lcsSettotal;
            const den = +card.querySelector('[data-lcs-settotal]').dataset.lcsSetden;
            const icons = card.querySelectorAll('.ws-icon').length;
            if (icons !== total) fails.push(`card ${i + 1}: ${icons} icons != ${total}`);
            if (total % den !== 0) fails.push(`card ${i + 1}: ${total} not divisible by ${den}`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== total / den) fails.push(`card ${i + 1}: answer mismatch`);
          } else if (mode === 'compare') {
            const sides = [...card.querySelectorAll('[data-lcs-side]')];
            const vals = sides.map((s) => { const [n, dd] = s.dataset.lcsVal.split('/').map(Number); return { n, d: dd, v: n / dd, el: s }; });
            vals.forEach((x, k) => {
              const f = fracOf(x.el.querySelector('[data-lcs-prim="fraction"]'));
              if (f.n !== x.n || f.d !== x.d) fails.push(`card ${i + 1} side ${k}: picture != label`);
            });
            const bigger = vals[0].v > vals[1].v ? vals[0] : vals[1];
            if (!bigger.el.dataset.lcsCorrect) fails.push(`card ${i + 1}: bigger fraction unmarked`);
            if (vals[0].v === vals[1].v) fails.push(`card ${i + 1}: equal fractions`);
          } else if (mode === 'line') {
            const num = +card.querySelector('[data-lcs-num]').dataset.lcsNum;
            const den = +card.querySelector('[data-lcs-num]').dataset.lcsDen;
            const mark = card.querySelector('[data-lcs-mark]');
            if (+mark.dataset.lcsMark !== num) fails.push(`card ${i + 1}: dot at ${mark.dataset.lcsMark}/${den} != ${num}/${den}`);
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1 || correct[0].dataset.lcsOpt !== num + '/' + den) fails.push(`card ${i + 1}: chips wrong`);
          } else if (mode === 'whole') {
            const den = +card.querySelector('[data-lcs-den]').dataset.lcsDen;
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1 || +correct[0].dataset.lcsLen !== den) fails.push(`card ${i + 1}: whole != ${den} parts`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeFractionType };
