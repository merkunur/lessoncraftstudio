/**
 * More Number Tracing templates (the Number Tracing maker, 2026-11-02):
 *   count  K-467 Trace and Count — every row a number and that many pictures beside it (symbol ↔ quantity, K.CC.B.4).
 *          Level 1 the numbers 1-5 in order, level 2 6-10 in order (a model, then two traces); level 3 five numbers of
 *          1-10 in mixed order with NO numeral printed: the child counts the pictures and writes the number on the lines
 *          (the key prints it). Pictures in rows of five (a quantity reads at a glance). The digit forms are the
 *          locale's (data/tracing/digit-strokes.js FORM_BY_LOCALE), as on every number-tracing page.
 *   words  K-468 Trace the Number Words — every row the numeral and its dots, then the number word in the locale's
 *          school hand: once solid, once dashed, then empty lines (K.CC.A.3 reading / writing numbers). Level 1 four of
 *          1-5, level 2 four of 6-10, level 3 four of 11-20 (numeral only: 11-20 dots would not read). Words:
 *          lib/number-words.js (native-verified ×11, every word 1-20 traceable).
 *   grid   K-517 Trace Numbers to 50 and 100 — the writing side of the hundreds chart: tens rows of ten numbers, each in
 *          its own boxed cell on school lines, in the locale's school form. Level 1 1-30, every tens row dashed and then an
 *          empty row to write it again · 2 1-50, every number dashed · 3 51-100 (the second page of "to 100"): every other
 *          number dashed, the ones between left empty to write (1.NBT.A.1, writing numerals to 120).
 *   poster K-518 Number Formation Poster — the wall chart: big solid numerals in the school form with their start dots,
 *          arrows and stroke-order badges (trace-path digitFadeLane mode 'poster'). Level 1 the digits 0-9 (0 is a digit
 *          here: no quantity is drawn beside it) · 2 1-10, each with its dots (rows of five) · 3 11-20.
 */
'use strict';
const { digitFadeLane, strokeWordLane, samplePath, renderPath } = require('../../primitives/trace-path.js');
const { FORMS, FORM_BY_LOCALE, BOX } = require('../../data/tracing/digit-strokes.js');
const { numberWord } = require('../../lib/number-words.js');
const { labelSafeNouns, fileUri } = require('../../image-cache/resolve.js');
const tokens = require('../../primitives/_tokens.js');
const slot = require('../../lib/slot.js');
const { refusedPicture } = require('../../lib/picture-refusals.js');

// a counted picture is ONE thing: no picture of several things (lib/picture-refusals.js: a bunch, a pair) and none that
// shows dots or numbers of its own (a domino in a row of 9 is counted as its dots — read on the level-3 key, 2026-11-02)
const NOT_COUNTED = new Set(['dice', 'domino', 'cards', 'crayons', 'blocks', 'lego', 'chess']);
// one drawing per word: a theme with two tiger drawings ("tiger", "tiger 2") would put tigers on two rows (review 2026-11-02)
const countable = (theme) => {
  const seen = new Set();
  return labelSafeNouns(theme).filter((n) => {
    const word = n.vocabKey || n.noun;
    if (refusedPicture(theme, n.noun) || NOT_COUNTED.has(word) || seen.has(word)) return false;
    seen.add(word);
    return true;
  });
};
// Dutch writes the number one "één", the article "een": a number-word page says the number (review 2026-11-02)
const wordOf = (n, L) => (L === 'nl' && n === 1 ? 'één' : numberWord(n, L));

const formFor = (locale) => FORMS[FORM_BY_LOCALE[(locale || 'en').slice(0, 2)] || 'continental'];
const glyphsOf = (form, n) => (n < 10 ? [form[n]] : [form[Math.floor(n / 10)], form[n % 10]]);
const loc2 = (l) => (l || 'en').slice(0, 2);
// any number's glyphs, digit by digit (100 has three)
const digitsOf = (form, n) => String(n).split('').map((c) => form[+c]);
const GRID = {
  1: { from: 1, to: 30, plan: () => [Array(10).fill('dash'), Array(10).fill('empty')], laneH: 88, glyphH: 48 },
  2: { from: 1, to: 50, plan: () => [Array(10).fill('dash')], laneH: 104, glyphH: 48 },
  3: { from: 51, to: 100, plan: () => [Array.from({ length: 10 }, (_, k) => (k % 2 ? 'empty' : 'dash'))], laneH: 104, glyphH: 48 },
};
const POSTER = {
  1: { nums: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], cols: 5, glyphH: 186, dots: false },
  2: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], cols: 5, glyphH: 150, dots: true },
  3: { nums: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], cols: 5, glyphH: 96, dots: false },
};

