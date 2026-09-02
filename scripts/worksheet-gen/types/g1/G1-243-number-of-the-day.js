/**
 * G1-243 — Number of the Day (nt20-B; `number-of-the-day`, G1,
 * K.NBT.A.1 / 1.NBT.B.2 — Zahl des Tages / nombre du jour / dagens tal).
 * One number huge in a white card; the page asks "how many ways can you show
 * it?": write its word, tens and ones, ten frames (d1) / draw it with blocks,
 * before and after, ten more / ten less, find it on the number line, count on
 * / count back. Every cell is an empty apparatus; only N is printed. The
 * number word (lib/number-words.js) is never printed; N is never a tick label
 * (d1 N ∈ 11..19 \ {15}; d2 21..49 not ÷5; d3 21..99 not ÷10).
 */
'use strict';
const tenFrame = require('../../primitives/ten-frame.js');
const tally = require('../../primitives/tally.js');
const numberLine = require('../../primitives/number-line.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { answerBox } = require('../../templates/components.js');
const { dotPanel } = require('../../templates/components-b2.js');
const { numberWord } = require('../../lib/number-words.js');
const { LABELS } = require('../../data/b2/labels.js');

const cell = (label, inner, w, extra) =>
  `<div class="ws-card" style="width:${w}px;padding:10px 12px;gap:6px;flex:0 0 auto" ${extra || ''}>` +
  `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:#8A8276;line-height:1.15">${label}</span>` +
  `<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap">${inner}</div></div>`;

module.exports = {
  id: 'G1-243',
  slug: 'number-of-the-day',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'number-of-the-day',
  themeAxis: { applicable: false },
  difficulty: {
    1: { min: 11, max: 19, exclude: (n) => n === 15, line: { max: 20, tick: 1, label: 5 }, frames: true, tens: true, tenMore: false, countBy: 1 },
    2: { min: 21, max: 49, exclude: (n) => n % 5 === 0, line: { max: 50, tick: 1, label: 5 }, frames: false, tens: true, tenMore: true, countBy: 1 },
    3: { min: 21, max: 99, exclude: (n) => n % 10 === 0, line: { max: 100, tick: 5, label: 10 }, frames: false, tens: true, tenMore: true, oneMore: true, countBy: 10 },
  },
  i18n: {
    en: {
      title: 'Number of the Day',
      instruction: 'Look at the big number. Show it in every box on the page.',
    },
  },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc] && LABELS[loc].numberOfDay;
    if (!L) throw new Error(`G1-243: no labels for locale ${loc}`);
    let N, guard = 0;
    do { N = rng.int(d.min, d.max); guard++; } while (d.exclude(N) && guard < 100);
    const word = numberWord(N, loc);
    const tens = Math.floor(N / 10), ones = N % 10;

    // Row A: numeral · number word (one full-width row) · before/after
    const numeral = `<div class="ws-card" style="width:170px;height:170px;background:#FFFFFF;border:3px solid #146B5E;border-radius:16px;align-items:center;justify-content:center;flex:0 0 auto" data-lcs-cell="numeral">` +
      `<span style="font-family:'Baloo 2';font-weight:700;font-size:104px;line-height:1;color:#3A3530" data-lcs-numeral>${N}</span></div>`;
    const wordCell = cell(L.numberWord, writingRow({ w: 290, h: 70, glyphH: 30, xHeight: true }).svg, 318, `data-lcs-cell="word" data-lcs-word="${word}"`);
    const ba = cell(L.beforeAfter,
      `<span style="display:flex;align-items:center;gap:8px">${answerBox({ w: 56, h: 50, answer: N - 1 })}` +
      `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#3A3530">${N}</span>${answerBox({ w: 56, h: 50, answer: N + 1 })}</span>`,
      156, 'data-lcs-cell="before-after"');
    const rowA = `<div style="display:flex;gap:14px;justify-content:space-between;height:170px">${numeral}${wordCell}${ba}</div>`;

    // Row B: tens & ones · frames/tally (d1) or draw it · ±10 (d2/d3)
    const tensOnes = cell(L.tensOnes,
      `<span style="display:flex;gap:16px;align-items:flex-end">` +
      `<span style="display:flex;flex-direction:column;align-items:center;gap:4px"><span style="font-family:'Nunito';font-weight:800;font-size:13px;color:#8A8276">${L.tens}</span>${answerBox({ w: 60, h: 52, answer: tens })}</span>` +
      `<span style="display:flex;flex-direction:column;align-items:center;gap:4px"><span style="font-family:'Nunito';font-weight:800;font-size:13px;color:#8A8276">${L.ones}</span>${answerBox({ w: 60, h: 52, answer: ones })}</span></span>`,
      210, 'data-lcs-cell="tens-ones"');
    let mid, right;
    if (d.frames) {
      mid = cell(L.tenFrames, `<div style="display:flex;flex-direction:column;gap:6px">${tenFrame({ a: 0, cell: 32 }).svg}${tenFrame({ a: 0, cell: 32 }).svg}</div>`, 220, 'data-lcs-cell="frames"');
      right = cell(L.tally, `<div style="position:relative;width:190px;height:140px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px" data-lcs-open>` +
        `<div style="position:absolute;right:8px;bottom:6px;opacity:0.7">${tally({ n: 5, strokeH: 22, gap: 6, groupGap: 10 }).svg}</div></div>`, 210, 'data-lcs-cell="tally"');
    } else {
      mid = cell(L.drawIt, `<div style="width:190px;height:150px" data-lcs-open>${dotPanel({ w: 190, h: 150 })}</div>`, 220, 'data-lcs-cell="draw"');
      const eq = (op, k, ans) => `<span style="display:flex;align-items:center;gap:8px;font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530"><span>${N} ${op} ${k} =</span>${answerBox({ w: 60, h: 48, answer: ans })}</span>`;
      const inner = `<div style="display:flex;flex-direction:column;gap:10px">${eq('+', 10, N + 10)}${eq('−', 10, N - 10)}${d.oneMore ? eq('+', 1, N + 1) + eq('−', 1, N - 1) : ''}</div>`;
      right = cell(d.oneMore ? `${L.tenMoreLess} · ${L.oneMoreLess}` : L.tenMoreLess, inner, 210, 'data-lcs-cell="plus-minus"');
    }
    const rowB = `<div style="display:flex;gap:14px;justify-content:space-between">${tensOnes}${mid}${right}</div>`;

    // Row C: number line (no marks)
    const nl = numberLine({ min: 0, max: d.line.max, tickStep: d.line.tick, labelEvery: d.line.label, width: 560 });
    const rowC = cell(L.numberLine, nl.svg, 660, `data-lcs-cell="line" data-lcs-expect="${N}"`);

    // Row D: count on / count back (or by tens)
    const step = d.countBy;
    const chain = (dir, labelTxt, key) => {
      const vals = [1, 2, 3].map((k) => N + dir * k * step);
      return cell(labelTxt,
        `<span style="display:flex;align-items:center;gap:5px;font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530;padding-left:4px"><span>${N}</span>` +
        vals.map((v) => `<span style="color:#146B5E;font-size:20px">→</span>${answerBox({ w: 48, h: 44, answer: v })}`).join('') + `</span>`,
        323, `data-lcs-cell="${key}"`);
    };
    const rowD = `<div style="display:flex;gap:14px;justify-content:space-between">` +
      chain(1, step === 10 ? L.countOnTens : L.countOn, step === 10 ? 'count-on-tens' : 'count-on') +
      (step === 10 ? cell(L.countBack, `<span style="display:flex;align-items:center;gap:5px;font-family:'Baloo 2';font-weight:700;font-size:24px;color:#3A3530;padding-left:4px"><span>${N}</span>${[1, 2, 3].map((k) => `<span style="color:#146B5E;font-size:20px">→</span>${answerBox({ w: 48, h: 44, answer: N - k })}`).join('')}</span>`, 323, 'data-lcs-cell="count-back"')
        : chain(-1, L.countBack, 'count-back')) + `</div>`;

    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:space-evenly" data-ws-content data-lcs-n="${N}">${rowA}${rowB}${rowC}${rowD}</div>`,
      meta: { N, word },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-n]');
      if (!root) return ['no page root'];
      const N = +root.dataset.lcsN;
      const numeral = document.querySelector('[data-lcs-numeral]');
      if (!numeral || +numeral.textContent !== N) fails.push('numeral card != N');
      // answers recomputed
      const boxes = [...document.querySelectorAll('[data-lcs-answer]')];
      const byCell = (k) => [...document.querySelectorAll(`[data-lcs-cell="${k}"] [data-lcs-answer]`)].map((b) => +b.dataset.lcsAnswer);
      const ba = byCell('before-after');
      if (ba.join(',') !== `${N - 1},${N + 1}`) fails.push(`before/after ${ba}`);
      const to = byCell('tens-ones');
      if (to.join(',') !== `${Math.floor(N / 10)},${N % 10}`) fails.push(`tens/ones ${to}`);
      const pm = byCell('plus-minus');
      if (pm.length && (pm[0] !== N + 10 || pm[1] !== N - 10)) fails.push(`±10 ${pm}`);
      if (pm.length === 4 && (pm[2] !== N + 1 || pm[3] !== N - 1)) fails.push(`±1 ${pm}`);
      const co = byCell('count-on'), cot = byCell('count-on-tens'), cb = byCell('count-back');
      if (co.length && co.join(',') !== `${N + 1},${N + 2},${N + 3}`) fails.push(`count on ${co}`);
      if (cot.length && cot.join(',') !== `${N + 10},${N + 20},${N + 30}`) fails.push(`count on tens ${cot}`);
      if (cb.length && cb.join(',') !== `${N - 1},${N - 2},${N - 3}`) fails.push(`count back ${cb}`);
      boxes.forEach((b) => { if (b.textContent.trim()) fails.push('answer box not empty'); });
      // the number word is printed nowhere
      const word = document.querySelector('[data-lcs-word]').dataset.lcsWord;
      const body = document.body.textContent.toLowerCase().replace(/[\s-]/g, '');
      if (word && body.includes(word.toLowerCase().replace(/[\s-]/g, ''))) fails.push('number word printed');
      // number line: no marks/hops, N is not a tick label
      const line = document.querySelector('[data-lcs-prim="number-line"]');
      if (!line) fails.push('no number line');
      else {
        if (line.querySelector('[data-lcs-mark],[data-lcs-hop]')) fails.push('number line carries a mark/hop');
        const labels = [...line.querySelectorAll('[data-lcs-ticklabel]')].map((t) => +t.dataset.lcsTicklabel);
        if (labels.includes(N)) fails.push('N printed as a tick label');
        if (!line.querySelector(`[data-lcs-tick="${N}"]`)) fails.push('N has no tick');
      }
      // answer digits: N±1, N±10 must not be printed as standalone numbers outside allowed places
      const allowed = new Set([N]);
      [...document.querySelectorAll('[data-lcs-ticklabel], [data-lcs-numeral], [data-lcs-count-badge]')].forEach((t) => allowed.add(+t.textContent));
      const answers = boxes.map((b) => +b.dataset.lcsAnswer);
      const texts = [...document.querySelectorAll('.ws-body *')].filter((n) => n.children.length === 0).map((n) => n.textContent.trim());
      answers.forEach((a) => {
        if (allowed.has(a)) return;
        texts.forEach((t) => { if (new RegExp(`(^|\\D)${a}(\\D|$)`).test(t) && !/[+−]/.test(t)) fails.push(`answer ${a} printed as "${t}"`); });
      });
      const frames = document.querySelectorAll('[data-lcs-prim="ten-frame"]');
      frames.forEach((f) => { if (+f.dataset.lcsA !== 0 || +(f.dataset.lcsB || 0) !== 0) fails.push('ten frame not empty'); });
      return fails;
    });
  },
};
