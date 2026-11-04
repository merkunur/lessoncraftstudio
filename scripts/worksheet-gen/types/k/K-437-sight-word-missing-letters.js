/**
 * K-437 — Sight Words: Missing Letters (maker template, 2026-10-31). Several sight words per page, each as a row of
 * letter boxes with letters left out; the child writes the missing ones (the spelling face of the list — the other
 * pages copy whole words).
 *   level 1: 7 words of the core 24, ONE letter missing, the whole word shown at the start of the row to look at
 *   level 2: 8 words of the first 50, one missing, a word bank of the page's words at the top
 *   level 3: 8 words of the whole list, two missing in words of 4+ letters, a word bank with 4 extra decoy words
 * One right answer (native + pedagogy review 2026-10-31: "_av_" is have / gave / save / cave, "bi_" is big / bit / bin —
 * a pattern unique in the sight-word list is NOT unique on paper): from level 2 the answer must come from the bank, and
 * every gapped pattern fits exactly ONE word of the bank (else the gaps move; the verify re-checks it on the page).
 * Words: the Sight Words Level Set bank; a teacher may swap any word for another of the list (lib/slot.js).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const slot = require('../../lib/slot.js');

const lower = (w, loc) => w.toLocaleLowerCase(loc);

module.exports = {
  id: 'K-437',
  slug: 'sight-words-missing-letters',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  difficulty: {
    1: { words: 7, missing: 1, look: true, decoys: 0, maxBox: 70 },
    2: { words: 8, missing: 1, look: false, decoys: 0, maxBox: 56 },
    3: { words: 8, missing: 2, look: false, decoys: 4, maxBox: 56 },
  },
  i18n: { en: { title: 'Sight Words: Missing Letters', instruction: 'Write the missing letters to finish each sight word.' } },

  build({ difficulty, locale }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx.rng;
    const pool = P.levelWords(loc, difficulty).filter((w) => [...w].length >= 2);
    const seeded = (word) => { let h = 2166136261; for (const ch of word) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0; return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0) / 4294967296); };
    const rngNext = () => rng.next();
    // the gaps of `word`: k positions whose pattern fits ONE bank word (level 1 shows the word: no check needed).
    // `next` = the page's rng for its own words; a word a teacher swapped in uses a generator seeded by the word itself,
    // so a swap never shifts the other rows' gaps
    const fitsOne = (bank, L, pos) => bank.filter((w) => [...w].length === L.length && [...lower(w, loc)].every((ch, i) => pos.includes(i) || ch === lower(L[i], loc))).length === 1;
    const gapsFor = (bank, word, next) => {
      const L = [...word];
      const k = L.length >= 4 ? d.missing : 1;
      for (let t = 0; t < 24; t++) {
        const idx = L.map((_, i) => i);
        const pos = [];
        while (pos.length < k) pos.push(idx.splice(Math.floor(next() * idx.length), 1)[0]);
        pos.sort((x, y) => x - y);
        if (d.look || fitsOne(bank, L, pos)) return pos;
      }
      return null;
    };
    // a page is drawn until every pattern fits one bank word only (short words collide: de im / in, fr sa / se); a word a
    // teacher picked that cannot be made unique is refused (the maker says it does not fit)
    let drawn, bank, gaps0;
    for (let attempt = 0; attempt < 12; attempt++) {
      drawn = rng.shuffle(pool.slice()).slice(0, d.words);
      // the bank: the page's words, + decoys of similar length at level 3 (real competitors, not obvious misfits)
      const decoys = d.decoys
        ? rng.shuffle(pool.filter((w) => !drawn.includes(w))).sort((a, b) => Math.abs([...a].length - 4) - Math.abs([...b].length - 4)).slice(0, d.decoys)
        : [];
      bank = d.look ? [] : rng.shuffle(drawn.concat(decoys));
      gaps0 = drawn.map((w) => gapsFor(bank, w, rngNext));
      if (gaps0.every(Boolean)) break;
    }
    // a teacher's swap (lib/slot.js) changes its own row only (2026-11-02: drawing the page around the new word shifted
    // the random draws, so every other row's gaps moved — own-input gate). The page is drawn for its own words as always;
    // then the new word takes its row and its place in the bank (a decoy it was trades places with the word it replaces),
    // its gaps come from a generator seeded by the word, and every other row keeps its gaps — refused if one of them would
    // then fit two bank words
    // its own row is built from the word (the letters left out of THIS word): declared, so the gate checks the rest
    const words = slot.words(ctx, drawn, pool, 'word', { derives: ['words.{i}'] });
    words.forEach((w, i) => {
      if (w === drawn[i] || d.look) return;
      const p = bank.indexOf(drawn[i]), q = bank.indexOf(w);
      if (q >= 0) bank[q] = drawn[i];
      bank[p] = w;
    });
    const gapsOf = new Map(words.map((w, i) => [w, w === drawn[i] ? gaps0[i] : gapsFor(bank, w, seeded(w))]));
    if (!d.look) words.forEach((w, i) => {
      if (w === drawn[i] && gaps0[i] && words.some((x, j) => x !== drawn[j]) && !fitsOne(bank, [...w], gaps0[i])) throw new Error(`K-437: with the new word, "${w}" (${loc}) would fit two bank words (the swap is refused)`);
    });
    const longest = Math.max(...words.map((w) => [...w].length));
    const box = Math.max(40, Math.min(d.maxBox, Math.floor((d.look ? 420 : 560) / longest) - 8));
    const rows = [];
    const meta = [];
    words.forEach((word, i) => {
      const gaps = gapsOf.get(word);
      if (!gaps) throw new Error(`K-437: "${word}" (${loc}) has no gap pattern that fits one bank word only`);
      const letters = [...word].map((ch, j) => P.letterBox(ch, { size: box, font: Math.round(box * 0.62), mode: gaps.includes(j) ? 'empty' : 'solid' })).join('');
      const look = d.look ? `<span data-lcs-look style="min-width:150px;font-family:${P.FONT_D};font-weight:700;font-size:42px;color:${P.INK}">${P.esc(word)}</span>` : '';
      rows.push(slot.stamp(ctx, 'word', i, `<div data-lcs-mw-word="${P.esc(word)}" data-lcs-gaps="${gaps.join(',')}" style="display:flex;align-items:center;gap:18px;padding:6px 10px;border-bottom:2px solid ${P.GRID}">${look}<span style="display:flex;gap:6px">${letters}</span></div>`));
      meta.push({ word, gaps });
    });
    const bankHtml = bank.length
      ? `<div data-lcs-frame data-lcs-bank style="display:flex;flex-wrap:wrap;gap:10px 14px;justify-content:center;padding:12px;border:2.5px solid ${P.TEAL};border-radius:14px">` +
        bank.map((w) => `<span class="ws-bankword" style="font-size:24px">${P.esc(w)}</span>`).join('') + `</div>`
      : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-missing style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:6px">${bankHtml}${rows.join('')}</div>`,
      meta: { words: meta, bank },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-mw-word]')];
      if (rows.length < 6) fails.push(`only ${rows.length} words`);
      const bankEl = document.querySelector('[data-lcs-bank]');
      const bank = bankEl ? [...bankEl.querySelectorAll('.ws-bankword')].map((b) => b.textContent) : null;
      const seen = new Set();
      rows.forEach((r, i) => {
        const word = r.dataset.lcsMwWord;
        if (seen.has(word)) fails.push(`word ${i + 1} repeats`);
        seen.add(word);
        const gaps = r.dataset.lcsGaps.split(',').map(Number);
        const boxes = [...r.querySelectorAll('[data-lcs-letter]')];
        const L = [...word];
        if (boxes.length !== L.length) fails.push(`row ${i + 1}: ${boxes.length} boxes for "${word}"`);
        boxes.forEach((b, j) => {
          const empty = b.dataset.lcsMode === 'empty';
          if (empty !== gaps.includes(j)) fails.push(`row ${i + 1}: box ${j + 1} gap mismatch`);
          if (!empty && b.textContent !== L[j]) fails.push(`row ${i + 1}: box ${j + 1} shows "${b.textContent}"`);
        });
        if (!gaps.length || gaps.length >= boxes.length) fails.push(`row ${i + 1}: ${gaps.length} gaps`);
        if (bank) {
          if (!bank.includes(word)) fails.push(`row ${i + 1}: "${word}" is not in the bank`);
          // one right answer: exactly one bank word fits the pattern the child sees
          const fit = bank.filter((w) => [...w].length === L.length && [...w.toLocaleLowerCase()].every((ch, j) => gaps.includes(j) || ch === L[j].toLocaleLowerCase()));
          if (fit.length !== 1) fails.push(`row ${i + 1}: ${fit.length} bank words fit "${L.map((c, j) => (gaps.includes(j) ? '_' : c)).join('')}"`);
        }
      });
      if (!bank && !document.querySelector('[data-lcs-look]')) fails.push('no help at all: neither the word to look at nor a bank');
      return fails;
    });
  },
};
