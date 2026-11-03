/**
 * types/_shared/word-search.js — the Word Search maker's factory (2026-11-03, ENGINES Part 3 §A; the old wordsearch app's
 * features: grid size, backwards and diagonal words, a word or picture list, grid-vs-clue language). One grid engine
 * (lib/puzzles/grid-fill.js: every list word exactly once, no rude word of any of the eleven languages in any direction,
 * the fillers the language's own letters), five ways to give the words:
 *   words     the word list (CAPITALS, as in the grid)
 *   pictures  the pictures only — the child names each picture and finds its word (pre-readers)
 *   bilingual the same picture's word in ANOTHER language beside its picture (the dual-language class; the slot
 *             'clueLang' picks the language — English by default, Spanish on an English page)
 *   numbers   the numerals; the grid holds the number words (lib/number-words-1000.js)
 *   message   the word list, and the letters left over spell a short sentence (data/puzzles/phrases.js)
 * The words are the theme's picture words, one word each (a picture a child names otherwise never comes), no word inside
 * another (cat / cats would be found twice). Shape: the grid can be cut to a heart, a star, a circle or a tree.
 * On the screen every cell is a choice; the cells of the hidden words are the right ones (the key rings them).
 */
'use strict';
const { entriesFor, displayWord, fileUri } = require('../../lib/b2-common.js');
const { freshKeep } = require('../../lib/picture-word-review.js');
const { nameRefused } = require('../../lib/picture-name-refusals.js');
const GF = require('../../lib/puzzles/grid-fill.js');
const slot = require('../../lib/slot.js');
const T = require('../../primitives/_tokens.js').color;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LOCS = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const STEP = { across: ['E', 'S'], back: ['E', 'S', 'W', 'N'], diag: ['E', 'S', 'SE', 'NE', 'W', 'N', 'NW', 'SW'] };

// cell masks (r, c, n) → inside: the grid cut to a shape
const SHAPES = {
  heart: (r, c, n) => { const x = (c + 0.5) / n * 2.4 - 1.2, y = 1.15 - (r + 0.5) / n * 2.4; return Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y <= 0; },
  circle: (r, c, n) => { const x = (c + 0.5) / n - 0.5, y = (r + 0.5) / n - 0.5; return x * x + y * y <= 0.25; },
  star: (r, c, n) => {
    const x = (c + 0.5) / n - 0.5, y = (r + 0.52) / n - 0.5, a = Math.atan2(y, x), d = Math.hypot(x, y);
    const k = ((a + Math.PI / 2) / (2 * Math.PI / 5)) % 1, rr = 0.24 + 0.26 * Math.abs(1 - 2 * ((k + 1) % 1));
    return d <= rr * 0.98 + 0.02;
  },
  tree: (r, c, n) => { const y = (r + 0.5) / n, x = Math.abs((c + 0.5) / n - 0.5); return (y < 0.86 && x <= y * 0.55) || (y >= 0.86 && x <= 0.09); },
};

/** a language's name in the page's language (Intl), first letter as the language writes it */
const langName = (code, L) => { try { return new Intl.DisplayNames([L], { type: 'language' }).of(code === 'no' ? 'nb' : code); } catch (e) { return code; } };

/** the theme's picture words a grid can hold: { e, grid (CAPITALS, letters only), shown } */
function pool(theme, L, min, max) {
  const out = [], seen = new Set();
  for (const e of entriesFor(theme, L)) {
    if (!freshKeep(theme, e, L) || nameRefused(theme, e.noun)) continue;
    const shown = displayWord(e.singular, L), grid = shown.toLocaleUpperCase(L);
    if (!/^\p{L}+$/u.test(grid) || [...grid].length < min || [...grid].length > max) continue;
    const f = GF.fold(grid, L);
    if (seen.has(f)) continue;
    seen.add(f); out.push({ e, grid, shown });
  }
  return out;
}

