/**
 * types/_shared/crossword.js — the Crossword maker's factory (2026-11-03, ENGINES Part 3 §B; the old crossword app's
 * picture clues and grid-vs-clue language kept, its fixed 15 × 15 dropped): lib/puzzles/crossword-layout.js lays the
 * theme's picture words out (every word crossing another), numbered in reading order. Five ways to give the words:
 *   pictures  the numbered pictures, across and down (the pre-reader crossword)
 *   arrow     the picture IN the grid, in the cell before its word, an arrow into it (mots fléchés / Schwedenrätsel)
 *   fillin    no clue: the words listed by length, one written in; a solver proves the fill is the only one (another
 *             word is written in until it is)
 *   bank      the numbered pictures and the words to use (level 3 adds two words the grid does not take)
 *   bilingual the picture and the same thing's word in ANOTHER language (the slot clueLang; the grid in the page's)
 * Every letter cell is an answer box (CAPITALS; a crossing is one box), the number printed in its corner; the key fills
 * the grid. The words: one word each, no word another one's picture could name (lib/picture-name-refusals.js).
 */
'use strict';
const { entriesFor, displayWord, fileUri } = require('../../lib/b2-common.js');
const { pool, langName } = require('./word-search.js');
const CL = require('../../lib/puzzles/crossword-layout.js');
const { CROSSWORD_WORDS } = require('../../data/puzzles/crossword-words.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const arrow = (dir, px) => `<svg width="${px}" height="${px}" viewBox="0 0 24 24" aria-hidden="true" style="position:absolute;${dir === 'A' ? 'right:0;top:50%;margin-top:-' + px / 2 + 'px' : 'bottom:0;left:50%;margin-left:-' + px / 2 + 'px'}"><path d="${dir === 'A' ? 'M6 5 L18 12 L6 19 Z' : 'M5 6 L19 6 L12 18 Z'}" fill="${T.coral}"/></svg>`;

/** the number of ways the words fill the slots (stops at 2); given = slot index → word */
function fills(slots, words, given) {
  const cellOf = (s, i) => (s.dir === 'A' ? s.r + ',' + (s.c + i) : (s.r + i) + ',' + s.c);
  let count = 0;
  const grid = new Map(), used = new Set();
  for (const [si, w] of Object.entries(given)) { [...w].forEach((ch, i) => grid.set(cellOf(slots[si], i), ch)); used.add(w); }
  const open = slots.map((s, i) => i).filter((i) => given[i] == null);
  const go = (k) => {
    if (count > 1) return;
    if (k === open.length) { count++; return; }
    const s = slots[open[k]], len = [...s.word].length;
    for (const w of words) {
      if (used.has(w) || [...w].length !== len) continue;
      const ch = [...w], set = [];
      let ok = true;
      for (let i = 0; i < len; i++) { const key = cellOf(s, i), g = grid.get(key); if (g != null && g !== ch[i]) { ok = false; break; } if (g == null) set.push([key, ch[i]]); }
      if (!ok) continue;
      set.forEach(([key, v]) => grid.set(key, v)); used.add(w);
      go(k + 1);
      set.forEach(([key]) => grid.delete(key)); used.delete(w);
    }
  };
  go(0);
  return count;
}

function makeCrossword(spec) {
  const { D } = spec;
  return {
    id: spec.id, slug: spec.slug, gradeBand: spec.gradeBand, assetClass: 'icon-placement', exerciseType: 'crossword',
    themeAxis: { applicable: true, minNouns: 8, excludeBw: true },
    difficulty: D, i18n: spec.i18n,

    build({ theme, difficulty, locale }, ctx) {
      const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
      const W = CROSSWORD_WORDS[L];
      const mark = !!(ctx && (ctx.answerKey || ctx.screen));
      let p = pool(theme, L, 3, d.max || 8), clueLang = null;
      if (spec.clue === 'bilingual') {
        const langs = LOCS.filter((x) => x !== L), def = L === 'en' ? 'es' : 'en';
        const names = langs.map((x) => ({ word: langName(x, L), code: x }));
        const [pick] = slot.words(ctx, [names.find((x) => x.code === def)], names, 'clueLang');
        clueLang = pick.code;
        const otherWord = new Map(entriesFor(theme, clueLang).map((y) => [y.vocabKey, displayWord(y.singular, clueLang)]));
        p = p.filter((x) => otherWord.has(x.e.vocabKey));
        // a word spelled the same in both languages (zebra / zebra) teaches nothing here: leave those out while enough differ
        const differs = p.filter((x) => otherWord.get(x.e.vocabKey).toLocaleUpperCase(clueLang) !== x.grid);
        if (differs.length >= d.k + 2) p = differs;
      }
      // a word that shares no letter with at least two others (KIWI among the fruits) can never cross: leave it out
      p = p.filter((x) => p.filter((y) => y !== x && [...y.grid].some((ch) => x.grid.includes(ch))).length >= 2);
      if (p.length < d.k) throw new Error(`${spec.id}: theme ${theme}/${L} has ${p.length} words (< ${d.k})`);
      const maxCols = spec.clue === 'arrow' ? 11 : 14, maxRows = spec.clue === 'arrow' ? 12 : 11;
      // fill-in: the words written in until the fill is the only one — the word set and the order of the given words that
      // need the FEWEST (at most d.maxGiven, 2: a page that writes in half its words is no puzzle — the B7 review saw 5 of 10)
      let lay = null, items = null, given = {}, bestGiven = Infinity;
      for (let t = 0; t < (spec.clue === 'fillin' ? 60 : 30); t++) {
        const pick = rng.sample(p, d.k);
        const L2 = CL.layout(pick.map((x) => x.grid), { rng, starts: 48, clueCells: spec.clue === 'arrow', maxRows, maxCols });
        if (!L2 || L2.unplaced.length) continue;
        if (spec.clue !== 'fillin') { lay = L2; items = pick; break; }
        const ents = CL.number(L2.entries), words = ents.map((e) => e.word);
        for (let o = 0; o < 6; o++) {
          const order = rng.shuffle(ents.map((e, i) => i)), g = { [order[0]]: ents[order[0]].word };
          for (let k = 1; k < order.length && fills(ents, words, g) > 1; k++) g[order[k]] = ents[order[k]].word;
          if (Object.keys(g).length < bestGiven) { bestGiven = Object.keys(g).length; lay = L2; items = pick; given = g; }
        }
        if (bestGiven <= 1) break;
      }
      if (!lay) throw new Error(`${spec.id}: these words do not cross into one grid (${theme}/${L})`);
      if (spec.clue === 'fillin' && bestGiven > (d.maxGiven || 2)) throw new Error(`${spec.id}: no fill with ≤ ${d.maxGiven || 2} given words (${theme}/${L})`);
      const byWord = new Map(items.map((x) => [x.grid, x]));
      const entries = CL.number(lay.entries).map((e) => ({ ...e, item: byWord.get(e.word) }));
      const givenCells = new Set();
      for (const si of Object.keys(given)) { const e = entries[si]; [...e.word].forEach((_, i) => givenCells.add(e.dir === 'A' ? e.r + ',' + (e.c + i) : (e.r + i) + ',' + e.c)); }
      const letterAt = new Map(), numAt = new Map();
      for (const e of entries) {
        [...e.word].forEach((ch, i) => letterAt.set(e.dir === 'A' ? e.r + ',' + (e.c + i) : (e.r + i) + ',' + e.c, ch));
        if (spec.clue !== 'arrow' && spec.clue !== 'fillin') numAt.set(e.r + ',' + e.c, e.n);
      }
      const clueAt = new Map(spec.clue === 'arrow' ? entries.map((e) => [e.clue[0] + ',' + e.clue[1], e]) : []);
      const clueH = spec.clue === 'arrow' ? 0 : spec.clue === 'fillin' ? 150 : spec.clue === 'bank' ? 330 : 210;
      const cell = Math.max(spec.clue === 'arrow' ? 44 : 32, Math.min(64, Math.floor(Math.min(640 / lay.cols, (720 - clueH) / lay.rows))));
      const cells = [];
      for (let r = 0; r < lay.rows; r++) for (let c = 0; c < lay.cols; c++) {
        const k = r + ',' + c, ch = letterAt.get(k), ce = clueAt.get(k);
        if (ce) {
          cells.push(`<div data-lcs-cw-clue="${esc(ce.word)}" style="position:relative;width:${cell}px;height:${cell}px;box-sizing:border-box;border:2px solid ${T.teal};background:${T.cream};display:flex;${ce.dir === 'A' ? 'align-items:center;justify-content:flex-start;padding-left:2px' : 'align-items:flex-start;justify-content:center;padding-top:2px'}">` +
            `<img class="ws-icon" src="${fileUri(theme, ce.item.e.noun)}" alt="" style="width:${cell - 22}px;height:${cell - 22}px;object-fit:contain">${arrow(ce.dir, 18)}</div>`);
        } else if (ch != null) {
          const num = numAt.get(k);
          cells.push(`<div data-lcs-cw-cell="${k}" style="position:relative;width:${cell}px;height:${cell}px">` +
            (givenCells.has(k)
              ? `<span style="position:absolute;inset:-1px;display:flex;align-items:center;justify-content:center;box-sizing:border-box;border:2px solid ${T.ink};background:#FFFFFF;font:700 ${Math.round(cell * 0.55)}px/1 'Nunito',sans-serif;color:${T.ink}">${esc(ch)}</span>`
              : `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(ch)}"` : ''} style="position:absolute;inset:-1px;width:auto;height:auto;border-radius:0;border:2px solid ${T.ink};background:#FFFFFF"></span>`) +
            (num ? `<span style="position:absolute;left:3px;top:1px;font:700 ${Math.max(11, Math.round(cell * 0.26))}px/1 'Nunito',sans-serif;color:${T.teal}">${num}</span>` : '') + '</div>');
        } else cells.push(`<div style="width:${cell}px;height:${cell}px"></div>`);
      }
      const grid = `<div data-lcs-cw-grid data-lcs-rows="${lay.rows}" data-lcs-cols="${lay.cols}" style="display:grid;grid-template-columns:repeat(${lay.cols},${cell}px);gap:0">${cells.join('')}</div>`;
      // the clues
      const pic = (e, px) => `<img class="ws-icon" src="${fileUri(theme, e.item.e.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
      const nBadge = (n) => `<span style="flex:0 0 26px;height:26px;border-radius:13px;background:${T.teal};color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;font:700 15px/1 'Baloo 2',cursive">${n}</span>`;
      let clues = '';
      if (spec.clue === 'pictures' || spec.clue === 'bank' || spec.clue === 'bilingual') {
        const other = clueLang ? new Map(entriesFor(theme, clueLang).map((y) => [y.vocabKey, displayWord(y.singular, clueLang)])) : null;
        const one = (e) => `<span data-lcs-cw-clueitem style="display:inline-flex;align-items:center;gap:6px;padding:3px 8px 3px 3px;border-radius:10px;background:#FFFFFF;border:2px solid ${T.grid}">${nBadge(e.n)}${pic(e, other ? 40 : 52)}${other ? `<span lang="${clueLang}" style="font:700 17px/1 'Nunito',sans-serif;color:${T.ink}">${esc(other.get(e.item.e.vocabKey))}</span>` : ''}</span>`;
        const col = (dir, head) => `<div style="display:flex;flex-direction:column;gap:6px;align-items:flex-start"><span style="font:700 18px/1 'Baloo 2',cursive;color:${T.teal}">${esc(head)}</span><div style="display:flex;flex-wrap:wrap;gap:6px">${entries.filter((e) => e.dir === dir).sort((a, b) => a.n - b.n).map(one).join('')}</div></div>`;
        clues = `<div data-lcs-cw-clues style="display:flex;gap:18px;justify-content:center;flex-wrap:wrap;padding:10px 12px;border-radius:14px;background:${T.cream}">${col('A', W.across)}${col('D', W.down)}</div>`;
      }
      if (spec.clue === 'bank' || spec.clue === 'fillin') {
        let bankWords = entries.map((e) => e.word);
        if (spec.clue === 'bank' && d.extra) bankWords = bankWords.concat(rng.sample(p.filter((x) => !bankWords.includes(x.grid)), d.extra).map((x) => x.grid));
        bankWords = rng.shuffle(bankWords);
        let inner;
        if (spec.clue === 'fillin') {
          const lens = [...new Set(bankWords.map((w) => [...w].length))].sort((a, b) => a - b);
          inner = lens.map((n) => `<div style="display:flex;gap:8px;align-items:baseline;flex-wrap:wrap"><span style="font:700 17px/1 'Baloo 2',cursive;color:${T.teal}">${esc(W.letters.replace('{n}', n))}:</span>${bankWords.filter((w) => [...w].length === n).map((w) => `<span style="font:700 18px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('<span>·</span>')}</div>`).join('');
        } else inner = `<span style="font:700 18px/1 'Baloo 2',cursive;color:${T.teal}">${esc(W.bank)}</span><div style="display:flex;flex-wrap:wrap;gap:6px 12px">${bankWords.map((w) => `<span style="font:700 18px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(w)}</span>`).join('')}</div>`;
        clues += `<div data-lcs-cw-bank style="display:flex;flex-direction:column;gap:6px;padding:10px 14px;border:2.5px dashed ${T.grid};border-radius:14px">${inner}</div>`;
      }
      return {
        bodyHtml: `<div data-ws-content data-lcs-crossword style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:12px;min-height:0">${grid}${clues}</div>`,
        meta: { words: entries.map((e) => `${e.n || ''}${e.dir} ${e.word}`), rows: lay.rows, cols: lay.cols, ...(clueLang ? { clueLang } : {}), ...(Object.keys(given).length ? { given: Object.values(given) } : {}) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const cells = [...document.querySelectorAll('[data-lcs-cw-cell]')];
        if (cells.length < 8) fails.push(`${cells.length} letter cells`);
        const w = cells.length ? cells[0].getBoundingClientRect().width : 0;
        if (w < 30) fails.push(`cells ${Math.round(w)} px`);
        // one grid: every letter cell reaches every other through letter cells
        const key = (c) => c.dataset.lcsCwCell, set = new Set(cells.map(key)), seen = new Set(), stack = cells.length ? [key(cells[0])] : [];
        while (stack.length) { const k = stack.pop(); if (seen.has(k)) continue; seen.add(k); const [r, c] = k.split(',').map(Number); for (const n of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) { const kk = n.join(','); if (set.has(kk) && !seen.has(kk)) stack.push(kk); } }
        if (seen.size !== set.size) fails.push('the grid falls into pieces');
        const root = document.querySelector('[data-lcs-crossword]').getBoundingClientRect();
        document.querySelectorAll('[data-lcs-cw-grid], [data-lcs-cw-clues], [data-lcs-cw-bank]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
        return fails;
      });
    },
  };
}

module.exports = { makeCrossword, fills };
