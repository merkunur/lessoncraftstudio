/**
 * Regrouping with tens and ones (Year pages V, 2026-11-14; Daily Teaching System Part 12.2; Grades 1-2):
 *   mat-add      G1-573 Add and Make a New Ten: Tens-and-Ones Mat — a sum of two two-digit numbers whose ones make
 *                a new ten (36 + 28), a tens-and-ones mat, and the sentence "_ tens and _ ones = _". Level 1 both
 *                numbers are drawn on the mat as sticks and dots (the child rings ten dots, draws the new stick and
 *                counts) · level 2 the mat is empty: the child draws both numbers · level 3 the mat is empty and two
 *                of the six sums make NO new ten (the child has to look). No sum ends in 1 ("1 ones"). 1.NBT.C.4.
 *   mat-sub      G2-513 Subtract and Open a Ten: Tens-and-Ones Mat — a difference of two-digit numbers, the first
 *                number drawn on the mat, the question "Enough ones? yes / no"; the child opens a stick into ten dots
 *                when there are not enough ones, crosses out and writes what is left. Level 1 a one-digit number is
 *                taken away · level 2 a two-digit number · level 3 a two-digit number and the mat is empty (the child
 *                draws the first number). On every page some tasks need no ten opened. 2.NBT.B.5.
 *   column-many  G2-514 Add Three and Four Two-Digit Numbers — sums of three or four two-digit numbers written in
 *                columns with a small box for the new tens above the tens column. Level 1 three numbers, the ones
 *                make no new ten · level 2 three and four numbers, two of the ones always make ten (look for the ten
 *                first) · level 3 four numbers, the ones make one or two new tens. Sums up to 99. 2.NBT.B.6.
 *                The small box stands above the tens; on German pages under the numbers, at the line (the Übertrag);
 *                the easier page has none.
 * The words tens / ones are those of the reviewed place-value pages (data/place-value/words.js); the mat's own words
 * (and, enough ones?, yes, no) were read by a native reader (2026-11-14). No theme: a copy is a new draw of the numbers.
 * Printed page only.
 */
'use strict';
const tokens = require('../../primitives/_tokens.js');
const { cardGrid } = require('../../templates/layouts/card-grid.js');

const C = tokens.color, INK = C.ink, TEAL = C.teal, CORAL = C.coral;
const MINUS = '−';
const loc2 = (l) => String(l || 'en').slice(0, 2);
// head = the two columns of the mat; of = the count words of the sentence "_ tens and _ ones = _"
const WORDS = {
  en: { tensHead: 'Tens', onesHead: 'Ones', tens: 'tens', ones: 'ones', and: 'and', enough: 'Enough ones?', yes: 'yes', no: 'no' },
  de: { tensHead: 'Zehner', onesHead: 'Einer', tens: 'Zehner', ones: 'Einer', and: 'und', enough: 'Genug Einer?', yes: 'ja', no: 'nein' },
  es: { tensHead: 'Decenas', onesHead: 'Unidades', tens: 'decenas', ones: 'unidades', and: 'y', enough: '¿Alcanzan las unidades?', yes: 'sí', no: 'no' },
  pt: { tensHead: 'Dezenas', onesHead: 'Unidades', tens: 'dezenas', ones: 'unidades', and: 'e', enough: 'Dá para tirar?', yes: 'sim', no: 'não' },
  fr: { tensHead: 'Dizaines', onesHead: 'Unités', tens: 'dizaines', ones: 'unités', and: 'et', enough: "Assez d'unités ?", yes: 'oui', no: 'non' },
  it: { tensHead: 'Decine', onesHead: 'Unità', tens: 'decine', ones: 'unità', and: 'e', enough: 'Bastano le unità?', yes: 'sì', no: 'no' },
  nl: { tensHead: 'Tientallen', onesHead: 'Eenheden', tens: 'tientallen', ones: 'eenheden', and: 'en', enough: 'Genoeg eenheden?', yes: 'ja', no: 'nee' },
  sv: { tensHead: 'Tiotal', onesHead: 'Ental', tens: 'tiotal', ones: 'ental', and: 'och', enough: 'Räcker entalen?', yes: 'ja', no: 'nej' },
  da: { tensHead: 'Tiere', onesHead: 'Enere', tens: 'tiere', ones: 'enere', and: 'og', enough: 'Er der enere nok?', yes: 'ja', no: 'nej' },
  no: { tensHead: 'Tiere', onesHead: 'Enere', tens: 'tiere', ones: 'enere', and: 'og', enough: 'Er det nok enere?', yes: 'ja', no: 'nei' },
  fi: { tensHead: 'Kympit', onesHead: 'Ykköset', tens: 'kymppiä', ones: 'ykköstä', and: 'ja', enough: 'Riittävätkö ykköset?', yes: 'kyllä', no: 'ei' },
};

