/**
 * K-565 — Feelings Thermometer (Me, My Family & Feelings maker 2026-11-03, NEW-TEMPLATES §55 T2; emotion regulation:
 * de "Gefühlsthermometer", es "termómetro de las emociones", sv "känslotermometer"): a thermometer for a feeling — its face
 * and word on top (data/b3/feelings.js), steps from a little to very (data/feelings/feelings-new.js strength) — the child
 * colours up to how strong the feeling is; level 3 adds a line for what helps (and draws only the unpleasant feelings: what helps when happy says nothing). Open: no answer key, no screen.
 * Levels: 1 two thermometers, three steps with words · 2 three thermometers, five steps (1 to 5, words at the ends) ·
 * 3 two thermometers, five steps, and "what helps me" lines under each.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const { bank } = require('../../lib/b3-common.js');
const { FEELINGS_NEW } = require('../../data/feelings/feelings-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { n: 2, steps: 3, helps: false }, 2: { n: 3, steps: 5, helps: false }, 3: { n: 2, steps: 5, helps: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// the feelings a thermometer measures well (a strength a child can tell): never surprised or tired
const POOL = ['angry', 'sad', 'scared', 'happy'];

module.exports = {
  id: 'K-565',
  slug: 'feelings-thermometer',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'feelings',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: "Feelings Thermometer", instruction: "How strong is the feeling? Color the thermometer up to how strong it is." } },

  build({ difficulty, locale }, ctx) {
    const d = D[difficulty] || D[2], rng = ctx.rng, L = String(locale || 'en').slice(0, 2);
    const B = bank('feelings', L), N = FEELINGS_NEW[L];
    const feel = rng.sample(d.helps ? POOL.filter((x) => x !== 'happy') : POOL, d.n).map((id) => B.feelings.find((f) => f.id === id));
    if (feel.some((f) => !f)) throw new Error(`K-565: ${L} lacks a feeling`);
    // the thermometers fill the body (measured 733 px: the face, the word and the steps)
    const stepH = d.steps === 3 ? 140 : d.helps ? 78 : 100, colW = d.n === 3 ? 196 : 270;
    const label = (i) => (d.steps === 3 ? N.strength[i] : i === 0 ? '1 · ' + N.strength[0] : i === d.steps - 1 ? d.steps + ' · ' + N.strength[2] : String(i + 1));
    const thermo = (f) => {
      const steps = Array.from({ length: d.steps }, (_, i) => d.steps - 1 - i).map((i) => `<div style="display:flex;align-items:center;gap:10px;height:${stepH}px">` +
        `<span style="width:78px;height:${stepH - 4}px;box-sizing:border-box;border:3px solid ${T.ink};border-radius:${i === 0 ? '0 0 32px 32px' : i === d.steps - 1 ? '14px 14px 0 0' : '0'};background:#FFFFFF"></span>` +
        `<span style="font:700 18px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(label(i))}</span></div>`).join('');
      const helps = d.helps ? `<div style="display:flex;flex-direction:column;gap:12px;align-self:stretch"><span style="font:700 17px/1 'Nunito',sans-serif;color:${T.teal}">${esc(N.helps)}</span>${[1, 2].map(() => `<span style="border-bottom:2.5px solid ${T.ink};height:26px"></span>`).join('')}</div>` : '';
      return `<div data-lcs-thermo="${f.id}" style="display:flex;flex-direction:column;align-items:center;gap:10px;width:${colW}px;padding:12px;border-radius:16px;background:${T.cream}">` +
        `<img class="ws-icon" src="${fileUri(f.face.theme || 'emotions', f.face.noun)}" alt="" style="width:86px;height:86px;object-fit:contain">` +
        `<span style="font:700 24px/1 'Baloo 2',cursive;color:${T.teal}">${esc(f.word)}</span><div style="display:flex;flex-direction:column;gap:0">${steps}</div>${helps}</div>`;
    };
    return {
      bodyHtml: `<div data-ws-content data-lcs-thermos style="flex:1;display:flex;justify-content:space-evenly;align-items:center;gap:12px;min-height:0">${feel.map(thermo).join('')}</div>`,
      meta: { feelings: feel.map((f) => f.id), steps: d.steps },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const t = [...document.querySelectorAll('[data-lcs-thermo]')];
      if (t.length < 2) fails.push(`${t.length} thermometers`);
      const root = document.querySelector('[data-lcs-thermos]').getBoundingClientRect();
      t.forEach((e, i) => { const r = e.getBoundingClientRect(); if (r.right > root.right + 1 || r.bottom > root.bottom + 1 || r.left < root.left - 1) fails.push(`thermometer ${i + 1} leaves the page`); });
      return fails;
    });
  },
};
