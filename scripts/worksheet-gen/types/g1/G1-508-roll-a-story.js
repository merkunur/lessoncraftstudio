/**
 * G1-508 — Roll a Story (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T3; W.1.3; the writing-centre dice game):
 * a table of six rows, one per face of a die: who (an animal), where (a place), what happens (a problem); the child rolls
 * a die for each column and writes a story with the three things rolled. The animals and places are library pictures
 * with the vocabulary's word under them (data/writing/stories-new.js PLACES); the problems are cue words, literals per
 * locale (PROBLEMS). Open writing: no answer key, no screen.
 * Levels: 1 who and where, four lines · 2 who, where and what happens, six lines · 3 the same, eight lines.
 */
'use strict';
const slot = require('../../lib/slot.js');
const { ROLL, PROBLEMS, PLACES } = require('../../data/writing/stories-new.js');
const { vocab } = require('../../lib/b2-common.js');
const { picOf, srcOf } = require('../_shared/pic-by-key.js');
const diceFace = require('../../primitives/dice.js');
const W = require('../_shared/writing-frames.js');
const A = require('../_shared/alphabet-more.js');
const T = require('../../primitives/_tokens.js').color;

const ANIMALS = ['cat', 'dog', 'bear', 'rabbit', 'frog', 'lion', 'elephant', 'monkey', 'mouse', 'duck', 'fox', 'owl', 'pig', 'horse'];
const D = { 1: { cols: ['who', 'where'], lines: 4, rowH: 66 }, 2: { cols: ['who', 'where', 'problem'], lines: 5, rowH: 60 }, 3: { cols: ['who', 'where', 'problem'], lines: 7, rowH: 52 } };

module.exports = {
  id: 'G1-508',
  slug: 'roll-a-story',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'story-writing',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'Roll a Story', instruction: 'Roll a die for each column. Then write a story with what you rolled.' } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = A.loc2(locale);
    if (!ROLL[L] || !PROBLEMS[L]) throw new Error(`G1-508: no roll-a-story words for ${L}`);
    const v = vocab();
    const word = (k) => { const w = v[k] && v[k][L] && v[k][L][0]; return w ? (L === 'de' ? w : w.toLocaleLowerCase(L)) : null; };
    const animals = rng.sample(ANIMALS.filter((k) => picOf(k) && word(k)), 6);
    const places = rng.shuffle(PLACES.filter((k) => picOf(k) && word(k)));
    if (animals.length < 6 || places.length < 6) throw new Error(`G1-508: ${L} has ${animals.length} animals, ${places.length} places (< 6)`);
    // a teacher's pictures (maker): the "who" column from the animals, the "where" column from the places (key theme/noun)
    const asPic = (k) => ({ ...picOf(k), k });
    animals.splice(0, 6, ...slot.anyPictures(ctx, animals.map(asPic), ANIMALS.filter((k) => picOf(k) && word(k)).map(asPic), 'who').map((x) => x.k));
    places.splice(0, 6, ...slot.anyPictures(ctx, places.slice(0, 6).map(asPic), places.map(asPic), 'where').map((x) => x.k));
    const problems = rng.shuffle(PROBLEMS[L]);
    const px = d.rowH - 12;
    const cell = (col, i) => {
      if (col === 'problem') return `<span style="font:700 20px/1.15 'Baloo 2',cursive;color:${T.ink}">${W.esc(problems[i])}</span>`;
      const k = col === 'who' ? animals[i] : places[i];
      return `<span style="display:flex;align-items:center;gap:8px"><img class="ws-icon" src="${srcOf(picOf(k))}" alt=""${slot.attr(ctx, col === 'who' ? 'who' : 'where', i)} style="width:${px}px;height:${px}px;object-fit:contain"><span style="font:700 20px/1.1 'Baloo 2',cursive;color:${T.ink}">${W.esc(word(k))}</span></span>`;
    };
    const head = `<tr><th></th>${d.cols.map((c) => `<th style="padding:4px 6px;font:700 22px/1.2 'Baloo 2',cursive;color:${T.teal};text-align:left">${W.esc(ROLL[L][c])}</th>`).join('')}</tr>`;
    const rows = Array.from({ length: 6 }, (_, i) => `<tr data-lcs-roll-row="${i + 1}" style="height:${d.rowH}px"><td style="width:${d.rowH}px">${diceFace({ n: i + 1, size: d.rowH - 14 }).svg}</td>` +
      d.cols.map((c) => `<td style="padding:2px 6px;border-top:1.5px solid ${T.grid}">${cell(c, i)}</td>`).join('') + '</tr>');
    return {
      bodyHtml: `<div data-ws-content data-lcs-roll style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">` +
        `<table style="width:100%;border-collapse:collapse;background:${T.cream};border-radius:14px">${head}${rows.join('')}</table>` +
        `<div>${W.lines(d.lines, 650, 46)}</div></div>`,
      meta: { who: animals, where: places, problems: d.cols.includes('problem') ? problems : [] },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-roll-row]')];
      if (rows.length !== 6) fails.push(`${rows.length} rows`);
      const root = document.querySelector('[data-lcs-roll]').getBoundingClientRect();
      const t = document.querySelector('[data-lcs-roll] table').getBoundingClientRect();
      if (t.right > root.right + 1) fails.push('the table leaves the page');
      if (root.bottom < [...document.querySelectorAll('[data-lcs-roll] svg')].pop().getBoundingClientRect().bottom - 1) fails.push('the lines leave the page');
      rows.forEach((r, i) => r.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: a picture did not load`); }));
      return fails;
    });
  },
};