const LEVELS = {
  'mat-add': {
    1: { cards: 6, cols: 2, drawn: true, plain: 0 },
    2: { cards: 6, cols: 2, drawn: false, plain: 0 },
    3: { cards: 6, cols: 2, drawn: false, plain: 2 },
  },
  'mat-sub': {
    1: { cards: 6, cols: 2, drawn: true, one: true, plain: 2 },
    2: { cards: 6, cols: 2, drawn: true, one: false, plain: 2 },
    3: { cards: 6, cols: 2, drawn: false, one: false, plain: 1 },
  },
  'column-many': {
    1: { cards: 6, cols: 3, n: [3, 3, 3, 3, 3, 3], carry: 0 },
    2: { cards: 8, cols: 4, n: [3, 3, 3, 3, 4, 4, 4, 4], carry: 1, tenPair: true },
    3: { cards: 8, cols: 4, n: [4, 4, 4, 4, 4, 4, 4, 4], carry: 2 },
  },
};

const EQ = `font:700 23px/1 'Baloo 2',cursive;color:${INK};white-space:nowrap;flex:0 0 auto`;
const SMALL = `font:700 15px/1.2 'Nunito',sans-serif;color:${INK};white-space:nowrap`;

/** the numbers of a mat drawn as sticks (the tens cell) or dots (the ones cell): one row of ROW px per number, the
 *  second number in teal. Each is a picture of a fixed size laid at the top left of its cell. */
const ROW = 38;
function sticksSvg(rows) {
  let s = '';
  rows.forEach((n, i) => { for (let k = 0; k < Math.floor(n / 10); k++) s += `<line x1="${8 + k * 13}" y1="${i * ROW + 3}" x2="${8 + k * 13}" y2="${i * ROW + 32}" stroke="${i ? TEAL : INK}" stroke-width="4" stroke-linecap="round" data-lcs-stick="${i ? 'b' : 'a'}"/>`; });
  return `<svg width="88" height="${rows.length * ROW}" viewBox="0 0 88 ${rows.length * ROW}" style="display:block;flex:0 0 auto">${s}</svg>`;
}
function dotsSvg(rows) {
  let s = '';
  rows.forEach((n, i) => { for (let k = 0; k < n % 10; k++) s += `<circle cx="${8 + (k % 5) * 16}" cy="${i * ROW + 9 + Math.floor(k / 5) * 17}" r="5" fill="${i ? TEAL : INK}" data-lcs-dot="${i ? 'b' : 'a'}"/>`; });
  return `<svg width="82" height="${rows.length * ROW}" viewBox="0 0 82 ${rows.length * ROW}" style="display:block;flex:0 0 auto">${s}</svg>`;
}
/** a tens-and-ones mat: two columns with their heads; `rows` = the numbers drawn in it (may be empty).
 *  The mat is as wide as its card and takes the height the card has left: a child draws up to 9 sticks and 19 dots
 *  in it, so every millimetre counts (native reader, 2026-11-14: a mat of a fixed picture size shrank to a stamp when
 *  a line under it wrapped). */
