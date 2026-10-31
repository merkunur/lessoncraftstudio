/**
 * K-438 — Sight Word: Build the Word (cut and glue) (maker template, 2026-10-31). One sight word (2+ letters) per page:
 *   the word in a box; two rows of glue boxes; at the bottom, for each row, the word's letters as tiles to cut out —
 *   shuffled so a strip never already spells the word. The child cuts, orders and glues: letter order, by hand.
 *   level 1: the glue boxes show the letters faintly (match the shapes) + write the word   level 2: empty boxes + write
 *   level 3: empty boxes + write the word + the word written into a bank sentence
 * The tiles are exactly a letter square (the cut line is their edge); a glue box is a little larger, so a tile fits in it.
 * Words of one letter (a, I, y, e, à …) are not offered: there is nothing to put in order (unitAxisMin2).
 */
'use strict';
const P = require('../_shared/sight-word-pages.js');
const { SW } = P;
const { writingRow } = require('../../primitives/trace-path.js');

module.exports = {
  id: 'K-438',
  slug: 'sight-word-build-the-word',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'sight-words',
  themeAxis: { applicable: false },
  unitAxis: P.unitAxisMin2,
  difficulty: {
    1: { faint: true, sentence: false },
    2: { faint: false, sentence: false },
    3: { faint: false, sentence: true },
  },
  i18n: { en: { title: 'Build the Word: {UNIT}', instruction: 'Cut out the letters. Glue them in the right order to build the word.' } },

  build({ difficulty, locale, unit }, ctx) {
    const d = this.difficulty[difficulty];
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx.rng;
    const word = SW.wordOf(unit || P.unitAxisMin2.exemplar(loc), loc);
    const L = [...word];
    if (L.length < 2) throw new Error(`K-438: "${word}" has one letter`);
    // level 3 carries a sentence too: smaller letter squares keep the page inside its box
    // as big as the glue row allows (a glue box is the tile + 8 px, 8 px apart, within 640 px): ≥ 64 px (17 mm, K scissors)
    // for words up to 8 letters; level 3 carries a sentence too, so its squares stop at 70
    const size = Math.max(44, Math.min(d.sentence ? 70 : 92, Math.floor((640 - 8 * (L.length - 1)) / L.length) - 8));
    const font = Math.round(size * 0.62);
    // a strip never spells the word; the second differs from the first when the word allows another wrong order
    const strip = (avoid) => {
      for (let t = 0; t < 40; t++) { const s = rng.shuffle(L.slice()); if (s.join('') !== word && (!avoid || t >= 30 || s.join('') !== avoid.join(''))) return s; }
      const rev = L.slice().reverse();
      if (rev.join('') !== word) return rev;
      const rot = L.slice(1).concat(L[0]);
      if (rot.join('') !== word) return rot;
      throw new Error(`K-438: "${word}" cannot be put out of order`);
    };
    const glueRow = (r) => `<div data-lcs-glue-row="${r}" style="display:flex;gap:8px;justify-content:center">${L.map((ch) => P.letterBox(ch, { size: size + 8, font, mode: d.faint ? 'faint' : 'empty' })).join('')}</div>`;
    const first = strip();
    const strips = [first, strip(first)];
    // one strip per glue row; the tiles touch (shared cut lines are cut once)
    const tiles = (s, r) => `<div data-lcs-tiles="${r}" style="display:flex;gap:0;justify-content:center">${s.map((ch) => P.letterBox(ch, { size, font, mode: 'cut' })).join('')}</div>`;
    const parts = [
      `<div style="display:flex;justify-content:center"><div data-lcs-frame>${SW.wordBox(word, 76)}</div></div>`,
      SW.sectionLabel(SW.label('glue', loc)),
      glueRow(1), glueRow(2),
    ];
    // every level writes the built word once by hand; level 3 then also writes it into a sentence
    parts.push(SW.sectionLabel(SW.label('write', loc)), `<div data-lcs-own>${writingRow({ w: 660, h: d.sentence ? 84 : 96, glyphH: d.sentence ? 50 : 58, xHeight: true }).svg}</div>`);
    let sentence = null;
    if (d.sentence) {
      [sentence] = SW.pickSentences(word, loc, { n: 1, level: difficulty, rng, initial: 'prefer', accept: (s) => SW.blankable(s, word) });
      parts.push(SW.sectionLabel(SW.label('completeSentence', loc)));
      if (SW.startsSentence(sentence, word)) parts.push(`<div data-lcs-capital style="font-family:${P.FONT_B};font-size:14px;font-style:italic">${P.esc(SW.label('capital', loc))}</div>`);
      parts.push(SW.blankSentence(sentence, word, { fontPx: 24 }));
    }
    parts.push(
      `<div data-lcs-cutzone style="border-top:3px dashed ${P.INK};padding-top:14px;display:flex;flex-direction:column;gap:14px">` +
      SW.sectionLabel(SW.label('cut', loc)) + tiles(strips[0], 1) + tiles(strips[1], 2) + `</div>`);
    return {
      bodyHtml: `<div data-ws-content data-lcs-sightword="${P.esc(word)}" style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px">${parts.join('')}</div>`,
      meta: { word, strips: strips.map((s) => s.join('')), sentence },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-sightword]');
      if (!root) return ['no sight-word root'];
      const word = root.dataset.lcsSightword;
      const L = [...word];
      const sorted = (a) => a.slice().sort().join('');
      for (const r of ['1', '2']) {
        const glue = document.querySelector(`[data-lcs-glue-row="${r}"]`);
        const tiles = document.querySelector(`[data-lcs-tiles="${r}"]`);
        if (!glue || !tiles) { fails.push(`row ${r} missing`); continue; }
        const gb = [...glue.querySelectorAll('[data-lcs-letter]')].map((b) => b.dataset.lcsLetter);
        if (gb.join('') !== word) fails.push(`row ${r}: glue boxes are not the word in order`);
        const tl = [...tiles.querySelectorAll('[data-lcs-letter]')].map((b) => b.textContent);
        if (sorted(tl) !== sorted(L)) fails.push(`row ${r}: the tiles are not the word's letters`);
        if (tl.join('') === word) fails.push(`row ${r}: the tiles already spell the word`);
        if (tiles.querySelectorAll('[data-lcs-cut]').length !== L.length) fails.push(`row ${r}: not every tile has a cut line`);
      }
      const zone = document.querySelector('[data-lcs-cutzone]');
      const lastGlue = document.querySelector('[data-lcs-glue-row="2"]');
      if (zone && lastGlue && zone.getBoundingClientRect().top < lastGlue.getBoundingClientRect().bottom) fails.push('the cut-out zone is not below the glue rows');
      return fails;
    });
  },
};
