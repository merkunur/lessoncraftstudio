/**
 * G1-243 — Number of the Day (nt20-B; `number-of-the-day`, G1,
 * K.NBT.A.1 / 1.NBT.B.2 — Zahl des Tages / nombre du jour / dagens tal).
 * One number huge in a white card; the page asks "how many ways can you show
 * it?": write its word, tens and ones, ten frames / draw it with blocks,
 * before and after, ten more / ten less, one more / one less, find it on the
 * number line, count on / count back (by ones or by tens). Every cell is an
 * empty apparatus; only N is printed. The number word (lib/number-words.js)
 * is never printed; N is never a tick label.
 *
 * LEVELS (Level Set 2026-10-13) — `levelsFor(id)` holds the three levels of
 * every face of the family (G1-243 + G1-255/256/257, which only call it):
 * level 2 = the published page, levels 1 / 3 easier / harder. ⚠ re-running
 * tools/gen-b2var-specs.js would flatten the variations back to one level.
 * Every answer on every page is ≤ 99 (the live "Up to 99" page counted on by
 * tens from 79 to 109 — fixed: its numbers now stop at 69).
 *
 * Level knobs: min/max/exclude (N) · line {max, tick, label} · frames (two
 * ten frames; tenGiven = the first one printed FULL, the ten of a teen
 * number) · tenMore / oneMore (the "more, less" card; with frames the tally
 * card gives way to it) · countBy (count on: 1 or 10) · countBackBy (1 / 10).
 */
'use strict';
const tenFrame = require('../../primitives/ten-frame.js');
const numberLine = require('../../primitives/number-line.js');
const { writingRow } = require('../../primitives/trace-path.js');
const { answerBox } = require('../../templates/components.js');
const { dotPanel } = require('../../templates/components-b2.js');
const { numberWord } = require('../../lib/number-words.js');
const { LABELS } = require('../../data/b2/labels.js');
const LS = require('../../data/b2/number-of-the-day-levelset.json');
const { pageFill } = require('../../lib/page-fill.js');

const cell = (label, inner, w, extra) =>
  `<div class="ws-card" style="width:${w}px;padding:10px 12px;gap:6px;flex:0 0 auto;box-sizing:border-box" ${extra || ''}>` +
  `<span style="font-family:'Nunito';font-weight:800;font-size:14px;color:#8A8276;line-height:1.15" data-lcs-label>${label}</span>` +
  `<div style="flex:1;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap" data-lcs-cell-body>${inner}</div></div>`;

