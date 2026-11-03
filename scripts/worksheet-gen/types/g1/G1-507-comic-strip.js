/**
 * G1-507 — Comic Strip (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T2; W.1.3 narrate a short sequence;
 * pt "história em quadrinhos", de "Bildergeschichte", fr "bande dessinée"): frames with two characters of the theme and
 * empty speech bubbles; the child writes what each character says (level 3 also a caption line under each frame). The
 * characters are two characters of the theme (animals, people or toy figures: types/_shared/characters.js), one or both in each frame (the first frame shows the first, the second the
 * other, then both), slots the teacher may swap for any picture of the theme (lib/slot.js). Open writing: no answer key,
 * no screen.
 * Levels: 1 three frames in a row · 2 four frames · 3 four frames with a caption line each.
 */
'use strict';
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const { isCharacter } = require('../_shared/characters.js');
const slot = require('../../lib/slot.js');
const W = require('../_shared/writing-frames.js');
const T = require('../../primitives/_tokens.js').color;

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const D = { 1: { frames: 3, cols: 3, caption: false }, 2: { frames: 4, cols: 2, caption: false }, 3: { frames: 4, cols: 2, caption: true } };
const WHO = [[0], [1], [0, 1], [0, 1]];

module.exports = {
  id: 'G1-507',
  slug: 'comic-strip',
  gradeBand: 'G1',
  assetClass: 'icon-placement',
  exerciseType: 'story-writing',
  themeAxis: { applicable: true, minNouns: 4, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Comic Strip', instruction: 'Look at each picture. Write what the characters say in the speech bubbles.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = entriesFor(theme, L).filter((e) => isCharacter(e) && !nameRefused(theme, e.noun) && !REFUSED_NOUNS.has(e.noun));
    if (pool.length < 2) throw new Error(`G1-507: theme ${theme}/${L} has ${pool.length} characters (< 2)`);
    const two = slot.pictures(ctx, rng.sample(pool, 2), pool, theme, 'pic');
    // the frames fill the page: one row of three, or two rows of two
    const fw = Math.floor((660 - 14 * (d.cols - 1)) / d.cols), fh = d.cols === 3 ? 600 : 300;
    const px = d.cols === 3 ? 110 : 96;
    // a bubble wider than tall, at the top of the frame; room for the scene between it and the characters
    const bw = Math.round(fw * 0.92), bh = Math.round(Math.min(fh * 0.42, fw * 0.62));
    const frames = Array.from({ length: d.frames }, (_, i) => {
      const who = WHO[i];
      return `<div data-lcs-comic-frame="${i + 1}" style="position:relative;display:flex;flex-direction:column;box-sizing:border-box;width:${fw}px;height:${fh}px;border:3px solid ${T.ink};border-radius:8px;background:#FFFFFF;overflow:hidden">` +
        `<div style="flex:1;display:flex;justify-content:center;align-items:flex-start;padding-top:8px">${W.bubble(bw, bh)}</div>` +
        `<div style="display:flex;justify-content:space-evenly;align-items:flex-end;padding-bottom:6px">${who.map((k) => `<img class="ws-icon" src="${fileUri(theme, two[k].noun)}" alt=""${slot.attr(ctx, 'pic', k)} style="width:${px}px;height:${px}px;object-fit:contain">`).join('')}</div>` +
        (d.caption ? `<div style="padding:0 8px 4px">${W.line(fw - 16, 44)}</div>` : '') + '</div>';
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-comic style="flex:1;display:grid;grid-template-columns:repeat(${d.cols},${fw}px);gap:14px;justify-content:center;align-content:center;min-height:0">${frames.join('')}</div>`,
      meta: { characters: two.map((e) => e.vocabKey || e.noun) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const fs = [...document.querySelectorAll('[data-lcs-comic-frame]')];
      if (fs.length < 3) fails.push(`${fs.length} frames`);
      const root = document.querySelector('[data-lcs-comic]').getBoundingClientRect();
      fs.forEach((f, i) => { const b = f.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`frame ${i + 1} leaves the page`); f.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push(`frame ${i + 1}: a picture did not load`); }); });
      return fails;
    });
  },
};
