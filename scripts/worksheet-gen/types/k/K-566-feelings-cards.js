/**
 * K-566 — Feelings Cards (Me, My Family & Feelings maker 2026-11-03, NEW-TEMPLATES §55 T5; SEL vocabulary for circle
 * time: de "Bildkarten Gefühle", fr "imagier des émotions", sv "känslokort"): cards to cut out — the six faces a K child
 * reads without the word, each with its word (data/b3/feelings.js; the words native-reviewed). Level 2 cuts face and word
 * apart for a memory game; level 3 leaves the word to write. Material: no answer key, no screen.
 * Levels: 1 six cards, face and word · 2 twelve cards, six faces and six words (memory pairs) · 3 six face cards, the
 * word written by the child.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const { bank } = require('../../lib/b3-common.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { mode: 'both' }, 2: { mode: 'pairs' }, 3: { mode: 'write' } };
const IDS = ['happy', 'sad', 'angry', 'scared', 'surprised', 'tired'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'K-566',
  slug: 'feelings-cards',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'feelings',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: "Feelings Cards", instruction: "Cut out the cards. Use them to talk about feelings." } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[1], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const B = bank('feelings', L);
    const feel = IDS.map((id) => B.feelings.find((f) => f.id === id));
    if (feel.some((f) => !f)) throw new Error(`K-566: ${L} lacks a feeling`);
    const img = (f, px) => `<img class="ws-icon" src="${fileUri(f.face.theme || 'emotions', f.face.noun)}" alt="" style="width:${px}px;height:${px}px;object-fit:contain">`;
    const word = (f, px) => `<span style="font:700 ${[...f.word].length > 10 ? px - 6 : px}px/1.1 'Baloo 2',cursive;color:${T.ink};text-align:center">${esc(f.word)}</span>`;
    const card = (inner, h) => `<div data-lcs-feel-card style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;height:${h}px;box-sizing:border-box;border:2.5px dashed #8A8276;background:#FFFFFF">${inner}</div>`;
    let cards, cols, h;
    if (d.mode === 'both') { cards = feel.map((f) => card(img(f, 150) + word(f, 30), 236)); cols = 2; h = 236; }
    else if (d.mode === 'pairs') { cards = rng.shuffle(feel.map((f) => card(img(f, 120), 168)).concat(feel.map((f) => card(word(f, 30), 168)))); cols = 3; h = 168; }
    else { cards = feel.map((f) => card(img(f, 140) + `<span style="width:80%;border-bottom:2.5px solid ${T.ink};height:36px"></span>`, 236)); cols = 2; h = 236; }
    return {
      bodyHtml: `<div data-ws-content data-lcs-feel-cards style="flex:1;display:grid;grid-template-columns:repeat(${cols},1fr);grid-auto-rows:${h}px;align-content:center;gap:0;min-height:0">${cards.join('')}</div>`,
      meta: { mode: d.mode },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const cards = [...document.querySelectorAll('[data-lcs-feel-card]')];
      if (cards.length < 6) fails.push(`${cards.length} cards`);
      const root = document.querySelector('[data-lcs-feel-cards]').getBoundingClientRect();
      cards.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.bottom > root.bottom + 1 || r.right > root.right + 1) fails.push(`card ${i + 1} leaves the page`); c.querySelectorAll('span, img').forEach((x) => { if (x.getBoundingClientRect().right > r.right + 0.5) fails.push(`card ${i + 1}: content past its edge`); }); });
      return fails;
    });
  },
};