/** k words of which none sits inside another (cat / cats), longest-first variety */
function pickWords(items, k, rng, L, cap) {
  // cap: at most this many letters together (a grid stays ≥ 38 % fillers: a denser one is unreadable at K-3)
  for (let t = 0; t < 30; t++) {
    const out = [];
    for (const it of rng.shuffle(items)) {
      if (out.length === k) break;
      const f = GF.fold(it.grid, L);
      if (out.some((o) => { const g = GF.fold(o.grid, L); return g.includes(f) || f.includes(g); })) continue;
      out.push(it);
    }
    if (out.length === k && (!cap || out.reduce((a, x) => a + [...x.grid].length, 0) <= cap)) return out;
  }
  return null;
}

function makeWordSearch(spec) {
  const { D } = spec;
  return {
    id: spec.id, slug: spec.slug, gradeBand: spec.gradeBand, assetClass: spec.clue === 'numbers' ? 'none' : 'icon-placement', exerciseType: 'word-search',
    themeAxis: spec.clue === 'numbers' ? { applicable: false } : { applicable: true, minNouns: 8, excludeBw: true },
    difficulty: D, i18n: spec.i18n,

    build({ theme, difficulty, locale }, ctx) {
      const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
      const mark = !!(ctx && (ctx.answerKey || ctx.screen));
      const n = d.n, dirs = STEP[d.dirs];
      const mask = d.shape ? SHAPES[d.shape] : null;
      const cellsIn = mask ? Array.from({ length: n * n }, (_, i) => mask(Math.floor(i / n), i % n, n)).filter(Boolean).length : n * n;
      let items, clueLang = null, p = [];
      if (spec.clue === 'numbers') {
        const { numberWord1000 } = require('../../lib/number-words-1000.js');
        const nums = Array.from({ length: d.hi - d.lo + 1 }, (_, i) => d.lo + i);
        const all = nums.map((k) => { const w = numberWord1000(k, L); return { num: k, shown: w, grid: w.replace(/[\s-]/g, '').toLocaleUpperCase(L) }; })
          .filter((x) => /^\p{L}+$/u.test(x.grid) && [...x.grid].length >= 3 && [...x.grid].length <= n);
        items = pickWords(all, Math.min(d.k, all.length), rng, L, Math.floor(cellsIn * 0.62));
      } else {
        p = pool(theme, L, 3, Math.min(n, d.max || n));
        if (spec.clue === 'bilingual') {
          const langs = LOCS.filter((x) => x !== L), def = L === 'en' ? 'es' : 'en';
          const names = langs.map((x) => ({ word: langName(x, L), code: x }));
          const [pick] = slot.words(ctx, [names.find((x) => x.code === def)], names, 'clueLang');
          clueLang = pick.code;
        }
        p = p.filter((x) => !clueLang || entriesFor(theme, clueLang).some((y) => y.vocabKey === x.e.vocabKey));
        items = pickWords(p, d.k, rng, L, Math.floor(cellsIn * 0.62));
      }
      if (!items) throw new Error(`${spec.id}: theme ${theme}/${L} has too few words for ${d.k} (grid ${n})`);
      const words = items.map((x) => x.grid);
      const letters = words.reduce((a, w) => a + [...w].length, 0);
      if (spec.clue !== 'message' && letters > cellsIn * 0.62) throw new Error(`${spec.id}: ${letters} letters for ${cellsIn} cells`);
      // the hidden message: a phrase as long as the free cells (the letters of its words, spaces and marks left out)
      let message = null, built = null;
      if (spec.clue === 'message') {
        const { PHRASES, FOUND_ALL } = require('../../data/puzzles/phrases.js');
        const phrases = (PHRASES[L] || []).concat(FOUND_ALL[L] ? [FOUND_ALL[L]] : []).map((ph) => ({ ph, letters: [...ph.toLocaleUpperCase(L)].filter((c) => /\p{L}/u.test(c)) }));
        // the words go in one at a time; after each, a sentence as long as the free cells ends the search (so the list is
        // the words placed: d.k − 2 … d.k + 4 of them)
        const cand = pickWords(p, Math.min(p.length, d.k + 6), rng, L) || pickWords(p, Math.min(p.length, d.k), rng, L) || items;
        const minLen = Math.min(...phrases.map((x) => x.letters.length));
        for (let t = 0; t < 64 && !built; t++) {
          const grid = Array.from({ length: n }, () => Array(n).fill(null)), placed = [], used = [];
          for (const c of rng.shuffle(cand)) {
            const pc = GF.placeOne(grid, c.grid, { n, dirs, rng, mask });
            if (!pc) continue;
            placed.push({ word: c.grid, dir: pc.dir, cells: pc.cells }); used.push(c);
            if (placed.length < d.k - 2) continue;
            const free = grid.flat().filter((x, i) => x == null && (!mask || mask(Math.floor(i / n), i % n, n))).length;
            if (free < minLen) break;
            for (const m of rng.shuffle(phrases.filter((x) => x.letters.length === free))) {
              const g = GF.finishFixed(grid, placed, m.letters, L, mask);
              if (g) { built = g; message = m; items = used.slice(); break; }
            }
            if (built) break;
          }
        }
        if (!built) throw new Error(`${spec.id}: no phrase fits the free cells (${theme}/${L})`);
      } else {
        built = GF.wordSearch(words, { n, dirs, rng, L, mask });
        // words that cannot share a grid (a rude word where two cross): another set of words, up to five times
        for (let t = 0; t < 5 && !built && spec.clue !== 'numbers'; t++) {
          const again = pickWords(p, d.k, rng, L, Math.floor(cellsIn * 0.62));
          if (!again) break;
          built = GF.wordSearch(again.map((x) => x.grid), { n, dirs, rng, L, mask });
          if (built) items = again;
        }
      }
      if (!built) throw new Error(`${spec.id}: these words cannot be placed together (${theme}/${L})`);
      const placedKey = new Set(built.placed.flatMap((p) => p.cells.map(([y, x]) => y + ',' + x)));
      // the grid fills the body (measured 733 px): the clue band takes ~110 px (two rows of pictures ~150), the message ~60
      const avail = spec.clue === 'message' ? 520 : spec.clue === 'bilingual' || (spec.clue === 'pictures' && items.length > 6) ? 540 : 590;
      const cell = Math.min(72, Math.floor(Math.min(avail, 640) / n));
      const cells = [];
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        const ch = built.grid[r][c], inside = !mask || mask(r, c, n);
        cells.push(inside && ch != null
          ? `<span data-lcs-cell="${r}-${c}" data-lcs-pick="1"${mark && placedKey.has(r + ',' + c) ? ' data-lcs-correct="1"' : ''} data-lcs-label="${esc(String.fromCharCode(65 + c) + (r + 1))}" style="display:flex;align-items:center;justify-content:center;width:${cell}px;height:${cell}px;font:700 ${Math.round(cell * 0.56)}px/1 'Nunito',sans-serif;color:${T.ink};background:#FFFFFF">${esc(ch)}</span>`
          : `<span style="width:${cell}px;height:${cell}px"></span>`);
      }
      const grid = `<div data-lcs-ws-grid data-lcs-n="${n}" style="display:grid;grid-template-columns:repeat(${n},${cell}px);gap:0;border:${mask ? 0 : 3}px solid ${T.teal};border-radius:10px;overflow:hidden;background:${mask ? 'transparent' : '#FFFFFF'}">${cells.join('')}</div>`;
      // the clues
      const px = items.length > 8 ? 54 : 64;
      let clues;
      if (spec.clue === 'pictures') clues = items.map((x) => `<span data-lcs-ws-clue style="display:inline-flex;padding:4px;border-radius:12px;background:#FFFFFF;border:2px solid ${T.grid}"><img class="ws-icon" src="${fileUri(theme, x.e.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain"></span>`).join('');
      else if (spec.clue === 'bilingual') {
        const other = new Map(entriesFor(theme, clueLang).map((y) => [y.vocabKey, displayWord(y.singular, clueLang)]));
        clues = items.map((x) => `<span data-lcs-ws-clue style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;border-radius:12px;background:#FFFFFF;border:2px solid ${T.grid}"><img class="ws-icon" src="${fileUri(theme, x.e.noun)}" alt="" style="width:44px;height:44px;object-fit:contain"><span style="font:700 18px/1 'Nunito',sans-serif;color:${T.ink}" lang="${clueLang}">${esc(other.get(x.e.vocabKey))}</span></span>`).join('');
      } else if (spec.clue === 'numbers') clues = items.map((x) => `<span data-lcs-ws-clue style="display:inline-flex;align-items:center;justify-content:center;min-width:54px;height:54px;border-radius:12px;background:#FFFFFF;border:2px solid ${T.grid};font:700 30px/1 'Baloo 2',cursive;color:${T.teal}">${x.num}</span>`).join('');
      else clues = items.map((x) => `<span data-lcs-ws-clue style="display:inline-flex;align-items:center;padding:4px 12px;border-radius:10px;background:#FFFFFF;border:2px solid ${T.grid};font:700 18px/1.2 'Nunito',sans-serif;color:${T.ink}">${esc(x.grid)}</span>`).join('');
      // the clue language of a two-language page is ONE choice: the clue box is its tap target (maker)
      const clueBox = `<div data-lcs-ws-clues${clueLang ? slot.attr(ctx, 'clueLang', 0) : ''} style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 10px;padding:10px 12px;border-radius:14px;background:${T.cream}">${clues}</div>`;
      let msg = '';
      if (message) {
        const ws = message.ph.toLocaleUpperCase(L).split(/\s+/).filter(Boolean);
        msg = `<div data-lcs-ws-message style="display:flex;flex-wrap:wrap;align-items:center;gap:8px;justify-content:center">` + ws.map((w) => {
          // a word box takes the word as written (J'AIME), its trailing mark printed after the box; the letters alone accepted
          const tail = (w.match(/[^\p{L}]+$/u) || [''])[0], body = w.slice(0, w.length - tail.length), bare = [...body].filter((c) => /\p{L}/u.test(c)).join('');
          return `<span class="ws-answerbox"${mark ? ` data-lcs-answer="${esc(body)}"${bare !== body ? ` data-lcs-alts="${esc(bare)}"` : ''}` : ''} style="width:${26 + [...body].length * 20}px;height:46px"></span>${tail ? `<span style="font:700 24px/1 'Nunito',sans-serif">${esc(tail)}</span>` : ''}`;
        }).join('') + '</div>';
      }
      const top = spec.clue === 'pictures' || spec.clue === 'bilingual' || spec.clue === 'numbers';
      return {
        bodyHtml: `<div data-ws-content data-lcs-word-search style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:14px;min-height:0">` +
          (top ? clueBox + grid : grid + clueBox) + msg + '</div>',
        meta: { words: items.map((x) => x.shown), n, dirs: d.dirs, ...(message ? { message: message.ph } : {}), ...(clueLang ? { clueLang } : {}) },
      };
    },

    async verify(page) {
      return page.evaluate(() => {
        const fails = [];
        const g = document.querySelector('[data-lcs-ws-grid]');
        const cells = [...document.querySelectorAll('[data-lcs-cell]')];
        if (cells.length < 25) fails.push(`${cells.length} cells`);
        const w = cells.length ? cells[0].getBoundingClientRect().width : 0;
        if (w < 26) fails.push(`cells ${Math.round(w)} px`);
        if (cells.some((c) => !/^\p{L}$/u.test(c.textContent.trim()) && !/^SS$/u.test(c.textContent.trim()))) fails.push('a cell that is not one letter');
        const root = document.querySelector('[data-lcs-word-search]').getBoundingClientRect();
        [g, document.querySelector('[data-lcs-ws-clues]'), document.querySelector('[data-lcs-ws-message]')].filter(Boolean).forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
        return fails;
      });
    },
  };
}

module.exports = { makeWordSearch, SHAPES, pool, langName };
