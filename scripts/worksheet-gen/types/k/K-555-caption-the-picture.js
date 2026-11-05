/**
 * K-555 — Write About the Picture (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T6; W.K.2 / W.1.3; de "Sätze
 * zum Bild", sv "meningar till bilden", no "setninger til bildet"): pictures of the theme, each with a line for one
 * sentence about it (level 2: a speech bubble — what might it say?, only
 * characters: an animal, a person or a toy figure, types/_shared/characters.js; level 3: two lines). The K-1 step before writing a
 * paragraph about a picture (G2-278). The pictures are slots the teacher may swap for any picture of the theme. Open
 * writing: no answer key, no screen.
 * Levels: 1 three pictures, a line each · 2 four pictures with a speech bubble · 3 four pictures, two lines each.
 */
'use strict';
const { entriesFor, fileUri, countable } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const { isCharacter } = require('../_shared/characters.js');
const slot = require('../../lib/slot.js');
const W = require('../_shared/writing-frames.js');
const T = require('../../primitives/_tokens.js').color;

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
const D = { 1: { n: 3, form: 'line', px: 140 }, 2: { n: 4, form: 'bubble', px: 110 }, 3: { n: 4, form: 'lines', px: 110 } };

module.exports = {
  id: 'K-555',
  slug: 'write-about-the-picture',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'picture-writing',
  themeAxis: { applicable: true, minNouns: 4, excludeBw: true },
  difficulty: D,
  i18n: { en: { title: 'Write About the Picture', instruction: 'Look at each picture. Write a sentence about it.' } },

  build({ theme, difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const pool = entriesFor(theme, L).filter((e) => !nameRefused(theme, e.noun) && !REFUSED_NOUNS.has(e.noun))
      // level 2 gives each picture a voice: only a character can talk (types/_shared/characters.js; it prints no plural,
      // so an invariant one — de Roboter — is fine); levels 1-3 otherwise keep a countable picture (no lego, no chess)
      .filter((e) => (d.form === 'bubble' ? isCharacter(e) : countable(e)));
    if (pool.length < d.n) throw new Error(`K-555: theme ${theme}/${L} has ${pool.length} pictures (< ${d.n})`);
    const picks = slot.pictures(ctx, rng.sample(pool, d.n), pool, theme, 'pic');
    const rows = picks.map((e, i) => {
      // the writing line INSIDE the bubble: its place and width come from the bubble's own ellipse (writing-frames bubbleLine;
      // a fixed 380 px line at 44 px ran out of both sides of the drawn bubble — operator 2026-11-05)
      const bw = 470, bh = d.px + 20, bl = W.bubbleLine(bw, bh, 44);
      const write = d.form === 'bubble'
        ? `<div style="position:relative;flex:0 0 ${bw}px;width:${bw}px;height:${bh}px"><div style="position:absolute;inset:0">${W.bubble(bw, bh)}</div><div data-lcs-bubble-line style="position:absolute;left:${bl.left}px;top:${bl.top}px">${W.line(bl.width, 44)}</div></div>`
        : `<div style="flex:1;min-width:0">${W.lines(d.form === 'lines' ? 2 : 1, 480, 52)}</div>`;
      return `<div data-lcs-caption-row="${i + 1}" style="display:flex;align-items:center;gap:16px;padding:6px 12px;border-radius:14px;background:${T.cream}">` +
        `<img class="ws-icon" src="${fileUri(theme, e.noun)}" alt=""${slot.attr(ctx, 'pic', i)} style="width:${d.px}px;height:${d.px}px;flex:0 0 auto;object-fit:contain">${write}</div>`;
    });
    return {
      bodyHtml: `<div data-ws-content data-lcs-captions style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${rows.join('')}</div>`,
      meta: { pictures: picks.map((e) => e.vocabKey || e.noun) },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-caption-row]')];
      if (rows.length < 3) fails.push(`${rows.length} pictures`);
      const root = document.querySelector('[data-lcs-captions]').getBoundingClientRect();
      rows.forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`row ${i + 1} leaves the page`); const im = r.querySelector('img'); if (!im.complete || !im.naturalWidth) fails.push(`row ${i + 1}: the picture did not load`); });
      // a speech bubble's writing line lies INSIDE the drawn ellipse (its four corners, measured against the ellipse the
      // bubble records — data-lcs-ellipse "cx,cy,rx,ry" in its own pixels)
      rows.forEach((r, i) => {
        const sv = r.querySelector('svg[data-lcs-bubble]'), ln = r.querySelector('[data-lcs-bubble-line] svg');
        if (!sv) return;
        if (!ln) { fails.push(`row ${i + 1}: a speech bubble without its writing line`); return; }
        const [cx, cy, rx, ry] = String(sv.dataset.lcsEllipse || '').split(',').map(Number);
        if (!(rx > 0 && ry > 0)) { fails.push(`row ${i + 1}: the bubble records no ellipse`); return; }
        const B = sv.getBoundingClientRect(), L = ln.getBoundingClientRect();
        const inside = (x, y) => ((x - B.left - cx) / rx) ** 2 + ((y - B.top - cy) / ry) ** 2 <= 1;
        if (![[L.left, L.top], [L.right, L.top], [L.left, L.bottom], [L.right, L.bottom]].every(([x, y]) => inside(x, y))) fails.push(`row ${i + 1}: the writing line runs out of the speech bubble`);
      });
      return fails;
    });
  },
};