const not5 = (n) => n % 5 === 0, not10 = (n) => n % 10 === 0;
const LEGACY = {
  1: { min: 11, max: 19, exclude: (n) => n === 15, line: { max: 20, tick: 1, label: 5 }, frames: true, tens: true, tenMore: false, countBy: 1 },
  2: { min: 21, max: 49, exclude: not5, line: { max: 50, tick: 1, label: 5 }, frames: false, tens: true, tenMore: true, countBy: 1 },
  3: { min: 21, max: 99, exclude: not10, line: { max: 100, tick: 5, label: 10 }, frames: false, tens: true, tenMore: true, oneMore: true, countBy: 10 },
};
const LEVELS = {
  'G1-243': {
    // L1 a smaller number (21-39) on a shorter line, labelled every 2. No "one more, one less" card on any NEW level: it only repeats the
    // before / after answers (review 2026-10-13); the published level-2 pages keep their cards.
    // An odd number on a line labelled every 2: it always sits between two printed neighbours (the before / after).
    1: { min: 21, max: 39, exclude: (n) => n % 2 === 0 || n === 25 || n === 35, line: { max: 40, tick: 1, label: 2 }, frames: false, tenMore: true, countBy: 1 },
    2: LEGACY[2],
    // L3 a big number (51-89), a line labelled only every 20
    3: { min: 51, max: 89, exclude: not10, line: { max: 100, tick: 1, label: 20 }, frames: false, tenMore: true, countBy: 1 },
  },
  'G1-255': {
    // L1 the ten is given: the first ten frame is printed full, the child shows the ones
    1: { ...LEGACY[1], exclude: () => false, tenGiven: true },
    2: LEGACY[1],
    // L3 no frames: draw it with blocks, ten more / ten less, the line labelled only 0 / 10 / 20
    3: { min: 11, max: 19, exclude: () => false, line: { max: 20, tick: 1, label: 10 }, frames: false, tenMore: true, countBy: 1 },
  },
  'G1-256': {
    // L1 the ten frames stay beside "ten more, ten less" (the ten you add is a full frame)
    1: { ...LEGACY[1], exclude: () => false, frames: true, tenMore: true, line: { max: 30, tick: 1, label: 5 } },
    2: { ...LEGACY[1], frames: false, tenMore: true, line: { max: 30, tick: 1, label: 5 } },
    // L3 a two-digit number, count on AND back in tens
    3: { min: 31, max: 69, exclude: not10, line: { max: 100, tick: 1, label: 10 }, frames: false, tenMore: true, countBy: 10, countBackBy: 10 },
  },
  'G1-257': {
    // L1 numbers to 59, count on and back by ones
    1: { min: 21, max: 59, exclude: not10, line: { max: 60, tick: 1, label: 10 }, frames: false, tenMore: true, countBy: 1 },
    // L2 the published page; its numbers stop at 69 so counting on by tens stays within 99
    2: { ...LEGACY[3], max: 69, line: { max: 100, tick: 1, label: 10 } },
    // L3 numbers in the 70s and 80s, count back by tens, the line labelled only every 20
    3: { min: 71, max: 89, exclude: not10, line: { max: 100, tick: 1, label: 20 }, frames: false, tenMore: true, countBy: 1, countBackBy: 10 },
  },
};
function levelsFor(id) { return LEVELS[id]; }

