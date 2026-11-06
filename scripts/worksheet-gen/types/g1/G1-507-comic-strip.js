/**
 * G1-507 — Comic Strip (Stories & Writing maker 2026-11-02, NEW-TEMPLATES §49 T2; W.1.3 narrate a short sequence;
 * pt "história em quadrinhos", de "Bildergeschichte", fr "bande dessinée"): frames with two characters of the theme and
 * empty speech bubbles; the child writes what each character says (level 3 also a caption line under each frame). The
 * characters are two characters of the theme (animals, people or toy figures: types/_shared/characters.js), one or both in each frame (the first frame shows the first, the second the
 * other, then both), slots the teacher may swap for any picture of the theme (lib/slot.js). Open writing: no answer key,
 * no screen.
 * Levels: 1 three wide frames, one under the other · 2 four frames · 3 four frames with a caption line each. Every speaker
 * has its own bubble, its tail over that speaker (one bubble over two speakers said nothing about who speaks, 2026-11-06).
 */
'use strict';
const { entriesFor, fileUri } = require('../../lib/b2-common.js');
const { nameRefused, REFUSED, NAME_ONLY } = require('../../lib/picture-name-refusals.js');
const { isCharacter } = require('../_shared/characters.js');
const slot = require('../../lib/slot.js');
const W = require('../_shared/writing-frames.js');
const T = require('../../primitives/_tokens.js').color;