const COUNT = {
  1: { nums: [1, 2, 3, 4, 5], order: 'asc', modes: ['model', 'trace', 'trace'] },
  2: { nums: [6, 7, 8, 9, 10], order: 'asc', modes: ['model', 'trace', 'trace'] },
  3: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], pick: 5, order: 'mixed', modes: ['empty', 'empty'] },
};
const WORDS = {
  1: { from: 1, to: 5, rows: 4, glyphH: 46, laneH: 58, dots: true },
  2: { from: 6, to: 10, rows: 4, glyphH: 46, laneH: 58, dots: true },
  3: { from: 11, to: 20, rows: 4, glyphH: 40, laneH: 52, dots: false },
};

/**
 * Level 3 has nothing to trace: a strip of 1-10 in the locale's school form (solid, as the models on levels 1-2) is the
 * place the child looks up how a number is written (review 2026-11-02). Every number sits in its own tenth, centred by ink.
 */
function numeralStrip(form) {
  const W = 620, H = 44, glyphH = 34, scale = glyphH / BOX.h, cell = W / 10, gap = 4;
  const yTop = (H - glyphH) / 2;
  const groups = [];
  for (let n = 1; n <= 10; n++) {
    const glyphs = glyphsOf(form, n);
    const ink = glyphs.map((strokes) => {
      const xs = strokes.flatMap((s) => samplePath(s.d, (x) => ({ x }))).map((q) => q.x);
      return [Math.min(...xs), Math.max(...xs)];
    });
    const total = ink.reduce((t, [a, b]) => t + (b - a) * scale, 0) + gap * (glyphs.length - 1);
    let x = (n - 0.5) * cell - total / 2;
    for (let g = 0; g < glyphs.length; g++) {
      const gx = x - ink[g][0] * scale;
      const paths = glyphs[g].map((s) => renderPath({ d: s.d, mode: 'model', strokeW: 2.6 / scale, dot: false, arrow: false, dashScale: 1 / scale })).join('');
      groups.push(`<g transform="translate(${gx.toFixed(1)} ${yTop.toFixed(1)}) scale(${scale.toFixed(4)})" data-lcs-strip-number="${n}">${paths}</g>`);
      x += (ink[g][1] - ink[g][0]) * scale + gap;
    }
  }
  return `<div style="flex:0 0 auto;display:flex;justify-content:center;margin:0 0 8px" data-lcs-numeral-strip>` +
    `<div style="border:1.5px solid ${tokens.color.grid};border-radius:12px;padding:3px 10px;background:${tokens.color.white}">` +
    `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="1-10">${groups.join('')}</svg></div></div>`;
}

/** n dots in rows of five (the quantity at a glance) */
function dotsSvg(n, r) {
  const g = r * 2 + 5, cols = Math.min(5, n), rows = Math.ceil(n / 5);
  let s = '';
  for (let k = 0; k < n; k++) s += `<circle cx="${r + 2 + (k % 5) * g}" cy="${r + 2 + Math.floor(k / 5) * (g + 2)}" r="${r}" fill="${tokens.color.coral}" data-lcs-dot="1"/>`;
  return `<svg width="${cols * g}" height="${rows * (g + 2)}" viewBox="0 0 ${cols * g} ${rows * (g + 2)}" data-lcs-dots="${n}">${s}</svg>`;
}