module.exports = {
  id: 'G1-243',
  slug: 'number-of-the-day',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'number-of-the-day',
  themeAxis: { applicable: false },
  difficulty: LEVELS['G1-243'],
  legacy: LEGACY,
  levelsFor,
  i18n: {
    en: {
      title: 'Number of the Day',
      instruction: 'Look at the big number. Fill in every box on the page for that number.',
    },
  },
  levelSetWords(m) { return [m.N, ...(m.answers || [])].map(String); },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const rng = ctx.rng;
    const loc = (locale || 'en').slice(0, 2);
    const L = LABELS[loc] && LABELS[loc].numberOfDay;
    if (!L) throw new Error(`G1-243: no labels for locale ${loc}`);
    let N, guard = 0;
    do { N = rng.int(d.min, d.max); guard++; } while (d.exclude(N) && guard < 100);
    if (d.exclude(N)) throw new Error(`G1-243: no number for level ${difficulty}`);
    const word = numberWord(N, loc);
    const tens = Math.floor(N / 10), ones = N % 10;
    const answers = [];
    const box = (w, h, a) => { answers.push(a); return answerBox({ w, h, answer: a }); };
    const big = (txt, px) => `<span style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;color:#3A3530;white-space:nowrap">${txt}</span>`;

    // Row A: numeral · number word · before/after (the boxes sit INSIDE their card)
    const numeral = `<div class="ws-card" style="width:170px;height:170px;background:#FFFFFF;border:3px solid #146B5E;border-radius:16px;align-items:center;justify-content:center;flex:0 0 auto;box-sizing:border-box" data-lcs-cell="numeral">` +
      `<span style="font-family:'Baloo 2';font-weight:700;font-size:104px;line-height:1;color:#3A3530" data-lcs-numeral>${N}</span></div>`;
    const wordCell = cell(L.numberWord, writingRow({ w: 254, h: 84, glyphH: 34, xHeight: true }).svg, 280, `data-lcs-cell="word" data-lcs-word="${word}"`);
    const ba = cell(L.beforeAfter,
      `<span style="display:flex;align-items:center;gap:6px">${box(54, 54, N - 1)}${big(N, 28)}${box(54, 54, N + 1)}</span>`,
      194, 'data-lcs-cell="before-after"');
    const rowA = `<div style="display:flex;gap:14px;justify-content:space-between;height:170px">${numeral}${wordCell}${ba}</div>`;

    // Row B: tens & ones · frames or draw it · tally or "more, less"
    const head = (t) => `<span style="font-family:'Nunito';font-weight:800;font-size:15px;color:#8A8276">${t}</span>`;
    const tensOnes = cell(L.tensOnes,
      `<span style="display:flex;flex-direction:column;gap:14px;align-items:stretch">` +
      `<span style="display:flex;align-items:center;justify-content:space-between;gap:12px">${head(L.tens)}${box(80, 70, tens)}</span>` +
      `<span style="display:flex;align-items:center;justify-content:space-between;gap:12px">${head(L.ones)}${box(80, 70, ones)}</span></span>`,
      210, 'data-lcs-cell="tens-ones"');
    const eq = (op, k) => {
      const a = op === '+' ? N + k : N - k;
      return `<span style="display:flex;align-items:center;gap:8px" data-lcs-eq="${op}${k}">${big(`${N} ${op === '+' ? '+' : '−'} ${k} =`, 24)}${box(62, 50, a)}</span>`;
    };
    const moreLess = () => {
      const parts = [], labels = [];
      if (d.tenMore) { parts.push(eq('+', 10), eq('-', 10)); labels.push(L.tenMoreLess); }
      if (d.oneMore) { parts.push(eq('+', 1), eq('-', 1)); labels.push(L.oneMoreLess); }
      return cell(labels.join(' · '), `<div style="display:flex;flex-direction:column;gap:12px">${parts.join('')}</div>`, 220, 'data-lcs-cell="plus-minus"');
    };
    let mid, right;
    if (d.frames) {
      const f1 = tenFrame({ a: d.tenGiven ? 10 : 0, cell: 34 }).svg, f2 = tenFrame({ a: 0, cell: 34 }).svg;
      mid = cell(L.tenFrames, `<div style="display:flex;flex-direction:column;gap:8px"${d.tenGiven ? ' data-lcs-ten-given' : ''}>${f1}${f2}</div>`, 212, 'data-lcs-cell="frames"');
      right = d.tenMore ? moreLess()
        : cell(L.tally, `<div style="position:relative;width:196px;height:150px;background:#FFFFFF;border:2px solid #F0E4CB;border-radius:12px" data-lcs-open></div>`, 220, 'data-lcs-cell="tally"');
    } else {
      mid = cell(L.drawIt, `<div style="width:188px;height:160px" data-lcs-open>${dotPanel({ w: 188, h: 160 })}</div>`, 212, 'data-lcs-cell="draw"');
      right = moreLess();
    }
    const rowB = `<div style="display:flex;gap:14px;justify-content:space-between">${tensOnes}${mid}${right}</div>`;

    // Row C: number line (no marks), as wide as the page
    const nl = numberLine({ min: 0, max: d.line.max, tickStep: d.line.tick, labelEvery: d.line.label, width: 612 });
    const rowC = cell(L.numberLine, nl.svg, 672, `data-lcs-cell="line" data-lcs-expect="${N}"`);

    // Row D: count on / count back (by ones or by tens)
    const chain = (dir, step, labelTxt, key) => cell(labelTxt,
      `<span style="display:flex;align-items:center;gap:6px;padding-left:2px">${big(N, 26)}` +
      [1, 2, 3].map((k) => `<span style="color:#146B5E;font-size:20px">→</span>${box(56, 50, N + dir * k * step)}`).join('') + `</span>`,
      329, `data-lcs-cell="${key}" data-lcs-step="${dir * step}"`);
    const onBy = d.countBy || 1, backBy = d.countBackBy || 1;
    const rowD = `<div style="display:flex;gap:14px;justify-content:space-between">` +
      chain(1, onBy, onBy === 10 ? L.countOnTens : L.countOn, onBy === 10 ? 'count-on-tens' : 'count-on') +
      chain(-1, backBy, backBy === 10 ? LS.countBackTens[loc] : L.countBack, backBy === 10 ? 'count-back-tens' : 'count-back') + `</div>`;

    return {
      bodyHtml: `<div style="flex:1;display:flex;flex-direction:column;gap:14px;justify-content:space-evenly" data-ws-content data-lcs-n="${N}">${rowA}${rowB}${rowC}${rowD}</div>`,
      meta: { N, word, answers },
    };
  },

  async verify(page) {
    // page use (shared) + CARD use: these cards hold printed sums and empty boxes, not drawings, so lib cardFill (pixels of
    // drawings / boxes only) reads a full card of equations as 19 % — measured here instead: what the card holds (its
    // body below the label, text included) must span ≥ 40 % of that height and ≥ 50 % of the width (a "floats in the
    // middle" card fails; the old side-by-side tens/ones boxes in a level-3 row did, 33 %)
    const pf = await page.evaluate(pageFill);
    const ext = await page.evaluate(() => [...document.querySelectorAll('.ws-body .ws-card')].map((c) => {
      const body = c.querySelector('[data-lcs-cell-body]'); if (!body) return null;
      const lab = c.querySelector('[data-lcs-label]'), cr = c.getBoundingClientRect();
      const top = lab ? lab.getBoundingClientRect().bottom : cr.top, availH = cr.bottom - 10 - top, availW = cr.width - 24;
      const rs = [...body.querySelectorAll('*')].map((e) => e.getBoundingClientRect()).filter((r) => r.width > 2 && r.height > 2);
      if (!rs.length) return `${c.dataset.lcsCell}: empty`;
      const h = Math.max(...rs.map((r) => r.bottom)) - Math.min(...rs.map((r) => r.top)), w = Math.max(...rs.map((r) => r.right)) - Math.min(...rs.map((r) => r.left));
      if (h / availH < 0.4) return `${c.dataset.lcsCell}: content spans ${Math.round(100 * h / availH)}% of the card height`;
      if (w / availW < 0.5) return `${c.dataset.lcsCell}: content spans ${Math.round(100 * w / availW)}% of the card width`;
      return null;
    }).filter(Boolean));
    const fails0 = [...pf.fails, ...ext];
    return fails0.concat(await page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-n]');
      if (!root) return ['no page root'];
      const N = +root.dataset.lcsN;
      const numeral = document.querySelector('[data-lcs-numeral]');
      if (!numeral || +numeral.textContent !== N) fails.push('numeral card != N');
      const boxes = [...document.querySelectorAll('[data-lcs-answer]')];
      const byCell = (k) => [...document.querySelectorAll(`[data-lcs-cell="${k}"] [data-lcs-answer]`)].map((b) => +b.dataset.lcsAnswer);
      const ba = byCell('before-after');
      if (ba.join(',') !== `${N - 1},${N + 1}`) fails.push(`before/after ${ba}`);
      const to = byCell('tens-ones');
      if (to.join(',') !== `${Math.floor(N / 10)},${N % 10}`) fails.push(`tens/ones ${to}`);
      // each "more, less" equation: the answer is what the printed sum says
      document.querySelectorAll('[data-lcs-eq]').forEach((e) => {
        const m = /^([+-])(\d+)$/.exec(e.dataset.lcsEq), a = +e.querySelector('[data-lcs-answer]').dataset.lcsAnswer;
        const txt = e.textContent.replace(/\s/g, '');
        if (!m || a !== (m[1] === '+' ? N + +m[2] : N - +m[2])) fails.push(`equation ${e.dataset.lcsEq} → ${a}`);
        if (!txt.startsWith(`${N}${m && m[1] === '+' ? '+' : '−'}${m && m[2]}=`)) fails.push(`equation text "${txt}"`);
      });
      // each count chain: three steps of its own size; a "tens" label only on a chain of tens
      document.querySelectorAll('[data-lcs-step]').forEach((c) => {
        const s = +c.dataset.lcsStep, v = [...c.querySelectorAll('[data-lcs-answer]')].map((b) => +b.dataset.lcsAnswer);
        if (v.join(',') !== [1, 2, 3].map((k) => N + k * s).join(',')) fails.push(`count ${c.dataset.lcsCell} ${v}`);
        if (/tens/.test(c.dataset.lcsCell) !== (Math.abs(s) === 10)) fails.push(`count label/step ${c.dataset.lcsCell} ${s}`);
      });
      boxes.forEach((b) => { const a = +b.dataset.lcsAnswer; if (!(a >= 0 && a <= 99)) fails.push(`answer ${a} outside 0-99`); });
      boxes.forEach((b) => { if (b.textContent.trim()) fails.push('answer box not empty'); });
      // a squeezed box is a defect too (a flex row too narrow shrinks the boxes instead of spilling them)
      boxes.forEach((b) => { const r = b.getBoundingClientRect(); if (r.width < parseFloat(b.style.width) - 1 || r.height < parseFloat(b.style.height) - 1) fails.push(`answer box squeezed to ${Math.round(r.width)}×${Math.round(r.height)}`); });
      // every box and drawing sits inside its card
      document.querySelectorAll('.ws-body .ws-card').forEach((c) => {
        // measured against the card's PADDED inner edge: the live before/after boxes sat on the card border itself
        const r0 = c.getBoundingClientRect(), cs = getComputedStyle(c);
        const r = { left: r0.left + parseFloat(cs.paddingLeft) - 2, right: r0.right - parseFloat(cs.paddingRight) + 2, top: r0.top, bottom: r0.bottom };
        c.querySelectorAll('[data-lcs-answer], svg').forEach((x) => {
          const q = x.getBoundingClientRect();
          if (q.left < r.left - 0.5 || q.right > r.right + 0.5 || q.top < r.top - 0.5 || q.bottom > r.bottom + 0.5) fails.push(`${c.dataset.lcsCell || 'card'}: content past its card edge`);
        });
      });
      const word = document.querySelector('[data-lcs-word]').dataset.lcsWord;
      const body = document.body.textContent.toLowerCase().replace(/[\s-]/g, '');
      if (word && body.includes(word.toLowerCase().replace(/[\s-]/g, ''))) fails.push('number word printed');
      const line = document.querySelector('[data-lcs-prim="number-line"]');
      if (!line) fails.push('no number line');
      else {
        if (line.querySelector('[data-lcs-mark],[data-lcs-hop]')) fails.push('number line carries a mark/hop');
        const labels = [...line.querySelectorAll('[data-lcs-ticklabel]')].map((t) => +t.dataset.lcsTicklabel);
        if (labels.includes(N)) fails.push('N printed as a tick label');
        if (!line.querySelector(`[data-lcs-tick="${N}"]`)) fails.push('N has no tick');
      }
      const allowed = new Set([N]);
      [...document.querySelectorAll('[data-lcs-ticklabel], [data-lcs-numeral], [data-lcs-count-badge]')].forEach((t) => allowed.add(+t.textContent));
      const answers = boxes.map((b) => +b.dataset.lcsAnswer);
      const texts = [...document.querySelectorAll('.ws-body *')].filter((n) => n.children.length === 0 && !n.hasAttribute('data-lcs-label')).map((n) => n.textContent.trim());   // a card label ("1 more, 1 less") is not a printed answer
      answers.forEach((a) => {
        if (allowed.has(a)) return;
        texts.forEach((t) => { if (new RegExp(`(^|\\D)${a}(\\D|$)`).test(t) && !/[+−]/.test(t)) fails.push(`answer ${a} printed as "${t}"`); });
      });
      // ten frames empty — except the one printed full on a "the ten is given" page (exactly the first)
      const frames = [...document.querySelectorAll('[data-lcs-prim="ten-frame"]')];
      const given = !!document.querySelector('[data-lcs-ten-given]');
      frames.forEach((f, i) => {
        const a = +f.dataset.lcsA, b = +(f.dataset.lcsB || 0);
        if (given && i === 0) { if (a !== 10 || b !== 0) fails.push('the given ten frame is not full'); }
        else if (a !== 0 || b !== 0) fails.push('ten frame not empty');
      });
      if (given && N < 11) fails.push('a given ten on a number below 11');
      return fails;
    }));
  },
};
