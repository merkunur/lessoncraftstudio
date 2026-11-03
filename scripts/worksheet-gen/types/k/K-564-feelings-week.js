/**
 * K-564 — My Feelings This Week (Me, My Family & Feelings maker 2026-11-03, NEW-TEMPLATES §55 T1; the classroom SEL
 * routine: de "Gefühle wahrnehmen", Lgr22 "känslor", BNCC "autoconhecimento"): a chart, a row for each feeling — its face
 * and its word (data/b3/feelings.js, the six faces a K child reads without the word) — and a column for each school day;
 * every day the child colours the circle of the feeling they have. Level 3 adds a line a day: "I felt this way because …". An open
 * routine sheet: no answer key, no screen.
 * Levels: 1 three feelings (happy, sad, angry) · 2 five feelings (+ scared, tired) · 3 five feelings and a "because" line
 * for each day.
 */
'use strict';
const { fileUri } = require('../../lib/b2-common.js');
const { bank } = require('../../lib/b3-common.js');
const { CALENDAR } = require('../../data/b2/calendar.js');
const { FEELINGS_NEW } = require('../../data/feelings/feelings-new.js');
const T = require('../../primitives/_tokens.js').color;

const D = { 1: { ids: ['happy', 'sad', 'angry'], because: false }, 2: { ids: ['happy', 'sad', 'angry', 'scared', 'tired'], because: false }, 3: { ids: ['happy', 'sad', 'angry', 'scared', 'tired'], because: true } };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const cap = (s, L) => s.charAt(0).toLocaleUpperCase(L) + s.slice(1);

module.exports = {
  id: 'K-564',
  slug: 'my-feelings-this-week',
  gradeBand: 'K',
  assetClass: 'icon-placement',
  exerciseType: 'feelings',
  themeAxis: { applicable: false },
  difficulty: D,
  i18n: { en: { title: 'My Feelings This Week', instruction: 'Every day, color the circle of the feeling you have.' } },

  build({ difficulty, locale }) {
    const d = D[difficulty] || D[2], L = String(locale || 'en').slice(0, 2);
    const B = bank('feelings', L), C = CALENDAR[L], N = FEELINGS_NEW[L];
    const feel = d.ids.map((id) => B.feelings.find((f) => f.id === id)).filter(Boolean);
    if (feel.length !== d.ids.length) throw new Error(`K-564: ${L} lacks a feeling of ${d.ids.join(',')}`);
    const days = [1, 2, 3, 4, 5].map((i) => cap(C.dayAbbr[i], L));
    const rowH = d.because ? 74 : feel.length > 3 ? 100 : 130, face = Math.min(rowH - 14, 96);
    const head = `<div style="display:grid;grid-template-columns:200px repeat(5,1fr);align-items:center;gap:6px"><span></span>${days.map((x) => `<span style="text-align:center;font:700 22px/1 'Baloo 2',cursive;color:${T.teal}">${esc(x)}</span>`).join('')}</div>`;
    const rows = feel.map((f) => `<div data-lcs-feel-row="${f.id}" style="display:grid;grid-template-columns:200px repeat(5,1fr);align-items:center;gap:6px;height:${rowH}px;padding:0 6px;border-radius:14px;background:${T.cream}">` +
      `<span style="display:flex;align-items:center;gap:10px"><img class="ws-icon" src="${fileUri(f.face.theme || 'emotions', f.face.noun)}" alt="" style="width:${face}px;height:${face}px;object-fit:contain"><span style="font:700 ${[...f.word].length > 9 ? 16 : 19}px/1.1 'Nunito',sans-serif;color:${T.ink}">${esc(f.word)}</span></span>` +
      days.map(() => `<span style="justify-self:center;width:${Math.min(56, rowH - 20)}px;height:${Math.min(56, rowH - 20)}px;border:3px solid ${T.grid};border-radius:50%;background:#FFFFFF"></span>`).join('') + '</div>');
    const reasons = d.because ? `<div data-lcs-feel-because style="display:flex;flex-direction:column;gap:10px;padding:4px 6px">${days.map((x) => `<div style="display:flex;align-items:flex-end;gap:10px"><span style="flex:0 0 60px;font:700 18px/1 'Baloo 2',cursive;color:${T.teal}">${esc(x)}</span>` +
      `<span style="font:700 18px/1 'Nunito',sans-serif;color:${T.ink}">${esc(N.because)}</span><span style="flex:1;border-bottom:2.5px solid ${T.ink};height:26px"></span></div>`).join('')}</div>` : '';
    return {
      bodyHtml: `<div data-ws-content data-lcs-feel-week style="flex:1;display:flex;flex-direction:column;justify-content:space-evenly;gap:10px;min-height:0">${head}${rows.join('')}${reasons}</div>`,
      meta: { feelings: d.ids, because: d.because },
    };
  },

  async verify(page) {
    return page.evaluate(() => {
      const fails = [];
      const rows = [...document.querySelectorAll('[data-lcs-feel-row]')];
      if (rows.length < 3) fails.push(`${rows.length} feelings`);
      const root = document.querySelector('[data-lcs-feel-week]').getBoundingClientRect();
      [...rows, ...document.querySelectorAll('[data-lcs-feel-because]')].forEach((r, i) => { const b = r.getBoundingClientRect(); if (b.right > root.right + 1 || b.bottom > root.bottom + 1) fails.push(`block ${i + 1} leaves the page`); });
      document.querySelectorAll('img').forEach((im) => { if (!im.complete || !im.naturalWidth) fails.push('a picture did not load'); });
      return fails;
    });
  },
};