function mat(Wd, rows) {
  const head = (t, tag, first) => `<div style="flex:1 1 0;min-width:0;text-align:center;font:800 13px/21px 'Nunito',sans-serif;color:${TEAL};white-space:nowrap;${first ? '' : `border-left:2px solid ${INK};`}" data-lcs-head="${tag}">${t}</div>`;
  const cell = (inner, tag, first) => `<div style="flex:1 1 0;min-width:0;min-height:0;padding:6px 0 0 6px;box-sizing:border-box;display:flex;align-items:flex-start;${first ? '' : `border-left:2px solid ${INK};`}" data-lcs-cell="${tag}">${inner}</div>`;
  return `<div data-lcs-prim="tens-ones-mat" style="flex:1 1 0;min-height:0;align-self:stretch;display:flex;flex-direction:column;box-sizing:border-box;background:#FFFFFF;border:2.5px solid ${INK};border-radius:8px;overflow:hidden">` +
    `<div style="flex:0 0 auto;display:flex;border-bottom:2px solid ${INK}">${head(Wd.tensHead, 'tens', true)}${head(Wd.onesHead, 'ones')}</div>` +
    `<div style="flex:1 1 0;min-height:0;display:flex">${cell(rows.length ? sticksSvg(rows) : '', 'tens', true)}${cell(rows.length ? dotsSvg(rows) : '', 'ones')}</div></div>`;
}

