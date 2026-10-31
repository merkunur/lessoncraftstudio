/**
 * K-436 — Sight Word: Find and Count (maker template, 2026-10-31). One sight word per page:
 *   bank sentences, one per line — some carry the word (each exactly once, the bank's rule), the others are other words'
 *   sentences — the child circles every copy and writes how many times it is there.
 *   level 1: 5 lines, 2-3 copies   level 2: 7 lines, 2-4 copies   level 3: 9 lines, 3-5 copies (the count varies: never
 *   the same answer on every page)
 * The count is unambiguous (native + pedagogy review 2026-10-31):
 *   - the word never starts a sentence (a child told to circle "das" may skip "Das");
 *   - the word's letters never sit inside another word of the page (da "Der" holds "er", fi "sen" holds "se", fr "une"
 *     holds "un") — in the sentences that carry it and in all the others (a K child circles letter strings);
 *   - the verify recounts on the rendered text.
 * A word without 2 such sentences is not offered on this template (unitAxis below).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const { answerBox } = require('../../templates/components.js');

const RANGE = { 1: [2, 3], 2: [2, 4], 3: [3, 5] };
const ownOf = (word, loc) => SW.sentencesOf(word, loc).filter((s) => SW.findWord(s, word) && !SW.startsSentence(s, word) && !P.hiddenInside(s, word, loc));
const clean = (s, word, loc) => !s.toLocaleLowerCase(loc).includes(word.toLocaleLowerCase(loc));

const unitAxis = {
  applicable: true,
  units: (loc) => SW.unitIds(loc).filter((id) => ownOf(SW.wordOf(id, loc), loc).length >= 2),
  exemplar: (loc) => SW.unitIds(loc).find((id) => ownOf(SW.wordOf(id, loc), loc).length >= 2),
  tokens: SW.unitAxis.tokens,
};

module.exports = {
  id: 'K-436',
  slug: 'sight-word-find-in-text',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis,
  difficulty: {
    1: { lines: 5, px: 36 },
    2: { lines: 7, px: 33 },
    3: { lines: 9, px: 30 },
  },
  i18n: { en: { title: 'Find and Count: {UNIT}', instruction: 'Circle the word “{UNIT}” every time you see it. How many times did you find it?' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx.rng;
    const word = SW.wordOf(unit || unitAxis.exemplar(loc), loc);
    const own = ownOf(word, loc);
    if (own.length < 2) throw new Error(`K-436: "${word}" (${loc}) has ${own.length} usable sentences < 2`);
    const [lo, hi] = RANGE[difficulty];
    const top = Math.min(hi, own.length);
    const count = rng.int(Math.min(lo, top), top);
    const mine = rng.sample(own, count);
    const others = [];
    for (const w of rng.shuffle(SW.words(loc).filter((x) => x !== word))) {
      if (others.length >= d.lines - count) break;
      const cand = SW.sentencesOf(w, loc).filter((s) => clean(s, word, loc) && !others.includes(s));
      if (cand.length) others.push(rng.pick(cand));
    }
    if (others.length < d.lines - count) throw new Error(`K-436: not enough sentences without "${word}" (${loc})`);
    const text = rng.shuffle(mine.concat(others));
    const parts = [
      `<div style="display:flex;align-items:center;justify-content:space-between;gap:16px">${SW.sectionLabel(SW.label('circle', loc))}<div data-lcs-frame>${SW.wordBox(word, 64)}</div></div>`,
      // one sentence per line, spread down the frame: a K-1 reader keeps the line, and the frame is filled by text, not air
      `<div data-lcs-frame data-lcs-text style="flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-evenly;border:2.5px solid ${P.INK};border-radius:18px;padding:18px 28px;background:#FFFFFF">` +
        text.map((s) => `<p data-lcs-text-sentence style="margin:0;font-family:${P.FONT_B};font-weight:700;font-size:${d.px}px;line-height:1.35;color:${P.INK}">${P.esc(s)}</p>`).join('') + `</div>`,
      `<div style="display:flex;align-items:center;justify-content:flex-end;gap:14px">${SW.sectionLabel(SW.label('countTimes', loc))}${answerBox({ w: 84, h: 66, answer: count })}</div>`,
    ];
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${P.esc(word)}" data-lcs-count="${count}" style="flex:1;display:flex;flex-direction:column;gap:16px">${parts.join('')}</div>`,
      meta: { word, count, text },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const low = word.toLocaleLowerCase();
      const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('(?<!\\p{L})' + esc + '(?!\\p{L})', 'giu');
      const lines = [...document.querySelectorAll('[data-lcs-text-sentence]')].map((p) => p.textContent);
      const found = lines.reduce((n, s) => n + (s.match(re) || []).length, 0);
      const want = Number(root.dataset.lcsCount);
      if (found !== want) fails.push(`the text holds ${found} copies, the page says ${want}`);
      if (want < 2) fails.push('fewer than 2 copies to find');
      lines.forEach((s, i) => {
        const toks = s.toLocaleLowerCase().match(/[\p{L}']+/gu) || [];
        if (toks[0] === low) fails.push(`line ${i + 1} starts with the word (capital letter)`);
        if (toks.some((t) => t !== low && t.includes(low))) fails.push(`line ${i + 1}: the word's letters sit inside another word`);
      });
      const box = document.querySelector('[data-lcs-answer]');
      if (!box || Number(box.dataset.lcsAnswer) !== want) fails.push('the count box answer is not the count');
      return fails;
    });
  },
};