const REFUSED_NOUNS = new Set([...REFUSED, ...NAME_ONLY].map((x) => x.split('/')[1]));
// where a picture's drawing begins inside its square: the measured opaque bounds of every library picture (tools/hm-ink-boxes.js)
let _ink;
const inkTopOf = (theme, noun) => {
  if (_ink === undefined) { const p = require('path').join(__dirname, '..', '..', 'data', 'hm', 'ink-boxes.json'); const P = require('../../lib/platform/index.js'); _ink = P.exists(p) ? P.readJson(p) : {}; }
  const b = _ink[theme + '/' + noun];
  return b ? b.t : 0;   // no measured box: the drawing may start at the very top
};
const D = { 1: { frames: 3, cols: 1, caption: false }, 2: { frames: 4, cols: 2, caption: false }, 3: { frames: 4, cols: 2, caption: true } };
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
    // the frames fill the page: three wide frames one under the other (level 1), or two rows of two (2026-11-06: three
    // tall frames in a row left the middle of every frame empty and had no room for two characters side by side)
    // the frames are sized to the 733 px body of the tallest title + instruction (a teacher's longer words still fit)
    const fw = Math.floor((660 - 14 * (d.cols - 1)) / d.cols), fh = d.cols === 1 ? 235 : 359;
    const px = d.cols === 1 ? 100 : d.caption ? 90 : 96, CAP = 48;
    const frames = Array.from({ length: d.frames }, (_, i) => {
      const who = WHO[i];
      const Wd = fw - 6, H = fh - 6 - (d.caption ? CAP : 0);   // the scene inside the 3 px border, above the caption
      // every speaker has its OWN bubble whose tail ends just above its head (one bubble for two speakers said nothing
      // about who speaks); the first character always stands on the left, the second on the right. The bubbles keep
      // clear of the frame number in the top-left corner
      // the tail tip stops 4 px above the top of the speaker's DRAWING (its measured ink, not its square box): ending a
      // tenth of the way into the box drew the tail over the head of 3 in 4 characters (collision gate, 2026-11-06)
      const pad = 6, clear = 28, charY = H - pad - px;
      const reach = Math.min(charY + Math.round(px * 0.1), ...who.map((k) => charY + Math.floor(inkTopOf(theme, two[k].noun) * px) - 4));
      const parts = [];
      const put = (k, x, y, w, h, tail, tipAt) => {
        const [tx] = W.bubbleTip(w, h, tail, tipAt);
        parts.push(`<div data-lcs-bubble-for="${k}" style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px">${W.bubble(w, h, { tail, tipAt })}</div>`);
        parts.push(`<img class="ws-icon" data-lcs-speaker="${k}" src="${fileUri(theme, two[k].noun)}" alt=""${slot.attr(ctx, 'pic', k)} style="position:absolute;left:${Math.round(x + tx - px / 2)}px;top:${charY}px;width:${px}px;height:${px}px;object-fit:contain">`);
      };
      if (who.length === 1) {
        // one speaker: one big bubble, from its side of the frame; its tail tip reaches the speaker's head
        const w = Math.round(d.cols === 1 ? Wd * 0.7 : Wd - clear - pad), h = Math.min(Math.round((reach - pad) / 0.97), 190);
        const y = Math.round(reach - h * 0.97);
        if (who[0] === 0) put(0, clear, y, w, h, 'left'); else put(1, Wd - pad - w, y, w, h, 'right');
      } else if (d.cols === 1) {
        // a wide frame: the two bubbles side by side
        const w = Math.floor((Wd - clear - pad - 12) / 2), h = Math.round((reach - pad) / 0.97), y = Math.round(reach - h * 0.97);
        put(0, clear, y, w, h, 'left'); put(1, Wd - pad - w, y, w, h, 'right');
      } else {
        // a narrow frame: two tall bubbles side by side, each tail ending a third of the way in so both speakers stand
        // inside the frame (stacked bubbles left the first tail far above its speaker and ran it into the second bubble)
        const w = Math.floor((Wd - clear - pad - 6) / 2), h = Math.min(Math.round((reach - pad) / 0.97), 220), y = Math.round(reach - h * 0.97);
        put(0, clear, y, w, h, 'left', 0.34); put(1, Wd - pad - w, y, w, h, 'right', 0.34);
      }
      return `<div data-lcs-comic-frame="${i + 1}" data-lcs-speakers="${who.join(',')}" style="position:relative;display:flex;flex-direction:column;box-sizing:border-box;width:${fw}px;height:${fh}px;border:3px solid ${T.ink};border-radius:8px;background:#FFFFFF;overflow:hidden">` +
        `<span class="ws-card-badge">${i + 1}</span>` +
        `<div data-lcs-comic-scene style="position:relative;flex:0 0 ${H}px;height:${H}px">${parts.join('')}</div>` +
        (d.caption ? `<div style="padding:0 8px 4px">${W.line(fw - 22, 44)}</div>` : '') + '</div>';
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
      // every speaker has its own bubble: the bubble's tail ends just above that speaker, nearer to it than to anyone else;
      // no bubble lies over a speaker or over another bubble's ellipse; everything inside the frame, clear of its number
      const ell = (sv) => { const [cx, cy, rx, ry] = sv.dataset.lcsEllipse.split(',').map(Number); const r = sv.getBoundingClientRect(); return { l: r.left + cx - rx, r: r.left + cx + rx, t: r.top + cy - ry, b: r.top + cy + ry }; };
      const meet = (a, b) => Math.min(a.r, b.r) - Math.max(a.l, b.l) > 1 && Math.min(a.b, b.b) - Math.max(a.t, b.t) > 1;
      const box = (e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom }; };
      fs.forEach((f, i) => {
        const n = i + 1, who = (f.dataset.lcsSpeakers || '').split(',').filter(Boolean);
        const bubbles = [...f.querySelectorAll('[data-lcs-bubble-for]')], speakers = [...f.querySelectorAll('img[data-lcs-speaker]')];
        if (bubbles.length !== who.length || speakers.length !== who.length) fails.push(`frame ${n}: ${who.length} speakers, ${speakers.length} pictures, ${bubbles.length} bubbles`);
        const badge = f.querySelector('.ws-card-badge'), fr = f.getBoundingClientRect();
        if (!badge || badge.textContent.trim() !== String(n)) fails.push(`frame ${n}: not numbered ${n}`);
        const ells = bubbles.map((bw) => ell(bw.querySelector('svg')));
        bubbles.forEach((bw, j) => {
          const k = bw.dataset.lcsBubbleFor, sv = bw.querySelector('svg'), me = speakers.find((s) => s.dataset.lcsSpeaker === k);
          if (!me) { fails.push(`frame ${n}: a bubble for nobody`); return; }
          const [tx, ty] = sv.dataset.lcsTip.split(',').map(Number), sr = sv.getBoundingClientRect(), tip = [sr.left + tx, sr.top + ty];
          const dist = (s) => { const r = s.getBoundingClientRect(); return Math.hypot(tip[0] - (r.left + r.right) / 2, tip[1] - r.top); };
          const r = me.getBoundingClientRect();
          if (tip[0] < r.left || tip[0] > r.right || tip[1] > r.top + r.height * 0.25 || r.top - tip[1] > 24) fails.push(`frame ${n}: bubble ${j + 1}'s tail does not end over its speaker`);
          if (speakers.some((s) => s !== me && dist(s) <= dist(me))) fails.push(`frame ${n}: bubble ${j + 1} points nearer another speaker`);
          if (speakers.some((s) => meet(ells[j], box(s)))) fails.push(`frame ${n}: bubble ${j + 1} lies over a speaker`);
          if (ells.some((o, m) => m !== j && meet(o, ells[j]))) fails.push(`frame ${n}: two bubbles overlap`);
          const b = box(sv);
          if (b.l < fr.left + 2 || b.r > fr.right - 2 || b.t < fr.top + 2 || b.b > fr.bottom - 2) fails.push(`frame ${n}: bubble ${j + 1} leaves the frame`);
          if (badge && meet(ells[j], box(badge))) fails.push(`frame ${n}: bubble ${j + 1} under the frame number`);
        });
        speakers.forEach((s) => { const b = box(s); if (b.l < fr.left + 2 || b.r > fr.right - 2 || b.b > fr.bottom - 2) fails.push(`frame ${n}: a speaker leaves the frame`); });
      });
      return fails;
    });
  },
};
