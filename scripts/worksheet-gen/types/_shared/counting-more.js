/**
 * The new Counting maker templates (docs/makers/NEW-TEMPLATES.md §2, T1-T6; built 2026-10-31). One factory, six modes:
 *
 *   'number-word'  K-442  count the pictures, circle the number WORD (levels 1-2) / write it from the word bank (level 3)
 *   'one-more'     K-443  count, draw one more in the empty space (1 more) or cross one out (1 less), write how many now
 *   'count-on'     K-444  a closed box says how many are inside; count on with the loose pictures; write the total
 *   'conserve'     K-445  the same pictures in a line and spread out: write both counts, tick whether they are the same
 *   'draw-set'     K-446  read the number, draw that many in the box (level 2: an empty ten-frame to draw into)
 *   'which-group'  K-447  read the number, circle the one group with exactly that many
 *
 * Where the answer sits is content (feedback_answer_position_is_part_of_the_content): every chip / group answer is placed
 * by a balanced cycle over the page (each position used as evenly as the card count allows), never by a coin per card.
 * Counting never includes 0 (operator ruling 2026-10-16): every range starts at 1.
 */
'use strict';
const { cardGrid } = require('../../templates/layouts/card-grid.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const slot = require('../../lib/slot.js');
const { iconRows, fitIcons, iconScatter, answerBox } = require('../../templates/components.js');
const tenFrame = require('../../primitives/ten-frame.js');
const { numberWord: engineWord } = require('../../lib/number-words.js');
const LABELS = require('../../data/counting-labels.js');

// nl: "één" with accents in a counting context (the G1-210 convention)
const numberWord = (n, loc) => (loc === 'nl' && n === 1 ? 'één' : engineWord(n, loc));
const lab = (loc) => LABELS[loc] || LABELS.en;
const NUM = (v, px = 40) => `<span class="ws-num" style="font-family:'Baloo 2';font-weight:700;font-size:${px}px;line-height:1;color:#3A3530" data-lcs-num="${v}">${v}</span>`;

/** n pictures in a W × H box: the row length that gives the largest pictures (≤ maxPx) */
function bestFit(n, W, H, maxPx, gap = 8) {
  let best = { perRow: n, iconPx: 0 };
  for (let perRow = 1; perRow <= n; perRow++) {
    const rows = Math.ceil(n / perRow);
    const px = Math.min(maxPx, Math.floor((W - (perRow - 1) * gap) / perRow), Math.floor((H - (rows - 1) * gap) / rows));
    if (px > best.iconPx || (px === best.iconPx && perRow > best.perRow)) best = { perRow, iconPx: px };
  }
  return best;
}

/** answer positions over a page: 0..slots-1 as evenly as possible, shuffled */
function balanced(rng, cards, slots) {
  const out = [];
  while (out.length < cards) out.push(...rng.shuffle([...Array(slots).keys()]));
  return rng.shuffle(out.slice(0, cards));
}

/** letters a child must see as different: lower-case, accents folded */
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

/** distinct counts spread over [lo, hi] */
function counts(rng, k, lo, hi) {
  const all = [];
  for (let v = lo; v <= hi; v++) all.push(v);
  const out = [];
  while (out.length < k) out.push(...rng.shuffle(all.slice()));
  return out.slice(0, k);
}

const DIFF = {
  'number-word': { 1: { lo: 1, hi: 5, cards: 4, cols: 2, rows: 2, bank: false }, 2: { lo: 1, hi: 10, cards: 6, cols: 2, rows: 3, bank: false }, 3: { lo: 1, hi: 10, cards: 6, cols: 2, rows: 3, bank: true } },
  'one-more': { 1: { lo: 1, hi: 4, cards: 4, dir: 'more' }, 2: { lo: 1, hi: 9, cards: 4, dir: 'more' }, 3: { lo: 2, hi: 9, cards: 4, dir: 'mixed' } },
  'count-on': { 1: { box: [3, 5], loose: [1, 2], cards: 4, trail: true }, 2: { box: [4, 8], loose: [1, 2], cards: 4, trail: false }, 3: { box: [5, 8], loose: [2, 5], cards: 4, trail: false } },
  conserve: { 1: { lo: 3, hi: 6, cards: 3 }, 2: { lo: 4, hi: 8, cards: 3 }, 3: { lo: 5, hi: 10, cards: 3 } },
  'draw-set': { 1: { lo: 1, hi: 5, cards: 6, frame: false }, 2: { lo: 1, hi: 10, cards: 6, frame: true }, 3: { lo: 3, hi: 10, cards: 6, frame: false } },
  'which-group': { 1: { lo: 1, hi: 5, groups: 2, cards: 4 }, 2: { lo: 2, hi: 8, groups: 3, cards: 4 }, 3: { lo: 3, hi: 10, groups: 3, cards: 5 } },
};

function makeCountingMoreType(cfg) {
  const { id, slug, mode, i18n } = cfg;
  const picturesNeeded = { 'number-word': 6, 'one-more': 5, 'count-on': 4, conserve: 4, 'draw-set': 0, 'which-group': 5 }[mode];
  return {
    id,
    slug,
    gradeBand: 'K',
    assetClass: 'icon-placement',
    exerciseType: 'counting-pictures',
    themeAxis: { applicable: mode !== 'draw-set', minNouns: picturesNeeded || 4 },
    difficulty: DIFF[mode],
    i18n,

    build({ theme, difficulty, locale }, ctx) {
      const d = this.difficulty[difficulty];
      const rng = ctx.rng;
      const loc = (locale || 'en').slice(0, 2);
      const L = lab(loc);
      const n = d.cards;
      const pics = this.themeAxis.applicable ? slot.pictures(ctx, rng.sample(labelSafeNouns(theme), n), labelSafeNouns(theme), theme) : [];
      const img = (noun, px, extra = '') => `<img class="ws-icon" src="${fileUri(theme, noun)}" alt="" style="width:${px}px;height:${px}px${extra}">`;
      const cards = [];
      const truth = [];
      let grid = { cols: 1, rows: n };

      if (mode === 'number-word') {
        // the words on one page: never two that differ by one letter (fr six / dix) — a K reader would guess
        const ns = counts(rng, n, d.lo, d.hi);
        const pos = balanced(rng, n, 3);
        const bankWords = [];
        ns.forEach((v, i) => {
          const word = numberWord(v, loc);
          const fit = bestFit(v, 290, d.rows === 3 ? (d.bank ? 118 : 128) : 250, d.rows === 3 ? 72 : 110, 10);
          const stage = `<div class="ws-card-stage" data-lcs-count="${v}" data-lcs-noun="${pics[i].vocabKey}"${slot.attr(ctx, 'pic', i)}>${iconRows({ theme, noun: pics[i].noun, n: v, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 10, gapY: 8 })}</div>`;
          if (d.bank) {
            bankWords.push(word);
            cards.push(stage + `<div class="ws-choices">${answerBox({ w: 230, h: 46, answer: word })}</div>`);
            truth.push({ count: v, word });
            return;
          }
          const near = [v - 2, v - 1, v + 1, v + 2, v - 3, v + 3].filter((x) => x >= 1 && x <= Math.max(d.hi, 5));
          const wrong = [];
          for (const x of near) {
            const w = numberWord(x, loc);
            if (wrong.length < 2 && [word, ...wrong].every((o) => editDistance(fold(o), fold(w)) >= 2)) wrong.push(w);
          }
          if (wrong.length < 2) throw new Error(`${id}: no two distinct-looking number words near ${v} (${loc})`);
          const words = rng.shuffle(wrong);
          words.splice(pos[i], 0, word);
          // the three words fit the card (~300 px): a long-word language (fi seitsemän / kahdeksan) gets smaller type
          const chars = words.reduce((a, w) => a + [...w].length, 0);
          const font = chars > 22 ? 16 : chars > 16 ? 18 : 22, pad = chars > 22 ? 8 : 12;
          cards.push(stage + `<div class="ws-choices" style="gap:6px;flex-wrap:wrap">` + words.map((w) =>
            `<span class="ws-chip ws-chip--word" style="width:auto;min-width:48px;height:40px;padding:0 ${pad}px;border-radius:999px;font-size:${font}px" data-lcs-choice="${w}"${w === word ? ' data-lcs-correct="1"' : ''}>${w}</span>`).join('') + `</div>`);
          truth.push({ count: v, word, choices: words });
        });
        grid = { cols: d.cols, rows: d.rows };
        const body = cardGrid({ cards, cols: grid.cols, rows: grid.rows });
        if (!d.bank) return { bodyHtml: body, meta: { cards: truth } };
        // level 3: the word bank — the page's answers + two that answer no card (review 2026-10-31: with exactly six words for
        // six cards the last one is solved by elimination); the extra words keep the no-one-letter-apart rule
        const used = new Set(ns);
        const extra = rng.shuffle([...Array(d.hi).keys()].map((k) => k + 1).filter((x) => !used.has(x)))
          .map((x) => numberWord(x, loc)).filter((w) => bankWords.every((o) => editDistance(fold(o), fold(w)) >= 2));
        for (const w of extra.slice(0, 2)) bankWords.push(w);
        const bank = `<div class="ws-word-bank" data-lcs-bank style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 14px;padding:8px 10px;margin:0 0 10px;border:2px solid #F0E4CB;border-radius:12px;background:#FFFFFF">` +
          rng.shuffle(bankWords.slice()).map((w) => `<span style="font-family:'Nunito';font-weight:800;font-size:22px;color:#3A3530" data-lcs-bankword="${w}">${w}</span>`).join('') + `</div>`;
        return { bodyHtml: `<div style="display:flex;flex-direction:column;height:100%;min-height:0">${bank}<div style="flex:1 1 auto;min-height:0;display:flex">${body}</div></div>`, meta: { cards: truth } };
      }

      if (mode === 'one-more') {
        const ns = counts(rng, n, d.lo, d.hi);
        const dirs = d.dir === 'mixed' ? balanced(rng, n, 2).map((k) => (k ? 'less' : 'more')) : ns.map(() => 'more');
        ns.forEach((v0, i) => {
          // one less needs at least 2 (counting never reaches 0)
          const v = dirs[i] === 'less' ? Math.max(2, v0) : v0;
          const after = dirs[i] === 'more' ? v + 1 : v - 1;
          const slots = dirs[i] === 'more' ? v + 1 : v;
          // reading order, at most five a row (the ten-frame row), the empty box right after the last picture: it is the next one
          const perRow = Math.min(5, slots), rowsN = Math.ceil(slots / perRow);
          const px = Math.min(84, Math.floor((340 - (perRow - 1) * 8) / perRow), Math.floor((132 - (rowsN - 1) * 8) / rowsN));
          const icons = Array.from({ length: v }, () => img(pics[i].noun, px)).join('');
          const empty = dirs[i] === 'more' ? `<span class="ws-draw-slot" data-lcs-draw="1" style="display:inline-block;width:${px}px;height:${px}px;border:2.5px dashed #F2784B;border-radius:10px;background:#FFFFFF"></span>` : '';
          const badge = `<span style="flex:0 0 auto;padding:4px 12px;border-radius:999px;background:${dirs[i] === 'more' ? '#146B5E' : '#F2784B'};color:#FFFFFF;font-family:'Baloo 2';font-weight:700;font-size:18px;white-space:nowrap" data-lcs-dir="${dirs[i]}">${dirs[i] === 'more' ? L.oneMore : L.oneLess}</span>`;
          cards.push(`<div class="ws-card-stage" style="justify-content:space-between;gap:12px;padding:4px 8px 4px 34px" data-lcs-count="${v}" data-lcs-after="${after}"${slot.attr(ctx, 'pic', i)}>` +
            badge +
            `<span style="flex:1 1 auto;display:flex;justify-content:center"><span style="display:grid;grid-template-columns:repeat(${perRow}, ${px}px);gap:8px;align-items:center">${icons}${empty}</span></span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#146B5E">→</span>` + answerBox({ w: 68, h: 58, answer: after }) + `</div>`);
          truth.push({ count: v, dir: dirs[i], after });
        });
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: n }), meta: { cards: truth } };
      }

      if (mode === 'count-on') {
        for (let i = 0; i < n; i++) {
          const box = rng.int(d.box[0], d.box[1]);
          const loose = rng.int(d.loose[0], Math.min(d.loose[1], 10 - box));   // the total stays within 10
          const px = loose > 3 ? 60 : 76;
          // a closed, taped cardboard box (two shut flaps, a strip of tape): the things are hidden inside; only the number shows
          const example = d.trail && i === 0;
          const crate = `<span class="ws-closed-box" data-lcs-box="${box}" style="flex:0 0 auto;position:relative;display:inline-flex;align-items:center;justify-content:center;width:112px;height:92px;margin-top:14px;border:3px solid #146B5E;border-radius:4px 4px 10px 10px;background:#F6E7C8">` +
            `<span style="position:absolute;left:-3px;top:-17px;width:56px;height:14px;border:3px solid #146B5E;border-radius:4px 0 0 0;background:#F6E7C8;transform:skewX(-14deg)"></span>` +
            `<span style="position:absolute;right:-3px;top:-17px;width:56px;height:14px;border:3px solid #146B5E;border-radius:0 4px 0 0;background:#F6E7C8;transform:skewX(14deg)"></span>` +
            `<span style="position:absolute;left:46px;top:-3px;width:14px;height:11px;background:#F2784B;opacity:.55"></span>` +
            `${NUM(box, 46)}</span>`;   // only the number: a picture on the box would be counted as one more
          // the worked example (level 1, card 1) shows its answers written in, in teal
          const fill = (v) => (example ? `<span style="color:#146B5E">${v}</span>` : '');
          const ansBox = (o) => `<span class="ws-answerbox" style="width:${o.w}px;height:${o.h}px${o.small ? ';font-size:20px' : ''}" data-lcs-answer="${o.answer}"${example ? ' data-lcs-example="1"' : ''}>${fill(o.answer)}</span>`;
          const looseHtml = Array.from({ length: loose }, (_, k) => `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:4px">${img(pics[i].noun, px)}${d.trail ? ansBox({ w: 40, h: 34, answer: box + k + 1, small: true }) : ''}</span>`).join('');
          cards.push(`<div class="ws-card-stage" style="justify-content:space-between;gap:14px;padding:4px 10px 4px 36px" data-lcs-count="${box + loose}" data-lcs-loose="${loose}"${slot.attr(ctx, 'pic', i)}>` +
            crate + `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#146B5E">+</span>` +
            `<span style="flex:1 1 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:10px">${looseHtml}</span>` +
            `<span style="font-family:'Baloo 2';font-weight:700;font-size:30px;color:#146B5E">=</span>` + ansBox({ w: 64, h: 54, answer: box + loose }) + `</div>`);
          if (example) cards[cards.length - 1] = `<span style="position:absolute;top:6px;right:10px;padding:2px 10px;border-radius:999px;background:#146B5E;color:#FFFFFF;font-family:'Nunito';font-weight:800;font-size:14px" data-lcs-example-label>${L.example}</span>` + cards[cards.length - 1];
          truth.push({ box, loose, total: box + loose, example });
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: n }), meta: { cards: truth } };
      }

      if (mode === 'conserve') {
        // as many "same" as "not the same" cards (± 1 per page), and a "not the same" pair is not always won by the spread-out group
        const same = balanced(rng, n, 2).map((k) => k === 0);
        const yn = L.yes ? [L.yes, L.no] : ['✓', '✗'];
        for (let i = 0; i < n; i++) {
          const a = rng.int(d.lo, d.hi);
          const b = same[i] ? a : (rng.next() < 0.5 && a > d.lo ? a - 1 : (a < d.hi ? a + 1 : a - 1));
          // the room beside the write-in box is ~380 px: both groups get ONE picture size (a smaller picture must not make a
          // group look like fewer), the line fits it in one row, the spread area stays clear of the box
          const ROOM = 360;
          const px = Math.min(44, Math.floor((ROOM - (Math.max(a, b) - 1) * 6) / Math.max(a, b)));
          const row = (kind, k, inner) => `<span class="ws-subgroup" data-lcs-group="${kind}" data-lcs-n="${k}" style="flex:1 1 0;height:auto;min-height:0;justify-content:space-between;gap:10px;padding:6px 10px">` +
            `<span style="flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:0">${inner}</span>` + answerBox({ w: 58, h: 48, answer: k }) + `</span>`;
          const line = row('line', a, `<span style="display:flex;gap:6px">${Array.from({ length: a }, () => img(pics[i].noun, px)).join('')}</span>`);
          const spread = row('spread', b, iconScatter({ theme, noun: pics[i].noun, n: b, w: ROOM, h: 92, iconPx: px, rng }));
          const chip = (val, ok, txt) => `<span class="ws-chip" style="${L.yes ? 'width:auto;min-width:52px;padding:0 10px;font-size:20px' : 'width:52px;font-size:26px'};height:52px" data-lcs-choice="${val}"${ok ? ' data-lcs-correct="1"' : ''}>${txt}</span>`;
          cards.push(`<div class="ws-card-stage" style="gap:12px;padding:4px 4px 4px 34px;align-items:stretch" data-lcs-same="${a === b ? 1 : 0}"${slot.attr(ctx, 'pic', i)}>` +
            `<span style="flex:1 1 auto;display:flex;flex-direction:column;gap:8px;min-width:0">${line}${spread}</span>` +
            `<span style="flex:0 0 118px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px">` +
            `<span style="font-family:'Nunito';font-weight:800;font-size:18px;line-height:1.2;text-align:center;color:#3A3530">${L.same}</span>` +
            `<span style="display:flex;gap:10px">${chip('yes', a === b, yn[0])}${chip('no', a !== b, yn[1])}</span></span></div>`);
          truth.push({ line: a, spread: b, same: a === b });
        }
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: n }), meta: { cards: truth } };
      }

      if (mode === 'draw-set') {
        const ns = counts(rng, n, d.lo, d.hi);
        ns.forEach((v) => {
          const guide = d.frame ? `<span style="opacity:.55">${tenFrame({ a: 0, cell: 48 }).svg}</span>` : '';
          cards.push(`<div class="ws-card-stage" style="flex-direction:column;gap:8px" data-lcs-draw-n="${v}">${NUM(v, 44)}` +
            `<span class="ws-draw-box" data-ws-content style="flex:1 1 auto;width:100%;min-height:90px;display:flex;align-items:center;justify-content:center;border:2.5px dashed #C8BFAE;border-radius:12px;background:#FFFFFF">${guide}</span></div>`);
          truth.push({ count: v });
        });
        return { bodyHtml: cardGrid({ cards, cols: 2, rows: 3 }), meta: { cards: truth } };
      }

      if (mode === 'which-group') {
        const ns = counts(rng, n, d.lo, d.hi);
        const pos = balanced(rng, n, d.groups);
        const sides = balanced(rng, n, d.groups === 2 ? 2 : 3).map((k) => (d.groups === 2 ? ['below', 'above'][k] : ['below', 'above', 'around'][k]));
        ns.forEach((v, i) => {
          const want = { below: [v - 2, v - 1], above: [v + 1, v + 2], around: [v - 1, v + 1] }[sides[i]];
          const ok = (x) => x >= 1 && x <= d.hi + 2 && x !== v;
          const wrong = [];
          for (const x of [...want, v - 1, v + 1, v - 2, v + 2, v + 3]) if (ok(x) && !wrong.includes(x) && wrong.length < d.groups - 1) wrong.push(x);
          const sizes = rng.shuffle(wrong);
          sizes.splice(pos[i], 0, v);
          const boxW = Math.floor(520 / d.groups) - 12;
          const boxH = n === 5 ? 96 : 120;
          const px = Math.min(...sizes.map((s) => bestFit(s, boxW - 16, boxH, 60, 6).iconPx));
          const groups = sizes.map((s) => {
            const fit = { iconPx: px, perRow: Math.max(1, Math.min(s, Math.floor((boxW - 16 + 6) / (px + 6)))) };
            return `<span class="ws-subgroup" data-lcs-group-n="${s}"${s === v ? ' data-lcs-correct="1"' : ''} style="flex:0 0 ${boxW}px;padding:6px">${iconRows({ theme, noun: pics[i].noun, n: s, iconPx: fit.iconPx, perRow: fit.perRow, rng, gapX: 6, gapY: 6 })}</span>`;
          }).join('');
          cards.push(`<div class="ws-card-stage" style="gap:12px;padding:4px 6px 4px 34px;align-items:stretch" data-lcs-target="${v}"${slot.attr(ctx, 'pic', i)}>` +
            `<span style="flex:0 0 64px;display:flex;align-items:center;justify-content:center">${NUM(v, 50)}</span>${groups}</div>`);
          truth.push({ target: v, groups: sizes });
        });
        return { bodyHtml: cardGrid({ cards, cols: 1, rows: n }), meta: { cards: truth } };
      }
      throw new Error(`${id}: unknown mode ${mode}`);
    },

    /** QA on the rendered page: every count is what the page says; one right answer; answers placed evenly. */
    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const cards = [...document.querySelectorAll('[data-lcs-card]')];
        const positions = [], ranks = [];
        cards.forEach((card, i) => {
          const c = `card ${i + 1}`;
          const pics = (sel) => card.querySelectorAll(sel + ' .ws-icon').length;
          if (mode === 'number-word') {
            const st = card.querySelector('[data-lcs-count]');
            const v = +st.dataset.lcsCount;
            if (pics('[data-lcs-count]') !== v) fails.push(`${c}: ${pics('[data-lcs-count]')} pictures != ${v}`);
            const chips = [...card.querySelectorAll('[data-lcs-choice]')];
            if (chips.length) {
              const ok = chips.filter((x) => x.dataset.lcsCorrect);
              if (ok.length !== 1) fails.push(`${c}: ${ok.length} right words`);
              positions.push(chips.indexOf(ok[0]));
              if (new Set(chips.map((x) => x.textContent)).size !== chips.length) fails.push(`${c}: two chips say the same word`);
            } else if (!card.querySelector('[data-lcs-answer]')) fails.push(`${c}: no answer`);
          } else if (mode === 'one-more') {
            const st = card.querySelector('[data-lcs-count]');
            const v = +st.dataset.lcsCount, after = +st.dataset.lcsAfter;
            if (pics('[data-lcs-count]') !== v) fails.push(`${c}: ${pics('[data-lcs-count]')} pictures != ${v}`);
            const dir = card.querySelector('[data-lcs-dir]').dataset.lcsDir;
            if (after !== v + (dir === 'more' ? 1 : -1) || after < 1) fails.push(`${c}: ${dir} ${v} -> ${after}`);
            if ((dir === 'more') !== !!card.querySelector('[data-lcs-draw]')) fails.push(`${c}: the empty space does not match "${dir}"`);
            if (+card.querySelector('[data-lcs-answer]').dataset.lcsAnswer !== after) fails.push(`${c}: answer != ${after}`);
          } else if (mode === 'count-on') {
            const st = card.querySelector('[data-lcs-count]');
            const box = +card.querySelector('[data-lcs-box]').dataset.lcsBox, loose = +st.dataset.lcsLoose;
            const shown = st.querySelectorAll('.ws-icon').length;
            if (shown !== loose) fails.push(`${c}: ${shown} loose pictures != ${loose}`);
            const answers = [...card.querySelectorAll('[data-lcs-answer]')].map((a) => +a.dataset.lcsAnswer);
            if (answers[answers.length - 1] !== box + loose) fails.push(`${c}: total != ${box}+${loose}`);
          } else if (mode === 'conserve') {
            const g = [...card.querySelectorAll('[data-lcs-group]')];
            g.forEach((x) => { if (x.querySelectorAll('.ws-icon').length !== +x.dataset.lcsN) fails.push(`${c}: group ${x.dataset.lcsGroup} shows ${x.querySelectorAll('.ws-icon').length} != ${x.dataset.lcsN}`); });
            const same = g[0].dataset.lcsN === g[1].dataset.lcsN;
            const ok = card.querySelector('[data-lcs-correct]');
            if (!ok || (ok.dataset.lcsChoice === 'yes') !== same) fails.push(`${c}: the right chip does not match`);
            positions.push(same ? 0 : 1);
          } else if (mode === 'draw-set') {
            if (!card.querySelector('[data-lcs-draw-n]') || !card.querySelector('.ws-draw-box')) fails.push(`${c}: no number or no box`);
          } else if (mode === 'which-group') {
            const v = +card.querySelector('[data-lcs-target]').dataset.lcsTarget;
            const groups = [...card.querySelectorAll('[data-lcs-group-n]')];
            groups.forEach((x) => { if (x.querySelectorAll('.ws-icon').length !== +x.dataset.lcsGroupN) fails.push(`${c}: a group shows ${x.querySelectorAll('.ws-icon').length} != ${x.dataset.lcsGroupN}`); });
            const right = groups.filter((x) => +x.dataset.lcsGroupN === v);
            if (right.length !== 1 || !right[0].dataset.lcsCorrect) fails.push(`${c}: ${right.length} groups of ${v}`);
            positions.push(groups.indexOf(right[0]));
            ranks.push(groups.map((x) => +x.dataset.lcsGroupN).sort((a, b) => a - b).indexOf(v));
          }
        });
        // the answer is not always in the same place (a page of 4-6 cards: no position more than half the cards + 1)
        if (positions.length >= 3 && new Set(positions).size < 2) fails.push(`the answer always sits in the same place (${positions.join(',')})`);
        // which-group: the right group is not always the same SIZE rank (smallest / middle / largest) — else it is found by comparing
        if (ranks.length >= 3 && new Set(ranks).size < 2) fails.push(`the right group is always the same size rank (${ranks.join(',')})`);
        return fails;
      }, mode);
    },
  };
}

module.exports = { makeCountingMoreType, numberWord, editDistance, fold, balanced };