function makeRegroupType({ id, slug, mode, gradeBand, i18n }) {
  const D = LEVELS[mode];
  if (!D) throw new Error(`${id}: unknown mode ${mode}`);
  return {
    id, slug, gradeBand, assetClass: 'none', exerciseType: mode === 'column-many' ? 'column-arithmetic' : 'base-ten',
    themeAxis: { applicable: false },
    interactive: false,
    difficulty: D,
    i18n,
    levelSetWords(m) { return (m.items || []).map(String); },

    build(args, ctx) {
      const lv = Number(args.difficulty) || 2, d = D[lv] || D[2], rng = ctx.rng, L = loc2(args.locale), Wd = WORDS[L];
      if (!Wd) throw new Error(`${id}: no words for ${L}`);
      const mark = !!(ctx && (ctx.answerKey || ctx.screen));
      const box = (v, w = 54, h = 40) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;vertical-align:middle;width:${w}px;height:${h}px;margin:0 3px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:9px;background:#FFFFFF"></span>`;
      let cards, items;

      if (mode === 'mat-add') {
        const seen = new Set(); items = [];
        const plainAt = new Set(rng.sample([0, 1, 2, 3, 4, 5], d.plain));
        for (let i = 0; i < d.cards; i++) {
          for (let t = 0; t < 400; t++) {
            const a = rng.int(12, 68), b = rng.int(12, 68), oa = a % 10, ob = b % 10, sum = a + b;
            if (!oa || !ob || sum > 99 || sum % 10 === 1) continue;   // (a sum that ends in 1 would read "1 ones": wrong in fi, nl, da, no)
            // a new ten: the ones add up to 10 to 17 (ten exactly is a new ten with no ones left: once a page at most)
            if (plainAt.has(i) ? oa + ob > 9 : oa + ob < 10) continue;
            if (oa + ob === 10 && items.some((q) => (q.a % 10) + (q.b % 10) === 10)) continue;
            if (seen.has(sum) || items.some((q) => q.a === a || q.b === b || q.a === b)) continue;
            // (drawn numbers: at most 6 sticks a row fit the tens column)
            if (Math.floor(a / 10) > 6 || Math.floor(b / 10) > 6) continue;
            seen.add(sum); items.push({ a, b, sum }); break;
          }
        }
        if (items.length < d.cards) throw new Error(`${id}: no ${d.cards} sums`);
        cards = items.map((it) =>
          `<div class="ws-card-stage" style="flex-direction:column;gap:6px;padding:0 2px" data-lcs-matadd="${it.a}|${it.b}|${it.sum}">` +
          `<span style="${EQ}">${it.a} + ${it.b} = ${box(it.sum, 62, 36)}</span>${mat(Wd, d.drawn ? [it.a, it.b] : [])}` +
          `<div style="flex:0 0 auto;display:flex;align-items:center;gap:4px;flex-wrap:nowrap;justify-content:center" data-lcs-line>${box(Math.floor(it.sum / 10), 42, 32)}<span style="${SMALL}">${Wd.tens} ${Wd.and}</span>${box(it.sum % 10, 42, 32)}<span style="${SMALL}">${Wd.ones}</span></div></div>`);
        items = items.map((it) => `${it.a}+${it.b}`);
      } else if (mode === 'mat-sub') {
        const seen = new Set(); items = [];
        const plainAt = new Set(rng.sample([0, 1, 2, 3, 4, 5], d.plain));
        for (let i = 0; i < d.cards; i++) {
          for (let t = 0; t < 400; t++) {
            const a = rng.int(21, 69), b = d.one ? rng.int(2, 9) : rng.int(11, a - 5), oa = a % 10, ob = b % 10, diff = a - b;
            if (!ob || diff < 3) continue;
            if (plainAt.has(i) ? ob > oa || !oa : ob <= oa) continue;   // open a ten: not enough ones
            if (seen.has(diff) || items.some((q) => q.a === a || q.b === b)) continue;
            seen.add(diff); items.push({ a, b, diff, open: ob > oa }); break;
          }
        }
        if (items.length < d.cards) throw new Error(`${id}: no ${d.cards} differences`);
        const choice = (t2) => `<span style="display:inline-flex;align-items:center;gap:4px;${SMALL}"><span style="width:18px;height:18px;box-sizing:border-box;border:2.5px solid ${INK};border-radius:50%;background:#FFFFFF"></span>${t2}</span>`;
        cards = items.map((it) =>
          `<div class="ws-card-stage" style="flex-direction:column;gap:6px;padding:0 2px" data-lcs-matsub="${it.a}|${it.b}|${it.diff}|${it.open ? 1 : 0}">` +
          `<span style="${EQ}">${it.a} ${MINUS} ${it.b} = ${box(it.diff, 62, 36)}</span>${mat(Wd, d.drawn ? [it.a] : [])}` +
          `<div style="flex:0 0 auto;display:flex;align-items:center;gap:10px;flex-wrap:nowrap;justify-content:center" data-lcs-enough data-lcs-line><span style="font:800 15px/1.2 'Nunito',sans-serif;color:${TEAL};white-space:nowrap">${Wd.enough}</span>${choice(Wd.yes)}${choice(Wd.no)}</div></div>`);
        items = items.map((it) => `${it.a}-${it.b}`);
      } else {
        const CELL = d.cols === 3 ? 52 : 46, FS = Math.round(CELL * 0.68), SIGN = 30, CB = Math.round(CELL * 0.58); items = []; const seen = new Set();   // the cells fill the card: three cards in a row carry larger digits than four
        for (let i = 0; i < d.cards; i++) {
          const n = d.n[i];
          for (let t = 0; t < 2000; t++) {
            const nums = Array.from({ length: n }, () => rng.int(10, 39)), ones = nums.map((v) => v % 10), so = ones.reduce((a, b) => a + b, 0), sum = nums.reduce((a, b) => a + b, 0);
            if (sum > 99 || sum < 40 || new Set(nums).size < n) continue;
            const carry = Math.floor(so / 10);
            if (d.carry === 0 ? carry !== 0 : d.carry === 1 ? carry !== 1 : carry < 1) continue;
            if (d.carry === 2 && i % 2 === 0 && carry !== 2 && n === 4 && t < 1500) continue;   // half of the four-number sums carry two tens
            if (d.tenPair && !ones.some((a, x) => a > 0 && ones.some((b, y) => y > x && a + b === 10))) continue;
            if (ones.filter((v) => v === 0).length > 1 || seen.has(sum)) continue;
            seen.add(sum); items.push({ nums, sum, carry }); break;
          }
        }
        if (items.length < d.cards) throw new Error(`${id}: no ${d.cards} column sums`);
        const cell = (t2, wash, extra = '') => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${CELL}px;height:${CELL}px;background:${wash};font:700 ${FS}px/1 'Baloo 2',cursive;color:${INK}"${extra}>${t2}</span>`;
        const WASH = ['#DDEBE8', '#FBE3D8'];   // tens, ones (as the column pages)
        const below = L === 'de';   // the German written method notes the new ten under the numbers, at the line (native reader, 2026-11-14)
        cards = items.map((it) => {
          const rowsHtml = it.nums.map((v, k) => `<div style="display:flex;align-items:center"><span style="width:${SIGN}px;font:700 ${FS}px/1 'Baloo 2',cursive;color:${TEAL};text-align:center">${k === it.nums.length - 1 ? '+' : ''}</span>${cell(Math.floor(v / 10), WASH[0])}${cell(v % 10, WASH[1])}</div>`).join('');
          const ans = (v) => `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${v}"` : ''} style="display:inline-flex;width:${CELL}px;height:${CELL}px;box-sizing:border-box;border:2.5px dashed ${CORAL};border-radius:7px;background:#FFFFFF"></span>`;
          return `<div class="ws-card-stage" style="flex-direction:column;gap:0;padding:6px ${6 + SIGN / 2}px 6px 6px" data-lcs-colmany="${it.nums.join('+')}|${it.sum}|${it.carry}">` +
            (d.carry === 0 || below ? '' : `<div style="display:flex;align-items:flex-end;height:${CB + 6}px"><span style="width:${SIGN}px"></span><span style="display:inline-flex;justify-content:center;width:${CELL}px"><span data-lcs-carrybox style="width:${CB}px;height:${CB}px;box-sizing:border-box;border:2px dashed #B9AE9C;border-radius:6px;background:#FFFFFF"></span></span><span style="width:${CELL}px"></span></div>`) +
            rowsHtml + (d.carry && below ? `<div style="display:flex;align-items:flex-start;height:${CB + 4}px" data-lcs-carry-below><span style="width:${SIGN}px"></span><span style="display:inline-flex;justify-content:center;width:${CELL}px"><span data-lcs-carrybox style="width:${CB}px;height:${CB}px;box-sizing:border-box;border:2px dashed #B9AE9C;border-radius:6px;background:#FFFFFF"></span></span><span style="width:${CELL}px"></span></div>` : '') + `<div style="width:${SIGN + 2 * CELL}px;height:3px;background:${TEAL};margin:5px 0"></div>` +
            `<div style="display:flex;align-items:center"><span style="width:${SIGN}px"></span>${ans(Math.floor(it.sum / 10))}${ans(it.sum % 10)}</div></div>`;
        });
        items = items.map((it) => it.nums.join('+'));
      }
      return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-regroup="${mode}|${lv}">${cardGrid({ cards, cols: d.cols, rows: Math.ceil(cards.length / d.cols) })}</div>`, meta: { items } };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const root = document.querySelector('[data-lcs-regroup]');
        if (!root) return ['no page'];
        const [mode, lv] = root.dataset.lcsRegroup.split('|');
        const rectOf = (e) => e.getBoundingClientRect();
        document.querySelectorAll('.ws-card').forEach((c, i) => { const cb = rectOf(c); c.querySelectorAll('svg, .ws-answerbox').forEach((e) => { const r = rectOf(e); if (r.width && (r.left < cb.left - 1 || r.right > cb.right + 1 || r.top < cb.top - 1 || r.bottom > cb.bottom + 1)) fails.push(`card ${i + 1}: something leaves the card`); }); });
        // sticks and dots stay in their own column of the mat
        document.querySelectorAll('[data-lcs-prim="tens-ones-mat"]').forEach((m, i) => {
          const P = 'mat ' + (i + 1), mb = rectOf(m), tc = rectOf(m.querySelector('[data-lcs-cell="tens"]')), oc = rectOf(m.querySelector('[data-lcs-cell="ones"]'));
          const inside = (r, c) => r.left >= c.left - 0.5 && r.right <= c.right + 0.5 && r.top >= c.top - 0.5 && r.bottom <= c.bottom + 0.5;
          m.querySelectorAll('[data-lcs-stick]').forEach((e) => { if (!inside(rectOf(e), tc)) fails.push(`${P}: a stick leaves the tens column`); });
          m.querySelectorAll('[data-lcs-dot]').forEach((e) => { if (!inside(rectOf(e), oc)) fails.push(`${P}: a dot leaves the ones column`); });
          const heads = [...m.querySelectorAll('[data-lcs-head]')];
          if (heads.length !== 2 || heads.some((h) => h.scrollWidth > h.clientWidth + 1)) fails.push(`${P}: the two heads (each on its column, uncut)`);
          // room to draw: each column at least 120 px wide and 66 px tall (32 by 17 mm), and under a drawn number room for the ten dots of an opened ten
          if (Math.min(tc.width, oc.width) < 120 || tc.height < 66) fails.push(`${P}: a column of ${Math.round(tc.width)} by ${Math.round(tc.height)} px is too small to draw in`);
          const dots = [...m.querySelectorAll('[data-lcs-dot]')], low = dots.length ? Math.max(...dots.map((e) => rectOf(e).bottom)) : oc.top;
          if (mode === 'mat-sub' && oc.bottom - low < 30 && oc.right - Math.max(oc.left, ...dots.map((e) => rectOf(e).right)) < 60) fails.push(`${P}: no room under or beside the drawn ones for ten more dots`);
          const card = m.closest('.ws-card'), line = card && card.querySelector('[data-lcs-line]');
          if (line) { const lr = rectOf(line), kids = [...line.children].map(rectOf); if (kids.some((k) => Math.abs((k.top + k.bottom) / 2 - (lr.top + lr.bottom) / 2) > 8) || lr.height > 40) fails.push(`${P}: the line under the mat wraps`); const cb = rectOf(card); if (kids.some((k) => k.left < cb.left + 2 || k.right > cb.right - 2)) fails.push(`${P}: the line under the mat leaves its card`); }
        });
        if (mode === 'mat-add') {
          const cards = [...document.querySelectorAll('[data-lcs-matadd]')]; let plain = 0; const sums = new Set();
          cards.forEach((c, i) => {
            const P = 'card ' + (i + 1), [a, b, sum] = c.dataset.lcsMatadd.split('|').map(Number);
            if (a + b !== sum || sum > 99) fails.push(`${P}: ${a} + ${b} is not ${sum}`);
            if (sum % 10 === 1) fails.push(`${P}: the sum ends in 1 ("1 ones")`);
            if (sums.has(sum)) fails.push(`${P}: a sum twice`); sums.add(sum);
            if ((a % 10) + (b % 10) < 10) plain++;
            const sticks = c.querySelectorAll('[data-lcs-stick]').length, dots = c.querySelectorAll('[data-lcs-dot]').length;
            if (lv === '1' ? sticks !== Math.floor(a / 10) + Math.floor(b / 10) || dots !== (a % 10) + (b % 10) : sticks + dots !== 0) fails.push(`${P}: ${sticks} sticks and ${dots} dots on the mat`);
            if (c.querySelectorAll('.ws-answerbox').length !== 3) fails.push(`${P}: ${c.querySelectorAll('.ws-answerbox').length} boxes`);
            if (!c.textContent.includes(a + ' + ' + b)) fails.push(`${P}: the sum is not printed`);
          });
          if (cards.length !== 6) fails.push(cards.length + ' cards');
          if (plain !== (lv === '3' ? 2 : 0)) fails.push(`${plain} sums make no new ten`);
        } else if (mode === 'mat-sub') {
          const cards = [...document.querySelectorAll('[data-lcs-matsub]')]; let plain = 0; const diffs = new Set();
          cards.forEach((c, i) => {
            const P = 'card ' + (i + 1), [a, b, diff, open] = c.dataset.lcsMatsub.split('|').map(Number);
            if (a - b !== diff || diff < 1) fails.push(`${P}: ${a} − ${b} is not ${diff}`);
            if (diffs.has(diff)) fails.push(`${P}: an answer twice`); diffs.add(diff);
            if ((b % 10 > a % 10) !== !!open) fails.push(`${P}: the stamp "open a ten" is wrong`);
            if (!open) plain++;
            if (lv === '1' && b > 9) fails.push(`${P}: a two-digit number is taken away on the easier page`);
            if (lv !== '1' && b < 10) fails.push(`${P}: a one-digit number is taken away`);
            const sticks = c.querySelectorAll('[data-lcs-stick]').length, dots = c.querySelectorAll('[data-lcs-dot]').length;
            if (lv === '3' ? sticks + dots !== 0 : sticks !== Math.floor(a / 10) || dots !== a % 10) fails.push(`${P}: ${sticks} sticks and ${dots} dots on the mat`);
            if (!c.querySelector('[data-lcs-enough]')) fails.push(`${P}: no "enough ones?" line`);
            if (c.querySelectorAll('.ws-answerbox').length !== 1) fails.push(`${P}: ${c.querySelectorAll('.ws-answerbox').length} boxes`);
          });
          if (cards.length !== 6) fails.push(cards.length + ' cards');
          if (plain !== (lv === '3' ? 1 : 2)) fails.push(`${plain} tasks need no ten opened`);
        } else {
          const cards = [...document.querySelectorAll('[data-lcs-colmany]')]; const sums = new Set();
          cards.forEach((c, i) => {
            const P = 'card ' + (i + 1), [ns, sum, carry] = c.dataset.lcsColmany.split('|'), nums = ns.split('+').map(Number);
            const total = nums.reduce((a, b) => a + b, 0), ones = nums.map((v) => v % 10), so = ones.reduce((a, b) => a + b, 0);
            if (total !== +sum || total > 99) fails.push(`${P}: the sum is not ${sum}`);
            if (Math.floor(so / 10) !== +carry) fails.push(`${P}: the new tens are not ${carry}`);
            if (sums.has(total)) fails.push(`${P}: a sum twice`); sums.add(total);
            if (nums.some((v) => v < 10 || v > 39)) fails.push(`${P}: a number outside 10 to 39`);
            if (lv === '1' && (nums.length !== 3 || +carry !== 0)) fails.push(`${P}: the easier page has three numbers and no new ten`);
            if (lv === '2' && (+carry !== 1 || !ones.some((a, x) => a > 0 && ones.some((b, y) => y > x && a + b === 10)))) fails.push(`${P}: no two ones make ten`);
            if (lv === '3' && (nums.length !== 4 || +carry < 1)) fails.push(`${P}: the harder page has four numbers and a new ten`);
            if (c.querySelectorAll('.ws-answerbox').length !== 2 || !!c.querySelector('[data-lcs-carrybox]') !== (lv !== '1')) fails.push(`${P}: the answer cells or the box for the new tens (the easier page has none)`);
            const cr = rectOf(c.closest(".ws-card")), used = [...c.children].reduce((h, e) => h + rectOf(e).height, 0);
            if (used < cr.height * 0.5) fails.push(`${P}: the sum uses ${Math.round(used)} of ${Math.round(cr.height)} px of its card`);
            // every digit of the numbers is printed in its cell
            const printed = [...c.querySelectorAll('span')].filter((e) => /^\d$/.test(e.textContent) && !e.children.length).map((e) => e.textContent).join('');
            if (printed !== nums.map(String).join('')) fails.push(`${P}: the printed digits read ${printed}`);
          });
          if (cards.length !== (lv === '1' ? 6 : 8)) fails.push(cards.length + ' cards');
          if (lv === '3' && cards.filter((c) => c.dataset.lcsColmany.split('|')[2] === '2').length < 2) fails.push('fewer than two sums carry two tens');
        }
        return fails;
      });
    },
  };
}

module.exports = { makeRegroupType, WORDS, LEVELS };
