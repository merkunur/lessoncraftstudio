/**
 * Factory for the base-ten / place-value family (class 5):
 *  - 'read':          blocks → write the number (G1-120 t/o, G2-222 h/t/o)
 *  - 'choose':        numeral → circle the matching block set (G1-121/G2-227)
 *  - 'count-tens':    rods only → how many tens? (G1-122)
 *  - 'add'/'sub':     two block groups, no regrouping → equation (G2-203/204/205)
 *  - 'regroup':       13-19 unit cubes; circle ten to make a ten → __ ten __ ones (G2-206)
 *  - 'expanded':      blocks ↔ expanded form match (G1-133/G2-223)
 *  - 'pv-chart':      blocks → fill H/T/O chart (G2-224)
 *  - 'digit-value':   underlined digit → circle its value (G2-225)
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const baseTenBlocks = require('../../primitives/base-ten.js');
const { answerBox } = require('../../templates/components.js');

const NUM = (v, size) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${size || 30}px;color:#3A3530" data-lcs-num="${v}">${v}</span>`;
const OP = (ch) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:26px;color:#146B5E">${ch}</span>`;

function makeBaseTenType(cfg) {
  const { id, slug, mode, gradeBand, i18n } = cfg;
  return {
    id,
    slug,
    gradeBand: gradeBand || 'G1',
    assetClass: 'base-ten',
    exerciseType: 'base-ten',
    themeAxis: { applicable: false },
    difficulty: cfg.difficulty || {
      1: { maxH: 0, maxT: 5, rows: 4, unit: 13 },
      2: { maxH: 0, maxT: 9, rows: 4, unit: 13 },
      3: { maxH: 3, maxT: 9, rows: 4, unit: 10 },
    },
    i18n,

    build({ difficulty }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const cards = [];
      const used = new Set();
      const draw = (h, t, o, unit) => baseTenBlocks({ h, t, o, unit: unit || d.unit }).svg;
      const pick = () => {
        let h, t, o, guard = 0;
        do {
          h = d.maxH ? rng.int(d.minH || 1, d.maxH) : 0;
          t = rng.int(1, d.maxT);
          o = rng.int(1, 9);
          guard++;
        } while (used.has(`${h}.${t}.${o}`) && guard < 40);
        used.add(`${h}.${t}.${o}`);
        return { h, t, o, v: h * 100 + t * 10 + o };
      };

      for (let i = 0; i < d.rows; i++) {
        let stage;
        if (mode === 'read') {
          const { h, t, o, v } = pick();
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:8px 14px" data-lcs-value="${v}">` +
            draw(h, t, o) + answerBox({ w: 104, h: 60, answer: v }) + `</div>`;
        } else if (mode === 'choose') {
          const { h, t, o, v } = pick();
          // distractors: swapped tens/ones, off-by-one-ten
          const opts = [{ h, t, o, ok: true }, { h, t: o > 9 ? t : o, o: t, ok: false }, { h, t: Math.max(1, t - 1), o, ok: false }]
            .filter((x, k, arr) => arr.findIndex((y) => y.h === x.h && y.t === x.t && y.o === x.o) === k);
          while (opts.length < 3) opts.push({ h, t, o: Math.min(9, o + opts.length), ok: false });
          // 3-digit sets are wide: stack the choices vertically + shrink units
          const setUnit = d.maxH ? 4.5 : 7;
          const boxes = rng.shuffle(opts).map((s) =>
            `<span class="ws-pattern-chip" style="width:auto;height:auto;border-radius:14px;padding:7px"${s.ok ? ' data-lcs-correct="1"' : ''} ` +
            `data-lcs-set="${s.h}.${s.t}.${s.o}">${draw(s.h, s.t, s.o, setUnit)}</span>`).join('');
          const choicesStyle = d.maxH ? 'flex-direction:column;align-items:flex-end;gap:8px' : '';
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:6px 12px" data-lcs-value="${v}">` +
            NUM(v, 38) + `<span class="ws-pattern-choices" style="${choicesStyle}">${boxes}</span></div>`;
        } else if (mode === 'count-tens') {
          const t = rng.int(2, 9);
          stage = `<div class="ws-card-stage" style="gap:22px;justify-content:space-between;padding:8px 14px" data-lcs-tens="${t}">` +
            draw(0, t, 0) +
            `<span style="display:inline-flex;align-items:center;gap:10px">` +
            answerBox({ w: 64, h: 54, answer: t }) + OP('×') + NUM(10) + OP('=') + answerBox({ w: 84, h: 54, answer: t * 10 }) + `</span></div>`;
        } else if (mode === 'add' || mode === 'sub') {
          // no-regrouping pairs
          let t1 = rng.int(1, 7), o1 = rng.int(1, 8), t2, o2;
          if (mode === 'add') { t2 = rng.int(1, 9 - t1); o2 = rng.int(1, 9 - o1); }
          else { t2 = rng.int(1, t1); o2 = rng.int(1, o1); }
          const a = t1 * 10 + o1, b = t2 * 10 + o2;
          const r = mode === 'add' ? a + b : a - b;
          stage = `<div class="ws-card-stage" style="gap:14px;justify-content:space-between;padding:6px 10px" data-lcs-a="${a}" data-lcs-b="${b}" data-lcs-r="${r}">` +
            `<span data-lcs-part="a">${draw(0, t1, o1, 9)}</span>` + OP(mode === 'add' ? '+' : '−') +
            `<span data-lcs-part="b">${draw(0, t2, o2, 9)}</span>` + OP('=') +
            answerBox({ w: 84, h: 56, answer: r }) + `</div>`;
        } else if (mode === 'regroup') {
          const o = rng.int(13, 19);
          stage = `<div class="ws-card-stage" style="gap:18px;justify-content:space-between;padding:8px 14px" data-lcs-ones="${o}">` +
            draw(0, 0, o) +
            `<span style="display:inline-flex;align-items:center;gap:8px">` +
            answerBox({ w: 54, h: 50, answer: 1 }) +
            `<span style="font-family:'Nunito';font-weight:800;font-size:15px;color:#8A8276">⬛×10</span>` +
            OP('+') + answerBox({ w: 54, h: 50, answer: o - 10 }) + `</span></div>`;
        } else if (mode === 'expanded') {
          const { h, t, o, v } = pick();
          const correct = h ? `${h * 100} + ${t * 10} + ${o}` : `${t * 10} + ${o}`;
          const wrongs = h
            ? [`${h * 100} + ${o * 10} + ${t}`, `${h * 10} + ${t * 10} + ${o}`]
            : [`${o * 10} + ${t}`, `${t * 10} + ${o + 1 > 9 ? 1 : o + 1}`];
          const chips = rng.shuffle([correct, ...wrongs.filter((w) => w !== correct)]).map((s) =>
            `<span class="ws-chip" style="width:auto;height:46px;font-size:20px;padding:0 14px;border-radius:23px" ` +
            `data-lcs-exp="${s}"${s === correct ? ' data-lcs-correct="1"' : ''}>${s}</span>`).join('');
          stage = `<div class="ws-card-stage" style="flex-direction:column;gap:14px" data-lcs-value="${v}" data-lcs-h="${h}" data-lcs-t="${t}" data-lcs-o="${o}">` +
            draw(h, t, o, d.unit) + `<div class="ws-choices">${chips}</div></div>`;
        } else if (mode === 'pv-chart') {
          const { h, t, o, v } = pick();
          const col = (lab, ans) =>
            `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:6px">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:17px;color:#146B5E">${lab}</span>` +
            answerBox({ w: 64, h: 54, answer: ans }) + `</span>`;
          stage = `<div class="ws-card-stage" style="gap:24px;justify-content:space-between;padding:8px 14px" data-lcs-value="${v}">` +
            draw(h, t, o) +
            `<span style="display:inline-flex;gap:12px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px;padding:10px 14px">` +
            (d.maxH ? col('H', h) : '') + col('T', t) + col('O', o) + `</span></div>`;
        } else if (mode === 'digit-value') {
          const { v } = pick();
          const s = String(v);
          const idx = rng.int(0, s.length - 1);
          const digit = +s[idx];
          const value = digit * Math.pow(10, s.length - 1 - idx);
          const shown = s.split('').map((ch, k) =>
            `<span style="${k === idx ? 'text-decoration:underline;text-decoration-color:#F2784B;text-decoration-thickness:4px;color:#F2784B' : ''}">${ch}</span>`).join('');
          const wrongs = new Set([digit, value * 10].filter((w) => w !== value && w > 0));
          if (wrongs.size < 2) wrongs.add(Math.max(1, Math.floor(value / 10)));
          const chips = rng.shuffle([value, ...[...wrongs].slice(0, 2)]).map((c) =>
            `<span class="ws-chip" style="width:auto;min-width:70px;height:48px;font-size:22px;padding:0 12px;border-radius:24px" ` +
            `data-lcs-choice="${c}"${c === value ? ' data-lcs-correct="1"' : ''}>${c}</span>`).join('');
          stage = `<div class="ws-card-stage" style="gap:26px;justify-content:space-between;padding:8px 20px" data-lcs-digitvalue="${value}">` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:46px;color:#3A3530" data-lcs-shown="${v}" data-lcs-idx="${idx}">${shown}</span>` +
            `<div class="ws-choices">${chips}</div></div>`;
        }
        cards.push(stage);
      }
      return { bodyHtml: cardGrid({ cards, cols: 1, rows: d.rows }), meta: {} };
    },

    async verify(page) {
      const m = mode;
      return page.evaluate((mode) => {
        const fails = [];
        const census = (root) => ({
          h: root.querySelectorAll('[data-lcs-block="hundred"]').length,
          t: root.querySelectorAll('[data-lcs-block="ten"]').length,
          o: root.querySelectorAll('[data-lcs-block="one"]').length,
        });
        document.querySelectorAll('[data-lcs-card]').forEach((card, i) => {
          if (mode === 'read' || mode === 'pv-chart') {
            const want = +card.querySelector('[data-lcs-value]').dataset.lcsValue;
            const c = census(card.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.h * 100 + c.t * 10 + c.o !== want) fails.push(`row ${i + 1}: blocks != ${want}`);
            if (mode === 'pv-chart') {
              const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
              const expect = c.h ? [c.h, c.t, c.o] : [c.t, c.o];
              if (boxes.join() !== expect.join()) fails.push(`row ${i + 1}: chart boxes != block census`);
            }
          } else if (mode === 'choose') {
            const want = +card.querySelector('[data-lcs-value]').dataset.lcsValue;
            const correct = [...card.querySelectorAll('.ws-pattern-chip')].filter((c) => c.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
            const c = census(correct[0]);
            if (c.h * 100 + c.t * 10 + c.o !== want) fails.push(`row ${i + 1}: correct set != ${want}`);
            card.querySelectorAll('.ws-pattern-chip:not([data-lcs-correct])').forEach((chip) => {
              const w = census(chip);
              if (w.h * 100 + w.t * 10 + w.o === want) fails.push(`row ${i + 1}: distractor also equals ${want}`);
            });
          } else if (mode === 'count-tens') {
            const t = +card.querySelector('[data-lcs-tens]').dataset.lcsTens;
            const c = census(card.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.t !== t || c.o !== 0 || c.h !== 0) fails.push(`row ${i + 1}: rods ${c.t} != ${t}`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== t || boxes[1] !== t * 10) fails.push(`row ${i + 1}: equation boxes wrong`);
          } else if (mode === 'add' || mode === 'sub') {
            const st = card.querySelector('[data-lcs-a]');
            const a = +st.dataset.lcsA, b = +st.dataset.lcsB, r = +st.dataset.lcsR;
            const ca = census(st.querySelector('[data-lcs-part="a"]'));
            const cb = census(st.querySelector('[data-lcs-part="b"]'));
            if (ca.t * 10 + ca.o !== a) fails.push(`row ${i + 1}: A blocks != ${a}`);
            if (cb.t * 10 + cb.o !== b) fails.push(`row ${i + 1}: B blocks != ${b}`);
            if (mode === 'add' ? a + b !== r : a - b !== r) fails.push(`row ${i + 1}: result wrong`);
            if (mode === 'add' && (ca.o + cb.o > 9 || ca.t + cb.t > 9)) fails.push(`row ${i + 1}: would regroup`);
            if (mode === 'sub' && (cb.o > ca.o || cb.t > ca.t)) fails.push(`row ${i + 1}: would borrow`);
          } else if (mode === 'regroup') {
            const o = +card.querySelector('[data-lcs-ones]').dataset.lcsOnes;
            const c = census(card.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.o !== o || o < 11 || o > 19) fails.push(`row ${i + 1}: ones ${c.o} (declared ${o})`);
            const boxes = [...card.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
            if (boxes[0] !== 1 || boxes[1] !== o - 10) fails.push(`row ${i + 1}: regroup boxes wrong`);
          } else if (mode === 'expanded') {
            const st = card.querySelector('[data-lcs-value]');
            const h = +st.dataset.lcsH, t = +st.dataset.lcsT, o = +st.dataset.lcsO;
            const c = census(st.querySelector('[data-lcs-prim="base-ten"]'));
            if (c.h !== h || c.t !== t || c.o !== o) fails.push(`row ${i + 1}: blocks != declared`);
            const correct = [...card.querySelectorAll('.ws-chip')].filter((x) => x.dataset.lcsCorrect);
            if (correct.length !== 1) { fails.push(`row ${i + 1}: ${correct.length} correct`); return; }
            const sum = correct[0].dataset.lcsExp.split('+').reduce((acc, x) => acc + parseInt(x.trim(), 10), 0);
            if (sum !== h * 100 + t * 10 + o) fails.push(`row ${i + 1}: expanded form sums to ${sum}`);
          } else if (mode === 'digit-value') {
            const want = +card.querySelector('[data-lcs-digitvalue]').dataset.lcsDigitvalue;
            const shown = card.querySelector('[data-lcs-shown]');
            const v = shown.dataset.lcsShown, idx = +shown.dataset.lcsIdx;
            const expect = (+v[idx]) * Math.pow(10, v.length - 1 - idx);
            if (want !== expect) fails.push(`row ${i + 1}: declared value ${want} != ${expect}`);
            const correct = [...card.querySelectorAll('.ws-chip')].filter((x) => x.dataset.lcsCorrect);
            if (correct.length !== 1 || +correct[0].dataset.lcsChoice !== want) fails.push(`row ${i + 1}: chips wrong`);
          }
        });
        return fails;
      }, m);
    },
  };
}

module.exports = { makeBaseTenType };
