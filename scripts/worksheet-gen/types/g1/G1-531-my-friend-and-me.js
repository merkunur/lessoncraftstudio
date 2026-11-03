/**
 * G1-531 — My Friend and Me (Me, My Family & Feelings maker 2026-11-03, NEW-TEMPLATES §55 T4; the "others and me"
 * strand: Lehrplan "Ich und die anderen", Lgr22 "likheter och skillnader"): two children fill a two-ring diagram —
 * what is only mine, only my friend's, and what we share (data/feelings/feelings-new.js venn: me / my friend / both of
 * us). Level 2 adds ideas to compare (favorite food, pets …), level 3 two sentences to finish. Open: no answer key, no
 * screen.
 * Levels: 1 the two rings · 2 + six ideas · 3 + the ideas and two sentences (We both like … / I like …, my friend likes …).
 */
'use strict';
const { FEELINGS_NEW } = require('../../data/feelings/feelings-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { ideas: false, frames: false }, 2: { ideas: true, frames: false }, 3: { ideas: true, frames: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

module.exports = {
  id: 'G1-531',
  slug: 'my-friend-and-me',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: 'all-about-me',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'My Friend and Me', instruction: "Work with a friend. Draw or write what is only yours, only your friend's, and what you share." } },

  build({ difficulty, locale }) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const N = FEELINGS_NEW[L];
    const W = 640, H = d.frames ? 360 : d.ideas ? 420 : 500, r = H / 2 - 30, cx1 = W / 2 - r * 0.55, cx2 = W / 2 + r * 0.55, cy = H / 2 + 14;
    const svg = `<svg data-lcs-venn width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">` +
      `<circle cx="${cx1}" cy="${cy}" r="${r}" fill="${T.cream}" fill-opacity="0.6" stroke="${T.teal}" stroke-width="4"/><circle cx="${cx2}" cy="${cy}" r="${r}" fill="${T.cream}" fill-opacity="0.6" stroke="${T.coral}" stroke-width="4"/>` +
      `<text x="${cx1 - r * 0.45}" y="22" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="24" fill="${T.teal}">${esc(N.venn.me)}</text>` +
      `<text x="${cx2 + r * 0.45}" y="22" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${[...N.venn.friend].length > 16 ? 18 : 24}" fill="${T.coral}">${esc(N.venn.friend)}</text>` +
      `<text x="${W / 2}" y="${cy + r * 0.5}" text-anchor="middle" font-family="Baloo 2" font-weight="700" font-size="${[...N.venn.both].length > 10 ? 15 : 17}" fill="${T.ink}">${esc(N.venn.both)}</text></svg>`;   // inside the shared part
    const ideas = d.ideas ? `<div data-lcs-venn-ideas style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px 10px">${N.prompts.map((x) => `<span class="ws-pill" style="font-size:17px;padding:3px 14px">${esc(x)}</span>`).join('')}</div>` : '';
    const line = `<span style="flex:1;border-bottom:2.5px solid ${T.ink};height:30px"></span>`;
    const frames = d.frames ? `<div data-lcs-venn-frames style="display:flex;flex-direction:column;gap:16px;padding:0 8px;font:700 21px/1.3 'Nunito',sans-serif;color:${T.ink}">` +
      `<div style="display:flex;align-items:flex-end;gap:10px"><span>${esc(N.frames[0])}</span>${line}</div>` +
      `<div style="display:flex;align-items:flex-end;gap:10px"><span>${esc(N.frames[1])}</span>${line}<span>,</span></div>` +
      `<div style="display:flex;align-items:flex-end;gap:10px"><span>${esc(N.frames[2])}</span>${line}</div></div>` : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-friend style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;gap:12px;min-height:0">${ideas}${svg}${frames ? `<div style="align-self:stretch">${frames}</div>` : ''}</div>`,
      meta: { ideas: d.ideas, frames: d.frames },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-lcs-friend]').getBoundingClientRect();
      document.querySelectorAll('[data-lcs-venn], [data-lcs-venn-ideas], [data-lcs-venn-frames]').forEach((e) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1) fails.push('a block leaves the page'); });
      return fails;
    });
  },
};