function makeNumberTracingMoreType({ id, slug, mode, i18n }) {
  const count = mode === 'count';
  return {
    id, slug, gradeBand: 'K', assetClass: 'icon-placement', exerciseType: 'number-tracing',
    themeAxis: count ? { applicable: true, minNouns: 5, excludeBw: true } : { applicable: false },
    difficulty: count ? COUNT : mode === 'grid' ? GRID : mode === 'poster' ? POSTER : WORDS,
    i18n,
    levelSetWords(m) { return (m.numbers || []).map(String); },

    build({ difficulty, locale, theme }, ctx) {
      const lv = Number(difficulty) || 2, rng = ctx.rng, key = !!(ctx && ctx.answerKey);
      const form = formFor(locale);
      if (count) {
        const d = COUNT[lv];
        const nums = d.order === 'asc' ? d.nums.slice() : rng.sample(d.nums, d.pick);
        // one picture per row, all different (a row is a slot of its own)
        const pool = countable(theme);
        if (pool.length < nums.length) throw new Error(`${id}: theme ${theme} has ${pool.length} pictures < ${nums.length}`);
        const nouns = slot.pictures(ctx, rng.sample(pool, nums.length), pool, theme, 'pic');
        const modes = key && lv === 3 ? ['model', 'empty'] : d.modes;
        const rows = nums.map((n, i) => {
          const lane = digitFadeLane({ glyphs: glyphsOf(form, n), box: BOX, w: lv === 3 ? 220 : 330, h: 96, glyphH: 70, modes, number: n, label: `trace number ${n}` });
          const pics = Array.from({ length: n }, () => `<img class="ws-icon" src="${fileUri(theme, nouns[i].noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:38px;height:38px">`).join('');
          return `<div class="ws-card-stage ws-trace-lane" style="justify-content:space-between;gap:12px;padding:4px 14px 4px 34px" data-lcs-count-row="${n}">` +
            `<div style="display:grid;grid-template-columns:repeat(5,40px);gap:4px 6px;align-content:center" data-lcs-pics="${n}">${pics}</div>` +
            `<div style="flex:0 0 auto" data-lcs-lane${key && lv === 3 ? ' data-lcs-key-sample="1"' : ''}>${lane.svg}</div></div>`;   // level 3's key prints the number
        });
        const { cardGrid } = require('../../templates/layouts/card-grid.js');
        return { bodyHtml: `<div data-ws-content style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0" data-lcs-trace-count="${lv}">${lv === 3 ? numeralStrip(form) : ''}${cardGrid({ cards: rows, cols: 1, rows: rows.length })}</div>`,
          meta: { numbers: nums, nouns: nouns.map((x) => x.noun) } };
      }
      if (mode === 'grid') {
        // tens rows; every number its own 66-px cell (two digits fit at the level's size in every school form, 100 is
        // drawn a little smaller); the plan says how each row is written
        const d = GRID[lv], cellW = 66, rowsHtml = [];
        for (let r = 0, start = d.from; start <= d.to; r++, start += 10) {
          d.plan(r).forEach((modes) => {
            const cells = modes.map((m, k) => {
              const n = start + k;
              // an empty cell keeps the row's school lines (it is measured as a two-digit number: nothing of it is drawn)
              const lane = digitFadeLane({ glyphs: digitsOf(form, m === 'empty' ? 88 : n), box: BOX, w: cellW, h: d.laneH, glyphH: n >= 100 && m !== 'empty' ? 36 : d.glyphH, modes: [m], number: n, label: `number ${n}` });
              return `<div style="flex:0 0 auto;${k ? `border-left:1.5px solid ${tokens.color.grid};` : ''}" data-lcs-grid-number="${n}" data-lcs-grid-mode="${m}">${lane.svg}</div>`;
            }).join('');
            rowsHtml.push(`<div style="display:flex;justify-content:center;align-self:center;border:2px solid ${tokens.color.grid};border-radius:10px;overflow:hidden;background:#FFFFFF" data-lcs-grid-row="${start}">${cells}</div>`);
          });
        }
        return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly" data-lcs-number-grid="${d.from}-${d.to}">${rowsHtml.join('')}</div>`,
          meta: { numbers: [d.from, d.to] } };
      }
      if (mode === 'poster') {
        // the wall chart: one cell a number, the numeral solid with its guides (and its dots on level 2)
        const d = POSTER[lv], cellW = Math.floor(660 / d.cols), rows = Math.ceil(d.nums.length / d.cols);
        const extra = (ctx && ctx.chromeExtra) || 0, cellH = Math.floor((700 - extra - (rows - 1) * 12) / rows);
        const laneH = Math.min(cellH - (d.dots ? 64 : 16), Math.round(d.glyphH / 0.86) + 20);
        const cells = d.nums.map((n) => {
          const glyphs = digitsOf(form, n);
          let g = d.glyphH, lane = null;
          for (; g >= 60 && !lane; g -= 6) { try { lane = digitFadeLane({ glyphs, box: BOX, w: cellW - 12, h: laneH, glyphH: Math.min(g, laneH * 0.78), modes: ['poster'], badges: true, number: n, label: `how to write ${n}` }); } catch (e) { lane = null; } }
          if (!lane) throw new Error(`${id}: ${n} does not fit a poster cell`);
          return `<div class="ws-card" style="width:${cellW - 8}px;height:${cellH}px;flex:0 0 auto;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:4px;background:#FFFFFF" data-lcs-poster-number="${n}">` +
            lane.svg + (d.dots && n > 0 ? dotsSvg(n, 8) : '') + `</div>`;
        });
        return { bodyHtml: `<div data-ws-content style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},${cellW - 8}px);gap:12px 8px;justify-content:center;align-content:space-evenly" data-lcs-poster="${d.nums[0]}-${d.nums[d.nums.length - 1]}">${cells.join('')}</div>`,
          meta: { numbers: d.nums } };
      }
      const d = WORDS[lv], L = loc2(locale);
      const range = []; for (let n = d.from; n <= d.to; n++) range.push(n);
      const nums = rng.sample(range, d.rows).sort((a, b) => a - b);
      const cardW = 150, laneW = 660 - cardW - 14, rowH = 178;
      const rows = nums.map((n) => {
        const word = wordOf(n, L);
        const lane = strokeWordLane({ text: word, w: laneW, h: d.laneH, glyphH: d.glyphH, reps: 2, stack: true, emptyLast: true, padLeft: 10 });
        const card = `<div class="ws-card" style="width:${cardW}px;height:${rowH}px;flex:0 0 auto;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:8px">` +
          `<span style="font-family:'Baloo 2';font-weight:700;font-size:64px;line-height:1;color:${tokens.color.teal}" data-lcs-numeral="${n}">${n}</span>` +
          (d.dots ? dotsSvg(n, 9) : '') + `</div>`;
        return `<div class="ws-trace-lane" style="display:flex;align-items:center;gap:14px;height:${rowH}px" data-lcs-word="${word}" data-lcs-number="${n}">` +
          card + `<div style="display:flex;flex-direction:column;gap:2px" data-lcs-lanes>${lane.svg}</div></div>`;
      });
      return { bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:8px">${rows.join('')}</div>`,
        meta: { numbers: nums, words: nums.map((n) => wordOf(n, L)) } };
    },

    async verify(page) {
      return page.evaluate((mode) => {
        const fails = [];
        const isCount = mode === 'count';
        if (mode === 'grid') {
          const g = document.querySelector('[data-lcs-number-grid]');
          const [from, to] = g.dataset.lcsNumberGrid.split('-').map(Number);
          const cells = [...document.querySelectorAll('[data-lcs-grid-number]')];
          const want = new Set(); for (let n = from; n <= to; n++) want.add(n);
          const got = new Set(cells.map((c) => +c.dataset.lcsGridNumber));
          want.forEach((n) => { if (!got.has(n)) fails.push(`${n} is missing`); });
          if (got.has(0)) fails.push('a 0 on the page');
          cells.forEach((c) => { const lane = c.querySelector('[data-lcs-prim="trace-number"]'); if (!lane || lane.dataset.lcsNumber !== c.dataset.lcsGridNumber) fails.push(`cell ${c.dataset.lcsGridNumber}: the lane is another number`); });
          // tens rows: every row starts at a multiple of ten plus one and holds ten numbers in order
          document.querySelectorAll('[data-lcs-grid-row]').forEach((r) => { const ns = [...r.querySelectorAll('[data-lcs-grid-number]')].map((c) => +c.dataset.lcsGridNumber); if (ns.length !== 10 || ns.some((n, i) => n !== ns[0] + i) || ns[0] % 10 !== 1) fails.push('row ' + ns[0] + ' is not a tens row'); });
          const pg = document.querySelector('[data-lcs-page]').getBoundingClientRect();
          cells.forEach((c) => { const r = c.getBoundingClientRect(); if (r.right > pg.right + 1 || r.left < pg.left - 1) fails.push(`cell ${c.dataset.lcsGridNumber} leaves the page`); });
          return fails;
        }
        if (mode === 'poster') {
          const cells = [...document.querySelectorAll('[data-lcs-poster-number]')];
          if (cells.length !== 10) fails.push(`${cells.length} numbers on the poster`);
          cells.forEach((c) => {
            const n = +c.dataset.lcsPosterNumber, lane = c.querySelector('[data-lcs-prim="trace-number"]');
            if (!lane || +lane.dataset.lcsNumber !== n) fails.push(`${n}: the lane is another number`);
            if (!lane || !lane.querySelector('circle')) fails.push(`${n}: no start dot`);
            const dots = c.querySelector('[data-lcs-dots]');
            if (dots && dots.querySelectorAll('[data-lcs-dot]').length !== n) fails.push(`${n}: ${dots.querySelectorAll('[data-lcs-dot]').length} dots`);
            if (n === 0 && dots) fails.push('dots beside 0');
          });
          return fails;
        }
        if (isCount) {
          const rows = [...document.querySelectorAll('[data-lcs-count-row]')];
          if (rows.length < 5) fails.push(`${rows.length} rows`);
          const seen = new Set();
          rows.forEach((r, i) => {
            const n = +r.dataset.lcsCountRow;
            if (!(n >= 1 && n <= 10)) fails.push(`row ${i + 1}: ${n} is not 1-10`);
            if (seen.has(n)) fails.push(`row ${i + 1}: ${n} twice`); seen.add(n);
            const pics = r.querySelectorAll('[data-lcs-pics] img').length;
            if (pics !== n) fails.push(`row ${i + 1}: ${pics} pictures for ${n}`);
            const lane = r.querySelector('[data-lcs-prim="trace-number"]');
            if (!lane || +lane.dataset.lcsNumber !== n) fails.push(`row ${i + 1}: the lane is not the number ${n}`);
          });
          // the pictures of a row are one picture, and the rows' pictures are all different
          const nouns = rows.map((r) => { const im = r.querySelector('[data-lcs-pics] img'); return im ? im.getAttribute('src') : null; });
          if (new Set(nouns).size !== nouns.length) fails.push('two rows count the same picture');
          rows.forEach((r, i) => { if (new Set([...r.querySelectorAll('[data-lcs-pics] img')].map((im) => im.getAttribute('src'))).size !== 1) fails.push(`row ${i + 1}: mixed pictures`); });
          // level 3 (nothing to trace) carries the 1-10 strip, every number once
          const lv = document.querySelector('[data-lcs-trace-count]');
          if (lv && lv.dataset.lcsTraceCount === '3') {
            const strip = [...document.querySelectorAll('[data-lcs-numeral-strip] [data-lcs-strip-number]')].map((g) => g.dataset.lcsStripNumber);
            if (new Set(strip).size !== 10) fails.push(`the 1-10 strip shows ${new Set(strip).size} numbers`);
          }
        } else {
          const rows = [...document.querySelectorAll('[data-lcs-word]')];
          if (rows.length < 3) fails.push(`${rows.length} rows`);
          rows.forEach((r, i) => {
            const n = +r.dataset.lcsNumber, num = r.querySelector('[data-lcs-numeral]');
            if (!num || +num.textContent !== n) fails.push(`row ${i + 1}: the numeral is not ${n}`);
            const dots = r.querySelector('[data-lcs-dots]');
            if (dots && dots.querySelectorAll('[data-lcs-dot]').length !== n) fails.push(`row ${i + 1}: ${dots.querySelectorAll('[data-lcs-dot]').length} dots for ${n}`);
          });
        }
        return fails;
      }, mode);
    },
  };
}

module.exports = { makeNumberTracingMoreType, COUNT, WORDS };
